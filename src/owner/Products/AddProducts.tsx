import { useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useGetCategoriesQuery } from '@/features/category/categoryApi';
import { useAddProductMutation } from '@/features/products/productsApi';
import toast from "react-hot-toast";
import { X, UploadCloud } from "lucide-react"; 

function AddProducts() {
    const { data: categories, isLoading, error } = useGetCategoriesQuery();
    const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
    
    type ProductFormData = {
        name: string;
        description: string;
        categoryId: string;
        price: number;
        pictures: File[];
        salesPrice: number;
        costPrice: number;
        stockQuantity: number;
        weight: number;
        ingredients: string;
    };

    const [formData, setFormData] = useState<ProductFormData>({
        name: '',
        description: '',
        categoryId: '',
        price: 0,
        pictures: [],
        salesPrice: 0,
        costPrice: 0,
        stockQuantity: 0,
        weight: 0,
        ingredients: ''
    });

      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (!e.target.files) return;
          const filesArray = Array.from(e.target.files);
          const totalImages = formData.pictures.length + filesArray.length;
          if (totalImages > 5) {
              toast.error("Maximum 5 images only");
              return;
          }
          setFormData((prev) => ({  
              ...prev,
              pictures: [...prev.pictures, ...filesArray]
          }));
      };


    const removeImage = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            pictures: prev.pictures.filter((_, i) => i !== index)
        }));
    };

    const UploadProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('categoryId', formData.categoryId);
        data.append('price', formData.price.toString());
        data.append('salesPrice', formData.salesPrice.toString());
        data.append('costPrice', formData.costPrice.toString());
        data.append('stockQuantity', formData.stockQuantity.toString());
        data.append('weight', formData.weight.toString());
        data.append('ingredients', formData.ingredients);

        formData.pictures.forEach((file) => {
            data.append('pictures', file);
        });

        try {
            await addProduct(data).unwrap();
            
            setFormData({
                name: '', description: '', categoryId: '', price: 0,
                pictures: [], salesPrice: 0, costPrice: 0,
                stockQuantity: 0, weight: 0, ingredients: '',
            });
            toast.success("Product added successfully!");
        } catch (err) {
            console.error("Upload Error:", err);
            toast.error(err?.data?.message || "Failed to add product");
        }
    };

    if (isLoading) return <div className="p-10 text-center">Loading categories...</div>;
    if (error) return <div className="p-10 text-center text-red-500">Error loading categories.</div>;

    return (
        <section className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-10 my-10">
            <div className="mb-8 border-b pb-4">
                <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
                <p className="text-gray-500">List a new item in your inventory</p>
            </div>

            <form className="space-y-6" onSubmit={UploadProduct}>
                <div className="bg-gray-50 p-6 rounded-xl border-2 border-dashed border-gray-200">
                    <label className="block text-sm font-semibold text-gray-700 mb-4">Product Gallery</label>
                    
                    <div className="flex flex-wrap gap-4">
                        {formData.pictures.map((file, index) => (
                            <div key={index} className="relative w-24 h-24 group">
                                <img 
                                    src={URL.createObjectURL(file)} 
                                    alt="preview" 
                                    className="w-full h-full object-cover rounded-lg border shadow-sm"
                                />
                                <button 
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}

                        <label className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-white hover:border-[var(--primary)] transition text-gray-400 hover:text-[var(--primary)]">
                            <UploadCloud size={24} />
                            <span className="text-[10px] mt-1 font-medium">Upload</span>
                            <input 
                                type="file" 
                                multiple 
                                hidden 
                                accept="image/*" 
                                onChange={handleFileChange} 
                            />
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Product Name"
                        placeholder="e.g. Gold Plated Necklace"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            required
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
                            value={formData.categoryId}
                            onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
                        >
                            <option value="">Select Category</option>
                            {categories?.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>

                    <Input
                        label="Cost Price (RWF)"
                        type="number"
                        value={formData.costPrice.toString()}
                        onChange={e => setFormData({ ...formData, costPrice: Number(e.target.value) })}
                    />

                    <Input
                        label="Selling Price (RWF)"
                        type="number"
                        value={formData.price.toString()}
                        onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                    />

                    <Input
                        label="Stock Quantity"
                        type="number"
                        value={formData.stockQuantity.toString()}
                        onChange={e => setFormData({ ...formData, stockQuantity: Number(e.target.value) })}
                    />

                    <Input
                        label="Weight (g)"
                        type="number"
                        value={formData.weight.toString()}
                        onChange={e => setFormData({ ...formData, weight: Number(e.target.value) })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        rows={3}
                        className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none"
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients / Materials</label>
                    <textarea
                        rows={2}
                        className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none"
                        value={formData.ingredients}
                        onChange={e => setFormData({ ...formData, ingredients: e.target.value })}
                    />
                </div>

                <div className="flex justify-end pt-6">
                    <Button 
                        type="submit"
                        disabled={isAdding} 
                        className="w-full md:w-auto px-12 py-3 rounded-xl bg-[var(--primary)] text-white font-bold shadow-lg"
                    >
                        {isAdding ? "Uploading..." : "Upload Product"}
                    </Button>
                </div>
            </form>
        </section>
    );
}

export default AddProducts;