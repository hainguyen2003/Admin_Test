/* eslint-disable jsx-a11y/alt-text */
import { Button, Drawer, Modal, Space, Table, Tooltip, Card } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getListDisplay } from "../../../../Services/lead";
import { EditOutlined, SolutionOutlined } from "@ant-design/icons";
import { PageContainer } from "@ant-design/pro-components";
import EditDisplay from "../../../AddEdit/EditDisplayManager/EditDisplay";
import DetailDisplay from "../../../Details/DetailDisplay/DetailDisplay";

function DisplayPages() {
  const [loading, setLoading] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState({});
  const navigate = useNavigate();

  // Fetch all display data
  const handleGetPages = async () => {
    const res = await getListDisplay();
    setData(res?.data?.data?.items || []);
    setLoading(false);
  };

  const dataPages = data.filter((pages) => pages.type === "PAGES");

  useEffect(() => {
    handleGetPages();
  }, []);

  const columns = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (imageURL) => (
        <img
          src={imageURL}
          onError={(e) => (e.target.src = "https://via.placeholder.com/100")}
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
            borderRadius: "8px",
            border: "1px solid #d9d9d9",
          }}
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
      render: (type) => (
        <span style={{ color: type === "PAGES" ? "green" : "blue" }}>
          {type}
        </span>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (record) => (
        <Space>
          <Tooltip title="Chỉnh sửa">
            <Button
              className="update"
              icon={<EditOutlined />}
              onClick={() => {
                setCurrentData(record);
                setOpenModal(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Xem chi tiết">
            <Button
              className="detail"
              icon={<SolutionOutlined />}
              onClick={() => {
                setCurrentData(record);
                setOpenDrawer(true);
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
        title="Quản lý hiển thị chung của các trang"
        extra={
          <Button
            type="primary"
            onClick={() => navigate("/adminpage/displayslide")}
          >
            Quản lý Slide
          </Button>
        }
      >
        <EditDisplay
          onSuccess={() => {
            handleGetPages();
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
          title="Thông tin chi tiết"
          width={600}
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
        >
          <Card
            title={currentData.title}
            bordered={false}
            cover={
              <img
                alt="example"
                src={currentData.image}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/600x200")
                }
              />
            }
          >
            <p>
              <strong>Vị trí ảnh:</strong> {currentData.location}
            </p>
            <p>
              <strong>Loại:</strong> {currentData.type}
            </p>
          </Card>
        </Drawer>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={dataPages}
          size="middle"
          pagination={{
            pageSize: 5,
            showSizeChanger: true,
          }}
          loading={loading}
          scroll={{ y: 413 }}
        />
      </PageContainer>
    </div>
  );
}

export default DisplayPages;
