import { useState } from "react";
import {
  LayoutDashboard,
  Users as UsersIcon,
  Package,
  Tags,
  Menu,
  Settings,
  X,
  User,
  Mail,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-Kezi (1).svg";
import Dashboard from "@/owner/Dashboard/Dashboard";
import Products from "@/owner/Products/Products";
import Users from "@/owner/Users/Users";
import Category from "@/owner/Category/Category";
import { useGetCurrentUserQuery } from '@/features/auth/authApi';
import Profile from "@/owner/Profile/Profile";
import ContactUs from "@/owner/ContactUs/ContactUs";
import Newsletter from "@/owner/NewsLetter/NewsLetter";

function AdminPage() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: currentUser } = useGetCurrentUserQuery(undefined);

  const asideNav = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Users", icon: UsersIcon },
    { name: "Products", icon: Package },
    { name: "Categories", icon: Tags },
    { name: "Profile", icon: User },
    { name: "Contact Us", icon: Mail },
    { name: "Newsletter", icon: FileText },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-sans">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}

      {/* Sidebar: Added 'group' and width transition logic */}
      <aside
        className={`
          fixed md:static z-40 h-full bg-white shadow-lg border-r border-gray-200
          transform transition-all duration-300 ease-in-out group
          ${sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0 md:w-20 hover:md:w-64"}
        `}
      >
        {/* Logo Section */}
        <div className="flex items-center h-20 px-6 overflow-hidden">
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Kezi Logo" className="w-8 min-w-[32px] group-hover:w-20 transition-all duration-300" />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden ml-auto p-2 hover:bg-yellow-600 rounded-lg transition text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3 flex flex-col gap-2 overflow-hidden">
          {asideNav.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setActiveMenu(item.name);
                setSidebarOpen(false);
              }}
              className={`
                w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all whitespace-nowrap
                ${activeMenu === item.name
                  ? "bg-[var(--primary)] text-white shadow-lg"
                  : "text-yellow-900 hover:bg-yellow-400 hover:text-green-900"
                }
              `}
            >
              {/* Icon: Wrapped to ensure it doesn't shrink or move */}
              <item.icon className="w-5 h-5 flex-shrink-0" />
              
              {/* Text: Hidden by default, fades in on parent group hover */}
              <span className={`
                font-bold text-[10px] uppercase tracking-widest transition-all duration-300
                opacity-0 group-hover:opacity-100 ${sidebarOpen ? 'opacity-100' : ''}
              `}>
                {item.name}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <nav className="flex items-center justify-between bg-white px-6 py-4 shadow-sm border-b border-gray-100">
          <div className="flex items-center gap-4 min-w-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <Menu size={20} />
            </button>

            <div className="min-w-0">
              <h1 className="font-serif italic text-xl text-gray-900 truncate">
                {activeMenu}
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold hidden sm:block">
                Artisanal Management
              </p>
            </div>
          </div>

          {/* Profile Section */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="flex flex-col items-end leading-tight">
                <span className="font-bold text-xs text-gray-800">{currentUser?.fullName || "Admin"}</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-tighter">{currentUser?.email}</span>
              </div>
              <img
                src={currentUser?.profile}
                alt="user profile"
                className="rounded-full w-10 h-10 object-cover border-2 border-white shadow-sm"
              />
            </div>

            <Link to="/settings" className="p-2.5 bg-gray-50 text-gray-400 hover:text-green-800 rounded-xl transition-all">
              <Settings size={20} />
            </Link>
          </div>
        </nav>

        {/* Dynamic Content View */}
        <main className="flex-1 overflow-auto p-6 md:p-10 bg-gray-50/50">
          <div className="max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {activeMenu === "Dashboard" && <Dashboard />}
            {activeMenu === "Users" && <Users />}
            {activeMenu === "Products" && <Products />}
            {activeMenu === "Categories" && <Category />}
            {activeMenu === "Profile" && <Profile />}
            {activeMenu === "Contact Us" && <ContactUs />}
            {activeMenu === "Newsletter" && <Newsletter />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminPage;