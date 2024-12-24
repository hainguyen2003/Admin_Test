import {
  ProForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { Button, Form } from "antd";
import { useForm } from "antd/lib/form/Form";
import moment from "moment";
import React from "react";

function FilterCourseRegister1({ onSearch, hide }) {
  const [form] = useForm();
  const handleFilter = (values) => {
    onSearch(values);
    hide();
    form.resetFields();
  };
  return (
    <>
      <ProForm
        submitter={false}
        onFinish={handleFilter}
        form={form}
        onReset={(e) => {
          console.log(e);
        }}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="name"
            label="Tên thí sinh"
            placeholder="Tên thí sinh"
          />
          <ProFormText
            width="md"
            name="email"
            label="Email"
            placeholder="Email"
          />
          <ProFormText
            width="md"
            name="address"
            label="Địa chỉ"
            placeholder="Địa chỉ"
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
        <ProForm.Group>
          <ProFormText
            width="md"
            name="phone"
            label="Số điện thoại "
            placeholder="Số điện thoại "
          />
          <ProFormSelect
            width="md"
            name="status"
            label="Trạng thái"
            placeholder="Trạng thái"
            options={[
              { label: "Đã xong", value: "APPROVED" },
              {
                label: "Đang trong quá trình chờ ",
                value: "WAITING_FOR_APPROVEDED",
              },
            ]}
          />
        </ProForm.Group>

        <Form.Item>
          <Button
            // className="bg-white text-black ml-1.5"
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

export default FilterCourseRegister1;
