/* eslint-disable no-lone-blocks */
import React from "react";
import { updateConsultingRegister } from "../../../Services/lead";
import { message } from "antd";
import {
  ModalForm,
  ProForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import "../style.css";

function EditConsultingRegister({ onSuccess, openModal, data, onOpenChange }) {
  const handleUpdate = (values) => {
    updateConsultingRegister(data?.id, values).then((res) => {
      if (res?.data?.success === true) {
        message.success("Cập nhật thành công");
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
  return (
    <>
      <ModalForm
        title={
          data?.id ? "Chỉnh sửa thông tin của khách hàng" : "Thêm khách hàng"
        }
        initialValues={data}
        modalProps={{
          destroyOnClose: true,
        }}
        open={openModal}
        onFinish={async (values) => {
          handleUpdate(values);
        }}
        onOpenChange={onOpenChange}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="name"
            label="Tên khách hàng"
            placeholder="Tên khách hàng"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên khách hàng",
              },
            ]}
          />
          <ProFormText
            width="md"
            name="email"
            label="E-mail"
            placeholder="E-mail"
            rules={[
              {
                type: "email",
                message: "E-mail không hợp lệ",
              },
              {
                required: true,
                message: "Vui lòng nhập E-mail của bạn",
              },
            ]}
          />
          <ProFormDigit
            width="md"
            name="phone"
            label="Số điện thoại"
            placeholder="Số điện thoại"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập Email",
              },
            ]}
          />
          <ProFormText
            width="md"
            name="contentAdvice"
            label="Nội dung đăng ký tư vấn"
            placeholder="Nội dung đăng ký tư vấn"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập nội dung",
              },
            ]}
          />
          <ProFormSelect
            width="md"
            name="status"
            label="Trạng thái tư vấn"
            placeholder="Trạng thái tư vấn"
            options={[
              { label: "Đã tư vấn", value: "CONSULTED" },
              {
                label: "Đang trong quá trình tư vấn",
                value: "WAITING_FOR_ADVICE",
              },
            ]}
            rules={[
              {
                required: true,
                message: "Vui lòng chọn trạng thái",
              },
            ]}
          />
        </ProForm.Group>
      </ModalForm>
    </>
  );
}

export default EditConsultingRegister;
