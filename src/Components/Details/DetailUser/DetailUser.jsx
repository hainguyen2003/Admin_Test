/* eslint-disable jsx-a11y/alt-text */
import { Descriptions, Image } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getInforUser } from "../../../Services/lead";

function DetailUser(props) {
  const location = useLocation();
  const [dataUser, setDataUser] = useState();
  const userInfor = location.pathname.split("/");
  const idPath = userInfor[userInfor.length - 1];

  // Hàm gọi lấy thông tin chi tiết của người dùng
  const handleGetInforUser = async (idPath) => {
    getInforUser(idPath).then((res) => {
      if (res.status === 200) {
        setDataUser(res?.data?.data);
      }
    });
  };
  // console.log("dataUser", dataUser);

  useEffect(() => {
    // Hàm lấy tất cả thông tin
    handleGetInforUser(idPath);
  }, [idPath]);

  return (
    <>
      <Descriptions layout="vertical">
        <Descriptions.Item label="Avatar" span={4}>
          <Image
            src={dataUser?.avatar}
            alt={dataUser?.avatar}
            style={{ width: 250, height: 250 }}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Tên người dùng" span={2}>
          {dataUser?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Username" span={2}>
          {dataUser?.username}
        </Descriptions.Item>

        <Descriptions.Item label="Ngày sinh" span={2}>
          {dataUser?.dateOfBirth}
        </Descriptions.Item>
        <Descriptions.Item label="Số điện thoại" span={2}>
          {dataUser?.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Email" span={2}>
          {dataUser?.email}
        </Descriptions.Item>
        <Descriptions.Item label="Địa chỉ" span={2}>
          {dataUser?.address}
        </Descriptions.Item>
        <Descriptions.Item label="Vai trò" span={2}>
          {dataUser?.role?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Dịch vụ tham gia" span={2}>
          {dataUser?.services.map((services, id) => {
            return <li className="block">{services.name}</li>;
          })}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày tạo" span={2}>
          {dataUser?.createdDate}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày cập nhật" span={2}>
          {dataUser?.updateDate}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
}

export default DetailUser;
