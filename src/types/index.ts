export interface ProductSubcategory {
  id: string;
  name: string;
  description: string;
  features: string[];
  image: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  subcategories: ProductSubcategory[];
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
