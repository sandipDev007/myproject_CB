/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./signin.css";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../../component/loginheader";
import Footer from "../../component/footer";

class verifyExpert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    // const { data } = this.props.location
    // this.setState({data:data})
    // console.log(this.state.data)
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
                            <h2 className="text-danger">
                              <strong>Please wait till we verify your document</strong>
                            </h2>
                            <h5 className="text-dark">
                            A verification link will be sent to your email id after your document verification is done.
                              <a href=" "> {localStorage.getItem("email")} </a>
                            </h5>
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
