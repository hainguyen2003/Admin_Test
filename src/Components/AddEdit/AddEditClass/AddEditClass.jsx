import {
  ModalForm,
  ProForm,
  ProFormText,
  ProFormSelect,
  ProFormDatePicker,
} from "@ant-design/pro-components";
import React, { useRef, useState } from "react";
import { message } from "antd";
import { createClass, updateClass } from "../../../Services/lead";

function AddEditClass({ onSuccess, openModal, data, onOpenChange }) {
  const formRef = useRef(null);

  const handleCreateClass = (values) => {
    createClass(values).then((res) => {
      console.log("Response from API:", res);
      if (res?.data?.success === true) {
        message.success("Tạo lớp học thành công");
        onSuccess();
      } else if (res?.data?.error?.statusCode === 2) {
        {
          res?.data?.error?.errorDetailList.map((e) => {
            message.error(e.message);
          });
        }
      }
    });
  };

  const handleUpdateClass = (values) => {
    updateClass(data.classId, values).then((res) => {
      if (res?.data?.success === true) {
        message.success("Cập nhật lớp học thành công");
        onSuccess();
      } else {
        message.error("Có lỗi xảy ra khi cập nhật lớp học");
      }
    });
  };

  return (
    <ModalForm
      title={data?.classId ? "Chỉnh sửa lớp học" : "Thêm lớp học mới"}
      initialValues={data}
      modalProps={{
        destroyOnClose: true,
      }}
      open={openModal}
      onFinish={async (values) => {
        if (data?.classId) {
          handleUpdateClass(values);
        } else {
          handleCreateClass(values);
        }
      }}
      onOpenChange={onOpenChange}
      formRef={formRef}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="classId"
          label="Mã lớp học"
          placeholder="Mã lớp học"
          rules={[
            {
              required: true,
              message: "Mã lớp học không được để trống",
            },
          ]}
        />
        <ProFormText
          width="md"
          name="className"
          label="Tên lớp học"
          placeholder="Tên lớp học"
          rules={[
            {
              required: true,
              message: "Tên lớp học không được để trống",
            },
          ]}
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormText
          width="md"
          name="teacherName"
          label="Giảng viên"
          placeholder="Giảng viên"
          rules={[
            {
              required: true,
              message: "Giảng viên không được để trống",
            },
          ]}
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormText
          width="md"
          name="schedule"
          label="Thời gian học"
          placeholder="Thời gian học"
          rules={[
            {
              required: true,
              message: "Thời gian học không được để trống",
            },
          ]}
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormDatePicker
          width="md"
          name="startDate"
          label="Ngày bắt đầu"
          placeholder="Ngày bắt đầu"
          rules={[
            {
              required: true,
              message: "Ngày bắt đầu không được để trống",
            },
          ]}
        />
        <ProFormDatePicker
          width="md"
          name="endDate"
          label="Ngày kết thúc"
          placeholder="Ngày kết thúc"
          rules={[
            {
              required: true,
              message: "Ngày kết thúc không được để trống",
            },
          ]}
        />
      </ProForm.Group>
    </ModalForm>
  );
}

export default AddEditClass;
