// import request from './request'
import axios from "./request";

// ************* Đăng Nhập **********
export const login = ({ username, password }) => {
  return axios.post("/auth/login", { username, password });
};

export const forgotPassword = ({ email }) => {
  return axios.post("/user/forgot/password", { email });
};

export const changepassword = (values) => {
  const password = {
    oldPassword: values.oldPassword,
    newPassword: values.newPassword,
    confirmNewPassword: values.confirmNewPassword,
  };
  return axios.post("/user/change/password", password);
};

// *************** User **********

// API create User
export const createUser = (values) => {
  return axios.post("/user", values);
};

//  get all User
export const getListUser = () => {
  return axios.get("/user/all");
};

//  get detail User
export const getInforUser = (userId) => {
  return axios.get(`/user/${userId}`);
};

// Update infor User
export const updateUser = (userId, values) => {
  return axios.put(`/user/${userId}`, values);
};

// Delete each User
export const deleteUser = (userId) => {
  return axios.delete(`/user/${userId}`);
};

//  Delete All User
export const delAllUser = (ids) => {
  return axios.delete("/user/delete/all", { data: ids });
};

// Filter infor User
export const filterUser = (values) => {
  // console.log('values', values);
  const userValues = {
    start: 0,
    limit: 10000,
    userName: values?.userName,
    dateFrom: values?.dateFrom,
    dateTo: values?.dateTo,
    dobFrom: values?.dobFrom,
    dobTo: values?.dobTo,
    name: values?.name,
    phone: values?.phone,
    email: values?.email,
    address: values?.address,
  };
  console.log("userValues", userValues);
  return axios.post("/user/filter", userValues);
};
export const filterStaff = (values) => {
  const userValues = {
    start: 0,
    limit: 10000,
    userName: values?.userName,
    dateFrom: values?.dateFrom,
    dateTo: values?.dateTo,
    dobFrom: values?.dobFrom,
    dobTo: values?.dobTo,
    name: values?.name,
    phone: values?.phone,
    email: values?.email,
    address: values?.address,
    roleId: "STAFF",
  };
  return axios.post("/user/filter", userValues);
};

export const filterCustomer = (values) => {
  const userValues = {
    start: 0,
    limit: 10000,
    userName: values?.userName,
    dateFrom: values?.dateFrom,
    dateTo: values?.dateTo,
    dobFrom: values?.dobFrom,
    dobTo: values?.dobTo,
    name: values?.name,
    phone: values?.phone,
    email: values?.email,
    address: values?.address,
    roleId: "CUSTOMER",
  };
  // console.log(userValues);
  return axios.post("/user/filter", userValues);
};

export const filterIsVerifiedCustomer = (values) => {
  const isVerifiedCustomer = {
    start: 0,
    limit: 10000,
    roleId: "CUSTOMER",
    isVerified: false,
  };
  return axios.post("/user/filter", isVerifiedCustomer);
};

// *********** Role ********
// getAll
export const getAllRole = () => {
  return axios.get("/roles/all");
};

// *********** Service *******

// API create Service
export const createService = (values) => {
  return axios.post("/service", values);
};

//  get all Service
export const getListService = () => {
  return axios.get("/service/all");
};

//  get detail Service
export const getInforService = (id) => {
  return axios.get(`/service/${id}`);
};

// Update infor Service
export const updateService = (id, values) => {
  return axios.put(`/service/${id}`, values);
};

// Delete each Service
export const deleteService = (id) => {
  return axios.delete(`/service/${id}`);
};

//  Delete All Service
export const delAllService = (ids) => {
  return axios.delete("/service/delete/all", { data: ids });
};

// Filter infor Service
export const filterService = (values) => {
  const ServiceValue = {
    start: 0,
    limit: 10000,
    name: values?.name,
    typeOfService: values?.typeOfService,
    learnOnlineOrOffline: values?.learnOnlineOrOffline,
    coursePrice: values?.coursePrice,
    dateFrom: values?.dateFrom,
    dateTo: values?.dateTo,
  };
  return axios.post("/service/filter", ServiceValue);
};
export const filterRL = (values) => {
  const ServiceValue = {
    start: 0,
    limit: 10000,
    name: values?.name,
    typeOfService: "REVIEW_LESSON",
    learnOnlineOrOffline: values?.learnOnlineOrOffline,
    coursePrice: values?.coursePrice,
    dateFrom: values?.dateFrom,
    dateTo: values?.dateTo,
  };
  return axios.post("/service/filter", ServiceValue);
};

// *********** News *******

// API create News
export const createNews = (values) => {
  return axios.post("/news", values);
};

//  get all News
export const getListNews = () => {
  return axios.get("/news/all");
};

//  get detail News
export const getInforNews = (id) => {
  return axios.get(`/news/${id}`);
};

// Update infor News
export const updateNews = (id, values) => {
  return axios.put(`/news/${id}`, values);
};

// Delete each News
export const deleteNews = (id) => {
  return axios.delete(`/news/${id}`);
};

//  Delete All News
export const delAllNews = (ids) => {
  return axios.delete("/news/delete/all", { data: ids });
};

// Filter infor News
export const filterNews = (values) => {
  const newsValue = {
    start: 0,
    limit: 10000,
    name: values?.name,
    dateFrom: values?.dateFrom,
    dateTo: values?.dateTo,
  };
  return axios.post("/news/filter", newsValue);
};
// *********** Admission *******

// API create Admission
export const createAdmission = (values) => {
  return axios.post("/admissions", values);
};

// Get all Admissions
export const getListAdmissions = () => {
  return axios.get("/admissions/all");
};

// Get detail Admission
export const getInforAdmission = (id) => {
  return axios.get(`/admissions/${id}`);
};

// Update Admission
export const updateAdmission = (id, values) => {
  return axios.put(`/admissions/${id}`, values);
};

// Delete each Admission
export const deleteAdmission = (id) => {
  return axios.delete(`/admissions/${id}`);
};

// Delete All Admissions
export const delAllAdmissions = (ids) => {
  return axios.delete("/admissions/delete/all", { data: ids });
};

// Filter Admissions
export const filterAdmissions = (values) => {
  const admissionValue = {
    start: 0,
    limit: 10000,
    title: values?.title,
    // name: values?.title,
    dateFrom: values?.dateFrom,
    dateTo: values?.dateTo,
  };
  return axios.post("/admissions/filter", admissionValue);
};

// *********** Document *******

// API create Document
export const createDocument = (values) => {
  return axios.post("/document", values);
};

//  get all Document
export const getListDocument = () => {
  return axios.get("/document/all");
};

//  get detail Document
export const getInforDocument = (id) => {
  return axios.get(`/document/${id}`);
};

// Update infor Document
export const updateDocument = (id, values) => {
  return axios.put(`/document/${id}`, values);
};

// Delete each Document
export const deleteDocument = (id) => {
  return axios.delete(`/document/${id}`);
};

//  Delete All Document
export const delAllDocument = (ids) => {
  return axios.delete("/document/delete/all1", { data: ids });
};

// Filter infor Document
export const filterDocument = (values) => {
  const docValue = {
    start: 0,
    limit: 10000,
    name: values?.name,
    dateFrom: values?.dateFrom,
    dateTo: values?.dateTo,
    status: values?.status,
  };
  return axios.post("/document/filter", docValue);
};

// ********** ExamSchedule **********

// API create ES
export const createES = (values) => {
  return axios.post("/exam/schedule", values);
};

//  get all ES
export const getListES = () => {
  return axios.get("/exam/schedule/all");
};

//  get detail ES
export const getInforES = (id) => {
  return axios.get(`/exam/schedule/${id}`);
};

// Update infor ES
export const updateES = (id, values) => {
  return axios.put(`/exam/schedule/${id}`, values);
};

// Delete each ES
export const deleteES = (id) => {
  return axios.delete(`/exam/schedule/${id}`);
};

//  Delete All ES
export const delAllES = (ids) => {
  return axios.delete("/exam/schedule/delete/all", { data: ids });
};

// Filter infor ES
export const filterES = (values) => {
  const examSchedule = {
    start: 0,
    limit: 10000,
    areaId: values?.areaId,
    nameArea: values?.nameArea,
    schoolId: values?.schoolId,
    nameExamSchool: values?.nameExamSchool,
  };
  return axios.post("/exam/schedule/filter", examSchedule);
};

// ****************** UploadFile ******
export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return axios.post("/file/upload", formData);
};

// *****************DislayManager*******

// API create Display
export const createDisplay = (values) => {
  return axios.post("/display", values);
};

//  get all Display
export const getListDisplay = () => {
  return axios.get("/display/all");
};

//  get detail Display
export const getInforDisplay = (id) => {
  return axios.get(`/display/${id}`);
};

// Update infor Display
export const updateDisplay = (id, values) => {
  return axios.put(`/display/${id}`, values);
};

// Delete each Display
export const deleteDisplay = (id) => {
  return axios.delete(`/display/${id}`);
};

//  Delete All Display
export const delAllDisplay = (ids) => {
  return axios.delete("/display/delete/all", { data: ids });
};

// Filter infor Display
export const filterDisplay = (values) => {
  const docValue = {
    start: 0,
    limit: 10000,
    docName: values?.docName,
  };
  return axios.post("/display/filter", docValue);
};

//  get all Slide
export const getListSlide = () => {
  return axios.get("/slide/all");
};

// Update infor Slide
export const updateSlide = (id, values) => {
  return axios.put(`/slide/${id}`, values);
};

// *************** Consulting Register ******

//  get all Consulting Register
export const getListConsultingRegister = () => {
  return axios.get("/consulting/registration/all");
};

//  get detail Consulting Register
export const getInforConsultingRegister = (id) => {
  return axios.get(`/consulting/registration/${id}`);
};

// Update infor Consulting Register
export const updateConsultingRegister = (id, values) => {
  return axios.put(`/consulting/registration/${id}`, values);
};

// Delete each Consulting Register
export const deleteConsultingRegister = (id) => {
  return axios.delete(`/consulting/registration/${id}`);
};

//  Delete All Consulting Register
export const delAllConsultingRegister = (ids) => {
  return axios.delete("/consulting/registration/delete/all", { data: ids });
};

// Filter infor Consulting Register
export const filterConsultingRegister = (values) => {
  const docValue = {
    start: 0,
    limit: 10000,
    name: values?.name,
    dateFrom: values?.dateFrom,
    dateTo: values?.dateTo,
    email: values?.email,
    phone: values?.phone,
    status: values?.status,
  };
  return axios.post("/consulting/registration/filter", docValue);
};

// *************** Course Information ******

//  get all CourseInformation
export const getListCourseInformation = () => {
  return axios.get("course/information/all");
};

//  get detail CourseInformation
export const getInforCourseInformation = (id) => {
  return axios.get(`course/information/${id}`);
};

// Update infor CourseInformation
export const updateCourseInformation = (id, values) => {
  return axios.put(`course/information/${id}`, values);
};

// Delete each CourseInformation
export const deleteCourseInformation = (id) => {
  return axios.delete(`course/information/${id}`);
};

//  Delete All CourseInformation
export const delAllCourseInformation = (ids) => {
  return axios.delete("course/information/delete/all", { data: ids });
};

// Filter infor CourseInformation
export const filterCourseInformation = (values) => {
  const docValue = {
    start: 0,
    limit: 10000,
    name: values?.name,
    dateFrom: values?.dateFrom,
    dateTo: values?.dateTo,
    email: values?.email,
    address: values?.address,
    phone: values?.phone,
    status: values?.status,
  };
  return axios.post("course/information/filter", docValue);
};

// *************** Consulting Register1 ******

//  get all Consulting Register
export const getListCourseRegister1 = () => {
  return axios.get("/course/registrationn/all");
};

//  get detail Consulting Register
export const getInforCourseRegister1 = (id) => {
  return axios.get(`/course/registrationn/${id}`);
};

// Update infor Consulting Register
export const updateCourseRegister1 = (id, values) => {
  return axios.put(`/course/registrationn/${id}`, values);
};

// Delete each Consulting Register
export const deleteCourseRegister1 = (id) => {
  return axios.delete(`/course/registrationn/${id}`);
};

//  Delete All Consulting Register
export const delAllCourseRegister1 = (ids) => {
  return axios.delete("/course/registrationn/delete/all", { data: ids });
};

// Filter infor Consulting Register
export const filterCourseRegister1 = (values) => {
  const docValue = {
    start: 0,
    limit: 10000,
    name: values?.name,
    dateFrom: values?.dateFrom,
    dateTo: values?.dateTo,
    email: values?.email,
    phone: values?.phone,
    status: values?.status,
  };
  return axios.post("/course/registrationn/filter", docValue);
};

// ******************** profile user **************
export const getProfileUser = () => {
  return axios.get("/user/profile");
};

// ******************** Dashboard ********************
export const getDashboard = (year) => {
  return axios.get(`/auth/dashboard/${year}`);
};
