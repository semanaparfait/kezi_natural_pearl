import { Facebook, Heart, Instagram, Twitter, ChevronRight,  Minus, Plus, Zap, ShoppingBag } from "lucide-react";
import Button from "@/components/Button";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {useParams} from "react-router-dom";
import {products} from '@/components/products'

function ProductDetails() {
    const { id } = useParams(); 
    const product = products.find(p => p.id === Number(id));

    if (!product) {
        return (<div className="min-h-screen flex items-center justify-center">
            <h2 className="text-2xl font-semibold">Product not found.</h2>
        </div>
        );
    }

    const relatedProducts = [
        { id: 1, name: "Charcoal Detox", price: "1,200 RWF", img: "https://i.pinimg.com/736x/47/51/3e/47513e1567c15cee9f3c3d9d2842f413.jpg" },
        { id: 2, name: "Lavender Mist", price: "2,500 RWF", img: "https://i.pinimg.com/736x/62/d2/26/62d2268fcfae76758a799a43fa1428a6.jpg" },
        { id: 3, name: "Shea Glow", price: "1,800 RWF", img: "https://i.pinimg.com/736x/09/0a/71/090a71baf8ff308245d6596d09e5e27d.jpg" },
        { id: 4, name: "Honey Scrub", price: "1,500 RWF", img: "https://i.pinimg.com/1200x/c3/a3/d2/c3a3d2a770550aedf72e94c04b8cb867.jpg" },
        { id: 5, name: "Charcoal Detox", price: "1,200 RWF", img: "https://i.pinimg.com/736x/68/8d/b3/688db3abdc40f6d4111f72b0c34e38a3.jpg" },
        { id: 6, name: "Lavender Mist", price: "2,500 RWF", img: "https://i.pinimg.com/736x/b3/21/27/b32127d45739c03aadd8b26627e99dd2.jpg" },
        { id: 7, name: "Shea Glow", price: "1,800 RWF", img: "https://i.pinimg.com/1200x/77/d1/a4/77d1a4ffe947be52e12ab5e80d6a63e3.jpg" },
        { id: 8, name: "Honey Scrub", price: "1,500 RWF", img: "https://i.pinimg.com/736x/61/d5/e4/61d5e42bea1c48ddf2f2df77e38e57f0.jpg" },
    ];

    const [count, setCount] = useState(1);
    const [selectedImage, setSelectedImage] = useState(product.image[0]);
    const [activeDetailTab, setActiveDetailTab] = useState<'details' | 'additional' | 'shipping' | 'ingredients' | 'reviews'>('details');

    return (
        <section className="min-h-screen bg-[var(--secondary-cream-white)] text-gray-800">
            <div className="bg-[var(--primary)]"><Navbar /></div>

            <div className="relative w-full h-32 md:h-40 overflow-hidden bg-gray-900 flex items-center justify-center">
                <img 
                    src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1200" 
                    className="absolute w-full h-full object-cover opacity-40 grayscale"
                    alt="Hero"
                />
                <div className="relative text-center text-white z-10">
                    <h2 className="text-xl md:text-2xl font-serif tracking-widest uppercase mb-1">Face Care</h2>
                    <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-tighter opacity-80">
                        <span>Shop</span> <ChevronRight size={10} /> <span className="font-bold text-[var(--accent-color)]">Organic Soaps</span>
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
                        {(Array.isArray(product.image) ? product.image : [product.image]).map((img, i) => (
                            <button
                            key={i}
                            onClick={() => setSelectedImage(img)}
                            className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition
                            ${selectedImage === img ? "border-[var(--primary)]" : "border-gray-200 opacity-60"}`}
                            >
                            <img src={img} className="w-full h-full object-cover"/>
                            </button>
                        ))}
                        </div>

                    </div>
                    <div className="flex-1 space-y-6 max-w-md">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-[var(--error-red)] font-bold text-[10px] uppercase tracking-widest">
                                <Zap size={14} fill="currentColor" /> Only {product.stock} Items Left!
                            </div>
                            <h1 className="text-3xl font-serif text-[var(--primary)]">{product.name}</h1>
                            <div className="flex items-center gap-4 py-1">
                                <span className="text-2xl font-semibold text-[var(--gold-color)]">{product.price} RWF</span>
                                <span className="text-gray-400 line-through text-sm">{product.oldPrice} RWF</span>
                            </div>
                        </div>

                        <p className="text-gray-500 text-sm leading-relaxed italic">
                            {product.description}
                        </p>

                        <div className="flex items-center gap-3 pt-4">
                            <div className="flex items-center border border-[var(--bolder-gray)] rounded-full h-12 bg-white px-2">
                                <button onClick={() => setCount(m => Math.max(1, m-1))} className="px-2"><Minus size={14}/></button>
                                <span className="w-8 text-center text-sm font-bold">{count}</span>
                                <button onClick={() => setCount(m => m+1)} className="px-2"><Plus size={14}/></button>
                            </div>
                            <Button className="h-12 flex-1   bg-[var(--primary)] text-white rounded-full text-[11px] uppercase tracking-widest font-bold shadow-md hover:brightness-110">
                                <p className="flex items-center justify-center">Add to Cart <ShoppingBag size={16} className="ml-2" /></p>
                            </Button>
                            <button className="h-12 w-12 flex items-center justify-center border border-[var(--bolder-gray)] rounded-full hover:bg-red-50 text-[var(--primary)] bg-white">
                                <Heart size={20} />
                            </button>
                        </div>
                        <div className="flex gap-2 items-center ">
                            <p className="mr-2 text-gray-400 text-lg">share: </p><Facebook size={20}/> <Twitter size={20} /> <Instagram size={20} />
                        </div>

                        <div className="pt-8 space-y-4">
                            <div className="flex gap-6 border-b border-[var(--bolder-gray)]">
                                {['details', 'additional','shipping','ingredients','reviews'].map(t => (
                                    <button key={t} onClick={() => setActiveDetailTab(t as any)}
                                        className={`text-[12px] uppercase font-bold pb-2 tracking-widest border-b-2 transition-all
                                        ${activeDetailTab === t ? 'border-[var(--gold-color)] text-[var(--primary)]' : 'border-transparent text-gray-400'}`}>
                                        {t}
                                    </button>
                                ))}
                            </div>
                            <p className="text-sm text-gray-500 leading-5">
                        {activeDetailTab === 'details' && (
                        <div className="space-y-3 text-gray-700">
                            <p>
                            Our signature formula is handcrafted using cold-pressed organic oils and
                            carefully selected natural botanicals to deeply nourish and protect your skin.
                            </p>

                            <ul className="list-disc pl-5 space-y-1">
                            <li>Rich in antioxidants to help fight free radicals</li>
                            <li>Deeply moisturizes and restores dry or damaged skin</li>
                            <li>Gentle and safe for daily use on all skin types</li>
                            <li>Eco-friendly, cruelty-free, and sustainably made</li>
                            </ul>
                        </div>
                        )}

                            {activeDetailTab === 'additional' && (
                            <div className="space-y-3 text-gray-700">
                                <p>
                                Designed for everyday skincare routines, this product is suitable for both
                                men and women and can be used on face and body.
                                </p>

                                <ul className="list-disc pl-5 space-y-1">
                                <li>Weight: 120g</li>
                                <li>Shelf Life: 12 months</li>
                                <li>Skin Type: Normal, Dry, Sensitive</li>
                                <li>Storage: Keep in a cool, dry place</li>
                                </ul>
                            </div>
                            )}

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
                                <p>
                                Made with 100% natural and skin-loving ingredients carefully blended for
                                maximum effectiveness.
                                </p>

                                <ul className="list-disc pl-5 space-y-1">
                                <li>Cocoa Butter – deeply nourishes and softens skin</li>
                                <li>Coconut Oil – locks in moisture and adds natural glow</li>
                                <li>Olive Oil – rich in vitamins and antioxidants</li>
                                <li>Essential Oils – provide a calming natural fragrance</li>
                                <li>Natural Fragrances – free from harsh chemicals</li>
                                </ul>
                            </div>
                            )}


                            </p>
                        </div>
                    </div>
                </div>
                <div className="py-16">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-serif text-[var(--primary)] uppercase tracking-wider">Related Products</h3>
                        <div className="h-[1px] flex-1 mx-6 bg-[var(--bolder-gray)] opacity-50" />
                        <button className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold-color)] hover:underline">View All</button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {relatedProducts.map((product) => (
                            <div key={product.id} className="group cursor-pointer">
                                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-white border border-[var(--bolder-gray)] mb-3">
                                    <img src={product.img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={product.name} />
                                    <button className="absolute bottom-3 right-3 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ShoppingBag size={16} className="text-[var(--primary)]" />
                                    </button>
                                </div>
                                <h4 className="text-sm font-serif text-[var(--primary)]">{product.name}</h4>
                                <p className="text-xs text-[var(--gold-color)] font-bold">{product.price}</p>
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