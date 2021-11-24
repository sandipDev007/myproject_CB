import React from "react";
import "./App.css";
import { Container, Row } from "react-bootstrap";
import LogHeader from "../../component/header";
import Footer from "../../component/footer";

class blank extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="apps-main">
        <div>
          <LogHeader />
        </div>
        <Container fluid className="mainbody">
          <Row>
            
              <div className="d-flex">
                <div className="centerbody quesbody">
                  <div className="urlblock">
                    <img
                      src={require("../../assest/images/urlblocker.jpg")}
                      alt="blankimage"
                      className="img-fluid"
                    />
                    <div className="caption">
                      <div className="text-center">
                        <h1 className="text-danger">
                          {/* <strong>404!</strong> */}
                        </h1>
                        <h3 className="text-dark">
                          {/* This is not the webpage you are looking for...! */}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
           
          </Row>
        </Container>
        <div>
          <Footer />
        </div>
      </div>
    );
  }
}
export default blank;
