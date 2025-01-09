import { PageContainer } from "@ant-design/pro-components";
import {
  Button,
  Drawer,
  Input,
  Modal,
  Popover,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  FilterOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import AddEditAdmission from "../../AddEdit/AddEditAdmission/AddEditAdmission";
import {
  delAllAdmissions,
  deleteAdmission,
  filterAdmissions,
  getListAdmissions,
} from "../../../Services/lead";
import FilterAdmissions from "../../FormFilter/FilterAdmission";
import DetailAdmission from "../../Details/DetailAdmission/DetailAdmission";

function TableAdmissions() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataAdmission, setDataAdmission] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentAdmission, setCurrentAdmission] = useState({});
  const [openDrawer, setOpenDrawer] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  const { confirm } = Modal;

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const showConfirm = () => {
    confirm({
      title: "Xoá chương trình",
      content:
        "Việc này sẽ xóa chương trình được chọn. Bạn có chắc chắn muốn xóa?",
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

  const handleGetAdmission = () => {
    setLoading(true);
    getListAdmissions().then((res) => {
      setDataAdmission(res?.data?.data?.items || []);
      setLoading(false);
    });
  };

  const handleDelAdmission = (id) => {
    deleteAdmission(id).then((res) => {
      if (res.status === 200) {
        handleGetAdmission();
      }
    });
  };

  const handleDeleteAll = () => {
    delAllAdmissions(selectedRowKeys)
      .then((res) => {
        if (res?.data?.success === true) {
          handleGetAdmission();
          setSelectedRowKeys([]);
        }
      })
      .catch((error) => {
        console.error("Lỗi xóa chương trình", error);
      });
  };

  const handleSearch = (e) => {
    setSearchData(e.target.value);
  };

  const handleSearchAdmission = (values) => {
    filterAdmissions({
      username: values,
      title: values,
    }).then((res) => {
      if (res.status === 200) {
        setDataAdmission(res?.data?.data?.items);
      }
    });
  };

  const handleFilter = (values) => {
    filterAdmissions(values).then((res) => {
      if (res?.status === 200) {
        setDataAdmission(res?.data?.data?.items);
      }
    });
  };

  useEffect(() => {
    handleGetAdmission();
  }, []);

  const columns = [
    {
      title: "Tiêu đề chương trình",
      dataIndex: "title",
    },
    {
      title: "Chương trình đào tạo",
      dataIndex: "program",
    },
    {
      title: "Mô tả nội dung",
      dataIndex: "description",
      ellipsis: true,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (imageURL) => (
        <div style={{ textAlign: "center" }}>
          <img
            src={imageURL || "https://via.placeholder.com/150"}
            alt="Program Image"
            style={{
              width: "120px",
              height: "120px",
              objectFit: "cover",
              borderRadius: "8px",
              border: "1px solid #d9d9d9",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
            onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
          />
        </div>
      ),
    },
    {
      title: "Link đăng ký",
      dataIndex: "linkRegister",
      ellipsis: true,
    },
    {
      title: "Nội dung",
      dataIndex: "admissionForm",
      ellipsis: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status) =>
        status ? (
          <Tag color="green">Hoạt động</Tag>
        ) : (
          <Tag color="red">Không hoạt động</Tag>
        ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updateDate",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Tooltip title="Chỉnh sửa">
            <Button
              className="update"
              icon={<EditOutlined />}
              onClick={() => {
                setCurrentAdmission(record);
                setOpenModal(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              className="delete"
              icon={<DeleteOutlined />}
              onClick={() => {
                handleDelAdmission(record.id);
              }}
            />
          </Tooltip>
          <Tooltip title="Chi tiết">
            <Button
              className="detail"
              icon={<SolutionOutlined />}
              onClick={() => {
                setOpenDrawer(true);
                navigate(`/adminpage/admissions/detailadmission/${record.id}`);
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <PageContainer
        title="Chương trình"
        extra={[
          <Space key="header-actions">
            <Button
              className="bg-1677ff text-white hover:bg-white"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              + Thêm chương trình
            </Button>
            <Input.Search
              placeholder="Nhập tiêu đề chương trình"
              onChange={handleSearch}
              value={searchData}
              onSearch={(values) => {
                handleSearchAdmission(values);
              }}
            />
            <Popover
              content={
                <FilterAdmissions
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
        <AddEditAdmission
          onSuccess={() => {
            handleGetAdmission();
            setOpenModal(false);
          }}
          openModal={openModal}
          onOpenChange={(open) => {
            if (!open) {
              setOpenModal(false);
              setCurrentAdmission({});
            }
          }}
          data={currentAdmission}
        />
        <Table
          rowKey={"id"}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataAdmission}
          size="middle"
          pagination={{
            pageSize: 5,
          }}
          scroll={{
            y: 400,
          }}
          loading={loading}
        />
        <Drawer
          title="Thông tin chi tiết chương trình"
          width={800}
          open={openDrawer}
          onClose={() => {
            navigate("/adminpage/admissions");
            setOpenDrawer(false);
          }}
        >
          <DetailAdmission />
        </Drawer>
        <div
          className="absolute bottom-6"
          style={{ display: selectedRowKeys.length > 0 ? "block" : "none" }}
        >
          <>Đã chọn {selectedRowKeys.length}</>
          <Button
            className="bg-white ml-2.5 py-1 px-2.5"
            onClick={() => {
              showConfirm();
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

export default TableAdmissions;
