import React, { useEffect, useState } from "react";
import { Descriptions, Image } from "antd";
import { getProfileUser } from "../../Services/lead";

function RecordUser(props) {
  const [data, setData] = useState({});

  const handleGetProfileUser = () => {
    getProfileUser().then((res) => {
      setData(res?.data?.data);
    });
  };
  useEffect(() => {
    handleGetProfileUser();
  }, []);
  return (
    <>
      <Descriptions layout="vertical">
        <Descriptions.Item label="Avatar" span={4}>
          <Image
            src={data?.avatar}
            alt={data?.avatar}
            style={{ width: 250, height: 250 }}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Tên người dùng" span={2}>
          {data?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Username" span={2}>
          {data?.username}
        </Descriptions.Item>

        <Descriptions.Item label="Ngày sinh" span={2}>
          {data?.dateOfBirth}
        </Descriptions.Item>
        <Descriptions.Item label="Số điện thoại" span={2}>
          {data?.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Email" span={4}>
          {data?.email}
        </Descriptions.Item>
        <Descriptions.Item label="Địa chỉ" span={2}>
          {data?.address}
        </Descriptions.Item>
        <Descriptions.Item label="Vai trò" span={2}>
          {data?.role?.name}
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

export default RecordUser;
