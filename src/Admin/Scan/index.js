import { Button, Space, Steps } from "antd";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import QrReader from "./QrReader";
import { useNavigate } from "react-router-dom";
import MaybankQr from "../../assets/maybank_payment.jpeg";
import { dbDelete, dbSet } from "../../db";
import CartSection from "../../Cart/CartSection";

export default function Scan(){
    const [currentStep, setCurrentStep]= useState(0);
    const [data, setData] = useState({});
    const navigate = useNavigate();

    var steps = [ 
        {title: 'Scan', content: <QrReader updateData={updateData} />}, 
        {title: 'Add Order', content: <CartSection cartData={data.cart || []} total={data.total} title={"Cart Summary"}>
            <div className="py-3 border-bottom-white-opacity">
            <div className="d-flex justify-content-between align-items-center flex-column flex-sm-row">
              <div>
                <p className="m-0 fs-5 fw-bold">Customer Name</p>
              </div>
              <p className="mt-3 m-sm-0 fs-5 fw-bold">{data.user && data.user.name}</p>
            </div>
          </div>
          <div className="py-3 border-bottom-white-opacity">
            <div className="d-flex justify-content-between align-items-center flex-column flex-sm-row">
              <div>
                <p className="m-0 fs-5 fw-bold">Customer Email</p>
              </div>
              <p className="mt-3 m-sm-0 fs-5 fw-bold">{data.user && data.user.email}</p>
            </div>
          </div>
        </CartSection>},
        {title: 'Payment', content: <Payment total={data.total || 0} />}
    ];

    function updateData(scannedData){
        setData(scannedData);
        setCurrentStep(currentStep+1);
    }

    function goBack(){
        setCurrentStep(currentStep-1);
    }

    async function AddOrder(){
        await dbSet('orders', data);
        await dbDelete('users/'+ data.user.uid + '/cart');
        setCurrentStep(currentStep+1);
    }

    function Done(){
        navigate('/admin/orders');
    }

    return  <div>
        <Steps current={currentStep} items={steps}/>
        <Content style={{padding: 20}}>
            {steps[currentStep].content}
        </Content>
        <Space style={{float: "right", margin: 10}}>
            {currentStep==1 && <Button onClick={goBack} >Back</Button>}
            {/* {currentStep==0 &&  <Button type="primary" onClick={()=> setCurrentStep(1)}>Next</Button>} */}
            {currentStep==1 && <Button type="primary" onClick={AddOrder}>Pay</Button>}
            {currentStep==steps.length-1 && <Button onClick={Done} type="primary">Done</Button>}
        </Space>
    </div>
}


function Payment({total= 1000 }){
    return <div style={{textAlign: 'center'}}>
        <img src={MaybankQr}  height={400} />
        <h4 style={{marginTop: 10}}>Total Amount: {total.toFixed(2)}MYR</h4>
    </div>
}
