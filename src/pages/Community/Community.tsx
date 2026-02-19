import { useState } from "react";
import {
  Calendar,
  ArrowRight,
  Clock,
  PlayCircle,
  MapPin,

  Users,

  Star,
  MessageCircle,
  Heart
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const BLOGS = [
  {
    id: 1,
    category: "Skin Care",
    title: "The Science of Pearl Soap: Why it works for you",
    excerpt: "Discover the natural minerals and ancient beauty secrets that make Kezi Pearl soaps unique. Learn how pearl powder transforms your daily routine into a luxurious self-care ritual.",
    image: "https://i.pinimg.com/1200x/7e/08/27/7e082763f9b6d4588ccb2d7d8d0d3244.jpg",
    author: "Dr. Marie Uwase",
    date: "Feb 15, 2026",
    readTime: "5 min read"
  },
  {
    id: 2,
    category: "Wellness",
    title: "Morning talk with Kezi: Start Your Day Right",
    excerpt: "Transform your morning routine with these wellness practices inspired by African traditions and modern science.",
    image: "https://i.pinimg.com/1200x/68/a1/68/68a168e9be2eba4379bb725718f54b85.jpg",
    author: "Grace Niyonzima",
    date: "Feb 12, 2026",
    readTime: "4 min read"
  },
  {
    id: 3,
    category: "Events",
    title: "Kigali Wellness Expo 2026: A Recap",
    excerpt: "Highlights from our recent pop-up at the expo where we celebrated natural beauty and community wellness.",
    image: "https://i.pinimg.com/1200x/78/f3/2b/78f32bab0e0b84b0745638647ba70ace.jpg",
    author: "Kezi Team",
    date: "Jan 20, 2026",
    readTime: "6 min read"
  },
  {
    id: 4,
    category: "Jewelry",
    title: "Choosing the right Gold for your skin tone",
    excerpt: "A comprehensive guide to matching our Glitz & Glam jewelry pieces with your natural glow and personal style.",
    image: "https://i.pinimg.com/1200x/3d/05/f1/3d05f1ce534f7ed89aa891e7b86ab22e.jpg",
    author: "Aisha Mukamana",
    date: "Feb 10, 2026",
    readTime: "7 min read"
  },
  {
    id: 5,
    category: "Beauty Tips",
    title: "Natural Beauty Secrets from African Queens",
    excerpt: "Timeless beauty wisdom passed down through generations, now available in every Kezi product.",
    image: "https://i.pinimg.com/1200x/ae/11/0c/ae110c82d723b884e0351e68d7916d46.jpg",
    author: "Zahara Habimana",
    date: "Feb 8, 2026",
    readTime: "5 min read"
  },
  {
    id: 6,
    category: "Sustainability",
    title: "Our Commitment to Sustainable Beauty",
    excerpt: "How Kezi is revolutionizing the beauty industry with eco-friendly practices and ethical sourcing.",
    image: "https://i.pinimg.com/1200x/9b/71/32/9b713260434f2cb8f02a249d182f5cb8.jpg",
    author: "Jean Pierre Nkusi",
    date: "Feb 5, 2026",
    readTime: "8 min read"
  }
];

const UPCOMING_EVENTS = [
  {
    id: 1,
    title: "Pearl & Petals Workshop",
    date: "March 12, 2026",
    time: "10:00 AM - 2:00 PM",
    location: "Kigali Heights, Level 3",
    description: "Join us for an immersive workshop on natural skincare and the art of self-care.",
    image: "https://i.pinimg.com/1200x/a5/01/40/a50140da98ee4e4fa017095455760dcc.jpg",
    capacity: "Limited to 30 participants",
    price: "15,000 RWF"
  },
  {
    id: 2,
    title: "The Glow Up Masterclass",
    date: "March 25, 2026",
    time: "6:00 PM - 9:00 PM",
    location: "Radisson Blu Hotel, Kigali",
    description: "An evening of beauty tips, product demonstrations, and networking with wellness enthusiasts.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
    capacity: "Limited to 50 participants",
    price: "25,000 RWF"
  },
  {
    id: 3,
    title: "Wellness & Wine Evening",
    date: "April 8, 2026",
    time: "7:00 PM - 10:00 PM",
    location: "Heaven Restaurant, Kigali",
    description: "Relax and unwind with fellow Kezi community members. Enjoy wine tasting paired with skincare demos.",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
    capacity: "Limited to 40 participants",
    price: "30,000 RWF"
  }
];

const PAST_EVENTS = [
  {
    id: 1,
    title: "The Glow Gala 2025",
    date: "Dec 15, 2025",
    location: "Marriott Hotel",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
    attendees: "200+ guests"
  },
  {
    id: 2,
    title: "Summer Wellness Retreat",
    date: "Aug 20, 2025",
    location: "Lake Kivu Resort",
    image: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=500&q=80",
    attendees: "50 participants"
  },
  {
    id: 3,
    title: "Spring Beauty Bazaar",
    date: "May 10, 2025",
    location: "Kigali Convention Centre",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=500&q=80",
    attendees: "500+ visitors"
  },
  {
    id: 4,
    title: "Natural Beauty Workshop",
    date: "March 15, 2025",
    location: "Kigali Heights",
    image: "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?w=500&q=80",
    attendees: "30 participants"
  },
  {
    id: 5,
    title: "New Year Glow Session",
    date: "Jan 10, 2025",
    location: "Serena Hotel",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&q=80",
    attendees: "75 attendees"
  },
  {
    id: 6,
    title: "Holiday Beauty Fair",
    date: "Dec 20, 2024",
    location: "Kigali City Tower",
    image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=500&q=80",
    attendees: "150+ visitors"
  }
];

function Community() {
  const [blogFilter, setBlogFilter] = useState("all");
  const categories = ["all", "Skin Care", "Wellness", "Events", "Jewelry", "Beauty Tips", "Sustainability"];

  const filteredBlogs = blogFilter === "all"
    ? BLOGS
    : BLOGS.filter(blog => blog.category === blogFilter);

  return (
    <section className="min-h-screen bg-white selection:bg-[var(--gold-color)] selection:text-white">
      <Navbar />

      {/* CLASSIC ARCH HERO SECTION */}
      <div className="relative bg-[#faf9f6] overflow-hidden">
        {/* Background Texture/Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#3f5f50 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[90vh] py-12">

            {/* Left Column - Editorial Typography (5 cols) */}
            <div className="lg:col-span-5 space-y-10 relative z-10">

              {/* Floating Badge */}
              <div className="inline-block animate-fade-in-up">
                <div className="flex items-center gap-3">
                  <span className="h-[1px] w-12 bg-[var(--gold-color)]"></span>
                  <span className="text-xs font-serif italic text-[var(--gold-color)] tracking-widest">
                    Est. 2024
                  </span>
                </div>
              </div>

              {/* Main Headline */}
              <div className="space-y-4">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif text-(--primary) leading-[0.85]">
                  <span className="block italic text-5xl md:text-6xl mb-2 text-gray-400 font-light">The Kezi</span>
                  COMMUNITY
                </h1>
                <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-md ml-1 border-l-2 border-[var(--gold-color)] pl-6">
                  Experience a sanctuary where timeless beauty traditions merge with modern wellness.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-5 pt-4">
                <button className="px-8 py-4 bg-(--primary) text-white rounded-t-[2rem] rounded-br-[2rem] hover:rounded-tl-none hover:rounded-br-none transition-all duration-500 shadow-lg hover:shadow-xl hover:bg-[var(--gold-color)] group">
                  <span className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
                    Join Membership
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <div className="flex items-center gap-4 cursor-pointer group">
                  <div className="w-12 h-12 rounded-full border border-[var(--gold-color)] flex items-center justify-center group-hover:bg-[var(--gold-color)] group-hover:text-white transition-colors">
                    <PlayCircle size={20} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-(--primary) group-hover:text-[var(--gold-color)] transition-colors">
                    Watch Our Story
                  </span>
                </div>
              </div>

              {/* Stat */}
              <div className="flex items-end gap-2 pt-8 opacity-80">
                <span className="text-6xl font-serif text-[var(--gold-color)] leading-none">5k+</span>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Active Members</span>
              </div>
            </div>

            {/* Right Column - Arch Visuals (7 cols) */}
            <div className="lg:col-span-7 relative h-[600px] md:h-[800px] flex items-center justify-center lg:justify-end">

              {/* Main Large Arch */}
              <div className="relative w-full max-w-md md:max-w-lg h-full">

                {/* Secondary Floating Image (Circle/Oval) */}
                <div className="absolute  top-1/4 -left-12 md:-left-24 w-48 h-64 md:w-56 md:h-72 hidden md:block">
                  <div className="absolute inset-0 bg-[var(--primary)] rounded-[3rem] transform -translate-x-3 translate-y-3"></div>
                  <div className="relative w-full h-full rounded-[3rem] overflow-hidden border-4 border-white shadow-xl rotate-[-5deg] hover:rotate-0 transition-all duration-500">
                    <img
                      src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80"
                      alt="Wellness"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Decorative Stamp */}
                  <div className="absolute -top-6 -right-6 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg animate-spin-slow">
                    <div className="w-full h-full border-2 border-[var(--gold-color)] border-dashed rounded-full flex items-center justify-center p-1">
                      <Star size={24} className="text-[var(--gold-color)] fill-[var(--gold-color)]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BLOG SECTION WITH FILTERS */}
      <div className="max-w-7xl mx-auto py-24 px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 pb-8 border-b border-gray-100">
          <div>
            <h2 className="text-5xl font-serif text-(--primary) mb-3">Latest Stories</h2>
            <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Insights & Inspiration</p>
          </div>

          <div className="flex flex-wrap gap-3 mt-6 md:mt-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setBlogFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${blogFilter === cat
                    ? "bg-(--primary) text-white shadow-lg"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={post.image}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={post.title}
                />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-black uppercase tracking-wider text-(--primary)">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-serif text-(--primary) mb-4 leading-tight group-hover:text-[var(--gold-color)] transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--secondary-cream-white)] flex items-center justify-center">
                      <Star className="text-[var(--gold-color)]" size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-(--primary)">{post.author}</p>
                      <p className="text-[10px] text-gray-400">{post.date}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{post.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* UPCOMING EVENTS SECTION */}
      <div className="bg-gradient-to-br from-[var(--primary)] via-[var(--primary)] to-[#1a3a3a] py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Calendar className="text-[var(--gold-color)]" size={20} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">
                Mark Your Calendar
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-serif text-white mb-6">Upcoming Events</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Join us for transformative experiences designed to elevate your wellness journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {UPCOMING_EVENTS.map((event, index) => (
              <div
                key={event.id}
                className="group bg-white rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-[var(--gold-color)]/20 transition-all duration-500 hover:-translate-y-3"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={event.image}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={event.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-6 right-6 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full">
                    <p className="text-[10px] font-black text-(--primary) uppercase tracking-wider">
                      {event.capacity}
                    </p>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-2 text-white mb-2">
                      <Clock size={14} className="text-[var(--gold-color)]" />
                      <span className="text-xs font-bold">{event.time}</span>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="mb-6">
                    <p className="text-[var(--gold-color)] text-xs font-black uppercase tracking-wider mb-3">
                      {event.date}
                    </p>
                    <h3 className="text-2xl font-serif text-(--primary) mb-4 leading-tight">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {event.description}
                    </p>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <MapPin size={16} className="text-[var(--gold-color)]" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <span className="text-xl font-bold text-(--primary)">{event.price}</span>
                    <button className="px-6 py-3 bg-(--primary) text-white rounded-full text-xs font-black uppercase tracking-wider hover:bg-[var(--gold-color)] hover:text-(--primary) transition-all shadow-lg hover:shadow-xl">
                      Reserve Spot
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PAST EVENTS GALLERY */}
      <div className="max-w-7xl mx-auto py-32 px-6 md:px-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-serif text-(--primary) mb-6">Past Event Highlights</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Relive the memorable moments from our previous gatherings and celebrations
          </p>
          <div className="w-24 h-1 bg-[var(--gold-color)] mx-auto mt-8 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PAST_EVENTS.map((event) => (
            <div
              key={event.id}
              className="group relative rounded-[2rem] overflow-hidden aspect-[4/3] cursor-pointer"
            >
              <img
                src={event.image}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                alt={event.title}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-[var(--gold-color)] text-xs font-black uppercase tracking-wider mb-2">
                    {event.date}
                  </p>
                  <h3 className="text-white text-2xl font-serif mb-3 leading-tight">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-4 text-gray-300 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={14} />
                      <span>{event.attendees}</span>
                    </div>
                  </div>
                </div>

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/50 flex items-center justify-center">
                    <PlayCircle size={32} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NEWSLETTER SECTION */}
      <div className="bg-gradient-to-br from-[var(--secondary-cream-white)] to-white py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-2xl border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--gold-color)] opacity-5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--primary)] opacity-5 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--secondary-cream-white)] mb-8">
                <Heart className="text-[var(--gold-color)]" size={32} />
              </div>

              <h2 className="text-4xl md:text-5xl font-serif text-(--primary) mb-6 leading-tight">
                Join the Kezi Community
              </h2>
              <p className="text-gray-600 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Be the first to know about new products, exclusive events, beauty tips,
                and special offers reserved for our valued members.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 bg-[var(--secondary-cream-white)] px-8 py-5 rounded-full border-2 border-transparent outline-none focus:border-[var(--gold-color)] transition-all text-sm"
                />
                <button className="bg-(--primary) text-white px-10 py-5 rounded-full text-xs font-black uppercase tracking-widest shadow-xl hover:bg-[var(--gold-color)] hover:text-(--primary) transition-all hover:scale-105 active:scale-95">
                  Subscribe
                </button>
              </div>

              <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <MessageCircle size={16} className="text-[var(--gold-color)]" />
                  <span>5,000+ Members</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-[var(--gold-color)]" />
                  <span>Exclusive Content</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}

export default Community;