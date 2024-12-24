import Modal from "antd/es/modal/Modal";
import React, { useContext, useState } from "react";
import { AppContext } from "../AppContext/AppContext";
import { ProFormUploadButton } from "@ant-design/pro-components";
import { uploadFileExcel } from "../../Services/APImocktest";
import { message, notification } from "antd";

function ModalCreateExamByExcel() {
  const { data, dispatch } = useContext(AppContext);
  const { isOpenModalCreateExamByExcel } = data;
  const [listFile, setListFile] = useState([]);

  const handleCancel = () => {
    dispatch({ type: "closeModalCreateExamByExcel" });
  };

  const handleUpload = async (file) => {
    const isExcel = file?.file?.name?.endsWith("xlsx" || "xls") ? true : false;
    // console.log(isExcel);

    const a = listFile.length ? "lon hon 1" : "bang 1 ";
    const formdata = new FormData();
    formdata.append('file' , file.file)
    // console.log(a);
    if (isExcel) {
      uploadFileExcel(formdata)
        .then((res) => {
          console.log(res?.data?.success === true);
          if(res?.data?.success === true){
            dispatch({type : "updateExam"})
            handleCancel()
            notification.success({message : "Thêm thành công bài thi "})
          }else{
              notification.error({message : "Có lỗi khi tạo bài thi "})

          }

        })
        .catch((err) => {
          console.log(err);
        });
    }else{
        notification.error({message : "File phải là excel"})
    }
  };

  return (
    <div>
      <Modal
        maskClosable={false}
        open={isOpenModalCreateExamByExcel}
        onCancel={handleCancel}
        destroyOnClose={true}
        footer={null}
      >
        <h2 className="text-center font-medium text-lg text-orange-500 ">
          Chọn file bạn muốn nhập{" "}
        </h2>

        <div className="my-5 text-center">
          <ProFormUploadButton
            name="file"
            className=" mx-auto"
            fileList={listFile}
            title="Click to upload"
            fieldProps={{
              listType: "picture-card",
              multiple: false,
             

              method: "POST",
              name: "file",
              customRequest : handleUpload,

              openFileDialogOnClick: true,
            //   beforeUpload: (file) => {
            //     const isExcel = file?.file?.name?.endsWith("xlsx" || "xls")
            //       ? true
            //       : false;
            //     console.log(file);
            //     if (!isExcel) {
            //       return false;
            //     }
            //     return true;
            //   },
              onChange: (file) => {
                console.log("file:: ", file);
              },
            }}
            action="localhost:8088/client/mocktest/exam/importFile"
          />
        </div>
        {/* <Button onClick={handleTest}>Click me</Button> */}
      </Modal>
    </div>
  );
}

export default ModalCreateExamByExcel;
