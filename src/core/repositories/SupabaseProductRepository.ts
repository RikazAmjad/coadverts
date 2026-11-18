import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { IProductRepository, CompanyOffice } from "./IProductRepository";
import { ProductCategory, CertificationBlock, ReferenceBlock, ServiceBlock } from "@/types";
import {
  productCategories as staticCategories,
  certifications as staticCertifications,
  references as staticReferences,
  services as staticServices,
} from "@/lib/data";

interface DBSubcategory {
  id: string;
  name: string;
  description: string;
  detailed_copy?: string;
  features?: string[];
  image_url: string;
  gallery?: string[];
  certification_note?: string;
  cta_text?: string;
}

interface DBCategory {
  id: string;
  name: string;
  description: string;
  long_description?: string;
  image_url: string;
  hero_image_url?: string;
  subcategories?: DBSubcategory[];
  product_category_certifications?: { certification_id: string }[];
}

interface DBCertification {
  id: string;
  name: string;
  short_name?: string;
  logo_url: string;
  description: string;
  validity_scope?: string;
}

interface DBReference {
  id: string;
  client_name: string;
  industry: string;
  region: ReferenceBlock["region"];
  logo_url: string;
  note?: string;
}

interface DBService {
  id: string;
  title: string;
  description: string;
  details?: string[];
  icon: string;
  image_url?: string;
}

interface DBOffice {
  id: string;
  country: string;
  company_name: string;
  reg_number: string;
  address: string;
  visit_address?: string;
  email: string;
  phone: string;
  role: string;
  website: string;
}

const staticOffices: CompanyOffice[] = [
  {
    id: "sweden",
    country: "Sweden",
    companyName: "CoAdvert AB",
    regNumber: "556892-9052",
    address: "Kivra: 556892-9052, 106 31 Stockholm SE, Sweden",
    email: "customerservice@coadvert.com",
    phone: "",
    role: "Head Office, Design & Scandinavian Logistics Hub",
    website: "www.coadvert.com",
  },
  {
    id: "pakistan",
    country: "Pakistan",
    companyName: "MH Tex",
    regNumber: "023491-3",
    address: "Plot No 16 Al Mumtaz Street, Choudry Town Behind J Tex, 38000 Faisalabad, Pakistan",
    email: "info@mhtextilw.com.pk, mumtaz_kb@yahoo.com",
    phone: "+92-41-2690655",
    role: "Manufacturing Base, Weaving & Stitching Facility",
    website: "www.mhtextile.com.pk",
  },
];

export class SupabaseProductRepository implements IProductRepository {
  async getAllCategories(): Promise<ProductCategory[]> {
    if (!isSupabaseConfigured) {
      return staticCategories;
    }
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

      const rows = data as unknown as DBCategory[];
      return rows.map((cat) => ({
        id: cat.id,
        name: cat.name,
        description: cat.description,
        longDescription: cat.long_description,
        image: cat.image_url,
        heroImage: cat.hero_image_url,
        certifications: cat.product_category_certifications?.map((c) => c.certification_id) || [],
        subcategories: (cat.subcategories || []).map((sub) => ({
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
    if (!isSupabaseConfigured) {
      return staticCategories.find((cat) => cat.id === id) || null;
    }
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

      const row = data as unknown as DBCategory;
      return {
        id: row.id,
        name: row.name,
        description: row.description,
        longDescription: row.long_description,
        image: row.image_url,
        heroImage: row.hero_image_url,
        certifications: row.product_category_certifications?.map((c) => c.certification_id) || [],
        subcategories: (row.subcategories || []).map((sub) => ({
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
    if (!isSupabaseConfigured) {
      return staticCertifications;
    }
    try {
      const { data, error } = await supabase
        .from("certifications")
        .select("*");

      if (error || !data || data.length === 0) {
        if (error) console.error("Error fetching certifications from Supabase:", error);
        return staticCertifications;
      }

      const rows = data as unknown as DBCertification[];
      return rows.map((c) => ({
        id: c.id,
        name: c.name,
        shortName: c.short_name || c.name,
        logo: c.logo_url,
        description: c.description,
        validityScope: c.validity_scope || "",
      }));
    } catch (err) {
      console.error("Failed to query certifications:", err);
      return staticCertifications;
    }
  }

  async getAllReferences(): Promise<ReferenceBlock[]> {
    if (!isSupabaseConfigured) {
      return staticReferences;
    }
    try {
      const { data, error } = await supabase
        .from("references")
        .select("*")
        .order("display_order", { ascending: true });

      if (error || !data || data.length === 0) {
        if (error) console.error("Error fetching references from Supabase:", error);
        return staticReferences;
      }

      const rows = data as unknown as DBReference[];
      return rows.map((r) => ({
        id: r.id,
        clientName: r.client_name,
        industry: r.industry,
        region: r.region,
        logo: r.logo_url,
        note: r.note,
      }));
    } catch (err) {
      console.error("Failed to query references:", err);
      return staticReferences;
    }
  }

  async getAllServices(): Promise<ServiceBlock[]> {
    if (!isSupabaseConfigured) {
      return staticServices;
    }
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*");

      if (error || !data || data.length === 0) {
        if (error) console.error("Error fetching services from Supabase:", error);
        return staticServices;
      }

      const rows = data as unknown as DBService[];
      return rows.map((s) => ({
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
    if (!isSupabaseConfigured) {
      return staticOffices;
    }
    try {
      const { data, error } = await supabase
        .from("company_offices")
        .select("*");

      if (error || !data || data.length === 0) {
        if (error) console.error("Error fetching offices from Supabase:", error);
        return staticOffices;
      }

      const rows = data as unknown as DBOffice[];
      return rows.map((o) => ({
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
