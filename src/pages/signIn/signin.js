/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./signin.css";
import { Container, Row, Col, Form } from "react-bootstrap";
import Header from "../../component/header";
import Footer from "../../component/outerfooter";
import axios from "axios";
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { Link } from "react-router-dom";
import { API_URL } from "../../component/url";
import swal from "sweetalert";
import LoadingOverlay from "react-loading-overlay";
import GridLoader from "react-spinners/GridLoader";
// import GoogleLogin from 'react-google-login';
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import base64 from "base-64";


class signIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {},
      errors: {},
      isLoading: false,
      code: "",
      type: "password"
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
  }

  loginForm = () => {
    let dataSet = this.validateForm();
    if (dataSet === true) {
      let fields = {};
      fields["username"] = "";
      fields["password"] = "";
      this.userLogin();
    }
  };

  componentDidMount = async () => {
    this.setState({ isLoading: true });
    let body = new FormData();
    body.append("user_id", localStorage.getItem("user_id"));

    axios({
      url: API_URL + "auth/sessionLogin",
      method: "POST",
      data: body
    })
      .then(response => {
        console.log(response);
        localStorage.setItem("username", response.data[0].name);
        localStorage.setItem("user_id", response.data[0].user_id);

        if (response.data[0].Flag === "Y") {
          this.props.history.push("/exapp");
        } else {
          this.props.history.push("/App");
        }
        this.setState({ isLoading: false });
      })
      .catch(error => {
        this.setState({ isLoading: false });
      });
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
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(fields["username"])) {
        formIsValid = false;
        errors["username"] = "*Username must be a valid email-ID";
      }
    }

    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }

    this.setState({
      errors: errors
    });
    document.getElementById("uname").focus();
    return formIsValid;
  };

  responseFacebook = async response => {
    console.log(response);

    let body = new FormData();
    body.append("socialLogintype", "facebook");
    body.append("first_name", response.name.split(" ")[0]);
    body.append("last_name", response.name.split(" ")[1]);
    body.append("appId", response.id);
    body.append("googleId", "");
    body.append("profileImage", response.picture.data.url);
    body.append("email", response.email);

    await axios({
      url: API_URL + "auth/socialLogin",
      method: "POST",
      data: body
    })
      .then(response => {
        this.setState({});
        localStorage.setItem("username", response.data[0].name);
        localStorage.setItem("user_id", response.data[0].user_id);
        localStorage.setItem("flag", response.data[0].flag);
        localStorage.setItem("token", response.data[0].token);
        localStorage.setItem("status", response.data[0].active_status);
        localStorage.setItem("Id", response.data[0].row_id);
        localStorage.setItem("loginType", response.data[0].login_type);

        if (
          response.data[0].message == "First time login"
        ) {
          this.props.history.push("/socialtags");
        } else if (response.data[0].message == "no tags") {
          this.props.history.push("/socialtags");
        } else {
          if (response.data[0].flag == "Y") {
            this.props.history.push("/exapp");
          } else {
            this.props.history.push("/App");
          }
        }
      })
      .catch(error => {
        this.setState({ isLoading: false });
        swal("Facebook-Id already exists");
      });
  };

  responseGoogle = async response => {
    console.log(response);

    let body = new FormData();
    body.append("socialLogintype", "google");
    body.append("first_name", response.profileObj.givenName);
    body.append("last_name", response.profileObj.familyName);
    body.append("appId", "");
    body.append("googleId", response.profileObj.googleId);
    body.append("profileImage", response.profileObj.imageUrl);
    body.append("email", response.profileObj.email);

    await axios({
      url: API_URL + "auth/socialLogin",
      method: "POST",
      data: body
    })
      .then(response => {
        this.setState({});
        localStorage.setItem("username", response.data[0].name);
        localStorage.setItem("user_id", response.data[0].user_id);
        localStorage.setItem("flag", response.data[0].flag);
        localStorage.setItem("token", response.data[0].token);
        localStorage.setItem("status", response.data[0].active_status);
        localStorage.setItem("Id", response.data[0].row_id);
        localStorage.setItem("loginType", response.data[0].login_type);

        if (response.data[0].message == "First time login") {
          this.props.history.push("/socialtags");
        } else if (response.data[0].message == "no tags") {
          this.props.history.push("/socialtags");
        } else {
          if (response.data[0].flag == "Y") {
            this.props.history.push("/exapp");
          } else {
            this.props.history.push("/App");
          }
        }
      })
      .catch(error => {
        this.setState({ isLoading: false });
        swal("google-Id already exists");
      });
  };

  userLogin = async () => {
    const obj = {
      username: base64.encode(this.state.fields["username"]),
      password: base64.encode(this.state.fields["password"])
    };
    this.setState({ isLoading: true });
    await axios
      .post(API_URL + "auth/login", obj, {
        header: {
          "content-Type": "application/json"
        }
      })
      .then(response => {
        console.log(response.data[0].Token);
        localStorage.setItem("username", base64.decode(response.data[0].name));
	      localStorage.setItem("user_id", base64.decode(response.data[0].user_id));
	      localStorage.setItem("flag", base64.decode(response.data[0].Flag));
	      localStorage.setItem("token", base64.decode(response.data[0].Token));
	      localStorage.setItem("status", base64.decode(response.data[0].Status));

        if (base64.decode(response.data[0].Flag) === "Y") {
          this.props.history.push("/exapp");
         } 
        else {
          this.props.history.push("/App");
        }
        this.setState({ isLoading: false });
      })
      .catch(error => {
        swal("The Username or Password you have entered is invalid!");
        this.setState({ isLoading: false });
      });
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      console.log("enter press here! ");
      this.loginForm();
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
              <div className="signinbody pl-3 py-3 pr-4">
                <div className="sign-innerdiv">
                  <h1 className="heading mb-0">
                    <span>Meet</span> the <span>Experts</span>
                  </h1>
                  <div className="form mt-3 common-form">
                    <h2>Sign in</h2>
                    <Row>
                      <Col md={6}>
                        <Form.Group
                          controlId="validationFormikUsername"
                          className="mb-2"
                        >
                          <div className="border d-flex align-items-center">
                            <input
                              name="username"
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
                          {this.state.errors.username}
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="form-group">
                          <Form.Group
                            controlId="validationpass"
                            className="mb-2"
                          >
                            <div className="d-flex border pr-2 align-items-center">
                              <input
                                name="password"
                                type={this.state.type}
                                className="form-control border-0"
                                placeholder="Enter Password"
                                //value={this.state.fields.password}
                                onChange={this.handleChange}
                                onKeyPress={this.handleKeyPress}
                              />
                              <span
                                className="password__show"
                                onClick={this.showHide}
                                style={{ cursor: "pointer" }}
                              >
                                {/* {this.state.type === "input" ? "Hide" : "Show"} */}
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
                    <div className="d-flex justify-content-between align-items-end">
                      <a href="/Forgot" className="th-text pl-3">
                        Forgot Password ?
                      </a>
                      <button
                        className="btn-new"
                        type="submit"
                        onClick={this.loginForm}
                      >
                        {this.state.isLoading === true}Login
                      </button>
                    </div>
                  </div>
                  <div className="signupwith common-form">
                    <h2>Continue with</h2>
                    <div className="d-flex align-items-center justify-content-center flex-wrap social-btn mb-3">
                      <FacebookLogin
                        appId="865289263931046"
                        fields="name,email,picture"
                        callback={this.responseFacebook}
                        disableMobileRedirect={true}
                        icon={<i className="fa fa-facebook" />}
                        textButton = "&nbsp;&nbsp;Facebook"      
                        render={renderProps => (
                          <button
                            className="s-btn"
                            type="button"
                            onClick={renderProps.onClick}
                            variant="primary"
                            block
                          >
                          </button>
                        )}
                      />

                      <GoogleLogin
                        clientId="367228152991-ft3qki8h4dls21t36j1tpne39gidbltt.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={"single_host_origin"}
                        render={renderProps => (
                          <button
                            className="s-btn"
                            type="button"
                            onClick={renderProps.onClick}
                            variant="primary"
                            block
                          >
                            <img src={require("../../assest/images/go-btn.png")} />
                            <span>&nbsp;&nbsp;Google</span>
                          </button>
                        )}
                      />

                      <Link to="/signup" className="s-btn" type="button">
                        <img
                          src={require("../../assest/images/mail.png")}
                          className="img_custm"
                        />
                        Email
                      </Link>
                    </div>
                    <p className="text-center">
                      By signing up you indicate that you have read and agree to
                      Connectbud's <a href="/tandc">Terms of Service</a> and{" "}
                      <a href="/outerprivacyPolicy">Privacy Policy</a>
                    </p>
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

export default signIn;
