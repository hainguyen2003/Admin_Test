import { PageContainer } from "@ant-design/pro-components";
import { Button, Input, Modal, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import {
  SolutionOutlined,
  CloseOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { getClass, deleteClass } from "../../Services/lead"; // Import hàm gọi API
import DetailClass from "../Details/DetailClass/DetailClass";
import AddEditClass from "../AddEdit/AddEditClass/AddEditClass";

function TableClass() {
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]); // Dữ liệu từ API
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [openModal, setOpenModal] = useState(false); // Modal thêm lớp
  const [currentData, setCurrentData] = useState({}); // Dữ liệu lớp học hiện tại
  const [showDetail, setShowDetail] = useState(false); // Hiển thị chi tiết lớp học
  const [detailClassData, setDetailClassData] = useState({}); // Dữ liệu chi tiết lớp học
  const [data, setData] = useState();
  const { confirm } = Modal;

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const handleGetClasses = () => {
    getClass().then((res) => {
      setData(res?.data?.data?.items);
      console.log("API Response:", res);
    });
  };
  const handleDelete = (id) => {
    deleteClass(id).then((res) => {
      if (res.status === 200) {
        handleGetClasses();
      }
    });
  };

  useEffect(() => {
    handleGetClasses();
    setLoading(false);
  }, []);

  const handleShowDetail = (classData) => {
    setDetailClassData(classData);
    setShowDetail(true);
  };

  const columns = [
    {
      title: "Mã lớp học",
      dataIndex: "classId",
      key: "classId",
    },
    {
      title: "Tên lớp học",
      dataIndex: "className",
      key: "className",
    },
    {
      title: "Giảng viên",
      dataIndex: "teacherName",
      key: "teacherName",
    },
    {
      title: "Thời gian học",
      dataIndex: "schedule",
      key: "schedule",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space>
          <Button
            type="primary"
            icon={<SolutionOutlined />}
            title="Xem danh sách"
            onClick={() => handleShowDetail(record)}
          />
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
              Modal.confirm({
                title: `Bạn muốn xóa đơn hàng ${record.className} này không?`,
                okText: "Xác nhận",
                cancelText: "Hủy",
                onOk: () => handleDelete(record.id),
                onCancel: () => console.log("Hủy xóa"),
              });
            }}
          ></Button>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      title={`Danh sách lớp học`}
      extra={[
        <Space key="extra-buttons">
          <Button
            className="bg-1677ff text-white hover:bg-white"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            + Thêm lớp học
          </Button>
          ,
          <Input.Search
            placeholder="Nhập mã hoặc tên lớp học"
            onChange={(e) => setSearchData(e.target.value)}
            onSearch={(value) => {
              if (Array.isArray(classes)) {
                const filteredClasses = classes.filter(
                  (cls) =>
                    cls.className.toLowerCase().includes(value.toLowerCase()) ||
                    cls.classId.toLowerCase().includes(value.toLowerCase())
                );
                setClasses(filteredClasses);
              } else {
                console.error("classes không phải là một mảng:", classes);
              }
            }}
          />
        </Space>,
      ]}
    >
      {/* Thêm + cập nhật lớp học */}
      <AddEditClass
        onSuccess={() => {
          handleGetClasses();
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
      <Table
        rowKey={"id"}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        size="middle"
        pagination={{
          pageSize: 5,
        }}
      />
      {showDetail && (
        <DetailClass
          classData={detailClassData}
          onClose={() => setShowDetail(false)}
        />
      )}

      <div
        className="absolute bottom-6"
        style={{ display: selectedRowKeys.length > 0 ? "block" : "none" }}
      >
        <>Đã chọn {selectedRowKeys.length} lớp học</>
        <Button
          className="bg-white ml-2.5 py-1 px-2.5"
          onClick={() => {
            confirm({
              title: "Xóa lớp học",
              content: "Bạn có chắc chắn muốn xóa các lớp học đã chọn?",
              onOk: () => {
                console.log("Xóa các lớp học: ", selectedRowKeys);
              },
              onCancel: () => {
                console.log("Hủy xóa");
              },
            });
          }}
        >
          <CloseOutlined /> Xóa
        </Button>
      </div>
    </PageContainer>
  );
}

export default TableClass;
