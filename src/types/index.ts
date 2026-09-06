export interface ProductSubcategory {
  id: string;
  name: string;
  description: string; // Short summary
  detailedCopy?: string; // Long detailed description
  features: string[]; // Specs/bullets
  image: string;
  gallery?: string[]; // Optional gallery of images
  certificationNote?: string; // Optional certification/compliance info
  ctaText?: string; // Custom call to action text
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  subcategories: ProductSubcategory[];
  longDescription?: string; // Rich storytelling/copy
  heroImage?: string; // Specific display photo
  certifications?: string[]; // Certifications applicable to this family
}

export interface ContactFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  category: string;
  quantity: string;
  message: string;
  honeypot?: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface ServiceBlock {
  id: string;
  title: string;
  description: string;
  details: string[];
  icon: string;
  image?: string;
}

export interface CertificationBlock {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  description: string;
  validityScope: string;
}

export interface ReferenceBlock {
  id: string;
  clientName: string;
  industry: string;
  region: "Nordic" | "Europe" | "Americas" | "Global";
  logo: string;
  note?: string;
  testimonial?: string;
}

