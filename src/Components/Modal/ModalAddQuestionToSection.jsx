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
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/lib/input/TextArea";
import { addQuestiontoSection } from "../../Services/APImocktest";

const onFinishCreateQuestion = (values) => {
  console.log("Received values of form:", values);
};

function ModalAddQuestionToSection({ idSection, title ,handleGetDataExam}) {
  const [select, setSelect] = useState([]);
  const { data, dispatch } = useContext(AppContext);
  const [errorDisplayed, setErrorDisplayed] = useState(false);
  const [form] = useForm();
  const {
    isOpenModalCreateQuestionInSection,
    content,
    type,
    listAnswer,
    isUpdateQuestion ,
    listChoiceCorrect,
    listQuestion,
  } = data;
  const handleSelectRadio = (e) => {
    dispatch({ type: "listChoiceCorrect", payload: e.target.value });
    setSelect(e.target.value);
  };
  const handleCancel = () => {
    dispatch({ type: "closeModalCreateQuestionInSection" });
    dispatch({ type: "listAnswer", payload: null });
    dispatch({ type: "type", payload: null });
    dispatch({ type: "deleteListChoiceCorrect" });
    // console.log("lít choi cơ rếch : ", listChoiceCorrect);
    // setSelect(null);
  };

  const handleCloseAndSave = (values) => {
    console.log("values" ,values);
    if (select === null && !errorDisplayed ) {
      notification.error({ message: "Kiểu câu hỏi không được để trống" });
      setErrorDisplayed(true);
    } else if (listAnswer === null && type !== "Essay_answers") {
      notification.error({
        message: "Danh sách câu trả lời không được để trống ",
      });
    } else if (listChoiceCorrect === null && type !== "Essay_answers" ) {
      notification.error({
        message: "Danh sách câu trả lời ĐÚNG không được để trống ",
      });
     
    } else  {
      // console.log("listChoiceCorrect :", listChoiceCorrect);
      const newListAnswer = listAnswer?.filter((item) => item !== undefined);
      // console.log("listAnswer : ", newListAnswer);
      // console.log("content : ", values.content);
      // console.log("type:", type);
      addQuestiontoSection({
        content: values.content,
        point: values.point,
        type : type , 
        section_id : idSection , 
        description : "Phan mo ta ",
        listAnswer : newListAnswer , 
        choiceCorrect : listChoiceCorrect
      }).then((res)=>{
          if(res.data.success === true){
            handleGetDataExam()
            dispatch({type : 'updateExam'})
            notification.success({message : "Thêm thành công câu hỏi vào phần thi " + title})
          }else{
            notification.error({message : "Có lỗi khi thêm câu hỏi"})
          }
      }).catch((error)=>{
            notification.error({message : "Không thành công "})
      })
      setErrorDisplayed(true);
      handleCancel();
      setErrorDisplayed(false);
    }
  };

  const onChangeTypeQuestion = (e) => {
    // console.log("radio checked", e.target.value);
    dispatch({ type: "type", payload: e.target.value });
  };
  const newListAnswer =
    listAnswer && listAnswer.filter((item) => item !== undefined);

  const onChange = (checkedValues) => {
    // console.log("checked = ", checkedValues);
    setSelect(checkedValues);
    dispatch({ type: "listChoiceCorrect", payload: checkedValues });
  };

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
                defaultValue={null}
                className="w-full"
                name ="questionType"
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
              defaultValue={null}
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
      children: "Content of Tab Pane 2",
    },
  ];

  return (
    <div>
      <Modal
        // title="Tạo thông tin câu hỏi "
        title={"Thêm câu hỏi cho phần thi : " + title}
        destroyOnClose={true}
        open={isOpenModalCreateQuestionInSection}
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
            <TextArea
              rows={4}
              name="content"
              placeholder="Nhập vào nội dung câu hỏi "
              className="mb-3"
            />
          </Form.Item>

          <Form.Item
            label="Số điểm của câu hỏi"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điểm ",
              },
            ]}
            name="point"
          >
            <Input
              type="number"
              name="point"
              placeholder="Nhập vào số điểm câu hỏi "
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

export default ModalAddQuestionToSection;
