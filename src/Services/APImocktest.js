import request from "./request";

export const createExam = async (data) => {
  return request.post("/mocktest/exam/create", data);
};
export const getDataExam = () => {
  return request.get("/mocktest/exam/detailExams");
};

export const updateQuestion = (data) => {
  return request.post("/mocktest/question/update", data);
};

export const deleteQuestion = (id) => {
  return request.delete(`/mocktest/question/del/${id}`);
};

export const addQuestiontoSection = (data) => {
  return request.post("/mocktest/question/addToSection", data);
};
export const deleteSection = (id) => {
  return request.delete(`/mocktest/section/del/${id}`);
};
export const deleteExam = (id) => {
  return request.delete(`/mocktest/exam/del/${id}`);
};

export const addSectionToExam = (data) => {
  return request.post("/mocktest/exam/addSection", data);
};

export const createFile = (file) => {
  console.log("data res: ", file);
  const formData = new FormData();
  formData.append("file", file);
  return request.post("/file/upload", formData);
};

export const updateExam = (data) => {
  return request.put("/mocktest/exam/update", data);
};
export const updateSection = (data) => {
  return request.put("/mocktest/section/update", data);
};

export const statisticsUserResultsByUserResponseId = (data) => {
  return request.post("/mocktest/results/filter", data);
};

export const getAllUserResponse = () => {
  return request.get("/mocktest/userresponse/");
};

export const detailExamResults = (id) => {
  return request.get(`/mocktest/results/${id}`);
};

export const getAllExam = () => {
  return request.get("/mocktest/exam/");
};

export const getAllResultsByExamId = (data) => {
  return request.post("/mocktest/results/statistic", data);
};

export const uploadFileExcel = (data) => {
  return request.post("/mocktest/exam/importFile", data);
};

export const findExamByName = (name) => {
  return request.get(`/mocktest/exam/find/${name}`);
};
export const filterUserResponseByCondition = (data) => {
  return request.post("/mocktest/userresponse/filter", data);
};
