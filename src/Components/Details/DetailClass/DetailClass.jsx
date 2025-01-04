import React, { useEffect, useState } from "react";
import { Modal, Table, Descriptions, message } from "antd";
import axios from "axios";
import { getInforUser } from "../../../Services/lead";

function DetailClass({ classData, onClose }) {
  const [studentData, setStudentData] = useState([]); // Dữ liệu sinh viên
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu

  const columns = [
    {
      title: "Mã sinh viên",
      dataIndex: "idUser",
      key: "idUser",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
  ];

  const fetchStudentData = async () => {
    try {
      const response = await axios.get(`/class-user/${classData.classId}`);
      console.log("API Response:", response.data); // Debug API response

      const student = response.data;
      if (student && student.idUser) {
        // Lấy thông tin chi tiết sinh viên từ API getInforUser
        const userInfoResponse = await getInforUser(student.idUser);
        const userInfo = userInfoResponse.data?.data;

        setStudentData([
          {
            idUser: student.idUser,
            name: userInfo?.name || "Không rõ",
            phone: userInfo?.phone || "Không rõ",
          },
        ]); // Đưa dữ liệu vào bảng
      } else {
        message.warning("Danh sách sinh viên trống.");
        setStudentData([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi tải danh sách sinh viên:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, [classData.classId]);

  return (
    <Modal
      title={`Chi tiết lớp học: ${classData.className}`}
      visible={true}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Mã lớp học">
          {classData.classId}
        </Descriptions.Item>
        <Descriptions.Item label="Tên lớp học">
          {classData.className}
        </Descriptions.Item>
      </Descriptions>
      <br />
      <p>
        <strong>
          <i>Danh sách sinh viên</i>
        </strong>
      </p>
      <Table
        dataSource={studentData}
        columns={columns}
        pagination={false}
        loading={loading}
        style={{ marginTop: "20px" }}
      />
    </Modal>
  );
}

export default DetailClass;
