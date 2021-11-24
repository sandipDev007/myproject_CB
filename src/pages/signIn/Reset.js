/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable eqeqeq */
import React from "react";
import "./signin.css";
import { Container, Form } from "react-bootstrap";
import Header from "../../component/header";
import Footer from "../../component/footer";
import axios from "axios";
import { API_URL } from "../../component/url";
import swal from "sweetalert";
import LoadingOverlay from "react-loading-overlay";
import GridLoader from "react-spinners/GridLoader";
import $ from "jquery";
import base64 from "base-64";

class Reset extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {},
      errors: {},
      isLoading: false,
      type: "password",
      value: false,
      bytes: ""
    };
    this.showHide = this.showHide.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  showHide(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      type: this.state.type === "input" ? "password" : "input"
    });
  }

  showLoader = () => {
    this.setState({ isLoading: true });
  };

  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
    this.validateForm2();
  }

  componentDidMount = async () => {
    const url = window.location.href.split("?")[1];
    var encoded = url;
    this.state.bytes = base64.decode(encoded);
    console.log(this.state.bytes);
  };

  resetForm = () => {
    let dataSet = this.validateForm();
    if (dataSet === true) {
      let fields = {};
      fields["newpass"] = "";
      fields["cnfpass"] = "";
      this.userVerify();
    }
  };

  validateForm = () => {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["newpass"]) {
      formIsValid = false;
      errors["newpass"] = "*Please enter your new password.";
    }

    if (!fields["cnfpass"]) {
      formIsValid = false;
      errors["cnfpass"] = "*Please confirm your password.";
    }
    if (fields["newpass"] != fields["cnfpass"]) {
      formIsValid = false;
      errors["cnfpass"] = "*Passwords don't match";
    }
    this.setState({
      errors: errors
    });
    document.getElementById("cpass").focus();
    return formIsValid;
  };

  validateForm2 = () => {
    let fields = this.state.fields;
    console.log(fields);
    let errors = {};
    let formIsValid = true;

    if (fields["newpass"] == "") {
      $("#CharacterValid").removeClass("actv_green");
      $("#NumberValid").removeClass("actv_green");
      $("#LowercaseValid").removeClass("actv_green");
      $("#UppercaseValid").removeClass("actv_green");
      $("#SymbolValid").removeClass("actv_green");
      formIsValid = false;
    } else if (typeof fields["newpass"] !== "undefined") {
      if (fields["newpass"].match(/^.*(?=.{8,}).*$/)) {
        $("#CharacterValid").addClass("actv_green");
      } else {
        formIsValid = false;
        $("#CharacterValid").removeClass("actv_green");
      }
      if (fields["newpass"].match(/^.*(?=.*\d).*$/)) {
        $("#NumberValid").addClass("actv_green");
      } else {
        formIsValid = false;
        $("#NumberValid").removeClass("actv_green");
      }
      if (fields["newpass"].match(/^.*(?=.*[a-z]).*$/)) {
        $("#LowercaseValid").addClass("actv_green");
      } else {
        formIsValid = false;
        $("#LowercaseValid").removeClass("actv_green");
      }
      if (fields["newpass"].match(/^.*(?=.*[A-Z]).*$/)) {
        $("#UppercaseValid").addClass("actv_green");
      } else {
        formIsValid = false;
        $("#UppercaseValid").removeClass("actv_green");
      }
      if (
        fields["newpass"].match(/^.*(?=.*[@#$%&]).*$/) &&
        errors["newpass"] != ""
      ) {
        $("#SymbolValid").addClass("actv_green");
      } else {
        formIsValid = false;
        $("#SymbolValid").removeClass("actv_green");
      }
    }
    if (formIsValid == true) {
      console.log(formIsValid);
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

  userVerify = async () => {
    const obj = {
      user_id: this.state.bytes,
      new_password: this.state.fields["newpass"],
      confirmpassword: this.state.fields["cnfpass"]
    };
    this.setState({ isLoading: true });
    await axios
      .post(API_URL + "auth/resetpassword", obj, {})
      .then(response => {
        console.log(response);
        swal("Your Password Successfully Changed");
        this.setState({ isLoading: false });
      })
      .catch(error => {});
    this.props.history.push("/signin");
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.resetForm();
    }
  };

  render() {
    return (
      <div className="App-sign">
        <div>
          <Header />
        </div>
        <Container fluid className="mainbody p-0">
          <LoadingOverlay
            active={this.state.isLoading}
            spinner={<GridLoader size={20} color={"#03639d"} />}
            styles={{
              overlay: base => ({
                ...base,
                background: "#ffffff80",
                position: "fixed"
              })
            }}
          >
            <div className=" d-flex justify-content-between align-items-center">
              <div className="signinbody pl-3 pr-4">
                <h1 className="heading mb-0">
                  <span>Reset</span> your <span>password</span>
                </h1>
                <div className="form common-form s-up mt-3">
                  {/* <h2>Reset your password</h2> */}
                  <div className="row">
                    <div className="col-6">
                      <Form.Group controlId="validationFormikUsername">
                        <div className="border d-flex align-items-center">
                          <input
                            name="newpass"
                            type={this.state.type}
                            className="form-control border-0"
                            placeholder="New Password"
                            onChange={this.handleChange}
                            onKeyPress={this.handleKeyPress}
                          />
                          <span
                            className="password__show"
                            onClick={this.showHide}
                            style={{ cursor: "pointer", paddingRight: 10 }}
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
                        <div className="errorMsg">
                          {this.state.errors.newpass}
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-6">
                      <Form.Group controlId="validationFormikUsername">
                        <div className="border d-flex align-items-center">
                          <input
                            name="cnfpass"
                            type="password"
                            id="cpass"
                            autofocus
                            className="form-control border-0"
                            placeholder="Confirm Password"
                            onChange={this.handleChange}
                            onKeyPress={this.handleKeyPress}
                          />
                        </div>
                        <div className="errorMsg">
                          {this.state.errors.cnfpass}
                        </div>
                      </Form.Group>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <div className="greendiv">
                        <h6 className="text-left">Strong passwords have:</h6>
                        <ul className="list-unstyled text-left ul_cust mb-0">
                          <li id="UppercaseValid">
                            <h5 className="mb-0 pb-0">
                              {" "}
                              <i className="fa fa-check"></i> Please enter
                              minimum one upper case
                            </h5>
                          </li>
                          <li id="LowercaseValid">
                            <h5 className="mb-0 pb-0">
                              {" "}
                              <i className="fa fa-check"></i> One lower case
                            </h5>
                          </li>
                          <li id="SymbolValid">
                            <h5 className="mb-0 pb-0">
                              {" "}
                              <i className="fa fa-check"></i> One special symbol
                            </h5>
                          </li>
                          <li id="NumberValid">
                            <h5 className="mb-0 pb-0">
                              {" "}
                              <i className="fa fa-check"></i> One number
                            </h5>
                          </li>
                          <li id="CharacterValid">
                            <h5 className="mb-0 pb-0">
                              {" "}
                              <i className="fa fa-check"></i> Must have 8
                              characters
                            </h5>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end">
                    <button
                      className="s-btn rset-btn btn-copy-reset"
                      id="reset-password-change"
                      type="button"
                      onClick={this.resetForm}
                      disabled={!this.state.value}
                    >
                      {this.state.isLoading === true}Reset Password
                    </button>
                  </div>
                </div>
              </div>
              <div className="right-image">
                <img src={require("../../assest/images/signup-image.jpg")} />
              </div>
            </div>
          </LoadingOverlay>
        </Container>
        <div>
          <Footer />
        </div>
      </div>
    );
  }
}
export default Reset;
