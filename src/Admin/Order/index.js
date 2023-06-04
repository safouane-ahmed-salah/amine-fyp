import { Card, Col, Image, Row, Statistic, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { dbGetListener } from "../../db";

export default function Order() {
  const [data, setData] = useState([]);
  const total = data.reduce((inp, d)=> inp+(d.price || 0), 0);

  const columns = [
      {title: 'Image', dataIndex: 'image', render: value => value && <Image width={100} src={value} /> },
      {title: 'Product Name', dataIndex: 'name'},
      {title: 'Price', dataIndex: 'price'},
      {title: 'Quantity', dataIndex: 'quantity'},
      {title: 'Color', dataIndex: 'color', render: value => value && <Tag color={value} style={{height:20}}></Tag>  },
      {title: 'Size', dataIndex: 'size', render: value => value && <Tag>{value}</Tag> },
      {title: 'Customer Name', dataIndex: 'customer'},
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