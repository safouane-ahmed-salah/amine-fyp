import React from "react";
import { Card, Row, Col } from "antd";
import { Link } from "react-router-dom";
import products from "./products.json";
  
const ProductListing = () => {
  return (
    <div>
      <h1>Product Listing</h1>
      <Row gutter={[16, 16]}>
        {products.map(product => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6} xl={4}>
            <Link to={"/product/" + product.id}>
            <Card
              cover={
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              }
            >
              <Card.Meta title={product.title} description={product.description} />
              <div style={{ marginTop: "10px" }}>
                <strong>Price:</strong> ${product.price}
              </div>
            </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductListing;
