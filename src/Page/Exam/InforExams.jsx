import { Button, Input, notification } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Components/AppContext/AppContext";
import ModalCreateExamByExcel from "../../Components/Modal/ModalCreateExamByExcel";
import { findExamByName, getDataExam } from "../../Services/APImocktest";
import ListExam from "./ListExam";
import _debounce from "lodash/debounce";
import CollapseExam from "../MockTest/CollapseExam";
import { handleGetAllExam, handleGetDataExam } from "./handleExam";
const { Search } = Input;
function InforExams(props) {
  const navigate = useNavigate();
  const { data, dispatch } = useContext(AppContext);
  const [items, setItems] = useState([]);
  const [isOpenModalExcel, setIsOpenModalExcel] = useState(false);
  const { isUpdateExam } = data;
  const { isOpenModalCreateExamByExcel } = data;
  const onSearch = (value) => {
    findExamByName(value)
      .then((res) => {
        if (
          res?.data?.body?.success === true &&
          res?.data?.body?.data?.total != 0
        ) {
          // console.log(res?.data?.body?.data?.total);
          setItems(res?.data?.body?.data?.items);
        } else {
          notification.error({ message: "Khoong co bai thi nao phu hop" });
          fetchData();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const debouncedSearch = _debounce(onSearch, 500);
  const fetchData = async () => {
    const data = await handleGetAllExam();
    setItems(data);
  };
  useEffect(() => {
    if (isUpdateExam) {
      fetchData();
      dispatch({ type: "setUpdateExam" });
    }
  }, [isUpdateExam]);
  useEffect(() => {
    fetchData();
  }, []);

  const handleTest = async () => {
    const data = await handleGetDataExam();
    console.log("items", items);
  };

  return (
    <div className="px-[5%] bg-white overflow-auto h-[100vh]">
      <div className="grid grid-cols-3 gap-12  pt-10 mb-20">
        {/* <Button onClick={handleTest}>Click</Button> */}
        <Button
          className="uppercase col-span-1 font-medium text-white bg-teal-400 mr-[1%]"
          onClick={() => navigate("/adminpage/contest")}
        >
          Tạo bài thi mới{" "}
        </Button>
        <Button
          className="uppercase col-span-1 font-medium text-white bg-teal-400 mr-[1%]"
          onClick={() => dispatch({ type: "openModalCreateExamByExcel" })}
        >
          tạo bài thi bằng excel
        </Button>
        <Search
          placeholder="Tìm kiếm tên bài thi "
          allowClear
          enterButton="Search"
          className="col-span-1 "
          // size="large"
          onSearch={debouncedSearch}
        />
      </div>
      {/* <CollapseExam dataItems = {items} /> */}
      <ListExam dataItems={items} />
      <ModalCreateExamByExcel isOpenModalExcel={isOpenModalExcel} />
    </div>
  );
}

export default InforExams;
