import {
  CloseOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  FilterOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { PageContainer } from "@ant-design/pro-components";
import { Button, Drawer, Input, Modal, Popover, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import {
  delAllConsultingRegister,
  deleteConsultingRegister,
  filterConsultingRegister,
  getListConsultingRegister,
} from "../../../Services/lead";
import EditConsultingRegister from "../../AddEdit/EditConsultingRegister/EditConsultingRegister";
import DetailConsultingRegister from "../../Details/ConsultingRegister/ConsultingRegister";
import { useNavigate } from "react-router-dom";
import FilterConsultingRegister from "../../FormFilter/FilterConsultingRegister";
import { utils, writeFileXLSX } from "xlsx";

function ConsultingRegister(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentCR, setCurrentCR] = useState({});
  const [openDrawer, setOpenDrawer] = useState();
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState();
  const [clicked, setClicked] = useState(false);
  const [searchData, setSearchData] = useState();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState();

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
      title: "Xoá khách hàng ",
      content:
        "Việc này sẽ xóa khách hàng được chọn. Bạn có chắc chắn muốn xóa?",
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

  const renameColumn = data.map((item) => ({
    "Tên khách hàng": item.name,
    "Số điện thoại": item.phone,
    Email: item.email,
    "Nội dung tư vấn": item.contentAdvice,
    "Trạng thái tư vấn": item.status,
    "Ngày tạo": item.createdDate,
    "Ngày cập nhật": item.updateDate,
  }));

  const hanldeExportFile = () => {
    const ws = utils.json_to_sheet(renameColumn);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Khách hàng");
    writeFileXLSX(wb, "Danh sách khách hàng đăng ký tư vấn.xlsx");
  };

  const handleGetCR = () => {
    getListConsultingRegister().then((res) => {
      const data1 = res.data?.data?.items;
      const sortedData = data1.sort((a, b) => b.id - a.id);
      setData(sortedData);
      setTotal(res?.data?.data?.total);
    });
  };

  const handleDelCR = (id) => {
    deleteConsultingRegister(id).then((res) => {
      if (res.status === 200) {
        handleGetCR();
      }
    });
  };
  const hasSelected = selectedRowKeys.length > 0;
  const handleDeleteAll = () => {
    delAllConsultingRegister(selectedRowKeys)
      .then((res) => {
        if (res?.data?.success === true) {
          handleGetCR();
          setSelectedRowKeys([]);
        }
      })
      .catch((error) => {
        console.error("Lỗi xóa khách hàng", error);
      });
  };

  const handleSearch = (e) => {
    setSearchData(e.target.value);
  };

  const handleSearchConsulting = (values) => {
    filterConsultingRegister({
      name: values,
    }).then((res) => {
      if (res.status === 200) {
        setData(res?.data?.data?.items);
      }
    });
  };

  const handleFilter = (values) => {
    filterConsultingRegister(values).then((res) => {
      if (res?.status === 200) {
        setData(res?.data?.data?.items);
      }
    });
  };

  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Nội dung tư vấn",
      dataIndex: "contentAdvice",
    },
    {
      title: "Trạng thái tư vấn",
      dataIndex: "status",
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
              setCurrentCR(record);
              setOpenModal(true);
            }}
          ></Button>
          <Button
            className="delete"
            icon={<DeleteOutlined />}
            onClick={() => {
              handleDelCR(record.id);
            }}
          ></Button>
          <Button
            className="detail"
            icon={<SolutionOutlined />}
            onClick={() => {
              setOpenDrawer(true);
              navigate(
                `/adminpage/consultingRegister/detailConsultingRegister/${record.id}`
              );
            }}
          ></Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    handleGetCR();
    setLoading(false);
  }, []);
  return (
    <>
      <PageContainer
        title={`Khách hàng đăng ký tư vấn:  ${total} khách hàng`}
        extra={[
          <Space>
            <Input.Search
              placeholder="Nhập tên khách hàng"
              onChange={handleSearch}
              value={searchData}
              defaultValue={""}
              onSearch={(values) => {
                handleSearchConsulting(values);
              }}
            />
            <Button
              icon={<DownloadOutlined />}
              onClick={hanldeExportFile}
              className="border-1677ff text-1677ff mr-[10px]"
            >
              Export Excel
            </Button>
            <Popover
              content={
                <FilterConsultingRegister
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
        <EditConsultingRegister
          onSuccess={() => {
            handleGetCR();
            setOpenModal(false);
          }}
          openModal={openModal}
          onOpenChange={(open) => {
            if (!open) {
              setOpenModal(false);
              setCurrentCR({});
            }
          }}
          data={currentCR}
        />
        <Drawer
          title="Thông tin chi tiết khách hàng"
          width={500}
          open={openDrawer}
          onClose={() => {
            navigate("/adminpage/consultingRegister");
            setOpenDrawer(false);
          }}
        >
          <DetailConsultingRegister />
        </Drawer>
        <Table
          rowKey={"id"}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          size="middle"
          pagination={{
            pageSize: 7,
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
    </>
  );
}

export default ConsultingRegister;

