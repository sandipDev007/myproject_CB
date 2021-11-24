/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
import React from "react";
import "./style.css";
import { Container, Row, Col, Figure, Button } from "react-bootstrap";
import LogHeader from "../../component/exheader";
import Footer from "../../component/exfooter";
import axios from "axios";
import { API_URL } from "../../component/url";
import ReadMoreReact from "read-more-react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

class exProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      profiledataset: [],
      pic: [],
      answercount: [],
      loadingState: false,
      count: ""
    };
  }

  componentDidMount = async () => {
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
        this.setState({
          profiledataset: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });

    let body1 = new FormData();
    body1.append("user_id", localStorage.getItem("user_id"));
    body1.append("offset", this.state.count);

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
      .catch(error => {});
  };

  fetchData = async () => {
    this.loadMoreItems({ count: this.state.count++ });
  };

  async loadMoreItems() {
    this.setState({ loadingState: true });
    let body1 = new FormData();
    body1.append("user_id", localStorage.getItem("user_id"));
    body1.append("offset", this.state.count);

    await axios({
      url: API_URL + "expertAnsCount",
      method: "POST",
      data: body1
    })
      .then(response => {
        this.setState({
          answercount: this.state.answercount.concat([...response.data]),
          loadingState: false
        });
      })
      .catch(error => {
        this.setState({ loadingState: false });
      });
  }

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
                <InfiniteScroll
                  dataLength={this.state.answercount}
                  next={this.fetchData}
                  hasMore={true}
                >
                  {this.state.profiledataset.map((value, index) => {
                    return (
                      <div className="cover-image position-relative mb-0">
                        <div className="profile-area d-flex">
                          <div className="exper-yn-section">
                            <Figure className="img-circle profile-forallquestion">
                              <img
                                src={value.user_image}
                                alt="profile pic"
                                className="img-fluid"
                              />
                            </Figure>
                          </div>
                          <div className="profile-content">
                            <div className="d-flex justify-content-between align-items-center mb-1">
                              <div className="d-flex justify-content-between align-items-end mb-1">
                                <h5>{value.name}</h5>
                              </div>
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
                                    </ul>
                                  );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div className="allquestion_wrap">
                    {this.state.answercount.map((item, index) => {
                      if (item.message != "N") {
                        return (
                          <div className="allQuestion">
                            <h5>{item.question}</h5>
                                <div className="userAns">
                                  <div className="user-pic">
                                    <Figure className="img-circle profile-forallquestion">
                                      <img
                                        src={item.answers.user_image}
                                        alt="profile pic"
                                        className="img-fluid"
                                      />
                                    </Figure>
                                    <h4>
                                      {item.answers.name} <br></br>
                                      <span>{item.answers.timeStamp}</span>
                                    </h4>
                                  </div>
                                  <p>
                                    <ReadMoreReact
                                      text={item.answers.answer}
                                      min={30}
                                      ideal={400}
                                      max={500}
                                      readMoreText="read more"
                                    />
                                  </p>
                                </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                  {this.state.loadingState ? (
                    <p className="loading"> loading More Items..</p>
                  ) : (
                    <p className="loading"> No More Answers to Show..</p>
                  )}
                </InfiniteScroll>
              </div>
            </Col>
            <Col md={3} className="pl-md-0">
              <div className="left-sidebar" id="sidebar2">
                <div className="other-title">Other Links</div>
                <ul className="extra-link">
                  <li>
                    <a href=" ">Hired Mentors</a>
                  </li>
                </ul>

                <div className="right-ad2 right-ad">
                  <img src={require("../../assest/images/hire-add.jpg")}></img>
                  <Link to="/mentorExpertlist">
                    <Button className="btn btn-theme bex">Hire Now</Button>
                  </Link>
                </div>
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
