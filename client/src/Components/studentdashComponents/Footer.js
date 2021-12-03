import React from "react";
import "../../Css/footer.css";
function Footer() {
  return (
    <div>
      <div className="Footer">
        <div className="about">
          <h3>About The Registrar</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
            pariatur et cumque praesentium doloribus totam!
          </p>
        </div>
        <div className="contact">
          <h3>Contact</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
            pariatur et cumque praesentium doloribus totam!
          </p>
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
