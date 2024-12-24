import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Components/AppContext/AppContext";

// import React, { useState } from "react";
import {
  Button,
  Collapse,
  Input,
  Popconfirm,
  Select,
  Space,
  message,
  notification,
} from "antd";
import { useParams } from "react-router-dom";
import ModalAddQuestionToSection from "../../Components/Modal/ModalAddQuestionToSection";
import ModalEditQuestion from "../../Components/Modal/ModalEditQuestion";
import ModalEditSection from "../../Components/Modal/ModalEditSection";
import {
  handleDeleteSection,
  handleGetDetailsExam,
} from "../../handleLogic/handleSection";
import { deleteQuestion } from "../../Services/APImocktest";
import {
  DeleteFilled,
  EditFilled,
  FolderOpenOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import DropDown from "./DropDown";
import { handleSetData } from "../Exam/handleExam";

function CollapseExam(props) {
  const { examId } = useParams();
  const [items, setItems] = useState([]);
  const [data1, setData1] = useState([]);
  const { data, dispatch } = useContext(AppContext);
  const [dataSection, setDataSection] = useState(null);
  const [dataQuestion, setDataQuestion] = useState(null);
  const [listAnswer, setListAnswer] = useState(null);
  const [idSection, setIdSection] = useState(null);
  const [sectionTitle, setSectionTitle] = useState(null);
  const [sourceData, setDataSource] = useState([]);
  // const navigate = useNavigate();
  const { typeSection } = data;
  const { Search } = Input;
  const handleGetData = async () => {
    const exam = await handleGetDetailsExam(examId);
    setData1(exam?.sections);

    setDataSource(exam?.sections);
    // console.log("data", data1);
  };
  const handleEditQuestion = (e, question, listAnswer) => {
    handleShowChildren(e);
    dispatch({ type: "openModalEditQuestion" });
    setListAnswer(listAnswer);
    setDataQuestion(question);
    handleGetData();
    // console.log("Cau hoi va danh sach cau tra loi la " ,question , listAnswer);
  };
  const handelDeleteQuestion = (e, id) => {
    handleShowChildren(e);

    console.log(id);
    deleteQuestion(id)
      .then((res) => {
        if (res.data.success === true) {
          notification.success({ message: "Xóa thành công câu hỏi " });
          handleGetData();
        }
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // message.success("Xóa thành công ");
  };

  const handleAddQuestionInSection = (e, id, title) => {
    handleShowChildren(e);
    dispatch({ type: "openModalCreateQuestionInSection" });
    setIdSection(id);
    setSectionTitle(title);
  };

  const handleEditSection = (e, id, item, isEdit) => {
    dispatch({ type: "openModalEditSection" });
    setIdSection(id);
    setDataSection(item);
    handleShowChildren(e);
    dispatch({ type: "setIsModalEditSection", payload: isEdit });
  };

  const deleSection = async (e, id) => {
    handleShowChildren(e);
    const res = await handleDeleteSection(id);
    if (res === true) {
      notification.success({ message: "Xóa thành công phần thi " });
      handleGetData();
    }
  };
  const handleShowChildren = (e) => {
    e.stopPropagation();
  };

  const handleSetItems = () => {
    console.log("data test : ", data1);
    setItems(
      data1 &&
        data1.map((section, index) => {
          const listQuestion =
            section &&
            section?.questions?.map((question, index) => {
              const listAnswer = question.listAnswer.map((answer) => (
                <p
                  key={answer.id}
                  onClick={() => {
                    console.log(answer.id);
                  }}
                >
                  {answer.answer}
                </p>
              ));
              return {
                key: index,
                label: (
                  <div className="grid grid-cols-4">
                    <div className="col-span-1 mx-auto">{question.content}</div>
                    <div className="col-span-1 mx-auto">
                      {question.questionType}
                    </div>
                    <div className="col-span-1 mx-auto">{question.point}</div>
                    <Space className="col-span-1 mx-auto">
                      <Button
                        icon={
                          <EditFilled
                            className="text-amber-600"
                            onClick={(e) =>
                              handleEditQuestion(e, question, listAnswer)
                            }
                          />
                        }
                      />
                      <Button
                        icon={
                          <Popconfirm
                            title="Delete the task"
                            placement="bottomRight"
                            description="Bạn có muốn xóa câu hỏi này ?"
                            onConfirm={(e) =>
                              handelDeleteQuestion(e, question.id)
                            }
                            // onCancel={cancel}
                            okText="Có"
                            cancelText="Không"
                          >
                            <DeleteFilled className="text-orange-900" />
                          </Popconfirm>
                        }
                      />

                      {/* <Button>Xem</Button> */}
                    </Space>
                  </div>
                ),
                children: (
                  <>
                    {question?.listAnswer?.map((answer) => (
                      <p>Đ/A : {answer?.answer}</p>
                    ))}
                  </>
                ),

                showArrow: false,
              };
            });
          return {
            key: index,
            label: (
              <div className="grid grid-cols-3 ">
                <div className="col-span-1 mx-auto ">{section.title}</div>
                <div className="col-span-1 mx-auto">{section.type}</div>
                <Space className="col-span-1 mx-auto">
                  <Button
                    onClick={(e) =>
                      handleAddQuestionInSection(e, section.id, section.title)
                    }
                    icon={<PlusCircleOutlined />}
                  >
                    Add question
                  </Button>
                  <Button
                    onClick={(e) =>
                      handleEditSection(e, section.id, section, false)
                    }
                    className=""
                    icon={<FolderOpenOutlined className="text-lime-600" />}
                  />

                  <Button
                    onClick={(e) =>
                      handleEditSection(e, section.id, section, true)
                    }
                    icon={<EditFilled className="text-cyan-600" />}
                  />
                  <Button
                    onClick={(e) => handleShowChildren(e)}
                    icon={
                      <Popconfirm
                        title="Delete the task"
                        placement="bottomRight"
                        description="Bạn có muốn xóa phần thi này ?"
                        onConfirm={(e) => deleSection(e, section.id)}
                        // onCancel={cancel}
                        okText="Có"
                        cancelText="Không"
                      >
                        <DeleteFilled className="text-orange-700" />
                      </Popconfirm>
                    }
                  />
                </Space>
              </div>
            ),
            showArrow: false,
            children: (
              <>
                <Collapse
                  items={listQuestion}
                  defaultActiveKey={["1"]}
                  collapsible={false}
                />
              </>
            ),
          };
        })
    );
  };
  useEffect(() => {
    handleGetData();
  }, []);
  useEffect(() => {
    handleSetItems();
  }, [data1]);

  const handleChageData = async () => {
    const res = await handleSetData(sourceData, typeSection);
    setData1(res);
  };
  const handleTest = () => {
    console.log(sourceData);
  };

  useEffect(() => {
    handleChageData();
  }, [typeSection]);

  return (
    <div>
      {/* <h2 onClick={handleTest}>{examId}</h2> */}
      <DropDown />
      <Collapse
        items={items}
        defaultActiveKey={["1"]}
        collapsible={false}
        className=""
        showArrow={false}
      />

      <ModalEditSection
        idSection={idSection}
        dataSection={dataSection}
        handleGetDataExam={handleGetData}
      />
      <ModalEditQuestion
        dataQuestion={dataQuestion}
        answers={listAnswer}
        handleGetDataExam={handleGetData}
      />
      <ModalAddQuestionToSection
        idSection={idSection}
        title={sectionTitle}
        handleGetDataExam={handleGetData}
      />
    </div>
  );
}

export default CollapseExam;
