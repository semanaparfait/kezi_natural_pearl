import  { useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";

const products = [
  {
    id: 2,
    name: "Citrus Zest Bar",
    price: 10,
    image:
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
    category: "Citrus",
  },
  {
    id: 1,
    name: "Lavender Bliss Soap",
    price: 12,
    image:
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
    category: "Lavender",
  },
  {
    id: 3,
    name: "Oatmeal Honey Soap",
    price: 14,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    category: "Oatmeal",
  },
  {
    id: 4,
    name: "Charcoal Detox Bar",
    price: 15,
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    category: "Charcoal",
  },
  {
    id: 5,
    name: "Rose Petal Soap",
    price: 13,
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    category: "Rose",
  },
];

const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];
const sortOptions = [
  { label: "Price: Low to High", value: "asc" },
  { label: "Price: High to Low", value: "desc" },
];

function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sort, setSort] = useState("asc");

  const filtered = products.filter(
    p => selectedCategory === "All" || p.category === selectedCategory
  );

  const sorted = [...filtered].sort((a, b) =>
    sort === "asc" ? a.price - b.price : b.price - a.price
  );

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-gray-100 py-16 mb-12">
        <h1 className="text-4xl font-bold text-center mb-2">Shop</h1>
        <p className="text-center text-gray-500">Home / Shop</p>
      </section>

      <section className="px-4 md:px-16 mb-20">
        <div className="flex gap-10">

          {/* Filters */}
          <aside className="hidden md:block w-64 sticky top-24 self-start bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Category
              </h3>
              <ul className="space-y-2">
                {categories.map(cat => (
                  <li key={cat}>
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-left w-full px-3 py-2 rounded-lg transition ${
                        selectedCategory === cat
                          ? "bg-[var(--primary)] text-white"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            {/* Top bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <p className="text-sm text-gray-500">
                Showing {sorted.length} results
              </p>

              <div className="flex gap-3">
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="border rounded-lg px-3 py-2 text-sm"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="border rounded-lg px-3 py-2 text-sm"
                >
                  {sortOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {sorted.map(product => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover rounded-xl mb-4"
                  />

                  <h3 className="font-semibold text-lg mb-1">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl font-semibold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ${(product.price + 3).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">Add to Cart</Button>
                    <span className="hidden md:block">
                      <Button variant="secondary">Buy</Button>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default Shop;
