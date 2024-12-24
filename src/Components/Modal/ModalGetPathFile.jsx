import { Button, Form, Input, Modal, notification } from "antd";
import React, { useContext, useState } from "react";
import FormUpload from "../FormFilter/FormUpload";
import { AppContext } from "../AppContext/AppContext";
import { ProFormUploadButton } from "@ant-design/pro-components";
import { createFile } from "../../Services/APImocktest";

function ModalGetPathFile(props) {
    const [listFile, setListFile] = useState([]);
    const [fieldFile, setFieldFile] = useState("");
    const {data , dispatch } = useContext(AppContext);
    const {fileInDescription} = data 
    const {isOpenModalGetPathFile} = data
    const [path , setPath] = useState("")
    const handleCancel = () =>{
        dispatch({type : "closeModalGetPathFile"})
    }
    const handleUpload = async (file) => {
        // console.log("file:: ", file.file);
        const res = await createFile(file.file);
        console.log("res: ", res?.data?.data);
    
        if (res?.data?.success) {
          // setFile(file?.fileList?.at(0)?.response?.data?.downloadUrl);
          console.log("success:: ", res?.data?.data?.downloadUrl);
          setListFile([...listFile, { url: res?.data?.data?.downloadUrl }]);
          setFieldFile(res?.data?.data?.downloadUrl);
          setPath(res?.data?.data?.downloadUrl)
          dispatch({type : "fileInDescription" , payload : res?.data?.data?.downloadUrl})
          notification.success({ message: "Tải file lên thành công" });
        } else {
          notification.error({ message: "Tải file lên không thành công!" });
        }
      };
    
      const listFileRemoved = () => {
        // console.log(listFile);
        // const newList = listFile.filter((item) => item.status !== "removed");
        setListFile([]);
        notification.success({message : "Xoá thành công "})
        setPath("")
      };
  return (
    <div>
      <Modal maskClosable={false} open={isOpenModalGetPathFile} onCancel={handleCancel} footer={null}>
        <div className="text-center">
        <ProFormUploadButton
        name="image"
        
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
          onRemove: listFileRemoved,
          openFileDialogOnClick: true,
          onChange: (file) => {
            console.log("file:: ", file);
          },
        }}
        action="https://acd2-118-70-132-104.ngrok-free.app/file/upload"
      />

     <Input value={path}></Input>
     <Button onClick={()=> listFileRemoved()} className="my-5 bg-red-500 text-yellow-50">Clear all </Button>

        </div>
      </Modal>
    </div>
  );
}

export default ModalGetPathFile;
