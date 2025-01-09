import React, { useState } from "react";
import { Button, Input, Form, Card, Typography, List, message } from "antd";
import { PageContainer } from "@ant-design/pro-components";

const { Title } = Typography;

const SEO = () => {
  const [contentIdeas, setContentIdeas] = useState([]);
  const [loading, setLoading] = useState(false);

  const CHAT_SERVER_URL = "http://localhost:5000/chat";

  const handleGenerateContent = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(CHAT_SERVER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newsTitle: values.newsTitle,
          outline: values.outline,
          mainKeyword: values.mainKeyword,
          topic: values.topic,
          targetAudience: values.targetAudience,
        }),
      });

      const data = await response.json();
      if (data.response) {
        setContentIdeas([data.response]);
        message.success("Tạo nội dung thành công!");
      } else {
        message.error("Không nhận được phản hồi từ Chat Server.");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Đã xảy ra lỗi khi tạo nội dung.");
    }
    setLoading(false);
  };


  const handleCopyContent = () => {
    const allContent = contentIdeas.join("\n");
    navigator.clipboard.writeText(allContent)
      .then(() => {
        message.success("Đã sao chép tất cả nội dung!");
      })
      .catch(() => {
        message.error("Không thể sao chép nội dung.");
      });
  };

  return (
    <PageContainer title="Ý tưởng viết bài SEO">
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "space-between",
        }}
      >
        {/* Form nhập liệu */}
        <Card
          style={{
            flex: "1 1 calc(50% - 20px)",
            minWidth: "300px",
            maxWidth: "500px",
            padding: "20px",
          }}
        >
          <Title level={4}>Ý tưởng viết bài SEO</Title>
          <Form layout="vertical" onFinish={handleGenerateContent}>
            <Form.Item
              label="Tên tin tức"
              name="newsTitle"
              rules={[{ required: true, message: "Vui lòng nhập tên tin tức!" }]}
            >
              <Input placeholder="Nhập tên tin tức" />
            </Form.Item>

            <Form.Item
              label="Từ khóa chính"
              name="mainKeyword"
              rules={[{ required: true, message: "Vui lòng nhập từ khóa chính!" }]}
            >
              <Input placeholder="Nhập từ khóa chính" />
            </Form.Item>

            <Form.Item
              label="Dàn ý"
              name="outline"
              rules={[{ required: true, message: "Vui lòng nhập dàn ý!" }]}
            >
              <Input.TextArea
                placeholder="Nhập dàn ý"
                rows={4}
                style={{
                  fontSize: "16px", // Tăng kích thước chữ
                  padding: "10px", // Thêm padding
                  lineHeight: "1.5", // Giãn cách dòng
                  borderRadius: "8px", // Bo góc
                  border: "1px solid #d9d9d9", // Màu viền
                }}
              />
            </Form.Item>
            <Form.Item
              label="Chủ đề"
              name="topic"
              rules={[{ required: true, message: "Vui lòng nhập chủ đề!" }]}
            >
              <Input placeholder="Nhập chủ đề" />
            </Form.Item>

            <Form.Item label="Người đọc mục tiêu" name="targetAudience">
              <Input placeholder="Nhập đối tượng mục tiêu" />
            </Form.Item>

            <Form.Item style={{ marginTop: "20px" }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                style={{
                  fontWeight: "bold",
                  fontSize: "16px", // Tăng kích thước chữ
                  height: "50px", // Tăng chiều cao button
                  marginTop: "20px",
                }}
              >
                TẠO NỘI DUNG
              </Button>
            </Form.Item>
          </Form>
        </Card>

        {/* Danh sách ý tưởng */}
        <Card
          style={{
            flex: "1 1 calc(50% - 20px)",
            width: "55%",
            padding: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Title level={4}>Ý tưởng nội dung</Title>
            {contentIdeas.length > 0 && (
              <Button
                type="primary"
                onClick={handleCopyContent}
                style={{
                  fontSize: "14px", // Tăng kích thước chữ
                  padding: "5px 15px",
                  backgroundColor: "#52c41a", // Màu nền
                  borderColor: "#52c41a", // Màu viền
                  fontWeight: "bold",
                }}
              >
                Sao chép
              </Button>
            )}
          </div>
          <div
            style={{
              maxHeight: "400px",
              overflowY: "auto",
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "5px",
              marginTop: "20px",
            }}
          >
            <List
              dataSource={contentIdeas}
              renderItem={(item, index) => (
                <List.Item>
                  <div
                    dangerouslySetInnerHTML={{ __html: item }}
                    style={{ width: "100%" }}
                  />
                </List.Item>
              )}
            />
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};

export default SEO;
