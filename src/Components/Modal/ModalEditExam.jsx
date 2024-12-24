import { Button, Form, Input, Modal, notification } from "antd";
import React, { useContext, useState } from "react";
import { AppContext } from "../AppContext/AppContext";
import { useForm } from "antd/es/form/Form";
import { updateExam } from "../../Services/APImocktest";

function ModalEditExam({idExam , dataExam }) {
//   const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, dispatch } = useContext(AppContext);
  const { isOpenModalEditExam } = data;
console.log("dataExam" , dataExam);
  const handleCancel = () => 
  {
    form.resetFields();
    dispatch({ type: "closeModalEditExam" });
    
  };
  const onFinish = (values) =>{
    updateExam({
      name : values.name , 
      timeExam : values.timeExam , 
      id : idExam , 
      isFree : values.isFree ,
      type : values.type
    }).then((res)=>{
      console.log(res.data);
      if(res.data.success== true){
        dispatch({type : "updateExam"})

        dispatch({ type: "closeModalEditExam" });
        // handleGetDataExam();
        notification.success({message : "Cập nhật thông tin bài thi thành công "})
      }
    }).catch((err) =>{
      console.log(err);
    })
   
    console.log(values);
  }
  console.log(dataExam);
  const [form] = useForm()

  return (
    <div>
      <Modal
        open={isOpenModalEditExam}
        destroyOnClose={true}
        maskClosable={false}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={null}

      >
       <h2 className="text-center font-medium text-xl mb-10">{"Chỉnh sửa thông tin "} </h2>
       {/* <h2>{idExam} </h2> */}
       <Form
        name="basic"
        preserve={false}
        
        form={form}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={dataExam}
        onFinish={onFinish}
        
        // autoComplete="off"
      >
        <Form.Item
          label="Tên bài thi"
          name="name"
          // initialValue={}
          rules={[
            {
              required: true,
              message: "Nhập tên bài thi!",
            },
          ]}
        >
          <Input className="mb-1"  />
        </Form.Item>
        <Form.Item
          label="Thời gian bài thi  "
          name="timeExam"
          rules={[
            {
              required: true,
              message: "Nhập thời gian của bài thi !",
            },
          ]}
          className="mt-3"
        >
          <Input className="mb-1"  placeholder="Type exam is test or minitest"/>
        </Form.Item> 
        <Form.Item
          label="Loại bài thi "
          name="type"
          rules={[
            {
              required: true,
              message: "Nhập loại bài thi !",
            },
          ]}
          className="mt-3"
        >
          <Input className="mb-1" type=""/>
        </Form.Item>
        <Form.Item
          label="Bài thi miễn phí"
          className="mt-3"
          name="isFree"
          rules={[
            {
              required: true,
              message: "Bài thi này có miễn phí không  !",
            },
          ]}
        >
          <Input className="mb-1" type=""/>
        </Form.Item>
        <Form.Item
             className="mt-5"
          wrapperCol={{
            offset: 20,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" className="">
           Save
          </Button>
        </Form.Item>
      </Form>
      </Modal>
    </div>
  );
}

// sửa đổi
export default ModalEditExam;
