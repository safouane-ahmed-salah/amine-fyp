import banner from "../assets/images/banners/banner-5.jpeg";
import { useEffect, useState } from "react";
import { brands, categories, colors, sizes } from "../constants";
import { dbGetListener } from "../db";
import { Space } from "antd";
import { Link, useLocation } from "react-router-dom";

export default function Homepage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { state } = useLocation();
  const [filters, setFilters] = useState({});
  useEffect(()=>dbGetListener('products', (data)=>{
    var prod = Object.entries(data).map(([key,data])=> ({key,...data}) ); 
    setProducts(prod); setFilteredProducts(prod); 
  }),[]);

  useEffect(()=> setFilters({category: state ? [state.category] : []}),[state]);
  useEffect(()=> {
    var searchedProducts = products.filter(product => {
      var hasCategory = !filters.category || !filters.category.length || filters.category.includes(product.category); 
      var hasBrand = !filters.brand || !filters.brand.length || filters.brand.includes(product.brand); 
      var hasColor = !filters.color || !filters.color.length || !!filters.color.filter(color=> product.colors.includes(color) ).length;
      var hasSize = !filters.size || !filters.size.length || !!filters.size.filter(size=> product.sizes.includes(size) ).length; 
      return hasCategory && hasBrand && hasColor && hasSize;
    });
    
    setFilteredProducts(searchedProducts);
  }, [filters]);

  function onSetFilter(key, value){
    if(!filters[key]) filters[key]=[];
    var index = filters[key].indexOf(value);
    if(index != -1) filters[key].splice(index, 1);
    else filters[key].push(value);
    setFilters({...filters});
  }

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
                    {categories.map((category, index) => <div key={index} className="form-group form-check mb-0">
                        <input type="checkbox" className="category-filter form-check-input" id={"filter-category-" + index} onChange={()=> onSetFilter('category', category)}  checked={filters.category && filters.category.includes(category)} />
                        <label className="form-check-label fw-normal text-body flex-grow-1 d-flex justify-content-between" htmlFor={"filter-category-" + index}>{category}
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
                        <input type="checkbox" className="form-check-input" id={"filter-brand-" + index} onChange={()=> onSetFilter('brand', brand)}  checked={filters.brand && filters.brand.includes(brand)} />
                        <label className="form-check-label fw-normal text-body flex-grow-1 d-flex justify-content-between" htmlFor={"filter-brand-" + index}>{brand}
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
                    <Space>
                    {sizes.map((size, index) => <div key={index} className="form-group d-inline-block mr-2 mb-2 form-check-bg form-check-custom">
                      <input type="checkbox" className="form-check-bg-input" id={"filter-sizes-" + index}  onChange={()=> onSetFilter('size', size)}  checked={filters.size && filters.size.includes(size)} />
                      <label className="form-check-label fw-normal" htmlFor={"filter-sizes-" + index}>{size}</label>
                    </div>)}
                    </Space>
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
                    {colors.map((color,index)=> <div key={index} style={{"--theme-form-checkbox-active-color": color}} className="form-group d-inline-block mr-1 mb-1 form-check-solid-bg-checkmark form-check-custom form-check-primary">
                      <input type="checkbox" className="form-check-color-input" id={"filter-colours-" + index} onChange={()=> onSetFilter('color', color)}  checked={filters.color && filters.color.includes(color)} />
                      <label className="form-check-label" htmlFor={"filter-colours-" + index} />
                    </div> 
                    )}
                    </div>
                </div>
              </div>
              {/* / Colour Filter */}
            </aside>
            {/* / Category Aside*/}                 
             </div>
        </div>
        {/* / Category Aside/Sidebar */}
        {/* Category Products*/}
        <div className="col-12 col-lg-9">
          {/* Products*/}
          <div className="row g-4 mb-5">
            
              {/* Card Product*/}
              {filteredProducts.map((product, index)=> <div key={index} className="col-12 col-sm-6 col-md-4">
              <div  className="card position-relative h-100 card-listing hover-trigger">
                <Link to={"/product/"+ product.key}>
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
                  <a className="mb-0 mx-2 mx-md-4 fs-p link-cover text-decoration-none d-block text-center" href="#">{product.name}</a>
                  <p className="fw-bolder m-0 mt-2">RM{product.price}</p>
                </div>
                </Link>
              </div>
              </div>)}
          </div>
          {/* / Products*/}
        </div>
        {/* / Category Products*/}
      </div>
    </div>
  </section>

}