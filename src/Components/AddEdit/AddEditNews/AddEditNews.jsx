/* eslint-disable no-lone-blocks */
import {
  ModalForm,
  ProForm,
  ProFormText,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import { message, notification } from "antd";
import React, { useRef, useState } from "react";
import { createNews, updateNews, uploadFile } from "../../../Services/lead";
import Editor from "../../CKEditor/Editor";
import _ from "lodash";
import "../style.css";

function AddEditNews({ onSuccess, openModal, data, onOpenChange }) {
  const [listFile, setListFile] = useState([]);
  const [fieldFile, setFieldFile] = useState("");
  const formRef = useRef(null);

  // Hàm tạo tin tức
  const handleCreateNews = (values) => {
    createNews(values).then((res) => {
      if (res?.data?.success === true) {
        message.success("Tạo tin tức thành công");
        onSuccess();
      } else if (res?.data?.error?.statusCode === 2) {
        {
          res?.data?.error?.errorDetailList.map((e) =>
            message.open({
              type: "error",
              content: e.message,
              duration: 8,
            })
          );
        }
      }
    });
  };

  // Hàm cập nhật khách hàng
  const handleUpdateNews = (values) => {
    updateNews(data?.id, values).then((res) => {
      if (res?.data?.success === true) {
        message.success("Cập nhật tin tức thành công");
        onSuccess();
      } else if (res?.data?.error?.statusCode === 2) {
        {
          res?.data?.error?.errorDetailList.map((e) =>
            message.open({
              type: "error",
              content: e.message,
              duration: 20,
            })
          );
        }
      }
    });
  };

  const handleUpload = async (file) => {
    const res = await uploadFile(file.file);

    if (res?.data?.success) {
      setListFile([{ url: res?.data?.data?.downloadUrl }]);
      setFieldFile(res?.data?.data?.downloadUrl);
      notification.success({ message: "Tải file lên thành công" });
    } else {
      notification.error({ message: "Tải file lên không thành công!" });
    }
  };

  return (
    <>
      <ModalForm
        title={data?.id ? "Chỉnh sửa thông tin của Tin Tức" : "Thêm Tin Tức"}
        initialValues={data}
        modalProps={{
          destroyOnClose: true,
        }}
        open={openModal}
        onFinish={async (values) => {
          if (data?.id) {
            handleUpdateNews(values);
          } else {
            handleCreateNews(values);
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
                message: "Vui lòng upload ảnh ",
              },
            ]}
            title="Click to upload"
            fileList={listFile}
            transform={(value) => {
              return {
                image: fieldFile || "", // cập nhật không upload file mới thì lấy giá trị value trong form
              };
            }}
            fieldProps={{
              listType: "picture-card",
              method: "POST",
              name: "file",
              customRequest: handleUpload,
              multiple: true,
              onRemove: () => setListFile([]),
              openFileDialogOnClick: true,
              onChange: (file) => {
                console.log("file:: ", file);
              },
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
            placeholder="Nội dung của tin tức"
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
        </ProForm.Group>
      </ModalForm>
    </>
  );
}

export default AddEditNews;


