import React, { useState, useEffect } from "react";
import axios from "axios";
import { Skeleton } from "antd";
import { Collapse } from 'antd';
import { Button } from 'antd';
import { withRouter } from 'react-router-dom';
import "../pCss/FAQStud.css";
import Header from "../Components/studentdashComponents/header";
import Footer from "../Components/studentdashComponents/Footer";
// import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

function FAQStud({ history }) {
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

<div>
<Header />
</div>

<div style={{textAlign:"center"}}>
      <h2 className="header"><span className="spanfaq">FAQ</span><span style={{color:"grey", fontWeight:"bold"}}> Frequently asked questions to the Office of the Registrar</span>.</h2>
      </div>
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
    
       <div className="mainContainer2">


         <div className="div1">
           <div className="MD">
        
         <img src="./images/guide.png" alt="" style={{width:"50px"}}/>
       
         <h3 className="text">Request Guide</h3>
        
       
         </div>
         <p className="parag">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, saepe?</p>
         <div>
           <Button >Request now</Button>
         </div>
         </div>



         <div className="div2">
         <div className="MD">
        
        <img src="./images/document.png" alt="" style={{width:"50px"}} className="ddd"/>
      
        <h3 className="text">Request Student Records</h3>
       
      
        </div>
        <p className="parag">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, saepe?</p>
        <div>
          <Button  danger
                  onClick={() => {
                    history.push("/Request");
                  }}>Request now</Button>
        </div>
         </div>
         <div className="div3">
         <div className="MD">
        
        <img src="./images/school.png" alt="" style={{width:"50px"}}/>
      
        <h3 className="text">About the registrar</h3>
       
      
        </div>
        <p className="parag">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, saepe?</p>
        <div>
          <Button>Request now</Button>
        </div>
         </div>
       </div>
     
      <Footer />
    </div>
  );
}

export default FAQStud;
