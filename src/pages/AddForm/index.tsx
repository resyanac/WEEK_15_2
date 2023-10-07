
import { Button, Card, Form, Input, Space} from 'antd';
import {  useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios, { AxiosError } from 'axios';

// const { Option } = Select;

interface FormProps {
  task?: string;
}

const initialValues = {
  task: ''
};


const AddForm = () => {
  const navigate = useNavigate();
  const handleSubmit = async (values: FormProps) => {
    try {
      await axios.post(
        'https://week-15-resyanac.railway.internal/v1/tasks',
        {
          task: values.task
        },
        {
        }
      ); 
      navigate('/')
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = error as AxiosError as any;
      const errors = err.response?.data?.errors;
      if (Array.isArray(errors)) {
        return;
      }
    }
  };

    const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit
  });


  return (
      <Card title="Add New Task">
      <Form name="control-ref" onFinish={handleSubmit} style={{ width: 200 }}>
        <Form.Item 
        name="task"
        validateStatus={
        formik.touched.task && formik.errors.task ? "error" : ""}
        help={formik.touched.task && formik.errors.task} >
          <Input name="task"
            placeholder="Task"
            value={formik.values.task}
            />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              SUBMIT
            </Button>
            <Button onClick={() => navigate('/')} htmlType="button">BACK</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddForm;
