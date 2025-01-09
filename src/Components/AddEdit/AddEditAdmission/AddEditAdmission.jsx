/* eslint-disable no-lone-blocks */
import {
  ModalForm,
  ProForm,
  ProFormText,
  ProFormSwitch,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import { message, notification, App } from "antd";
import React, { useRef, useState } from "react";
import {
  createAdmission,
  updateAdmission,
  uploadFile,
} from "../../../Services/lead";
import Editor from "../../CKEditor/Editor";
import "../style.css";

function AddEditAdmission({ onSuccess, openModal, data, onOpenChange }) {
  const [listFile, setListFile] = useState([]);
  const [fieldFile, setFieldFile] = useState("");
  const formRef = useRef(null);

  const handleCreateAdmission = async (values) => {
    try {
      const res = await createAdmission(values);
      if (res?.data?.success) {
        message.success("Tạo thông tin thành công");
        onSuccess();
      } else {
        res?.data?.error?.errorDetailList?.forEach((e) =>
          message.error(e.message)
        );
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi tạo thông tin.");
    }
  };

  const handleUpdateAdmission = async (values) => {
    try {
      const res = await updateAdmission(data?.id, values);
      if (res?.data?.success) {
        message.success("Cập nhật thông tin thành công");
        onSuccess();
      } else {
        res?.data?.error?.errorDetailList?.forEach((e) =>
          message.error(e.message)
        );
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi cập nhật thông tin.");
    }
  };

  const handleUpload = async (file) => {
    try {
      const res = await uploadFile(file.file);
      if (res?.data?.success) {
        const downloadUrl = res?.data?.data?.downloadUrl;
        setListFile([{ url: downloadUrl }]);
        setFieldFile(downloadUrl);
        notification.success({ message: "Tải file lên thành công" });
      } else {
        notification.error({
          message: "Tải file lên không thành công!",
          description: res?.data?.message || "Vui lòng thử lại.",
        });
      }
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Có lỗi xảy ra khi tải file.",
        description: error?.message || "Vui lòng thử lại sau.",
      });
    }
  };

  return (
    <App>
      <ModalForm
        title={
          data?.id
            ? "Chỉnh sửa thông tin của chương trình"
            : "Thêm Chương Trình"
        }
        initialValues={data}
        modalProps={{
          destroyOnClose: true,
        }}
        open={openModal}
        onFinish={async (values) => {
          if (data?.id) {
            await handleUpdateAdmission(values);
          } else {
            await handleCreateAdmission(values);
          }
        }}
        onOpenChange={onOpenChange}
        formRef={formRef}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="title"
            label="Tiêu đề chương trình"
            placeholder="Tiêu đề chương trình"
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
            placeholder="Chương trình đào tạo"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập nội dung chương trình",
              },
            ]}
          />

          <ProFormText
            width="md"
            name="description"
            label="Mô tả"
            placeholder="Mô tả"
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
            fieldProps={{
              listType: "picture-card",
              customRequest: handleUpload,
              multiple: false,
              onRemove: () => {
                setListFile([]);
                setFieldFile("");
              },
            }}
            transform={() => ({
              image: fieldFile || "",
            })}
          />

          <ProFormText
            width="md"
            name="linkRegister"
            label="Link đăng ký"
            placeholder="Link đăng ký"
          />

          <ProForm.Item
            name="admissionForm"
            label="Nội dung của chương trình"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập nội dung của chương trình",
              },
            ]}
          >
            <Editor
              initialValues={data?.admissionForm}
              onChange={(event, editor) => {
                const content = editor.getData();
                formRef?.current?.setFieldsValue({
                  admissionForm: content,
                });
              }}
            />
          </ProForm.Item>

          <ProFormSwitch
            name="status"
            label="Trạng thái hoạt động"
            checkedChildren="Hoạt động"
            unCheckedChildren="Không hoạt động"
            initialValue={data?.status ?? true}
            fieldProps={{
              defaultChecked: data?.status ?? true,
            }}
          />
        </ProForm.Group>
      </ModalForm>
    </App>
  );
}

export default AddEditAdmission;
