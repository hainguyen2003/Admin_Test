/* eslint-disable jsx-a11y/alt-text */
import { PageContainer } from "@ant-design/pro-components";
import { Button, Drawer, Input, Modal, Popover, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  FilterOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import {
  delAllDocument,
  deleteDocument,
  filterDocument,
  getListDocument,
} from "../../../Services/lead";
import AddEditDocument from "../../AddEdit/AddEditDocument/AddEditDocument";
import DetailDoc from "../../Details/DetailDoc/DetailDoc";
import FilterDocument from "../../FormFilter/FilterDoc";

function Document(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentData, setCurrentData] = useState();
  const [openDrawer, setOpenDrawer] = useState();
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState();
  const [searchData, setSearchData] = useState();
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState();
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
      title: "Xóa tài liệu",
      content: "Việc này sẽ xóa tài liệu được chọn. Bạn có chắc chắn muốn xóa?",
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

  const handleGetDocument = () => {
    getListDocument().then((res) => {
      setData(res?.data?.data?.items);
    });
  };

  const handleDelete = (id) => {
    deleteDocument(id).then((res) => {
      if (res.status === 200) {
        handleGetDocument();
      }
    });
  };

  const hasSelected = selectedRowKeys.length > 0;
  const handleDeleteAll = () => {
    delAllDocument(selectedRowKeys)
      .then((res) => {
        if (res?.data?.success === true) {
          handleGetDocument();
          setSelectedRowKeys([]);
        }
      })
      .catch((err) => {
        console.error("Lỗi trong quá trình xóa người dùng", err);
      });
  };

  const handleSearch = (values) => {
    console.log("values:: ", values);
    filterDocument({
      name: values,
    }).then((res) => {
      if (res.status === 200) {
        setData(res?.data?.data?.items);
      }
    });
  };
  // Hàm lọc người dùng
  const handleFilter = (values) => {
    filterDocument(values).then((res) => {
      if (res.status === 200) {
        setData(res?.data?.data?.items);
      }
    });
  };

  useEffect(() => {
    handleGetDocument();
    setLoading(false);
  }, []);

  const columns = [
    {
      title: "Tên tài liệu",
      dataIndex: "name",
    },

    {
      title: "Ảnh ",
      dataIndex: "image",
      render: (imageUrl) => (
        <img
          src={imageUrl}
          alt={imageUrl}
          style={{ width: "100px", height: "100px" }}
        />
      ),
    },
    {
      title: "Trạng thái ",
      dataIndex: "status",
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
              setCurrentData(record);
              setOpenModal(true);
            }}
          ></Button>
          <Button
            className="delete"
            icon={<DeleteOutlined />}
            onClick={() => {
              handleDelete(record.id);
            }}
          ></Button>
          <Button
            className="detail"
            icon={<SolutionOutlined />}
            onClick={() => {
              setOpenDrawer(true);
              navigate(`/adminpage/document/detaildoc/${record.id}`);
            }}
          ></Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <PageContainer
        title="Tài liệu"
        extra={[
          <Space>
            <Button
              className="bg-1677ff text-white hover:bg-white"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              + Thêm tài liệu
            </Button>
            ,
            <Input.Search
              placeholder="Nhập tên tài liệu"
              value={searchData}
              onChange={(e) => {
                setSearchData(e.target.value);
              }}
              onSearch={(values) => {
                handleSearch(values);
              }}
            />
            ,{/* Thay đổi content */}
            <Popover
              content={
                <FilterDocument
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
        {/* Thêm + cập nhật nguời dùng */}
        <AddEditDocument
          onSuccess={() => {
            handleGetDocument();
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

        {/* Hiển thị thông tin chi tiết của người dùng  */}
        <Drawer
          title="Thông tin chi tiết về tài liệu"
          width={550}
          open={openDrawer}
          onClose={() => {
            navigate("/adminpage/document");
            setOpenDrawer(false);
          }}
        >
          <DetailDoc />
        </Drawer>
        <Table
          rowKey={"id"}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          size="middle"
          pagination={{
            pageSize: 3,
          }}
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

export default Document;
