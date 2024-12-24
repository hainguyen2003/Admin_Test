import React from "react";
import {
  ProForm,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { Button, Form } from "antd";
import { useForm } from "antd/lib/form/Form";

function FilterES({ onSearch, hide }) {
  const [form] = useForm();
  const handleFilterES = (values) => {
    onSearch(values);
    hide();
    form.resetFields();
  };

  return (
    <>
      <ProForm
        submitter={false}
        onFinish={handleFilterES}
        form={form}
        onReset={(e) => {
          console.log(e);
        }}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="nameExamSchool"
            label="Tên trường tổ chức thi"
            placeholder="Tên trường tổ chức thi"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="md"
            name="schoolId"
            label="Mã trường học"
            placeholder="Mã trường học"
          />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormSelect
            width="md"
            name="areaId"
            label="Mã khu vực"
            placeholder="Mã khu vực"
            valueEnum={{
              0: "BAC",
              1: "TRUNG",
              2: "NAM",
            }}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="md"
            name="nameArea"
            label="Tên khu vực"
            placeholder="Tên khu vực"
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

export default FilterES;
