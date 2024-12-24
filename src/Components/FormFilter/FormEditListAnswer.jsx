import { Button, Form, Input, Space } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { AppContext } from "../AppContext/AppContext";
import { list } from "postcss";
import FormList from "antd/es/form/FormList";

function FormEditListQuestion({ value, answers }) {
  const [form] = Form.useForm();
  const { data, dispatch } = useContext(AppContext);
  // const [listAnswer, setListAnswer] = useState([]);
  const { listAnswer } = data;

  const handleAdd = async () => {
    form.validateFields().then((values) => {
      // console.log(values.option_details);
      const newList = values?.option_details?.filter(
        (item) => item !== undefined
      );
      dispatch({ type: "listAnswer", payload: newList });
      console.log("listAnswer lấy trong context", listAnswer);
    });
  };

  const handleRemove = async (name) => {
    form.validateFields().then((values) => {
     
      const newList = values?.option_details?.filter(
        (item) => item.answer !== undefined
      );
      dispatch({ type: "listAnswer", payload: newList });
    });
  };

  const list = [];

  answers.map((item) => {
    list.push({ answer: item.props.children });
  });
  // dispatch({ type: "listAnswer", payload: list });

  // console.log("listAnswer :", list);

  // return (
  //   <div>
  //     <Form
  //       form={form}
  //       name="dynamic_form_nest_item"
  //       autoComplete="off"
  //       initialValues={{ names: listAnswer }}
  //     >
  //       {listAnswer.map((answer, index) => (
  //         <Space
  //           key={index}
  //           style={{ display: 'flex', marginBottom: 8 }}
  //           align="baseline"
  //         >
  //           <Form.Item
  //             name={['names', index, 'answer']}
  //             initialValue={answer.answer}
  //             className='my-2'
  //             rules={[{ required: true, message: 'Answer is required' }]}
  //           >
  //             <Input placeholder="Nhập vào câu trả lời" className='w-[50vw]' />
  //           </Form.Item>
  //           <Form.Item>
  //             <MinusCircleOutlined onClick={() => handleRemove(index)} />
  //           </Form.Item>
  //         </Space>
  //       ))}
  //        <Form.Item className="my-5">
  //         <Button
  //           onClick={() => {
  //             handleAdd();
  //           }}
  //           icon={<PlusOutlined />}
  //         >
  //           Thêm câu trả lời
  //         </Button>
  //       </Form.Item>

  //     </Form>
  //   </div>
  // );
  const onFinish = async () => {
    console.log("listAnswer lấy trong context", listAnswer);
  };
  useEffect(() => {
    dispatch({ type: "listAnswer", payload: list });
  }, []);

  return (
    <Form name="dynamic_form_nest_item" form={form} autoComplete="off" layout="vertical">
      {/* <Button onClick={onFinish}>Click me</Button> */}
      <Form.List name="option_details" initialValue={list}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  // {...restField}
                  name={[name, "answer"]}
                  placeholder="Nhập vào câu trả lời "
                  className="w-[900px]   mx-[]"
                  rules={[
                    {
                      required: true,
                      message: "Nhập thông tin câu trả lời cho câu hỏi ",
                    },
                  ]}
                >
                  <Input
                    name="content"
                    placeholder="Informaition answer "
                    className="mb-1"
                  />
                </Form.Item>

                <MinusCircleOutlined
                  onClick={() => {
                    remove(name);
                    handleRemove(name);
                  }}
                />
              </Space>
            ))}

            <Form.Item className="my-5">
              <Button
                className="mx-auto"
                onClick={() => {
                  handleAdd();
                  add();
                }}
                icon={<PlusOutlined />}
              >
                Thêm câu trả lời
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
}

export default FormEditListQuestion;
