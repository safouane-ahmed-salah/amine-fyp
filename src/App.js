import { Route, Routes } from "react-router-dom";
import ProductListing from "./ProductListing";
import ProductDetail from "./ProductDetail";
import Menu from "./Menu";
import './assets/css/theme.bundle.css';
import './assets/css/libs.bundle.css';

import Homepage from "./Homepage";
import Cart from "./Cart";


function App() {
  return (
    <div className="app">
      <Menu />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Cart checkout />} />
      </Routes>
    </div>
  );
}

export default App;
