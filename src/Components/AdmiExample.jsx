import {
  ModalForm,
  ProForm,
  ProFormText,
  ProFormUploadButton,
  ProFormSwitch,
} from "@ant-design/pro-components";
import { message, notification } from "antd";
import React, { useRef, useState } from "react";

import Editor from "../../CKEditor/Editor";
import { createAdmission, updateAdmission, uploadFile } from "../Services/lead";

function AddEditAdmission({ onSuccess, openModal, data, onOpenChange }) {
  const [listFile, setListFile] = useState([]);
  const [fieldFile, setFieldFile] = useState("");
  const formRef = useRef(null);

  // Hàm tạo Admission
  const handleCreateAdmission = (values) => {
    createAdmission(values).then((res) => {
      if (res?.data?.success === true) {
        message.success("Tạo chương trình thành công");
        onSuccess();
      }
    });
  };

  // Hàm cập nhật Admission
  const handleUpdateAdmission = (values) => {
    updateAdmission(data?.id, values).then((res) => {
      if (res?.data?.success === true) {
        message.success("Cập nhật chương trình thành công");
        onSuccess();
      } else if (res?.data?.error?.statusCode === 2) {
        res?.data?.error?.errorDetailList.map((e) => message.error(e.message));
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
    <ModalForm
      title={
        data?.id ? "Chỉnh sửa thông tin chương trình" : "Thêm chương trình"
      }
      initialValues={data}
      modalProps={{
        destroyOnClose: true,
      }}
      open={openModal}
      onFinish={async (values) => {
        if (data?.id) {
          handleUpdateAdmission(values);
        } else {
          handleCreateAdmission(values);
        }
      }}
      onOpenChange={onOpenChange}
      formRef={formRef}
    >
      <ProForm.Group>
        {/* Tên chương trình */}
        <ProFormText
          width="md"
          name="title"
          label="Tiêu đề chương trình"
          placeholder="Nhập tiêu đề chương trình"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên chương trình",
            },
          ]}
        />
        <ProFormText
          width="md"
          name="program"
          label="Chương trình đào tạo"
          placeholder=" Nội dung đào tạo "
          rules={[
            {
              required: true,
              message: "Vui lòng nhập nội dung đào tạo",
            },
          ]}
        />

        {/* Upload ảnh */}
        <ProFormUploadButton
          name="image"
          label="Upload Ảnh"
          title="Click to upload"
          fileList={listFile}
          transform={(value) => ({
            image: fieldFile || "", // Giữ giá trị ảnh hiện tại nếu không upload mới
          })}
          fieldProps={{
            listType: "picture-card",
            method: "POST",
            name: "file",
            customRequest: handleUpload,
            multiple: false,
            onRemove: () => setListFile([]),
          }}
          action="https://example.com/file/upload"
        />

        {/* Mô tả chương trình */}
        <ProFormText
          width="md"
          name="description"
          label="Mô tả"
          placeholder="Nhập mô tả chương trình"
        />

        {/* Liên kết đăng ký */}
        <ProFormText
          width="md"
          name="linkRegister"
          label="Liên kết đăng ký"
          placeholder="Nhập liên kết đăng ký"
          rules={[
            {
              required: true,
              type: "url",
              message: "Vui lòng nhập một liên kết hợp lệ",
            },
          ]}
        />

        {/* Nội dung chương trình */}
        <ProForm.Item
          width="md"
          name="admissionForm"
          label="Nội dung chương trình"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập nội dung chương trình",
            },
          ]}
        >
          <Editor
            initialValues={data?.title || ""}
            onChange={(event, editor) => {
              formRef?.current?.setFieldsValue({
                title: editor.getData(),
              });
            }}
          />
        </ProForm.Item>

        {/* Trạng thái */}
        <ProFormSwitch
          name="status"
          label="Trạng thái"
          checkedChildren="Hoạt động"
          unCheckedChildren="Không hoạt động"
          initialValue={data?.status ?? true}
        />
      </ProForm.Group>
    </ModalForm>
  );
}

export default AddEditAdmission;
