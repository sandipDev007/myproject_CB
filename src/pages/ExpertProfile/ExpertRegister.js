/* eslint-disable eqeqeq */
import React from "react";
import "./style.css";
import { Container, Card, Form, InputGroup } from "react-bootstrap";
import LogHeader from "../../component/loginheader";
import Footer from "../../component/footer";
import axios from "axios";
import { API_URL } from "../../component/url";

class expertReg extends React.Component {
  constructor() {
    super();
    this.state = {
      collegeName: "",
      fields: {},
      errors: {}
    };
  }

  handleChange = async e => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    await this.setState({ fields });
  };

  verifyOtp = () => {
    let dataSet = this.validateForm();
    if (dataSet === true) {
      let fields = {};
      fields["otp"] = "";
      this.handleMode();
    }
  };

  validateForm = () => {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["otp"]) {
      formIsValid = false;
      errors["otp"] = "*Please enter the OTP!";
    }
    this.setState({
      errors: errors
    });
    return formIsValid;
  };

  handleMode = async () => {
    this.validateForm();
    const body = {
      user_id: localStorage.getItem("user_id"),
      otp: this.state.fields.otp,
      collegename: localStorage.getItem("collName"),
      institute_logo: localStorage.getItem("collPic")
    };

    await axios.post(API_URL + "auth/expertVerifyOtp", body).then(res => {
      this.setState({
        userId: res.data.id
      });
      if (res.data !== "Incorrect OTP!") {
        this.props.history.push("/extags");
      }
       else
        {
        alert("Invalid OTP!");
      }
      console.log(body);
    });
  };

  handleMode2 = async event => {
    event.preventDefault();
    const body = {
      user_id: localStorage.getItem("user_id"),
      email_id: localStorage.getItem("mail"),
      collegeName: ""
    };

    await axios.post(API_URL + "auth/expertOtp", body).then(res => {
      this.setState({
        userId: res.data.id
      });
      alert("OTP sent!");
    });
  };
  
  render() {
    return (
      <section className="become">
        <div>
          <LogHeader />
        </div>
        <div className="expert-register">
          <Container className="h-100">
            <div className="d-flex justify-content-center align-items-center h-100">
              <Card className="popupcrad p-4 w-100 exper-regiscard">
                <h4 className="theme-text titl-colwhit">Become an Expert</h4>
                <p className=" mb-4">
                  Please enter the OTP to varify your account
                </p>
                <Form.Group>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text
                        className="bg-white text-mute"
                        id="inputGroupPrepend"
                      >
                        COLLEGE
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      name="college"
                      type="text"
                      placeholder=""
                      className="shadow-none"
                      readOnly
                      value={localStorage.getItem("collName")}
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group controlId="validationFormikUsername">
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text
                        className="bg-white text-mute"
                        id="inputGroupPrepend"
                      >
                        OTP
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      name="otp"
                      type="text"
                      placeholder=""
                      className="shadow-none"
                      onChange={this.handleChange}
                    />
                  </InputGroup>
                </Form.Group>
                <div className="error">{this.state.errors.otp}</div>
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-outline m-0 bg-white"
                    onClick={this.handleMode2}
                  >
                    Resend OTP
                  </button>
                  <button
                    className="btn btn-outline-primary m-0 ml-2 bg-blu"
                    onClick={this.verifyOtp}
                  >
                    Validate OTP
                  </button>
                </div>
              </Card>
            </div>
          </Container>
        </div>
        <div>
          <Footer />
        </div>
      </section>
    );
  }
}
export default expertReg;
