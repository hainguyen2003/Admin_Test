import { Button, Form, Input, Modal, message } from "antd";
import React from "react";
import { changepassword } from "../../Services/lead";
import { useNavigate } from "react-router-dom";
import { useForm } from "antd/lib/form/Form";

function ChangePassword({ onCancel }) {
  const navigate = useNavigate();
  const [form] = useForm();
  const onFinish = (values) => {
    changepassword(values).then((res) => {
      if (res?.data?.success) {
        message.open({
          type: "success",
          content: res?.data?.data,
          duration: 5,
        });
        onCancel();
        form.resetFields();
      } else if (res?.data?.error?.statusCode === 500) {
        message.open({
          type: "error",
          content: res?.data?.error?.message,
          duration: 10,
        });
      }
    });
  };

  return (
    <div>
      <Form onFinish={onFinish} layout="vertical">
        <h1 className="text-35 mb-10">Đổi mật khẩu</h1>

        <Form.Item
          label="Mật khẩu cũ"
          name="oldPassword"
          rules={[
            {
              required: true,
              message: "Hãy nhập mật khẩu hiện tại của bạn!",
            },
          ]}
        >
          <Input.Password allowClear type="password" />
        </Form.Item>
        <Form.Item
          label="Mật khẩu mới"
          name="newPassword"
          rules={[
            {
              required: true,
              message: "Hãy nhập mật khẩu mới của bạn!",
            },
          ]}
        >
          <Input.Password allowClear type="password" />
        </Form.Item>
        <Form.Item
          label="Xác nhận lại mật khẩu"
          name="confirmNewPassword"
          rules={[
            {
              required: true,
              message: "Xác nhận lại mật khẩu mới của bạn!",
            },
          ]}
        >
          <Input.Password allowClear type="password" />
        </Form.Item>
        <div className="flex justify-end mt-[15px] mb-[5%] ">
          <Button
            type="default"
            onClick={() => {
              form.resetFields();
              navigate("/adminpage/user");
              onCancel();
            }}
          >
            Hủy
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-[#FB9400] hover:opacity-80 ml-[5px] "
            // onClick={handleSubmit}
          >
            Cập nhật
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ChangePassword;
