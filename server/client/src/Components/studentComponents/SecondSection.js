import React from "react";
import "./student.css";
import moment from "moment";
import download from "../../Functions/download";
function SecondSection({ announce }) {
  return (
    <div className="masterNews">
      <h1>Registrar News</h1>
      {announce
        ? announce.map((a) => {
            return (
              <div className="newsCard">
                <h2 className="newsDate">{moment(a.createdAt).format("LL")}</h2>
                <div className="newsInnerCard">
                  <div className="newsImg">
                    <img
                      onClick={() => {
                        download(
                          `./uploads/${a.Files.Directory.substr(22)}`,
                          a.Files.Directory.substr(22)
                        );
                      }}
                      src={`./uploads/${a.Files.Directory.substr(22)}`}
                      alt=""
                    />
                  </div>
                  <div className="newstextContainer">
                    <h2 className="newsSubject">{a.Subject}</h2>

                    <p className="newsDescription">{a.Description}</p>
                  </div>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default SecondSection;
