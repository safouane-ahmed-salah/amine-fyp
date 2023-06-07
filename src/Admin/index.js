import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import AdminLogin from "./Login";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,    
    ScanOutlined,
    DatabaseOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import "./admin.css";
import Product from "./Product";
import Order from "./Order";
import Scan from "./Scan";

export default function Admin(){
    // return null;
    return <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="*" element={<AdminContent />} />
    </Routes>   
}


const { Header, Sider, Content } = Layout;
function  AdminContent() {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const {
      token: { colorBgContainer },
    } = theme.useToken();
    return (
      <Layout style={{minHeight: "100vh"}}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" >
            Amine shop Admin 
          </div>
          <Menu
            theme="dark"
            mode="inline"
            onSelect={({key})=> navigate('/admin/'+ key) }
            defaultSelectedKeys={['products']}
            items={[
              {
                key: 'products',
                icon: <DatabaseOutlined />,
                label: 'Products',
              },
              {
                key: 'orders',
                icon: <ShoppingCartOutlined />,
                label: 'Orders',
              },
              {
                key: 'scan',
                icon: <ScanOutlined />,
                label: 'Scan',
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Routes>
                <Route path="/scan" element={<Scan />} />
                <Route path="/orders" element={<Order />} />
                <Route path="/products" element={<Product />} />
                <Route path="*" element={<Navigate to="/admin/products" />} />
            </Routes>   
          </Content>
        </Layout>
      </Layout>
    );
}