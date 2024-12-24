import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getInforAdmission } from "../../../Services/lead"; // Import hàm lấy chi tiết Admission
import { Descriptions, Image, Tag } from "antd";
import moment from "moment";

function DetailAdmission(props) {
  const location = useLocation();
  const [dataAdmission, setDataAdmission] = useState({});
  const amissionInfor = location.pathname.split("/");
  const idPath = amissionInfor[amissionInfor.length - 1];

  const handleGetInforAdmission = async (idPath) => {
    getInforAdmission(idPath).then((res) => {
      if (res.status === 200) {
        setDataAdmission(res?.data?.data);
      }
    });
  };

  useEffect(() => {
    handleGetInforAdmission(idPath);
  }, [idPath]);

  return (
    <div>
      <Descriptions>
        <Descriptions.Item label="Tiêu đề chương trình" span={4}>
          {dataAdmission?.title}{" "}
        </Descriptions.Item>
        <Descriptions.Item label="Chương trình đào tạo" span={4}>
          {dataAdmission?.admissionForm}{" "}
        </Descriptions.Item>
        <Descriptions.Item label="Mô tả chương trình" span={4}>
          {dataAdmission?.program}{" "}
        </Descriptions.Item>
        <Descriptions.Item label="Ảnh" span={4}>
          <Image
            src={dataAdmission?.image}
            alt={dataAdmission?.image}
            style={{ width: 250, height: 250 }}
          />
          <Descriptions.Item label="Link đăng ký" span={4}>
            {dataAdmission?.linkRegister}{" "}
          </Descriptions.Item>
        </Descriptions.Item>
        <Descriptions.Item label="Ngày tạo ">
          {dataAdmission?.createdDate}{" "}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày cập nhật" span={2}>
          {dataAdmission?.updateDate}{" "}
        </Descriptions.Item>
        <Descriptions.Item label="Nội dung chương trình">
          <div
            dangerouslySetInnerHTML={{ __html: dataAdmission?.admissionForm }}
          ></div>
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái" span={3}>
          {dataAdmission?.status ? (
            <Tag color="green">Hoạt động</Tag>
          ) : (
            <Tag color="red">Không hoạt động</Tag>
          )}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}

export default DetailAdmission;
