export interface productsTypeRequest {
  name: string;
  description: string;
  categoryId: string;
}

export interface ProductTypeResponse {
  productId: string;
  name: string;
  description: string;
  categoryId: string;
  imageId: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}
