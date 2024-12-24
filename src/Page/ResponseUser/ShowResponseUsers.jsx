import { Button, Dropdown, Form, Input, Popover, Space, Table, notification } from "antd";
import React, { useContext, useEffect, useState } from "react";
import {
  filterUserResponseByCondition,
  getAllUserResponse,
  statisticsUserResultsByUserResponseId,
} from "../../Services/APImocktest";
import { Link } from "react-router-dom";
import { AppContext } from "../../Components/AppContext/AppContext";
import ModalListUserResults from "../../Components/Modal/ModalListUserResults";
import { DownOutlined, FilterOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
const { Column } = Table;
function ShowResponseUsers(props) {
  const { data, dispatch } = useContext(AppContext);
  const [data1, setData1] = useState([]);
  const [nameExam, setNameExam] = useState(null);
  const [form] = Form.useForm();
  const [email, setEmail] = useState(null);
  const [listResults, setListResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [isSort, setIsSort] = useState(false);
  const [open, setOpen] = useState(false);
  const items = [
    {
      label: (
        <Button
          className="border-0 shadow-transparent"
          onClick={() => setIsSort(false)}
        >
          Tăng dần
        </Button>
      ),
      key: "0",
    },
    {
      label: (
        <Button className="border-0" onClick={() => setIsSort(true)}>
          Giảm dần
        </Button>
      ),
      key: "1",
    },
  ];
  const hanldeGetData = () => {
    getAllUserResponse().then((res) => {
      console.log(res.data.data.items);
      setData1(res?.data?.data?.items);
    });
  };

  const handleModal = (id, name, email) => {
    // setResponseId(id)
    setNameExam(name);
    setEmail(email);
    dispatch({ type: "openModalListResults" });
    statisticsUserResultsByUserResponseId({ userResponseId: id }).then(
      (res) => {
        // console.log(res.data.body.data.items);
        setListResults(res?.data?.body?.data?.items);
        setTotal(res?.data?.body?.data?.total);
      }
    );
  };

  useEffect(() => {
    hanldeGetData();
  }, []);
  const onFinish = (values) => {
    // console.log("values ", {values.email , values.examName , isSort});
    const data = {
     email :  values.email ,examName : values.examName , isSort
    }
    console.log(data);
    filterUserResponseByCondition(data).then((res)=>{
      console.log("Data respone " ,res?.data?.body);

      if(res?.data?.body?.success == true && res?.data?.body?.data?.total != 0 ){
        setData1(res?.data?.body?.data?.items)
        console.log("Ok rồi đấy ");
        console.log(res?.data?.body?.data?.items);
      }else{
        notification.error({message : "Không có dữ liệu"})
      }
    }).catch((err)=>{
      console.log(err);
    })
    form.resetFields()
  };

  const content = (
    <Form
      className="w-[600px] py-5 px-5"
      onFinish={onFinish}
      layout="vertical"
      form={form}
      onReset={true}
    >
      <h2 className="font-medium text-xl uppercase text-center my-5">
        Chọn thông tin để lọc
      </h2>
      <div className="grid grid-cols-2 gap-5">
        <Form.Item
          name="email"
          className="col-span-1"
          label="Nhập địa chỉ email "
        >
          <Input placeholder="Nhập vào email" />
        </Form.Item>
        <Form.Item
          name="examName"
          className="col-span-1"
          label="Nhập vào tên bài thi"
        >
          <Input placeholder="Nhập vào tên bài thi " />
        </Form.Item>

        <Form.Item className=" w-full col-span-1 mt-5">
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            className="mr-auto block "
          >
            <Button className="mr-auto" icon={<DownOutlined />}>
              Số lần thi
            </Button>
          </Dropdown>
        </Form.Item>

        <Form.Item className="col-span-1 mt-5 ">
          <div className="flex">
            <Button
              className=" ml-auto block bg-orange-600 text-yellow-50"
              onClick={() => [setOpen(false) , form.resetFields()]}
            >
              Hủy lọc
            </Button>
            <Button
              className=" ml-auto block bg-lime-500 text-yellow-50"
              htmlType="submit"
              onClick={() => setOpen(false)}
            >
              Lọc theo điều kiện
            </Button>
          </div>
        </Form.Item>
      </div>
    </Form>
  );

  return (
    <div className="h-[100vh]">
      <h2 className="text-center text-xl text-orange-500 uppercase font-medium mb-10">
        trang quản lý bài thi của học viên{" "}
      </h2>
      <Popover
        className="block ml-auto mr-[5%] mb-10"
        placement="bottom"
        trigger="click"
        content={content}
        open={open}
      >
        <Button icon={<FilterOutlined />} onClick={() => setOpen(true)} />
      </Popover>

      <Table dataSource={data1} className="text-center h-[80vh] overflow-auto">
        <Column align="center" title="Email" dataIndex="email" key="nameExam" />
        <Column
          align="center"
          title="Tên người dùng"
          dataIndex="userName"
          key="userName"
        />
        <Column
          align="center"
          title="Tên bài thi"
          dataIndex="examName"
          key="examName"
        />
        <Column
          align="center"
          title="Số lần đã thi"
          dataIndex="count"
          key="count"
        />
        <Column
          align="center"
          title="Giới hạn số lần "
          dataIndex="maxCount"
          key="maxCount"
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
                  handleModal(record.id, record.examName, record.email)
                }
              >
                Xem chi tiết{" "}
              </Button>
            </Space>
          )}
        />
      </Table>

      <ModalListUserResults
        listResults={listResults}
        total={total}
        nameExam={nameExam}
        email={email}
      />
    </div>
  );
}

export default ShowResponseUsers;
