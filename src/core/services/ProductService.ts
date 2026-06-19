import { SupabaseProductRepository } from "../repositories/SupabaseProductRepository";

const repository = new SupabaseProductRepository();

export const ProductService = {
  async getAllCategories() {
    return repository.getAllCategories();
  },

  async getCategoryById(id: string) {
    return repository.getCategoryById(id);
  },

  async getAllCertifications() {
    return repository.getAllCertifications();
  },

  async getAllReferences() {
    return repository.getAllReferences();
  },

  async getAllServices() {
    return repository.getAllServices();
  },

  async getOffices() {
    return repository.getOffices();
  },
};
