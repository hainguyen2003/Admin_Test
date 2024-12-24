import { PageContainer } from "@ant-design/pro-components";
import { Button, Drawer, Input, Modal, Popover, Space, Table, Tag } from "antd";
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


function TableAdmissions(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataAdmission, setDataAdmission] = useState([]);
  const [openModal, setOpenModal] = useState();
  const [currentAdmission, setCurrentAdmission] = useState({});
  const [openDrawer, setOpenDrawer] = useState();
  const [searchData, setSearchData] = useState();
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

  const showhowConfirm = () => {
    confirm({
      title: "Xoá chương trình ",
      content: "Việc này sẽ xóa chương trình được chọn. Bạn có chắc chắn muốn xóa?",
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

  // Hàm lấy thông tin Tin Tức
  const handleGetAdmission = () => {
    setLoading(true);
    getListAdmissions().then((res) => {
      setDataAdmission(res?.data?.data?.items);
    });
  };

  // delete each admission
  const handleDelAdmission = (id) => {
    deleteAdmission(id).then((res) => {
      if (res.status === 200) {
        handleGetAdmission();
      }
    });
  };
  const hasSelected = selectedRowKeys.length > 0;
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

  // Hàm lọc người dùng
  const handleFilter = (values) => {
    console.log("values:: ", values);
    filterAdmissions(values).then((res) => {
      console.log("res", res);
      if (res?.status === 200) {
        setDataAdmission(res?.data?.data?.items);
      }
    });
  };

  useEffect(() => {
    handleGetAdmission();
    setLoading(false);
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
        <img
          src={imageURL}
          alt={imageURL}
          style={{ width: "150px", height: "150px" }}
        />
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
      render: (e, record, idx) => (
        <Space>
          <Button
            className="update"
            icon={<EditOutlined />}
            onClick={() => {
              setCurrentAdmission(record);
              setOpenModal(true);
            }}
          ></Button>
          <Button
            className="delete"
            icon={<DeleteOutlined />}
            onClick={() => {
              handleDelAdmission(record.id);
            }}
          ></Button>
          <Button
            className="detail"
            icon={<SolutionOutlined />}
            onClick={() => {
              setOpenDrawer(true);
              navigate(`/adminpage/admissions/detailadmission/${record.id}`);
            }}
          ></Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <PageContainer
        title="Chương trình"
        extra={[
          <Space>
            <Button
              className="bg-1677ff text-white hover:bg-white"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              + Thêm chương trình
            </Button>
            ,
            <Input.Search
              placeholder="Nhập tiêu đề chương trình"
              onChange={handleSearch}
              value={searchData}
              defaultValue={null}
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
        {/* Hàm tạo + Edit */}
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
            pageSize: 3,
          }}
          scroll={{
            y: 413,
          }}
          // loading={loading}
        />
        <Drawer
          title="Thông tin chi tiết chương trình "
          width={1000}
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

export default TableAdmissions;
