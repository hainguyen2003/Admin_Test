import {
  Button,
  Form,
  Input,
  Popconfirm,
  Space,
  message,
  notification,
} from "antd";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { AppContext } from "../../Components/AppContext/AppContext";
import ModalCreateQuestion from "../../Components/Modal/ModalCreateQuestion";
import { duration } from "moment/moment";
import { addSectionToExam } from "../../Services/APImocktest";

function AddSectionToExam() {
  const { data, dispatch } = useContext(AppContext);
  const [form] = Form.useForm();
  const { id } = useParams();
  const [title, setTitle] = useState(null);
  const { listAnswer, listChoiceCorrect, content, listQuestion } = data;
  const handleOpenModalCreateQuestion = async () => {
    dispatch({ type: "openModalCreateQuestion" });
  };
  const navigate = useNavigate();

  const test = () => {
    console.log(listQuestion);
  };
  // const
  const saveSectionInExam = () => {
    console.log("title : ", title);
    console.log("Question ", listQuestion);
    if (title === null) {
      notification.error({ message: "Nhập vào tiêu đề của phần thi" });
    } else if (listQuestion === null) {
      notification.error({ message: "Không tìm thấy nội dung các câu hỏi " });
    } else if (listQuestion !== null && title !== null) {
      addSectionToExam({
        exam_id: id,
        questions: listQuestion,
        title: title,
      })
        .then((res) => {
          if (res.data.success === true) {
            notification.success({
              message: "Thêm thành công phần thi vào đề thi"
            });
            setTitle(null);
            dispatch({ type: "deleteLisQuestion" });
            navigate("/adminpage/infor-exam");
          }
          console.log(res.data);
        })
        .catch((error) => {
          notification.error({ message: "Có lỗi khi thêm phần thi" });
        });
      console.log({
        id: id,
        listQuestion: listQuestion,
        title: title,
      });
    }
  };
  const cancelDataInLocalStorage = () => {
    setTitle(null);
    dispatch({ type: "deleteLisQuestion" });
  };

  return (
    <>
      <Button>{id}</Button>
      <div className="bg-slate-800 text-white ">
        <div className="flex justify-end pr-10 pt-10">
          <Button
            className="text-white px-10  bg-green-500"
            onClick={() => navigate("/adminpage/infor-exam")}
          >
            Quay lại
          </Button>
          <Button
            className="text-white px-10 bg-teal-600 mx-10"
            icon={<CheckOutlined />}
            onClick={saveSectionInExam}
          >
            Lưu lại
          </Button>

          <Popconfirm
            placement="bottom"
            title={"Bạn có chắc chắn hủy"}
            description={
              "Khi bạn đồng ý tất cả các câu hỏi tạo trước đó sẽ mất đi "
            }
            onConfirm={cancelDataInLocalStorage}
            okText="Yes"
            cancelText="No"
            onCancel={test}
          >
            <Button className="text-white bg-red-500" icon={<CloseOutlined />}>
              Hủy
            </Button>
          </Popconfirm>
        </div>
        <div className="mx-[10%]">
          <p>Nhập vào tiêu đề </p>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nhập vào tiêu đề"
            className=" mx-auto block my-5"
          />
        </div>

        <div className="ml-[10%]">
          {listQuestion?.map((item, index) => (
            <p className="my-1"> {item.content}</p>
          ))}
        </div>

        <Button
          className="text-white ml-[15%] my-3"
          onClick={handleOpenModalCreateQuestion}
        >
          Thêm một câu hỏi
        </Button>
      </div>
      <ModalCreateQuestion />
    </>
  );
}

export default AddSectionToExam;
