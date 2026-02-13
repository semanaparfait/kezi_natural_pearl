import { ArrowUpRight, Calendar } from 'lucide-react';

function Blogs() {
    const blogsPost = [
        {
            id: 1,
            title: "The Beauty of Natural Pearls",
            excerpt: "Discover the timeless elegance and natural allure of pearls in modern skincare rituals.",
            imageUrl: "https://i.pinimg.com/1200x/d8/5c/d8/d85cd86800c90ca33446ac3dfbb9e1bd.jpg",
            date: "Feb 05, 2026"
        },
        {
            id: 2,
            title: "Sustainable Skincare Practices",
            excerpt: "Learn how to care for your skin while honoring the planet through artisanal sourcing.",
            imageUrl: "https://i.pinimg.com/736x/16/c5/99/16c5999c5378d8a225e1c0abe58a2e6a.jpg",
            date: "Jan 28, 2026"
        },
        {
            id: 3,
            title: "Top 5 Natural Ingredients",
            excerpt: "Explore the potent Rwandan botanicals that promote a radiant, healthy glow.",
            imageUrl: "https://i.pinimg.com/1200x/e4/7c/5f/e47c5f10048ed7692c601fda0f4be29a.jpg",
            date: "Jan 15, 2026"
        }
    ];

    return (
        <section className="py-24 bg-[var(--secondary-cream-white)] ">
            <div className="max-w-7xl mx-auto px-6">
                
                <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-8 md:px-10">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="h-[1px] w-8 bg-[var(--gold-color)]"></span>
                            <span className="text-[10px] uppercase tracking-[0.4em] text-[var(--gold-color)] font-bold">The Journal</span>
                        </div>
                        <h1 className="font-serif text-4xl md:text-5xl text-[var(--primary)] italic leading-tight">
                            Insight into <br /> Our Blog
                        </h1>
                    </div>
                    <div className="md:text-right">
                        <p className="text-gray-400 text-xs font-light max-w-xs mb-6 italic leading-relaxed">
                            A curated space for skincare rituals, sustainability stories, and the science of natural beauty.
                        </p>
                    </div>
                </div>
                <div className="grid md:grid-cols-3 gap-20 md:px-10">
                    {blogsPost.map((post) => (
                        <div key={post.id} className="group cursor-pointer shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-2xl overflow-hidden bg-white">
                            
                        <div className="relative aspect-[5/4] overflow-hidden rounded-2xl bg-white  mb-6 transition-all duration-500 group-hover:shadow-2xl">
                        <img 
                            src={post.imageUrl} 
                            alt={post.title} 
                            className="w-full h-full object-cover " 
                        />
                        </div>

                            <div className="space-y-2 px-6 py-2">
                                <div className="flex items-center gap-3 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                    <Calendar size={12} className="text-[var(--gold-color)]" />
                                    <span>{post.date}</span>
                                </div>

                                <h2 className="font-serif  text-[var(--primary)] leading-tight group-hover:text-[var(--gold-color)] transition-colors italic">
                                    {post.title}
                                </h2>

                                <p className="text-gray-500 text-sm font-light leading-relaxed line-clamp-2">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--primary)] pt-2 border-b border-transparent group-hover:border-[var(--gold-color)] w-fit transition-all">
                                    Read Article <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 flex flex-col items-center">
                    {/* <div className="w-[1px] h-16 bg-gradient-to-b from-[var(--gold-color)] to-transparent opacity-40"></div> */}
                    <button className="mt-8 px-10 py-3 rounded-full border border-[var(--primary)] text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all duration-300">
                        Explore All Stories
                    </button>
                </div>

            </div>
        </section>
    );
}

export default Blogs;