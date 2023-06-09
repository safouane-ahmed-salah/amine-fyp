import { Navigate, Route, Routes } from "react-router-dom";
import ProductListing from "./ProductListing";
import ProductDetail from "./ProductDetail";
import Menu from "./Menu";
import './assets/css/theme.bundle.css';
import './assets/css/libs.bundle.css';
import './App.css'
import Homepage from "./Homepage";
import Cart from "./Cart";
import LoginPage from "./LoginPage";
import Admin from "./Admin";
// import AdminMobile from "./Admin/mobile";
import MobileScan from "./Admin/mobile/Scan";
import ProtectedRoute from "./ProtectedRoute";
import AdminLogin from "./Admin/Login";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "./firebase";
import Profile from "./profile";


function App() {
  const [loading, setLoading] = useState(true);
  useEffect(()=> onAuthStateChanged(getAuth(app), ()=> setLoading(false)) , []);
  if(loading) return <div>Loading ...</div>;

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/scan" element={<MobileScan />} />
      <Route path="/admin/*" element={<Admin />} />
      <Route path="*" element={<div className="app">
        <Menu />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Cart checkout />} />
          <Route path="/wishlist" element={<Cart wishlist />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>} />
    </Routes>
  );
}

export default App;
