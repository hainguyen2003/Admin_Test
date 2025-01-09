import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getInforAdmission } from "../../../Services/lead";
import { Descriptions, Tag, Skeleton, Card } from "antd";
import moment from "moment";

function DetailAdmission() {
  const location = useLocation();
  const [dataAdmission, setDataAdmission] = useState(null); // Sử dụng null để kiểm tra loading
  const admissionInfor = location.pathname.split("/");
  const idPath = admissionInfor[admissionInfor.length - 1];

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
    <Card
      title="Chi tiết chương trình"
      bordered={false}
      style={{
        maxWidth: 800,
        margin: "20px auto",
        borderRadius: 8,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      {!dataAdmission ? (
        <Skeleton active />
      ) : (
        <Descriptions
          bordered
          column={1}
          size="middle"
          layout="vertical"
          style={{ backgroundColor: "#fff", padding: "16px" }}
        >
          <Descriptions.Item label="Tiêu đề chương trình">
            {dataAdmission?.title || "Không có thông tin"}
          </Descriptions.Item>
          <Descriptions.Item label="Chương trình đào tạo">
            {dataAdmission?.admissionForm || "Không có thông tin"}
          </Descriptions.Item>
          <Descriptions.Item label="Mô tả chương trình">
            {dataAdmission?.program || "Không có mô tả"}
          </Descriptions.Item>
          <Descriptions.Item label="Ảnh">
            <div style={{ textAlign: "center" }}>
              <img
                src={dataAdmission?.image || "https://via.placeholder.com/300"}
                alt="Ảnh chương trình"
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  border: "1px solid #d9d9d9",
                }}
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/300")
                }
              />
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="Link đăng ký">
            <a
              href={dataAdmission?.linkRegister}
              target="_blank"
              rel="noopener noreferrer"
            >
              {dataAdmission?.linkRegister || "Không có link"}
            </a>
          </Descriptions.Item>
          <Descriptions.Item label="Ngày tạo">
            {dataAdmission?.createdDate
              ? moment(dataAdmission?.createdDate).format("DD/MM/YYYY")
              : "Không có thông tin"}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày cập nhật">
            {dataAdmission?.updateDate
              ? moment(dataAdmission?.updateDate).format("DD/MM/YYYY")
              : "Không có thông tin"}
          </Descriptions.Item>
          <Descriptions.Item label="Nội dung chương trình">
            <div
              dangerouslySetInnerHTML={{
                __html: dataAdmission?.admissionForm || "Không có nội dung",
              }}
              style={{ lineHeight: "1.6", color: "#595959" }}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái">
            {dataAdmission?.status ? (
              <Tag color="green">Hoạt động</Tag>
            ) : (
              <Tag color="red">Không hoạt động</Tag>
            )}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Card>
  );
}

export default DetailAdmission;
