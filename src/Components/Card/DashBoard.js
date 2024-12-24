import { Card, Space, Statistic } from "antd";
import React from "react";

function DashBoardCard({ title, value, icon }) {
  return (
    <>
      <Card>
        <Space direction="horizontal">
          {icon}
          <Statistic title={title} value={value} />
        </Space>
      </Card>
    </>
  );
}

export default DashBoardCard;
