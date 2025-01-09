import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getInforConsultingRegister } from "../../../Services/lead";
import { Descriptions, Card, Skeleton } from "antd";
import moment from "moment";

function DetailConsultingRegister(props) {
  const location = useLocation();
  const [detailCR, setDetailCR] = useState(null); // null để kiểm tra loading
  const consultingRegisterInfor = location.pathname.split("/");
  const idPath = consultingRegisterInfor[consultingRegisterInfor.length - 1];

  const handleGetInforConsultingRegister = async (idPath) => {
    getInforConsultingRegister(idPath).then((res) => {
      if (res.status === 200) {
        setDetailCR(res?.data?.data);
      }
    });
  };

  useEffect(() => {
    handleGetInforConsultingRegister(idPath);
  }, [idPath]);

  return (
    <Card
      title="Chi tiết đăng ký tư vấn"
      bordered={false}
      style={{
        maxWidth: 800,
        margin: "20px auto",
        borderRadius: 8,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      {!detailCR ? (
        <Skeleton active /> // Hiển thị skeleton khi dữ liệu chưa tải
      ) : (
        <Descriptions
          bordered
          column={1}
          size="middle"
          layout="vertical"
          style={{ backgroundColor: "#fff", padding: "16px" }}
        >
          <Descriptions.Item label="Tên khách hàng">
            {detailCR?.name || "Không có thông tin"}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {detailCR?.phone || "Không có thông tin"}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {detailCR?.email || "Không có thông tin"}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái đăng ký tư vấn">
            {detailCR?.status || "Không có thông tin"}
          </Descriptions.Item>
          <Descriptions.Item label="Nội dung đăng ký tư vấn">
            {detailCR?.contentAdvice || "Không có thông tin"}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày tạo">
            {detailCR?.createdDate
              ? moment(detailCR?.createdDate).format("DD/MM/YYYY")
              : "Không có thông tin"}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày cập nhật">
            {detailCR?.updateDate
              ? moment(detailCR?.updateDate).format("DD/MM/YYYY")
              : "Không có thông tin"}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Card>
  );
}

export default DetailConsultingRegister;
