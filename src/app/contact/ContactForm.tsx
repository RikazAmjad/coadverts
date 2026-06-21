"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select, type SelectItem } from "@/components/ui/Select";
import { MultiSelect } from "@/components/ui/MultiSelect";
import { Button } from "@/components/ui/Button";
import { productCategories } from "@/lib/data";
import type { ContactFormResponse } from "@/types";

interface FormErrors {
  [key: string]: string;
}

export function ContactForm() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [imageError, setImageError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    countryCode: "SE",
    phone: "",
    categories: [] as string[],
    quantity: "",
    message: "",
    hasCustomBag: false,
    customDescription: "",
    customQuantity: "",
    customImage: "",
    customImageName: "",
  });

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const typeParam = searchParams.get("type");
    if (typeParam) {
      setFormData((prev) => ({ ...prev, categories: [typeParam] }));
    } else if (categoryParam) {
      setFormData((prev) => ({ ...prev, categories: [categoryParam] }));
    }
  }, [searchParams]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setImageError("");
    if (!file) {
      setFormData((prev) => ({
        ...prev,
        customImage: "",
        customImageName: "",
      }));
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      setImageError("Image file must be under 4MB");
      return;
    }

    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      setImageError("Only images and PDF files are allowed");
      return;
    }

    try {
      const base64 = await toBase64(file);
      setFormData((prev) => ({
        ...prev,
        customImage: base64,
        customImageName: file.name,
      }));
    } catch {
      setImageError("Error reading file. Please try another image.");
    }
  }

  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  function validateClient(): boolean {
    const newErrors: FormErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    if (!formData.company.trim() || formData.company.trim().length < 2) {
      newErrors.company = "Company name must be at least 2 characters";
    }
    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    if (formData.hasCustomBag) {
      if (
        !formData.customDescription.trim() ||
        formData.customDescription.trim().length < 10
      ) {
        newErrors.customDescription =
          "Please describe the custom bag design (min 10 characters)";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setServerError("");
    setSuccess(false);

    if (!validateClient()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data: ContactFormResponse = await res.json();

      if (!res.ok || !data.success) {
        if (data.errors) {
          const fieldErrors: FormErrors = {};
          for (const [key, msgs] of Object.entries(data.errors)) {
            fieldErrors[key] = msgs[0];
          }
          setErrors(fieldErrors);
        } else {
          setServerError(
            data.message || "Something went wrong. Please try again.",
          );
        }
        return;
      }

      setSuccess(true);
      setFormData({
        name: "",
        company: "",
        email: "",
        countryCode: "SE",
        phone: "",
        categories: [],
        quantity: "",
        message: "",
        hasCustomBag: false,
        customDescription: "",
        customQuantity: "",
        customImage: "",
        customImageName: "",
      });
      setImageError("");
    } catch {
      setServerError(
        "Network error. Please check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-success-light mx-auto flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-success"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="text-xl font-heading font-semibold text-neutral-black mb-2">
          Quote Request Submitted
        </h3>
        <p className="text-neutral-600 max-w-md mx-auto">
          Thank you for your inquiry. Our team will review your requirements and
          get back to you within 24 business hours.
        </p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="mt-6 text-sm font-medium text-brand-700 hover:text-brand-600 transition-base cursor-pointer"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  const productOptions: SelectItem[] = [
    { value: "", label: "Select a product..." },
    ...productCategories.map((c) => ({
      groupLabel: c.name,
      options: [
        { value: c.id, label: `All ${c.name}` },
        ...c.subcategories.map((s) => ({
          value: s.id,
          label: s.name,
        })),
      ],
    })),
  ];

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Honeypot — hidden from humans */}
      <div
        className="absolute opacity-0 pointer-events-none h-0 overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="honeypot"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {serverError && (
        <div
          className="mb-6 p-4 bg-error-light border border-error/20 rounded-md text-sm text-error"
          role="alert"
        >
          {serverError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-4">
        <Input
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          required
          error={errors.name}
        />
        <Input
          label="Company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Acme Inc."
          required
          error={errors.company}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@acme.com"
          required
          error={errors.email}
        />
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="phone"
            className="text-sm font-medium text-neutral-900"
          >
            Phone
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center border-r border-neutral-300 pr-1 pl-2 bg-neutral-50 rounded-l-md">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="text-sm bg-transparent outline-none h-full text-neutral-700 font-medium cursor-pointer"
              >
                <option value="SE">SE (+46)</option>
                <option value="PK">PK (+92)</option>
                <option value="US">US (+1)</option>
                <option value="UK">UK (+44)</option>
                <option value="EU">EU (+49)</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="70 123 4567"
              className={`w-full pl-[6.5rem] pr-4 py-2.5 text-sm bg-neutral-white border rounded-md font-body transition-base placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 ${
                errors.phone
                  ? "border-error text-error"
                  : "border-neutral-300 text-neutral-900 hover:border-neutral-400"
              }`}
            />
          </div>
          {errors.phone && (
            <p className="text-xs text-error" role="alert">
              {errors.phone}
            </p>
          )}
        </div>
        <MultiSelect
          label="Product Categories"
          options={productOptions}
          value={formData.categories}
          onChange={(newValues) => {
            setFormData((prev) => ({ ...prev, categories: newValues }));
            if (errors.categories) {
              setErrors((prev) => {
                const next = { ...prev };
                delete next.categories;
                return next;
              });
            }
          }}
          error={errors.categories}
        />
        <Input
          label="Estimated Quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="e.g. 5,000 units"
          error={errors.quantity}
        />
      </div>

      <div className="mt-5">
        <Textarea
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your project — materials, sizes, branding requirements, timeline..."
          required
          error={errors.message}
        />
      </div>

      {/* Custom Bag Checkbox */}
      <div className="mt-6 flex items-start">
        <div className="flex items-center h-5">
          <input
            id="hasCustomBag"
            name="hasCustomBag"
            type="checkbox"
            checked={formData.hasCustomBag}
            onChange={handleCheckboxChange}
            className="h-4 w-4 rounded border-neutral-300 text-brand-600 focus:ring-brand-500 cursor-pointer"
          />
        </div>
        <div className="ml-3 text-sm">
          <label
            htmlFor="hasCustomBag"
            className="font-medium text-neutral-900 cursor-pointer select-none"
          >
            I want a custom bag style / design not listed above
          </label>
          <p className="text-neutral-500">
            Share design references, sketches, or custom production specs.
          </p>
        </div>
      </div>

      {/* Conditional Custom Bag Fields */}
      {formData.hasCustomBag && (
        <div className="mt-6 bg-brand-50/50 rounded-lg border border-brand-100/50 space-y-5 transition-all duration-300">
          <h4 className="text-sm font-semibold text-brand-700 uppercase tracking-wider font-body">
            Custom Design Requirements
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-4">
            <div>
              <label className="block text-sm font-medium text-neutral-900 mb-1.5">
                Reference Image / Sketch
              </label>
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={handleFileChange}
                className="block w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 file:cursor-pointer"
              />
              {imageError && (
                <p className="text-xs text-error mt-1" role="alert">
                  {imageError}
                </p>
              )}
              {formData.customImageName && !imageError && (
                <p className="text-xs text-success mt-1">
                  Selected file: {formData.customImageName}
                </p>
              )}
            </div>

            <Input
              label="Custom Style Quantity"
              name="customQuantity"
              value={formData.customQuantity}
              onChange={handleChange}
              placeholder="e.g. 10,000 units"
              error={errors.customQuantity}
            />
          </div>

          <Textarea
            label="Custom Bag Description"
            name="customDescription"
            value={formData.customDescription}
            onChange={handleChange}
            placeholder="Please describe details like size, thickness, custom printing, handles, material type (canvas, cotton, non-woven)..."
            required
            error={errors.customDescription}
          />
        </div>
      )}

      <div className="mt-6">
        <Button type="submit" size="lg" loading={loading} fullWidth>
          Submit Quote Request
        </Button>
      </div>
    </form>
  );
}
