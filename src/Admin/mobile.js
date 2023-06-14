import { NavBar, TabBar } from 'antd-mobile'
import { AppstoreOutline, TruckOutline, ScanCodeOutline} from 'antd-mobile-icons'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import MobileProduct from './mobile/Product';
import MobileScan from './mobile/Scan';


export default function AdminMobile(){
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const tabs = [
        {
          key: '/admin-mobile/products',
          title: 'Products',
          icon: <AppstoreOutline />,
          content: <MobileProduct />
        },
        {
          key: '/admin-mobile/order',
          title: 'Orders',
          icon: <TruckOutline />,
          content: <div>Orders</div>
        },
        {
          key: '/admin-mobile/scan',
          title: 'Scan',
          icon: <ScanCodeOutline />,
          content: <MobileScan />
        }
    ];

    const tab = tabs.find(tab => tab.key==pathname);
    if(!tab) return <Navigate to={tabs[0].key} />

    return <div style={{display: "flex", flexDirection: "column", height: "100vh"}}>
        <div style={{flex: 0, border: "solid 1px var(--adm-color-border)" }}>
            <NavBar backArrow={false}>{tab.title}</NavBar>
        </div>
        <div style={{flex: 1}} >
            {tab.content}
        </div>
        <div style={{flex: 0, border: "solid 1px var(--adm-color-border)" }}><TabBar activeKey={pathname} onChange={navigate}>
            {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
            ))}
        </TabBar>
    </div>
  </div>
}