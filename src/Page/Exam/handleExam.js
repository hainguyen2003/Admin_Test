import { notification } from "antd";
import {
  deleteExam,
  getAllExam,
  getDataExam,
} from "../../Services/APImocktest";
import request from "../../Services/request";
export const handelDeleteExam = (id) => {
  console.log(id);
  deleteExam(id)
    .then((res) => {
      if (res.data === true) {
        notification.success({ message: "Xóa thành công bài thi " });
        handleGetDataExam();
      }
      // console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const handleGetDataExam = async () => {
  try {
    const res = await getDataExam();
    return res?.data?.data?.items || [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const handleGetAllExam = async () => {
  try {
    const res = await getAllExam();
    console.log("data exam :", res?.data?.body?.data?.items);
    return res?.data?.body?.data?.items || [];
  } catch (err) {
    console.log(err);
    return [];
  }
};
export const handleSetData = async (data, type ) => {
  
  const newData =(type !== "all") ? await data?.filter((item) => item?.type === type) : await data ;
  return newData;
};
