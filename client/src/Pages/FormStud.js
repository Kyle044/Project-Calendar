import React, { useState, useEffect } from "react";
import { Skeleton, Button } from "antd";
import axios from "axios";
import download from "../Functions/download";
import { withRouter } from "react-router-dom";
import "../Css/formDownloadPage/form.css";
import Nav from "../Components/studentdashComponents/Nav";
import Footer from "../Components/studentdashComponents/Footer";
function FormStud({ history }) {
  const [form, setForm] = useState(null);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_KEY}/getForm`)
      .then((res) => {
        setForm(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="mainStud">
      <Nav />
      <h3 className="title">
        The Forms to Download in The Office Of Registrar.
      </h3>
      {form ? (
        <div className="formStudContainer">
          {form.map((f) => {
            return (
              <div className="formStudCard">
                <h4> {f.Description}</h4>
                <Button
                  danger
                  onClick={() => {
                    download(
                      f.File.path.substr(16),
                      f.File.filename.substr(15)
                    );
                  }}
                >
                  Download
                </Button>
              </div>
            );
          })}
        </div>
      ) : (
        <Skeleton />
      )}
      <div className="section3">
        <div className="card">
          <div className="cardHeader">
            <img src="./images/document.png" alt="" />
          </div>
          <div className="cardDescript">
            <h3>Online Request Student Records</h3>
          </div>
          <div className="cardBtn">
            <Button
              danger
              onClick={() => {
                history.push("/Request");
              }}
            >
              Request
            </Button>
          </div>
        </div>
        <div className="card">
          <div className="cardHeader">
            <img src="./images/light-bulb.png" alt="" />
          </div>
          <div className="cardDescript">
            <h3>Frequently Asked Questions</h3>
          </div>
          <div className="cardBtn">
            <Button
              danger
              onClick={() => {
                history.push("/FAQStudPage");
              }}
            >
              Read
            </Button>
          </div>
        </div>
        <div className="card">
          <div className="cardHeader">
            <img src="./images/downloadfile.png" alt="" />
          </div>
          <div className="cardDescript">
            <h3>Forms To Download</h3>
          </div>
          <div className="cardBtn">
            <Button
              danger
              onClick={() => {
                history.push("/FormStudPage");
              }}
            >
              Preview
            </Button>
          </div>
        </div>

        <div className="card">
          <div className="cardHeader">
            <img src="./images/school.png" alt="" />
          </div>
          <div className="cardDescript">
            <h3>About the Registrar</h3>
          </div>
          <div className="cardBtn">
            <Button danger>Read</Button>
          </div>
        </div>

        <div className="card">
          <div className="cardHeader">
            <img src="./images/guide.png" alt="" />
          </div>
          <div className="cardDescript">
            <h3>Request Guide</h3>
          </div>
          <div className="cardBtn">
            <Button danger>Read</Button>
          </div>
        </div>
        <div className="card">
          <div className="cardHeader">
            <img src="./images/cabinet.png" alt="" />
          </div>
          <div className="cardDescript">
            <h3>Transaction History</h3>
          </div>
          <div className="cardBtn">
            <Button danger>Read</Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default withRouter(FormStud);
