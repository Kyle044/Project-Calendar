import React, { useState, useEffect } from "react";
import { Skeleton, Button } from "antd";
import axios from "axios";
import download from "../Functions/download";
import { withRouter } from "react-router-dom";
import Cards from "../Components/Card";
import "../Css/formDownloadPage/form.css";
import Nav from "../Components/studentdashComponents/Nav";
import Footer from "../Components/studentdashComponents/Footer";
import Header from "../Components/studentdashComponents/header";
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
      <Header />
      <h1 className="title">
        The Forms to Download in The Office Of Registrar.
      </h1>
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
                      f.File.path.substr(14),
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
      <Cards />
      <Footer />
    </div>
  );
}

export default withRouter(FormStud);
