/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./style.css";
import { Container, Card, Form, InputGroup } from "react-bootstrap";
import LogHeader from "../../component/loginheader";
import Footer from "../../component/footer";
import swal from "sweetalert";
import axios from "axios";
import { API_URL } from "../../component/url";

class becomeExpert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      errors: {},
      collegeName: "",
      add: false
    };
  }

  handleChange = async e => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    await this.setState({ fields });
    this.validateForm();
  };
  handleChange1 = async e => {
    await this.setState({ college: e.target.value });
  };

  ExpertRegistration = () => {
    let dataSet = this.validateForm();
    if (dataSet === true) {
      let fields = {};
      fields["email"] = "";
      this.handleSubmit();
    }
  };

  validateForm = () => {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "*Fields can not be empty";
    } else if (typeof fields["email"] !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(fields["email"])) {
        formIsValid = false;
        errors["email"] = "*Please enter valid email-ID.";
      }
    }
    this.setState({
      errors: errors
    });
    return formIsValid;
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    if (
      localStorage.getItem("token") == null &&
      localStorage.getItem("user_id") == null
    ) {
      this.props.history.push("/urlblocker");
    } else if (localStorage.getItem("flag") == "N") {
      this.props.history.push("/verifyExpert");
    }
  }

  handleSubmit = async event => {
    const body = {
      user_id: localStorage.getItem("user_id"),
      email_id: this.state.fields.email,
      collegeName: this.state.college ? this.state.college : "",
      file: "",
      expert_type: "student"
    };

    await axios.post(API_URL + "auth/expertOtp", body).then(async res => {
      this.setState({
        userId: res.data.id
      });

      if (res.data.data[0].collegeName !== "") {
        swal("An OTP sent to your email.");
        await localStorage.setItem(
          "collName",
          this.state.college ? this.state.college : res.data.data[0].collegeName
        );
        localStorage.setItem("mail", this.state.fields.email);
        await localStorage.setItem("collPic", res.data.data[0].collegeLogo);

        this.props.history.push("/ExpertRegister");
        console.log(res.data);
      } else {
        swal("Please Add your College");
        this.setState({
          add: true
        });
      }
      console.log(res.data.data[0].collegeLogo);
    });
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.handleSubmit();
    }
  };
  back = () => {
    this.props.history.push("/App");
  };

  render() {
    return (
      <section className="become">
        <div>
          <LogHeader />
        </div>

        <div class="become-wrap">
          <Container className="h-100">
            <div class="row">
              <div class="col-md-6">
                {/* <div class="left-cont">
                  <h2>What is Lorem ConnectBud?</h2>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to
                    using 'Content here, content here', making it look like
                    readable English
                  </p>
                  <a href="#" class="more-btn">
                    Read More
                  </a>
                </div> */}
              </div>
              <div class="col-md-6">
                <div class="become-mail">
                  <Card className="popupcrad mybecom p-4 w-100">
                    <h4 className="theme-text mb-4">Become an Expert</h4>
                    <p>
                      All you have to do is provide a valid student email ID.
                    </p>
                    <Form.Group controlId="validationFormikUsername">
                      <InputGroup>
                        <InputGroup.Prepend>
                          <InputGroup.Text className="bg-white text-mute">
                            Email ID
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          type="text"
                          name="email"
                          placeholder="Enter email id"
                          className="shadow-none"
                          onChange={this.handleChange}
                          onKeyPress={this.handleKeyPress}
                          readOnly={this.state.add}
                        />
                      </InputGroup>
                    </Form.Group>
                    <div className="error">{this.state.errors.email}</div>

                    {this.state.add === true ? (
                      <Form.Group controlId="BasicCollage">
                        <InputGroup>
                          <InputGroup.Prepend>
                            <InputGroup.Text className="bg-white text-mute">
                              College Name
                            </InputGroup.Text>
                          </InputGroup.Prepend>
                          <Form.Control
                            type="text"
                            name="college"
                            onChange={this.handleChange1}
                          />
                        </InputGroup>
                      </Form.Group>
                    ) : null}
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-outline m-0"
                        onClick={this.back}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-theme m-0 ml-2"
                        //disabled={!this.state.fields.email}
                        onClick={this.ExpertRegistration}
                      >
                        Send Otp
                      </button>
                    </div>
                  </Card>
                </div>
              </div>
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
export default becomeExpert;
