/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import "./footer.css";
import { Container } from "react-bootstrap";
class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <Container fluid>
          <div className="d-lg-flex justify-content-lg-between align-items-center text-center">
            <ul className="d-md-flex justify-content-center list-unstyled mb-0">
              <li>
                <a href="mailto:support@connectbud.com" className="pl-0">
                  Email :- support@connectbud.com
                </a>
              </li>
              <li>
                <a href="/tandc">Terms of Service</a>
              </li>
              <li>
                <div className="d-flex social justify-content-center">
                  <span className="mr-2">Connect with us :-</span>
                  <a href="https://www.facebook.com/ConnectBud/"  target="_blank">
                    <img src={require("../assest/images/fb.png")} alt={""} />
                  </a>
                  <a href="https://twitter.com/ConnectBud"  target="_blank">
                    <img src={require("../assest/images/twt.png")} alt={""} />
                  </a>
                  <a href="https://www.linkedin.com/company/connectbud/"  target="_blank">
                    <img src={require("../assest/images/in.png")} alt={""} />
                  </a>
                </div>
              </li>
            </ul>
            <p className="copytext mb-0 mt-2 mt-lg-0">
              <span>Copyright © 2020 ConnectBud LLC</span>
            </p>
          </div>
        </Container>
      </div>
    );
  }
}

export default Footer;
