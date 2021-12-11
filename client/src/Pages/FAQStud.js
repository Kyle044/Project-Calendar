import React, { useState, useEffect } from "react";
import axios from "axios";
import { Skeleton } from "antd";
import { Collapse } from 'antd';
function FAQStud() {
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
    <div>
      {faq ? (
        <div>
          <Collapse defaultActiveKey={['1']} onChange={callback}>
          {faq.map((f) => {
            return (


              <Panel header={f.Question} key={f._id}>
              
                <p>Answer : {f.Answer}</p>
              </Panel>


            );
          })}
          </Collapse>
        </div>
      ) : (
        <Skeleton />
      )}
    </div>
  );
}

export default FAQStud;
