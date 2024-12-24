//aa

import {
  DeleteFilled,
  RollbackOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, Tabs } from "antd";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ColapseContest from "./ColapseContest";
import { AppContext } from "../../Components/AppContext/AppContext";
import ModalGetPathFile from "../../Components/Modal/ModalGetPathFile";
// import { AppContext } from "../../Components/AppContext/AppContext";
function Contest(props) {
  const { data, dispatch } = useContext(AppContext);
  const { nameTest } = data;
  const navigate = useNavigate();
  const handleDeleteData = () => {
    const data = JSON.parse(localStorage.getItem("listContest"));
    localStorage.setItem("listContest", JSON.stringify(null));
    console.log(data);
  };
  const handleCreateExam = () => {
    const data = JSON.parse(localStorage.getItem("listContest"));
    console.log(data);
  };
  const items = [
    {
      key: "1",
      label: (
        <Button
          className="bg-teal-400 font-medium text-white ml-8 "
          onClick={() => navigate("/adminpage/create-question")}
        >
          TẠO PHẦN MỚI
        </Button>
      ),
      //   children:(),
    },
    {
      key: "2",
      label: (
        <Button className="bg-teal-400 font-medium text-white uppercase ">
          Lưu bài thi
        </Button>
      ),
      children: (
        <>
          <ColapseContest />
        </>
      ),
    },
    {
      key: "3",
      label: (
        <Button
          className="bg-orange-500 font-medium text-white ml-8 "
          onClick={() => navigate("/adminpage/infor-exam")}
          icon={<RollbackOutlined />}
        >
          QUAY LẠI
        </Button>
      ),
    },

    {
      key: "5",
      label: (
        <Popconfirm
          placement="bottom"
          title={"Bạn có chắc chắn muốn hủy bài thi này"}
          description={
            "Nếu bạn đồng ý mọi dữ liệu được tạo trước đó đều bị xóa mất và không thể khôi phục lại"
          }
          onConfirm={handleDeleteData}
          okText="Yes"
          cancelText="No"
        >
          <Button
            className="bg-red-600 font-medium uppercase text-white "
            //   onClick={() => navigate("/adminpage/mocktest")}
            icon={<DeleteFilled />}
          >
            hủy bài thi
          </Button>
        </Popconfirm>
      ),
    },
    {
      key: "4",
      label: (
        <Button
          onClick={() => dispatch({ type: "openModalGetPathFile" })}
          className="bg-orange-500 font-medium text-white ml-8 uppercase"
        >
          lấy đường dẫn file{" "}
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Tabs defaultValue={2} items={items} />
      <ModalGetPathFile />
    </div>
  );
}

export default Contest;
