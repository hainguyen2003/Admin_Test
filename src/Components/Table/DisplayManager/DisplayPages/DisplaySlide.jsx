import { EditOutlined } from "@ant-design/icons";
import { PageContainer } from "@ant-design/pro-components";
import { Button, Space, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { getListSlide } from "../../../../Services/lead";
import { useNavigate } from "react-router-dom";
import EditSlide from "../../../AddEdit/EditSlide/EditSlide";
import moment from "moment";

function Slide() {
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState({});
  const navigate = useNavigate();

  // Fetch all slides
  const handleGetSlide = async () => {
    const res = await getListSlide();
    setData(res?.data?.data?.items || []);
    setLoading(false);
  };

  useEffect(() => {
    handleGetSlide();
  }, []);

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (imageURL) => (
        <div style={{ textAlign: "center" }}>
          <img
            src={imageURL}
            alt="slide"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "8px",
              border: "1px solid #d9d9d9",
            }}
            onError={(e) => (e.target.src = "https://via.placeholder.com/100")}
          />
        </div>
      ),
    },
    {
      title: "Vị trí ảnh",
      dataIndex: "location",
      render: (location) => <span>{location || "N/A"}</span>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      render: (createdDate) =>
        createdDate ? moment(createdDate).format("DD/MM/YYYY") : "N/A",
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updateDate",
      render: (updateDate) =>
        updateDate ? moment(updateDate).format("DD/MM/YYYY") : "N/A",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Tooltip title="Chỉnh sửa">
            <Button
              className="update"
              icon={<EditOutlined />}
              type="primary"
              onClick={() => {
                setCurrentData(record);
                setOpenModal(true);
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <PageContainer
        title="Quản lý hiển thị Slide"
        extra={
          <Space>
            <Button
              type="default"
              onClick={() => {
                navigate("/adminpage/displaypages");
              }}
            >
              Quản lý Pages
            </Button>
          </Space>
        }
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
          rowKey="id"
          columns={columns}
          dataSource={data}
          size="middle"
          pagination={{
            pageSize: 5,
            showSizeChanger: true,
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
