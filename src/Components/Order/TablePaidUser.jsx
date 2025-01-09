import React, { useState, useEffect } from "react";
import { PageContainer } from "@ant-design/pro-components";
import { Button, Modal, Select, Table, message } from "antd";
import {
  getPaidUsers,
  getClass,
  getInforService,
  getInforClassByCourseId,
} from "../../Services/lead";
import { createClassUser, updateUserClass } from "../../Services/lead"; // Import API

function TablePaidUsers() {
  const [paidUsers, setPaidUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedUser, setSelectedUser] = useState(null); // Lưu người dùng đang chỉnh sửa

  useEffect(() => {
    getPaidUsers()
      .then((res) => {
        const data = res?.data;
        if (Array.isArray(data)) {
          const users = data.map((user) => ({
            id: user.id,
            userId: user.userId,
            name: user.fullName,
            serviceManagerId: user.serviceManagerId,
            receivedDate: user.paymentDate,
            classId: "Đang tải...",
            courseName: "Đang tải...",
          }));

          setPaidUsers(users);
          const updatedUsersPromises = users.map((user) => {
            const fetchCourseName = getInforService(user.serviceManagerId)
              .then((serviceInfo) => ({
                ...user,
                courseName:
                  serviceInfo?.data?.data?.name || "Không có tên khóa học",
              }))
              .catch(() => ({ ...user, courseName: "Lỗi khi tải khóa học" }));

            const fetchClassId = getInforClassByCourseId(user.serviceManagerId)
              .then((classInfor) => ({
                ...user,
                classId:
                  classInfor.data?.data?.classId || "Không có mã lớp học",
              }))
              .catch(() => ({ ...user, classId: "Lỗi khi tải mã lớp học" }));

            return Promise.all([fetchCourseName, fetchClassId]).then(
              ([userWithCourse, userWithClass]) => ({
                ...userWithCourse,
                classId: userWithClass.classId,
              })
            );
          });

          Promise.all(updatedUsersPromises).then((updatedUsers) => {
            setPaidUsers(updatedUsers);
          });
        } else {
          setPaidUsers([]);
        }
      })
      .catch((error) => {
        message.error("Không thể tải danh sách học viên đã thanh toán");
        console.error(error);
      });
  }, []);

  const fetchClasses = () => {
    getClass()
      .then((res) => {
        const items = res?.data?.data?.items || [];
        const formattedClasses = items.map((item) => ({
          id: item.classId,
          name: item.className,
        }));
        setClasses(formattedClasses);
      })
      .catch((error) => {
        message.error("Không thể tải danh sách lớp học");
        console.error(error);
      });
  };

  const showModal = (record) => {
    fetchClasses();
    setSelectedUser(record); // Lưu thông tin người dùng
    setSelectedClass(
      record.classId !== "Không có mã lớp học" ? record.classId : ""
    );
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedClass("");
    setSelectedUser(null);
  };

  return (
    <PageContainer>
      <Table
        dataSource={paidUsers}
        columns={[
          {
            title: "Tên học viên",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Ngày nhận",
            dataIndex: "receivedDate",
            key: "receivedDate",
          },
          {
            title: "Lớp học",
            dataIndex: "classId",
            key: "classId",
          },
          {
            title: "Khóa học",
            dataIndex: "courseName",
            key: "courseName",
          },
        ]}
      />
    </PageContainer>
  );
}

export default TablePaidUsers;
