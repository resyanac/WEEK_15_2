import React from 'react';
import { Button, Form, Card, Space, Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';


const { Option } = Select;

interface EditPage {
  status: string
}

// const initialValues = {
//   status: ''
// };

const EditForm: React.FC = () => {

const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const handleSubmit = (values: EditPage) => {
    console.log(values);

    axios.patch(`https://week-15-rprasetyob-production.up.railway.app/v1/tasks/${id}`, {
      id: id,
          status: values?.status,

        })
      .then((response) => {
        console.log('Update successful', response.data);
        navigate('/');
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'success',
          title: 'Data successfully submited!'
        }).then((result) => {
          if (result.isConfirmed) { /* empty */ }
});
      }).catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: 'An error occurred during update. Please try again.',
        });
      });
  };
  // const formik = useFormik({
  //   initialValues: initialValues,
  //   onSubmit: handleSubmit
  // });
  return (
    <Card title="Edit Category" style={{
      maxWidth: "400px",
      width: "100%",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"}}>
      <Form
        name="edit-item-form"
        onFinish={handleSubmit}
        style={{ maxWidth: 600 }}
      >
        
         <Form.Item name="status" rules={[{ required: true }]}>
          <Select
            placeholder="Select a status option"
            allowClear
          >
            <Option value="Not started">Not started</Option>
            <Option value="Done / Approved">Done / Approved</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">Submit</Button>
            <Button htmlType="button" onClick={() => { navigate('/') }}>Back</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};


export default EditForm;