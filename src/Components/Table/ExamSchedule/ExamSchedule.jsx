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
import { dataSourceES } from "../DataDemo";
import AddEditES from "../../AddEdit/AddEditES/AddEditES";
import {
  delAllES,
  deleteES,
  filterES,
  getListES,
} from "../../../Services/lead";
import DetailES from "../../Details/DetailES/DetailES";
import FilterES from "../../FormFilter/FilterES";

function ExamSchedule(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState();
  const [openDrawer, setOpenDrawer] = useState();
  const [clicked, setClicked] = useState(false);
  const [dataES, setDataES] = useState([]);
  const [currentData, setCurrentData] = useState({});
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
      title: "Xoá lịch thi ",
      content: "Việc này sẽ xóa lịch thi được chọn. Bạn có chắc chắn muốn xóa?",
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

  const handleGetES = () => {
    getListES()
      .then((res) => {
        setDataES(res?.data?.data?.items);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    deleteES(id).then((res) => {
      if (res.status === 200) handleGetES();
    });
  };

  const hasSelected = selectedRowKeys.length > 0;
  const handleDeleteAll = () => {
    delAllES(selectedRowKeys)
      .then((res) => {
        if (res?.data?.success === true) {
          handleGetES();
          setSelectedRowKeys([]);
        }
      })
      .catch((err) => {
        console.log("Lỗi trong quá trình xóa");
      });
  };

  const handleFilter = (values) => {
    filterES(values).then((res) => {
      if (res.status === 200) {
        setDataES(res?.data?.data?.items);
      }
    });
  };

  useEffect(() => {
    handleGetES();
  }, []);

  const columns = [
    {
      title: "Tên khu vực",
      dataIndex: "nameArea",
    },
    {
      title: "Tên trường thi ",
      dataIndex: "nameExamSchool",
    },
    {
      title: "Thời gian thi ",
      dataIndex: "examTime",
    },
    {
      title: "Hạn đăng ký",
      dataIndex: "registrationTerm",
    },

    {
      title: "Hình thức thi",
      dataIndex: "examMethod",
    },
    {
      title: "Đối tượng thi",
      dataIndex: "examinationObject",
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
              setOpenModal(true);
              setCurrentData(record);
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
                `/adminpage/examschedule/detailexamschedule/${record.id}`
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
        title="Lịch Thi"
        extra={[
          <Space>
            <Button
              className="bg-1677ff text-white hover:bg-white"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              + Thêm lịch thi
            </Button>
            ,
            <Popover
              content={
                <FilterES
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
        <AddEditES
          onSuccess={() => {
            handleGetES();
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
          title="Thông tin chi tiết về lịch thi"
          width={550}
          open={openDrawer}
          onClose={() => {
            setOpenDrawer(false);
          }}
        >
          <DetailES />
        </Drawer>
        <Table
          rowKey={"id"}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataES}
          size="middle"
          pagination={{
            pageSize: 10,
          }}
          scroll={{
            y: 413,
          }}
          // loading={loading}
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

export default ExamSchedule;
