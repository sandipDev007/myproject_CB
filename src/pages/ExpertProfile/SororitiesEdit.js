/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import React from "react";
import "./style.css";
import {
  Container,
  Row,
  Col,
  InputGroup,
  Form,
} from "react-bootstrap";
import LogHeader from "../../component/exheader";
import Footer from "../../component/exfooter";
import axios from "axios";
import { API_URL } from "../../component/url";
import ReadMoreReact from "read-more-react";
import Select from 'react-select';
import countryList from 'react-select-country-list';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.options = countryList().getData()

    this.state = {
      Community: '',
      City: '',
      country: '',
      answercount: [],
      options: this.options,

    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  changeHandler = country => {
    this.setState({ country: country.label })
  }

  componentDidMount = async () => {
    if (localStorage.getItem("token") == null && localStorage.getItem("user_id") == null) {
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



    await axios.post(API_URL + "expertProfile", body1).then(res => {
      this.setState({
        Community: res.data[0].community,
        City: res.data[0].city,
      });
    })
      .catch(error => {
        console.log(error);
      });

    let body2 = new FormData();
    body2.append("user_id", localStorage.getItem("user_id"));
    body2.append("offset", "");

    await axios({
      url: API_URL + "expertAnsCount",
      method: "POST",
      data: body2
    })
      .then(response => {
        console.log(response);
        console.log(response.data);

        this.setState({
          answercount: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleSubmit = async () => {
    let body = new FormData();
    body.append("id", localStorage.getItem("Id"));
    body.append("user_id", localStorage.getItem("user_id"));

    body.append("community", this.state.Community);
    body.append("city", this.state.City);
    body.append("country", "");


    body.append("title", "");
    body.append("type", "");
    body.append("institute", "");
    body.append("location", "");
    body.append("startDate", "");
    body.append("endDate", "");


    body.append("college", "");
    body.append("department", "");
    body.append("expertise", "");
    body.append("about", "");
    body.append("name", "");
    body.append("paypalId", "");
    body.append("flag", "Y");

    await axios.post(API_URL + "expertProfile", body);
    this.props.history.push("/ExpertProfile");
  };
  back = () => {
    this.props.history.push("/ExpertProfile");
  };
  render() {
    return (
      <div className="apps-main">
        <div>
          <LogHeader />
        </div>
        <Container fluid className="mainbody">
          <Row>
            <Col lg={9}>
              <div className="exp-main mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3 list-head">
                  <h3>Association</h3>

                </div>

                <Row>
                  <Col md="4" sm="6">
                    <Form.Group controlId="validationlast">
                      <InputGroup>
                        <InputGroup.Prepend>
                          <InputGroup.Text className="bg-white text-mute">
                            *Community
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          type="text"
                          name="Community"
                          className="shadow-none"
                          value={this.state.Community}
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                    </Form.Group>

                  </Col>
                  <Col md="4" sm="6">
                    <Form.Group controlId="validationlast">
                      <InputGroup>
                        <InputGroup.Prepend>
                          <InputGroup.Text className="bg-white text-mute">
                            *City
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          type="text"
                          name="City"
                          className="shadow-none"
                          value={this.state.City}
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                    </Form.Group>

                  </Col>
                  <Col md="4" sm="6">
                    <Form.Group controlId="validationlast">
                      <InputGroup>
                        <InputGroup.Prepend>
                          <InputGroup.Text className="bg-white text-mute">
                            Country
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Select className="shadow-none"
                          type="text"
                          name="country"
                          options={this.state.options}
                          value={{ value: this.state.country, label: this.state.country }}
                          onChange={this.changeHandler}
                        />

                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="form-group justify-content-end d-flex mt-3">
                  <button
                    className="btn btn-outline my-0 ml-0 mr-2"
                    type="button"
                    onClick={this.back}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-theme"
                    type="submit"
                    disabled={!this.state.Community || !this.state.City}
                    onClick={this.handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </Col>
            <Col lg={3} className="pr-md-0">
              <div className="rightsidebar">
                <div className="toppan py-3 px-4">
                  {this.state.answercount.map((item, index) => {
                    if (item.message == "N")
                      return (
                        <h6>{item.name} you haven't given any answer yet.</h6>
                      );
                    if (index < 1)
                      return (
                        <h2>Answer given by {item.name}</h2>
                      );
                  })}
                </div>
                {this.state.answercount.map((item, index) => {
                  if (item.message != "N" && index < 3) {
                    return (
                      <div className="ques">
                        <p>
                          <b><span>Q - </span>{item.question}</b>
                        </p>
                        <p>
                          <span class="question-number">A - </span>
                          <ReadMoreReact
                            text={item.answers.answer}
                            min={30}
                            ideal={70}
                            max={500}
                            readMoreText="read more"
                          />
                        </p>
                      </div>
                    );
                  }
                })}
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

export default ProfileEdit;