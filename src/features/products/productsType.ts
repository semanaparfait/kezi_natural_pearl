// export interface productsTypeRequest {
//   name: string;
//   description: string;
//   categoryId: string;
//   price: number;
//   pictures: string[];
//   salesPrice: number;
//   costPrice: number;
//   stockQuantity: number;
//   weight: number;
//   ingredients: string;
// }

export interface ProductTypeResponse {
  id: string;
  images: string[];
  name: string;
  description: string;
  category: {
    id: string;
    name: string;
    image: string;
  };
    price: number;
    priceFormatted: string;
    oldPrice: number;
    oldPriceFormatted: string;
    stockQuantity: number;
    ingredients: string;

}
