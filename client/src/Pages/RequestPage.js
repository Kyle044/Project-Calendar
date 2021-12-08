import React, { useState, useEffect, useRef } from "react";
import { Modal } from "antd";
import styled from "styled-components";
import { Table, Tag, Space, Button } from "antd";
import "../Css/requestPage/requestPage.css";
import axios from "axios";
import download from "../Functions/download";
import MessageForm from "../Components/MessageForm";

function RequestPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMessModalVisible, setIsMessModalVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState({
    Request: "",
    Sender: ""
  });

  const showMessModal = (reqid, Sender) => {
    setSelectedRequest({
      Request: reqid,
      Sender: Sender
    });
    setIsMessModalVisible(true);
  };

  const handleMessOk = () => {
    setIsMessModalVisible(false);
  };

  const handleMessCancel = () => {
    setIsMessModalVisible(false);
  };

  const showModal = (file) => {
    setSelectedFile(file);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const inputFile = useRef(null);
  const ButtonGreenContainer = styled.div`
    .ant-btn-primary {
      border-color: green;
      background-color: white;
      color: black;
    }
  `;
  const deleteRequest = (id) => {
    axios
      .delete(`${process.env.REACT_APP_KEY}/deleteRequest`, {
        data: { id: id }
      })
      .then((res) => {
        console.log(res.data);
        refreshState();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const refreshState = () => {
    axios
      .get(`${process.env.REACT_APP_KEY}/getRequest`)
      .then((res) => {
        setState(res.data.data);
      })
      .catch((err) => {
        console.log("There was an error : " + err);
      });
  };
  const [state, setState] = useState();
  useEffect(() => {
    refreshState();
  }, []);
  var data = [];
  if (state) {
    data = state.map((r) => {
      var shet = {
        key: r._id,
        id: r._id,
        name: r.Title,
        schoolnumber: r.Sender.SchoolIDNumber,
        description: r.Description,
        status: r.Status,
        file: r.File
      };
      return shet;
    });
  }

  useEffect(() => {
    console.log(selectedFile);
  }, [selectedFile]);

  const columns = [
    {
      title: "Request ID",
      dataIndex: "id",
      key: "id"
    },
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
      key: "file",
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() => {
            showModal(record.file);
          }}
        >
          File
        </Button>
      )
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
            <Button
              type="primary"
              onClick={() => {
                showMessModal(record.id, record.schoolnumber);
              }}
            >
              Message
            </Button>
          </ButtonGreenContainer>

          <Button>Edit Status</Button>
          <Button
            danger
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete the request?")
              ) {
                deleteRequest(record.id);
              } else {
              }
            }}
          >
            Delete
          </Button>
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
      {selectedFile && (
        <Modal
          title="File Viewer"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="fileContainer">
            {selectedFile.map((f) => {
              return (
                <div
                  className="fileDiv"
                  onClick={() => {
                    download(f.path.substr(16), f.filename.substr(15));
                  }}
                >
                  <i className="far fa-file fa-3x"></i>
                  <p className="filename">{f.filename.substr(15)}</p>
                </div>
              );
            })}
          </div>
        </Modal>
      )}

      <Modal
        title="Message"
        visible={isMessModalVisible}
        onOk={handleMessOk}
        onCancel={handleMessCancel}
      >
        <div className="fileContainer">
          <MessageForm requestID={selectedRequest} />
        </div>
      </Modal>
    </div>
  );
}

export default RequestPage;
