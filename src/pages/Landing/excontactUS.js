/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./contactUS.css";
import { Container, Row, Col, Form, Navbar, Nav } from "react-bootstrap";
// import Header from "../../component/header";
import Footer from "../../component/exfooter";
import axios from "axios";
import { API_URL } from "../../component/url";
import swal from "sweetalert";
// import LoadingOverlay from "react-loading-overlay";
// import GridLoader from "react-spinners/GridLoader";

class contactUS extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {},
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
  }



  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value.trim();
    this.setState({
      fields
    });
  }

  ContactForm = () => {
    let dataSet = this.validateForm();
    if (dataSet === true) {
      let fields = {};
      fields["name"] = "";
      fields["email"] = "";
      this.userContact();
    }
  };

  validateForm = () => {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "*Please enter your name";
    }
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "*Please enter your email-ID.";
    }
    if (typeof fields["email"] !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(fields["email"])) {
        formIsValid = false;
        errors["email"] = "*Please enter a valid email-ID";
      }
    }

    this.setState({
      errors: errors
    });
    document.getElementById("uname").focus();
    return formIsValid;
  };


  userContact = async () => {
    const obj = {
      name: this.state.fields["name"],
      email: this.state.fields["email"],
      message: this.state.fields["message"]
    };
    await axios
      .post(API_URL + "contact_us", obj, {
        header: {
          "content-Type": "application/json"
        }
      })
      .then(response => {
        if (response.data[0].message === "SUCCESS") {
          swal("Thank You! for contacting us", "ConnectBud team will contact you asap", "info");
        }

      })
      .catch(error => {

      });
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.ContactForm();
    }
  };

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
                  {/* <Nav.Link href="/">Contact Us</Nav.Link> */}
                  {/* <Nav.Link href="/signin" className="pink">
                    login
                  </Nav.Link>
                  <Nav.Link href="/signup">Register</Nav.Link> */}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Container>
        </header>
        <Container fluid className="mainbody p-0">
          <div className=" d-flex justify-content-between align-items-center">
            <div className="signinbody pl-3 py-3 pr-4">
              <div className="sign-innerdiv">
                <h1 className="heading mb-0">
                  Contact Us
                  </h1>
                <div className="form mt-3 common-form contactfrm">

                  <Row>
                    <Col md={6}>
                      <Form.Group
                        controlId="validationFormikUsername"
                        className="mb-2 contact-us"
                      >
                        <label>*Name</label>
                        <div className="border d-flex align-items-center">

                          <input
                            name="name"
                            type="text"
                            id="uname"
                            autofocus
                            className="form-control border-0"
                            placeholder="Enter Name"
                            //value={this.state.fields.username}
                            onChange={this.handleChange}
                          />
                        </div>
                      </Form.Group>
                      <div className="errorMsg">
                        {this.state.errors.name}
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="form-group">
                        <Form.Group
                          controlId="validationpass"
                          className="mb-2 contact-us"
                        >
                          <label>*Email</label>
                          <div className="d-flex border pr-2 align-items-center">
                            <input
                              name="email"
                              type="text"
                              id="uname"
                              autofocus
                              className="form-control border-0"
                              placeholder="Enter Email"
                              //value={this.state.fields.username}
                              onChange={this.handleChange}
                            />

                          </div>
                        </Form.Group>
                        <div className="errorMsg">
                          {this.state.errors.email}
                        </div>
                      </div>
                    </Col>

                    <Col md={12}>
                      <div className="form-group">
                        <Form.Group
                          controlId="validationpass"
                          className="mb-2 contact-us"
                        >
                          <label>Message</label>
                          <div className="d-flex align-items-center cl">
                            <textarea className="form-control border txtarea"
                              name="message"
                              placeholder="Write Here..."
                              onChange={this.handleChange}

                            />

                          </div>
                        </Form.Group>
                        {/* <div className="errorMsg">
                            {this.state.errors.password}
                          </div> */}
                      </div>
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-between align-items-end">

                    <button
                      className="btn-new"
                      type="submit"
                      onClick={this.ContactForm}
                    >
                      Submit
                      </button>
                  </div>
                </div>

              </div>
            </div>
            <div className="right-image">
              <img src={require("../../assest/images/signup-image.jpg")} />
            </div>
          </div>
        </Container>
        <div>
          <Footer />
        </div>
      </section>
    );
  }
}

export default contactUS;
