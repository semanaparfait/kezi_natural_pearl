import { useGetProductsQuery } from "@/features/products/productsApi";

function ListProducts() {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  if (isLoading) return <div className="p-6 text-center">Loading products...</div>;
  if (isError) return <div className="p-6 text-center text-red-500">Error loading products.</div>;

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <input type="search" placeholder="Search products..." className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-xs" />
        <button className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg hover:opacity-90 transition hidden">
          + Add New Product
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="p-4 font-semibold text-gray-600">Product</th>
              <th className="p-4 font-semibold text-gray-600">Price</th>
              <th className="p-4 font-semibold text-gray-600">Stock</th>
              <th className="p-4 font-semibold text-gray-600">Status</th>
              <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="w-12 h-12 rounded-lg object-cover bg-gray-200"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{product.name}</p>
                      <p className="text-xs text-gray-500 truncate max-w-[200px]">{product.description.slice(0, 70)}...</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 font-medium text-gray-700">
                  {product.price.toLocaleString()} RWF
                </td>
                <td className="p-4 text-gray-600">
                  {product.stockQuantity} pcs
                </td>
                <td className="p-4">
                  {product.stockQuantity > 0 ? (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                      In Stock
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-medium">
                      Out of Stock
                    </span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <button className="text-blue-600 hover:underline mr-3 text-sm">Edit</button>
                  <button className="text-red-500 hover:underline text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ListProducts;