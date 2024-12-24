import {
  CloseOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  FilterOutlined,
  ImportOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import {
  Button,
  Drawer,
  Modal,
  Popover,
  Space,
  Table,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import { PageContainer, ProFormUploadButton } from "@ant-design/pro-components";
import { useNavigate } from "react-router-dom";
import FilterUser from "../../../FormFilter/FilterUser";
import { utils, writeFileXLSX } from "xlsx";
import {
  delAllUser,
  deleteUser,
  filterCustomer,
} from "../../../../Services/lead";
import AddEditUser from "../../../AddEdit/AddEditUser/AddEditUser";
import DetailUser from "../../../Details/DetailUser/DetailUser";
import Cookies from "js-cookie";
import "./styles.css";

function TableCustomer(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dataCustomer, setDataCustomer] = useState([]);
  const [currentData, setCurrentData] = useState({});
  const [openDrawer, setOpenDrawer] = useState();
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState();
  const [total, setTotal] = useState();
  const navigate = useNavigate();
  const { confirm } = Modal;
  const token = Cookies.get("token");

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const showhowConfirm = () => {
    confirm({
      title: "Xoá người dùng ",
      content:
        "Việc này sẽ xóa người dùng được chọn. Bạn có chắc chắn muốn xóa?",
      onOk: handleDeleteAll,
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const hide = () => {
    setClicked(false);
  };

  const handleClick = (open) => {
    setClicked(open);
  };

  const renameColumn = dataCustomer.map((item) => ({
    "Tên khách hàng": item.name,
    "Tên đăng nhập": item.username,
    "Số điện thoại": item.phone,
    Email: item.email,
    "Địa chỉ": item.address,
    "Ngày tạo": item.createdDate,
    "Ngày cập nhật": item.updateDate,
  }));

  const hanldeExportFile = () => {
    const ws = utils.json_to_sheet(renameColumn);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Khách hàng");
    writeFileXLSX(wb, "Danh sách khách hàng.xlsx");
  };

  const getCustomer = (values) => {
    filterCustomer(values).then((res) => {
      const data = res.data?.data?.items;
      const sortedData = data.sort((a, b) => b.userId - a.userId);
      setDataCustomer(sortedData);
      setTotal(res?.data?.data?.total);
    });
  };

  // Hàm xóa từng người dùng
  const handleDelete = (userId) => {
    deleteUser(userId).then((res) => {
      if (res.status === 200) {
        getCustomer();
      }
    });
  };

  // Khi select sẽ hiện thị chọn bao nhiêu
  const hasSelected = selectedRowKeys.length > 0;
  const handleDeleteAll = () => {
    delAllUser(selectedRowKeys)
      .then((res) => {
        if (res?.data?.success === true) {
          getCustomer();
          setSelectedRowKeys([]);
        }
      })
      .catch((error) => {
        console.error("Lỗi xóa người dùng", error);
      });
  };

  // Hàm lọc
  const handleFilter = (values) => {
    filterCustomer(values).then((res) => {
      if (res?.status === 200) {
        setDataCustomer(res?.data?.data?.items);
      }
    });
  };

  useEffect(() => {
    getCustomer();
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
              setCurrentData(record);
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
              setOpenDrawer(true);
              navigate(`/adminpage/customer/detailcustomer/${record.userId}`);
            }}
          ></Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <PageContainer
        title={`Tất cả khách hàng:  ${total} khách hàng`}
        extra={[
          <div className="flex">
            <Button
              className="bg-1677ff text-white hover:bg-white mr-[10px]"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              + Thêm khách hàng
            </Button>
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
              <Button className="border-1677ff text-1677ff mr-[10px]">
                <FilterOutlined />
                Lọc
              </Button>
            </Popover>

            <Button
              icon={<DownloadOutlined />}
              onClick={hanldeExportFile}
              className="border-1677ff text-1677ff mr-[10px]"
            >
              Export Excel
            </Button>
            <Button
              onClick={() => {
                navigate("/adminpage/verifiedCustomer");
              }}
              className="border-1677ff text-1677ff mr-[10px]"
            >
              Khách hàng đã xác thực
            </Button>
            <ProFormUploadButton
              className="border-1677ff text-1677ff"
              icon={<ImportOutlined />}
              title="Import file"
              name="file"
              fieldProps={{
                multiple: false,
                showUploadList: false,
                headers: {
                  Authorization: token ? `Bearer ${token}` : undefined,
                },
                onChange: (file) => {
                  console.log(file);
                  const { response, status } = file.file;
                  if (response?.success) {
                    notification.success({
                      message: `Upload ${file.file.name} thành công`,
                    });
                    // handleGetCustomer();
                    getCustomer();
                  } else if (response?.success === false) {
                    notification.open({
                      message: "Lỗi khi tải file",
                      description: "Click vào để xem chi tiết lỗi",
                      duration: 0,
                      btn: (
                        <Space>
                          <Button
                            type="primary"
                            size="small"
                            onClick={() => {
                              const downloadLink = document.createElement("a");
                              downloadLink.href = `${response?.error?.message}`;
                              downloadLink.click();
                            }}
                          >
                            Xem chi tiết
                          </Button>
                        </Space>
                      ),
                    });
                  }
                },
              }}
              action="https://service.edustar.com.vn/excel/import"
            />
          </div>,
        ]}
      >
        <AddEditUser
          onSuccess={() => {
            getCustomer();
            setOpenModal(false);
          }}
          openModal={openModal}
          onOpenChange={(open) => {
            if (!open) {
              setOpenModal(false);
              setCurrentData({});
            }
          }}
          data={currentData}
        />
        <Drawer
          title="Thông tin chi tiết khách hàng"
          width={550}
          open={openDrawer}
          onClose={() => {
            setOpenDrawer(false);
            navigate("/adminpage/customer");
          }}
        >
          <DetailUser />
        </Drawer>

        <Table
          rowKey={"userId"}
          columns={columns}
          dataSource={dataCustomer}
          size="middle"
          rowSelection={rowSelection}
          pagination={{
            pageSize: 6,
          }}
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

export default TableCustomer;
