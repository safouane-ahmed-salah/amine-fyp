import banner from "../assets/images/banners/banner-1.jpg";
import product1 from '../assets/images/products/product-1.jpg';
import product2 from '../assets/images/products/product-2.jpg';
import product3 from '../assets/images/products/product-3.jpg';
import product4 from '../assets/images/products/product-4.jpg';
import product5 from '../assets/images/products/product-5.jpg';
import product6 from '../assets/images/products/product-6.jpg';
import product7 from '../assets/images/products/product-7.jpg';
import product8 from '../assets/images/products/product-8.jpg';
import product10 from '../assets/images/products/product-10.jpg';
import product11 from '../assets/images/products/product-11.jpg';
import product12 from '../assets/images/products/product-12.jpg';
import product13 from '../assets/images/products/product-13.jpg';
import product14 from '../assets/images/products/product-14.jpg';
import product15 from '../assets/images/products/product-15.jpg';
import product16 from '../assets/images/products/product-16.jpg';

export function Banner() {
  
  const categories = [
    { title: 'Menswear', quantity: 21 },
    { title: 'Womenswear', quantity: 4 },
    { title: 'Kidswear', quantity: 5 },
  ]
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const brands = [
    { title: 'Adidas', quantity: 21 },
    { title: 'Nike', quantity: 4 },
    { title: 'Puma', quantity: 5 },
    { title: 'Reebook', quantity: 5 },
  ]

  const products = [
    {image: product1, price: 123, title: 'Product 1', sizes: ['M', 'L'] },
    {image: product2, price: 123, title: 'Product 2', sizes: ['M'] },
    {image: product3, price: 123, title: 'Product 3', sizes: ['M', 'L'] },
    {image: product4, price: 123, title: 'Product 4', sizes: ['M', 'L'] },
    {image: product5, price: 123, title: 'Product 5', sizes: ['M', 'L'] },
    {image: product6, price: 123, title: 'Product 5', sizes: ['M', 'L'] },
    {image: product7, price: 123, title: 'Product 6', sizes: ['S', 'M', 'L'] },
    {image: product8, price: 123, title: 'Product 6', sizes: ['S', 'M', 'L'] },
    {image: product10, price: 123, title: 'Product 6', sizes: ['S', 'M', 'L'] },
    {image: product11, price: 123, title: 'Product 6', sizes: ['S', 'M', 'L'] },
    {image: product12, price: 123, title: 'Product 6', sizes: ['S', 'M', 'L'] },
    {image: product13, price: 123, title: 'Product 6', sizes: ['S', 'M', 'L'] },
    {image: product14, price: 123, title: 'Product 6', sizes: ['S', 'M', 'L'] },
    {image: product15, price: 123, title: 'Product 6', sizes: ['S', 'M', 'L'] },
    {image: product16, price: 123, title: 'Product 6', sizes: ['S', 'M', 'L'] },
  ]

  return <section className="mt-0 ">
    {/* Category Top Banner */}
    <div className="py-6 bg-img-cover bg-dark bg-overlay-gradient-dark position-relative overflow-hidden mb-4 bg-pos-center-center" style={{ backgroundImage: 'url(' + banner + ')' }}>
      <div className="container position-relative z-index-20" data-aos="fade-right" data-aos-delay={300}>
        <h1 className="fw-bold display-6 mb-4 text-white">Latest Arrivals (121)</h1>
        <div className="col-12 col-md-6">
          <p className="lead text-white mb-0">
            Move, stretch, jump and hike in our latest waterproof arrivals. We've got you covered for your
            hike or climbing sessions, from Gortex jackets to lightweight waterproof pants. Discover our
            latest range of outdoor clothing.
          </p>
        </div>
      </div>
    </div>
    {/* Category Top Banner */}
    <div className="container">
      <div className="row">
        {/* Category Aside/Sidebar */}
        <div className="d-none d-lg-flex col-lg-3">
          <div className="pe-4">
            {/* Category Aside */}
            <aside>
              {/* Filter Category */}
              <div className="mb-4">
                <h2 className="mb-4 fs-6 mt-2 fw-bolder">Category</h2>
                <nav>
                  <ul className="list-unstyled list-default-text">
                    {/* {categories.map((category, index) => <li key={index} className="mb-2">
                      <a className="text-decoration-none text-body text-secondary-hover transition-all d-flex justify-content-between align-items-center" href="#">
                        <span><i className="ri-arrow-right-s-line align-bottom ms-n1" />{category.title}</span>
                        <span className="text-muted ms-4">({category.quantity})</span>
                      </a>
                    </li>)} */}
                    {categories.map((category, index) => <div key={index} className="form-group form-check mb-0">
                        <input type="checkbox" className="form-check-input" id={"filter-brand-" + index} />
                        <label className="form-check-label fw-normal text-body flex-grow-1 d-flex justify-content-between" htmlFor={"filter-brand-" + index}>{category.title}
                          <span className="text-muted">({category.quantity})</span>
                        </label>
                      </div>
                      )}
                  </ul>
                </nav>
              </div>
              {/* / Filter Category*/}
              {/* Brands Filter */}
              <div className="py-4 widget-filter border-top">
                <a className="small text-body mb-3 text-decoration-none text-secondary-hover transition-all transition-all fs-6 fw-bolder d-block collapse-icon-chevron" data-bs-toggle="collapse" href="#filter-brands" role="button" aria-expanded="true" aria-controls="filter-brands">
                  Brands
                </a>
                <div id="filter-brands" className="collapse show">
                  <div className="simplebar-wrapper">
                    <div className="filter-options" data-pixr-simplebar>
                      {brands.map((brand, index) => <div key={index} className="form-group form-check mb-0">
                        <input type="checkbox" className="form-check-input" id={"filter-brand-" + index} />
                        <label className="form-check-label fw-normal text-body flex-grow-1 d-flex justify-content-between" htmlFor={"filter-brand-" + index}>{brand.title}
                          <span className="text-muted">({brand.quantity})</span>
                        </label>
                      </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* / Brands Filter */}
              {/* Sizes Filter */}
              <div className="py-4 widget-filter border-top">
                <a className="small text-body text-decoration-none text-secondary-hover transition-all transition-all fs-6 fw-bolder d-block collapse-icon-chevron" data-bs-toggle="collapse" href="#filter-sizes" role="button" aria-expanded="true" aria-controls="filter-sizes">
                  Sizes
                </a>
                <div id="filter-sizes" className="collapse show">
                  <div className="filter-options mt-3">
                    {sizes.map((size, index) => <div key={index} className="form-group d-inline-block mr-2 mb-2 form-check-bg form-check-custom">
                      <input type="checkbox" className="form-check-bg-input" id={"filter-sizes-" + index} />
                      <label className="form-check-label fw-normal" htmlFor={"filter-sizes-" + index}>{size}</label>
                    </div>)}
                  </div>
                </div>
              </div>
              {/* / Sizes Filter */}
              {/* Colour Filter */}
              <div className="py-4 widget-filter border-top">
                <a className="small text-body text-decoration-none text-secondary-hover transition-all transition-all fs-6 fw-bolder d-block collapse-icon-chevron" data-bs-toggle="collapse" href="#filter-colour" role="button" aria-expanded="true" aria-controls="filter-colour">
                  Colour
                </a>
                <div id="filter-colour" className="collapse show">
                  <div className="filter-options mt-3">
                    <div className="form-group d-inline-block mr-1 mb-1 form-check-solid-bg-checkmark form-check-custom form-check-primary">
                      <input type="checkbox" className="form-check-color-input" id="filter-colours-0" />
                      <label className="form-check-label" htmlFor="filter-colours-0" />
                    </div>                        <div className="form-group d-inline-block mr-1 mb-1 form-check-solid-bg-checkmark form-check-custom form-check-success">
                      <input type="checkbox" className="form-check-color-input" id="filter-colours-1" />
                      <label className="form-check-label" htmlFor="filter-colours-1" />
                    </div>                        <div className="form-group d-inline-block mr-1 mb-1 form-check-solid-bg-checkmark form-check-custom form-check-danger">
                      <input type="checkbox" className="form-check-color-input" id="filter-colours-2" />
                      <label className="form-check-label" htmlFor="filter-colours-2" />
                    </div>                        <div className="form-group d-inline-block mr-1 mb-1 form-check-solid-bg-checkmark form-check-custom form-check-info">
                      <input type="checkbox" className="form-check-color-input" id="filter-colours-3" />
                      <label className="form-check-label" htmlFor="filter-colours-3" />
                    </div>                        <div className="form-group d-inline-block mr-1 mb-1 form-check-solid-bg-checkmark form-check-custom form-check-warning">
                      <input type="checkbox" className="form-check-color-input" id="filter-colours-4" />
                      <label className="form-check-label" htmlFor="filter-colours-4" />
                    </div>                        <div className="form-group d-inline-block mr-1 mb-1 form-check-solid-bg-checkmark form-check-custom form-check-dark">
                      <input type="checkbox" className="form-check-color-input" id="filter-colours-5" />
                      <label className="form-check-label" htmlFor="filter-colours-5" />
                    </div>                        <div className="form-group d-inline-block mr-1 mb-1 form-check-solid-bg-checkmark form-check-custom form-check-secondary">
                      <input type="checkbox" className="form-check-color-input" id="filter-colours-6" />
                      <label className="form-check-label" htmlFor="filter-colours-6" />
                    </div>              </div>
                </div>
              </div>
              {/* / Colour Filter */}
            </aside>
            {/* / Category Aside*/}                  </div>
        </div>
        {/* / Category Aside/Sidebar */}
        {/* Category Products*/}
        <div className="col-12 col-lg-9">
          {/* Top Toolbar*/}
          <div className="mb-4 d-md-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-start align-items-center flex-grow-1 mb-4 mb-md-0">
              <small className="d-inline-block fw-bolder">Filtered by:</small>
              <ul className="list-unstyled d-inline-block mb-0 ms-2">
                <li className="bg-light py-1 fw-bolder px-2 cursor-pointer d-inline-block me-1 small">Type: Slip On <i className="ri-close-circle-line align-bottom ms-1" /></li>
              </ul>
              <span className="fw-bolder text-muted-hover text-decoration-underline ms-2 cursor-pointer small">Clear
                All</span>
            </div>
            <div className="d-flex align-items-center flex-column flex-md-row">
              {/* Filter Trigger*/}
              <button className="btn bg-light p-3 d-flex d-lg-none align-items-center fs-xs fw-bold text-uppercase w-100 mb-2 mb-md-0 w-md-auto" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasFilters" aria-controls="offcanvasFilters">
                <i className="ri-equalizer-line me-2" /> Filters
              </button>
              {/* / Filter Trigger*/}
              <div className="dropdown ms-md-2 lh-1 p-3 bg-light w-100 mb-2 mb-md-0 w-md-auto">
                <p className="fs-xs fw-bold text-uppercase text-muted-hover p-0 m-0" role="button" data-bs-toggle="dropdown" aria-expanded="false">Sort By <i className="ri-arrow-drop-down-line ri-lg align-bottom" /></p>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item fs-xs fw-bold text-uppercase text-muted-hover mb-2" href="#">Price: Hi Low</a></li>
                  <li><a className="dropdown-item fs-xs fw-bold text-uppercase text-muted-hover mb-2" href="#">Price: Low Hi</a></li>
                  <li><a className="dropdown-item fs-xs fw-bold text-uppercase text-muted-hover mb-2" href="#">Name</a></li>
                </ul>
              </div>
            </div>
          </div>                    {/* / Top Toolbar*/}
          {/* Products*/}
          <div className="row g-4 mb-5">
            
              {/* Card Product*/}
              {products.map((product, index)=> <div key={index} className="col-12 col-sm-6 col-md-4">
              <div  className="card position-relative h-100 card-listing hover-trigger">
                <div className="card-header">
                  <picture className="position-relative overflow-hidden d-block bg-light">
                    <img className="w-100 img-fluid position-relative z-index-10"  src={product.image} alt="" />
                  </picture>
                  <picture className="position-absolute z-index-20 start-0 top-0 hover-show bg-light">
                    <img className="w-100 img-fluid"  src={product.image} alt="" />
                  </picture>
                  <div className="card-actions">
                    <span className="small text-uppercase tracking-wide fw-bolder text-center d-block">Quick Add</span>
                    <div className="d-flex justify-content-center align-items-center flex-wrap mt-3">
                      {product.sizes.map((size, index)=> <button key={index} className="btn btn-outline-dark btn-sm mx-2">{size}</button>)}
                    </div>
                  </div>
                </div>
                <div className="card-body px-0 text-center">
                  <a className="mb-0 mx-2 mx-md-4 fs-p link-cover text-decoration-none d-block text-center" href="#">{product.title}</a>
                  <p className="fw-bolder m-0 mt-2">RM{product.price}</p>
                </div>
              </div>
              </div>)}
          </div>
          {/* / Products*/}
          {/* Pagiation*/}
          {/* Pagination*/}
          <nav className="border-top mt-5 pt-5 d-flex justify-content-between align-items-center" aria-label="Category Pagination">
            <ul className="pagination">
              <li className="page-item"><a className="page-link" href="#"><i className="ri-arrow-left-line align-bottom" /> Prev</a></li>
            </ul>
            <ul className="pagination">
              <li className="page-item active mx-1"><a className="page-link" href="#">1</a></li>
              <li className="page-item mx-1"><a className="page-link" href="#">2</a></li>
              <li className="page-item mx-1"><a className="page-link" href="#">3</a></li>
            </ul>
            <ul className="pagination">
              <li className="page-item"><a className="page-link" href="#">Next <i className="ri-arrow-right-line align-bottom" /></a></li>
            </ul>
          </nav>                    {/* / Pagination*/}
        </div>
        {/* / Category Products*/}
      </div>
    </div>
  </section>

}