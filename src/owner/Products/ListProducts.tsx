import { useGetProductsQuery, useDeleteProductMutation, useEditProductMutation } from "@/features/products/productsApi";
import Loading from "@/components/Loading";
import { useGetCategoriesQuery } from "@/features/category/categoryApi";
import { useState } from "react";
import toast from "react-hot-toast";
import { Edit3, Trash2, Search, X, Camera } from "lucide-react";

function ListProducts() {
  const { data: products, isLoading } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [editProduct, { isLoading: isEditing }] = useEditProductMutation();
  const { data: categories } = useGetCategoriesQuery();

  const [searchTerm, setSearchTerm] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [originalProduct, setOriginalProduct] = useState<any>(null); // Track original state
  const [editId, setEditId] = useState<string | null>(null);

  const [newImages, setNewImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    categoryId: '',
    price: 0,
    stockQuantity: 0,
    ingredients: '',
  });

  const openEditModal = (product: any) => {
    const catId = product.categoryId || product.category?.id || '';
    const initialData = {
      name: product.name,
      description: product.description,
      categoryId: catId,
      price: product.price,
      stockQuantity: product.stockQuantity,
      ingredients: product.ingredients || '',
    };
    
    setEditId(product.id);
    setOriginalProduct({ ...initialData, images: product.images });
    setEditForm(initialData);
    setNewImages([]);
    setPreviewUrls([]);
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editId || !originalProduct) return;

    const formData = new FormData();
    let hasChanges = false;

    // 1. Only append data if it changed from the original
    Object.keys(editForm).forEach((key) => {
      const currentValue = editForm[key as keyof typeof editForm];
      const originalValue = originalProduct[key];

      if (currentValue !== originalValue) {
        formData.append(key, currentValue.toString());
        hasChanges = true;
      }
    });

    // 2. Handle Images
    if (newImages.length > 0) {
      newImages.forEach((image) => formData.append('pictures', image));
      hasChanges = true;
    }

    if (!hasChanges) {
      toast.error("No changes detected");
      return;
    }

    try {
      await editProduct({ id: editId, formData }).unwrap();
      toast.success('Product updated successfully');
      setShowEditModal(false);
    } catch (err: any) {
      toast.error(err?.data?.message?.[0] || 'Update failed');
    }
  };

  // UI Helpers
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setNewImages(prev => [...prev, ...filesArray]);
      setPreviewUrls(prev => [...prev, ...filesArray.map(f => URL.createObjectURL(f))]);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <section className="p-8 bg-[#FBFBFB] min-h-screen text-slate-800">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-10 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-3xl font-light tracking-tight text-slate-900">Catalogue</h1>
            <p className="text-slate-500 text-sm mt-1 uppercase tracking-widest font-medium">Internal Management</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Filter products..."
              className="pl-10 pr-4 py-2 border-b border-slate-300 bg-transparent focus:border-slate-900 outline-none transition-colors text-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table - Classic Clean Design */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">Item</th>
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">Category</th>
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-slate-400 text-right">Stock</th>
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products?.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <img src={product.images[0]} className="w-10 h-10 object-cover rounded-sm grayscale-[0.2]" alt="" />
                      <div>
                        <span className="block font-medium text-slate-900">{product.name}</span>
                        <span className="text-xs text-slate-400 font-serif italic">${product.price}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-slate-500">{product.category?.name}</td>
                  <td className="p-4 text-right align-middle">
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] uppercase tracking-tighter font-bold ${
                          product.stockQuantity === 0 ? 'text-red-600' : 'text-slate-500'
                        }`}>
                          {product.stockQuantity === 0 ? 'Out of Stock' : 'Available'}
                        </span>
                        <span className={`h-1.5 w-1.5 rounded-full ${
                          product.stockQuantity === 0 
                            ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' 
                            : product.stockQuantity < 5 
                            ? 'bg-orange-400' 
                            : 'bg-emerald-500'
                        }`} />
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className={`text-sm font-serif italic ${
                          product.stockQuantity === 0 ? 'text-slate-300' : 'text-slate-900'
                        }`}>
                          {product.stockQuantity}
                        </span>
                        <span className="text-[9px] text-slate-400 uppercase tracking-widest">Units</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => openEditModal(product)} className="text-slate-400 hover:text-slate-900 mx-2 transition-colors"><Edit3 size={16}/></button>
                    <button onClick={() => window.confirm("Delete item?") && deleteProduct(Number(product.id))} className="text-slate-300 hover:text-red-600 transition-colors"><Trash2 size={16}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal - Classic Refined Style */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/10 backdrop-blur-md">
          <div className="bg-white border border-slate-200 shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-lg font-serif italic text-slate-800">Edit Product Profile</h2>
              <button onClick={() => setShowEditModal(false)}><X className="text-slate-400 hover:text-slate-900" /></button>
            </div>

            <form className="p-8 overflow-y-auto space-y-6" onSubmit={handleEditSubmit}>
              {/* Image Section */}
              <div className="flex gap-3 overflow-x-auto pb-4">
                {originalProduct?.images.map((img: string, i: number) => (
                  <img key={i} src={img} className="w-16 h-16 object-cover border border-slate-200 opacity-50" alt="" />
                ))}
                {previewUrls.map((url, i) => (
                  <img key={i} src={url} className="w-16 h-16 object-cover border-2 border-blue-400" alt="" />
                ))}
                <label className="w-16 h-16 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors text-slate-400">
                  <Camera size={16} />
                  <input type="file" multiple className="hidden" onChange={handleImageChange} />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Product Name</label>
                  <input className="w-full border-b border-slate-200 py-2 outline-none focus:border-slate-900 text-sm" 
                    value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Classification</label>
                  <select className="w-full border-b border-slate-200 py-2 outline-none focus:border-slate-900 text-sm bg-transparent"
                    value={editForm.categoryId} onChange={e => setEditForm({...editForm, categoryId: e.target.value})}>
                    {categories?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Price</label>
                    <input type="number" className="w-full border-b border-slate-200 py-2 outline-none text-sm" 
                      value={editForm.price} onChange={e => setEditForm({...editForm, price: Number(e.target.value)})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Stock</label>
                    <input type="number" className="w-full border-b border-slate-200 py-2 outline-none text-sm" 
                      value={editForm.stockQuantity} onChange={e => setEditForm({...editForm, stockQuantity: Number(e.target.value)})} />
                  </div>
                </div>

                <div className="col-span-2 space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Description</label>
                  <textarea rows={3} className="w-full border border-slate-100 p-3 bg-slate-50/50 outline-none text-sm italic font-serif"
                    value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} />
                </div>
                  <div className="col-span-2 space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Ingredients</label>
                  <textarea rows={3} className="w-full border border-slate-100 p-3 bg-slate-50/50 outline-none text-sm italic font-serif"
                    value={editForm.ingredients} onChange={e => setEditForm({...editForm, ingredients: e.target.value})} />
                </div>
              </div>

              <div className="pt-6 flex gap-4">
                <button type="button" onClick={() => setShowEditModal(false)} className="px-6 py-3 text-[11px] uppercase tracking-widest font-bold text-slate-400 hover:text-slate-900">Discard</button>
                <button type="submit" disabled={isEditing} className="flex-1 bg-slate-900 text-white py-3 text-[11px] uppercase tracking-widest font-bold shadow-xl hover:bg-slate-800 transition-all">
                  {isEditing ? "Synchronizing..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default ListProducts;