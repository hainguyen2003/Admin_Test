import React, { useEffect, useState } from "react";
import { UserOutlined, LogoutOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Drawer, Dropdown, Modal, Space } from "antd";
import { useNavigate } from "react-router-dom";
import RecordUser from "../../Components/RecordUser/RecordUser";
import Cookies from "js-cookie";
import { getProfileUser } from "../../Services/lead";
import ChangePassword from "../../Components/Modal/ChangePassword";

function HeaderEtest(props) {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu

  const handleGetProfileUser = () => {
    setLoading(true);
    getProfileUser().then((res) => {
      setData(res?.data?.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    handleGetProfileUser();
  }, []);

  const checkPermission = data?.role?.roleId === "ADMIN";

  const items = [
    {
      icon: <UserOutlined />,
      label: "Hồ sơ",
      key: "1",
      onClick: () => {
        setOpenDrawer(true);
        navigate("/adminpage/user/recorduser");
      },
    },
    {
      icon: <EditOutlined />,
      label: "Đổi mật khẩu",
      key: "2",
      onClick: () => {
        setOpenModal(true);
        navigate("/adminpage/user/changePassword");
      },
    },
    {
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      key: "3",
      onClick: () => {
        Cookies.remove("jwt");
        navigate("/");
      },
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-between ">
      <h1 className="font-sans text-xl font-medium pt-2 ">{`Xin chào ${
        checkPermission ? "ADMIN" : "STAFF"
      } 👋🏼`}</h1>
      <div>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <Space>
            <Avatar
              style={{ backgroundColor: "#1677FF" }}
              icon={<UserOutlined />}
            />
            {`${checkPermission ? "ADMIN" : "STAFF"}`}
          </Space>
        </Dropdown>
        <Modal
          open={openModal}
          footer={null}
          onCancel={() => {
            setOpenModal(false);
            navigate("/adminpage/user");
          }}
        >
          <ChangePassword
            onCancel={(open) => {
              if (!open) {
                setOpenModal(false);
              }
            }}
          />
        </Modal>

        <Drawer
          title="Thông tin chi tiết của người dùng"
          width={500}
          open={openDrawer}
          onClose={() => {
            setOpenDrawer(false);
            navigate("/adminpage/user");
          }}
        >
          <RecordUser />
        </Drawer>
      </div>
    </div>
  );
}

export default HeaderEtest;
