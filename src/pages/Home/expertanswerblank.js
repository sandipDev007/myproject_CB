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

  componentDidMount = async () => {
    if (
      localStorage.getItem("token") == null &&
      localStorage.getItem("user_id") == null
    ) {
      this.props.history.push("/");
    }

    function storageChange(event) {
      if (event.key === "logged_in") {
        window.location.reload(false);
      }
    }
    window.addEventListener("storage", storageChange, false);
  };

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
                          <strong>Oops!</strong>
                        </h1>
                        <h3 className="text-dark">
                          This is empty, would you like to help other users by{" "}
                          <a href="/exapp">answering </a>few questions?
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
