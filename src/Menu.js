import { Link, useNavigate } from "react-router-dom";
import { dbGetListener } from "./db";
import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { categories } from "./constants";

export default function Menu(){
    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);
    const navigate = useNavigate();
    const  auth= getAuth();
    const {currentUser} = auth;
    useEffect(()=>{ 
      if(!currentUser) return; 
      dbGetListener('users/' + currentUser.uid + '/cart', data => setCartCount(Object.values(data).length));
      dbGetListener('users/' + currentUser.uid + '/wishlist', data => setWishlistCount(Object.values(data).length));
    },[]);

    function logout(){ signOut(auth).then(()=> navigate('/login'))}

    return <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom mx-0 p-0 flex-column  ">
    <div className="w-100 pb-lg-0 pt-lg-0 pt-4 pb-3">
      <div className="container-fluid d-flex justify-content-between align-items-center flex-wrap">
        {/* Logo*/}
        <Link className="navbar-brand fw-bold fs-3 m-0 p-0 flex-shrink-0" to="/">
          {/* Start of Logo*/}
          Amine Shop
          {/* / Logo*/}
        </Link>
        {/* / Logo*/}
        {/* Main Navigation*/}
        <div className="ms-5 flex-shrink-0 collapse navbar-collapse navbar-collapse-light w-auto flex-grow-1" id="navbarNavDropdown">
          <ul className="navbar-nav py-lg-2 mx-auto">
            {categories.map( (category, index)=> <li key={index} className="nav-item me-lg-4">
              <Link className="nav-link fw-bolder py-lg-4" to="/" state={{category}}>
                {category}
              </Link>
            </li>)}
          </ul>     
          </div>
        {/* / Main Navigation*/}
        {/* Navbar Icons*/}
        <ul className="list-unstyled mb-0 d-flex align-items-center">
          {/* Navbar Logout*/}
          {currentUser && <li className="ms-1 d-lg-inline-block">
            <button className="btn btn-link px-2 text-decoration-none d-flex align-items-center" onClick={logout}>
              <i className="ri-logout-box-line ri-lg align-middle" title="logout"  />
            </button>
          </li>}
          {/* /Navbar Logout*/}
          {/* Navbar Wishlist*/}
          <li className="ms-1 d-inline-block position-relative">
            <Link className="btn btn-link px-2 text-decoration-none d-flex align-items-center disable-child-pointer" to="/wishlist">
              <i className="ri-heart-line ri-lg align-middle" title="wishlist"  />
              {!!wishlistCount && <span className="fs-xs fw-bolder f-w-5 f-h-5 bg-orange rounded-lg d-block lh-1 pt-1 position-absolute top-0 end-0 z-index-20 mt-2 text-white">{wishlistCount}</span>}
            </Link>
          </li>
          {/* /Navbar Wishlist*/}
          {/* Navbar Login*/}
          <li className="ms-1 d-lg-inline-block">
            <Link className="btn btn-link px-2 text-decoration-none d-flex align-items-center" to="/profile">
              <i className="ri-user-line ri-lg align-middle" title="profile" />
            </Link>
          </li>
          {/* /Navbar Login*/}
          {/* Navbar Cart*/}
          <li className="ms-1 d-inline-block position-relative">
            <Link to="/cart">
            <button className="btn btn-link px-2 text-decoration-none d-flex align-items-center disable-child-pointer" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart" aria-controls="offcanvasCart">
              <i className="ri-shopping-cart-2-line ri-lg align-middle position-relative z-index-10" title="cart" />
              {!!cartCount && <span className="fs-xs fw-bolder f-w-5 f-h-5 bg-orange rounded-lg d-block lh-1 pt-1 position-absolute top-0 end-0 z-index-20 mt-2 text-white">{cartCount}</span>}
            </button>
            </Link>
          </li>
          {/* /Navbar Cart*/}
        </ul>
        {/* Navbar Icons*/}
      </div>
    </div>
  </nav>;  
}