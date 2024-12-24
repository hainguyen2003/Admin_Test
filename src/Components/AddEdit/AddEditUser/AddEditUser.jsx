/* eslint-disable no-lone-blocks */
import {
  ModalForm,
  ProForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import React, { useEffect, useRef, useState } from "react";
import {
  createUser,
  getAllRole,
  getListService,
  getProfileUser,
  updateUser,
  uploadFile,
} from "../../../Services/lead";
import { message, notification } from "antd";
import moment from "moment";
import "../style.css";
import _ from "lodash";

function AddEditUser({ onSuccess, openModal, data, onOpenChange }) {
  const [dataRole, setDataRole] = useState([]);
  const [role, setRole] = useState({});
  const [dataService, setDataService] = useState([]);
  const [switchValue, setSwitchValue] = useState(false);
  const [listFile, setListFile] = useState([]);
  const [fieldFile, setFieldFile] = useState("");
  const formRef = useRef(null);

  const handleGetRole = () => {
    getAllRole().then((res) => {
      const role = res?.data?.data?.items;
      const options = role.map((e) => {
        return {
          label: e.name,
          value: e.roleId,
        };
      });
      setDataRole(options);
    });
  };

  const handleGetProfileUser = () => {
    getProfileUser().then((res) => {
      setRole(res?.data?.data);
    });
  };
  const checkPermission = role?.role?.roleId === "STAFF";

  const getRoleOptions = (userRole) => {
    if (userRole) {
      return [
        {
          label: "CUSTOMER",
          value: "CUSTOMER",
        },
      ];
    } else {
      return dataRole;
    }
  };

  const handleGetService = () => {
    getListService().then((res) => {
      const service = res?.data?.data.items;
      const options = service.map((e) => {
        return {
          label: e.name,
          value: e.id,
        };
      });
      setDataService(options);
    });
  };

  // Hàm tạo người dùng
  const handleCreatUser = (values) => {
    createUser(values).then((res) => {
      if (res?.data?.success === true) {
        message.success("Tạo người dùng thành công");

        onSuccess();
      } else if (res?.data?.error?.statusCode === 500) {
        message.open({
          type: "error",
          content: res?.data?.error?.message,
          duration: 10,
        });
      } else if (res?.data?.error?.statusCode === 2) {
        res?.data?.error?.errorDetailList.map((e) =>
          message.open({
            type: "error",
            content: e.message,
            duration: 15,
          })
        );
      }
    });
  };

  // Hàm cập nhật người dùng
  const handleUpdateUser = (values) => {
    updateUser(data.userId, values).then((res) => {
      if (res?.data?.success === true) {
        message.success("Cập nhật người dùng thành công");
        onSuccess();
      } else if (res?.data?.error?.statusCode === 2) {
        {
          res?.data?.error?.errorDetailList.map((e) =>
            message.open({
              type: "error",
              content: e.message,
              duration: 20,
            })
          );
        }
      } else if (res?.data?.error?.statusCode === 500) {
        message.open({
          type: "error",
          content: res?.data?.error?.message,
          duration: 10,
        });
      }
    });
  };

  const handleUpload = async (file) => {
    const res = await uploadFile(file.file);

    if (res?.data?.success) {
      setListFile([{ url: res?.data?.data?.downloadUrl }]);
      setFieldFile(res?.data?.data?.downloadUrl);
      notification.success({ message: "Tải file lên thành công" });
    } else {
      notification.error({ message: "Tải file lên không thành công!" });
    }
  };

  useEffect(() => {
    handleGetRole();
    handleGetService();
    handleGetProfileUser();
  }, []);

  return (
    <>
      <ModalForm
        title={
          data?.userId
            ? "Chỉnh sửa thông tin người dùng"
            : "Thêm người dùng mới"
        }
        initialValues={data}
        modalProps={{
          destroyOnClose: true,
        }}
        open={openModal}
        onFinish={async (values) => {
          if (data?.userId) {
            handleUpdateUser(values);
          } else {
            handleCreatUser(values);
          }
        }}
        onOpenChange={onOpenChange}
        formRef={formRef}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="name"
            label="Tên người dùng"
            placeholder="Tên người dùng"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập họ tên ",
              },
            ]}
          />
          <ProFormText
            width="md"
            name="username"
            label="Username"
            placeholder="Username"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập Username ",
              },
            ]}
          />
          {!data.userId && (
            <ProFormText
              width="md"
              name="password"
              label="Mật khẩu"
              placeholder="Mật khẩu"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu ",
                },
              ]}
            />
          )}
          <ProFormDatePicker
            width="md"
            name="dateOfBirth"
            label="Ngày sinh"
            placeholder="Ngày sinh"
            fieldProps={{
              format: "DD/MM/YYYY",

              transform: (value) => moment(value).format("DD/MM/YYYY"),
            }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập ngày sinh ",
              },
            ]}
          />
          <ProFormText
            width="md"
            name="phone"
            label="Số điện thoại"
            placeholder="Số điện thoại"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại",
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
          <ProFormText
            width="md"
            name="address"
            label="Địa chỉ"
            placeholder="Địa chỉ"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập địa chỉ ",
              },
            ]}
          />
          <ProFormUploadButton
            name="avatar"
            initialValue={data?.userId ? data.avatar : ""}
            label="Avatar"
            title="Click to upload"
            fileList={listFile}
            transform={(value) => {
              return {
                avatar: fieldFile || "", // cập nhật không upload file mới thì lấy giá trị value trong form
              };
            }}
            fieldProps={{
              listType: "picture-card",
              method: "POST",
              name: "file",
              customRequest: handleUpload,
              multiple: true,
              onRemove: () => setListFile([]),
              openFileDialogOnClick: true,
              onChange: (file) => {},
            }}
            action="process.env.BASE_URL/file/upload"
          />
          <ProFormSelect
            width="md"
            name="roleId"
            initialValue={data?.userId ? data?.role?.name : ""}
            // options={dataRole}
            options={getRoleOptions(checkPermission)}
            label="Mã vai trò"
            placeholder="Mã vai trò"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn vai trò",
              },
            ]}
          />

          <ProFormSelect
            width="md"
            name="services"
            convertValue={(value) => {
              if (value?.at(0)?.name) {
                const list = value.map((val) => {
                  return {
                    value: val?.id,
                    label: val?.title,
                  };
                });
                return list;
              } else {
                return value;
              }
            }}
            transform={(value) => {
              if (value?.at(0)?.name) {
                console.log("true");
                const list = value.map((val) => val?.id);
                return {
                  services: list,
                };
              } else {
                return { services: value };
              }
            }}
            mode="multiple"
            options={dataService}
            label="Dịch vụ"
            placeholder="Dịch vụ "
            rules={[
              {
                required: true,
                message: "Vui lòng chọn dịch vụ ",
              },
            ]}
          />
          <ProFormSwitch
            name="verified"
            label="Xác thực Email"
            // defaultChecked={data.verified}
            initialValue={data.verified}
            fieldProps={{
              onChange: (checked) => {
                setSwitchValue(checked);
              },
            }}
          />
        </ProForm.Group>
      </ModalForm>
    </>
  );
}

export default AddEditUser;
