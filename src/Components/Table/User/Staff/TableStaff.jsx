import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  FilterOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Input, Modal, Popover, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { PageContainer } from "@ant-design/pro-components";
import { useNavigate } from "react-router-dom";
import FilterUser from "../../../FormFilter/FilterUser";
import {
  delAllUser,
  deleteUser,
  filterStaff,
  getListUser,
} from "../../../../Services/lead";
import DetailUser from "../../../Details/DetailUser/DetailUser";
import AddEditUser from "../../../AddEdit/AddEditUser/AddEditUser";

function TableStaff(props) {
  const [loading, setLoading] = useState(true);
  const [openDrawer, setOpenDrawer] = useState();
  const [openModal, setOpenModal] = useState();
  const [searchData, setSearchData] = useState();
  const [currentStaff, setCurrentStaff] = useState({});
  const [total, setTotal] = useState();
  const [dataStaff, setDataStaff] = useState([]);
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  const { confirm } = Modal;

  const hide = () => {
    setClicked(false);
  };

  const handleClick = (open) => {
    setClicked(open);
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const showhowConfirm = () => {
    confirm({
      title: "Xoá nhân viên ",
      content:
        "Việc này sẽ xóa nhân viên được chọn. Bạn có chắc chắn muốn xóa?",
      onOk: handleDeleteAll,
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  // getAll

  const getStaff = (values) => {
    filterStaff(values).then((res) => {
      const data = res.data?.data?.items;
      const sortedData = data.sort((a, b) => b.userId - a.userId);
      setDataStaff(sortedData);
      setTotal(res?.data?.data?.total);
    });
  };

  const handleDelete = (userId) => {
    deleteUser(userId).then((res) => {
      if (res.status === 200) {
        getStaff();
      }
    });
  };

  // Khi select sẽ hiện thị chọn bao nhiêu
  const hasSelected = selectedRowKeys.length > 0;
  const handleDeleteAll = () => {
    delAllUser(selectedRowKeys).then((res) => {
      if (res?.data?.success === true) {
        getStaff();
        setSelectedRowKeys([]);
      }
    });
  };

  const handleSearch = (e) => {
    setSearchData(e.target.value);
  };

  const handleSearchStaff = (values) => {
    filterStaff({
      username: values,
      name: values,
    }).then((res) => {
      if (res.status === 200) {
        setDataStaff(res?.data?.data?.items);
      }
    });
  };
  // Lọc
  const handleFilter = (values) => {
    console.log("values:: ", values);
    filterStaff(values).then((res) => {
      console.log("res", res);
      if (res?.status === 200) {
        setDataStaff(res?.data?.data?.items);
      }
    });
  };

  useEffect(() => {
    getStaff();
    setLoading(false);
  }, []);

  const columns = [
    {
      title: "Tên người dùng ",
      dataIndex: "name",
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },

    {
      title: "Email",
      dataIndex: "email",
    },

    {
      title: "Vai trò",
      dataIndex: ["role", "name"],
    },

    {
      title: "Action",
      key: "action",
      render: (e, record, idx) => (
        <Space>
          <Button
            className="update"
            icon={<EditOutlined />}
            onClick={() => {
              setCurrentStaff(record);
              setOpenModal(true);
            }}
          ></Button>
          <Button
            className="delete"
            icon={<DeleteOutlined />}
            onClick={() => {
              handleDelete(record.userId);
            }}
          ></Button>
          <Button
            className="detail"
            icon={<SolutionOutlined />}
            onClick={() => {
              console.log("drawer");
              setOpenDrawer(true);
              navigate(`/adminpage/staff/detailstaff/${record.userId}`);
            }}
          ></Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <PageContainer
        title={`Tất cả nhân viên:  ${total} nhân viên`}
        extra={[
          <Space>
            <Input.Search
              placeholder="Nhập tên người dùng"
              onChange={handleSearch}
              value={searchData}
              onSearch={(values) => handleSearchStaff(values)}
            />
            ,
            <Popover
              content={
                <FilterUser
                  onSearch={(values) => {
                    handleFilter(values);
                  }}
                  hide={hide}
                />
              }
              trigger="click"
              open={clicked}
              onOpenChange={handleClick}
            >
              <Button className="border-1677ff text-1677ff">
                <FilterOutlined />
                Lọc
              </Button>
            </Popover>
          </Space>,
        ]}
      >
        <AddEditUser
          onSuccess={() => {
            getStaff();
            setOpenModal(false);
          }}
          openModal={openModal}
          onOpenChange={(open) => {
            if (!open) {
              setOpenModal(false);
              setCurrentStaff({});
            }
          }}
          data={currentStaff}
        />
        <Drawer
          title="Thông tin chi tiết của nhân viên"
          width={500}
          open={openDrawer}
          onClose={() => {
            setOpenDrawer(false);
            navigate("/adminpage/staff");
          }}
        >
          <DetailUser />
        </Drawer>
        <Table
          rowKey={"userId"}
          columns={columns}
          dataSource={dataStaff}
          size="middle"
          rowSelection={rowSelection}
          // pagination={{
          //   pageSize: 50,
          // }}
          scroll={{
            y: 413,
          }}
          loading={loading}
        />
        <div
          className="absolute bottom-6"
          style={{ display: hasSelected ? "block" : "none" }}
        >
          <>Đã chọn {selectedRowKeys.length}</>
          <Button
            className="bg-white ml-2.5 py-1 px-2.5"
            onClick={() => {
              showhowConfirm();
            }}
            disabled={selectedRowKeys.length === 0}
          >
            <CloseOutlined />
            Xoá
          </Button>
        </div>
      </PageContainer>
    </div>
  );
}

export default TableStaff;
