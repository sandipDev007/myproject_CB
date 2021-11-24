/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import React from "react";
import "./style.css";
import { Container, Row, Col, InputGroup, Form } from "react-bootstrap";
import LogHeader from "../../component/loginheader";
import Footer from "../../component/footer";
import axios from "axios";
import { API_URL } from "../../component/url";
import ReadMoreReact from "read-more-react";
import Autocomplete from "react-autocomplete";

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.getItemValue = this.getItemValue.bind(this);
    this.renderItem = this.renderItem.bind(this);

    this.state = {
      Title: "",
      Type: "",
      Institute: "",
      Location: "",
      start: "",
      end: "",
      questioncount: [],
      autocompleteData: [],
      value: "",
      logo: ""
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleStart = async e => {
    await this.setState({
      start: e.target.value,
    });
    console.log(this.state.start)
  };

  handleEnd = async e => {
    await this.setState({
      end: e.target.value
    });
  };

  onChange(event) {
    this.setState({
      value: event.target.value
    });
    console.log(this.state.value)
    this.setState({
      Institute: event.target.value
    });
    this.userSearch();
  }

  renderItem(item, isHighlighted) {
    var data = item.college_name.replace(
      this.state.value,
      this.state.value.toUpperCase()
    );

    return (
      <div className="drop-imgwrap" style={{ background: isHighlighted ? "lightgray" : "white" }}>
        <img className="drop-img" src={item.user_image} alt={""} /> {data}
      </div>

    );
  }

  onSelect(item, value) {
    console.log(value);
    this.setState({
      value: value.college_name,
      logo: value.user_image
    });
  }

  getItemValue(item) {
    return `${item.college_name}`
  }

  userSearch = async () => {
    const obj = {
      university: this.state.Institute
    };
    await axios
      .post(API_URL + "listUniversity", obj, {
        header: {
          "content-Type": "application/json"
        }
      })
      .then(response => {
        this.setState({
          autocompleteData: response.data
        });
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
          Title: res.data[0].title,
          Type: res.data[0].type,
          value: res.data[0].institute,
          Location: res.data[0].location,
          start: res.data[0].startDate,
          end: res.data[0].endDate,
          logo: res.data[0].institute_logo
        });
      })
      .catch(error => {
        console.log(error);
      });

    let body2 = new FormData();

    body2.append("user_id", localStorage.getItem("user_id"));
    await axios({
      url: API_URL + "userQuesCount",
      method: "POST",
      data: body2
    })
      .then(response => {
        console.log(response);
        console.log(response.data);
        this.setState({
          questioncount: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  handleSubmit = async () => {
    let body = new FormData();

    body.append("id", localStorage.getItem("Id"));
    body.append("user_id", localStorage.getItem("user_id"));

    body.append("title", this.state.Title);
    body.append("type", this.state.Type);
    body.append("institute", this.state.value);
    body.append("location", this.state.Location);
    body.append("startDate", this.state.start);
    body.append("endDate", this.state.end);
    body.append("flag", "");

    // body.append("profile_type", "education");
    body.append("college", "");
    body.append("department", "");
    body.append("expertise", "");
    body.append("country", "");
    body.append("about", "");
    body.append("community", "");
    body.append("city", "");
    body.append("name", "");

    body.append("paypalId", "");
    body.append("institute_logo", this.state.logo);


    await axios.post(API_URL + "expertProfile", body);

    this.props.history.push("/studentProfile");
  };
  back = () => {
    this.props.history.push("/studentProfile");
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
              <div className="expert-main-profile py-4">
                <div className="exp-main">
                  <div className="d-flex justify-content-between align-items-center mb-3 list-head">
                    <h3>Education</h3>
                  </div>
                  <Row>
                    <Col md="4" sm="6">
                      <Form.Group controlId="validationlast">
                        <InputGroup>
                          <InputGroup.Prepend>
                            <InputGroup.Text className="bg-white text-mute">
                              *Course
                            </InputGroup.Text>
                          </InputGroup.Prepend>
                          <Form.Control
                            type="text"
                            name="Title"
                            placeholder="Ex: Bachelor's"
                            className="shadow-none"
                            value={this.state.Title}
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
                              Type
                            </InputGroup.Text>
                          </InputGroup.Prepend>
                          <Form.Control
                            as="select"
                            name="Type"
                            className="shadow-none"
                            value={this.state.Type}
                            onChange={this.handleChange}
                          >
                            <option>Select</option>
                            <option>Full timer</option>
                            <option>Part timer</option>
                          </Form.Control>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col md="4" sm="6">
                      <Form.Group controlId="validationlast">
                        <InputGroup>
                          <InputGroup.Prepend>
                            <InputGroup.Text className="bg-white text-mute">
                              *College
                            </InputGroup.Text>
                          </InputGroup.Prepend>
                          <div
                            name="Institute"
                            type="text"
                            className="w-100 input-box autocomplete boxex2 mrt0 inptwimg"
                            style={{ position: "static" }}
                            value={this.state.value}
                          >
                            <div className="clginput-img"><img src={this.state.logo} alt={""} /></div>

                            <Autocomplete
                              inputProps={{
                                placeholder: "Ex: Harvard University"
                              }}
                              getItemValue={this.getItemValue}
                              items={this.state.autocompleteData}
                              renderItem={this.renderItem}
                              value={this.state.value}
                              onChange={this.onChange}
                              onSelect={this.onSelect}

                            />
                          </div>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col md="4" sm="6">
                      <Form.Group controlId="validationlast">
                        <InputGroup>
                          <InputGroup.Prepend>
                            <InputGroup.Text className="bg-white text-mute">
                              Location
                            </InputGroup.Text>
                          </InputGroup.Prepend>
                          <Form.Control
                            type="text"
                            name="Location"
                            placeholder="Ex: California"
                            className="shadow-none"
                            value={this.state.Location}
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
                              Start date
                            </InputGroup.Text>
                          </InputGroup.Prepend>
                          <Form.Control
                            type="date"
                            //name="Start"
                            className="shadow-none"
                            value={this.state.start}
                            onChange={this.handleStart}
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                    <Col md="4" sm="6">
                      <Form.Group controlId="validationlast">
                        <InputGroup>
                          <InputGroup.Prepend>
                            <InputGroup.Text className="bg-white text-mute">
                              End date
                            </InputGroup.Text>
                          </InputGroup.Prepend>
                          <Form.Control
                            type="date"
                            className="shadow-none"
                            value={this.state.end}
                            disabled={!this.state.start} 
                            onChange={this.handleEnd}
                            min={this.state.start}
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
                      disabled={!this.state.Title || !this.state.value}
                      onClick={this.handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={3} className="pr-md-0">
              <div className="rightsidebar">
                <div className="toppan py-3 px-4">
                  {this.state.questioncount.map((item, index) => {
                    if (item.message == "N")
                      return (
                        <h6>
                          {item.name} you haven't posted any question yet.
                        </h6>
                      );
                    if (index < 1)
                      return (
                        <h2>Question Posted by {item.name}</h2>
                      );
                  })}
                </div>
                {this.state.questioncount.map((item, index) => {
                  if (item.message != "N" && index < 5) {
                    return (
                      <div className="ques">
                        <p>
                          <span class="question-number">
                            <b>Q - </b>
                          </span>
                          <ReadMoreReact
                            text={item.question}
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
