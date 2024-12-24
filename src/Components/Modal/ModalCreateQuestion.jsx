import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Space,
  Tabs,
  notification,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext/AppContext";
import { Radio } from "antd";
import "./addAnswer.css";
import FormListQuestion from "../FormFilter/FormListAnswer";
import FormUpload from "../FormFilter/FormUpload"
import { useForm } from "antd/es/form/Form";

const onFinishCreateQuestion = (values) => {
  console.log("Received values of form:", values);
};

function ModalCreateQuestion() {
  const [select, setSelect] = useState([]);
  const { data, dispatch } = useContext(AppContext);
  const [errorDisplayed, setErrorDisplayed] = useState(false);
  const [form] = useForm();
  const {
    openModalCreateQuestion,
    content,
    type,
    listAnswer,
    listChoiceCorrect,
    listQuestion,
    fileInDescription
  } = data;
  const handleSelectRadio = (e) => {
    dispatch({ type: "listChoiceCorrect", payload: e.target.value });
    setSelect(e.target.value);
  };
  const handleCancel = () => {
    dispatch({ type: "listAnswer", payload: null });
    dispatch({ type: "type", payload: null });
    dispatch({ type: "resetListChoiceCorrect" });
    dispatch({ type: "closeModalCreateQuestion" });

  };

  const handleCloseAndSave = (values) => {
    if (type === null) {
      notification.error({ message: "Nhập vào kiểu câu hỏi " });
    } else if (type === "Essay_answers") {
      const newListAw =
        listAnswer !== null
          ? listAnswer.filter((item) => item !== undefined)
          : null;
      dispatch({
        type: "createListQuestion",
        payload: {
          content: values.content,
          type: type,
          listAnswer: newListAw,
          choiceCorrect: listChoiceCorrect,
          description: fileInDescription,
        },
      });

      notification.success({ message: "Lưu thành công câu hỏi " });

      handleCancel();
    } else if (listAnswer === null) {
      notification.error({
        message: "Danh sách câu trả lời không được để trống ",
      });
    } else if (listChoiceCorrect === null) {
      notification.error({
        message: "Danh sách câu trả lời đúng  không được để trống ",
      });
    } else if (listAnswer !== null && listChoiceCorrect !== null) {
      const newListAw =
        listAnswer !== null
          ? listAnswer.filter((item) => item !== undefined)
          : null;
      dispatch({
        type: "createListQuestion",
        payload: {
          content: values.content,
          type: type,
          listAnswer: newListAw,
          choiceCorrect: listChoiceCorrect,
          description: fileInDescription,
        },
      });

      notification.success({ message: "Lưu thành công câu hỏi " });

      handleCancel();
    }
  };
  
  const onChangeTypeQuestion = (e) => {
    console.log("radio checked", e.target.value);
    dispatch({ type: "type", payload: e.target.value });
  };
  const newListAnswer =
    listAnswer && listAnswer.filter((item) => item !== undefined);

  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
    setSelect(checkedValues);
    dispatch({ type: "listChoiceCorrect", payload: checkedValues });
  };

  useEffect(() => {
    console.log(select);
  }, [select]);
  const items = [
    {
      key: "1",
      label: "Câu trả lời",
      children:
        type === "Single_answer" || type === "Multi_answer" ? (
          <FormListQuestion
            value={type}
            onFinishCreateQuestion={onFinishCreateQuestion}
          />
        ) : (
          <h2>Không tồn tại câu trả lời để lựa chọn</h2>
        ),
    },
    {
      key: "2",
      label: "Câu trả lời đúng",
      children: (
        <>
          {listAnswer === null ? (
            <h2>Không có lựa chọn nào</h2>
          ) : type === "Single_answer" ? (
            <Space.Compact
              style={{
                width: "100%",
              }}
            >
              <Radio.Group
                onChange={(e) => handleSelectRadio(e)}
                value={select}
                className="w-full"
              >
                <Row>
                  {newListAnswer?.map((item, index) => (
                    <Col span={8} className="my-5">
                      <Radio value={index}>{item?.answer}</Radio>
                    </Col>
                  ))}
                </Row>
              </Radio.Group>
            </Space.Compact>
          ) : type === "Multi_answer" ? (
            <Checkbox.Group
              style={{
                width: "100%",
              }}
              onChange={onChange}
            >
              <Row>
                {newListAnswer?.map((item, index) => (
                  <Col span={8} className="my-5">
                    <Checkbox value={index}>{item?.answer}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          ) : (
            <h2>Câu hỏi tự luận không tồn tại đáp án đúng</h2>
          )}
        </>
      ),
    },
    {
      key: "3",
      label: "Mô tả ",
      children: (
        <>
          <FormUpload/>
        </>
      )
    },
  ];

  return (
    <div>
      <Modal
        title="Tạo thông tin câu hỏi "
        destroyOnClose={true}
        open={openModalCreateQuestion}
        onCancel={handleCancel}
        maskClosable={false}
        width={1000}
        className="text-center"
        footer={null}
      >
        <Form
          onFinish={handleCloseAndSave}
          layout="vertical"
          autoComplete="off"
          initialValues={{ type: null, listAnswer: [] }}
        >
          <Form.Item
            label="Câu hỏi"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập nội dung câu hỏi ",
              },
            ]}
            name="content"
          >
            <Input
              name="content"
              placeholder="Nhập vào nội dung câu hỏi "
              className="mb-3"
            />
          </Form.Item>
          <Form.Item>
            <h2 className="mb-2">Chọn loại câu hỏi </h2>
            <Radio.Group
              className="flex justify-around"
              onChange={onChangeTypeQuestion}
              value={type}
            >
              <Radio value={"Essay_answers"}>Câu hỏi tự luận</Radio>
              <Radio value={"Single_answer"}>
                Câu hỏi trắc nghiệm : 1 câu trả lời duy nhất
              </Radio>
              <Radio value={"Multi_answer"}>
                Câu hỏi trắc nghiệm : cho phép nhiều câu trả lời{" "}
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Tabs defaultActiveKey="1" items={items} />
          </Form.Item>

          <Form.Item className="flex justify-end mt-10">
            <Button
              // onClick={handleCloseAndSave}
              htmlType="submit"
              className="bg-green-600 text-white "
            >
              Lưu lại & Đóng
            </Button>

            <Button
              className="bg-orange-700 text-white mx-5"
              onClick={handleCancel}
            >
              Hủy bỏ{" "}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ModalCreateQuestion;
