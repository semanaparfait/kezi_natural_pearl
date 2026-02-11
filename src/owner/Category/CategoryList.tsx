import Button from '@/components/Button';
import Input from '@/components/Input';
import { useGetCategoriesQuery, useDeleteCategoryMutation } from '@/features/category/categoryApi';
import { Pencil, Tag, Trash } from 'lucide-react';
import { useState } from 'react';
import { toast } from "react-hot-toast"

function CategoryList() {
  const { data: categories, error, isLoading } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  // cosnt [data:editCategory] = useEditCategoryMutation();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  console.log(categories);

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

  // const handleEdit = (id: string) => {

  //   // Implement edit functionality here
  //   toast.error("Edit functionality not implemented yet");
  // }

  return (
    <section className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
        <span className="text-sm text-gray-500">{categories?.length || 0} total</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories?.map((category) => (
          <div
            key={category.categoryId}
            className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition"
          >
            <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
              <img src={category.image} alt={category.name} className="w-6 h-6 object-cover rounded-full" />
            </div>

            <div>
              <p className="font-medium text-gray-800">{category.name}</p>
              <p className="text-xs text-gray-500">{category.description}</p>
            </div>
            <div className='flex ml-auto gap-2'>

            <Trash
              onClick={() => handleDelete(String(category.categoryId))}
              className={`ml-auto w-10 h-10 p-2 rounded-full cursor-pointer ${
                deletingId === String(category.categoryId)
                  ? 'text-gray-400 bg-gray-200 animate-pulse'
                  : 'text-red-500 bg-red-200 hover:text-red-700'
              }`}
            />
                  <Pencil
              // onClick={() => handleEdit(String(category.categoryId))}
              className={`ml-auto w-10 h-10 p-2 rounded-full cursor-pointer ${
                deletingId === String(category.categoryId)
                  ? 'text-gray-400 bg-gray-200 animate-pulse'
                  : 'text-white bg-[var(--primary)] hover:text-red-700'
              }`}
            />
            </div>
          </div>
        ))}
      </div>
      <form className='flex flex-col gap-2' onSubmit={(e) => e.preventDefault()}>
        <Input
          label="Name"
          placeholder="Category Name"
          value={""}
          onChange={() => {}}
        />
        <Input
          label="Description"
          placeholder="Category Description"
          value={""}
          onChange={() => {}}
        />
        <Button type="submit" className="mt-4">Update Category</Button>
      </form>
    </section>
  );
}

export default CategoryList;
