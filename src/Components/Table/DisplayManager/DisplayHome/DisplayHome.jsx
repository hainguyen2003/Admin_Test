import { Button, Drawer, Space, Table, Form, Input, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { getListDisplay } from "../../../../Services/lead";
import { EditOutlined, SolutionOutlined } from "@ant-design/icons";
import { PageContainer } from "@ant-design/pro-components";
import EditDisplay from "../../../AddEdit/EditDisplayManager/EditDisplay";

function DisplayHome() {
  const [loading, setLoading] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState({});

  // Lấy dữ liệu danh sách HOME
  const handleGetHome = async () => {
    setLoading(true);
    const res = await getListDisplay();
    setData(res?.data?.data?.items || []);
    setLoading(false);
  };

  // Lọc dữ liệu chỉ hiển thị loại HOME
  const dataHome = data.filter((home) => home.type === "HOME");

  useEffect(() => {
    handleGetHome();
  }, []);

  const columns = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (imageURL) => (
        <img
          src={imageURL}
          alt="Home Image"
          onError={(e) => (e.target.src = "https://via.placeholder.com/120")}
          style={{
            width: "120px",
            height: "120px",
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
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Tooltip title="Chỉnh sửa">
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                setCurrentData(record);
                setOpenModal(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Xem chi tiết">
            <Button
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
    <PageContainer title="Quản lý Display Home">
      {/* Modal thêm/sửa */}
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

      {/* Drawer hiển thị chi tiết */}
      <Drawer
        title="Thông tin chi tiết"
        width={600}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        bodyStyle={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Form
          layout="vertical"
          initialValues={currentData}
          style={{ width: "100%" }}
        >
          <Form.Item label="Tiêu đề" name="title">
            <Input
              value={currentData.title}
              disabled
              style={{
                fontWeight: "bold",
                backgroundColor: "#f5f5f5",
              }}
            />
          </Form.Item>
          <Form.Item label="Loại" name="type">
            <Input value={currentData.type} disabled />
          </Form.Item>
          <Form.Item label="Vị trí ảnh" name="location">
            <Input value={currentData.location} disabled />
          </Form.Item>
          <Form.Item label="Ảnh">
            <div
              style={{
                textAlign: "center",
                border: "1px solid #d9d9d9",
                padding: "10px",
                borderRadius: "8px",
                backgroundColor: "#fafafa",
              }}
            >
              <img
                src={currentData.image}
                alt="Chi tiết"
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/150")
                }
                style={{
                  maxWidth: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
              />
            </div>
          </Form.Item>
        </Form>
      </Drawer>

      {/* Bảng hiển thị danh sách */}
      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataHome}
        size="middle"
        pagination={{ pageSize: 5 }}
        scroll={{ y: 413 }}
        loading={loading}
      />
    </PageContainer>
  );
}

export default DisplayHome;
