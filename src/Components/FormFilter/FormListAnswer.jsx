
import { Button, Form, Input, Space } from "antd";
import React, { useContext } from "react";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { AppContext } from "../AppContext/AppContext";

function FormListAnswer({ value }) {
  const [form] = Form.useForm();

  const { data, dispatch } = useContext(AppContext);

  const { listAnswer , } = data;

  const handleAdd = async () => {
    form.validateFields().then((values) => {
      dispatch({ type: "listAnswer", payload: values.names });
    });
  };
  const handleRemove = async (name) => {
    const newListAnswer = listAnswer?.filter(
      (item, index) => index !== name && item !== undefined
    );
    if (newListAnswer !== []) {
      dispatch({ type: "listAnswer", payload: newListAnswer });
    } else {
      dispatch({ type: "listAnswer", payload: null });
    }
    console.log("newListAnswer :", listAnswer);
  };

  return (
    <div>
      <Form
        initialValues={{ names: null }}
        name="dynamic_form_nest_item"
        autoComplete="off"
        restField={true}
        form={form}
        key={value}
        // onFinish={(values) => {
        //   onFinishCreateQuestion(values);
        // }}
      >
        <Form.List name="names" initialValue={[]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                  width={2000}
                >
                  <Form.Item
                    name={[name, "answer"]}
                    key={key}
                    rules={[{ required: true, message: "Answer is required" }]}
                    className="my-2 flex justify-center  "
                    setAnswerId={key}
                  >
                    <Input
                      required={true}
                      key={key}
                      value={value}
                      placeholder="Nhập vào câu trả lời "
                      className="w-[50vw]  mx-[]"
                    />
                  </Form.Item>
                  <Form.Item>
                    <MinusCircleOutlined
                      onClick={() => {
                        handleRemove(name);
                        remove(name);
                      }}
                    />
                  </Form.Item>
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
    </div>
  );
}

export default FormListAnswer;
