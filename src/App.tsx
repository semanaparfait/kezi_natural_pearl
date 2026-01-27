import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '@/pages/Home/Home'
import ContactUs from "@/pages/Contact-us/ContactUs";
import Account from "@/pages/Account/Account";
import { Toaster } from 'react-hot-toast'
function App() {


  return (

<BrowserRouter>
  <Toaster position="top-right" reverseOrder={false} />

  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/contact-us" element={<ContactUs />} />
    <Route path="/account" element={<Account />} />
  </Routes>
</BrowserRouter>


  )
}

export default App
