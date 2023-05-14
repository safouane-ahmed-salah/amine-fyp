import React from "react";
import { Row, Col, Card, Button } from "antd";
import { Link } from "react-router-dom";
import products from "../products.json";
import "./style.css";
  
// const ProductListing = () => {
//   return (
//     <div className="product-listing">
//       <h1>Product Listing</h1>
//       <Row gutter={[16, 16]}>
//         {products.map(product => (
//           <Col key={product.id} xs={24} sm={12} md={8} lg={6} xl={4}>
//             <Link to={"/product/" + product.id}>
//             <Card
//                 className="product-card"
//               cover={
//                 <img
//                   src={product.image}
//                   alt={product.title}
//                   className="product-card-image"
//                 />
//               }
//             >
//               <Card.Meta className="product-card-meta" title={product.title} description={product.description} />
//               <div style={{ marginTop: "10px" }}>
//                 <strong>Price:</strong> ${product.price}
//               </div>
//             </Card>
//             </Link>
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// };

const ProductListing = () => {
    return (
      <div className="product-listing">
        <Row gutter={[16, 16]}>
          {products.map((product) => (
            <Col span={8} key={product.id}>
              <Card className="product-card" hoverable>
                <Link to={`/product/${product.id}`}>
                  <img
                    alt={product.name}
                    src={product.image}
                    className="product-card-image"
                  />
                </Link>
                <div className="product-card-meta">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="product-card-title">{product.name}</h3>
                  </Link>
                  <p className="product-card-description">
                    {product.description}
                  </p>
                  <p className="product-card-price">{product.price}</p>
                  <Button className="product-card-button" type="primary">
                    <Link to={`/product/${product.id}`}>View details</Link>
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  };

export default ProductListing;
