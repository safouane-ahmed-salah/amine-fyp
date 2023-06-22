import React, { useEffect, useState } from "react";
import { Button, Modal, notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
import QRCode from "react-qr-code";
import { dbGetListener, dbSet } from "../db";
import { getAuth } from "firebase/auth";
import generalSizeImg from "../assets/images/general-sizes.jpeg";
import womanSizeImg from "../assets/images/woman-sizes.jpeg";



const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [loginModal, setLoginModal] = useState(false);
  const [sizeModal, setSizeModal] = useState(false);
  const { id } = useParams();
  const {currentUser} = getAuth();
  const navigate = useNavigate();

  useEffect(()=> dbGetListener('products/'+ id, setProduct),[]);

  const { name, image, price, colors, sizes} = product;

  if (!name) {
    return <div>Product not found</div>;
  }

  async function addto(type){
    if(!currentUser) return setLoginModal(true);

    const selectedColor = document.querySelector(".form-check-color-input:checked");
    if(!selectedColor) return notification.error({message: "Unselect Color", description: "Please select the color", duration: 2});

    const selectedSize = document.querySelector(".selectSize");
    if(!selectedSize.value) return notification.error({message: "Unselect Size", description: "Please select the size", duration: 2});

    await dbSet('users/' + currentUser.uid + '/' + type, {key: id, ...product, quantity: 1, size: selectedSize.value, color: selectedColor.value});

    return notification.success({message: "Added to "+ type, description: "Successfully added to your "+ type, duration: 2});
  }

  return <section className="mt-5 ">
    <Modal title="Required to login" open={loginModal} onOk={()=> navigate('/login') } okText={"Go to Login"} onCancel={()=> setLoginModal(false) }>
        <p>You can't perform this action as you are not logged in. Please proceed to login</p>
    </Modal>
    <Modal title="Size guide table" open={sizeModal} footer={null} width={1000} onCancel={()=> setSizeModal(false)}>
        <img src={product.category=='Womenswear' ? womanSizeImg : generalSizeImg} width={"100%"} />
      </Modal>
    {/* Product Top*/}
    <section className="container">
      <div className="row g-5">
        {/* Images Section*/}
        <div className="col-12 col-lg-7">
          <div className="row g-1">
            <div className="swiper-container gallery-thumbs-vertical col-2 pb-4">
              <div className="swiper-wrapper">
                <div className="swiper-slide bg-light bg-light h-auto">
                  <picture>
                    <img className="img-fluid mx-auto d-table" src={image} alt="Bootstrap 5 Template by Pixel Rocket" />
                  </picture>
                </div>
              </div>
            </div>
            <div className="swiper-container gallery-top-vertical col-10">
              <div className="swiper-wrapper">
                <div className="swiper-slide bg-white h-auto">
                  <picture>
                    <img className="img-fluid d-table mx-auto" src={image} alt="Bootstrap 5 Template by Pixel Rocket" data-zoomable />
                  </picture>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Images Section*/}
        {/* Product Info Section*/}
        <div className="col-12 col-lg-5">
          <div className="pb-3">
            {/* Product Name, Review, Brand, Price*/}
            <h1 className="mb-2 fs-2 fw-bold">{name}</h1>
            <div className="d-flex justify-content-start align-items-center">
              <p className="lead fw-bolder m-0 fs-3 lh-1 text-danger me-2">RM{price}</p>
              {/* <s className="lh-1 me-2"><span className="fw-bolder m-0">$94.99</span></s>
              <p className="lead fw-bolder m-0 fs-6 lh-1 text-success">Save $10.00</p> */}
            </div>
            {/* /Product Name, Review, Brand, Price*/}
            {/* Product Options*/}
            <div className="border-top mt-4 mb-3">
              <div className="product-option mb-4 mt-4">
                <small className="text-uppercase d-block fw-bolder mb-2">
                  Colour : 
                </small>
                <div className="d-flex justify-content-start">
                {colors && colors.map((color, index)=> <div style={{"--theme-form-checkbox-active-color": color}} key={index} className="form-group d-inline-block mr-1 mb-1 form-check-solid-bg-checkmark form-check-custom">
                    <input type="radio" className="form-check-color-input" id={"option-colour-"+ index} name="option-colour" value={color} />
                    <label className="form-check-label" htmlFor={"option-colour-"+ index} />
                  </div>)} 
                </div>
              </div>
              <div className="product-option">
                <small className="text-uppercase d-block fw-bolder mb-2">
                  Size (UK) : <span className="selected-option fw-bold" />
                </small>
                <div className="form-group mb-1">
                  <select name="selectSize" className="form-control selectSize" data-choices>
                    <option value="">Please Select Size</option>
                    {sizes && sizes.map((size, index)=> <option key={index} value={size}>{size}</option>)}
                  </select>
                </div>
                <Button type="primary" onClick={()=> setSizeModal(true)}>Check size guide</Button>
              </div>
            </div>
            {/* /Product Options*/}
            <div className="mb-4">
              <QRCode size={150} value={window.location.href} />
            </div>
            {/* Add To Cart*/}
            <div className="d-flex justify-content-between mt-3">
              <button onClick={()=> addto('cart')} className="btn btn-dark btn-dark-chunky flex-grow-1 me-2 text-white">Add To Cart</button>
              <button onClick={()=> addto('wishlist')} className="btn btn-orange btn-orange-chunky"><i className="ri-heart-line" /></button>
            </div>
            {/* /Add To Cart*/}
          </div>              
        </div>
        {/* / Product Info Section*/}
      </div>
    </section>
    {/* / Product Top*/}
    <section>
      {/* Product Tabs*/}
      <div className="mt-7 pt-5 border-top">
        <div className="container">
          {/* Tab Content*/}
          <div id="myTabContent">
            {/* Tab Details Content*/}
            <h3>Details: </h3>
            <div className="py-2" id="details" role="tabpanel" aria-labelledby="details-tab">
              {product.description}
            </div>
            {/* Tab Details Content*/}
          </div>
          {/* / Tab Content*/}              </div>
      </div>
      {/* / Product Tabs*/}
    </section>
  </section>
};

export default ProductDetail;
