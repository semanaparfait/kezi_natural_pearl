import { useState } from "react";
import {
  LayoutDashboard,
  Users as UsersIcon,
  Package,
  Tags,
  Menu,
  Settings,
  X,
  ChartBar,
  User,
  Mail,
  FileText,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import Dashboard from "@/owner/Dashboard/Dashboard";
import Products from "@/owner/Products/Products";
import Users from "@/owner/Users/Users";
import Category from "@/owner/Category/Category";
import { useGetCurrentUserQuery } from '@/features/auth/authApi';
import Profile from "@/owner/Profile/Profile";
import ContactUs from "@/owner/ContactUs/ContactUs";
import Newsletter from "@/owner/NewsLetter/NewsLetter";
import ViewOrders from "@/owner/Order/ViewOrders";
import Events from "@/owner/Events/Events";
import Analytics from "./Analytics/Analytics";
import { motion, AnimatePresence } from "framer-motion";

function AdminPage() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: currentUser } = useGetCurrentUserQuery(undefined);

  const asideNav = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Users", icon: UsersIcon },
    { name: "Products", icon: Package },
    { name: "Categories", icon: Tags },
    { name: "Orders", icon: Tags },
    { name: "Events", icon: Calendar },
    { name: "Analytics", icon: ChartBar },
    { name: "profile", icon: User },
    { name: "contact us", icon: Mail },
    { name: "newsletter", icon: FileText },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-sans">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <aside
        className={`
          fixed md:static z-40 h-full bg-white border-r border-slate-100
          transition-all duration-300 ease-in-out group/sidebar
          ${sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0 w-20 hover:md:w-64"}
        `}
      >
        {/* Logo Section */}
        <div className="flex items-center h-20 px-6 border-b border-slate-50 overflow-hidden">
          <Link to="/" className="flex items-center gap-4 min-w-max">
            <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
            <span className="font-serif italic font-bold text-xl text-slate-900 opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300">
              Kezi
            </span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden ml-auto p-2 text-slate-400">
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto overflow-x-hidden scrollbar-hide">
          {asideNav.map((item) => {
            const isActive = activeMenu === item.name;
            return (
              <button
                key={item.name}
                onClick={() => {
                  setActiveMenu(item.name);
                  setSidebarOpen(false);
                }}
                className={`
                  relative flex items-center w-full h-12 rounded-lg transition-all duration-200 group/item
                  ${isActive ? "bg-slate-900 text-white shadow-lg shadow-slate-200" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}
                `}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <motion.div 
                    layoutId="activeBar"
                    className="absolute left-0 w-1 h-6 bg-white rounded-r-full group-hover/sidebar:opacity-100 opacity-0" 
                  />
                )}

                {/* Icon Wrapper - Centers the icon when collapsed */}
                <div className="min-w-[56px] flex items-center justify-center">
                  <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                </div>

                {/* Text Label - Hidden when collapsed */}
                <span className={`
                  text-sm tracking-tight whitespace-nowrap transition-all duration-300
                  opacity-0 group-hover/sidebar:opacity-100
                  ${isActive ? "font-bold" : "font-medium"}
                `}>
                  {item.name}
                </span>

                {/* Tooltip (Visible only on desktop when sidebar is collapsed) */}
                <div className="absolute left-16 px-2 py-1 bg-slate-800 text-white text-[10px] rounded 
                  opacity-0 pointer-events-none group-hover/item:opacity-100 group-hover/sidebar:hidden 
                  transition-opacity z-50 whitespace-nowrap shadow-xl">
                  {item.name}
                </div>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main App Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 flex items-center justify-between bg-white px-8 border-b border-slate-100 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 text-slate-500">
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-serif italic text-slate-900 capitalize">{activeMenu}</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex flex-col text-right mr-2">
              <span className="text-sm font-bold text-slate-800 leading-none mb-1">
                {currentUser?.fullName || "Admin User"}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                Master Control
              </span>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-slate-100 shadow-sm overflow-hidden bg-slate-50">
              <img src={currentUser?.profile} alt="Admin" className="w-full h-full object-cover" />
            </div>
            <Link to="/settings" className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
              <Settings size={20} />
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6 lg:p-10 bg-[#FBFBFC]">
          <div className="max-w-7xl mx-auto">
             {activeMenu === "Dashboard" && <Dashboard />}
             {activeMenu === "Users" && <Users />}
             {activeMenu === "Products" && <Products />}
             {activeMenu === "Categories" && <Category />}
             {activeMenu === "Orders" && <ViewOrders />}
             {activeMenu === "Analytics" && <Analytics />}
             {activeMenu === "profile" && <Profile />}
             {activeMenu === "contact us" && <ContactUs />}
             {activeMenu === "newsletter" && <Newsletter />}
             {activeMenu === "Events" && <Events />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminPage;