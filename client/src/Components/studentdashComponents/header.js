import React from "react";
import "../../Css/header.css";
import { withRouter } from "react-router-dom";
function Header({ history }) {
  return (
    <div style={{ width: "100%" }}>
      <div className="mHeader">
        {/* <img src="./images/logotry.png" alt=""style={{height: "6%", width: "6%",objectFit:"contain"}}/>  */}

        <div
          className="CC2"
          onClick={() => {
            history.push("/StudentDash");
          }}
        >
          <p className="School">
            Eulogio "Amang" Rodriguez Institute of Science and Technology{" "}
          </p>
          <h2 className="titles" style={{ color: "#ffe431" }}>
            OFFICE OF THE REGISTRAR
          </h2>
          <p className="address">General Mariano Alvarez, Cavite </p>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Header);
