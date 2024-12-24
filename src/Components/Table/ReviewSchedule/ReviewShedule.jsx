import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  FilterOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { PageContainer, useEditableArray } from "@ant-design/pro-components";
import { Button, Drawer, Input, Modal, Popover, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import FilterEdu from "../../FormFilter/FilterEdu";
import { dataSourceEP } from "../DataDemo";
import {
  delAllService,
  deleteService,
  filterRL,
  getListService,
} from "../../../Services/lead";
import { useNavigate } from "react-router-dom";
import DetailEdu from "../../Details/DetailEdu/DetailEdu";
import FilterReview from "../../FormFilter/FilterReview";
import AddEditReviewSchedule from "../../AddEdit/AddEditReviewSchedule/AddEditReviewSchedule";

function ReviewShedule(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [openDrawer, setOpenDrawer] = useState();
  const [searchData, setSearchData] = useState();
  const [currentRS, setCurrentRS] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [openModal, setOpenModal] = useState();
  const [data, setData] = useState([]);
  const { confirm } = Modal;
  const navigate = useNavigate();

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const showhowConfirm = () => {
    confirm({
      title: "Xoá lịch ôn tập ",
      content:
        "Việc này sẽ xóa lịch ôn tập được chọn. Bạn có chắc chắn muốn xóa?",
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

  // getALl
  const handleGetEP = () => {
    getListService().then((res) => {
      setData(res?.data?.data?.items);
    });
  };

  // Lọc từ bảng service các dữ liệu thuộc EP
  const dataED = data.filter(
    (reviews) => reviews.typeOfService === "REVIEW_LESSON"
  );

  // Hàm xóa từng người dùng
  const handleDelete = (id) => {
    deleteService(id).then((res) => {
      if (res.status === 200) {
        handleGetEP();
      }
    });
  };

  const hasSelected = selectedRowKeys.length > 0;
  const handleDeleteAll = () => {
    delAllService(selectedRowKeys)
      .then((res) => {
        if (res?.data?.success === true) {
          handleGetEP();
          setSelectedRowKeys([]);
        }
      })
      .catch((error) => {
        console.error("Lỗi xóa lịch ôn tập", error);
      });
  };
  const handleSearch = (e) => {
    setSearchData(e.target.value);
  };

  const handleSearchUser = (values) => {
    filterRL({
      name: values,
    }).then((res) => {
      if (res.status === 200) {
        setData(res?.data?.data?.items);
      }
    });
  };

  const handleFilter = (values) => {
    console.log("values:: ", values);
    filterRL(values).then((res) => {
      if (res?.status === 200) {
        setData(res?.data?.data?.items);
      }
    });
  };

  useEffect(() => {
    handleGetEP();
  }, []);

  const columns = [
    {
      title: "Tên Lịch ôn tập",
      dataIndex: "name",
    },
    {
      title: "Lịch học",
      dataIndex: "schedule",
    },
    {
      title: "Số buổi",
      dataIndex: "numberTeachingSessions",
    },

    {
      title: "Hình thức học",
      dataIndex: "learningForm",
    },
    {
      title: "Loại dịch vụ",
      dataIndex: "typeOfService",
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
              setCurrentRS(record);
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
              navigate(
                `/adminpage/reviewschedule/detailreviewschedule/${record.id}`
              );
            }}
          ></Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <PageContainer
        title="Các lịch ôn tập"
        extra={[
          <Button
            className="bg-1677ff text-white hover:bg-white"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            + Thêm lịch
          </Button>,
          <Input.Search
            placeholder="Nhập lịch ôn tập"
            onChange={handleSearch}
            value={searchData}
            onSearch={(values) => {
              handleSearchUser(values);
            }}
          />,
          <Popover
            content={
              <FilterReview
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
          </Popover>,
        ]}
      >
        <AddEditReviewSchedule
          onSuccess={() => {
            handleGetEP();
            setOpenModal(false);
          }}
          openModal={openModal}
          onOpenChange={(open) => {
            if (!open) {
              setOpenModal(false);
              setCurrentRS({});
            }
          }}
          data={currentRS}
        />
        <Table
          rowSelection={rowSelection}
          rowKey={"id"}
          columns={columns}
          pagination={{
            pageSize: 5,
          }}
          dataSource={dataED}
          size="middle"
        />
        <Drawer
          title="Thông tin chi tiết lịch ôn tập"
          width={600}
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          extra={
            <Space>
              <Button onClick={() => setOpenDrawer(false)}>Quay lại</Button>
            </Space>
          }
        >
          <DetailEdu />
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

export default ReviewShedule;
