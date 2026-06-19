import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactFormSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { supabase } from "@/lib/supabase";
import crypto from "crypto";

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "anonymous";
}

function sanitize(str: string): string {
  return str
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIP(request);
    const { success: rateLimitOk, remaining, resetIn } = rateLimit(ip, {
      windowMs: 60 * 1000,
      maxRequests: 5,
    });

    if (!rateLimitOk) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many requests. Please try again later.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil(resetIn / 1000)),
            "X-RateLimit-Remaining": String(remaining),
          },
        }
      );
    }

    // Parse body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid request body." },
        { status: 400 }
      );
    }

    // Honeypot check — silently accept to fool bots
    if (body.honeypot) {
      return NextResponse.json(
        { success: true, message: "Thank you for your inquiry." },
        { status: 200 }
      );
    }

    // Validate
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      const fieldErrors: Record<string, string[]> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string;
        if (!fieldErrors[field]) fieldErrors[field] = [];
        fieldErrors[field].push(issue.message);
      }

      return NextResponse.json(
        {
          success: false,
          message: "Validation failed. Please check your inputs.",
          errors: fieldErrors,
        },
        { status: 422 }
      );
    }

    const {
      name,
      company,
      email,
      phone,
      category,
      quantity,
      message,
      hasCustomBag,
      customImage,
      customImageName,
      customDescription,
      customQuantity,
    } = result.data;

    // 1. Process Attachment Upload to Supabase Storage
    let customImageUrl: string | null = null;
    let fileBuffer: Buffer | null = null;
    let fileContentType: string | null = null;

    if (hasCustomBag && customImage && customImageName) {
      const matches = customImage.match(/^data:(.+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        fileContentType = matches[1];
        const base64Data = matches[2];
        fileBuffer = Buffer.from(base64Data, "base64");
        
        // Random UUID filename for zero-trust protection
        const fileExt = customImageName.split(".").pop() || "png";
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        
        try {
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from("inquiries")
            .upload(fileName, fileBuffer, {
              contentType: fileContentType,
              upsert: true,
            });
            
          if (!uploadError && uploadData) {
            const { data: urlData } = supabase.storage
              .from("inquiries")
              .getPublicUrl(fileName);
            customImageUrl = urlData?.publicUrl || null;
          } else {
            console.error("Storage upload error, falling back to base64 URL:", uploadError);
            customImageUrl = customImage; // fallback
          }
        } catch (storageErr) {
          console.error("Storage upload exception, falling back to base64 URL:", storageErr);
          customImageUrl = customImage; // fallback
        }
      }
    }

    // 2. Save Inquiry Submission to Database
    try {
      const { error: dbError } = await supabase
        .from("inquiry_submissions")
        .insert({
          name,
          company,
          email,
          phone: phone || null,
          category: category || "General Inquiry",
          quantity: quantity || "Not specified",
          message,
          has_custom_bag: hasCustomBag || false,
          custom_description: customDescription || null,
          custom_quantity: customQuantity || null,
          custom_image_name: customImageName || null,
          custom_image_url: customImageUrl,
          ip_address: ip,
        });
        
      if (dbError) {
        console.error("Failed to save inquiry to database:", dbError);
      }
    } catch (dbErr) {
      console.error("Database logging exception:", dbErr);
    }

    // 3. Build & Dispatch SMTP Email
    const safe = {
      name: sanitize(name),
      company: sanitize(company),
      email: sanitize(email),
      phone: sanitize(phone || "Not provided"),
      category: sanitize(category || "Not specified"),
      quantity: sanitize(quantity || "Not specified"),
      message: sanitize(message),
      customDescription: customDescription ? sanitize(customDescription) : "",
      customQuantity: customQuantity ? sanitize(customQuantity) : "",
      customImageName: customImageName ? sanitize(customImageName) : "",
    };

    const emailHtml = `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #556B2F; padding: 24px 32px;">
          <h1 style="color: #ffffff; font-size: 20px; margin: 0;">New Quote Request — CoAdverts</h1>
        </div>
        <div style="padding: 32px; background-color: #F8F4ED;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #1A1A1A; width: 140px; vertical-align: top;">Name</td>
              <td style="padding: 8px 0; color: #4A4A4A;">${safe.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #1A1A1A; vertical-align: top;">Company</td>
              <td style="padding: 8px 0; color: #4A4A4A;">${safe.company}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #1A1A1A; vertical-align: top;">Email</td>
              <td style="padding: 8px 0; color: #4A4A4A;"><a href="mailto:${safe.email}" style="color: #556B2F;">${safe.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #1A1A1A; vertical-align: top;">Phone</td>
              <td style="padding: 8px 0; color: #4A4A4A;">${safe.phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #1A1A1A; vertical-align: top;">Category</td>
              <td style="padding: 8px 0; color: #4A4A4A;">${safe.category}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #1A1A1A; vertical-align: top;">Quantity</td>
              <td style="padding: 8px 0; color: #4A4A4A;">${safe.quantity}</td>
            </tr>
            ${
              hasCustomBag
                ? `
            <tr>
              <td colspan="2" style="padding: 16px 0 8px 0; font-weight: 600; color: #556B2F; border-top: 1px solid #E7D9C1; font-size: 16px;">
                Custom Bag Details
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #1A1A1A; vertical-align: top;">Description</td>
              <td style="padding: 8px 0; color: #4A4A4A; white-space: pre-wrap;">${safe.customDescription}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #1A1A1A; vertical-align: top;">Custom Quantity</td>
              <td style="padding: 8px 0; color: #4A4A4A;">${safe.customQuantity || "Not specified"}</td>
            </tr>
            ${
              safe.customImageName
                ? `
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #1A1A1A; vertical-align: top;">Reference File</td>
              <td style="padding: 8px 0; color: #4A4A4A;">${safe.customImageName} (Attached)</td>
            </tr>
            `
                : ""
            }
            `
                : ""
            }
          </table>
          <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #E7D9C1;">
            <p style="font-weight: 600; color: #1A1A1A; margin: 0 0 8px 0;">Message</p>
            <p style="color: #4A4A4A; line-height: 1.6; margin: 0; white-space: pre-wrap;">${safe.message}</p>
          </div>
        </div>
        <div style="padding: 16px 32px; background-color: #1A1A1A; text-align: center;">
          <p style="color: #717171; font-size: 12px; margin: 0;">This email was sent from the CoAdverts website contact form.</p>
        </div>
      </div>
    `;

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const contactEmail = process.env.CONTACT_EMAIL;

    if (!smtpHost || !smtpUser || !smtpPass || !contactEmail) {
      console.error("SMTP configuration is incomplete. Check environment variables.");
      return NextResponse.json(
        {
          success: false,
          message: "The contact form is temporarily unavailable. Please try again later or contact us directly.",
        },
        { status: 503 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const attachments = [];
    if (fileBuffer && fileContentType && customImageName) {
      attachments.push({
        filename: customImageName,
        content: fileBuffer,
        contentType: fileContentType,
      });
    }

    await transporter.sendMail({
      from: `"CoAdverts Website" <${smtpUser}>`,
      to: contactEmail,
      replyTo: email,
      subject: `Quote Request from ${safe.name} — ${safe.company}`,
      html: emailHtml,
      attachments,
    });

    return NextResponse.json(
      { success: true, message: "Thank you for your inquiry. We will be in touch shortly." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
