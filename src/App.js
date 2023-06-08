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


import './firebase';
import Admin from "./Admin";


function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin/*" element={<Admin />} />
      <Route path="*" element={<div className="app">
        <Menu />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
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
