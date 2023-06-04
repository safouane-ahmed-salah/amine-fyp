import { Button, Form, Input, InputNumber, Select, Upload } from "antd";
import { brands, categories, colors, sizes } from "../../constants";
import { UploadOutlined } from '@ant-design/icons';
import { uploadFile } from "../../storage";
import { dbSet } from "../../db";

function UploadImage(){
  const form = Form.useFormInstance();
  async function onUpload(file){
    var imageUrl = await uploadFile(file);
    form.setFieldValue('image', imageUrl);
    return false;
  }

  async function onRemove(){
    form.setFieldValue('image','');
  }

  return <Upload beforeUpload={onUpload} onRemove={onRemove} accept="image/*" listType="picture" maxCount={1}>
    <Button icon={<UploadOutlined />}>Upload</Button>
  </Upload>
}

export default function AddProduct({toggle}){

    function onFinish(data){
      console.log(data);
        dbSet('products', data);
        toggle();
    }

    const fields = [
        {label: "Product Image", name: "image", children: <UploadImage />},
        {label: "Product Name", name: "name", children: <Input />},
        {label: "Price", name: "price", children: <InputNumber />},
        {label: "Quantity", name: "quantity", children: <InputNumber />},
        {label: "Colors", name: "colors", initialValue:[], children: <Select mode="multiple" options={colors.map(color=> ({value:color, label: <div style={{backgroundColor:color, height:30, minWidth:20}} />}) )} />},
        {label: "Sizes", name: "sizes", initialValue:[], children: <Select mode="multiple" options={sizes.map(size=> ({value:size, label: size}) )} />},
        {label: "Category", name: "category", children: <Select options={categories.map(category=> ({value:category, label:category}) )} />},
        {label: "Brand", name: "brand", children: <Select options={brands.map(brand=> ({value:brand, label: brand}) )} />},
        {label: "Description", name: "description", children: <Input.TextArea />},
    ]


    return <Form name="basic" labelCol={{ span: 8}} wrapperCol={{span: 16}} style={{maxWidth: 600}}
      onFinish={onFinish}
      autoComplete="off"
    >
    {fields.map((props, index)=> <Form.Item initialValue={''} key={index} {...props} /> )}
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