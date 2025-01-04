import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getInforOder, getInforService } from "../../../Services/lead";
import { Button, Descriptions, Image } from "antd";
function DetailDoc(props) {
  const location = useLocation();
  const [orderDetail, setDataOrder] = useState();
  const [courseDetail, setDataCourse] = useState();
  const docInfor = location.pathname.split("/");
  const idPath = docInfor[docInfor.length - 1];

  const handleGetInforOrder = async (idPath) => {
    getInforOder(idPath).then((res) => {
      if (res?.status === 200) {
        setDataOrder(res?.data?.data);
      }
    });
  };

  const handleGetInforCourse = async (serviceManagerId) => {
    if (!serviceManagerId) {
      console.error("Service Manager ID is missing");
      return;
    }

    try {
      const res = await getInforService(serviceManagerId);
      if (res?.status === 200) {
        console.log("Course Info Response:", res); // Log phản hồi từ API
        setDataCourse(res?.data?.data); // Cập nhật thông tin khóa học vào state
      } else {
        console.error("Failed to fetch course information:", res);
      }
    } catch (error) {
      console.error("Error while fetching course information:", error); // Log lỗi
    }
  };

  useEffect(() => {
    handleGetInforOrder(idPath);
  }, [idPath]);

  useEffect(() => {
    if (orderDetail?.serviceManagerId) {
      handleGetInforCourse(orderDetail.serviceManagerId);
    }
  }, [orderDetail]);

  return (
    <>
      <Descriptions layout="vertical">
        <Descriptions.Item label="Mã đơn hàng" span={4}>
          {orderDetail?.orderId || "Không có thông tin"}
        </Descriptions.Item>
        <Descriptions.Item label="Tên khách hàng" span={2}>
          {orderDetail?.fullName || "Không có thông tin"}
        </Descriptions.Item>
        <Descriptions.Item label="Tên khóa học" span={2}>
          {courseDetail?.name || "Không có thông tin"}
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái đơn hàng" span={2}>
          <span
            style={{
              color:
                orderDetail?.status === "PAID"
                  ? "green"
                  : orderDetail?.status === "FAILED"
                  ? "red"
                  : "gold",
              fontWeight: "bold",
            }}
          >
            {orderDetail?.status || "Không có thông tin"}
          </span>
        </Descriptions.Item>
        <Descriptions.Item label="Ngày thanh toán" span={2}>
          {orderDetail?.paymentDate
            ? new Date(orderDetail.paymentDate).toLocaleString()
            : "Không có thông tin"}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày cập nhật" span={4}>
          {orderDetail?.updatedAt
            ? new Date(orderDetail.updatedAt).toLocaleString()
            : "Chưa cập nhật"}
        </Descriptions.Item>
        <Descriptions.Item label="Tổng tiền" span={2}>
          {orderDetail?.amount
            ? `${parseInt(orderDetail.amount).toLocaleString()} VND`
            : "Không có thông tin"}
        </Descriptions.Item>
        <Descriptions.Item label="Phương thức thanh toán" span={2}>
          {orderDetail?.paymentMethod || "Không có thông tin"}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
}

export default DetailDoc;
