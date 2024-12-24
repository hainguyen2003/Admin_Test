import React, { useContext, useEffect, useState } from "react";
import { Button, Collapse, Form, Input, Modal, notification } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { AppContext } from "../../Components/AppContext/AppContext";
import { createExam } from "../../Services/APImocktest";
import { useNavigate } from "react-router-dom";

function CollapseContest(props) {
  const [dataQuestion, setDataQuestion] = useState(null);
  const navigate = useNavigate();
  const handleData = () => {
    setDataQuestion(JSON.parse(localStorage.getItem("listContest")));
  };
  useEffect(() => {
    handleData();
  }, [localStorage.getItem("listContest")]);
  const [activeKey, setActiveKey] = useState([]);

  const items = dataQuestion?.map((item, index) => {
    const itemsNest = item.questions?.map((question, questionIndex) => ({
      key: `${index}-${questionIndex}`,
      label: (
        <div className="flex justify-between">
          <p>{question.content} </p>
        </div>
      ),
      children: (
        <>
          <div
            className={`answer ${
              activeKey.includes(`${index}-${questionIndex}`) ? "open" : ""
            }`}
          >
            {question.listAnswer?.map((answer, answerIndex) => (
              <p className="ml-2 mb-1" key={answerIndex}>
                {" "}
                - {answer.answer}
              </p>
            ))}
          </div>
        </>
      ),
    }));

    return {
      key: index,
      label: (
        <div className="flex justify-between items-center">
          <h2>{item.title}</h2>
        </div>
      ),
      children: (
        <Collapse items={itemsNest} onChange={(keys) => setActiveKey(keys)} />
      ),
    };
  });
  const onFinish = async (values) => {
    const sectionRequests = JSON.parse(localStorage.getItem("listContest"));
    // console.log(sectionRequests);
    if (sectionRequests == null) {
      notification.error({ message: "Bạn phải tạo thông tin phần thi trước" });
      // navigate("/adminpage/create-question")
    } else {
      const res = await createExam({
        name: values.name,
        timeExam: values.timeExam,
        sectionRequests: sectionRequests,
      });
      if (res?.data?.success === true) {
        navigate("/adminpage/mocktest");
        localStorage.setItem("listContest", JSON.stringify(null));
      }
      console.log(res.data);
    }
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Tên bài thi"
          name="name"
          rules={[
            {
              required: true,
              message: "Nhập vào tiêu đề bài thi!",
            },
          ]}
        >
          <Input className="mb-1" />
        </Form.Item>
        <Form.Item
          label="Thời gian bài thi (phút)"
          name="timeExam"
          rules={[
            {
              required: true,
              message: "Nhập vào thời gian bài thi",
            },
          ]}
        >
          <Input className="mb-1" type="number" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 20,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" className="">
            Save
          </Button>
        </Form.Item>
      </Form>
      <div>
        <h2 className="text-center font-medium uppercase text-xl mb-5">
          Danh sách các phần có trong bài thi{" "}
        </h2>
        <Collapse items={items} />
      </div>
    </>
  );
}

export default CollapseContest;
