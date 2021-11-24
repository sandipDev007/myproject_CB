/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./signin.css";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../../component/exheader";
import Footer from "../../component/exfooter";
import { Link } from "react-router-dom";


class verifyExpert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="apps-main">
        <div>
          <Header />
        </div>
        <Container fluid className="mainbody">
          <Row>
            <Col md={12}>
              <div className="rightuser pt-4">
                <Col lg={12} className="pl-0">
                  <div className="d-flex">
                    <div className="centerbody quesbody">
                      <div className="innerblank py-5 col-md-6 mx-auto">
                        <img
                          src={require("../../assest/images/blank.png")}
                          alt="blankimage"
                          className="img-fluid"
                        />
                        <div className="caption">
                          <div className="text-center">
                            <h2 className="text-success">
                              <strong>Congratulation! your document has been verified successfully</strong>
                            </h2>
                            <h5 className="text-dark">
                             
                              <a href=" "> {localStorage.getItem("email")} </a>
                            </h5>
                            <Link to="/extags">
                            <button className="continueBtn">Click to continue</button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </div>
            </Col>
          </Row>
        </Container>
        <div>
          <Footer />
        </div>
      </div>
    );
  }
}
export default verifyExpert;
