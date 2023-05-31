import { Card, Col, Row, Statistic, Table } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

export default function Order() {

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
    { title: 'ID', dataIndex: 'id', },
    { title: 'Product Name', dataIndex: 'name' },
    { title: 'Price', dataIndex: 'price' },
    { title: 'Quantity', dataIndex: 'quantity' },
    { title: 'Colors', dataIndex: 'colors' },
    { title: 'Sizes', dataIndex: 'size' },
    { title: 'Category', dataIndex: 'category' },
    { title: 'Brand', dataIndex: 'brand' },
  ];


  return <div>
    <Row gutter={16} style={{marginBottom: 20}}>
      <Col span={12}>
        <Card bordered={false}>
          <Statistic
            title="Total Order"
            value={11}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card bordered={false}>
          <Statistic
            title="Total Amount (MYR)"
            value={10000}
            precision={2}
          />
        </Card>
      </Col>
    </Row>
    <Table dataSource={dataSource} columns={columns} />
  </div>
}