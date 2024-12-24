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

function FilterDocs({ onSearch, hide }) {
  const [form] = useForm();
  const handleFilterDocs = (values) => {
    onSearch(values);
    hide();
    form.resetFields();
  };

  return (
    <>
      {/* <h1 className="mt-0 font-semibold text-3xl mb-2 ">Lọc</h1> */}

      <ProForm
        submitter={false}
        onFinish={handleFilterDocs}
        form={form}
        onReset={(e) => {
          console.log(e);
        }}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="name"
            label="Tên tài liệu"
            placeholder="Tên tài liệu"
          />
          <ProFormSelect
            width="md"
            name="status"
            valueEnum={{
              0: "FREE",
              1: "NO_FREE",
            }}
            label="Trạng thái"
            placeholder="Trạng thái"
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

export default FilterDocs;
