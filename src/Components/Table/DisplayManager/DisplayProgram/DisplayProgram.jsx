/* eslint-disable jsx-a11y/alt-text */
import {
  Button,
  Drawer,
  Dropdown,
  Space,
  Table,
  Descriptions,
  Menu,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getListDisplay,
  createDisplay,
  updateDisplay,
} from "../../../../Services/lead";
import {
  EditOutlined,
  SolutionOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { PageContainer } from "@ant-design/pro-components";
import EditDisplay from "../../../AddEdit/EditDisplayManager/EditDisplay";

function DisplayProgram() {
  const [loading, setLoading] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState({});
  const navigate = useNavigate();

  const menuItems = [
    { label: "APTIS", onClick: () => navigate("/adminpage/displayaptis") },
    { label: "VSTEP", onClick: () => navigate("/adminpage/displayVstep") },
    { label: "IELTS", onClick: () => navigate("/adminpage/displayielts") },
    { label: "TOEIC", onClick: () => navigate("/adminpage/displaytoeic") },
    { label: "PROIT", onClick: () => navigate("/adminpage/displayproit") },
    {
      label: "Anh ngữ học thuật",
      onClick: () => navigate("/adminpage/displayAcademicEnglish"),
    },
  ];

  // Lấy danh sách chương trình
  const handleGetProgram = async () => {
    setLoading(true);
    const res = await getListDisplay();
    setData(res?.data?.data?.items || []);
    setLoading(false);
  };

  // Xử lý thêm hoặc cập nhật chương trình
  const handleSaveProgram = async (values) => {
    const sanitizedValues = {
      ...values,
      id: values.id || null,
    };

    if (currentData.id) {
      const res = await updateDisplay(currentData.id, sanitizedValues);
      if (res?.data?.success) {
        handleGetProgram();
        setOpenModal(false);
      }
    } else {
      const res = await createDisplay(sanitizedValues);
      if (res?.data?.success) {
        handleGetProgram();
        setOpenModal(false);
      }
    }
  };

  // Load dữ liệu ban đầu
  useEffect(() => {
    handleGetProgram();
  }, []);

  // Lọc chương trình theo loại
  const dataProgram = data.filter((program) =>
    [
      "BANNER",
      "VSTEP",
      "APTIS",
      "IELTS",
      "TOEIC",
      "PROIT",
      "Trang Anh Ngữ Học Thuật",
    ].includes(program.type)
  );

  const columns = [
    { title: "Tiêu đề", dataIndex: "title" },
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (url) => (
        <div style={{ textAlign: "center" }}>
          <img
            src={url}
            alt="Program Image"
            style={{
              width: "90px",
              height: "90px",
              objectFit: "cover",
              borderRadius: "8px",
              border: "1px solid #d9d9d9",
            }}
            onError={(e) => (e.target.src = "https://via.placeholder.com/90")}
          />
        </div>
      ),
    },
    { title: "Vị trí ảnh", dataIndex: "location" },
    { title: "Loại", dataIndex: "type" },
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
    <PageContainer
      title="Tất cả chương trình"
      extra={[
        <Space key="header-actions">
          <Button
            className="mr-1 bg-white"
            onClick={() => navigate("/adminpage/displayBanner")}
          >
            Banner
          </Button>
          <Dropdown
            overlay={
              <Menu
                items={menuItems.map((item) => ({
                  label: item.label,
                  key: item.label,
                  onClick: item.onClick,
                }))}
              />
            }
            trigger={["click"]}
          >
            <Button>Chương trình anh ngữ & tin học</Button>
          </Dropdown>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setCurrentData({});
              setOpenModal(true);
            }}
          >
            Thêm chương trình
          </Button>
        </Space>,
      ]}
    >
      {/* Modal thêm hoặc cập nhật chương trình */}
      <EditDisplay
        onSuccess={handleGetProgram}
        openModal={openModal}
        onOpenChange={(open) => {
          if (!open) {
            setOpenModal(false);
            setCurrentData({});
          }
        }}
        data={currentData}
        onSubmit={handleSaveProgram}
      />
      {/* Drawer hiển thị chi tiết */}
      <Drawer
        title="Thông tin chi tiết"
        width={500}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Tiêu đề">
            {currentData.title || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Loại">
            {currentData.type || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Vị trí ảnh">
            {currentData.location || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Ảnh">
            <img
              src={currentData.image}
              alt="Detail"
              style={{
                width: "100%",
                borderRadius: "8px",
                objectFit: "cover",
              }}
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/500")
              }
            />
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
      {/* Bảng hiển thị danh sách chương trình */}
      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataProgram}
        size="middle"
        pagination={{ pageSize: 5, showSizeChanger: true }}
        scroll={{ y: 413 }}
        loading={loading}
      />
    </PageContainer>
  );
}

export default DisplayProgram;
