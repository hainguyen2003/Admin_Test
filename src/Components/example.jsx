/* eslint-disable no-lone-blocks */
import {
  ModalForm,
  ProForm,
  ProFormText,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import { Form, Upload, message, notification } from "antd";
import React, { useRef, useState } from "react";
import { createNews, updateNews, uploadFile } from "../../../Services/lead";
import Editor from "../../CKEditor/Editor";
import { Bold } from "@ckeditor/ckeditor5-basic-styles";
import _ from "lodash";

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
      }
      // else if (res?.data?.error?.statusCode === 2) {
      //   {
      //     res?.data?.error?.errorDetailList.map((e) =>
      //       message.error(e.message)
      //     );
      //   }
      // }
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
            message.error(e.message)
          );
        }
      }
    });
  };

  const handleUpload = async (file) => {
    console.log("file:: ", file.file);
    const res = await uploadFile(file.file);
    console.log("res: ", res);

    if (res?.data?.success) {
      // setFile(file?.fileList?.at(0)?.response?.data?.downloadUrl);
      console.log("success:: ", res?.data?.data?.downloadUrl);
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
          />

          <ProFormUploadButton
            name="image"
            label="Upload Ảnh"
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
            action="https://133c-14-191-138-55.ngrok-free.app/file/upload"
          />

          <ProForm.Item
            width="md"
            name="content"
            label="Nội dung của tin tức"
            placeholder="Nội dung của tin tức"
          >
            <Editor
              initialValues={data}
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

// const currentValues = formRef?.current?.getFieldsValue();
// currentValues.image = response;
