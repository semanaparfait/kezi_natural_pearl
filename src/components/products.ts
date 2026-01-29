
import p1 from '@/assets/products/p1.jpeg'
import p2 from '@/assets/products/p2.jpeg'
import p3 from '@/assets/products/p3.jpeg'
import p4 from '@/assets/products/p4.jpeg'
import p5 from '@/assets/products/p5.jpeg'
import p6 from '@/assets/products/p6.jpeg'
import p7 from '@/assets/products/p7.jpeg'
import p8 from '@/assets/products/p8.jpeg'
export type ImageArrayMax5 =
  | [string]
  | [string, string]
  | [string, string, string]
  | [string, string, string, string]
  | [string, string, string, string, string];

export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice:number;
  image: string | ImageArrayMax5;
  onSale:boolean,
  outOfStock:boolean,
  description: string;
  category: string;
}
export const products: Product[] = [
  {
    id: 1,
    name: "Arm & Earring Combo",
    price: 4990,
    onSale:true,
    outOfStock:false,
    oldPrice:7000,
    image: [
      p1,
      p2,
      p3,
      p4,
    ],
    description: "Elegant arm and earring combination for the perfect look.",
    category: "Combos",
  },
  {
    id: 2,
    name: "Arm & Necklace Combo",
    price: 7990,
    onSale:false,
    outOfStock:false,
    oldPrice:10000,
    image: [
      p3,
      p6,
      p7,
      p8,
    ],
    description: "Stunning arm and necklace set for special occasions.",
    category: "Combos",
  },
  {
    id: 3,
    name: "Arm Ring Collection",
    price: 2490,
    oldPrice:4000,
    outOfStock:false,
    onSale:true,
    image: [
      p2,
      p3,
      p4,
      p5,
    ],
    description: "Beautiful arm ring collection with various designs.",
    category: "Arm Rings",
  },
  {
    id: 4,
    name: "Wrist Collection",
    price: 5990,
    outOfStock:false,
    onSale:false,
    oldPrice:7000,
    image: [
      p2,
      p7,
      p8,
      p1,
    ],
    description: "Elegant wrist jewelry collection for everyday wear.",
    category: "Wrist",
  },
  {
    id: 5,
    name: "Big Earrings",
    price: 3990,
    onSale:true,
    outOfStock:false,
    oldPrice:5000,
    image: [
      p3,
      p4,
      p5,
      p6,
    ],
    description: "Statement big earrings to enhance your style.",
    category: "Earrings",
  },
  {
    id: 6,
    name: "Small Earrings",
    price: 1990,
    oldPrice:3000,
    outOfStock:false,
    onSale:false,
    image: [
      p7,
      p8,
      p4,
      p1,
    ],
    description: "Delicate small earrings perfect for any occasion.",
    category: "Earrings",
  },
  {
    id: 7,
    name: "Mid-size Earrings",
    price: 6990,
    oldPrice:8000,
    onSale:true,
    outOfStock:false,
    image: [
      p4,
      p3,
      p4,
      p6,
    ],
    description: "Mid-size earrings for a balanced, elegant look.",
    category: "Earrings",
  },
  {
    id: 8,
    name: "Necklace Essentials",
    price: 1490,
    oldPrice:2500,
    onSale:true,
    outOfStock:false,
    image: [
      p7,
      p8,
      p3,
      p2,
    ],
    description: "Essential necklace pieces for your jewelry collection.",
    category: "Necklaces",
  },
  {
    id: 9,
    name: "Necklace Premium",
    price: 9990,
    oldPrice:12000,
    onSale:true,
    outOfStock:false,
    image: [
      p5,
      p7,
      p8,
      p6,
    ],
    description: "Premium necklace collection for sophisticated style.",
    category: "Necklaces",
  },
  {
    id: 10,
    name: "Complete Jewelry Set",
    price: 12990,
    oldPrice:16890,
    onSale:true,
    outOfStock:false,
    image: [
      p1,
      p5,
      p7,
      p5,
      p7,
    ],
    description: "Complete jewelry set with arms, necklaces, and earrings.",
    category: "Sets",
  },
];
