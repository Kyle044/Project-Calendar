import React from "react";
import "../Css/aboutcon.css";
function AboutReg() {
  return (
    <div className="registrarDivContent">
      <div className="registrarDescript" style={{ marginBottom: "1rem" }}>
        <img src="./images/logotry.png" alt="" />
        <div className="subDescript">
          <h4>Office of Registrar</h4>
          <p>
            The Student Admission, Promotions, and Records Management Services
            (SARMS also known as Office of the Registrar) is the repository of
            all students records. It serves as the main frontline service of the
            Institute as far as curricular and academic matters are concerned.
            Thus the Office of the Registrar handles curricular and academic
            information.
          </p>
        </div>
      </div>

      <div className="contMiss">
        <div className="missCard">
          <h4>Vision</h4>
          <p>
            EARIST is envisioned to be a center of excellence in trades,
            business, arts, science and technology education.
          </p>
        </div>
        <div className="missCard">
          <h4>Mission</h4>
          <p>
            Turn out vocationally, technically, technologically, and
            scientifically trained graduates who will be economically
            productive, self-sufficient, effective, responsible and discipline
            citizen of the Philippines.
          </p>
        </div>
        <div className="missCard">
          <h4>Goals</h4>
          <p>
            Provide professional, scientific, technological, technical, and
            vocational instruction and training in trades, business, arts,
            sciences, and technology and for special purposes promote research,
            advanced studies and progressive leadership.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutReg;
