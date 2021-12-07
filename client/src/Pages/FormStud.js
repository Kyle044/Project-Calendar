import React, { useState, useEffect } from "react";
import { Skeleton } from "antd";
import axios from "axios";
function FormStud() {
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
    <div>
      {form ? (
        <div>
          {form.map((f) => {
            return (
              <div>
                <h1>Description : {f.Description}</h1>
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

export default FormStud;
