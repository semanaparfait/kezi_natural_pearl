import { useState } from "react";
import Button from "@/components/Button"
import Input from "@/components/Input"
import {useGetCategoriesQuery} from '@/features/category/categoryApi'
import {useAddProductMutation} from '@/features/products/productsApi'
import toast from "react-hot-toast";


function AddProducts() {
    const {data: categories , isLoading, error} = useGetCategoriesQuery();
    const [addProduct] = useAddProductMutation();
    const [formData, setFormData] = useState({
        name: '',
        newPrice: '',
        oldPrice: '',
        categoryId: '',
        description: '',
        image: null as File | null,
    });   

    const UploadProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addProduct(formData);
            setFormData({
                name: '',
                newPrice: '',
                oldPrice: '',
                categoryId: '',
                description: '',
                image: null,
            });
            toast.success("Product added successfully");
        } catch (err) {
            console.error(err);
            toast.error("Failed to add product");
        }
    };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500">
        Loading categories for products…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-red-500">
        Failed to load categories options for products
      </div>
    );
  }
  return (
<section className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
  <div className="mb-6">
    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
      Add Product
    </h1>
    <p className="text-sm text-gray-500 mt-1">
      Fill in the details below to add a new product to your store
    </p>
  </div>

  <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={UploadProduct}>
      <Input
        label="Product Image"
        type="file"
        helperText="Upload a clear product image"
        value={formData.image as unknown as string}
        onChange={e => setFormData({ ...formData, image: e.target.files ? e.target.files[0] : null })}
      />
      <Input
        label="Product Name"
        type="text"
        placeholder="e.g. Organic Honey"
        required
        value={formData.name}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
      />
    <Input
      label="New Price"
      type="number"
      placeholder="Current price"
      min={1}
      value={formData.newPrice}
      onChange={e => setFormData({ ...formData, newPrice: e.target.value })}
    />

    <Input
      label="Old Price"
      type="number"
      placeholder="Previous price"
      min={1}
      value={formData.oldPrice}
      onChange={e => setFormData({ ...formData, oldPrice: e.target.value })}
    />
    <div className="md:col-span-2">
      <label className="mb-1 block text-sm font-medium text-gray-700">
        Category
      </label>
      <select
        required
        className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 outline-none focus:border-[var(--gold-color)] focus:ring-2 focus:ring-[var(--gold-color)] transition"
        value={formData.categoryId}
        onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
      >
        <option value="">Select Category</option>
        {categories?.map((category) => (
          <option key={category.categoryId} value={category.categoryId}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
    <div className="md:col-span-2">
      <label className="mb-1 block text-sm font-medium text-gray-700">
        Product Description
      </label>
      <textarea
        required
        rows={4}
        placeholder="Write a short and clear description of the product..."
        value={formData.description}
        onChange={e => setFormData({ ...formData, description: e.target.value })}
        className="w-full resize-none rounded-2xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 outline-none focus:border-[var(--gold-color)] focus:ring-2 focus:ring-[var(--gold-color)] transition"
      />
    </div>
    <div className="md:col-span-2 flex justify-end pt-2">
      <Button className="px-8 py-2 rounded-xl" type="submit">
        Add Product
      </Button>
    </div>
  </form>
</section>

  )
}

export default AddProducts