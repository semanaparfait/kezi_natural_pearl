import { useState } from "react";
import { X, UploadCloud } from "lucide-react";
import { toast } from "react-hot-toast";
import { usePostCategoryMutation } from "@/features/category/categoryApi";
import Input from "@/components/Input";

function AddCategoryForm() {
  const [postCategory, { isLoading: isAdding }] = usePostCategoryMutation();
  const [formData, setFormData] = useState({
    image: null as File | null,
    name: "",
    description: "",
  });

  // Handle new file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setFormData((prev) => ({
      ...prev,
      image: e.target.files![0],
    }));
  };

  // Remove selected image
  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
  };

  // Submit form
  const createCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      toast.error("Please upload an image");
      return;
    }

    try {
      const data = new FormData();
      data.append("picture", formData.image); // must match backend
      data.append("name", formData.name);
      data.append("description", formData.description);

      await postCategory(data).unwrap();

      toast.success("Category added successfully");
      setFormData({ image: null, name: "", description: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to add category");
    }
  };

  return (
    <section className="bg-white rounded-xl shadow-md p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Add New Category
      </h2>

      <form className="flex flex-col gap-4" onSubmit={createCategory}>
        {/* Single Image Upload */}
        <div >
          <label className="block text-sm font-semibold text-gray-700 mb-4">
            Category Image
          </label>

          {formData.image ? (
            <div className="relative w-20 h-20 ">
              <img
                src={URL.createObjectURL(formData.image)}
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
            <label className="w-20 h-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-white hover:border-[var(--primary)] transition text-gray-400 hover:text-[var(--primary)]">
              <UploadCloud size={24} />
              <span className="text-[10px] mt-1 font-medium">Click to upload</span>
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
            </label>
          )}
        </div>

        <Input
          label="Category Name"
          placeholder="Enter category name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <Input
          label="Description"
          placeholder="Enter category description"
          required
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        <button
          type="submit"
          className="mt-2 px-6 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-1 disabled:opacity-50"
          disabled={isAdding}
        >
          {isAdding ? "Uploading..." : "Upload Category"}
        </button>
      </form>
    </section>
  );
}

export default AddCategoryForm;
