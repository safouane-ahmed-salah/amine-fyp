import { Button, Form, Input, InputNumber, message } from "antd";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { dbGet, dbSet } from "./db";

export default function Profile() {
    const { currentUser } = getAuth();
    const [form] = Form.useForm();
    var userData = {};
    useEffect(()=> {
        if(!currentUser) return;
        dbGet('users/' + currentUser.uid).then(data => { userData=data; form.setFieldsValue(data); });
    }, []);

    if (!currentUser) return <Navigate to="/login" state={{ redirect: '/profile' }} />

    function onFinish(data) {
        dbSet('users', {...userData, ...data}, currentUser.uid).then(()=> message.success("Details successfully updated"));
    }

    const required = [{ required: true, message: 'This field is required' }];
    const fields = [
        { label: "Name", name: "name", children: <Input />, rules: required, },
        { label: "Email", name: "email", children: <Input type="email" readOnly className="bg-light" />},
        { label: "Phone", name: "phone", children: <Input />, rules: required },
        { label: "Age", name: "age", children: <InputNumber />, rules: required },
    ]


    return <Form form={form} className="m-auto py-5" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
    >
        {fields.map((props, index) => <Form.Item initialValue={''} key={index} {...props} />)}
        <Form.Item wrapperCol={{offset: 8, span: 16}}>
            <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
    </Form>
}