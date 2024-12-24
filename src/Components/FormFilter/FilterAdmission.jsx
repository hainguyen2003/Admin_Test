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

function FilterAdmissions({ onSearch, hide }) {
  const [form] = useForm();
  const handleFilterAdmissions = (values) => {
    onSearch(values);
    hide();
    form.resetFields();
  };

  return (
    <>
      {/* <h1 className="mt-0 font-semibold text-3xl mb-2 ">Lọc</h1> */}

      <ProForm
        submitter={false}
        onFinish={handleFilterAdmissions}
        form={form}
        onReset={(e) => {
          console.log(e);
        }}
      >
        <ProFormText
          width="md"
          title="title"
          label="Tên chương trình"
          placeholder="Tên chương trinhh"
        />

        <h2>Lọc theo ngày tạo - cập nhật: </h2>
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

export default FilterAdmissions;
