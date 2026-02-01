import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '@/pages/Home/Home'
import ContactUs from "@/pages/Contact-us/ContactUs";
import Account from "@/pages/Account/Account";
import { Toaster } from 'react-hot-toast'
import About from "@/pages/About/About";
import Shop from "@/pages/Shop/Shop";
import VerifyEmail from "@/pages/verifyEmail/VerifyEmail";
import VerifySuccess from "@/pages/verifySuccessful/verifySuccessful";
import UserDashboard from "@/pages/UserDashboard/UserDashboard";
import Voice from "@/Voice/Voice";
import AdminPage from "@/owner/AdminPage";
function App() {


  return (

<BrowserRouter>
  <Toaster position="top-right" reverseOrder={false} />
  <Voice />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/contact-us" element={<ContactUs />} />
    <Route path="/account" element={<Account />} />
    <Route path="/about" element={<About />} />
    <Route path="/shop" element={<Shop />} />
    <Route path="/verify-email" element={<VerifyEmail />} />
    <Route path="/verification-successful*" element={<VerifySuccess />} />
    <Route path="/userDashboard" element={<UserDashboard />} />
    <Route path="/adminPage" element={<AdminPage />} />
  </Routes>
</BrowserRouter>


  )
}

export default App
