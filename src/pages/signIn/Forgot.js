/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./signin.css";
import { Container, Form } from "react-bootstrap";
import Header from "../../component/header";
import Footer from "../../component/footer";
import axios from "axios";
import { API_URL } from "../../component/url";
import swal from "sweetalert";
import LoadingOverlay from 'react-loading-overlay';
import GridLoader from 'react-spinners/GridLoader';

class Forgot extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: {},
            errors: {},
            isLoading: false,
        };
        this.handleChange = this.handleChange.bind(this);
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

    forgotForm = () => {
        let dataSet = this.validateForm();
        if (dataSet === true) {
            let fields = {};
            fields["username"] = "";
            this.userVerify();
        }

    };

    validateForm = () => {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;


        if (!fields["username"]) {
            formIsValid = false;
            errors["username"] = "*Please enter your email-ID.";
        }
        if (typeof fields["username"] !== "undefined") {
            //regular expression for email validation
            var pattern = new RegExp(
                /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
            );
            if (!pattern.test(fields["username"])) {
                formIsValid = false;
                errors["username"] = "*Please enter your valid email-ID";
            }
        }

        this.setState({
            errors: errors
        });
        document.getElementById("uname").focus();
        return formIsValid;
    };

    validateForm2 = () => {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["username"]) {
            formIsValid = false;
            errors["username"] = "";
        }
        else if (typeof fields["username"] !== "undefined") {
            var pattern = new RegExp(
                /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
            );
            if (!pattern.test(fields["username"])) {
                formIsValid = false;
                errors["username"] = "*Please enter your valid email-ID";
            }
        }
        this.setState({
            errors: errors
        });
        return formIsValid;
    };

    userVerify = async () => {
        const obj = {
            email: this.state.fields["username"],
        };
        this.setState({ isLoading: true });
        await axios
            .post(API_URL + "auth/password_mail", obj, {
            })
            .then(response => {
                swal("A Verification mail sent to your Email Id!");
                this.setState({ isLoading: false });
                localStorage.setItem("rid", response.data[0].userID);
            })
            .catch(error => {
                 swal("Invalid Email!");
                this.setState({ isLoading: false });
              });
    };

    handleKeyPress = event => {
        if (event.key === "Enter") {
            this.forgotForm();
        }
    };
    back = async (event) => {
        this.props.history.push("/signin");
    }

    render() {
        return (
            <div className="App-sign">
                <div>
                    <Header />
                </div>
                <Container fluid className="mainbody p-0">
                    <LoadingOverlay
                        active={this.state.isLoading}
                        spinner={<GridLoader
                            size={20}
                            color={'#03639d'}
                        />}
                        styles={{
                            overlay: (base) => ({
                                ...base,
                                background: '#ffffff80',
                                position: 'fixed',
                            })
                        }}
                    >
                        <div className=" d-flex justify-content-between align-items-center">
                            <div className="signinbody pl-3 pr-4">
                                <h1 className="heading mb-0"><span>Forgot</span> your <span>password?</span></h1>
                                <div className="form common-form s-up mt-3">
                                    {/* <h2>Reset your password</h2> */}
                                            <div className="form-group">
                                                <Form.Group controlId="validationFormikUsername">
                                                    <div className="border d-flex align-items-center">
                                                        <input
                                                            name="username"
                                                            type="text"
                                                            id="uname" autofocus
                                                            className="form-control border-0"
                                                            placeholder="Enter Your Email"
                                                            //value={this.state.fields.username}
                                                            onChange={this.handleChange}
                                                            onKeyPress={this.handleKeyPress}
                                                        />
                                                    </div>
                                                </Form.Group>
                                                <div className="errorMsg">
                                                    {this.state.errors.username}
                                                </div>
                                            </div>
                                    <div className="d-flex justify-content-end">
                                        <button className="s-btn rset-btn" type="button" onClick={this.back} >Cancel</button>
                                        <button
                                            className="s-btn rset-btn"
                                            type="submit"
                                            onClick={this.forgotForm}
                                        >
                                        {this.state.isLoading === true}Submit
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
export default Forgot;