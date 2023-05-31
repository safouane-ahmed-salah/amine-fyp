import { Button, Table } from "antd";
import { useState } from "react";
import AddProduct from "./AddProduct";

export default function Product(){
    const [addState, setAddState] = useState(false);

    const toggleAddSate = () => setAddState(!addState);

    const dataSource = [
        {
          id: '1',
          name: 'T-shirt 1',
          quantity: 32,
          dataIndex: '10 Downing Street',
        },
        {
          id: '2',
          name: 'Pants 1',
          quantity: 42,
          dataIndex: '10 Downing Street',
        },
      ];
      
    const columns = [
        {title: 'ID', dataIndex: 'id',},
        {title: 'Product Name', dataIndex: 'name'},
        {title: 'Price', dataIndex: 'price'},
        {title: 'Quantity', dataIndex: 'quantity'},
        {title: 'Colors', dataIndex: 'colors'},
        {title: 'Sizes', dataIndex: 'size'},
        {title: 'Category', dataIndex: 'category'},
        {title: 'Brand', dataIndex: 'brand'},
    ];

      
      
    return <div>
        {addState ? <AddProduct toggle={toggleAddSate} /> : <>
            <div style={{textAlign: 'right', padding: 20}}>
                <Button onClick={toggleAddSate} type="primary">Add Product</Button>
            </div>
            <Table dataSource={dataSource} columns={columns} />
        </>
        }
    </div>
}