import "./style.css";
import { Container, Card, Form, InputGroup } from "react-bootstrap";
import Header from "../../component/loginheader";
import Footer from "../../component/footer";

import React from "react";
import PaypalButton from "./PaypalButton";




class becomeExpert extends React.Component {
   
  


    render(){
     
  return (
    <section className="become">
      <div>
        <Header />
      </div>
      <div className="become-expert">
        <Container className="h-100">
          <div className="d-flex justify-content-center align-items-center h-100">
            <Card className="popupcrad p-4 w-100">
              <h4 className="theme-text mb-4">Payment With PayPal</h4>
              <div style={{justifycontent: 'center'}}>
        
      </div>
            </Card>
          </div>
        </Container>
      </div>
      <div>
        <Footer />
      </div>
    </section>
  );
}
}
export default becomeExpert;
