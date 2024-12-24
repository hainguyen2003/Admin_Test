import { PageContainer } from "@ant-design/pro-components";
import { Button, Drawer, Input, Modal, Popover, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CloseOutlined,
  DeleteOutlined,
  DownOutlined,
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

function TableNews(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataNews, setDataNews] = useState([]);
  const [openModal, setOpenModal] = useState();
  const [currentNews, setCurrentNews] = useState({});
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
      title: "Xoá tin tức ",
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

  // Hàm lấy thông tin Tin Tức
  const handleGetNews = () => {
    setLoading(true);
    getListNews().then((res) => {
      setDataNews(res?.data?.data?.items);
    });
  };

  // delete each news
  const handleDelNews = (id) => {
    deleteNews(id).then((res) => {
      if (res.status === 200) {
        handleGetNews();
      }
    });
  };
  const hasSelected = selectedRowKeys.length > 0;
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

  // Hàm lọc người dùng
  const handleFilter = (values) => {
    console.log("values:: ", values);
    filterNews(values).then((res) => {
      console.log("res", res);
      if (res?.status === 200) {
        setDataNews(res?.data?.data?.items);
      }
    });
  };

  useEffect(() => {
    handleGetNews();
    setLoading(false);
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
        <img
          src={imageURL}
          alt={imageURL}
          style={{ width: "150px", height: "150px" }}
        />
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
      render: (e, record, idx) => (
        <Space>
          <Button
            className="update"
            icon={<EditOutlined />}
            onClick={() => {
              setCurrentNews(record);
              setOpenModal(true);
            }}
          ></Button>
          <Button
            className="delete"
            icon={<DeleteOutlined />}
            onClick={() => {
              handleDelNews(record.id);
            }}
          ></Button>
          <Button
            className="detail"
            icon={<SolutionOutlined />}
            onClick={() => {
              setOpenDrawer(true);
              navigate(`/adminpage/news/detailnews/${record.id}`);
            }}
          ></Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <PageContainer
        title="Tin tức"
        extra={[
          <Space>
            <Button
              className="bg-1677ff text-white hover:bg-white"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              + Thêm tin tức
            </Button>
            ,
            <Input.Search
              placeholder="Nhập tên tin tức"
              onChange={handleSearch}
              value={searchData}
              defaultValue={null}
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
        {/* Hàm tạo + Edit */}
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
            pageSize: 3,
          }}
          scroll={{
            y: 413,
          }}
          // loading={loading}
        />
        <Drawer
          title="Thông tin chi tiết tin tức"
          width={600}
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

export default TableNews;
