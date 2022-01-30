import React, { useState, useEffect } from "react";
import { Skeleton, Button } from "antd";
import axios from "axios";
import download from "../Functions/download";
import { withRouter } from "react-router-dom";
import Cards from "../Components/Card";
import VerticalCard from "../Components/verticalCard/VerticalCard";
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
 <h2 className="formsto">The Forms to Download in The Office Of Registrar</h2>
      <div className="formMasterContainer">
     
        {form ? (
          <table className="content-table ashz">
            <thead>
              <caption>
                <caption className="table-title">
                {/* <h4 className="t-title">The Forms to Download in The Office Of Registrar</h4> */}
                </caption>
              </caption>
              <tr>
                <th>Description</th>
                <th>Options</th>
              </tr>
            </thead>

            <tbody>
              {form.map((f) => {
                return (
                  <tr>
                    <td>{f.Description}</td>
                    <td>
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
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <Skeleton />
        )}
        <div className="cardRightDiv">
          <VerticalCard />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default withRouter(FormStud);
