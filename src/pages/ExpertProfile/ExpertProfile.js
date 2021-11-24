/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
import React from "react";
import "./style.css";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Figure,
  Button
} from "react-bootstrap";
import LogHeader from "../../component/exheader";
import Footer from "../../component/exfooter";
import Edit from "react-ionicons/lib/MdCreate";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../component/url";
import ReadMoreReact from "read-more-react";
import Switch from "react-switch";

class exProfile extends React.Component {
  constructor() {
    super();

    this.state = {
      profiledataset: [],
      pic: [],
      answercount: [],
      checked: false,
      pageNumber: 1,
      numPages: null,
      file: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = async checked => {
    console.log(checked);
    await this.setState({ checked: checked });
    this.handleMentorship();
  };

  componentDidMount = async () => {
    if (this.state.checked === true) {
      this.setState({ checked: true });
    } else {
      this.setState({ checked: false });
    }

    this.setState({ isLoading: true });
    let body = new FormData();

    body.append("id", localStorage.getItem("Id"));
    body.append("user_id", localStorage.getItem("user_id"));

    //For Edit Intro
    body.append("name", "");
    body.append("college", "");
    body.append("department", "");
    body.append("expertise", "");
    body.append("country", "");
    body.append("about", "");

    // For Education
    body.append("title", "");
    body.append("type", "");
    body.append("institute", "");
    body.append("location", "");
    body.append("startDate", "");
    body.append("endDate", "");

    //For f & S
    body.append("community", "");
    body.append("city", "");

    body.append("paypalId", "");

    await axios({
      url: API_URL + "expertProfile",
      method: "POST",
      data: body
    })
      .then(response => {
        console.log(response);
        console.log(response.data[0].mentorship);
        this.setState({
          profiledataset: response.data,
          checked: response.data[0].mentorship,
          file: response.data[0].file
        });
      })
      .catch(error => {
        console.log(error);
      });

    let body1 = new FormData();

    body1.append("user_id", localStorage.getItem("user_id"));
    body1.append("offset", "");

    await axios({
      url: API_URL + "expertAnsCount",
      method: "POST",
      data: body1
    })
      .then(response => {
        this.setState({
          answercount: response.data,
        });
        //console.log(response.data)
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleMentorship = () => {
    let body = new FormData();

    body.append("user_id", localStorage.getItem("user_id"));
    body.append("mentorship", this.state.checked);

    axios.post(API_URL + "mentorship", body);
  };

  render() {
    return (
      <div className="apps-main">
        <div>
          <LogHeader />
        </div>
        <Container fluid className="mainbody">
          <Row>
            <Col lg={9} className="pr-lg-0">
              <div className="expert-main py-4">
                {this.state.profiledataset.map((value, index) => {
                  return (
                    <div className="cover-image position-relative mb-0">
                      <Figure className="mb-0 clearfix position-relative d-block">
                        <img
                          src={value.cover_image}
                          alt="coverpic"
                          className="img-fluid"
                        />
                      </Figure>
                      <div className="profile-area d-flex">
                        <div className="exper-yn-section">
                          <Figure className="img-circle">
                            <img
                              src={value.user_image}
                              alt="profile pic"
                              className="img-fluid"
                            />
                          </Figure>
                          <label>
                            <span className="bcom-mnt">Become a Mentor</span>
                            <Switch
                              onChange={this.handleChange}
                              checked={this.state.checked}
                            />
                          </label>
                        </div>
                        <div className="profile-content">
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <div className="d-flex justify-content-between align-items-end mb-1">
                              <h5>{value.name}</h5>
                            </div>
                            <Link to="/ExpertProfileEdit">
                              <Button
                                type="button"
                                className="btn btn-theme sm rounded p-1"
                              >
                                <Edit style={{ fill: "#fff" }} />
                              </Button>
                            </Link>
                          </div>

                          <div className="d-block list-details">
                            {this.state.profiledataset.map((value, index) => {
                              if (index < 1)
                                return (
                                  <ul className="quality-list">
                                    <li>
                                      <p>
                                        <b>Department</b> : {value.department}
                                      </p>
                                    </li>
                                    <li>
                                      <p>
                                        <b>College</b> : {value.institute}
                                      </p>
                                    </li>
                                    <li>
                                      <p>
                                        <b>Country</b> : {value.country}
                                      </p>
                                    </li>
                                    {this.state.answercount.map(
                                      (value, index) => {
                                        if (index < 1) {
                                          return (
                                            <li>
                                              <p>
                                                {" "}
                                                <b>Answers</b> :{" "}
                                                {value.answercount}
                                              </p>
                                            </li>
                                          );
                                        }

                                      }
                                    )}
                                    <li>
                                      <p>
                                        <b>Expertise</b> : {value.expertise}
                                      </p>
                                    </li>
                                    <li>
                                      <p>
                                        <b>Interests</b> :
                                        <ReadMoreReact
                                          text={value.interests}
                                          min={30}
                                          ideal={70}
                                          max={500}
                                          readMoreText="see all"
                                        />
                                      </p>
                                    </li>
                                  </ul>
                                );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {/* end of cover image */}
                {this.state.profiledataset.map((value, index) => {
                  if (value.about != "" && index < 1)
                    return (
                      <div className="d-flex justify-content-between align-items-center mb-3 list-head">
                        <h3><b>About</b></h3>
                      </div>
                    );
                })
                }
                {this.state.profiledataset.map((value, index) => {
                  if (value.about != "" && index < 1)
                    return (
                      <div className="border p-3 rounded mb-3">
                        <p className="mb-0">
                          <ReadMoreReact
                            text={value.about}
                            min={10}
                            ideal={280}
                            max={500}
                            readMoreText="read more"
                          />
                        </p>
                      </div>
                    );
                })}
                {this.state.profiledataset.map((value, index) => {
                  if (value.file != "" && index < 1){
                    return (
                      <div className="d-flex justify-content-between align-items-center mb-3 list-head">
                        <h3><b>Uploaded documents</b></h3>
                      </div>
                    );
                  }
                })
                }
                {this.state.profiledataset.map((value, index) => {
                  if (value.file != "" && index < 1){
                    return (
                      <div className="border p-3 rounded mb-3">
                        <p className="mb-0">
                          <iframe src={value.file[0][0]} />
                        </p>
                      </div>
                    );
                  }
                })
                }
                <div className="d-flex justify-content-between align-items-center mb-3 list-head mywidth">
                  <div class="col-sm-6 my-editsection">
                    <h3 className="fulwidth"><b>Education</b>
                      <Button
                        type="button"
                        className="btn btn-theme sm rounded p-1"
                        href="/EducationEdit"
                      >
                        <Edit style={{ fill: "#fff" }} />
                      </Button>
                    </h3>
                  </div>
                  <div class="col-sm-6 my-editsection only-dxktop">
                    <h3><b>Association</b>
                      <Button
                        type="button"
                        className="btn btn-theme sm rounded p-1"
                        href="/SororitiesEdit"
                      >
                        <Edit style={{ fill: "#fff" }} />
                      </Button>
                    </h3>
                  </div>
                </div>
                {
                  this.state.profiledataset.map((item, index) => {
                    if (item.institute || item.title || item.location || item.startDate || item.endDate || item.community || item.city != "" && index < 1)
                      return (
                        <div className="border py-3 px-4 rounded mb-3 cirtify">
                          <Row>
                            <Col md={6}>
                              <div className="exp exp2">
                                <Figure className="img-thumbnail rounded-0 ml-0 mr-2 lg">
                                  <img
                                    src={item.institute_logo}
                                    className="img-fluid"
                                    alt="icon"
                                  />
                                </Figure>
                                <div className="text-mute">
                                  <p className="mb-0">
                                    <ul className="eduquality-list">
                                      <li>
                                        <p>
                                          <b>College</b> : {item.institute}
                                        </p>
                                      </li>
                                      <li>
                                        <p>
                                          <b>Course</b> : {item.title}
                                        </p>
                                      </li>
                                      <li>
                                        <p>
                                          <b>City</b> : {item.location}
                                        </p>
                                      </li>
                                      <li>
                                        <p>
                                          <b>Duration</b> : {item.startDateFormat} – {item.endDateFormat}
                                        </p>
                                      </li>
                                    </ul>
                                  </p>

                                </div>
                              </div>
                            </Col>
                            <Col md={6}>
                              <div class="col-sm-12 my-editsection edit-btnformobile">
                                <h3><b>Association</b>
                                  <Button
                                    type="button"
                                    className="btn btn-theme sm rounded p-1"
                                    href="/SororitiesEdit"
                                  >
                                    <Edit style={{ fill: "#fff" }} />
                                  </Button>
                                </h3>
                              </div>
                              <div className="exp exp2">
                                <Figure className="img-thumbnail lg rounded-0 ml-0 mr-2">
                                  <img
                                    src={item.Associations_logo}
                                    className="img-fluid"
                                    alt="icon"
                                  />
                                </Figure>
                                <div className="text-mute">
                                  <p className="mb-0">
                                    <ul className="eduquality-list">
                                      <li>
                                        <p>
                                          <b>Community</b> : {item.community}
                                        </p>
                                      </li>
                                      <li>
                                        <p>
                                          <b>City</b> : {item.city}
                                        </p>
                                      </li>
                                    </ul>
                                  </p>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      );
                  })
                }
                {
                  this.state.checked == true && (
                    <Row>
                      <Col>
                        <div className="d-flex justify-content-between align-items-center mb-3 list-head">
                          <h3>
                            <b>Payment Info</b>
                          </h3>
                          <br />

                          <Button
                            type="button"
                            className="btn btn-theme sm rounded p-1"
                            href="/paypalid"
                          >
                            <Edit style={{ fill: "#fff" }} />
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  )
                }
                {
                  this.state.checked == true && (
                    <div className="border py-3 px-4 rounded mb-3 cirtify">
                      {this.state.profiledataset.map((item, index) => {
                        return (
                          <Row>
                            <Col md="6" sm="6">
                              <Form.Group controlId="validationlast">
                                <InputGroup>
                                  <InputGroup.Prepend>
                                    <InputGroup.Text className="bg-white text-mute">
                                      Paypal Id
                                  </InputGroup.Text>
                                  </InputGroup.Prepend>
                                  <Form.Control
                                    type="text"
                                    name="id"
                                    placeholder="Enter your valid paypal id"
                                    className="shadow-none"
                                    value={item.paypal_id} readOnly
                                  />
                                </InputGroup>
                              </Form.Group>
                            </Col>
                          </Row>
                        );
                      })}
                    </div>
                  )
                }
              </div>
            </Col>
            <Col lg={3} className="pr-lg-0">
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
                  if (item.message != "N" && index < 4) {
                    return (
                      <div className="ques">
                        <p>
                          <b>
                            <span>Q - </span>
                            {item.question}
                          </b>
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
                {this.state.answercount.map((item, index) => {
                  if (item.message != "N" && index < 1)
                    return (
                      <Link to="/AnswerView">
                        <button className="btn btn-outline btn-fill">See All</button>
                      </Link>
                    );
                }
                )}
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
export default exProfile;
