import React, { useState, useEffect } from "react";
import axios from "axios";
import { Skeleton } from "antd";
import { Collapse } from 'antd';
import "../pCss/FAQStud.css";
// import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

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
  const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}
  return (
    <div className="MC">
      <div className="mHeader">
       
        <img src="./images/school.png" alt=""className="imglogo"/> 
      
        <div className="CC2">
            <p style={{color:"white", fontSize:"0.8em",}}>Eulogio "Amang" Rodriguez Institute of Science and Technology </p>      
           <h2 className="title">OFFICE OF THE REGISTRAR</h2>
           <p style={{color:"white", marginTop:"-1rem",fontSize:"0.7em"}}>General Mariano Alvarez, Cavite </p>      
        </div>
    
      </div>
      <h2 className="header"><b>FAQ</b> Frequently asked questions to the Office of the Registrar.</h2>
<div className="cd">
      
      {faq ? (
        <div  className="FAQ">
          <Collapse defaultActiveKey={['1']} onChange={callback}>
          {faq.map((f) => {
            return (


             <Panel header={f.Question} key={f._id} className="Panel"> 
              
                <p style={{fontWeight:"bold", color:"#DAAD2A", fontSize:"1rem"}}>Answer : </p>
                <p style={{fontWeight:"normal"}}>{f.Answer}</p>
              </Panel>
             

            );
          })}
          </Collapse>
     
        </div>
        
        
      ) : (
        <Skeleton />
      )}
       
       </div>
       {/* <div className="leftsidebar">
      
      </div> */}
    </div>
  );
}

export default FAQStud;
