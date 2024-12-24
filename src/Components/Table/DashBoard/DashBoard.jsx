import { PageContainer } from "@ant-design/pro-components";
import { Select, Typography, Spin } from "antd";
import React, { useEffect, useState } from "react";
import {
  BookOutlined,
  DollarCircleOutlined,
  ProfileOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import DashBoardCard from "../../Card/DashBoard";
import { getDashboard } from "../../../Services/lead";
import {
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
  ResponsiveContainer,
} from "recharts";

function DashBoard() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [years, setYears] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearOptions = [];
    for (let year = 2019; year <= currentYear; year++) {
      yearOptions.push({ label: `Năm ${year}`, value: year });
    }
    setYears(yearOptions);
  }, []);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getDashboard(selectedYear);
        if (response.data.success) {
          setDashboard(response.data.data);
        } else {
          throw new Error(response.data.error || "Dữ liệu không hợp lệ");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [selectedYear]);

  const handleYearChange = (value) => {
    setSelectedYear(value);
  };

  return (
    <PageContainer title="Thống kê">
      {/* Thẻ DashBoard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-4 bg-white p-4 rounded shadow-md">
        <DashBoardCard
          title={"Người dùng"}
          value={dashboard?.countUser || 0}
          icon={<UserOutlined />}
        />
        <DashBoardCard
          title={"Khóa học (năm)"}
          value={dashboard?.countService || 0}
          icon={<BookOutlined />}
        />
        <DashBoardCard
          title={"Tin tức (năm)"}
          value={dashboard?.countNew || 0}
          icon={<ProfileOutlined />}
        />
        <DashBoardCard
          title={"Đơn hàng (năm)"}
          value={dashboard?.countOrder || 0}
          icon={<ShoppingCartOutlined />}
        />
        <DashBoardCard
          title={"Doanh thu (năm)"}
          value={dashboard?.totalCost || 0}
          icon={<DollarCircleOutlined />}
        />
      </div>
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Typography.Title level={4} className="m-0">
            Biểu đồ Doanh thu theo từng năm
          </Typography.Title>
          <Select
            placeholder="Chọn năm"
            className="w-full sm:w-40 lg:w-60"
            onChange={handleYearChange}
            value={selectedYear}
            options={years}
          />
        </div>
        {loading ? (
          <Spin size="large" />
        ) : error ? (
          <Typography.Text type="danger">Lỗi: {error}</Typography.Text>
        ) : (
          <>
            {/* Biểu đồ */}
            <div className="mt-5 bg-white p-4 rounded shadow-md">
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={dashboard?.listSale || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="totalCost" fill="#8884d8" />
                  <Line dataKey="totalCost" stroke="#82ca9d" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </PageContainer>
  );
}

export default DashBoard;
