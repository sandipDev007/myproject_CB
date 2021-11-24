/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/alt-text */
// /* eslint-disable array-callback-return */
// /* eslint-disable jsx-a11y/alt-text */
// /* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import {
  Container,
  Navbar,
  Nav,
  Row,
  Col
} from "react-bootstrap";
import "./theme.css";
import Twitter from "react-ionicons/lib/LogoTwitter";
import FB from "react-ionicons/lib/LogoFacebook";
import In from "react-ionicons/lib/LogoLinkedin";
// import Insta from "react-ionicons/lib/LogoInstagram";
// import Gplus from "react-ionicons/lib/LogoGoogleplus";

export default class privacypolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <section className="landing">
        <header className="l-header">
          <Container className="p-0">
            <Navbar collapseOnSelect expand="lg">
              <Navbar.Brand href="/exapp">
                <img
                  src={require("../../assest/images/logo.png")}
                  className="img-fluid"
                  alt="logo"
                />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">

              </Navbar.Collapse>
            </Navbar>
          </Container>
        </header>
        {/* end of header */}

        <div className="top-innerbanner position-relative">

          <Container>
            <div className="innerpage-connt">
              <h3>Privacy Policy</h3>
              <ul>
                <li>Home</li>
                <li>Privacy Policy</li>

              </ul>

            </div>

          </Container>

        </div>
        {/* end of banner part */}
        <div className="Howitworks position-relative">
          <Container>
            <Row>
              <Col lg={12}>
                <div class="innerpage-title"><h2>Privacy Policy</h2></div>
              </Col>
              <Col lg={12}>
                <div className="innerpage-contennt">
                  <p>ConnectBud is committed to protecting your privacy and ensuring you have a positive experience on our
  website and in using our services. This policy covers the ConnectBud website, mobile applications, and desktop clients and is applicable worldwide. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website. If you do not agree with this policy, then you must not access ConnectBud platform.</p>

                  <h2>Collection of your Personal Data</h2>

                  <p>When you create an account and profile on the ConnectBud Platform, we collect the various information.</p>


                  <h2>Information about Members.</h2>
                  <p>We collect various types of Personal Information about Members in connection with the Services, including:</p>

                  <ul>
                    <li>Name</li>
                    <li>Title</li>
                    <li>Email address</li>
                    <li>Photo</li>
                    <li>Work and educational history</li>
                    <li>Home/work/mobile telephone number</li>
                    <li>Postal or other physical address</li>
                    <li>IP addresses and other information</li>
                    <li>Device identifiers</li>

                  </ul>


                  <h2>Information about Experts and Mentors.</h2>
                  <p>We collect various types of Personal Information about Experts and Mentors, including:</p>

                  <ul>

                    <li>Name</li>
                    <li>Address</li>
                    <li>Email address</li>
                    <li>Photograph</li>
                    <li>Phone number</li>
                    <li>Username and password </li>
                    <li>Designation and job title </li>
                    <li>Experts and Mentors biography </li>
                    <li>Content posted by Experts and Mentors </li>
                    <li>Financial account information </li>
                    <li>Professional credentials and experience </li>
                  </ul>

                  <h2>How Do We Use Your Information?</h2>
                  <p>We use information that we collect about you or that you provide to us, including any personal information:</p>
                  <ul>

                    <li>To present our Services and their contents to you.</li>
                    <li>To provide you with information, products or services that you request from us.</li>
                    <li>To fulfill any other purpose for which you provide your information.</li>
                    <li>To provide you with notices about your account, including expiration and renewal notices.</li>
                    <li>Personalizing, improving or operating our services andbusiness</li>
                    <li>Better understanding your needs and interests</li>
                    <li>Complying with our legal obligations, resolving disputes with users, enforcing our agreements</li>
                    <li>Protecting, investigating and deterring against fraudulent, harmful, unauthorized or illegal activity</li>

                  </ul>

                  <h2>Cookie Policy</h2>
                  <p>Like most websites and online services, we and our third party partners automatically
                    collect certain types of usage information when you visit the ConnectBud website,
                    mobile app or otherwise engage with us. We typically collect this information through
                    a variety of tracking technologies including cookies and location-identifying technologies,
                    and similar technology. These tracking technologies collect information about how you use
                     the Solution (e.g., the pages you view, the links you click, and other actions you take
                     on the ConnectBud website), information about your browser and online usage patterns (e.g.,
                     IP address, browser type, browser language, referring), and information about the device(s)
                     you use to access the ConnectBud website (e.g., mobile device identifier, mobile carrier,
                     device type, model and manufacturer, mobile device operating system brand and model.
                     We may also collect analytics data, or use third party analytics tools, to help us measure
            traffic and usage trends for the ConnectBud website.</p>

                  <h2>Legal Disclosures and Business Transfers</h2>
                  <p>disclose any information without notice or approval from you:</p>
                  <ul>

                    <li>1. In response to a legal request, such as a court order, or government demand.</li>
                    <li>2. To investigate or report illegal activity.</li>
                    <li>3. Establish or exercise our rights to defend against legal claims.</li>
                    <li>4. To enforce our rights or defend claims.</li>
                    <li>5. Protect our rights, reputation, safety, and property, or that of users or others.</li>
                    <li>6. We may also transfer your information to another company in connection with a merger, corporate restructuring, sale of any or all of our assets, or in the
event of bankruptcy.</li>

                  </ul>
                  <h2>Changes To Privacy Policy</h2>
                  <p>We may revise this Privacy Policy from time to time and reserve the right to update and modify
                    this Privacy Policy at any time and we may not require your consent thereto. If we make a change
                    to this policy, it is our sole discretion. In addition, from time to time we may organize,
                    stylistic and grammatical changes to present our practices in a way that makes policy easy
                    to read. Please review our Privacy Policy periodically and especially before you provide any
           personal information.</p>




                </div>
              </Col>

            </Row>
          </Container>
        </div>

        <footer>
          <div className="main-footer position-relative">
            <Container className="position-relative">
              <Row>
                <Col md={4} sm={12}>
                  <div className="links">
                    <h4>Use full links</h4>
                    <ul className="list-unstyled">
                      {/* <li>
                        <a href="">Discover Our Story </a>
                      </li>
                      <li>
                        <a href="">Features </a>
                      </li>
                      <li>
                        <a href="">Solutions</a>
                      </li>
                      <li>
                        <a href="">Resources For Members </a>
                      </li> */}
                      {/* <li>
                        <a href="">Publications </a>
                      </li> */}
                      <li>
                        <a href="/excontactUS">Contact Us</a>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col md={4} sm={12}>
                  <div className="links social-link">
                    <h4>Follow us</h4>
                    <ul className="list-unstyled">
                      <li>
                        <a href="https://twitter.com/ConnectBud" target="_blank">
                          <Twitter color="#fff" className="s-icon" /> Twitter
                        </a>
                      </li>
                      <li>
                        <a href="https://www.facebook.com/ConnectBud/" target="_blank">
                          <FB color="#fff" className="s-icon" /> Facebook
                        </a>
                      </li>
                      <li>
                        <a href="https://www.linkedin.com/company/connectbud/" target="_blank">
                          <In color="#fff" className="s-icon" /> Linkedin
                        </a>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col md={4} sm={12}>
                  <div className="links">
                    <h4>Get in touch</h4>
                    <ul className="list-unstyled">
                      <li>
                        6000, Park Avenue East, Suite 200
                      </li>
                      <li>
                        New York City, NY
                      </li>
                      <li>
                        93834, United States
                      </li>
                      <li>
                        P. +1 000 000-0000
                      </li>
                      <li>
                        <a href="mailto:support@connectbud.com">support@connectbud.com</a>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Container>
            <div className="copy-footer py-3 pt-md-4">
              <Container className="position-relative">
                <div className="d-md-flex text-center justify-content-md-between align-items-center">
                  <p className="text-white mb-md-0">
                    Copyright © 2020 ConnectBud LLC – All Rights Reserved
                  </p>
                  <div className="d-flex">
                    <a className="text-white">
                      Privacy Policy
                    </a>
                    <span className="d-block px-3 text-white">|</span>
                    <a href="/exapptandc" className="text-white">
                      Terms of Service
                    </a>
                  </div>
                </div>
              </Container>
            </div>
          </div>
        </footer>
      </section >
    );
  }
}