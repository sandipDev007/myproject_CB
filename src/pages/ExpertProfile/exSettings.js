/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import React from "react";
import "./style.css";
import { Container, Row, Col } from "react-bootstrap";
import LogHeader from "../../component/exheader";
import Footer from "../../component/exfooter";
import $ from "jquery";
import axios from "axios";
import { API_URL } from "../../component/url";
import swal from "sweetalert";


class studentSettings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: {},
            errors: {},
            type: "password",
            type1: "password",
            value: false,
            bytes: "",
        };
        this.showHide = this.showHide.bind(this);
        this.Hideshow = this.Hideshow.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    showHide(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            type: this.state.type === "input" ? "password" : "input"
        });
    }
    Hideshow(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            type1: this.state.type1 === "input" ? "password" : "input"
        });
    }
    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields,
        });
        this.validateForm2();
    }

    resetForm = () => {
        let dataSet = this.validateForm();
        if (dataSet === true) {
            let fields = {};
            fields["crntpass"] = "";
            fields["newpass"] = "";
            fields["cnfpass"] = "";
            this.userVerify();
        }
    };

    validateForm = () => {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["crntpass"]) {
            formIsValid = false;
            errors["crntpass"] = "*Please enter your current password.";
        }

        if (fields["crntpass"] == fields["newpass"]) {
            formIsValid = false;
            errors["newpass"] = "*Your current password and new password cannot be same";
        }

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
        //document.getElementById("cpass").focus();
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

            if (formIsValid == true) {
                //console.log(formIsValid);
                $("#reset-password-change").removeClass("btn-copy-reset");
                this.setState({
                    value: true
                });
            }
             else {
                $("#reset-password-change").addClass("btn-copy-reset");
                this.setState({
                    value: false
                });
            }
        }
        if(fields["newpass"]==""){
            $("#reset-password-change").addClass("btn-copy-reset");
            this.setState({
                value: false
            });
        }
    };
    userVerify = async () => {
        let errors = {};
        const obj = {
            user_id: localStorage.getItem("user_id"),
            oldpassword: this.state.fields["crntpass"],
            newpassword: this.state.fields["newpass"],
            confirmpassword: this.state.fields["cnfpass"]
        };
        await axios
            .post(API_URL + "auth/change_password", obj)
            .then(response => {
                swal("Your Password Successfully Changed");
                setTimeout(() => {
                    window.location.reload(false);
                }, 1500);
            })
            .catch(error => {
                if (error.response.data.msg == "incorrect Old Password.") {
                    errors["crntpass"] = "*Your current password is wrong";
                }
                else if (error.response.data.message == "Old Password and New Password cannot be same") {
                    errors["newpass"] = "*Your current password and new password cannot be same";
                }
                else {
                    errors["cnfpass"] = "*Passwords don't match";
                }
                this.setState({
                    errors: errors
                });
            });
    };

    handleKeyPress = event => {
        if (event.key === "Enter") {
            this.resetForm();
        }
    };

    addEmail = () => {
        $("#emailsetting").addClass("actvtab");
        $("#passwordsetting").removeClass("actvtab");
        $("#Eactive").addClass("active");
        $("#Pactive").removeClass("active");

    };
    addPassword = () => {
        $("#emailsetting").removeClass("actvtab");
        $("#passwordsetting").addClass("actvtab");
        $("#Eactive").removeClass("active");
        $("#Pactive").addClass("active");

    };

    logout = async () => {
        this.userLogout();
        window.localStorage.setItem("logged_in", false);
        await localStorage.clear();
      };

      userLogout = () => {
        let body = new FormData();
        body.append("user_id", localStorage.getItem("user_id"));
        axios
          .post(API_URL + "auth/logout", body)
          .then(res => {
            if (res.data[0].Status == "Offline") {
              this.props.history.push("/");
            }
          })
      };

    render() {
        return (
            <div className="apps-main">
                <div>
                    <LogHeader />
                </div>
                <Container fluid className="mainbody">
                    <Row>
                        <Col lg={3}>
                            <div className="seting-left">
                                <h4>Account Settings</h4>
                                <ul className="leftsetting-list">
                                    {/* <li onClick={this.addEmail}><i class="fa fa-angle-right" aria-hidden="true"></i> <a id="Eactive" className="active">Email Address</a></li> */}
                                    <li onClick={this.addPassword}><i class="fa fa-angle-right" aria-hidden="true"></i> <a id="Pactive" className="active">Change Password</a></li>
                                    <li onClick={this.logout}><i class="fa fa-angle-right" aria-hidden="true"></i> <a>Log Out</a></li>
                                </ul>
                            </div>
                        </Col>
                        <Col lg={6}>
                            {/* <div className="exp-main mt-4 actvtab" id="emailsetting">
                                <div className="d-flex justify-content-between align-items-center mb-3 list-head">
                                    <h3>Change your email id</h3>
                                </div>

                                <div className="form-group">
                                    <label>New Email:</label>
                                    <div className="input-container">
                                        <i class="fa fa-envelope icon"></i>
                                        <input class="input-field" type="text" placeholder="New Email" name="email"></input>
                                    </div>
                                </div>

                                <input className="change-Btn" value="Send Verification Link" type="button"></input>
                            </div> */}

                            <div className="exp-main mt-4 actvtab" id="passwordsetting">
                                <div className="d-flex justify-content-between align-items-center mb-3 list-head">
                                    <h3>Change your password</h3>
                                </div>

                                <div className="form-group">
                                    <label>Current Password:</label>
                                    <div className="input-container">
                                        <i class="fa fa-key icon"></i>
                                        <input autocomplete="new-password" class="input-field" type={this.state.type} placeholder="Enter Current Password" name="crntpass" onChange={this.handleChange}></input>

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
                                        {this.state.errors.crntpass}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>New Password:</label>
                                    <div className="input-container">
                                        <i class="fa fa-key icon"></i>
                                        <input class="input-field" type={this.state.type1} placeholder="Enter New Password" name="newpass" onChange={this.handleChange}
                                            onKeyPress={this.handleKeyPress}></input>
                                        <span
                                            className="password__show"
                                            onClick={this.Hideshow}
                                            style={{ cursor: "pointer", paddingRight: 10 }}
                                        >
                                            {this.state.type1 === "input" ? (
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
                                </div>

                                <div className="form-group">
                                    <label>Confirm New Password:</label>
                                    <div className="input-container">
                                        <i class="fa fa-key icon"></i>
                                        <input class="input-field" type="password" id="cpass"
                                            autofocus placeholder="Re-type New Password" name="cnfpass" onChange={this.handleChange}
                                            onKeyPress={this.handleKeyPress}></input>
                                    </div>
                                    <div className="errorMsg">
                                        {this.state.errors.cnfpass}
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
                                    <button className="change-Btn rset-btn btn-copy-reset" id="reset-password-change" type="button" onClick={this.resetForm}
                                        disabled={!this.state.value}>Save</button>
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
export default studentSettings;