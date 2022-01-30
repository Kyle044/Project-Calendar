import React, { useRef } from "react";
import "../../Css/header.css";
import { withRouter } from "react-router-dom";
function Header({ history }) {
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log-out?")) {
      localStorage.removeItem("token");
      history.push("/");
    } else {
    }
  };
  const link = useRef(null);
  const header = useRef(null);

  const hideMenu = () => {
    header.current.style.overflow = "hidden";
    link.current.style.right = "-200px";
  };
  const showMenu = () => {
    header.current.style.overflow = "visible";
    link.current.style.right = "0";
  };

  return (
    <div style={{ width: "100%" }}>
      <div className="mHeader" ref={header}>
        {/* <img src="./images/logoV2.png" alt=""style={{height: "6%", width: "6%",objectFit:"contain"}}/>  */}
        <div
          className="CC2"
          onClick={() => {
            history.push("/StudentDash");
          }}
        >
          <img src="./images/logoV3.png" alt="" style={{ width: "280px", height:"auto"
          
        }}/> 
        </div>

        {/* <div
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
        </div> */}
        <label
          className="burger"
          onClick={() => {
            showMenu();
          }}
        >
          &#9776;
        </label>
        <div className="headlinks" id="nav-links" ref={link}>
          <label
            className="burger"
            onClick={() => {
              hideMenu();
            }}
          >
            &#9776;
          </label>
          <h4
            className="logout"
            onClick={() => {
              history.push("/AboutReg");
            }}
          >
            About
          </h4>
          <h4
            className="logout"
            onClick={() => {
              history.push("/FAQStudPage");
            }}
          >
            FAQ
          </h4>
          <h4
            className="logout"
            onClick={() => {
              history.push("/studSettings");
            }}
          >
            Profile
          </h4>
          <h4
            className="logout"
            onClick={() => {
              handleLogout();
            }}
          >
            Log out
          </h4>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Header);
