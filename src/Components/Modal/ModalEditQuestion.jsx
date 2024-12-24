import { Button, Form, Input, Modal, Radio, Tabs, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import React, { useContext, useState } from "react";
import { updateQuestion } from "../../Services/APImocktest";
import { AppContext } from "../AppContext/AppContext";
import FormEditListQuestion from "../FormFilter/FormEditListAnswer";
import FormEditListChoiceCorrect from "../FormFilter/FormEditListChoiceCorrect";
import "./addAnswer.css";

const onFinishCreateQuestion = (values) => {
  console.log("Received values of form:", values);
};

function ModalEditQuestion({ dataQuestion, answers, handleGetDataExam }) {
  const [select, setSelect] = useState(null);
  const { data, dispatch } = useContext(AppContext);
  const [errorDisplayed, setErrorDisplayed] = useState(false);
  const [form] = useForm();
  const {
    type,
    listAnswer,
    listChoiceCorrect,
    listQuestion,
    isOpenModalEditQuestion,
  } = data;
  const handleSelectRadio = (e) => {
    dispatch({ type: "listChoiceCorrect", payload: e.target.value });
    setSelect(e.target.value);
    // console.log("answers : " , answers);
  };
  const handleCancel = () => {
    dispatch({ type: "closeModalEditQuestion" });
    dispatch({ type: "listAnswer", payload: null });
    dispatch({ type: "listChoiceCorrect", payload: null });
  };

  const handleCloseAndSave = (values) => {
    if (select === null && !errorDisplayed) {
      notification.error({ message: "Kiểu câu hỏi không được để trống" });
      setErrorDisplayed(true);
    } else if (listAnswer === null && type !== "Essay_answers") {
      
        notification.error({
          message: "Danh sách câu trả lời ĐÚNG không được để trống",
        });
        handleCancel();
        setErrorDisplayed(true);
      } else if ( listChoiceCorrect === null && type !== "Essay_answers"){
            notification.error({message : "Danh sách câu trả lời ĐÚNG không được để trống"})
            handleCancel()
      }
      
      else {
        const newListAnswer =(listAnswer!== null)? listAnswer?.filter((item) => item !== undefined) : []
        const newListChoiceCorrect = (listChoiceCorrect !== null) ? listChoiceCorrect : []
        updateQuestion({
          id: dataQuestion.id,
          content: values.content,
          point: values.point,
          type: type,
          listAnswer: newListAnswer,
          choiceCorrect:newListChoiceCorrect ,
          description: "Day la phan mo ta ",
        })
          .then((response) => {
            console.log(response);
            if (response.data.success === true) {
              dispatch({ type: "listAnswer", payload: null });
              dispatch({ type: "resetListChoiceCorrect" });
              notification.success({ message: "Lưu thành công câu hỏi " });
              handleGetDataExam();
              dispatch({ type: "updateExam" });

              handleCancel();
            }
          })
          .catch((err) => {
            notification.error({ message: "Lỗi tạo câu hỏi" });
          });

        //   handleCancel()
        // setErrorDisplayed(false);
      }
    }
    // } else if (
    //   !errorDisplayed &&
    //   (type === "Single_answer" || type === "Multi_answer")
    // ) {
    //   notification.error({
    //     message:
         
    //         ? "Danh sách câu trả lời ĐÚNG không được để trống"
    //         : "Danh sách câu trả lời không được để trống ",
    //   });
    //   handleCancel();

    //   setErrorDisplayed(true);
    // }

    //  console.log(values);
  

  const onChangeTypeQuestion = (e) => {
    console.log("radio checked", e.target.value);
    setSelect(e.target.value);
    dispatch({ type: "type", payload: e.target.value });
  };

  const items = [
    {
      key: "1",
      label: "Câu trả lời",
      children:
        type === "Single_answer" || type === "Multi_answer" ? (
          <FormEditListQuestion
            value={type}
            onFinishCreateQuestion={onFinishCreateQuestion}
            answers={answers}
          />
        ) : (
          <h2>Không tồn tại câu trả lời để lựa chọn</h2>
        ),
    },
    {
      key: "2",
      label: "Câu trả lời đúng",
      children: (
        <FormEditListChoiceCorrect
          dataQuestion={dataQuestion}
          questionType={select}
        />
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
        title="Chỉnh sửa thông tin câu hỏi "
        destroyOnClose={true}
        open={isOpenModalEditQuestion}
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
          initialValues={dataQuestion}
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
            className=""
            label="Điểm của câu hỏi"
            name="point"
            rules={[
              {
                required: true,
                message: "Nhập vào điểm của câu hỏi",
              },
            ]}
          >
            <Input className="" type="number" />
          </Form.Item>

          <h2 className="mb-2">Chọn loại câu hỏi </h2>
          <Form.Item>
            <Radio.Group
              className="flex justify-around"
              onChange={onChangeTypeQuestion}
              value={type}
              name="questionType"
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
              onClick={handleCloseAndSave}
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

export default ModalEditQuestion;
