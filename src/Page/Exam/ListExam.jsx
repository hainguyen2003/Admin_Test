import { DeleteFilled, EditFilled, FolderOpenFilled } from "@ant-design/icons";
import { Button, Popconfirm, Space, Switch, Table } from "antd";
import React, { useContext, useState } from "react";
import ModalEditExam from "../../Components/Modal/ModalEditExam";
import { AppContext } from "../../Components/AppContext/AppContext";
import { handelDeleteExam } from "./handleExam";
import { useNavigate } from "react-router-dom/dist";

function ListExam({ dataItems }) {
  const [idExam, setIdExam] = useState(null);
  const [dataExam, setDataExam] = useState(null);
  const { data, dispatch } = useContext(AppContext);
  const navigate = useNavigate()
  const columns = [
    {
      title: "Tên bài thi",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Loại bài thi",
      dataIndex: "type",
      align: "center",
    },
    {
      title: "Miễn phí",
      dataIndex: "isFree",
      align: "center",
      render : (e, record , index) => {
        if(e === true){
          return <p>Miễn phí</p>
        }else{
          return <p>Trả phí</p>

        }
      }
    },
    {
      title: "Hành động",
      width: "10%",
      align: "center",
      render: (e, record, index) => (
        <Space>
          <Button icon={<FolderOpenFilled className="text-lime-700" onClick={() =>navigate(`/adminpage/detail-exam/${record.id}`) } />} />
          <Button
            icon={
              <EditFilled className="" onClick={() => handleEditExam(record)} />
            }
          />
          <Popconfirm
            title="Delete the task"
            description="Nếu đồng ý xóa bài thi này sẽ ảnh hưởng tới việc lưu trữ kết quả bài thi của người dùng  "
            onConfirm={() => handelDeleteExam(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteFilled className="text-orange-600 " />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleEditExam = (record) => {
    dispatch({ type: "openModalEditExam" });
    setIdExam(record.id);
    setDataExam(record);
  };

  return (
    <div className="h-[70vh] overflow-auto ">
      {dataItems && <Table dataSource={dataItems} columns={columns} />}
      <ModalEditExam idExam={idExam} dataExam={dataExam} />
    </div>
  );
}

export default ListExam;
