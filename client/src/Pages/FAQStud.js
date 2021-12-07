import React, { useState, useEffect } from "react";
import axios from "axios";
import { Skeleton } from "antd";
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
  return (
    <div>
      {faq ? (
        <div>
          {faq.map((f) => {
            return (
              <div>
                <p>Question : {f.Question}</p>
                <p>Answer : {f.Answer}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <Skeleton />
      )}
    </div>
  );
}

export default FAQStud;
