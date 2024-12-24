import {
  EditOutlined,
  FilterOutlined,
  SolutionOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { PageContainer } from "@ant-design/pro-components";
import { Button, Drawer, Input, Popover, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import AddEditEp from "../../AddEdit/AddEditEP/AddEditEp";
import { filterService, getListService } from "../../../Services/lead";
import { useNavigate } from "react-router-dom";
import DetailEdu from "../../Details/DetailEdu/DetailEdu";
import FilterService from "../../FormFilter/FilterEdu";

function EduProgram(props) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [currentEP, setCurrentEP] = useState({});
  const [clicked, setClicked] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const hide = () => {
    setClicked(false);
  };

  const handleClick = (open) => {
    setClicked(open);
  };

  // Lấy toàn bộ chương trình
  const handleGetEP = () => {
    getListService().then((res) => {
      setData(res?.data?.data?.items || []);
    });
  };

  // Lọc chương trình
  const dataED = data.filter(
    (Edu) =>
      Edu.typeOfService === "EDUCATION_PROGRAM" ||
      Edu.typeOfService === "COURSE"
  );

  const handleSearch = (e) => {
    setSearchData(e.target.value);
  };

  const handleSearchEdu = (values) => {
    filterService({ name: values }).then((res) => {
      if (res.status === 200) {
        setData(res?.data?.data?.items || []);
      }
    });
  };

  // Lọc nâng cao
  const handleFilter = (values) => {
    filterService(values).then((res) => {
      if (res?.status === 200) {
        setData(res?.data?.data?.items || []);
      }
    });
  };

  useEffect(() => {
    handleGetEP();
  }, []);

  const columns = [
    {
      title: "Tên chương trình học",
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
      render: (e, record) => (
        <Space>
          <Button
            className="update"
            icon={<EditOutlined />}
            onClick={() => {
              setCurrentEP(record);
              setOpenModal(true);
            }}
          />
          <Button
            className="detail"
            icon={<SolutionOutlined />}
            onClick={() => {
              setOpenDrawer(true);
              navigate(`/adminpage/eduprogram/detaileduprogram/${record.id}`);
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <PageContainer
        title="Các chương trình Anh ngữ và tin học"
        extra={[
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setOpenModal(true);
                setCurrentEP({}); // Reset dữ liệu khi thêm mới
              }}
            >
              Thêm chương trình
            </Button>
            <Input.Search
              placeholder="Nhập tên chương trình"
              onChange={handleSearch}
              value={searchData}
              onSearch={(values) => {
                handleSearchEdu(values);
              }}
            />
            <Popover
              content={
                <FilterService
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
        {/* Thêm + cập nhật chương trình */}
        <AddEditEp
          onSuccess={() => {
            handleGetEP(); // Làm mới danh sách sau khi thêm
            setOpenModal(false); // Đóng modal
          }}
          openModal={openModal}
          onOpenChange={(open) => {
            if (!open) {
              setOpenModal(false);
              setCurrentEP({});
            }
          }}
          data={currentEP} // Truyền dữ liệu chỉnh sửa hoặc rỗng khi thêm mới
        />
        <Table
          columns={columns}
          pagination={{
            pageSize: 5,
          }}
          dataSource={dataED}
          size="middle"
        />
        <Drawer
          title="Thông tin chi tiết chương trình học"
          width={600}
          open={openDrawer}
          onClose={() => {
            navigate("/adminpage/eduprogram");
            setOpenDrawer(false);
          }}
        >
          <DetailEdu />
        </Drawer>
      </PageContainer>
    </div>
  );
}

export default EduProgram;
