import { Avatar, Card, Col, Image, List, Popconfirm, Row, Statistic, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { dbDelete, dbGetListener } from "../../db";

export default function Order() {
  const [data, setData] = useState([]);
  const total = data.reduce((inp, d)=> inp+(d.total || 0), 0);

  const columns = [
      {title: 'Products', dataIndex: 'cart', render: (products)=><List
        itemLayout="horizontal"
        dataSource={products}
        renderItem={(product, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar shape="square" size="large" src={product.image} />}
              title={product.name}
              description={<>{product.category}/ <Tag color={product.color} style={{height: 20}} /> /{product.size}</>}
            />
          </List.Item>
        )}/>},
      {title: 'Custmer', dataIndex: 'user', render: (customer)=> <div>
        <div>Name: {customer.name}</div>
        <div>Email: {customer.email}</div>
      </div>},
      {title: "Amount", dataIndex: "total", render: (amount)=> "RM"+amount },
      {title: 'Delete', dataIndex: 'key', render: (key)=> <Popconfirm title="Delete a order" description="Are you sure to delete this order?" okText="Yes" cancelText="No"
            onConfirm={()=> dbDelete('orders/'+ key) }
        >
        <DeleteOutlined style={{color: 'red', fontSize: 24}} />
      </Popconfirm> }
  ];
  useEffect(()=>dbGetListener('orders', (data)=> setData(Object.entries(data).map(([key,d])=> ({key, ...d}) ))),[]);

  return <div>
    <Row gutter={16} style={{marginBottom: 20}}>
      <Col span={12}>
        <Card bordered={false}>
          <Statistic
            title="Total Order"
            value={data.length}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card bordered={false}>
          <Statistic
            title="Total Amount"
            value={"RM" + total}
            precision={2}
          />
        </Card>
      </Col>
    </Row>
    <Table dataSource={data} columns={columns} />
  </div>
}