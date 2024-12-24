/* eslint-disable jsx-a11y/alt-text */
import { Button, Drawer, Dropdown, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getListDisplay } from "../../../../Services/lead";
import { EditOutlined, SolutionOutlined } from "@ant-design/icons";
import { PageContainer } from "@ant-design/pro-components";
import EditDisplay from "../../../AddEdit/EditDisplayManager/EditDisplay";
import DetailDisplay from "../../../Details/DetailDisplay/DetailDisplay";

function DisplayProgram(props) {
  const [loading, setLoading] = useState(true);
  const [openDrawer, setOpenDrawer] = useState();
  const [openModal, setOpenModal] = useState();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [currentData, setCurrentData] = useState({});

  const items = [
    {
      label: "APTIS",
      onClick: () => {
        navigate("/adminpage/displayaptis");
      },
    },
    {
      label: "VSTEP",
      onClick: () => {
        navigate("/adminpage/displayVstep");
      },
    },
    {
      label: "IELTS",
      onClick: () => {
        navigate("/adminpage/displayielts");
      },
    },
    {
      label: "TOEIC",
      onClick: () => {
        navigate("/adminpage/displaytoeic");
      },
    },
    {
      label: "Anh ngữ học thuật",
      onClick: () => {
        navigate("/adminpage/displayAcademicEnglish");
      },
    },
  ];

  // getAll
  const handleGetProgram = () => {
    getListDisplay().then((res) => {
      setData(res?.data?.data?.items);
    });
  };

  const dataProgram = data.filter(
    (program) =>
      program.type === "BANNER" ||
      program.type === "VSTEP" ||
      program.type === "APTIS" ||
      program.type === "IELTS" ||
      program.type === "TOEIC" ||
      program.type === "Trang Anh Ngữ Học Thuật"
  );

  useEffect(() => {
    handleGetProgram();
    setLoading(false);
  }, []);

  const columns = [
    {
      title: "Tiêu đề ",
      dataIndex: "title",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (imageURL) => (
        <img
          src={imageURL}
          alt={imageURL}
          style={{ width: "90px", height: "90px" }}
        />
      ),
    },

    {
      title: "Vị trí ảnh",
      dataIndex: "location",
    },
    {
      title: "Loại",
      dataIndex: "type",
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
            className="detail"
            icon={<SolutionOutlined />}
            onClick={() => {
              setOpenDrawer(true);
              navigate(
                `/adminpage/displayprogram/detaildisplayprogram/${record.id}`
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
        title="Tất cả chương trình"
        extra={[
          <Space>
            <div>
              <Button
                className="mr-1 bg-white"
                onClick={() => {
                  navigate("/adminpage/displayBanner");
                }}
              >
                Banner
              </Button>
              <Dropdown menu={{ items }} trigger={["click"]}>
                <Space>
                  <Button> Chương trình anh ngữ</Button>
                </Space>
              </Dropdown>
            </div>
          </Space>,
        ]}
      >
        <EditDisplay
          onSuccess={() => {
            handleGetProgram();
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
        <Drawer
          title="Thông tin chi tiết "
          width={500}
          open={openDrawer}
          onClose={() => {
            setOpenDrawer(false);
          }}
        >
          <DetailDisplay />
        </Drawer>
        <Table
          rowKey={"id"}
          columns={columns}
          dataSource={dataProgram}
          size="middle"
          pagination={{
            pageSize: 5,
          }}
          scroll={{
            y: 413,
          }}
          loading={loading}
        />
      </PageContainer>
    </div>
  );
}

export default DisplayProgram;
