/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable eqeqeq */

import React from "react";
import "./signin.css";
import { Container, Row, Col, Form } from "react-bootstrap";
import Header from "../../component/header";
import Footer from "../../component/outerfooter";
import axios from "axios";
import Recaptcha from "react-recaptcha";
import { API_URL } from "../../component/url";
import $ from "jquery";
import swal from "sweetalert";

class signUp extends React.Component {
  constructor() {
    super();

    this.handleSubscribe = this.handleSubscribe.bind(this);
    this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      isVerified: false
    };

    this.state = {
      fields: {},
      errors: {},
      userData: "",
      type: "password",
      score: "null",
      value: false,
      data:[]
    };
    this.showHide = this.showHide.bind(this);
  }

  showHide(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      type: this.state.type === "input" ? "password" : "input"
    });
  }

  recaptchaLoaded() {
    console.log("captcha successfully loaded");
  }

  handleSubscribe() {
    if (this.state.isVerified) {
      alert("You have successfully logged!");
    } else {
      alert("Please verify that you are a human!");
    }
  }

  verifyCallback(response) {
    if (response) {
      this.setState({
        isVerified: true
      });
    }
  }

  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value.trim();
    this.setState({
      fields
    });
    this.validateForm2();
  }

  submituserRegistrationForm = () => {
    let dataSet = this.validateForm();
    if (dataSet === true) {
      let fields = {};
      fields["first_name"] = "";
      fields["last_name"] = "";
      fields["email"] = "";
      fields["password"] = "";
      this.handleSubmit();
    }
  };

  validateForm = () => {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["first_name"]) {
      formIsValid = false;
      errors["first_name"] = "*Please enter your first name.";
    }

    if (typeof fields["first_name"] !== "undefined") {
      if (!fields["first_name"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["first_name"] = "*Please enter alphabet characters only.";
      }
    }

    if (!fields["last_name"]) {
      formIsValid = false;
      errors["last_name"] = "*Please enter your last name.";
    }

    if (typeof fields["last_name"] !== "undefined") {
      if (!fields["last_name"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["last_name"] = "*Please enter alphabet characters only.";
      }
    }

    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "*Please enter your email-ID.";
    }

    if (typeof fields["email"] !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(fields["email"])) {
        formIsValid = false;
        errors["email"] = "*Please enter valid email-ID.";
      }
    }
    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }
    this.setState({
      errors: errors
    });
    document.getElementById("fname").focus();
    return formIsValid;
  };

  validateForm2 = () => {
    let fields = this.state.fields;
    console.log(fields);
    let errors = {};
    let formIsValid = true;

    if(!fields["first_name"] || !fields["last_name"] || !fields["email"]){
      formIsValid = false;
    }

    if (fields["password"] == "") {
      $("#CharacterValid").removeClass("actv_green");
      $("#NumberValid").removeClass("actv_green");
      $("#LowercaseValid").removeClass("actv_green");
      $("#UppercaseValid").removeClass("actv_green");
      $("#SymbolValid").removeClass("actv_green");
      formIsValid = false;
    } else if (typeof fields["password"] !== "undefined") {
      if (fields["password"].match(/^.*(?=.{8,}).*$/)) {
        $("#CharacterValid").addClass("actv_green");
      } else {
        formIsValid = false;
        $("#CharacterValid").removeClass("actv_green");
      }
      if (fields["password"].match(/^.*(?=.*\d).*$/)) {
        $("#NumberValid").addClass("actv_green");
      } else {
        formIsValid = false;
        $("#NumberValid").removeClass("actv_green");
      }
      if (fields["password"].match(/^.*(?=.*[a-z]).*$/)) {
        $("#LowercaseValid").addClass("actv_green");
      } else {
        formIsValid = false;
        $("#LowercaseValid").removeClass("actv_green");
      }
      if (fields["password"].match(/^.*(?=.*[A-Z]).*$/)) {
        $("#UppercaseValid").addClass("actv_green");
      } else {
        formIsValid = false;
        $("#UppercaseValid").removeClass("actv_green");
      }
      if (
        fields["password"].match(/^.*(?=.*[@#$%&]).*$/) &&
        errors["password"] != ""
      ) {
        $("#SymbolValid").addClass("actv_green");
      } else {
        formIsValid = false;
        $("#SymbolValid").removeClass("actv_green");
      }
    }
    if (formIsValid == true) {
      $("#reset-password-change").removeClass("btn-copy-reset");
      this.setState({
        value: true
      });
    } else {
      $("#reset-password-change").addClass("btn-copy-reset");
      this.setState({
        value: false
      });
    }
  };

  handleSubmit = () => {
    if (!this.state.isVerified) {
      alert("Please verify that you are a human!");
      return false;
    }
    let body = new FormData();
    body.append("username", this.state.fields["email"]);
    body.append("password", this.state.fields["password"]);
    body.append("email", this.state.fields["email"]);
    body.append("first_name", this.state.fields["first_name"]);
    body.append("last_name", this.state.fields["last_name"]);
    axios
      .post(API_URL + "auth/signup", body)
      .then(res => {

        // this.setState({
        //   userId: res
        // });

        // console.log(res);
        // console.log(res.data.first_name);

        // localStorage.setItem("user_id", res.data.user_id.toString());
        // localStorage.setItem("username", res.data.name);
        // localStorage.setItem("token", res.data.Token);
        localStorage.setItem("email", res.data.email);
        //this.props.history.push({pathname: "/VerifyEmail", data: res.data.email});
        this.props.history.push("/VerifyEmail");
      })
      .catch(error => {
        swal(" ❌ Email Id already exists!");
      });
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.submituserRegistrationForm();
    }
  };

  render() {
    return (
      <div className="App-sign">
        <div>
          <Header />
        </div>
        <Container fluid className="mainbody p-0">
          <div className=" d-flex justify-content-between align-items-center">
            <div className="signinbody pl-3 pr-4">
              <h1 className="heading mb-3">
                <span>Meet</span> the <span>Experts</span>
              </h1>
              <div className="form mt-0 common-form s-up">
                <h2>Sign up</h2>
                <Row>
                  <Col md={6}>
                    <div className="form-group">
                      <Form.Group controlId="validationname">
                        <div className="border d-flex align-items-center">
                          <input
                            type="text"
                            name="first_name" autoFocus
                            id="fname"
                            autofocus
                            className="form-control border-0"
                            placeholder="Enter first name"
                            //value={this.state.fields.first_name}
                            onChange={this.handleChange}
                          />
                        </div>
                      </Form.Group>

                      <div className="errorMsg">
                        {this.state.errors.first_name}
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <Form.Group controlId="validationlast">
                        <div className="d-flex border pr-2 align-items-center">
                          <input
                            type="text"
                            name="last_name"
                            className="form-control border-0"
                            placeholder="Enter last name"
                            //value={this.state.fields.last_name}
                            onChange={this.handleChange}
                          />
                        </div>
                      </Form.Group>

                      <div className="errorMsg">
                        {this.state.errors.last_name}
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="form-group">
                      <Form.Group controlId="validationEmail">
                        <div className="border d-flex align-items-center">
                          <input
                            type="text"
                            name="email"
                            className="form-control border-0"
                            placeholder="Enter Email address"
                           // value={this.state.fields.email}
                            onChange={this.handleChange}
                          />
                        </div>
                      </Form.Group>
                      <div className="errorMsg">{this.state.errors.email}</div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <Form.Group controlId="validationEmail">
                        <div className="d-flex border pr-2 align-items-center">
                          <input
                            type={this.state.type}
                            name="password"
                            className="form-control border-0"
                            placeholder="Enter Password"
                            //value={this.state.fields.password}
                            onChange={this.handleChange}
                          />
                          <span
                            className="password__show"
                            onClick={this.showHide}
                            style={{ cursor: "pointer" }}
                          >
                            {this.state.type === "input" ? (
                              <img
                                src={require("../../assest/images/openeye.png")}
                              />
                            ) : (
                              <img
                                src={require("../../assest/images/eye.png")}
                              />
                            )}
                          </span>
                        </div>
                      </Form.Group>

                      <div className="errorMsg">
                        {this.state.errors.password}
                      </div>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col className="col-12">
                    <div className="greendiv">
                      <h6 className="text-left">
                        A strong password should have:
                      </h6>
                      <ul className="list-unstyled text-left ul_cust mb-0">
                        <li id="CharacterValid">
                          <h5 className="mb-0 pb-0">
                            {" "}
                            <i className="fa fa-check"></i> Minimum 8 Characters
                          </h5>
                        </li>
                        <li id="UppercaseValid">
                          <h5 className="mb-0 pb-0">
                            {" "}
                            <i className="fa fa-check"></i> One Upper Case
                          </h5>
                        </li>
                        <li id="LowercaseValid">
                          <h5 className="mb-0 pb-0">
                            {" "}
                            <i className="fa fa-check"></i> One Lower Case
                          </h5>
                        </li>
                        <li id="SymbolValid">
                          <h5 className="mb-0 pb-0">
                            {" "}
                            <i className="fa fa-check"></i> One Special Symbol
                          </h5>
                        </li>
                        <li id="NumberValid">
                          <h5 className="mb-0 pb-0">
                            {" "}
                            <i className="fa fa-check"></i> One Number
                          </h5>
                        </li>
                      </ul>
                    </div>
                  </Col>
                </Row>

                <div className="row">
                  <div className="col-md-12">
                    <div className="side-byside">
                      <div className="captchacode">
                        <Recaptcha
                          sitekey="6LetBawUAAAAAHB9TedeYMQPVh_LY3_C7pVT6oov"
                          render="explicit"
                          onloadCallback={this.recaptchaLoaded}
                          verifyCallback={this.verifyCallback}
                        />
                      </div>

                      <button
                        className="s-btn rset-btn btn-copy-reset"
                        id="reset-password-change"
                        type="button"
                        onClick={this.submituserRegistrationForm}
                        disabled={!this.state.value}
                      >
                        Sign up
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center pt-2">
                <p className="mb-0">
                  Already have an account? Please <a href="/signin">Sign in</a>
                </p>
              </div>
              <div className="signupwith pt-0">
                <p className="mb-0">
                  By signing up you indicate that you have read and agree to
                  Connectbud's <a href="/tandc">Terms of Service</a> and{" "}
                  <a href="/outerprivacyPolicy">Privacy Policy</a>
                </p>
              </div>
            </div>
            <div className="right-image cust-right">
              <img src={require("../../assest/images/signup-image.jpg")} />
            </div>
          </div>
        </Container>
        <div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default signUp;
