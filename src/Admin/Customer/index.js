import { Avatar, Card, Col, Image, List, Row, Statistic, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { dbGetListener } from "../../db";

export default function Customer() {
  const [data, setData] = useState([]);

  const columns = [
      {title: 'Name', dataIndex: 'name'},
      {title: 'Email', dataIndex: 'email'},
      {title: "Phone", dataIndex: "phone" },
      {title: "Age", dataIndex: "age" },
  ];
  useEffect(()=>dbGetListener('users', (data)=> setData(Object.values(data))),[]);

  return <div>
    <Table dataSource={data} columns={columns} />
  </div>
}