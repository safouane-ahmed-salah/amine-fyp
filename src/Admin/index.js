import { Route, Routes, Navigate, useNavigate, useLocation } from "react-router-dom";
import AdminLogin from "./Login";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,    
    ScanOutlined,
    DatabaseOutlined,
    ShoppingCartOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import "./admin.css";
import Product from "./Product";
import Order from "./Order";
import Scan from "./Scan";
import Customer from "./Customer";

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
    const {pathname} = useLocation();
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
            onSelect={({key})=> navigate(key) }
            selectedKeys={[pathname]}
            items={[
              {
                key: '/admin/products',
                icon: <DatabaseOutlined />,
                label: 'Products',
              },
              {
                key: '/admin/orders',
                icon: <ShoppingCartOutlined />,
                label: 'Orders',
              },
              {
                key: '/admin/scan',
                icon: <ScanOutlined />,
                label: 'Scan',
              },
              {
                key: '/admin/customers',
                icon: <UserOutlined />,
                label: 'Customers',
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
                {/* <Route path="/scan" element={<Scan />} /> */}
                <Route path="/orders" element={<Order />} />
                <Route path="/products" element={<Product />} />
                <Route path="/customers" element={<Customer />} />
                <Route path="*" element={<Navigate to="/admin/products" />} />
            </Routes>   
          </Content>
        </Layout>
      </Layout>
    );
}