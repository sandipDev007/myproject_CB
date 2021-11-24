/* eslint-disable no-mixed-operators */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import React from "react";
import "./style.css";
import { Container, Row, Col, Figure } from "react-bootstrap";
import LogHeader from "../../component/exheader";
import Footer from "../../component/exfooter";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../component/url";
import StarRatingComponent from "react-star-rating-component";
import ReadMoreReact from "read-more-react";

class exProfile extends React.Component {
  constructor() {
    super();

    this.state = {
      profiledataset: [],
      answercount: [],
    };
  }

  componentDidMount = async () => {
    if (
      localStorage.getItem("token") == null &&
      localStorage.getItem("user_id") == null
    ) {
      this.props.history.push("/urlblocker");
    }
    this.setState({ isLoading: true });
    let body = new FormData();

    body.append("id", localStorage.getItem("exchatshower_id"));
    body.append("user_id", localStorage.getItem("exchatuId"));

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
        console.log(response.data);
        this.setState({
          profiledataset: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });

    let body1 = new FormData();

    body1.append("user_id", localStorage.getItem("exchatuId"));
    body1.append("offset", "");

    await axios({
      url: API_URL + "expertAnsCount",
      method: "POST",
      data: body1
    })
      .then(response => {
        this.setState({
          answercount: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  getuserId = (uId, Id) => {
    console.log(uId);
    localStorage.setItem("exchatuId", uId);
    localStorage.setItem("exchatshower_id", Id);
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
                {this.state.profiledataset.map((item, index) => {
                  return (
                    <div className="cover-image position-relative mb-0">
                      <Figure className="mb-0 clearfix position-relative d-block">
                        <img
                          src={item.cover_image}
                          alt="coverpic"
                          className="img-fluid"
                        />
                      </Figure>
                      <div className="profile-area d-flex">
                        <div class="profile-img">
                          <Figure className="img-circle">
                            <img
                              src={item.user_image}
                              alt="profile pic"
                              className="img-fluid"
                            />
                          </Figure>
                          <Link to="/expertChat">
                            <button
                              class="btn btn-theme"
                              type="button"
                              onClick={() =>
                                this.getuserId(item.user_id, item.id)
                              }
                            >
                              Chat
                            </button>
                          </Link>
                        </div>

                        <div className="profile-content">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="d-flex justify-content-between align-items-end mb-2">
                              <div style={{ color: "#22639d" }}>
                                <h4>
                                  <b>{item.name}</b>
                                </h4>
                              </div>
                            </div>
                          </div>
                          <div className="d-block list-details">
                            {this.state.profiledataset.map((value, index) => {
                              if (index < 1)
                                return (
                                  <ul className="quality-list">
                                    <li>
                                      <p>
                                        <b>College</b> : {value.institute}
                                      </p>
                                    </li>
                                    <li>
                                      <p>
                                        <b>Department</b> : {value.department}
                                      </p>
                                    </li>
                                    <li>
                                      <p>
                                        <b>Country</b> : {value.country}
                                      </p>
                                    </li>
                                    <li>
                                      <p>
                                        <b>Expertise</b> : {value.expertise}
                                      </p>
                                    </li>

                                    <li>
                                      <p class="d-flex">
                                        <b>Rating</b> :
                                        <StarRatingComponent
                                          name="rate1"
                                          color="blue"
                                          starCount={5}
                                          value={value.avg_rating}
                                        />
                                      </p>
                                    </li>

                                    {this.state.answercount.map((value, index) => {
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
                                    })}
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
                {this.state.profiledataset.map((item, index) => {
                  if (item.institute || item.title || item.location || item.startDate || item.endDate || item.community || item.city != "" && index < 1)
                    return (
                      <div className="d-flex justify-content-between align-items-center mb-3 list-head mywidth">
                        <div class="col-sm-6 my-editsection">
                          <h3>
                            <b>Education</b>
                          </h3>
                        </div>
                        <div class="col-sm-6 my-editsection">
                          <h3>
                            <b>Association</b>
                          </h3>
                        </div>
                      </div>
                    );
                })}
                {this.state.profiledataset.map((item, index) => {
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
              </div>
            </Col>
            <Col lg={3} className="pr-lg-0">
              <div className="rightsidebar">
                <div className="toppan py-3 px-4">
                  {this.state.answercount.map((item, index) => {
                    if (item.message == "N")
                      return (
                        <h6>{item.name} has not given any answer yet.</h6>
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
                      <Link to="/ExConnectedProAnswer">
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
