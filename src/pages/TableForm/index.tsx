import React, { useEffect, useState } from "react";
import { Button, Table, Space, Card, Form } from "antd";
import type { ColumnsType } from "antd/es/table";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';



interface DataType {
  _id: string;
  task: string;
  status: string;
}

// interface ApiResponse {
//     data: DataType[],
//     current_page: number,
//     total_item: number,
//     total_page: number,
// }


const TableForm: React.FC = () => {

  const navigate = useNavigate();
  const [data, setData] = useState<DataType[]>([])

const fetchData = async () => {

  const apiUrl = 'https://week-15-resyanac.railway.internal/v1/tasks';
  const fetching = await fetch(apiUrl, {
                method: 'GET'
            }); 
if (fetching.ok) {
  const data = await fetching.json()
  setData(data.data)
}
} 

useEffect(() => {
    fetchData();
  }, []);

const columns: ColumnsType<DataType> = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    render: (_id: string) => <a>{_id}</a>,
  },
  {
    title: "Task",
    dataIndex: "task",
    key: "task",
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',

    render: (status) => (
      <span>{status}</span>
    ),
    filters: [
      { text: 'Not started', value: 'Not started' },
      { text: 'Done / Approved', value: 'Done / Approved' },
    ],
    onFilter: (value, record) => record.status === value,
  },
  {
    title: "Action",
    key: "action",
    render: (_, data ) => (
      <Space>
        <Button onClick={() => navigate(`/edit-item/${data._id}`)}>EDIT</Button>
        <Button onClick={() => deleteItem(data._id)} type="primary">DELETE</Button>
      </Space>
    ),
  },
];

  const deleteItem = async (deleted: string) => {
  const apiUrl = `https://week-15-resyanac.railway.internal/v1/tasks/${deleted}`;
  const fetching = await fetch(apiUrl, {
                method: 'DELETE'
            }); 
if (fetching.ok) { 
  Swal.fire({
          icon: 'success',
          title: 'Successfully deleted',
          text: 'Successfully deleted',
        });
        fetchData()
      } 
} 

  return (
    <Card title="Tasks Table" style={{ padding: "20px" }}>
      <Form.Item>
        <Button
          type="primary"
          className="login-link"
          onClick={() => navigate('/add-item')}
          style={{ marginRight: "550px" }}
        >
          Add New Category
        </Button>
      </Form.Item>
      
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: 5,
            total: data.length,
          }}
          style={{ width: "800px"}}
        />
      
    </Card>
  );
};

export default TableForm;
