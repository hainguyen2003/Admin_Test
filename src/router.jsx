import { createBrowserRouter } from "react-router-dom";
import PageETest from "./Page/PageETest/PageETest";
import Login from "./Page/Login/Login";
import TableCustomer from "./Components/Table/User/Customer/TableCustomer";
import TableUser from "./Components/Table/User/TableUser";
import TableStaff from "./Components/Table/User/Staff/TableStaff";
import EduProgram from "./Components/Table/EducationProgram/EduProgram";
import ForgotPassword from "./Page/Register/Register";
import TableNews from "./Components/Table/News/News";
import DetailUser from "./Components/Details/DetailUser/DetailUser";
import ExamSchedule from "./Components/Table/ExamSchedule/ExamSchedule";
import Document from "./Components/Table/Document/Document";
import DetailDoc from "./Components/Details/DetailDoc/DetailDoc";
import DetailES from "./Components/Details/DetailES/DetailES";
import DetailNews from "./Components/Details/DetailNews/DetailNews";
import ReviewShedule from "./Components/Table/ReviewSchedule/ReviewShedule";
import DisplayHome from "./Components/Table/DisplayManager/DisplayHome/DisplayHome";
import DisplayPages from "./Components/Table/DisplayManager/DisplayPages/DisplayPages";
import DisplayProgram from "./Components/Table/DisplayManager/DisplayProgram/DisplayProgram";
import DisplayBanner from "./Components/Table/DisplayManager/DisplayProgram/DisplayBanner/DisplayBanner";
import DisplayVstep from "./Components/Table/DisplayManager/DisplayProgram/DisplayVstep/DisplayVstep";
import DisplayAptis from "./Components/Table/DisplayManager/DisplayProgram/DisplayAptis/DisplayAptis";
import AcademicEnglish from "./Components/Table/DisplayManager/DisplayProgram/AcademicEnglish/AcademicEnglish";
import IELTS from "./Components/Table/DisplayManager/DisplayProgram/IELTS/IELTS";
import DetailDisplay from "./Components/Details/DetailDisplay/DetailDisplay";
import Slide from "./Components/Table/DisplayManager/DisplayPages/DisplaySlide";
import RecordUser from "./Components/RecordUser/RecordUser";
import Contest from "./Page/MockTest/Contest";
import CreateQuestion from "./Page/MockTest/CreateQuestion";
import InforExams from "./Page/Exam/InforExams";
import AddSectionToExam from "./Page/MockTest/AddSectionToExam";
import PageMockTest from "./Page/MockTest/PageMockTest";
import ConsultingRegister from "./Components/Table/ConsultingRegister/ConsultingRegister";
import DetailConsultingRegister from "./Components/Details/ConsultingRegister/ConsultingRegister";
import VerifiedCustomer from "./Components/Table/User/Customer/VerifiedCustomer";
import NonVerifiedCustomer from "./Components/Table/User/Customer/NonVerifiedCustomer";
import TOEIC from "./Components/Table/DisplayManager/DisplayProgram/TOEIC/TOEIC";
// import Editor from "./Components/CKEditor/CKEditor";
import StatisticsUserResponse from "./Page/Statistics/StatisticsUserResponse";
import ShowResponseUsers from "./Page/ResponseUser/ShowResponseUsers";
import HomePageStatistic from "./Page/Statistics/HomePageStatistic";
import DetailExamresults from "./Page/Exam/DetailExamresults";
import StatisticExam from "./Page/Statistics/StatisticExam";
import ChangePassword from "./Components/Modal/ChangePassword";
import CollapseExam from "./Page/MockTest/CollapseExam";

import ConsultingRegister1 from "./Components/Table/CourseInformation/CourseInformation";
import DetailConsultingRegister1 from "./Components/Details/CourseInformation/CourseInformation";
import TableAdmissions from "./Components/Table/Admission/Admission";
import DetailAdmission from "./Components/Details/DetailAdmission/DetailAdmission";



// import Editor from "./Components/CKEditor/CKEditor";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    // element: <Editor />,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />,
  },
  {
    path: "/adminpage",
    element: <PageETest />,
    children: [
      {
        path: "user",
        element: <TableUser />,
        children: [
          {
            path: "detailuser/:detailuserId",
            element: <DetailUser />,
          },
          {
            path: "recorduser",
            element: <RecordUser />,
          },
          {
            path: "changePassword",
            element: <ChangePassword />,
          },
        ],
      },
      {
        path: "staff",
        element: <TableStaff />,
        children: [
          {
            path: "detailstaff/:detailstaffId",
            element: <DetailUser />,
          },
        ],
      },
      {
        path: "customer",
        element: <TableCustomer />,
        children: [
          {
            path: "detailcustomer/:detailcustomerId",
            element: <DetailUser />,
          },
        ],
      },
      {
        path: "verifiedCustomer",
        element: <VerifiedCustomer />,
        children: [
          {
            path: "detailverifiedcustomer/:detailverifiedcustomerId",
            element: <DetailUser />,
          },
        ],
      },
      {
        path: "nonVerifiedCustomer",
        element: <NonVerifiedCustomer />,
        children: [
          {
            path: "detailnonVerifiedCustomer/:detailnonVerifiedCustomerId",
            element: <DetailUser />,
          },
        ],
      },
      {
        path: "eduprogram",
        element: <EduProgram />,
        children: [
          {
            path: "detaileduprogram/:detaileduprogramId",
          },
        ],
      },
      {
        path: "news",
        element: <TableNews />,
        children: [
          {
            path: "detailnews/:detailnewsId",
            element: <DetailNews />,
          },
        ],
      },
      {
        path: "admissions",
        element: <TableAdmissions />,
        children: [
          {
            path: "detailadmission/:admissionId",
            element: <DetailAdmission />,
          },
        ],
      },
      {
        path: "examschedule",
        element: <ExamSchedule />,
        children: [
          {
            path: "detailexamschedule/:detailexamscheduleId",
            element: <DetailES />,
          },
        ],
      },
      {
        path: "reviewschedule",
        element: <ReviewShedule />,
        children: [
          {
            path: "detailreviewschedule/:detailreviewscheduleId",
            element: <DetailES />,
          },
        ],
      },
      {
        path: "document",
        element: <Document />,
        children: [
          {
            path: "detaildoc/:detaildocId",
            element: <DetailDoc />,
          },
        ],
      },
      {
        path: "displayhome",
        element: <DisplayHome />,
        children: [
          {
            path: "detaildisplayhome/:detaildisplayhomeId",
            element: <DetailDisplay />,
          },
        ],
      },
      {
        path: "displaypages",
        element: <DisplayPages />,
        children: [
          {
            path: "detaildisplaypages/:detaildisplaypagesId",
            element: <DetailDisplay />,
          },
        ],
      },
      {
        path: "displayprogram",
        element: <DisplayProgram />,
        children: [
          {
            path: "detaildisplayprogram/:detaildisplayprogramId",
            element: <DetailDisplay />,
          },
        ],
      },
      {
        path: "displayBanner",
        element: <DisplayBanner />,
        children: [
          {
            path: "detaildisplayBanner/:detaildisplayBannerId",
            element: <DetailDisplay />,
          },
        ],
      },
      {
        path: "displayVstep",
        element: <DisplayVstep />,
        children: [
          {
            path: "detaildisplayVstep/:detaildisplayVstepId",
            element: <DetailDisplay />,
          },
        ],
      },
      {
        path: "displayaptis",
        element: <DisplayAptis />,
        children: [
          {
            path: "detaildisplayaptis/:detaildisplayaptisId",
            element: <DetailDisplay />,
          },
        ],
      },
      {
        path: "displaytoeic",
        element: <TOEIC />,
        children: [
          {
            path: "detaildisplaytoeic/:detaildisplaytoeicId",
            element: <DetailDisplay />,
          },
        ],
      },
      {
        path: "displayAcademicEnglish",
        element: <AcademicEnglish />,
        children: [
          {
            path: "detaildisplayAcademicEnglish/:detaildisplayAcademicEnglishId",
            element: <DetailDisplay />,
          },
        ],
      },
      {
        path: "displayielts",
        element: <IELTS />,
        children: [
          {
            path: "detaildisplayielts/:detaildisplayieltsId",
            element: <DetailDisplay />,
          },
        ],
      },
      {
        path: "displayslide",
        element: <Slide />,
      },

      {
        path: "contest",
        element: <Contest />,
      },
      {
        path: "create-question",
        element: <CreateQuestion />,
      },
      {
        path: `add-section/:id`,
        element: <AddSectionToExam />,
      },

      {
        path: "infor-exam",
        element: <InforExams />,
      },
      {
        path: "detail-exam/:examId",
        element: <CollapseExam />,
      },
      {
        path: "statistics/:responseId",
        element: <StatisticsUserResponse />,
      },
      {
        path: "statistics",
        element: <HomePageStatistic />,
      },
      {
        path: "statistics/exam/:examId",
        element: <StatisticExam />,
      },
      {
        path: "user-test",
        element: <ShowResponseUsers />,
      },
      {
        path: "detail-results/:resultId",
        element: <DetailExamresults />,
      },
      {
        path: "consultingRegister",
        element: <ConsultingRegister />,
        children: [
          {
            path: "detailConsultingRegister/:detailConsultingRegisterId",
            element: <DetailConsultingRegister />,
          },
        ],
      },
      {
        path: "consultingRegister1",
        element: <ConsultingRegister1 />,
        children: [
          {
            path: "detailConsultingRegister1/:detailConsultingRegister1Id",
            element: <DetailConsultingRegister1 />,
          },
        ],
      },
    ],
  },
]);
