import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Drawer, Space, Table } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { PageContainer } from "@ant-design/pro-components";
import EditDisplay from "../../../../AddEdit/EditDisplayManager/EditDisplay";
import DetailDisplay from "../../../../Details/DetailDisplay/DetailDisplay";
import { getListDisplay } from "../../../../../Services/lead";

function PROIT(props) {
  const [currentData, setCurrentData] = useState({});
  const [openModal, setOpenModal] = useState();
  const [openDrawer, setOpenDrawer] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleGetPROIT = () => {
    getListDisplay().then((res) => {
      setData(res?.data?.data?.items);
    });
  };

  const dataProit = data.filter((proit) => proit.type === "PROIT");

  const columns = [
    {
      title: "Tiêu đề ",
      dataIndex: "title",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (imageURL) => (
        <img
          src={imageURL}
          alt={imageURL}
          style={{ width: "90px", height: "90px" }}
        />
      ),
    },

    {
      title: "Vị trí ảnh",
      dataIndex: "location",
    },
    {
      title: "Loại",
      dataIndex: "type",
    },

    {
      title: "Action",
      key: "action",
      render: (e, record, idx) => (
        <Space>
          <Button
            className="update"
            icon={<EditOutlined />}
            onClick={() => {
              setCurrentData(record);
              setOpenModal(true);
            }}
          ></Button>
          <Button
            className="detail"
            icon={<SolutionOutlined />}
            onClick={() => {
              setOpenDrawer(true);
              navigate(
                `/adminpage/displayproit/detaildisplayproit/${record.id}`
              );
            }}
          ></Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    handleGetPROIT();
    setLoading(false);
  }, []);

  return (
    <div>
      <PageContainer
        title="Banner"
        extra={[
          <Space>
            <Button
              onClick={() => {
                navigate("/adminpage/displayprogram");
              }}
            >
              Quay lại
            </Button>
          </Space>,
        ]}
      >
        <EditDisplay
          onSuccess={() => {
            handleGetPROIT();
            setOpenModal(false);
          }}
          openModal={openModal}
          onOpenChange={(open) => {
            if (!open) {
              setOpenModal(false);
              setCurrentData({});
            }
          }}
          data={currentData}
        />
        <Drawer
          title="Thông tin chi tiết "
          width={500}
          open={openDrawer}
          onClose={() => {
            setOpenDrawer(false);
          }}
        >
          <DetailDisplay />
        </Drawer>
        <Table
          columns={columns}
          dataSource={dataProit}
          loading={loading}
          pagination={{ pageSize: 5 }}
          scroll={{
            y: 390,
          }}
        />
      </PageContainer>
    </div>
  );
}

export default PROIT;
