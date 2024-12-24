import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getInforES } from "../../../Services/lead";
import { Descriptions } from "antd";

function DetailES(props) {
  const location = useLocation();
  const [dataES, setDataES] = useState();
  const docInfor = location.pathname.split("/");
  const idPath = docInfor[docInfor.length - 1];

  const handleGetInforES = async (idPath) => {
    getInforES(idPath).then((res) => {
      if (res.status === 200) {
        setDataES(res?.data?.data);
      }
    });
  };
  // console.log(dataES);
  useEffect(() => {
    handleGetInforES(idPath);
  }, [idPath]);

  return (
    <div>
      <Descriptions>
        <Descriptions.Item label="Mã khu vực">
          {" "}
          {dataES?.areaId}{" "}
        </Descriptions.Item>
        <Descriptions.Item label="Tên khu vực" span={2}>
          {" "}
          {dataES?.nameArea}{" "}
        </Descriptions.Item>
        <Descriptions.Item label="Mã trường thi">
          {" "}
          {dataES?.schoolId}{" "}
        </Descriptions.Item>
        <Descriptions.Item label="Tên trường thi" span={2}>
          {" "}
          {dataES?.nameExamSchool}{" "}
        </Descriptions.Item>
        <Descriptions.Item label="Hình thức thi">
          {" "}
          {dataES?.examMethod}{" "}
        </Descriptions.Item>
        <Descriptions.Item label="Đối tượng thi" span={2}>
          {" "}
          {dataES?.examinationObject}{" "}
        </Descriptions.Item>
        <Descriptions.Item label="Thời gian thi" span={4}>
          {" "}
          {dataES?.examTime}{" "}
        </Descriptions.Item>
        <Descriptions.Item label="Hạn đăng ký" span={4}>
          {" "}
          {dataES?.registrationTerm}{" "}
        </Descriptions.Item>

        <Descriptions.Item label="Lệ phí thi" span={4}>
          {" "}
          {dataES?.examinationFee}{" "}
        </Descriptions.Item>
        <Descriptions.Item label="Hồ sơ đăng ký thi" span={4}>
          {" "}
          {dataES?.examRegistrationRecords}{" "}
        </Descriptions.Item>
        <Descriptions.Item label="Thời gian nhận chứng chỉ" span={4}>
          {" "}
          {dataES?.certificationTime}{" "}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày tạo" span={4}>
          {" "}
          {dataES?.createdDate}{" "}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày cập nhật" span={2}>
          {" "}
          {dataES?.updateDate}{" "}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}

export default DetailES;
