import React, { useState } from "react";
import { Card, Button, notification } from "antd";
import products from "./products.json";
import { useParams } from 'react-router-dom';
import QRCode from "react-qr-code";

const ProductDetail = () => {
  const [cart, setCart] = useState([]);
  const {id} = useParams();
  const product = products.find(prod => prod.id == id);

  const addToCart = () => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    notification.success({
      message: "Item added to cart",
      description: `${product.title} has been added to your cart!`,
    });
  };

  return (
    <div>
      <Card
        title={product.title}
        cover={<img src={product.image} alt={product.title}  />}
      >
        <p>{product.description}</p>
        <p>Price: RM{product.price}</p>
        <p>
        <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
            <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={window.location.href}
            viewBox={`0 0 256 256`}
            />
        </div>
        </p>
        <Button type="primary" onClick={addToCart}>
          Add to Cart
        </Button>
      </Card>
    </div>
  );
};

export default ProductDetail;
