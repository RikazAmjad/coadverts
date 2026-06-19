import { ProductCategory, CertificationBlock, ReferenceBlock, ServiceBlock } from "@/types";

export interface CompanyOffice {
  id: string;
  country: string;
  companyName: string;
  regNumber: string;
  address: string;
  visitAddress?: string;
  email: string;
  phone: string;
  role: string;
  website: string;
}

export interface IProductRepository {
  getAllCategories(): Promise<ProductCategory[]>;
  getCategoryById(id: string): Promise<ProductCategory | null>;
  getAllCertifications(): Promise<CertificationBlock[]>;
  getAllReferences(): Promise<ReferenceBlock[]>;
  getAllServices(): Promise<ServiceBlock[]>;
  getOffices(): Promise<CompanyOffice[]>;
}
