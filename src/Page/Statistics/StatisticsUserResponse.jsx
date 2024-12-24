import React, { useEffect, useState } from "react";
import ChartUserResults from "../../Components/Chart/ChartUserResults";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space, Input } from "antd";
import ChartCountExam from "../../Components/Chart/ChartCountExam";
import { statisticsUserResultsByUserResponseId } from "../../Services/APImocktest";
import { useNavigate, useParams } from "react-router-dom";

const { Search } = Input;
function StatisticsUserResponse(props) {
  const {responseId} = useParams()
const navigate = useNavigate()
  const [conditionGetResults, setConditionGetResults] = useState({
    userResponseId: responseId,
  });
  const [dataResults ,setDataResults] = useState([])
  const [title, setTile] = useState("Sắp xếp theo");
  const handleChangeOption = (a) => {
    console.log(a);

    if (a == "hight") {
      setConditionGetResults({
        userResponseId: responseId,
        highToLow: true,
      });
      setTile("Điểm cao tới thấp");
    }
    if (a == "low") {
      setConditionGetResults({
        userResponseId: responseId,
        isSortDateDESC: true,
      });
      setTile("Ngày gần nhất");
    }
  };
  const items = [
    {
      label: (
        <p onClick={() => handleChangeOption("hight")}>Điểm cao tới thấp</p>
      ),
      key: "hight",
    },
    {
      label: <p onClick={() => handleChangeOption("low")}>Ngày gần nhất</p>,
      key: "low",
    },
  ];

  const handeStatisticsUserResultsByUserResponseId = () => {
    statisticsUserResultsByUserResponseId(conditionGetResults).then((res) => {
      console.log(res?.data?.body?.data?.items);
      setDataResults(res?.data?.body?.data?.items)
    });
  };
  useEffect(() => {
    handeStatisticsUserResultsByUserResponseId();
    console.log(responseId);
  }, [conditionGetResults]);

  return (
    <div>
      <h2 className="text-xl uppercase text-orange-500 my-10 font-medium text-center"> thống kê thông tin bài thi của người dùng</h2>
      <div className="flex justify-around items-center mx-[10%] mb-5">
        <Button type="primary" onClick={()=> navigate('/adminpage/statistics')}>Quay lại trang trước</Button>
        <Dropdown
          menu={{ items, handleChangeOption }}
          className="my-[20px] block  "
        >
          <Button
            type="primary"
            shape="round"
            className="bg-[#3eaf51] flex items-center ml-auto"
          >
            {title}
            <DownOutlined />
          </Button>
        </Dropdown>
      </div>

      <ChartUserResults data={dataResults} title = {"Biểu đồ thống kê điểm thi của người dùng theo bài thi"}/>
    
    </div>
  );
}

export default StatisticsUserResponse;
