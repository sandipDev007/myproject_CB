import React from "react";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import LogHeader from "../../component/exheader";
import Footer from "../../component/exfooter";

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
                        <h1 className="text-danger">
                          <strong>Hello, buddy</strong>
                        </h1>
                        <h3 className="text-dark">
                          You haven't posted any questions yet! Would you like
                          to <a href="/exapp">post </a> a new question now?
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
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
export default blank;
