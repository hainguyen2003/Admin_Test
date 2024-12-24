/* eslint-disable no-lone-blocks */
import {
  ModalForm,
  ProForm,
  ProFormText,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import { message, notification } from "antd";
import React, { useRef, useState } from "react";
import { updateSlide, uploadFile } from "../../../Services/lead";
import _ from "lodash";
import "../style.css";

function EditSlide({ onSuccess, openModal, data, onOpenChange }) {
  const [listFile, setListFile] = useState([]);
  const [fieldFile, setFieldFile] = useState("");
  const formRef = useRef(null);

  const handleUpdateSlide = (values) => {
    updateSlide(data?.id, values).then((res) => {
      if (res?.data?.success === true) {
        message.success("Cập nhật Slide thành công");
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
        title="Chỉnh sửa Slide"
        initialValues={data}
        modalProps={{
          destroyOnClose: true,
        }}
        open={openModal}
        onFinish={async (values) => {
          handleUpdateSlide(values);
        }}
        onOpenChange={onOpenChange}
        formRef={formRef}
      >
        <ProForm.Group>
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
            action="process.env.BASE_URL/file/upload"
          />
          <ProFormText
            width="md"
            name="location"
            label="Vị trí ảnh"
            placeholder="Vị trí ảnh"
          />
        </ProForm.Group>
      </ModalForm>
    </>
  );
}

export default EditSlide;
