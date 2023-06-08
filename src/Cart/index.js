// import QRCode from "react-qr-code";
import { Link, Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { dbDelete, dbGetListener } from "../db";
import { Tag, QRCode } from "antd";

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

    return <section className="mt-5 container ">
    {/* Page Content Goes Here */}
    <h1 className="mb-6 display-5 fw-bold text-center">{checkout ? "Checkout" : "Your "+ type }</h1>
    <div className="row g-4 g-md-8">
      {/* Cart Items */}
      <div className="col-12 col-lg-6 col-xl-7">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th className="d-none d-sm-table-cell" />
                <th className="ps-sm-3">Details</th>
                <th>Qty</th>
                <th />
              </tr>
            </thead>
            <tbody>
                {cartData.map((product, index)=> <tr>
                {/* image */}
                <td key={index} className="d-none d-sm-table-cell">
                  <picture className="d-block bg-light p-3 f-w-20">
                    <img className="img-fluid" src={product.image} alt="" />
                  </picture>
                </td>
                {/* image */}
                {/* Details */}
                <td>
                  <div className="ps-sm-3">
                    <h6 className="mb-2 fw-bolder">
                      {product.title}
                    </h6>
                    <small className="d-block text-muted">{product.category}/ <Tag color={product.color} style={{height: 20}} /> /{product.size}</small>
                  </div>
                </td>
                {/* Details */}
                {/* Qty */}
                <td>
                  <div className="px-3">
                    <span className="small text-muted mt-1">{product.quantity} @ RM{product.price}</span>
                  </div>
                </td>
                {/* /Qty */}
                {/* Actions */}
                <td className="f-h-0">
                  <div className="d-flex justify-content-between flex-column align-items-end h-100">
                    {checkout ? null : <i className="ri-close-circle-line ri-lg" onClick={()=> removeItem(product.cartKey)} />}
                    <p className="fw-bolder mt-3 m-sm-0">RM{product.quantity*product.price}</p>
                  </div>
                </td>
                {/* /Actions */}
              </tr>)}
             
            </tbody>
          </table>
        </div>
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
                <QRCode className="mt-4" size={300}  value={ JSON.stringify({cart: cartData}) } />
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