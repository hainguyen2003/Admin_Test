/* eslint-disable no-lone-blocks */
import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import { updateDisplay, uploadFile } from "../../../Services/lead";
import { message, notification } from "antd";
import _ from "lodash";
import { useRef, useState } from "react";
import "../style.css";

function EditDisplay({ onSuccess, openModal, data, onOpenChange }) {
  const [listFile, setListFile] = useState([]);
  const [fieldFile, setFieldFile] = useState("");
  const formRef = useRef(null);

  const handleUpdateDisplay = (values) => {
    updateDisplay(data?.id, values).then((res) => {
      if (res?.data?.success) {
        message.success("Cập nhật hiển thị thành công");
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
        title="Chỉnh sửa"
        initialValues={data}
        modalProps={{
          destroyOnClose: true,
        }}
        open={openModal}
        onFinish={async (values) => {
          handleUpdateDisplay(values);
        }}
        onOpenChange={onOpenChange}
        formRef={formRef}
      >
        <ProFormText name="title" label="Tiêu đề" placeholder="Tiêu đề" />
        <ProFormText name="description" label="Mô tả" placeholder="Mô tả" />

        <ProFormText
          name="location"
          label="Vị trí ảnh"
          placeholder="Vị trí ảnh"
        />
        <ProFormSelect
          name="type"
          label="Loại"
          placeholder="Loại"
          valueEnum={{
            0: "BANNER",
            1: "APTIS",
            2: "VSTEP",
            3: "IELTS",
            4: "PAGES",
            5: "HOME",
          }}
        />
        {!(data.image && data.image.startsWith("BƯỚC")) && (
          <ProFormUploadButton
            name="image"
            title="Click to upload"
            label="Upload ảnh"
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
        )}
      </ModalForm>
    </>
  );
}

export default EditDisplay;
