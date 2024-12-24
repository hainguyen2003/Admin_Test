import { EditOutlined, SolutionOutlined } from "@ant-design/icons";
import { PageContainer } from "@ant-design/pro-components";
import { Button, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { getListDisplay, getListSlide } from "../../../../Services/lead";
import { useNavigate } from "react-router-dom";
import EditSlide from "../../../AddEdit/EditSlide/EditSlide";

function Slide(props) {
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState();
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState({});
  const navigate = useNavigate();

  // getAll
  const handleGetSlide = () => {
    getListSlide().then((res) => {
      setData(res?.data?.data?.items);
    });
  };

  useEffect(() => {
    handleGetSlide();
    setLoading(false);
  }, []);

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (imageURL) => (
        <img
          src={imageURL}
          alt={imageURL}
          style={{ width: "100px", height: "100px" }}
        />
      ),
    },

    {
      title: "Vị trí ảnh",
      dataIndex: "location",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updateDate",
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
        </Space>
      ),
    },
  ];
  return (
    <div>
      <PageContainer
        title="Quản lý hiển thị slide"
        extra={[
          <Space>
            <Button
              onClick={() => {
                navigate("/adminpage/displaypages");
              }}
            >
              Quản lý Pages
            </Button>
          </Space>,
        ]}
      >
        <EditSlide
          onSuccess={() => {
            handleGetSlide();
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

        <Table
          rowKey={"id"}
          columns={columns}
          dataSource={data}
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

export default Slide;
