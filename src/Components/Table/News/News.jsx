import { PageContainer } from "@ant-design/pro-components";
import {
  Button,
  Drawer,
  Input,
  Modal,
  Popover,
  Space,
  Table,
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
import AddEditNews from "../../AddEdit/AddEditNews/AddEditNews";
import {
  delAllNews,
  deleteNews,
  filterNews,
  getListNews,
} from "../../../Services/lead";
import DetailNews from "../../Details/DetailNews/DetailNews";
import FilterNews from "../../FormFilter/FilterNews";

function TableNews() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataNews, setDataNews] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentNews, setCurrentNews] = useState({});
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
      title: "Xoá tin tức",
      content: "Việc này sẽ xóa tin tức được chọn. Bạn có chắc chắn muốn xóa?",
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

  const handleGetNews = () => {
    setLoading(true);
    getListNews().then((res) => {
      setDataNews(res?.data?.data?.items || []);
      setLoading(false);
    });
  };

  const handleDelNews = (id) => {
    deleteNews(id).then((res) => {
      if (res.status === 200) {
        handleGetNews();
      }
    });
  };

  const handleDeleteAll = () => {
    delAllNews(selectedRowKeys)
      .then((res) => {
        if (res?.data?.success === true) {
          handleGetNews();
          setSelectedRowKeys([]);
        }
      })
      .catch((error) => {
        console.error("Lỗi xóa tin tức", error);
      });
  };

  const handleSearch = (e) => {
    setSearchData(e.target.value);
  };

  const handleSearchNews = (values) => {
    filterNews({
      username: values,
      name: values,
    }).then((res) => {
      if (res.status === 200) {
        setDataNews(res?.data?.data?.items);
      }
    });
  };

  const handleFilter = (values) => {
    filterNews(values).then((res) => {
      if (res?.status === 200) {
        setDataNews(res?.data?.data?.items);
      }
    });
  };

  useEffect(() => {
    handleGetNews();
  }, []);

  const columns = [
    {
      title: "Tên tin tức",
      dataIndex: "name",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (imageURL) => (
        <div style={{ textAlign: "center" }}>
          <img
            src={imageURL || "https://via.placeholder.com/120"}
            alt="News Image"
            style={{
              width: "120px",
              height: "120px",
              objectFit: "cover",
              borderRadius: "8px",
              border: "1px solid #d9d9d9",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
            onError={(e) => (e.target.src = "https://via.placeholder.com/120")}
          />
        </div>
      ),
    },
    {
      title: "Nội dung",
      dataIndex: "description",
      ellipsis: true,
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
                setCurrentNews(record);
                setOpenModal(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              className="delete"
              icon={<DeleteOutlined />}
              onClick={() => {
                handleDelNews(record.id);
              }}
            />
          </Tooltip>
          <Tooltip title="Chi tiết">
            <Button
              className="detail"
              icon={<SolutionOutlined />}
              onClick={() => {
                setOpenDrawer(true);
                navigate(`/adminpage/news/detailnews/${record.id}`);
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
        title="Tin tức"
        extra={[
          <Space key="header-actions">
            <Button
              className="bg-1677ff text-white hover:bg-white"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              + Thêm tin tức
            </Button>
            <Input.Search
              placeholder="Nhập tên tin tức"
              onChange={handleSearch}
              value={searchData}
              onSearch={(values) => {
                handleSearchNews(values);
              }}
            />
            <Popover
              content={
                <FilterNews
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
        <AddEditNews
          onSuccess={() => {
            handleGetNews();
            setOpenModal(false);
          }}
          openModal={openModal}
          onOpenChange={(open) => {
            if (!open) {
              setOpenModal(false);
              setCurrentNews({});
            }
          }}
          data={currentNews}
        />
        <Table
          rowKey={"id"}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataNews}
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
          title="Thông tin chi tiết tin tức"
          width={800}
          open={openDrawer}
          onClose={() => {
            navigate("/adminpage/news");
            setOpenDrawer(false);
          }}
        >
          <DetailNews />
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

export default TableNews;
