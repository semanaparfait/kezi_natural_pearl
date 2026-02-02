import { useState } from "react"
import AddProducts from '@/owner/Products/AddProducts'
import ListProducts from '@/owner/Products/ListProducts'
type Tab = "view" | "add";
function Products() {
    const [activeTab, setActiveTab] = useState<Tab>("view");
  return (
    <section>
       <div className="flex items-center justify-between">
              <div>
            <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
            <p className="text-sm text-gray-600">View existing products or add a new one.</p>
        </div>
        <div className="inline-flex rounded-md border border-gray-200 bg-white shadow-sm">
            <button
                className={`px-4 py-2 text-sm font-medium rounded-l-md ${activeTab === "view" ? "bg-[var(--primary)] text-white" : "text-gray-800"}`}
                onClick={() => setActiveTab("view")}
            >
                View products
            </button>
            <button
                className={`px-4 py-2 text-sm font-medium rounded-r-md ${activeTab === "add" ? "bg-[var(--primary)] text-white" : "text-gray-800"}`}
                onClick={() => setActiveTab("add")}
            >
                Add product
            </button>
        </div>
    </div><br />
    {activeTab === "view" ? <ListProducts /> : <AddProducts />}
    </section>
  )
}

export default Products