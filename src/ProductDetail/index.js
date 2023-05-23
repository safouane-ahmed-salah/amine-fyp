import React from "react";
import { Row, Col, Card, Button } from "antd";
import { useParams } from "react-router-dom";
import "./style.css";
import products from "../products.json";
import QRCode from "react-qr-code";


const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((product) => product.id === Number(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return <section className="mt-5 ">
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
                    <img className="img-fluid mx-auto d-table" src={product.image} alt="Bootstrap 5 Template by Pixel Rocket" />
                  </picture>
                </div>
              </div>
            </div>
            <div className="swiper-container gallery-top-vertical col-10">
              <div className="swiper-wrapper">
                <div className="swiper-slide bg-white h-auto">
                  <picture>
                    <img className="img-fluid d-table mx-auto" src={product.image} alt="Bootstrap 5 Template by Pixel Rocket" data-zoomable />
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
            <h1 className="mb-2 fs-2 fw-bold">{product.title}</h1>
            <div className="d-flex justify-content-start align-items-center">
              <p className="lead fw-bolder m-0 fs-3 lh-1 text-danger me-2">RM{product.price}</p>
              {/* <s className="lh-1 me-2"><span className="fw-bolder m-0">$94.99</span></s>
              <p className="lead fw-bolder m-0 fs-6 lh-1 text-success">Save $10.00</p> */}
            </div>
            {/* /Product Name, Review, Brand, Price*/}
            {/* Product Options*/}
            <div className="border-top mt-4 mb-3">
              <div className="product-option mb-4 mt-4">
                <small className="text-uppercase d-block fw-bolder mb-2">
                  Colour : <span className="selected-option fw-bold">Crimson Blue</span>
                </small>
                <div className="d-flex justify-content-start">
                  <div className="form-group d-inline-block mr-1 mb-1 form-check-solid-bg-checkmark form-check-custom">
                    <input type="radio" className="form-check-color-input" id="option-colour-1" name="option-colour" defaultValue="Dark Black" />
                    <label className="form-check-label" htmlFor="option-colour-1" />
                  </div>
                  <div className="form-group d-inline-block mr-1 mb-1 form-check-solid-bg-checkmark form-check-custom form-check-warning">
                    <input type="radio" className="form-check-color-input" id="option-colour-2" name="option-colour" defaultValue="Sun Yellow" />
                    <label className="form-check-label" htmlFor="option-colour-2" />
                  </div>
                  <div className="form-group d-inline-block mr-1 mb-1 form-check-solid-bg-checkmark form-check-custom form-check-info">
                    <input type="radio" className="form-check-color-input" id="option-colour-3" name="option-colour" defaultValue="Crimson Blue" defaultChecked />
                    <label className="form-check-label" htmlFor="option-colour-3" />
                  </div>
                  <div className="form-group d-inline-block mr-1 mb-1 form-check-solid-bg-checkmark form-check-custom form-check-danger">
                    <input type="radio" className="form-check-color-input" id="option-colour-4" name="option-colour" defaultValue="Cherry Red" />
                    <label className="form-check-label" htmlFor="option-colour-4" />
                  </div>
                </div>
              </div>
              <div className="product-option">
                <small className="text-uppercase d-block fw-bolder mb-2">
                  Size (UK) : <span className="selected-option fw-bold" />
                </small>
                <div className="form-group">
                  <select name="selectSize" className="form-control" data-choices>
                    <option value>Please Select Size</option>
                    <option value="Extra Small">XS</option>
                    <option value="Medium">M</option>
                    <option value="Large">L</option>
                    <option value="Extra Large">XL</option>
                  </select>
                </div>
              </div>
            </div>
            {/* /Product Options*/}
            <div className="mb-4">
              <QRCode size={150} value={window.location.href} />
            </div>
            {/* Add To Cart*/}
            <div className="d-flex justify-content-between mt-3">
              <button className="btn btn-dark btn-dark-chunky flex-grow-1 me-2 text-white">Add To Cart</button>
              <button className="btn btn-orange btn-orange-chunky"><i className="ri-heart-line" /></button>
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
            <div className="py-5" id="details" role="tabpanel" aria-labelledby="details-tab">
              <div className="col-12 col-lg-10 mx-auto">
                <div className="row g-5">
                  <div className="col-12 col-md-6">
                    <p>Soft, stretchy - the most flattering product of the season! What could be easier? Beautifully soft and
                      light cotton-modal jersey, with the extra advantage of stretch, cut in an A-line - the universally
                      flattering shape for every body. We promise you, once you've tried these lovely products - you'll be
                      hooked..</p>
                  </div>
                  <div className="col-12 col-md-6">
                    <ul>
                      <li>Stretchy cotton-modal jersey stripe</li>
                      <li>Garment washed</li>
                      <li>Flat, covered elastic waistband</li>
                      <li>58% pima cotton/38% viscose </li>
                      <li>Modal/4% Lycra® elastane</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Tab Details Content*/}
          </div>
          {/* / Tab Content*/}              </div>
      </div>
      {/* / Product Tabs*/}
    </section>
  </section>

  // return (
  //   <div className="product-detail">
  //     <Row gutter={[16, 16]}>
  //       <Col span={12}>
  //         <img
  //           alt={product.name}
  //           src={product.image}
  //           className="product-detail-image"
  //         />
  //       </Col>
  //       <Col span={12}>
  //         <h2 className="product-detail-title">{product.name}</h2>
  //         <p className="product-detail-description">
  //           {product.description}
  //         </p>
  //         <p className="product-detail-price">{product.price}</p>
  //         <Button className="product-detail-add-to-cart" type="primary">
  //           Add to cart
  //         </Button>
  //       </Col>
  //     </Row>
  //   </div>
  // );
};

export default ProductDetail;