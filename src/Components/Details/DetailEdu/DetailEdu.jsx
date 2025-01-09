import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getInforService } from "../../../Services/lead";
import { Descriptions, Image, Card, Skeleton } from "antd";
import moment from "moment";

function DetailEdu(props) {
  const location = useLocation();
  const [detailEP, setDetailEP] = useState(null); // null để hiển thị loading
  const eduInfor = location.pathname.split("/");
  const idPath = eduInfor[eduInfor.length - 1];

  const handleGetInforService = async (idPath) => {
    getInforService(idPath).then((res) => {
      if (res.status === 200) {
        setDetailEP(res?.data?.data);
      }
    });
  };

  useEffect(() => {
    handleGetInforService(idPath);
  }, [idPath]);

  return (
    <Card
      title="Chi tiết chương trình đào tạo"
      bordered={false}
      style={{
        maxWidth: 800,
        margin: "20px auto",
        borderRadius: 8,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      {!detailEP ? (
        <Skeleton active /> // Hiển thị skeleton khi đang tải dữ liệu
      ) : (
        <Descriptions
          bordered
          column={1}
          size="middle"
          layout="vertical"
          style={{ backgroundColor: "#fff", padding: "16px" }}
        >
          <Descriptions.Item label="Tên Chương trình">
            {detailEP?.name || "Không có thông tin"}
          </Descriptions.Item>
          <Descriptions.Item label="Ảnh">
            <Image
              src={detailEP?.image || ""}
              alt="Ảnh chương trình"
              style={{
                width: "100%",
                maxWidth: 300,
                maxHeight: 300,
                borderRadius: "12px", // Bo góc hình ảnh
                objectFit: "cover",
              }}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Mô tả">
            {detailEP?.description || "Không có thông tin"}
          </Descriptions.Item>
          <Descriptions.Item label="Mô tả chi tiết">
            {detailEP?.detailDescription || "Không có thông tin"}
          </Descriptions.Item>
          <Descriptions.Item label="Mục tiêu">
            {detailEP?.studyGoals || "Không có thông tin"}
          </Descriptions.Item>
          <Descriptions.Item label="Số buổi học">
            {detailEP?.numberTeachingSessions || "Không có thông tin"}
          </Descriptions.Item>
          <Descriptions.Item label="Lịch học">
            {detailEP?.schedule || "Không có thông tin"}
          </Descriptions.Item>
          <Descriptions.Item label="Lộ trình đào tạo">
            {detailEP?.curriculum || "Không có thông tin"}
          </Descriptions.Item>
          <Descriptions.Item label="Hình thức học">
            {detailEP?.learnOnlineOrOffline || "Không có thông tin"}
          </Descriptions.Item>
          <Descriptions.Item label="Chi phí">
            {detailEP?.coursePrice || "Không có thông tin"}
          </Descriptions.Item>
          <Descriptions.Item label="Yêu cầu đầu vào">
            {detailEP?.requestStudents || "Không có thông tin"}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày tạo">
            {detailEP?.createdDate
              ? moment(detailEP?.createdDate).format("DD/MM/YYYY")
              : "Không có thông tin"}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày cập nhật">
            {detailEP?.updateDate
              ? moment(detailEP?.updateDate).format("DD/MM/YYYY")
              : "Không có thông tin"}
          </Descriptions.Item>
          <Descriptions.Item label="Nội dung">
            <div
              dangerouslySetInnerHTML={{
                __html: detailEP?.content || "Không có thông tin",
              }}
              style={{ lineHeight: "1.6", color: "#595959" }}
            />
          </Descriptions.Item>
        </Descriptions>
      )}
    </Card>
  );
}

export default DetailEdu;
