import { PageContainer } from "@ant-design/pro-components";
import { Button, Drawer, Input, Modal, message, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  SolutionOutlined,
  CloseOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { getOder, updateOrderStatus } from "../../Services/lead";
import DetailOrder from "../Details/Order/DetailOrder";

function TableOrder(props) {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]); // Đặt mặc định là mảng
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [openDrawer, setOpenDrawer] = useState();
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const { confirm } = Modal;

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleGetOrders = () => {
    setLoading(true);
    getOder()
      .then((res) => {
        console.log("API response:", res?.data); // Kiểm tra dữ liệu từ API
        const data = res?.data?.data?.items; // Lấy danh sách items từ dữ liệu trả về
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          console.error("Dữ liệu không hợp lệ:", data);
          setOrders([]);
        }
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
        message.error("Không thể tải danh sách đơn hàng");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetOrders();
  }, []);

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Tổng tiền",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `${parseInt(amount).toLocaleString()} VND`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color;
        switch (status) {
          case "PENDING":
            color = "gold";
            break;
          case "PAID":
            color = "green";
            break;
          case "FAILED":
            color = "red";
            break;
          default:
            color = "grey"; // màu mặc định
        }
        return <span style={{ color, fontWeight: "bold" }}>{status}</span>;
      },
    },
    {
      title: "Ngày thanh toán",
      dataIndex: "paymentDate",
      key: "paymentDate",
      render: (date) => (date ? new Date(date).toLocaleString() : "Không có"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        if (record.status === "PAID" || record.status === "FAILED") {
          // Nếu trạng thái là PAID hoặc FAILED, chỉ hiển thị nút Xem chi tiết
          return (
            <Button
              className="detail"
              icon={<SolutionOutlined />}
              onClick={() => {
                setOpenDrawer(true);
                navigate(`/adminpage/TableOrder/detailOrder/${record.id}`);
              }}
            ></Button>
          );
        } else {
          // Nếu trạng thái khác PAID và FAILED, hiển thị thêm các nút Hủy và Xác nhận
          return (
            <Space>
              {/* Nút Xem chi tiết */}
              <Button
                className="detail"
                icon={<SolutionOutlined />}
                onClick={() => {
                  setOpenDrawer(true);
                  navigate(`/adminpage/TableOrder/detailOrder/${record.id}`);
                }}
              ></Button>
              <Button
                danger
                icon={<CloseOutlined />}
                title="Hủy đơn hàng"
                onClick={() =>
                  confirm({
                    title: "Hủy đơn hàng",
                    content: `Bạn có chắc muốn hủy đơn hàng ${record.orderId}?`,
                    onOk: () => {
                      updateOrderStatus(record.id, "FAILED")
                        .then(() => {
                          message.success("Đã hủy đơn hàng thành công!");
                          handleGetOrders(); // Load lại danh sách đơn hàng
                        })
                        .catch((error) => {
                          console.error("Lỗi khi hủy đơn hàng:", error);
                          message.error("Lỗi khi hủy đơn hàng!");
                        });
                    },
                    onCancel: () => console.log("Hủy hành động"),
                  })
                }
              />

              <Button
                type="default"
                icon={<EditOutlined />}
                title="Xác nhận đơn hàng"
                onClick={() =>
                  confirm({
                    title: "Xác nhận đơn hàng",
                    content: `Bạn có chắc muốn xác nhận đơn hàng ${record.orderId}?`,
                    onOk: () => {
                      updateOrderStatus(record.id, "PAID")
                        .then(() => {
                          message.success("Đã xác nhận đơn hàng thành công!");
                          handleGetOrders(); // Load lại danh sách đơn hàng
                        })
                        .catch((error) => {
                          console.error("Lỗi khi xác nhận đơn hàng:", error);
                          message.error("Lỗi khi xác nhận đơn hàng!");
                        });
                    },
                    onCancel: () => console.log("Hủy hành động"),
                  })
                }
              />
            </Space>
          );
        }
      },
    },
  ];

  return (
    <PageContainer
      title={`Danh sách đơn hàng`}
      extra={[
        <Space key="extra-buttons">
          <Input.Search
            placeholder="Nhập mã đơn hàng"
            onChange={(e) => setSearchData(e.target.value)}
            onSearch={(value) => {
              if (Array.isArray(orders)) {
                const filteredOrders = orders.filter((order) =>
                  order.orderId.toString().includes(value)
                );
                setOrders(filteredOrders);
              } else {
                console.error("orders không phải là một mảng:", orders);
              }
            }}
          />
        </Space>,
      ]}
    >
      <Table
        rowKey={(record) => record.orderId}
        size="middle"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={orders}
        scroll={{ y: 413 }}
        loading={loading}
      />
      <Drawer
        title="Thông tin chi tiết đơn hàng"
        width={550}
        open={openDrawer}
        onClose={() => {
          navigate("/adminpage/TableOrder");
          setOpenDrawer(false);
        }}
      >
        <DetailOrder />
      </Drawer>
    </PageContainer>
  );
}

export default TableOrder;
