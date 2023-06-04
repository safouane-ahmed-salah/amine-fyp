import { Button, Image, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import { dbGet, dbGetListener } from "../../db";

export default function Product(){
    const [addState, setAddState] = useState(false);
    const [products, setProducts] = useState([]);

    const toggleAddSate = () => setAddState(!addState);
      
    const columns = [
        {title: 'Image', dataIndex: 'image', render: value => value && <Image width={100} src={value} /> },
        {title: 'Product Name', dataIndex: 'name'},
        {title: 'Price', dataIndex: 'price'},
        {title: 'Quantity', dataIndex: 'quantity'},
        {title: 'Colors', dataIndex: 'colors', render: value => <Space>{value && value.map((color,index)=> <Tag key={index} color={color} style={{height:20}}></Tag>)}</Space>  },
        {title: 'Sizes', dataIndex: 'sizes', render: value => <Space>{value && value.map((size,index)=> <Tag key={index}>{size}</Tag>)}</Space> },
        {title: 'Category', dataIndex: 'category'},
        {title: 'Brand', dataIndex: 'brand'},
    ];

    useEffect(()=>dbGetListener('products', (data)=> setProducts(Object.values(data))), []);
      
    return <div>
        {addState ? <AddProduct toggle={toggleAddSate} /> : <>
            <div style={{textAlign: 'right', padding: 20}}>
                <Button onClick={toggleAddSate} type="primary">Add Product</Button>
            </div>
            <Table dataSource={products} columns={columns} />
        </>
        }
    </div>
}