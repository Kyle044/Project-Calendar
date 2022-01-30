import React from "react";
import "../Css/aboutcon.css";
function AboutReg() {
  return (
    <div className="registrarDivContent">
      <div className="registrarDescript" style={{ marginBottom: "1rem" }}>
        <img src="./images/logo.png" alt="" />
        <div className="subDescript">
          <h4>Office of Registrar</h4>
          <p className="text">
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
          <p className="text">
            EARIST is envisioned to be a center of excellence in trades,
            business, arts, science and technology education.
          </p>
        </div>
        <div className="missCard">
          <h4>Mission</h4>
          <p className="text">
            Turn out vocationally, technically, technologically, and
            scientifically trained graduates who will be economically
            productive, self-sufficient, effective, responsible and discipline
            citizen of the Philippines.
          </p>
        </div>
        <div className="missCard">
          <h4>Goals</h4>
          <p className="text">
            Provide professional, scientific, technological, technical, and
            vocational instruction and training in trades, business, arts,
            sciences, and technology and for special purposes promote research,
            advanced studies and progressive leadership.
          </p>
        </div>

        <div className="missCard">
          <h4>Objectives</h4>
          <ul>
            <li>Strive for academic excellence in instruction, research, extension and production through accreditation.</li>
            <li>Provide appropriate and continuing faculty and staff development programs.</li>
            <li>Provide and maintain appropriate technologies, instructional facilities, materials and equipment.</li>
            <li>Produce quality graduates who are globally competitive to man the needs of businessand industry.</li>
            <li>Attain university status through Unity, Solidarity and Teamwork.</li>
          </ul>
        </div>
        
        <div className="missCard">
          <h4>Philosophy</h4>
          <p className="text">
          As a state college, Eulogio “Amang” Rodriguez Institute of Science and Technology 
          (EARIST) believes that education is not an area of knowledge that can be arrogated
           unto itself by one profession, nor it is a division seperate and distinct from
            the society and the times in which it flourishes. It is a plexus of knowledge
             and skills applied to the economic, social and moral development of
              self-actualized and productive citizenry.
          </p>
        </div>

      </div>
    </div>
  );
}

export default AboutReg;
