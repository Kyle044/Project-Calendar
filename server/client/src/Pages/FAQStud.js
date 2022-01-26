import React, { useState, useEffect } from "react";
import axios from "axios";
import { Skeleton } from "antd";
import { Collapse } from "antd";
import { Button } from "antd";
import { withRouter } from "react-router-dom";
import "../pCss/FAQStud.css";
import Card from "../Components/verticalCard/VerticalCard";
import Header from "../Components/studentdashComponents/header";
import Footer from "../Components/studentdashComponents/Footer";
// import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

function FAQStud({ history }) {
  const [faq, setFaq] = useState(null);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_KEY}/getFAQ`)
      .then((res) => {
        setFaq(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const { Panel } = Collapse;

  function callback(key) {
    console.log(key);
  }
  return (
    <div className="MC">
      <Header />

      <div className="contentFAQ">
        {faq ? (
          <div className="FAQ">
            <Collapse defaultActiveKey={["1"]} onChange={callback}>
              {faq.map((f) => {
                return (
                  <Panel header={f.Question} key={f._id} className="Panel">
                    <p
                      style={{
                        fontWeight: "bold",
                        color: "#DAAD2A",
                        fontSize: "1rem"
                      }}
                    >
                      Answer :{" "}
                    </p>
                    <p style={{ fontWeight: "normal" }}>{f.Answer}</p>
                  </Panel>
                );
              })}
            </Collapse>
          </div>
        ) : (
          <Skeleton />
        )}
        <Card />
      </div>
      <Footer />
    </div>
  );
}

export default FAQStud;
