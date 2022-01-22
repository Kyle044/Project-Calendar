import React from "react";
import "../Css/aboutcon.css";
function AboutReg() {
  return (
    <div>
        <h1 className="header">OFFICE OF THE REGISTRAR</h1>
        <div  className="mainCT">
        
        <div className="div1">
    
            <p className="text1">The Student Admission, Promotions, and Records Management Services (SARMS also known as Office of the Registrar) is the repository of all students records. It serves as the main frontline service of the Institute as far as curricular and academic matters are concerned. Thus the Office of the Registrar handles curricular and academic information, students admissions, registration, evaluation, accreditation, graduation, management of students records, and other allied services.</p>
        </div>
        <div className="div2">
      
            <p className="text2">The now Student Admission and Records Management Service (SARMS) are composed of the following services :</p>
            <ul className="list">
              <li>Admission and Registration</li>
              <ul className="contentlist">
                <li>Receiving and Releasing Section</li>
                <li>ID Section</li>
                <li>Information and Registration Section</li>
              </ul>
              <li>Programming and Promotions Sections</li>
              <ul className="contentlist">
                <li>Promotional records/credit evaluators</li>
              </ul>
              <li>Records Management Sections</li>
              <ul className="contentlist">
                <li>Transcript and Certificate Production Section</li>
                <li>Certificates and Diploma Section</li>
                <li>Data Banking Section</li>
              </ul>
            </ul>
        </div>
        </div>
    </div>
  );
}

export default AboutReg;