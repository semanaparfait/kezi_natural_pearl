import {useState} from 'react'

import Button from '@/components/Button'
import Input from '@/components/Input'
import {useGetCategoriesQuery,usePostCategoryMutation} from '@/features/category/categoryApi'
import CategoryList from '@/owner/Category/CategoryList'
import AddCategoryForm from '@/owner/Category/AddCategoryForm'

type Tab = "view" | "add"
function Category() {
      const [activeTab, setActiveTab] = useState<Tab>("view");
  return (
    <section>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Categories</h1>
                    <p className="text-sm text-gray-600">View existing categories or add a new one.</p>
                </div>
                <div className="inline-flex rounded-md border border-gray-200 bg-white shadow-sm">
                    <button
                        className={`px-4 py-2 text-sm font-medium rounded-l-md ${activeTab === "view" ? "bg-[var(--primary)] text-white" : "text-gray-800"}`}
                        onClick={() => setActiveTab("view")}
                    >
                        View Categories
                    </button>
                    <button
                        className={`px-4 py-2 text-sm font-medium rounded-r-md ${activeTab === "add" ? "bg-[var(--primary)] text-white" : "text-gray-800"}`}
                        onClick={() => setActiveTab("add")}
                    >
                        Add Category
                    </button>
                </div>
            </div>
            {activeTab === "view" ? (
                <div className="mt-6">
                    <CategoryList />
                    
                    </div>) : (
                <div className="mt-6">
                    <AddCategoryForm />
                    </div>)
            }
    </section>
  )
}

export default Category