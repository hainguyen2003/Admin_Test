import React, { createContext, useReducer } from "react";
export const AppContext = createContext();
const initialData = {
  openModalCreateQuestion: false,
  listChoiceCorrect: null,
  listAnswer: null,
  content: null,
  type: null,
  listQuestion: null,
  isRefreshForm: false,
  nameTest: null,
  isOpenModalEditExam: false,
  isOpenModalEditSection: false,
  isOpenModalEditQuestion: false,
  isOpenModalEditAnswer: false,
  isOpenModalCreateQuestionInSection: false,
  isOpenModalListResults: false,
  isOpenModalCreateExamByExcel: false,
  fileInDescription: null,
  fileDescriptionInSection: null,
  isOpenModalGetPathFile: false,
  isLoggedIn: false,
  dataUser: null,
  openBanner: false,
  listBanner: null,
  openVstep: false,
  listVstep: null,
  openAptis: false,
  listAptis: null,
  openIelts: false,
  listIelts: null,
  isUpdateQuestion: false,
  isUpdateSection: false,
  typeSection: null,
  isUpdateExam: false,
  isModalDeleteSection: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "login": {
      return {
        ...state,
        isLoggedIn: true,
        dataUser: action.payload,
      };
    }
    case "openBanner": {
      return {
        ...state,
        openBanner: true,
        listBanner: action.payload,
      };
    }
    case "openVstep": {
      return {
        ...state,
        openVstep: true,
        listVstep: action.payload,
      };
    }
    case "openAptis": {
      return {
        ...state,
        openAptis: true,
        listAptis: action.payload,
      };
    }
    case "openIelts": {
      return {
        ...state,
        openIelts: true,
        listIelts: action.payload,
      };
    }
    case "openAcademicEnglish": {
      return {
        ...state,
        openAcademicEnglish: true,
        listAcademicEnglish: action.payload,
      };
    }

    case "openModalCreateQuestion":
      return { ...state, openModalCreateQuestion: true };
    case "closeModalCreateQuestion":
      return { ...state, openModalCreateQuestion: false };
    case "typeQuestion":
      return { ...state, typeQuestion: action.payload };
    case "listAnswer":
      return { ...state, listAnswer: action.payload };
    // case "listChoiceCorrect":
    //   return { ...state, listChoiceCorrect: action.payload };
    case "listChoiceCorrect":
      return {
        ...state,
        listChoiceCorrect: Array.isArray(action.payload)
          ? [...action.payload]
          : [action.payload],
      };

    case "resetListChoiceCorrect":
      return { ...state, listChoiceCorrect: [] };

    case "deleteListChoiceCorrect":
      return { ...state, listChoiceCorrect: null };

    case "content":
      return { ...state, content: action.payload };
    case "nameTest":
      return { ...state, nameTest: action.payload };
    case "type":
      return { ...state, type: action.payload };
    case "fileInDescription":
      return { ...state, fileInDescription: action.payload };
    case "deleteFileInDescription":
      return { ...state, fileInDescription: null };
    case "fileDescriptionInSection":
      return { ...state, fileDescriptionInSection: action.payload };
    case "createListQuestion":
      if (state.listQuestion === null) {
        return { ...state, listQuestion: [action.payload] };
      } else {
        return {
          ...state,
          listQuestion: [...state.listQuestion, action.payload],
        };
      }
    case "deleteLisQuestion":
      return { ...state, listQuestion: null };

    case "openModalEditExam":
      return { ...state, isOpenModalEditExam: true };
    case "closeModalEditExam":
      return { ...state, isOpenModalEditExam: false };

    case "openModalEditSection":
      return { ...state, isOpenModalEditSection: true };
    case "closeModalEditSection":
      return { ...state, isOpenModalEditSection: false };

    case "openModalEditQuestion":
      return { ...state, isOpenModalEditQuestion: true };
    case "closeModalEditQuestion":
      return { ...state, isOpenModalEditQuestion: false };

    case "openModalCreateExamByExcel":
      return { ...state, isOpenModalCreateExamByExcel: true };
    case "closeModalCreateExamByExcel":
      return { ...state, isOpenModalCreateExamByExcel: false };

    case "openModalGetPathFile":
      return { ...state, isOpenModalGetPathFile: true };
    case "closeModalGetPathFile":
      return { ...state, isOpenModalGetPathFile: false };

    case "openModalCreateQuestionInSection":
      return { ...state, isOpenModalCreateQuestionInSection: true };
    case "closeModalCreateQuestionInSection":
      return { ...state, isOpenModalCreateQuestionInSection: false };

    case "openModalListResults":
      return { ...state, isOpenModalListResults: true };
    case "closeModalListResults":
      return { ...state, isOpenModalListResults: false };

    case "updateQuestion":
      return { ...state, isUpdateQuestion: true };
    case "updateSection":
      return { ...state, isUpdateSection: true };
    case "updateExam":
      return { ...state, isUpdateExam: true };
    case "setUpdateExam":
      return { ...state, isUpdateExam: false };
    case "setIsModalEditSection":
      return { ...state, isModalDeleteSection: action.payload };

    case "changeTypeSection":
      return {
        ...state,
        typeSection: action.payload,
      };
    default:
      return state;
  }
};
function AppProvider({ children }) {
  const [data, dispatch] = useReducer(reducer, initialData);
  return (
    <AppContext.Provider value={{ data, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
