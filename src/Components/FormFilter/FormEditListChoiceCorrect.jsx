import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext/AppContext";
import { Button, Checkbox, Col, Radio, Row, Space } from "antd";

function FormEditListChoiceCorrect({ dataQuestion, questionType }) {
  const { data, dispatch } = useContext(AppContext);
  const [select, setSelect] = useState([]);
  const { listAnswer, type ,listChoiceCorrect } = data;
  // const [questionType, setQuestionType] = useState(dataQuestion.questionType);
  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
    setSelect(checkedValues);
    dispatch({ type: "listChoiceCorrect", payload: checkedValues });
  };
  const handleSelectRadio = (e) => {
    dispatch({ type: "listChoiceCorrect", payload: e.target.value });
    setSelect(e.target.value);
    // console.log("answers : " , answers);
  };
  const click = () => {
    // console.log("dataQuestion :", questionType);
    console.log(listChoiceCorrect);
    // console.log(listAnswer);
  };
  useEffect(()=>{
    console.log("dataQuestion :", questionType);

  },[questionType])

  return (
    <div>
      {/* <Button onClick={click}>click me</Button> */}
      <>
        {listAnswer === null ? (
          <h2>Không có lựa chọn nào</h2>
        ) : questionType === "Single_answer" ? (
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
                {listAnswer?.map((item, index) => (
                  <Col span={8} className="my-5">
                    <Radio value={index}>{item.answer}</Radio>
                  </Col>
                ))}
              </Row>
            </Radio.Group>
          </Space.Compact>
        ) : questionType === "Multi_answer" ? (
          <Checkbox.Group
            style={{
              width: "100%",
            }}
            onChange={onChange}
          >
            <Row>
              {listAnswer?.map((item, index) => (
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
    </div>
  );
}

export default FormEditListChoiceCorrect;
