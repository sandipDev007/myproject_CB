/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
import React from "react";
import "./style.css";
import { Container, Row, Col, Figure } from "react-bootstrap";
import LogHeader from "../../component/exheader";
import Footer from "../../component/exfooter";
import axios from "axios";
import { API_URL } from "../../component/url";
import ReadMoreReact from "read-more-react";

class exProfile extends React.Component {
  constructor() {
    super();

    this.state = {
      profiledataset: [],
      questioncount: []
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

    body.append("id", localStorage.getItem("shower_id"));
    body.append("user_id", localStorage.getItem("uId"));

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
    body1.append("user_id", localStorage.getItem("uId"));
    await axios({
      url: API_URL + "userQuesCount",
      method: "POST",
      data: body1
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
                        <Figure className="img-circle">
                          <img
                            src={item.user_image}
                            alt="profile pic"
                            className="img-fluid"
                          />
                        </Figure>
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
                            <ul className="quality-list">
                              <li>
                                <p>
                                  <b>Department</b> : {item.department}
                                </p>
                              </li>
                              <li>
                                <p>
                                  <b>Country</b> : {item.country}
                                </p>
                              </li>
                              <li>
                                <p>
                                  <b>Interests</b> :
                                        <ReadMoreReact
                                    text={item.interests}
                                    min={30}
                                    ideal={70}
                                    max={500}
                                    readMoreText="see all"
                                  />
                                </p>
                              </li>

                              {this.state.questioncount.map((value, index) => {
                                if (index < 1) {
                                  return (
                                    <li>
                                      <p>
                                        {" "}
                                        <b>Questions</b> :{" "}
                                        {value.Questioncount}
                                      </p>
                                    </li>
                                  );
                                }
                              })}
                            </ul>
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
                  {this.state.questioncount.map((item, index) => {
                    if (item.message == "N")
                      return (
                        <h6>{item.name} Not posted any question yet.</h6>
                      );
                    if (index < 1)
                      return (
                        <h2>Question Posted by {item.name}</h2>
                      );
                  })}
                </div>
                {this.state.questioncount.map((item, index) => {
                  if (item.message != "N" && index < 8) {
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

export default exProfile;
