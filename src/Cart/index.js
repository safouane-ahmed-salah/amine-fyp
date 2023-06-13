// import QRCode from "react-qr-code";
import { Link, Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { dbDelete, dbGetListener } from "../db";
import { Tag, QRCode } from "antd";
import CartList from "./CartList";
import CartSection from "./CartSection";

export default function Cart({checkout = false, wishlist= false}){
  const [cartData, setCartData] = useState([]);
  const { currentUser } = getAuth();
  const type = wishlist ? 'wishlist' : 'cart';

  useEffect(()=>{ 
    if(!currentUser) return;  
    dbGetListener('users/' + currentUser.uid + '/' + type, data => setCartData(Object.entries(data).map(([cartKey, data])=> ({cartKey,...data}) )));
  }, []);
  if(!currentUser) return <Navigate to="/login" />;
  
  function removeItem(key){
    dbDelete('users/' + currentUser.uid + '/' + type + '/' + key);
  }  

  const sum = cartData.reduce((prev, prod)=> prev + (prod.price * prod.quantity), 0);

  const qrData = {
    cart: cartData.map(cart => ({
      cartKey: cart.cartKey,
      productkey: cart.key,
      image: cart.image,
      name: cart.name,
      category: cart.category,
      brand: cart.brand,
      color: cart.color,
      size: cart.size,
      quantity: cart.quantity,
      price: cart.price,
    })),
    user: {
      uid: currentUser.uid,
      name: currentUser.displayName,
      email: currentUser.email
    },
    total: sum
  }

  return <CartSection cartData={cartData} onDelete={!checkout && removeItem} total={sum} title={checkout ? "Checkout" : "Your "+ type }>
    {checkout ? <div className="py-3">
            <div className="flex-column flex-sm-row">
              <div>
                <p className="m-0 fs-5 fw-bold text-center">Checkout QR</p>
              </div>
              <p className="mt-3 m-sm-0 fs-5 fw-bold text-center">
                <QRCode className="mt-4" size={300}  value={JSON.stringify(qrData)} />
              </p>
            </div>
      </div>: !wishlist && <Link to="/checkout" className="btn btn-white w-100 text-center mt-3" role="button">
                <i class="ri-secure-payment-line align-bottom"></i>
                Proceed to checkout
        </Link>}
  </CartSection>

  return <section className="mt-5 container ">
    {/* Page Content Goes Here */}
    <h1 className="mb-6 display-5 fw-bold text-center">{checkout ? "Checkout" : "Your "+ type }</h1>
    <div className="row g-4 g-md-8">
      {/* Cart Items */}
      <div className="col-12 col-lg-6 col-xl-7">
        <CartList cartData={cartData} onDelete={!checkout && removeItem} />
      </div>
      {/* /Cart Items */}

      {!wishlist &&  <div className="col-12 col-lg-6 col-xl-5">
        <div className="bg-orange p-4 p-md-5 text-white">
          <h3 className="fs-3 fw-bold m-0 text-center">Order Summary</h3>
          <div className="py-3 border-bottom-white-opacity">
            <div className="d-flex justify-content-between align-items-center flex-column flex-sm-row">
              <div>
                <p className="m-0 fs-5 fw-bold">Grand Total</p>
              </div>
              <p className="mt-3 m-sm-0 fs-5 fw-bold">RM{sum}</p>
            </div>
          </div>
          {checkout && <div className="py-3">
            <div className="flex-column flex-sm-row">
              <div>
                <p className="m-0 fs-5 fw-bold text-center">Checkout QR</p>
              </div>
              <p className="mt-3 m-sm-0 fs-5 fw-bold text-center">
                <QRCode className="mt-4" size={300}  value={JSON.stringify(qrData)} />
              </p>
            </div>
          </div>}
          {/* Checkout Button*/}
            {!checkout &&
            <Link to="/checkout" className="btn btn-white w-100 text-center mt-3" role="button">
                <i class="ri-secure-payment-line align-bottom"></i>
                        Proceed to checkout
            </Link>}
          {/* Checkout Button*/}
        </div>
        </div>}
      {/* Cart Summary */}
      {/* /Cart Summary */}
    </div>
    {/* /Page Content */}
  </section>  
}