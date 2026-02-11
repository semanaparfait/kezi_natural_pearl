import {useState} from "react";
import Input from "@/components/Input"; 
import { toast } from "react-hot-toast"
import {usePostCategoryMutation} from '@/features/category/categoryApi'

function AddCategoryForm() {
    const [postCategory] = usePostCategoryMutation();
    const [formData, setFormData] = useState({
        image: null as File | null,
        name: '',
        description: '',
    });

    const createCategory = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        const data = new FormData();
        if (formData.image) data.append("image", formData.image);
        data.append("name", formData.name);
        data.append("description", formData.description);

        await postCategory(data).unwrap();

        toast.success("Category added successfully");
        setFormData({ image: null, name: '', description: '' });

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
        <input
          accept="image/*"
          type="file"
          required
          onChange={e => setFormData({ ...formData, image: e.target.files ? e.target.files[0] : null })}
 
        />

        <Input
          label="Category Name"
          placeholder="Enter category name"
          required
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
        />
        <Input
          label="Description"
          placeholder="Enter category description"
          required
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
        />

        <button
          type="submit"
          className="mt-2 px-6 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-1"
        >
          Add Category
        </button>
      </form>
    </section>
  );
}

export default AddCategoryForm;
