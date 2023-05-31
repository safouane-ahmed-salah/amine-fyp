import { Button, Checkbox, Form, Input, InputNumber, Upload } from "antd";

export default function AddProduct({toggle}){

    function onFinish(data){
        //save to db
        toggle();
    }

    const fields = [
        {label: "Product Image", name: "image", children: <Upload />},
        {label: "Product Name", name: "name", children: <Input />},
        {label: "Price", name: "price", children: <InputNumber />},
        {label: "Quantity", name: "quantity", children: <InputNumber />},
        {label: "Colors", name: "colors", children: <Input />},
        {label: "Sizes", name: "sizes", children: <Input />},
        {label: "Category", name: "category", children: <Input />},
        {label: "Brand", name: "brand", children: <Input />},
        {label: "Description", name: "description", children: <Input.TextArea />},
    ]


    return <Form name="basic" labelCol={{ span: 8}} wrapperCol={{span: 16}} style={{maxWidth: 600}}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    // onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    {fields.map((props, index)=> <Form.Item key={index} {...props} /> )}
    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>

}