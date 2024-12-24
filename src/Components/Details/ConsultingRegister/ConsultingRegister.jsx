import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getInforConsultingRegister,
  getInforService,
} from "../../../Services/lead";
import { Descriptions, Image } from "antd";

function DetailConsultingRegister(props) {
  const location = useLocation();
  const [detailCR, setDetailCR] = useState({});
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
    <div>
      <Descriptions>
        <Descriptions.Item label="Tên khách hàng" span={4}>
          {detailCR?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Số điện thoại" span={4}>
          {detailCR?.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Email" span={4}>
          {detailCR?.email}
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái đăng ký tư vấn" span={4}>
          {detailCR?.status}
        </Descriptions.Item>
        <Descriptions.Item label="Nội dung đăng ký tư vấn " span={4}>
          {detailCR?.contentAdvice}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày tạo" span={4}>
          {detailCR?.createdDate}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày cập nhật" span={4}>
          {detailCR?.updateDate}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}

export default DetailConsultingRegister;
