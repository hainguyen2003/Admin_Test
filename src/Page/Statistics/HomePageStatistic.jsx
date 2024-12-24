import React, { useEffect, useState } from "react";
import { getAllExam, getAllUserResponse } from "../../Services/APImocktest";
import { Button, Dropdown, Input, Space, Table } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
const { Column } = Table;
const { Search } = Input;
function HomePageStatistic(props) {
  const [data, setData] = useState([]);
  const [listExam , setListExam] = useState([])
  const [selectKey, setSelectKey] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    hanldeGetData();
  }, [selectKey]);
  const hanldeGetData = () => {
    if(selectKey ===1 ){

        getAllUserResponse().then((res) => {
          // console.log(res.data.data.items);
          console.log("data in statistic : " , res);
          setData(res?.data?.data?.items);
        });
    }else if(selectKey ===2 ){
        getAllExam()
        .then((res) => {
          console.log("Danh sach cac bai thi la : ",res.data.body.data.items);
          if (res?.data?.body?.success) {
            // setData();
            // notification.success({ message: "Thanh cong " });
            setListExam(res?.data?.body?.data?.items)
            
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  

  const items = [
    {
      label: <p onClick={() => setSelectKey(1)}>Thống kê bài thi</p>,
      key: "results",
    },
    {
      label: <p onClick={() => setSelectKey(2)}>Thống kê đề thi</p>,
      key: "exam",
    },
  ];
  const onSearch = (value) => console.log(value);
//   const handleChangeOption = (a) => {
//     console.log(a);

//     if (a == "results") {
//       hanldeGetData();
//     }
//     if (a == "exam") {
//       setConditionGetResults({
//         userResponseId: responseId,
//         isSortDateDESC: true,
//       });
//       setTile("Ngày gần nhất");
//     }
//   };
  return (
    <div className=" overflow-auto h-[100vh] bg-white ">
      <div className="flex w-full items-center justify-around my-5">
        <Search
          placeholder="input search text"
          enterButton="Search"
          size="large"
          className="w-[40%]"
          //   suffix={suffix}
          onSearch={onSearch}
        />
        <Dropdown
          menu={{ items }}
          className="my-[20px] block  "
        >
          <Button
            type="primary"
            shape="round"
            className="bg-[#3eaf51] flex items-center ml-auto"
          >
            Thống kê theo
            <DownOutlined />
          </Button>
        </Dropdown>
      </div>
      {selectKey === 1 ? (
        <Table dataSource={data} className="text-center h-[80vh] overflow-auto">
          <Column
            align="center"
            title="Email"
            dataIndex="email"
            key="nameExam"
          />
          <Column
            align="center"
            title="Tên người dùng"
            dataIndex="userName"
            key="userName"
          />
          <Column
            align="center"
            title="Tên bài thi"
            dataIndex="examName"
            key="examName"
          />
          <Column
            align="center"
            title="Số lần đã thi"
            dataIndex="count"
            key="count"
          />
          <Column
            align="center"
            title="Giới hạn số lần "
            dataIndex="maxCount"
            key="maxCount"
          />

          <Column
            align="center"
            title="Action"
            key="action"
            render={(_, record) => (
              <Space size="middle">
                <Link to={`/adminpage/statistics/${record.id}`}>
                  Xem thống kê{" "}
                </Link>
              </Space>
            )}
          />
        </Table>
      ) : selectKey === 2 ? (
  
         <Table dataSource={listExam} className="text-center">
            <Column
              title={<div className="text-center">Tên bài thi</div>}
              dataIndex="name"
              key="name"
              className="text-center"
            />
            <Column
              title={<div className="text-center">Dạng bài thi</div>}
              dataIndex="type"
              key="type"
              className="text-center"
            />
            <Column
              title={<div className="text-center">Thời gian thi</div>}
              dataIndex="timeExam"
              key="timeExam"
              className="text-center"
            />

            <Column
              title={<div className="text-center">Action</div>}
              key="action"
              render={(_, record) => (
                <Button  onClick={()=>navigate(`/adminpage/statistics/exam/${record.id}` ,{state : record.name})}>Xem thống kê</Button>
              )}
              className="text-center"
            />
          </Table>
      ) : null}
    </div>
  );
}

export default HomePageStatistic;
