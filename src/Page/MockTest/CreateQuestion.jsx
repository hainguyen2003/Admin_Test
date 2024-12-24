import {
  Button,
  Form,
  Input,
  Popconfirm,
  Space,
  message,
  notification,
  Dropdown,
} from "antd";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { AppContext } from "../../Components/AppContext/AppContext";
import ModalCreateQuestion from "../../Components/Modal/ModalCreateQuestion";
import { duration } from "moment/moment";
import FormUploadSection from "../../Components/FormFilter/FormUploadSection";
import { DownOutlined } from "@ant-design/icons";
function CreateQuestion() {
  const { data, dispatch } = useContext(AppContext);
  const [form] = Form.useForm();
  const { id } = useParams();
  const [title, setTitle] = useState(null);
  const [contentDecription, setContentDecription] = useState(null);
  const [type , setType] = useState(null)
  const {
    listAnswer,
    listChoiceCorrect,
    content,
    listQuestion,
    fileInDescription,
  } = data;
  const items = [
    {
      label: "Phần thi nghe",
      key: "listening",
    },
    {
      label: "Phần thi đọc",
      key: "reading",
    },
    {
      label: "Phần thi viết",
      key: "writing",
    },
  ];
  const handleOpenModalCreateQuestion = async () => {
    dispatch({ type: "openModalCreateQuestion" });
  };
  const navigate = useNavigate();

  const handleSaveContest = () => {};

  const test = () => {
    console.log(listQuestion);
  };
  // const
  const saveDataInLocalStorage = () => {
    if (title === null) {
      notification.error(
        { message: "Bạn cần nhập tiêu đề" },
        { duration: 0.1 }
      );
      return;
    } else if (listQuestion === null) {
      notification.error({
        message:
          "Không tìm thấy thông tin câu hỏi . Bạn cần tạo câu hỏi trước ",
      });
      return;
    }else if(type === null){
      notification.error({
        message:
          "Chưa xác định phần thi này thuộc phần nào ",
      });
      return;
    }

    const data = JSON.parse(localStorage.getItem("listContest")) || [];
    data.push({
      title: title,
      description: contentDecription,
      file: fileInDescription,
      questions: listQuestion,
      type : type
    });
    localStorage.setItem("listContest", JSON.stringify(data));
    // setTitle(null);
    dispatch({ type: "deleteLisQuestion" });
    dispatch({ type: "deleteFileInDescription" });
    notification.success({ message: "Lưu thành công phần thi" });
    const err = JSON.parse(localStorage.getItem("listContest"));
    navigate("/adminpage/contest");

    console.log("listQuestion :", listQuestion);
  };
  const cancelDataInLocalStorage = () => {
    // localStorage.setItem("listContest", JSON.stringify([]));
    setTitle(null);
    dispatch({ type: "deleteLisQuestion" });
  };
  const handleMenuItemClick = (item) => {
    // console.log(`Clicked item key: ${item.key}`);
    setType(item.key)
  };

  return (
    <>
      <div className="bg-slate-800 text-white pb-20 ">
        <div className="flex justify-end pr-10 pt-10">
          <Button
            className="text-white px-10  bg-green-500"
            onClick={() => navigate("/adminpage/contest")}
          >
            Quay lại
          </Button>
          <Button
            className="text-white px-10 bg-teal-600 mx-10"
            icon={<CheckOutlined />}
            onClick={saveDataInLocalStorage}
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
        <div className="mx-[10%]">
          <p>Nhập vào nội dung phần mô tả</p>
          <Input
            value={contentDecription}
            onChange={(e) => setContentDecription(e.target.value)}
            placeholder="Nhập vào thông tin mô tả"
            className=" mx-auto block my-5"
          />
        </div>

        <div>
       
        </div>
        <div className="flex justify-around mt-10 items-start">
          <Button
            className="text-white "
            onClick={handleOpenModalCreateQuestion}
          >
            Thêm một câu hỏi
          </Button>
          <Dropdown
            menu={{
              items: items.map((item) => ({
                ...item,
                onClick: (e) => handleMenuItemClick(e, item),
              })),
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
               Phần thi này thuộc phần
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>

          <FormUploadSection />
        </div>

        <div className="ml-[10%]">
          {listQuestion?.map((item, index) => (
            <p className="my-1"> {item.content}</p>
          ))}
        </div>
      </div>
      <ModalCreateQuestion />
    </>
  );
}

export default CreateQuestion;
