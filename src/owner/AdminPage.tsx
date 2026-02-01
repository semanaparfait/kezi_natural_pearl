import { useState } from "react";
import {
  LayoutDashboard,
  Users as UsersIcon,
  Package,
  Tags,
  Menu,
  Sun,
  User,
  Bell,
  Settings,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-Kezi (1).svg";
import Dashboard from "@/owner/Dashboard/Dashboard";
import Products from "@/owner/Products/Products";
import Users from "@/owner/Users/Users";
import Category from "@/owner/Category/Category";
import { useGetCurrentUserQuery } from '@/features/auth/authApi';

function AdminPage() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
    const { data: currentUser } = useGetCurrentUserQuery(undefined);
    // for testing
    // console.log('Current User:', currentUser);

  const asideNav = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Users", icon: UsersIcon },
    { name: "Products", icon: Package },
    { name: "Categories", icon: Tags },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static z-40 h-full w-64 bg-white border-r
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b">
            <Link to="/">
          <img src={logo} alt="Kezi Logo" className="w-20 md:w-24" />
            </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="p-3 md:p-4 flex flex-col gap-1 md:gap-2">
          {asideNav.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setActiveMenu(item.name);
                setSidebarOpen(false);
              }}
              className={`flex items-center gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-lg transition-all
                ${
                  activeMenu === item.name
                    ? "bg-[var(--primary)] text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium text-sm md:text-base">{item.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Section */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <nav className="flex items-center justify-between bg-white b px-3 sm:px-4 md:px-6 py-3 md:py-4 shadow-sm">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition flex-shrink-0"
            >
              <Menu size={20} />
            </button>

            <div className="min-w-0">
              <h1 className="font-bold text-base sm:text-lg text-gray-900 truncate">
                {activeMenu}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                Welcome back, Admin
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
            <button className="hidden lg:block p-2 hover:bg-gray-100 rounded-lg transition">
              <Sun className="text-gray-500 hover:text-gray-700" size={20} />
            </button>

            <button className="hidden sm:block p-2 hover:bg-gray-100 rounded-lg transition relative">
              <Bell className="text-gray-500 hover:text-gray-700" size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer transition">
              <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center">
                {currentUser?.fullName.charAt(0).toUpperCase() || currentUser?.email.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col leading-tight">

              <span className="font-semibold text-sm">{currentUser?.fullName || "Not yet completed"}</span>
              <span className=" text-sm">{currentUser?.email}</span>
              </div>
            </div>

            {/* Mobile Profile */}
            <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition">
              <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center">
                {currentUser?.fullName.charAt(0).toUpperCase() || currentUser?.email.charAt(0).toUpperCase()}
              </div>
            </button>

            <Link to="/settings" className="p-2 hover:bg-gray-100 rounded-lg transition">
              <Settings className="text-gray-500 hover:text-gray-700" size={20} />
            </Link>
          </div>
        </nav>

        {/* Content */}
        <main className="flex-1 overflow-auto p-3 sm:p-4 md:p-6 lg:p-8">
          {activeMenu === "Dashboard" && <Dashboard />}
          {activeMenu === "Users" && <Users />}
          {activeMenu === "Products" && <Products />}
          {activeMenu === "Categories" && <Category />}
        </main>
      </div>
    </div>
  );
}

export default AdminPage;
