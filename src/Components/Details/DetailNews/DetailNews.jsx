import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getInforNews } from "../../../Services/lead";
import { Descriptions, Image, Skeleton, Card } from "antd";
import moment from "moment";

function DetailNews(props) {
  const location = useLocation();
  const [dataNews, setDataNews] = useState(null);
  const newsInfor = location.pathname.split("/");
  const idPath = newsInfor[newsInfor.length - 1];

  const handleGetInforNews = async (idPath) => {
    getInforNews(idPath).then((res) => {
      if (res.status === 200) {
        setDataNews(res?.data?.data);
      }
    });
  };

  useEffect(() => {
    handleGetInforNews(idPath);
  }, [idPath]);

  return (
    <Card
      title="Chi tiết tin tức"
      bordered={false}
      style={{
        maxWidth: 800,
        margin: "20px auto",
        borderRadius: 8,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      {!dataNews ? (
        <Skeleton active />
      ) : (
        <Descriptions
          bordered
          column={1}
          size="middle"
          layout="vertical"
          style={{ backgroundColor: "#fff", padding: "16px" }}
        >
          <Descriptions.Item label="Tên tin tức">
            {dataNews?.name || "Không có tên"}
          </Descriptions.Item>
          <Descriptions.Item label="Ảnh">
            <Image
              src={dataNews?.image || ""}
              alt="Ảnh tin tức"
              style={{
                width: "100%",
                maxWidth: 300,
                maxHeight: 300,
                borderRadius: "12px", // Bo góc ảnh
                objectFit: "cover",
              }}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Ngày tạo">
            {dataNews?.createdDate
              ? moment(dataNews?.createdDate).format("DD/MM/YYYY")
              : "Không có thông tin"}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày cập nhật">
            {dataNews?.updateDate
              ? moment(dataNews?.updateDate).format("DD/MM/YYYY")
              : "Không có thông tin"}
          </Descriptions.Item>
          <Descriptions.Item label="Nội dung tin tức">
            <div
              dangerouslySetInnerHTML={{
                __html: dataNews?.content || "Không có nội dung",
              }}
              style={{ lineHeight: "1.6", color: "#595959" }}
            />
          </Descriptions.Item>
        </Descriptions>
      )}
    </Card>
  );
}

export default DetailNews;
