import { Button,  Popconfirm, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
// import AddProduct from "./AddProduct";
import { dbDelete, dbGetListener } from "../../../db";
import { DeleteOutlined } from "@ant-design/icons";
import { List, Image } from 'antd-mobile'

export default function MobileProduct(){
    const [addState, setAddState] = useState(false);
    const [products, setProducts] = useState([]);

    const toggleAddSate = () => setAddState(!addState);
      

    useEffect(()=>dbGetListener('products', (data)=> setProducts(Object.entries(data).map(([key, data])=> ({key,...data}) ))), []);
      
    return <div>
        {/* {addState ? <AddProduct toggle={toggleAddSate} /> : <>
            <div style={{textAlign: 'right', padding: 20}}>
                <Button onClick={toggleAddSate} type="primary">Add Product</Button>
            </div>
            <Table dataSource={products} columns={columns} />
        </>
        }*/}

    <List header='Products'>
        {products.map((product, index)=> <List.Item 
            key={index} 
            // title={product.name}
            prefix={<Image src={product.image} fit='cover' width={100} height={100} />}
            description={<div>
                <div>Quantity: {product.quantity}</div>
                <div>Available Colors: {product.quantity}</div>
            </div>}
            extra={'RM'+ product.price}
        >
            {product.name}
        </List.Item>)}
    </List>

    </div>
}