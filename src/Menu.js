import { Link } from "react-router-dom";
import { dbGetListener } from "./db";
import { useEffect, useState } from "react";

export default function Menu(){
    const [cartCount, setCartCount] = useState(0);
    useEffect(()=> dbGetListener('users/id/cart', data => setCartCount(Object.values(data).length)  ),[]);

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
          {/* Mobile Nav Toggler*/}
          <button className="btn btn-link px-2 text-decoration-none navbar-toggler border-0 position-absolute top-0 end-0 mt-3 me-2" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <i className="ri-close-circle-line ri-2x" />
          </button>
          {/* / Mobile Nav Toggler*/}
          <ul className="navbar-nav py-lg-2 mx-auto">
            <li className="nav-item me-lg-4 dropdown position-static">
              <a className="nav-link fw-bolder py-lg-4" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Menswear
              </a>
            </li>
            <li className="nav-item me-lg-4 dropdown position-static">
              <a className="nav-link fw-bolder py-lg-4" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Womenswear
              </a>
            </li>
            <li className="nav-item me-lg-4">
              <a className="nav-link fw-bolder py-lg-4" href="#">
                Kidswear
              </a>
            </li>
          </ul>     
          </div>
        {/* / Main Navigation*/}
        {/* Navbar Icons*/}
        <ul className="list-unstyled mb-0 d-flex align-items-center">
          {/* Navbar Toggle Icon*/}
          <li className="d-inline-block d-lg-none">
            <button className="btn btn-link px-2 text-decoration-none navbar-toggler border-0 d-flex align-items-center" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <i className="ri-menu-line ri-lg align-middle" />
            </button>
          </li>
          {/* /Navbar Toggle Icon*/}
          {/* Navbar Wishlist*/}
          <li className="ms-1 d-none d-lg-inline-block">
            <a className="btn btn-link px-2 py-0 text-decoration-none d-flex align-items-center" href="#">
              <i className="ri-heart-line ri-lg align-middle" />
            </a>
          </li>
          {/* /Navbar Wishlist*/}
          {/* Navbar Login*/}
          <li className="ms-1 d-none d-lg-inline-block">
            <Link className="btn btn-link px-2 text-decoration-none d-flex align-items-center" to="/login">
              <i className="ri-user-line ri-lg align-middle" />
            </Link>
          </li>
          {/* /Navbar Login*/}
          {/* Navbar Cart*/}
          <li className="ms-1 d-inline-block position-relative">
            <Link to="/cart">
            <button className="btn btn-link px-2 text-decoration-none d-flex align-items-center disable-child-pointer" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart" aria-controls="offcanvasCart">
              <i className="ri-shopping-cart-2-line ri-lg align-middle position-relative z-index-10" />
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