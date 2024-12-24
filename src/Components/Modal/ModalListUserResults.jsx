import { Button, Modal, Space, Table, message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext/AppContext";
import { statisticsUserResultsByUserResponseId } from "../../Services/APImocktest";
import { useNavigate } from "react-router-dom";

function ModalListUserResults({ listResults, total,nameExam ,email}) {
  const { data, dispatch } = useContext(AppContext);
  const { Column } = Table;
  const { isOpenModalListResults } = data;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Số lượng mục trên mỗi trang
  const navigate = useNavigate();
  const handleCancel = () => {
    dispatch({ type: "closeModalListResults" });
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <div>
      <Modal
        open={isOpenModalListResults}
        onCancel={handleCancel}
        maskClosable={false}
        width={1200}
        footer={null}
      >
        <h2 className="text-center text-orange-500 font-medium text-xl mb-10">
          Danh sách kết quả{" "}
        </h2>
        <p className="">Tên bài thi : {nameExam}</p>
        <p>Tên học viên : {email}</p>
        <Table
          dataSource={listResults}
          className="text-center"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: total, // Tổng số mục
            onChange: handlePageChange,
          }}
        >
          <Column align="center" title="Điểm" dataIndex="totalPoint" key="point" />
          <Column
            align="center"
            title="Đánh giá bài thi"
            dataIndex="comment"
            key="comment"
          />
          <Column
            align="center"
            title="Thời gian thi"
            dataIndex="createDate"
            key="createDate"
          />

          <Column
            align="center"
            title="Action"
            key="action"
            render={(_, record) => (
              <Space size="middle">
                {/* <Link to={`/adminpage/detail-results/${record.id}`}>Xem chi tiết </Link> */}
                <Button
                  onClick={() =>
                    navigate(`/adminpage/detail-results/${record.id}`, {
                      state: email,
                    })
                  }
                >
                  Xem chi tiết
                </Button>
                {/* <Button onClick={()=> message.info(record.id)}>Xem chi tiết </Button> */}
              </Space>
            )}
          />
        </Table>
      </Modal>
    </div>
  );
}

export default ModalListUserResults;
