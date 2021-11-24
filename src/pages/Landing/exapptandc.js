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
  Col,
} from "react-bootstrap";
import "./theme.css";
import Twitter from "react-ionicons/lib/LogoTwitter";
import FB from "react-ionicons/lib/LogoFacebook";
import In from "react-ionicons/lib/LogoLinkedin";
// import Insta from "react-ionicons/lib/LogoInstagram";
// import Gplus from "react-ionicons/lib/LogoGoogleplus";

export default class tanndc extends Component {
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
                <Nav className="ml-auto">
                  {/* <Nav.Link href="">Discover</Nav.Link> */}
                  <Nav.Link href="/exourstory"> Our Story </Nav.Link>
                  {/* <Nav.Link href=""> Features </Nav.Link> */}
                  {/* <Nav.Link href="">Solutions </Nav.Link> */}
                  {/* <Nav.Link href="">Resources For Members </Nav.Link> */}
                  {/* <Nav.Link href="">Publications</Nav.Link> */}
                  <Nav.Link href="/excontactUS">Contact Us</Nav.Link>
                  {/* <Nav.Link href="/signin" className="pink">
                    login
                  </Nav.Link>
                  <Nav.Link href="/signup">Register</Nav.Link> */}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Container>
        </header>
        {/* end of header */}

        <div className="top-innerbanner position-relative">

          <Container>
            <div className="innerpage-connt">
              <h3>Terms of Service</h3>
              <ul>
                <li>Home</li>
                <li>Terms of Service</li>

              </ul>

            </div>

          </Container>

        </div>
        {/* end of banner part */}
        <div className="Howitworks position-relative">
          <Container>
            <Row>
              <Col lg={12}>
                <div class="innerpage-title"><h2>Terms of Service</h2></div>
              </Col>
              <Col lg={12}>
                <div className="innerpage-contennt">
                  <p>These Terms of Service (“Terms”) of (a) use of our ConnectBud website, our applications
                    (“Application”) or any products or services in connection with the Application/, Website/products
                    (“Services”) or (b) any modes of registrations or usage of products, including through SD cards,
                    tablets or other storage/transmitting device are between ConnectBud (“Company/We/Us/Our”) and its users
  (“User/You/Your”).</p>

                  <h2>ATTENTION:</h2>

                  <p>ACCESSING, BROWSING OR OTHERWISE USING THE SITE INDICATES YOUR AGREEMENT TO ALL THE TERMS OF SERVICE
                    UNDER THESE
TERMS OF SERVICE, SO PLEASE READ THESE TERMS OF SERVICE CAREFULLY BEFORE USING CONNECTBUD WEBSITE &amp; APP.</p>
                  <p>ACCESSING ANY PART OF THE WEBSITE INDICATES THAT YOU ACCEPT AND AGREE TO BE BOUND BY THESE TERMS OF SERVICE
  AND RELATED POLICIES AND  NOTICES IN FULL.</p>
                  <p>IF YOU DO NOT ACCEPT THESE TERMS OF SERVICE AND RELATED POLICIES AND NOTICES, DO NOT USE, ACCESS,
                     OR DOWNLOAD MATERIALS FROM THE
WEBSITE AND LEAVE THE WEBSITE IMMEDIATELY.</p>

                  <h2>Eligibility</h2>
                  <p>You must be at least eighteen (18) years old to use the ConnectBud Service. By agreeing to the Terms,
                    you represent and warrant to us that you are at least eighteen
                  (18) years old and, that your registration and your use of the Service are in compliance with any and
                   all applicable laws and regulations. If you are a minor under the age of 18 years, you shall not
                    register as a User of the Website and shall not transact on or use the website. Any/all use of the
  Website by a minor may be made only by a legal guardian or parent.</p>

                  <h2>Accounts and Registration</h2>
                  <p>You promise to provide us with accurate, complete, and updated registration information about yourself.
                     You are solely responsible for maintaining the confidentiality of your account and password.
                      You agree to accept responsibility for all activities that occur under your account.
      You may not transfer your account to anyone else without our prior written permission.</p>
                  <h2>Intellectual Property Rights</h2>
                  <p>The materials displayed or performed on the Service, (including, but not limited to, text,
                    graphics, articles, photos, images, illustrations, and so forth (the &quot;Content&quot;)
                    and the trademarks, service marks and logos contained on the Service (&quot;Marks&quot;),
                    are protected by copyright and other intellectual property laws. Content is provided for your
                    information and personal use only and may not be used, copied, distributed, transmitted, displayed,
                    sold, licensed, de-compiled, or otherwise exploited for any other purposes whatsoever without prior
         written consent of the owner of the Content or in any way that violates someone else&#39;s rights.</p>
                  <h2>By using the ConnectBud platform, you further agree that:</h2>
                  <ul>

                    <li>You will use the ConnectBud website, application, products and services for your sole,
  personal use and will not resell it to a third party;</li>
                    <li>You will not authorize others to use your account;</li>
                    <li>You will not assign or otherwise transfer your account to any other person or legal entity;</li>
                    <li>You shall not post anything that is grossly harmful, harassing, blasphemous, defamatory, obscene, pornographic, paedophilic, libelous, invasive of another’s
                  privacy, hateful, or racially, ethnically objectionable, disparaging, relating or encouraging money laundering or gambling, or otherwise unlawful in
any manner whatever;</li>
                    <li>You will not use an account that is subject to any rights of a person other than you without
  appropriate authorization;</li>
                    <li>You will not use the ConnectBud platform for unlawful purposes, including but not limited to
    sending or storing any unlawful material or for fraudulent purposes;</li>

                  </ul>
                  <p>You shall not use any “deep-link”, “page-scrape”, “obot”, &quot;spider&quot; or other automatic
                    device, program, algorithm or methodology, or any similar or equivalent manual process,
                    to access, acquire, copy or monitor any portion of the ConnectBud Website or any Content,
                    or in any way reproduce or circumvent the navigational structure or presentation of the Website
                    or any Content, to obtain or attempt to obtain any materials, documents or information through
                     any means not purposely made available through the Website. We reserve Our right to bar any
            such activity.</p>
                  <p>You shall not attempt to gain unauthorized access to any portion or feature of the Website, or any other systems or networks connected to the Website or to any server,
      computer, network, or to any of the services offered on or through the Website, by hacking,
password &quot;mining&quot; or any other illegitimate means.</p>
                  <h2>Contents Posted on Site</h2>
                  <p>ConnectBud has no control over any/all user-generated text, graphics, user interfaces, visual interfaces, photographs, trademarks, logos, sounds, music and artwork as
ConnectBud is merely an intermediary for the purposes of this Terms of Service.</p>
                  <p>Any use of the Application, Website, Services or products or their contents other than for personal
                    purposes is prohibited. The Company reserves the right to immediately terminate use of the Application
  should you not comply with any of the above rules.</p>



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
                    <a href="/exprivacyPolicy" className="text-white">
                      Privacy Policy
                    </a>
                    <span className="d-block px-3 text-white">|</span>
                    <a className="text-white">
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