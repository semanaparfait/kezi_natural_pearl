import { useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { Pencil, Trash, X, UploadCloud } from "lucide-react";
import { useGetCategoriesQuery, useDeleteCategoryMutation, useEditCategoryMutation } from "@/features/category/categoryApi";
import { toast } from "react-hot-toast";

function CategoryList() {
  const { data: categories, error, isLoading } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [editCategory, {isLoading: isEditLoading}] = useEditCategoryMutation();

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
    image: null as File | null,
    preview: "" as string,
  });

  if (isLoading) return <div className="text-gray-500 animate-pulse">Loading categories...</div>;
  if (error) return <div className="text-red-500">Failed to load categories</div>;

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      setDeletingId(id);
      await deleteCategory(id).unwrap();
      toast.success("Category deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete category");
    } finally {
      setDeletingId(null);
    }
  };

  // Open edit form
  const handleEdit = (category: any) => {
    setEditingId(category.id);
    setEditFormData({
      name: category.name,
      description: category.description,
      image: null,
      preview: category.image,
    });
  };

  const removeImage = () => setEditFormData((prev) => ({ ...prev, image: null, preview: "" }));
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setEditFormData((prev) => ({
      ...prev,
      image: e.target.files![0],
      preview: URL.createObjectURL(e.target.files![0]),
    }));
  };

    const submitEdit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!editingId) return;

      try {
        const data = new FormData();
        if (editFormData.image) {
          data.append("picture", editFormData.image); // new file
        } else if (editFormData.preview) {
          data.append("picture", editFormData.preview); // send old image URL
        }
        data.append("name", editFormData.name);
        data.append("description", editFormData.description);

        await editCategory({ id: editingId, formData: data }).unwrap();
        toast.success("Category updated successfully");
        setEditingId(null);
        setEditFormData({ name: "", description: "", image: null, preview: "" });
      } catch (err) {
        console.error(err);
        toast.error("Failed to update category");
      }
    };


  return (
    <section className="bg-white rounded-xl shadow-sm p-6 relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
        <span className="text-sm text-gray-500">{categories?.length || 0} total</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
        {categories?.map((category) => (
          <div
            key={category.id}
            className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition"
          >
            <div className="w-20 h-20 rounded-full bg-(--primary)/10 flex items-center justify-center">
              <img src={category.image} alt={category.name} className="w-20 h-20 object-cover rounded-full" />
            </div>

            <div>
              <p className="font-medium text-gray-800">{category.name}</p>
              <p className="text-xs text-gray-500">{category.description.slice(0, 100)}</p>
            </div>

            <div className="flex ml-auto gap-2">
              <Trash
                onClick={() => handleDelete(category.id)}
                className={`w-10 h-10 p-2 rounded-full cursor-pointer ${
                  deletingId === category.id
                    ? "text-gray-400 bg-gray-200 animate-pulse"
                    : "text-red-500 bg-red-200 hover:text-red-700"
                }`}
              />
              <Pencil
                onClick={() => handleEdit(category)}
                className={`w-10 h-10 p-2 rounded-full cursor-pointer ${
                  deletingId === category.id
                    ? "text-gray-400 bg-gray-200 animate-pulse"
                    : "text-white bg-(--primary) hover:text-red-700"
                }`}
              />
            </div>
          </div>
        ))}
      </div>

      {editingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80 relative">
            <form className="flex flex-col gap-2" onSubmit={submitEdit}>
              <div className="w-32 h-32 mb-2 relative">
                {editFormData.preview ? (
                  <div className="relative w-full h-full">
                    <img
                      src={editFormData.preview}
                      alt="preview"
                      className="w-full h-full object-cover rounded-lg border shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <label className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition text-gray-400">
                    <UploadCloud size={24} />
                    <span className="text-[10px] mt-1 font-medium">Upload Image</span>
                    <input type="file" accept="image/*" hidden onChange={handleFileChange} />
                  </label>
                )}
              </div>

              <Input
                label="Name"
                placeholder="Category Name"
                value={editFormData.name}
                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
              />
              <Input
                label="Description"
                placeholder="Category Description"
                value={editFormData.description}
                onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
              />
              <Button
               type="submit"
               disabled={isEditLoading}
               className="mt-4">
                {isEditLoading ? "Saving..." : "Save Changes"}
              </Button>
            </form>

            <button
              type="button"
              onClick={() => setEditingId(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

    </section>
  );
}

export default CategoryList;
