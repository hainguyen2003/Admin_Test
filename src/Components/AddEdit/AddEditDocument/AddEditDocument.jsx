/* eslint-disable no-lone-blocks */
import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import React, { useRef, useState } from "react";
import {
  createDocument,
  updateDocument,
  uploadFile,
} from "../../../Services/lead";
import { message, notification } from "antd";
import _ from "lodash";
import "../style.css";

function AddEditDocument({ onSuccess, openModal, data, onOpenChange }) {
  const [listFile, setListFile] = useState([]);
  const [listImage, setListImage] = useState([]);
  const [fieldFile, setFieldFile] = useState("");
  const [fieldImage, setFieldImage] = useState("");
  const formRef = useRef(null);

  const handleCreatDocument = (values) => {
    createDocument(values).then((res) => {
      if (res?.data?.success === true) {
        message.success("Tạo Tài liệu thành công");
        onSuccess();
      } else if (res?.data?.error?.statusCode === 2) {
        {
          res?.data?.error?.errorDetailList.map((e) => {
            message.error(e.message);
          });
        }
      }
    });
  };

  const handleUpdateDocument = (values) => {
    updateDocument(data.id, values).then((res) => {
      if (res?.data?.success === true) {
        message.success("Cập nhật thành công");
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

  const handleUploadFile = async (file) => {
    const res = await uploadFile(file.file);
    if (res?.data?.success) {
      setListFile([{ url: res?.data?.data?.downloadUrl }]);
      setFieldFile(res?.data?.data?.downloadUrl);
      notification.success({ message: "Tải file lên thành công" });
    } else {
      notification.error({ message: "Tải file lên không thành công!" });
    }
  };
  const handleUploadImage = async (file) => {
    const res = await uploadFile(file.file);
    if (res?.data?.success) {
      setListImage([{ url: res?.data?.data?.downloadUrl }]);
      setFieldImage(res?.data?.data?.downloadUrl);
      notification.success({ message: "Tải file lên thành công" });
    } else {
      notification.error({ message: "Tải file lên không thành công!" });
    }
  };

  return (
    <>
      <ModalForm
        title={data?.id ? "Chỉnh sửa thông tin tài liệu" : "Thêm tài liệu mới"}
        initialValues={data}
        modalProps={{
          destroyOnClose: true,
        }}
        open={openModal}
        onFinish={async (values) => {
          if (data?.id) {
            handleUpdateDocument(values);
          } else {
            handleCreatDocument(values);
          }
        }}
        onOpenChange={onOpenChange}
        formRef={formRef}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="name"
            label="Tên tài liệu"
            placeholder="Tên tài liệu"
            rules={[
              {
                required: true,
                message: "Tên tài liệu không để trống",
              },
            ]}
          />
          <ProFormText
            width="md"
            name="content"
            label="Nội dung"
            placeholder="Nội dung"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập nội dung",
              },
            ]}
          />
          <ProFormSelect
            width="md"
            name="status"
            valueEnum={{
              0: "FREE",
              1: "NO_FREE",
             
            }}
            label="Trạng thái"
            placeholder="Trạng thái"
            rules={[
              {
                required: true,
                message: "Trạng thái không để trống",
              },
            ]}
          />
          <ProFormUploadButton
            width="md"
            name="file"
            label="Upload file"
            rules={[
              {
                required: true,
                message: "Vui lòng upload file",
              },
            ]}
            title="Click to upload file"
            fileList={listFile}
            transform={(value) => {
              return {
                file: fieldFile || "", // cập nhật không upload file mới thì lấy giá trị value trong form
              };
            }}
            fieldProps={{
              method: "POST",
              name: "file",
              customRequest: handleUploadFile,
              multiple: true,
              onRemove: () => setListFile([]),
              openFileDialogOnClick: true,
              onChange: (file) => {
                console.log("file:: ", file);
              },
            }}
            action="process.env.BASE_URL/file/upload"
          />
          <ProFormUploadButton
            width="md"
            name="image"
            label="Upload ảnh"
            rules={[
              {
                required: true,
                message: "Vui lòng upload ảnh",
              },
            ]}
            title="Click to upload ảnh"
            fileList={listImage}
            transform={(value) => {
              return {
                image: fieldImage || "", // cập nhật không upload file mới thì lấy giá trị value trong form
              };
            }}
            fieldProps={{
              listType: "picture-card",
              method: "POST",
              name: "file",
              customRequest: handleUploadImage,
              multiple: true,
              onRemove: () => setListImage([]),
              openFileDialogOnClick: true,
              onChange: (file) => {
                console.log("file:: ", file);
              },
            }}
            action="process.env.BASE_URL/file/upload"
          />
        </ProForm.Group>
      </ModalForm>
    </>
  );
}

export default AddEditDocument;
