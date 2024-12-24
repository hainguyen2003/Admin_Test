/* eslint-disable jsx-a11y/alt-text */
import { Button, Drawer, Modal, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getListDisplay } from "../../../../Services/lead";
import { EditOutlined, SolutionOutlined } from "@ant-design/icons";
import { PageContainer } from "@ant-design/pro-components";
import EditDisplay from "../../../AddEdit/EditDisplayManager/EditDisplay";
import DetailDisplay from "../../../Details/DetailDisplay/DetailDisplay";

function DisplayHome(props) {
  const [loading, setLoading] = useState(true);
  const [openDrawer, setOpenDrawer] = useState();
  const [openModal, setOpenModal] = useState();
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState({});
  const navigate = useNavigate();

  // getAll
  const handleGetHome = () => {
    getListDisplay().then((res) => {
      setData(res?.data?.data?.items);
    });
  };

  console.log(data);

  const dataHome = data.filter((home) => home.type === "HOME");

  useEffect(() => {
    handleGetHome();
    setLoading(false);
  }, []);

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
          style={{ width: "150px", height: "150px" }}
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
              navigate(`/adminpage/displayhome/detaildisplayhome/${record.id}`);
            }}
          ></Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <PageContainer>
        <EditDisplay
          onSuccess={() => {
            handleGetHome();
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
          rowKey={"id"}
          columns={columns}
          dataSource={dataHome}
          size="middle"
          pagination={{
            pageSize: 5,
          }}
          scroll={{
            y: 413,
          }}
          loading={loading}
        />
      </PageContainer>
    </div>
  );
}

export default DisplayHome;
