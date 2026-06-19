import { supabase } from "@/lib/supabase";
import { IProductRepository, CompanyOffice } from "./IProductRepository";
import { ProductCategory, CertificationBlock, ReferenceBlock, ServiceBlock } from "@/types";
import {
  productCategories as staticCategories,
  certifications as staticCertifications,
  references as staticReferences,
  services as staticServices,
} from "@/lib/data";

const staticOffices: CompanyOffice[] = [
  {
    id: "sweden",
    country: "Sweden",
    companyName: "CoAdvert AB",
    regNumber: "556892-9052",
    address: "Kivra: 556892-9052, 106 31 Stockholm SE, Sweden",
    email: "customerservice@coadvert.com",
    phone: "+46 8 123 456 78",
    role: "Sales, Technical Spec coordination, Compliance vetting & Client Support",
    website: "www.coadvert.com",
  },
  {
    id: "pakistan",
    country: "Pakistan",
    companyName: "MH Tex",
    regNumber: "N-15201083",
    address: "Nishatabad Industrial Area, Faisalabad, Punjab, Pakistan",
    email: "production@mhtex.com",
    phone: "+92 41 856 7890",
    role: "Textile weave, Safety Glove dipping, Canvas cutting & Export logistics",
    website: "www.coadvert.com",
  },
];

export class SupabaseProductRepository implements IProductRepository {
  async getAllCategories(): Promise<ProductCategory[]> {
    try {
      const { data, error } = await supabase
        .from("product_categories")
        .select(`
          *,
          subcategories:product_subcategories(*),
          product_category_certifications(certification_id)
        `);

      if (error || !data || data.length === 0) {
        if (error) console.error("Error fetching categories from Supabase:", error);
        return staticCategories;
      }

      return data.map((cat: any) => ({
        id: cat.id,
        name: cat.name,
        description: cat.description,
        longDescription: cat.long_description,
        image: cat.image_url,
        heroImage: cat.hero_image_url,
        certifications: cat.product_category_certifications?.map((c: any) => c.certification_id) || [],
        subcategories: (cat.subcategories || []).map((sub: any) => ({
          id: sub.id,
          name: sub.name,
          description: sub.description,
          detailedCopy: sub.detailed_copy,
          features: sub.features || [],
          image: sub.image_url,
          gallery: sub.gallery || [],
          certificationNote: sub.certification_note,
          ctaText: sub.cta_text,
        })),
      }));
    } catch (err) {
      console.error("Failed to query categories:", err);
      return staticCategories;
    }
  }

  async getCategoryById(id: string): Promise<ProductCategory | null> {
    try {
      const { data, error } = await supabase
        .from("product_categories")
        .select(`
          *,
          subcategories:product_subcategories(*),
          product_category_certifications(certification_id)
        `)
        .eq("id", id)
        .maybeSingle();

      if (error || !data) {
        if (error) console.error(`Error fetching category ${id} from Supabase:`, error);
        return staticCategories.find((cat) => cat.id === id) || null;
      }

      return {
        id: data.id,
        name: data.name,
        description: data.description,
        longDescription: data.long_description,
        image: data.image_url,
        heroImage: data.hero_image_url,
        certifications: data.product_category_certifications?.map((c: any) => c.certification_id) || [],
        subcategories: (data.subcategories || []).map((sub: any) => ({
          id: sub.id,
          name: sub.name,
          description: sub.description,
          detailedCopy: sub.detailed_copy,
          features: sub.features || [],
          image: sub.image_url,
          gallery: sub.gallery || [],
          certificationNote: sub.certification_note,
          ctaText: sub.cta_text,
        })),
      };
    } catch (err) {
      console.error(`Failed to query category ${id}:`, err);
      return staticCategories.find((cat) => cat.id === id) || null;
    }
  }

  async getAllCertifications(): Promise<CertificationBlock[]> {
    try {
      const { data, error } = await supabase
        .from("certifications")
        .select("*");

      if (error || !data || data.length === 0) {
        if (error) console.error("Error fetching certifications from Supabase:", error);
        return staticCertifications;
      }

      return data.map((c: any) => ({
        id: c.id,
        name: c.name,
        shortName: c.short_name,
        logo: c.logo_url,
        description: c.description,
        validityScope: c.validity_scope,
      }));
    } catch (err) {
      console.error("Failed to query certifications:", err);
      return staticCertifications;
    }
  }

  async getAllReferences(): Promise<ReferenceBlock[]> {
    try {
      const { data, error } = await supabase
        .from("references")
        .select("*")
        .order("display_order", { ascending: true });

      if (error || !data || data.length === 0) {
        if (error) console.error("Error fetching references from Supabase:", error);
        return staticReferences;
      }

      return data.map((r: any) => ({
        id: r.id,
        clientName: r.client_name,
        industry: r.industry,
        region: r.region as any,
        logo: r.logo_url,
        note: r.note,
      }));
    } catch (err) {
      console.error("Failed to query references:", err);
      return staticReferences;
    }
  }

  async getAllServices(): Promise<ServiceBlock[]> {
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*");

      if (error || !data || data.length === 0) {
        if (error) console.error("Error fetching services from Supabase:", error);
        return staticServices;
      }

      return data.map((s: any) => ({
        id: s.id,
        title: s.title,
        description: s.description,
        details: s.details || [],
        icon: s.icon,
        image: s.image_url || undefined,
      }));
    } catch (err) {
      console.error("Failed to query services:", err);
      return staticServices;
    }
  }

  async getOffices(): Promise<CompanyOffice[]> {
    try {
      const { data, error } = await supabase
        .from("company_offices")
        .select("*");

      if (error || !data || data.length === 0) {
        if (error) console.error("Error fetching offices from Supabase:", error);
        return staticOffices;
      }

      return data.map((o: any) => ({
        id: o.id,
        country: o.country,
        companyName: o.company_name,
        regNumber: o.reg_number,
        address: o.address,
        visitAddress: o.visit_address || undefined,
        email: o.email,
        phone: o.phone,
        role: o.role,
        website: o.website,
      }));
    } catch (err) {
      console.error("Failed to query offices:", err);
      return staticOffices;
    }
  }
}
