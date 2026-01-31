import React, { useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const products = [
  {
    id: 1,
    name: "Lavender Bliss Soap",
    price: 12,
    image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
    category: "Lavender",
  },
  {
    id: 2,
    name: "Citrus Zest Bar",
    price: 10,
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
    category: "Citrus",
  },
  {
    id: 3,
    name: "Oatmeal Honey Soap",
    price: 14,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    category: "Oatmeal",
  },
  {
    id: 4,
    name: "Charcoal Detox Bar",
    price: 15,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    category: "Charcoal",
  },
  {
    id: 5,
    name: "Rose Petal Soap",
    price: 13,
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    category: "Rose",
  },
];

const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
const sortOptions = [
  { label: "Price: Low to High", value: "asc" },
  { label: "Price: High to Low", value: "desc" },
];

function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sort, setSort] = useState("asc");

  const filtered = products.filter(
    (p) => selectedCategory === "All" || p.category === selectedCategory
  );
  const sorted = [...filtered].sort((a, b) =>
    sort === "asc" ? a.price - b.price : b.price - a.price
  );

  return (
    <>
      <Navbar />
      <section >
        <div className="bg-gray-200  mb-8 shadow-md h-60 flex flex-col justify-center ">
          <h1 className="font-bold text-center text-4xl">Shop</h1>
          <p className="text-center">Home / Shop</p>
        </div>
        

      </section>
      <Footer />
    </>
  );
}

export default Shop;