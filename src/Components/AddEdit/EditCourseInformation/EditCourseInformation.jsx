/* eslint-disable no-lone-blocks */
import React from "react";
import { updateCourseRegister1 } from "../../../Services/lead";
import { message } from "antd";
import {
  ModalForm,
  ProForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import "../style.css";

function EditCourseRegister1({ onSuccess, openModal, data, onOpenChange }) {
  const handleUpdate = (values) => {
    updateCourseRegister1(data?.id, values).then((res) => {
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
            label="Tên thí sinh"
            placeholder="Tên thí sinh"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên thí sinh",
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
                message: "Vui lòng nhập số điện thoại !",
              },
            ]}
          />
          <ProFormText
            width="md"
            name="address"
            label="Địa chỉ"
            placeholder="Địa chỉ"
            // rules={[
            //   {
            //     required: true,
            //     message: "Vui lòng nhập địa chỉ !",
            //   },
            // ]}
          />
          <ProFormText
            width="md"
            name="information"
            label="Khóa học đăng ký "
            placeholder="Khóa học đăng ký "
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
            label="Trạng thái "
            placeholder="Trạng thái "
            options={[
              { label: "Đã duyệt", value: "APPROVED" },
              {
                label: "Đang trong quá trình chờ",
                value: "WAITING_FOR_APPROVEDED",
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

export default EditCourseRegister1;
