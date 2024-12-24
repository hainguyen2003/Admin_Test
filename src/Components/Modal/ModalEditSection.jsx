import { Button, Form, Input, Modal, notification } from "antd";
import React, { useContext, useState } from "react";
import { AppContext } from "../AppContext/AppContext";
import { useForm } from "antd/es/form/Form";
import { updateSection } from "../../Services/APImocktest";

function ModalEditSection({ idSection, dataSection, handleGetDataExam }) {
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, dispatch } = useContext(AppContext);
  const { isOpenModalEditSection, isModalDeleteSection } = data;

  const handleCancel = () => {
    form.resetFields();
    dispatch({ type: "closeModalEditSection" });
  };
  const onFinish = (values) => {
    updateSection({
      id: idSection,
      title: values.title,
      file: values.file,
      description: values.description,
      type: values.type,
    })
      .then((res) => {
        console.log("Thành công", res.data.success);
        if (res.data.success) {
          dispatch({ type: "updateExam" });
          dispatch({ type: "closeModalEditSection" });
          notification.success({ message: "Cập nhật thành công " });
          handleGetDataExam()
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(values);
  };
  console.log(dataSection);
  const [form] = useForm();

  return (
    <div>
      <Modal
        open={isOpenModalEditSection}
        destroyOnClose={true}
        maskClosable={false}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <h2 className="text-center font-medium text-xl mb-10">
          {"Chỉnh sửa thông tin phần thi"} {idSection}{" "}
        </h2>
        {/* <h2>{idExam} </h2> */}
        <Form
          name="basic"
          preserve={false}
          layout="vertical"
          form={form}
          initialValues={dataSection}
          onFinish={onFinish}

          // autoComplete="off"
        >
          <Form.Item
            label="Tiêu đề phần thi"
            name="title"
            // initialValue={}
            // rules={[
            //   {
            //     required: true,
            //     message: "Nhập tiêu đề phần thi!",
            //   },
            // ]}
          >
            <Input className="mb-1" />
          </Form.Item>

          <Form.Item
            label="Nội dung mô tả phần thi"
            name="description"
            // initialValue={}
            // rules={[
            //   {
            //     required: true,
            //     message: "Nhập tiêu đề phần thi!",
            //   },
            // ]}
          >
            <Input className="mb-1" />
          </Form.Item>

          <Form.Item
            label="File"
            name="file"
            // initialValue={}
            // rules={[
            //   {
            //     required: true,
            //     message: "Nhập tiêu đề phần thi!",
            //   },
            // ]}
          >
            <Input className="mb-1" />
          </Form.Item>

          <Form.Item
            label="Loại phần thi"
            name="type"
            // initialValue={}
            // rules={[
            //   {
            //     required: true,
            //     message: "Nhập tiêu đề phần thi!",
            //   },
            // ]}
          >
            <Input className="mb-1" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 20,
              span: 16,
            }}
          >
            {isModalDeleteSection && (
              <Button type="primary" htmlType="submit" className="">
                Save
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

// sửa đổi
export default ModalEditSection;
