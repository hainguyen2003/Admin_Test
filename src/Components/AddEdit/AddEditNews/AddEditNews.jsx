import {
  ModalForm,
  ProForm,
  ProFormText,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import { message, notification, Button, Space } from "antd";
import React, { useRef, useState } from "react";
import { createNews, updateNews, uploadFile } from "../../../Services/lead";
import Editor from "../../CKEditor/Editor";
import "../style.css";
import AddEditSeoContent from "./AddEditSeoContent";

function AddEditNews({ onSuccess, openModal, data, onOpenChange }) {
  const [listFile, setListFile] = useState([]);
  const [fieldFile, setFieldFile] = useState("");
  const [isSeoVisible, setSeoVisible] = useState(false);
  const [seoContent, setSeoContent] = useState(null);
  const [loading, setLoading] = useState(false); // Thêm state loading để quản lý nút "Chỉnh sửa nội dung chuẩn SEO"
  const formRef = useRef(null);

  const CHAT_SERVER_URL = "http://localhost:5000/optimize-seo";

  const handleCreateNews = async (values) => {
    try {
      const res = await createNews(values);
      if (res?.data?.success) {
        message.success("Tạo tin tức thành công");
        onSuccess();
      } else {
        res?.data?.error?.errorDetailList?.forEach((e) =>
          message.error(e.message, 8)
        );
      }
    } catch (error) {
      console.error("Error creating news:", error);
      message.error("Lỗi khi tạo tin tức");
    }
  };

  const handleUpdateNews = async (values) => {
    try {
      const res = await updateNews(data?.id, values);
      if (res?.data?.success) {
        message.success("Cập nhật tin tức thành công");
        onSuccess();
      } else {
        res?.data?.error?.errorDetailList?.forEach((e) =>
          message.error(e.message, 20)
        );
      }
    } catch (error) {
      console.error("Error updating news:", error);
      message.error("Lỗi khi cập nhật tin tức");
    }
  };

  const handleUpload = async (file) => {
    try {
      const res = await uploadFile(file.file);
      if (res?.data?.success) {
        setListFile([{ url: res?.data?.data?.downloadUrl }]);
        setFieldFile(res?.data?.data?.downloadUrl);
        notification.success({ message: "Tải file lên thành công" });
      } else {
        notification.error({ message: "Tải file lên không thành công!" });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      notification.error({ message: "Lỗi khi tải file lên" });
    }
  };

  const handleSeoClick = async () => {
    const content = formRef?.current?.getFieldValue("content");
    if (!content) {
      notification.warning({
        message: "Chuẩn SEO",
        description: "Vui lòng nhập nội dung trước khi chuẩn SEO.",
      });
      return;
    }

    setLoading(true); // Bật trạng thái loading
    try {
      const response = await fetch(CHAT_SERVER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      const data = await response.json();
      if (data.response) {
        setSeoContent(data.response);
        setSeoVisible(true);
      } else {
        throw new Error("Không nhận được phản hồi từ API");
      }
    } catch (error) {
      console.error("Lỗi khi tối ưu hóa SEO:", error.message);
      notification.error({
        message: "Chuẩn SEO thất bại",
        description: "Không thể tối ưu hóa nội dung, vui lòng thử lại.",
      });
    } finally {
      setLoading(false); // Tắt trạng thái loading
    }
  };

  const handleUseContent = (optimizedContent) => {
    formRef.current.setFieldsValue({ content: optimizedContent });
    setSeoVisible(false);
  };

  return (
    <>
      {isSeoVisible && (
        <AddEditSeoContent
          visible={isSeoVisible}
          content={seoContent}
          onBack={() => setSeoVisible(false)}
          onUseContent={handleUseContent}
        />
      )}
      <ModalForm
        title={data?.id ? "Chỉnh sửa thông tin của Tin Tức" : "Thêm Tin Tức"}
        initialValues={data}
        modalProps={{
          destroyOnClose: true,
        }}
        open={openModal}
        onFinish={async (values) => {
          if (data?.id) {
            await handleUpdateNews(values);
          } else {
            await handleCreateNews(values);
          }
        }}
        onOpenChange={onOpenChange}
        formRef={formRef}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="name"
            label="Tên tin tức"
            placeholder="Tên tin tức"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên tin tức",
              },
            ]}
          />

          <ProFormUploadButton
            name="image"
            label="Upload Ảnh"
            rules={[
              {
                required: true,
                message: "Vui lòng upload ảnh",
              },
            ]}
            title="Click to upload"
            fileList={listFile}
            transform={() => ({
              image: fieldFile || "",
            })}
            fieldProps={{
              listType: "picture-card",
              method: "POST",
              name: "file",
              customRequest: handleUpload,
              multiple: false,
              onRemove: () => setListFile([]),
            }}
            action="process.env.BASE_URL/file/upload"
          />

          <ProFormText
            width="md"
            name="description"
            label="Mô tả"
            placeholder="Mô tả"
          />

          <ProForm.Item
            width="md"
            name="content"
            label="Nội dung của tin tức"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập nội dung của tin tức",
              },
            ]}
          >
            <Editor
              initialValues={data?.content}
              onChange={(event, editor) => {
                formRef?.current?.setFieldsValue({
                  content: editor.getData(),
                });
              }}
            />
          </ProForm.Item>

          <Space
  style={{
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
  }}
>
  <Button
    type="primary"
    onClick={handleSeoClick}
    loading={loading}
    style={{
      fontSize: "16px", // Tăng kích thước chữ
      fontWeight: "bold", // Làm chữ đậm
      background: "linear-gradient(to right, #1e90ff, #00bfff)", // Hiệu ứng màu gradient
      border: "none", // Loại bỏ viền
      color: "#fff", // Chữ màu trắng
      borderRadius: "8px", // Bo góc
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Hiệu ứng đổ bóng
      transition: "all 0.3s ease", // Hiệu ứng chuyển động
    }}
    onMouseEnter={(e) =>
      (e.target.style.background = "linear-gradient(to right, #00bfff, #1e90ff)") // Đổi màu khi hover
    }
    onMouseLeave={(e) =>
      (e.target.style.background = "linear-gradient(to right, #1e90ff, #00bfff)") // Trả lại màu ban đầu
    }
  >
    Chỉnh sửa nội dung chuẩn SEO
  </Button>
</Space>

        </ProForm.Group>
      </ModalForm>
    </>
  );
}

export default AddEditNews;
