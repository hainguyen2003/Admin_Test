import { PageContainer } from "@ant-design/pro-components";
import { Button, Input, Modal, Space, Table, Select, message } from "antd";
import React, { useState, useEffect } from "react";
import { EditOutlined } from "@ant-design/icons";

import { getPaidUsers, getClass, getInforService } from "../../Services/lead"; // Import API getClass

function TablePaidUsers() {
  const [paidUsers, setPaidUsers] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      receivedDate: "2024-01-01",
      class: "Chưa có",
    },
    {
      id: 2,
      name: "Trần Thị B",
      receivedDate: "2024-01-02",
      class: "Chưa có",
    },
    {
      id: 3,
      name: "Lê Văn C",
      receivedDate: "2024-01-03",
      class: "Chưa có",
    },
  ]); // Dữ liệu tĩnh
  const [classes, setClasses] = useState([]); // Danh sách lớp học từ API
  const [editingRecord, setEditingRecord] = useState(null); // Bản ghi đang được chỉnh sửa
  const [selectedClass, setSelectedClass] = useState(""); // Lớp học được chọn
  const { confirm } = Modal;
  // Gọi API để lấy danh sách lớp học
  useEffect(() => {
    getPaidUsers()
      .then((res) => {
        const data = res?.data;
        if (Array.isArray(data)) {
          // Map danh sách học viên đã thanh toán
          const users = data.map((user) => ({
            id: user.id,
            name: user.fullName,
            serviceManagerId: user.serviceManagerId,
            receivedDate: user.paymentDate,
            class: user.classAssigned || "Chưa có",
            courseName: "Đang tải...", // Giá trị mặc định ban đầu
          }));

          // Cập nhật danh sách ban đầu
          setPaidUsers(users);

          // Gọi API để lấy thông tin khóa học
          const updatedUsersPromises = users.map((user) => {
            return getInforService(user.serviceManagerId)
              .then((serviceInfo) => {
                return {
                  ...user,
                  courseName:
                    serviceInfo?.data?.data?.name || "Không có tên khóa học",
                };
              })
              .catch((error) => {
                console.error(
                  `Lỗi khi lấy thông tin dịch vụ cho ID: ${user.serviceManagerId}`,
                  error
                );
                return { ...user, courseName: "Lỗi khi tải" };
              });
          });

          // Chờ tất cả các API hoàn thành và cập nhật lại danh sách
          Promise.all(updatedUsersPromises).then((updatedUsers) => {
            setPaidUsers(updatedUsers);
          });
        } else {
          console.error("Dữ liệu không hợp lệ:", data);
          setPaidUsers([]);
        }
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API getPaidUsers:", error);
        message.error("Không thể tải danh sách học viên đã thanh toán");
      });
  }, []);

  const handleClassChange = (value) => {
    console.log("Lớp học đã chọn:", value); // Xử lý khi thay đổi lớp học
  };

  const handleEditClass = (record) => {
    setEditingRecord(record);
  };

  const handleSaveClass = () => {
    if (!selectedClass) {
      message.warning("Vui lòng chọn một lớp học.");
      return;
    }

    // Cập nhật lớp học cho bản ghi
    setPaidUsers((prev) =>
      prev.map((user) =>
        user.id === editingRecord.id ? { ...user, class: selectedClass } : user
      )
    );

    // Đặt lại trạng thái
    setEditingRecord(null);
    setSelectedClass("");
    message.success("Lớp học đã được cập nhật.");
  };

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tên khóa học đã mua",
      dataIndex: "courseName",
      key: "courseName",
    },
    {
      title: "Ngày nhận tài liệu",
      dataIndex: "receivedDate",
      key: "receivedDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Lớp học",
      dataIndex: "class",
      key: "class",
      render: (text, record) => (
        <span style={{ fontWeight: text === "Chưa có" ? "bold" : "normal" }}>
          {text}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEditClass(record)}
            disabled={record.class !== "Chưa có"} // Chỉ cho chỉnh sửa nếu lớp học là "Chưa có"
          >
            Chọn lớp học
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      title={`Quản lý học viên`}
      extra={[
        <Space key="extra-buttons">
          <Input.Search
            placeholder="Tìm kiếm theo tên"
            onSearch={(value) => {
              const filteredUsers = paidUsers.filter((user) =>
                user.name.toLowerCase().includes(value.toLowerCase())
              );
              setPaidUsers(filteredUsers);
            }}
            style={{ width: 300 }}
          />
        </Space>,
      ]}
    >
      <Table
        rowKey={(record) => record.id}
        size="middle"
        columns={columns}
        dataSource={paidUsers}
        scroll={{ y: 413 }}
      />
      {/* Modal chọn lớp học */}
      {editingRecord && (
        <Modal
          title={`Chọn lớp học cho ${editingRecord.name}`}
          visible={!!editingRecord}
          onCancel={() => setEditingRecord(null)}
          onOk={handleSaveClass}
        >
          <Select
            style={{ width: "100%" }}
            placeholder="Chọn lớp học"
            onChange={handleClassChange}
            options={classes}
          />
        </Modal>
      )}
    </PageContainer>
  );
}

export default TablePaidUsers;
