import { Button, Dropdown, message } from "antd";
import React, { useContext } from "react";
import { AppContext } from "../../Components/AppContext/AppContext";

function DropDown() {
  const { data, dispatch } = useContext(AppContext);
  const onClick = ({ key }) => {
    dispatch({ type: "changeTypeSection", payload: key });
  };
  const items = [
    {
      label: "Listening",
      key: "listening",
    },
    {
      label: "Reading",
      key: "reading",
    },
    {
      label: "Writing",
      key: "writing",
    },
    {
      label: "Speaking",
      key: "speaking",
    },
    {
      label: "All",
      key: "all",
    },
  ];
  return (
    <div>
      <Dropdown
        menu={{
          items,
          onClick,
        }}
        trigger={["click","hover"]}
        className="mr-auto block ml-5 mb-5"
      >
        <Button onClick={(e) => e.preventDefault()}>Chọn loại đề thi</Button>
      </Dropdown>
    </div>
  );
}

export default DropDown;
