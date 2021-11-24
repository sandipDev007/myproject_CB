/* eslint-disable react/jsx-no-duplicate-props */
import React from "react";
import "./style.css";
import { Container, Card, InputGroup, Form } from "react-bootstrap";
import LogHeader from "../../component/exheader";
import Footer from "../../component/exfooter";
import axios from "axios";
import { API_URL } from "../../component/url";

class paypalid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {},
      errors: {},
      email: "",
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = async e => {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    await this.setState({
      fields,
      [e.target.name]: e.target.value
    });
  };

  submitPrice = () => {
    let dataSet = this.validateForm();
    if (dataSet === true) {
      this.handleSubmit();
    }
  };

  validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!this.state.email) {
      formIsValid = false;
      errors["email"] = "";
    }
    if (typeof this.state.email !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(this.state.email)) {
        formIsValid = false;
        errors["email"] = "*Please enter valid paypal-ID.";
      }
    }
    this.setState({
      errors: errors
    });
    return formIsValid;
  };

  handleSubmit = () => {
    let body = new FormData();
    body.append("id", localStorage.getItem("Id"));
    body.append("user_id", localStorage.getItem("user_id"));

    body.append("name", "");
    body.append("college", "");
    body.append("department", "");
    body.append("expertise", "");
    body.append("country", "");
    body.append("about", "");

    body.append("title", "");
    body.append("type", "");
    body.append("institute", "");
    body.append("location", "");
    body.append("startDate", "");
    body.append("endDate", "");

    body.append("community", "");
    body.append("city", "");

    body.append("paypalId", this.state.email);
    body.append("flag", "Y");

    axios.post(API_URL + "expertProfile", body).then(res => {
      this.props.history.push("/ExpertProfile");
    });
  };

  componentDidMount = async () => {
    if (
      localStorage.getItem("token") == null &&
      localStorage.getItem("user_id") == null
    ) {
      this.props.history.push("/urlblocker");
    }
    let body1 = new FormData();

    body1.append("id", localStorage.getItem("Id"));
    body1.append("user_id", localStorage.getItem("user_id"));

    //For Edit Intro
    body1.append("name", "");
    body1.append("college", "");
    body1.append("department", "");
    body1.append("expertise", "");
    body1.append("country", "");
    body1.append("about", "");

    // For Education
    body1.append("title", "");
    body1.append("type", "");
    body1.append("institute", "");
    body1.append("location", "");
    body1.append("startDate", "");
    body1.append("endDate", "");

    //For f & S
    body1.append("community", "");
    body1.append("city", "");

    body1.append("paypalId", "");

    await axios
      .post(API_URL + "expertProfile", body1)
      .then(res => {
        this.setState({
          email: res.data[0].paypal_id
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.submitPrice();
    }
  };
  back = () => {
    this.props.history.push("/ExpertProfile");
  };

  render() {
    return (
      <section className="become">
        <div>
          <LogHeader />
        </div>

        <div class="become-wrap become-wrap2">
          <Container className="h-100">
            <div class="row">
              <div class="col-sm-12">
                <div class="become-mail become-mail2">
                  <Card className="popupcrad mybecom p-4 w-100 shadow">
                    <h4 className="theme-text mb-4">Payment Info</h4>
                    <Form.Group controlId="validationFormikUsername">
                      <InputGroup>
                        <InputGroup.Prepend>
                          <InputGroup.Text className="bg-white text-mute">
                            *Email ID
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          type="text"
                          name="email"
                          placeholder="Enter your valid paypal id"
                          className="shadow-none"
                          value={this.state.fields.email}
                          value={this.state.email}
                          onChange={this.handleChange}
                          onKeyPress={this.handleKeyPress}
                        />
                      </InputGroup>
                    </Form.Group>
                    <div className="errorMsg">{this.state.errors.email}</div>

                    <ul className="list-unstyled checklist mb-2">
                      <li>
                        <h5>
                          Put a valid PayPal ID in order to receive the fund
                          transfer to your account by ConnectBud.
                        </h5>
                      </li>
                      <li>
                        <h5>
                          For any payment-related issues, queries and questions,
                          contact our customer care executive.
                        </h5>
                      </li>
                    </ul>

                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-outline my-0 ml-0 mr-2"
                        type="button"
                        onClick={this.back}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-theme"
                        type="button"
                        disabled={!this.state.email}
                        onClick={this.submitPrice}
                      >
                        Submit
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
export default paypalid;
