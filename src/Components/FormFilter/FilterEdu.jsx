import React, { useState } from "react";
import {
  ProForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { Button, Form } from "antd";
import moment from "moment";
import { useForm } from "antd/lib/form/Form";

function FilterService({ onSearch, hide }) {
  const [form] = useForm();
  const handleFilterService = (values) => {
    onSearch(values);
    hide();
    form.resetFields();
  };

  return (
    <>
      {/* <h1 className="mt-0 font-semibold text-3xl mb-2 ">Lọc</h1> */}

      <ProForm
        submitter={false}
        onFinish={handleFilterService}
        form={form}
        onReset={(e) => {
          console.log(e);
        }}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="name"
            label="Tên dịch vụ"
            placeholder="Tên dịch vụ"
          />
          <ProFormSelect
            width="md"
            name="typeOfService"
            options={[
              { label: "Chương trình học", value: "EDUCATION_PROGRAM" },
              { label: "Khóa học", value: "COURSE" },
            ]}
            label="Loại dịch vụ"
            placeholder="Loại dịch vụ"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            width="md"
            name="learnOnlineOrOffline"
            label="Hình thức học"
            options={[
              { label: "Học online", value: "ONLINE" },
              { label: "Học offline", value: "OFFLINE" },
              { label: "Cả 2", value: "ONLINE_AND_OFFLINE" },
            ]}
            placeholder="Hình thức học"
          />
          <ProFormText
            width="md"
            name="coursePrice"
            label="Chi phí"
            placeholder="Chi phí"
          />
        </ProForm.Group>
        <h2>Lọc theo ngày tạo - cập nhật: </h2>
        <ProForm.Group>
          <ProFormDatePicker
            label="Ngày bắt đầu"
            width="md"
            name="dateFrom"
            fieldProps={{
              format: "DD/MM/YYYY",
              transform: (value) => moment(value).format("DD/MM/YYYY"),
              onChange: () => {},
            }}
          />
          <ProFormDatePicker
            label="Ngày kết thúc"
            width="md"
            name="dateTo"
            fieldProps={{
              format: "DD/MM/YYYY",
              transform: (value) => moment(value).format("DD/MM/YYYY"),
              onChange: () => {},
            }}
          />
        </ProForm.Group>
        <Form.Item>
          <Button
            style={{ border: "1px solid #d9d9d9" }}
            type="primary"
            htmlType="submit"
          >
            Lọc
          </Button>{" "}
          <Button
            style={{
              border: "1px solid #d9d9d9",
              backgroundColor: "#fff",
              color: "black",
            }}
            type="primary"
            onClick={hide}
          >
            Hủy
          </Button>{" "}
        </Form.Item>
      </ProForm>
    </>
  );
}

export default FilterService;
