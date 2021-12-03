import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Table, Tag, Space, Button } from "antd";
import axios from "axios";
function RequestPage() {
  const inputFile = useRef(null);
  const ButtonGreenContainer = styled.div`
    .ant-btn-primary {
      border-color: green;
      background-color: white;
      color: black;
    }
  `;
  const [state, setState] = useState();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_KEY}/getRequest`)
      .then((res) => {
        setState(res.data.data);
      })
      .catch((err) => {
        console.log("There was an error : " + err);
      });
  });
  var data = [];
  if (state) {
    data = state.map((r) => {
      var shet = {
        key: r._id,
        name: r.Title,
        schoolnumber: r.Sender.SchoolIDNumber,
        description: r.Description,
        status: r.Status
      };
      return shet;
    });
  }

  const columns = [
    {
      title: "School Number",
      dataIndex: "schoolnumber",
      key: "schoolnumber",
      render: (text) => <a>{text}</a>
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description"
    },
    {
      title: "File",
      dataIndex: "file",
      key: "file"
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status"
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <ButtonGreenContainer>
            <Button type="primary">Message</Button>
          </ButtonGreenContainer>

          <Button>Edit Status</Button>
          <Button danger>Delete</Button>
        </Space>
      )
    }
  ];
  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };
  return (
    <div>
      <Table columns={columns} dataSource={data} />
      <input
        type="file"
        id="file"
        ref={inputFile}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default RequestPage;
