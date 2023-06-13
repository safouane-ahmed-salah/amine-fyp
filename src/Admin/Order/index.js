import { Avatar, Card, Col, Image, List, Row, Statistic, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { dbGetListener } from "../../db";

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
      {title: "Amount", dataIndex: "total", render: (amount)=> "RM"+amount }
  ];
  useEffect(()=>dbGetListener('orders', (data)=> setData(Object.values(data))),[]);

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
            title="Total Amount (MYR)"
            value={total}
            precision={2}
          />
        </Card>
      </Col>
    </Row>
    <Table dataSource={data} columns={columns} />
  </div>
}