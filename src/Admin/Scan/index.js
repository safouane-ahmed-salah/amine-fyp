import { Button, Space, Steps } from "antd";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import QrReader from "./QrReader";
import { useNavigate } from "react-router-dom";
import MaybankQr from "../../assets/maybank_payment.jpeg";

export default function Scan(){
    const [currentStep, setCurrentStep]= useState(0);
    const [data, setData] = useState();
    const navigate = useNavigate();

    var steps = [ 
        {title: 'Scan', content: <QrReader />}, 
        {title: 'Add Order', content: "Add Order"},
        {title: 'Payment', content: <Payment total={500} />}
    ];
    console.log('currentStep', currentStep);

    function updateData(scannedData){
        setCurrentStep(currentStep+1);
        // if(scannedData) setData(scannedData);
    }

    function goBack(){
        setCurrentStep(currentStep-1);
    }

    function AddOrder(){
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
            {currentStep==0 &&  <Button type="primary" onClick={()=> setCurrentStep(1)}>Next</Button>}
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
