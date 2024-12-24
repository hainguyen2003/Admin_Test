import { Descriptions, Image } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getInforDisplay } from "../../../Services/lead";

function DetailDisplay(props) {
  const location = useLocation();
  const [data, setData] = useState();
  const userInfor = location.pathname.split("/");
  const idPath = userInfor[userInfor.length - 1];

  // Hàm gọi lấy thông tin chi tiết của người dùng
  const handleGetInforDisplay = async (idPath) => {
    getInforDisplay(idPath).then((res) => {
      if (res.status === 200) {
        setData(res?.data?.data);
      }
    });
  };

  useEffect(() => {
    // Hàm lấy tất cả thông tin
    handleGetInforDisplay(idPath);
  }, [idPath]);

  return (
    <>
      <Descriptions layout="vertical">
        <Descriptions.Item label="Ảnh" span={4}>
          <Image src={data?.image} />
        </Descriptions.Item>
        <Descriptions.Item label="Tiêu đề" span={4}>
          {data?.title}
        </Descriptions.Item>
        <Descriptions.Item label="Mô tả" span={4}>
          {data?.description}
        </Descriptions.Item>
        <Descriptions.Item label="Vị trí" span={2}>
          {data?.location}
        </Descriptions.Item>
        <Descriptions.Item label="Loại" span={2}>
          {data?.type}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày tạo" span={2}>
          {data?.createdDate}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày cập nhật" span={2}>
          {data?.updateDate}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
}

export default DetailDisplay;
