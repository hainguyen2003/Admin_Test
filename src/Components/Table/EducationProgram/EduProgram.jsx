import {
  EditOutlined,
  FilterOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { PageContainer, useEditableArray } from "@ant-design/pro-components";
import { Button, Drawer, Input, Modal, Popover, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import AddEditEp from "../../AddEdit/AddEditEP/AddEditEp";
import { filterService, getListService } from "../../../Services/lead";
import { useNavigate } from "react-router-dom";
import DetailEdu from "../../Details/DetailEdu/DetailEdu";
import FilterService from "../../FormFilter/FilterEdu";

function EduProgram(props) {
  const [openDrawer, setOpenDrawer] = useState();
  const [searchData, setSearchData] = useState();
  const [currentEP, setCurrentEP] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [openModal, setOpenModal] = useState();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

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
    (Edu) =>
      Edu.typeOfService === "EDUCATION_PROGRAM" ||
      Edu.typeOfService === "COURSE"
  );

  const handleSearch = (e) => {
    setSearchData(e.target.value);
  };

  const handleSearchEdu = (values) => {
    filterService({
      name: values,
    }).then((res) => {
      if (res.status === 200) {
        setData(res?.data?.data?.items);
      }
    });
  };

  // Hàm lọc
  const handleFilter = (values) => {
    console.log("values:: ", values);
    filterService(values).then((res) => {
      console.log("res", res);
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
      render: (e, record, idx) => (
        <Space>
          <Button
            className="update"
            icon={<EditOutlined />}
            onClick={() => {
              setCurrentEP(record);
              setOpenModal(true);
            }}
          ></Button>
          <Button
            className="detail"
            icon={<SolutionOutlined />}
            onClick={() => {
              setOpenDrawer(true);
              navigate(`/adminpage/eduprogram/detaileduprogram/${record.id}`);
            }}
          ></Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <PageContainer
        title="Các chương trình Anh ngữ"
        extra={[
          <Input.Search
            placeholder="Nhập tên chương trình"
            onChange={handleSearch}
            value={searchData}
            onSearch={(values) => {
              handleSearchEdu(values);
            }}
          />,
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
          </Popover>,
        ]}
      >
        {/* Thêm + cập nhật chương trình */}
        <AddEditEp
          onSuccess={() => {
            handleGetEP();
            setOpenModal(false);
          }}
          openModal={openModal}
          onOpenChange={(open) => {
            if (!open) {
              setOpenModal(false);
              setCurrentEP({});
            }
          }}
          data={currentEP}
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
