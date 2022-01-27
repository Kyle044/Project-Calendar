import React from "react";
import "../../Css/footer.css";
function Footer() {
  return (
    <div className="masterFooter">
      <div className="Footer">
        <div className="about">
          <h3>About The Registrar</h3>
          <p>
            The Student Admission, Promotions, and Records Management Servi c es
            (SARMS also known as Office of the Registrar) is the repository of
            all students records.
          </p>
        </div>
        <div className="contact">
          <h3>Contact</h3>
          <div className="contactLogo">
            <a
              className="linkFooter"
              href="https://www.youtube.com/channel/UC3HXQKN_jifnYJTaHNN5NVA"
            >
              <i className="ay fab fa-youtube  fa-3x"></i>
            </a>
            <a
              className="linkFooter"
              href="https://www.facebook.com/ECCExtensionServices"
            >
              <i className="ay fab fa-facebook fa-3x"></i>
            </a>
            <a className="linkFooter" href="https://twitter.com/earist1945">
              <i className="ay fab fa-twitter fa-3x"></i>
            </a>

            <a className="linkFooter" href="https://earist.edu.ph/">
              <i className="ay fab fa-google-plus fa-3x"></i>
            </a>
          </div>
        </div>
        <div className="map">
          <div className="gmap_canvas">
            <iframe
              width="360"
              height="100"
              src="https://maps.google.com/maps?q=earist%20gma&t=&z=13&ie=UTF8&iwloc=&output=embed"
              scrolling="no"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="bottomSection">
        <h4>
          {new Date().getFullYear()} © Copyright Eulogio "Amang" Rodriguez
          Institute of Science and Technology Registrar
        </h4>
      </div>
    </div>
  );
}

export default Footer;
