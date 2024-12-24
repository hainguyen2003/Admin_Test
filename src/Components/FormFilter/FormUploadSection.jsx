import { ProFormUploadButton } from "@ant-design/pro-components";
import React, { useContext, useState } from "react";
import { createFile } from "../../Services/APImocktest";
import { Button, notification } from "antd";
import { AppContext } from "../AppContext/AppContext";

function FormUploadSection(props) {
  const [listFile, setListFile] = useState([]);
  const [fieldFile, setFieldFile] = useState("");
  const {data , dispatch } = useContext(AppContext);
  const {fileInDescription} = data 

  const handleUpload = async (file) => {
    // console.log("file:: ", file.file);
    const res = await createFile(file.file);
    console.log("res: ", res?.data?.data);

    if (res?.data?.success) {
      // setFile(file?.fileList?.at(0)?.response?.data?.downloadUrl);
      console.log("success:: ", res?.data?.data?.downloadUrl);
      setListFile([...listFile, { url: res?.data?.data?.downloadUrl }]);
      setFieldFile(res?.data?.data?.downloadUrl);
      dispatch({type : "fileDescriptionInSection" , payload : res?.data?.data?.downloadUrl})
      notification.success({ message: "Tải file lên thành công" });
    } else {
      notification.error({ message: "Tải file lên không thành công!" });
    }
  };

  const listFileRemoved = () => {
    // console.log(listFile);
    // const newList = listFile.filter((item) => item.status !== "removed");
    setListFile(null);
    notification.success({message : "Xoá thành công "})
  };

  const handleTest = () =>{
    console.log(fileInDescription);
  }
  return (
    <div className="" >
      <ProFormUploadButton
        name="file"
        // label="Upload Ảnh"
        title="Upload File"
        fileList={listFile}
        transform={(value) => {
          return {
            file: fieldFile || "", // cập nhật không upload file mới thì lấy giá trị value trong form
          };
        }}
        fieldProps={{
          listType: "picture-card",
          method: "POST",
          name: "file",
          customRequest: handleUpload,
          multiple: true,
          onRemove: listFileRemoved,
          openFileDialogOnClick: true,
          onChange: (file) => {
            console.log("file:: ", file);
          },
        }}
        action="https://acd2-118-70-132-104.ngrok-free.app/file/upload"
      />

      {/* <Button onClick={handleTest}>Click me</Button> */}
    </div>
  );
}

export default FormUploadSection;
