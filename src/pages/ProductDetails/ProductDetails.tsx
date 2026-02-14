import { Facebook, Heart, Instagram, Twitter, ChevronRight,  Minus, Plus, Zap, ShoppingBag } from "lucide-react";
import Button from "@/components/Button";
import { useState,useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {useParams} from "react-router-dom";
// import {products} from '@/components/products'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {useGetProductByIdQuery,useGetProductsQuery} from '@/features/products/productsApi'


function ProductDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: products, error, isLoading } = useGetProductByIdQuery(String(id));
    const { data: allProducts } = useGetProductsQuery(undefined);
    const [count, setCount] = useState(1);
    const [selectedImage, setSelectedImage] = useState(products?.images[0]);
    const [activeDetailTab, setActiveDetailTab] = useState< 'shipping' | 'ingredients' | 'reviews'>('ingredients');

if (isLoading) {
  return <p>Loading product...</p>;
}

if (error || !products) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h2 className="text-2xl font-semibold">Product not found.</h2>
    </div>
  );
}
useEffect(() => {
  if (products?.images?.length) {
    setSelectedImage(products.images[0]);
  }
}, [products]);


const relatedProducts = allProducts?.filter(p => p.category === products.category && p.id !== products.id).slice(0, 8);


// console.log(products);


    const stock = Number(products?.stockQuantity || 0);
    const remaining = Math.max(stock - count, 0);
    const outOfStock = stock === 0;
    // console.log("stock:", stock);
    // console.log("outOfStock:", outOfStock);


const handleAddToCart = () => {
    if (!products) return;
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const index = existingCart.findIndex((item: any) => item.id === products.id);

    if (index >= 0) {
        existingCart[index].quantity += count;
        if (existingCart[index].quantity > stock) {
            existingCart[index].quantity = stock;
        }
    } else {
        existingCart.push({
            id: products.id,
            name: products.name,
            price: products.price,
            quantity: count,
            image: products.images[0],
            category: products.category
        });
    }
    localStorage.setItem("cart", JSON.stringify(existingCart));

    toast.success(`${products.name} added to cart!`);
};






    return (
        <section className="min-h-screen bg-[var(--secondary-cream-white)] text-gray-800">
            <Navbar />

            <div className="relative w-full h-32 md:h-60 overflow-hidden bg-gray-900 flex items-center justify-center">
                <img 
                    src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1200" 
                    className="absolute w-full h-full object-cover opacity-40 grayscale"
                    alt="Hero"
                />
                <div className="relative text-center text-white z-10">
                    <h2 className="text-xl md:text-2xl font-serif tracking-widest uppercase mb-1">Face Care</h2>
                    <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-tighter opacity-80">
                        <span>Shop</span> <ChevronRight size={10} /> <span className="font-bold text-[var(--accent-color)]">{products?.category}</span>
                    </div>
                </div>
            </div>

            <main className="max-w-6xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row gap-12 items-start justify-center border-b border-[var(--bolder-gray)] pb-16">
                    <div className="w-full md:w-[320px] shrink-0"> 
                        <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-white border border-[var(--bolder-gray)] mb-4 shadow-sm">
                            <img className="w-full h-full object-cover" src={selectedImage} alt="Product" />
                        </div>
                        <div className="flex gap-2">
                        {(Array.isArray(products.images) ? products.images : [products.images]).map((img, i) => (
                            <button
                            key={i}
                            onClick={() => setSelectedImage(img)}
                            className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition
                            ${selectedImage === img ? "border-(--primary)" : "border-gray-200 opacity-60"}`}
                            >
                            <img src={img} className="w-full h-full object-cover"/>
                            </button>
                        ))}
                        </div>

                    </div>
                    <div className="flex-1 space-y-6 max-w-md">
                        <div className="space-y-2">
                    <div className={`flex items-center gap-2 font-bold text-[11px] uppercase tracking-widest
                    ${outOfStock 
                        ? "text-[var(--error-red)]" 
                        : remaining <= 5 
                            ? "text-[var(--error-red)]" 
                            : "text-(--primary)"
                    }`}
                    >
                    <Zap size={14} fill="currentColor" />
                    {outOfStock 
                        ? "Out of Stock" 
                        : `Only ${remaining} Item${remaining > 1 ? 's' : ''} Left!`
                    }
                    </div>
                            <h1 className="text-3xl font-serif text-(--primary)">{products.name}</h1>
                            <div className="flex items-center gap-4 py-1">
                                <span className="text-2xl font-semibold text-[var(--gold-color)]">{(products.price * count).toLocaleString()} RWF</span>
                                <span className="text-gray-400 line-through text-sm">{products.price} RWF</span>
                            </div>
                        </div>

                        <p className="text-gray-500 text-sm leading-relaxed italic">
                            {products.description}
                        </p>

                        <div className="flex items-center gap-3 pt-4">
                            <div className={`flex items-center border border-[var(--bolder-gray)] rounded-full h-12 bg-white px-2
                            ${outOfStock ? "opacity-40 pointer-events-none" : ""}`}>

                            <button  onClick={() => setCount(m => Math.max(1, m-1))} className={`px-2 ${count <= 1 ? "opacity-40 pointer-events-none" : ""}`}>
                                <Minus size={14}/>
                            </button>

                            <span className="w-8 text-center text-sm font-bold"> {outOfStock ? 0 : count}</span>

                            <button onClick={() => setCount(m => m+1)} className={`px-2 ${count >= stock ? "opacity-40 pointer-events-none" : ""}`}  >
                                <Plus size={14}/>
                            </button>
                            </div>

                        <Button className={`h-12 flex-1 rounded-full text-[11px] uppercase tracking-widest font-bold shadow-md
                        ${outOfStock 
                            ? "bg-yellow-500 cursor-not-allowed text-white" 
                            : "bg-(--primary) hover:brightness-110 text-white"
                        }`}
                        disabled={outOfStock}
                        onClick={handleAddToCart}
                        >
                        <p className="flex items-center justify-center">
                            {outOfStock ? "Out of Stock" : "Add to Cart"}
                            <ShoppingBag size={16} className="ml-2" />
                        </p>
                        </Button>

                            <button className="h-12 w-12 flex items-center justify-center border border-[var(--bolder-gray)] rounded-full hover:bg-red-50 text-(--primary) bg-white">
                                <Heart size={20} />
                            </button>
                        </div>
                        <div className="flex gap-2 items-center ">
                            <p className="mr-2 text-gray-400 text-lg">share: </p><Facebook size={20}/> <Twitter size={20} /> <Instagram size={20} />
                        </div>

                        <div className="pt-8 space-y-4">
                            <div className="flex gap-6 border-b border-[var(--bolder-gray)]">
                                {['shipping','ingredients','reviews'].map(t => (
                                    <button key={t} onClick={() => setActiveDetailTab(t as any)}
                                        className={`text-[12px] uppercase font-bold pb-2 tracking-widest border-b-2 transition-all
                                        ${activeDetailTab === t ? 'border-[var(--gold-color)] text-(--primary)' : 'border-transparent text-gray-400'}`}>
                                        {t}
                                    </button>
                                ))}
                            </div>
                            <p className="text-sm text-gray-500 leading-5">


                            {activeDetailTab === 'shipping' && (
                            <div className="space-y-3 text-gray-700">
                                <p>
                                We offer fast and reliable delivery across Rwanda to ensure your product
                                reaches you safely and on time.
                                </p>

                                <ul className="list-disc pl-5 space-y-1">
                                <li>Free shipping on orders over <strong>5,000 RWF</strong></li>
                                <li>Delivery within 24–72 hours depending on location</li>
                                <li>Secure and eco-friendly packaging</li>
                                </ul>
                            </div>
                            )}

                            {activeDetailTab === 'ingredients' && (
                            <div className="space-y-3 text-gray-700">
                                <p>{products.ingredients}</p>
                            </div>
                            )}


                            </p>
                        </div>
                    </div>
                </div>
                <div className="py-16">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-serif text-(--primary) uppercase tracking-wider">Related Products</h3>
                        <div className="h-[1px] flex-1 mx-6 bg-[var(--bolder-gray)] opacity-50" />
                        <button className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold-color)] hover:underline">View All</button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {relatedProducts?.map((product) => (
                            <div key={product.id} 
                            onClick={() => navigate(`/productdetails/${product.id}`)}
                            className="group cursor-pointer">
                                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-white border border-[var(--bolder-gray)] mb-3">
                                    <img src={product.images[0]} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={product.name} />
                                    <button className="absolute bottom-3 right-3 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ShoppingBag size={16} className="text-(--primary)" />
                                    </button>
                                </div>
                                <h4 className="text-sm font-serif text-(--primary)">{product.name}</h4>
                                <p className="text-xs text-[var(--gold-color)] font-bold">{product.price} RWF</p>
                            </div>
                        ))}
                        <Button  className="col-span-2 md:col-span-4 mx-auto mt-4">
                            View More Products
                        </Button>
                    </div>
                </div>
            </main>

            <Footer />
        </section>
    );
}

export default ProductDetails;