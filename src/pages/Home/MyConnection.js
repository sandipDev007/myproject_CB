/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */

import React from "react";
import "./App.css";
import { Container, Row, Col, Media, Jumbotron, Button } from "react-bootstrap";
import LogHeader from "../../component/exheader";
import Footer from "../../component/exfooter";
import $ from "jquery";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../../component/url";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";
import Skeleton from "react-loading-skeleton";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userset: [],
      paidUserset: [],
      expertset: [],
      isLoading: false,
      profiledataset: []
    };
  }
  componentDidMount = async () => {
    if (
      localStorage.getItem("token") == null &&
      localStorage.getItem("user_id") == null
    ) {
      this.props.history.push("/urlblocker");
    }

    let body1 = new FormData();

    body1.append("receiver_id", localStorage.getItem("user_id"));
    body1.append("user_type", "expert");

    this.setState({ isLoading: true });

    await axios({
      url: API_URL + "myConnections",
      method: "POST",
      data: body1
    })
      .then(response => {
        if (response.data[0].message == "N") {
          this.props.history.push("/MyConnectionBlank");
        } else {
          this.props.history.push("/MyConnection");
        }
        console.log(response.data);
        localStorage.setItem("question", response.data);
        this.setState({
          expertset: response.data.sort(function(a, b) {
            if (a.expert_Name < b.expert_Name) return -1;
            else if (a.expert_Name > b.expert_Name) return 1;
            return 0;
          })
        });
        this.setState({ isLoading: false });
      })

      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
      });

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
        console.log(response.data[0].standard_package);

        this.setState({
          profiledataset: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  getuserId = (uId, Id) => {
    console.log(uId);
    localStorage.setItem("userchatuId", uId);
    localStorage.setItem("userchatshower_id", Id);
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
              <div className="rightuser pt-2">
                <div className="justify-content-end pb-0 page-titl">
                  {this.state.expertset.map((value, index) => {
                    if (index < 1) {
                      return <h3>{value.total_userconnections} Connections</h3>;
                    }
                  })}
                  <p>
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from{" "}
                  </p>
                </div>
                {this.state.isLoading == false ? (
                  <div>
                    {this.state.expertset.map((value, index) => {
                      if (value.status == "True" && value.Flag != "Y") {
                        return (
                          <Jumbotron fluid className="py-4 px-4 pos-re myconnecttion-list">
                            <span className="chat-dot"> </span>

                            <Media>
                              <Link
                                to="/userConnectedprofile"
                                onClick={() =>
                                  this.getuserId(value.user_id, value.id)
                                }
                              >
                                <img
                                  src={value.user_image}
                                  className="mr-1 img-fluid thumbnail"
                                  style={{
                                    Width: 60,
                                    height: 60,
                                    minWidth: 60
                                  }}
                                />
                              </Link>

                              <Media.Body>
                                <div className="d-flex justify-content-between align-items-center mb-1">
                                  <div className="clearfix">
                                    <h6 className="mb-1">
                                      <Link
                                        to="/userConnectedprofile"
                                        onClick={() =>
                                          this.getuserId(
                                            value.user_id,
                                            value.id
                                          )
                                        }
                                      >
                                        <strong>{value.name}</strong>
                                      </Link>
                                    </h6>
                                  </div>
                                  <div className="d-flex">
                                    <Link to="/startExchat">
                                      <Button
                                        variant="info"
                                        className="mr-1 px-4 py-1"
                                        onClick={() =>
                                          this.getuserId(
                                            value.user_id,
                                            value.id
                                          )
                                        }
                                      >
                                        Message
                                      </Button>
                                    </Link>
                                  </div>
                                </div>
                                <p className="d-flex mb-1">
                                  <strong className="text-dark mr-1">
                                    Department:
                                  </strong>{" "}
                                  {value.department}
                                </p>
                                <p className="d-flex mb-1">
                                  <strong className="text-dark mr-1">
                                    Interests:
                                  </strong>{" "}
                                  {value.interests}
                                </p>
                              </Media.Body>
                            </Media>
                          </Jumbotron>
                        );
                      } 
                      else if(value.Flag != "Y") {
                        return (
                          <Jumbotron fluid className="py-4 px-4 myconnecttion-list">
                            <Media>
                              <Link
                                to="/userConnectedprofile"
                                onClick={() =>
                                  this.getuserId(value.user_id, value.id)
                                }
                              >
                                <img
                                  src={value.user_image}
                                  className="mr-1 img-fluid thumbnail"
                                  style={{
                                    Width: 60,
                                    height: 60,
                                    minWidth: 60
                                  }}
                                />
                              </Link>

                              <Media.Body>
                                <div className="d-flex justify-content-between align-items-center mb-1">
                                  <div className="clearfix">
                                    <h6 className="mb-1">
                                      <Link
                                        to="/userConnectedprofile"
                                        onClick={() =>
                                          this.getuserId(
                                            value.user_id,
                                            value.id
                                          )
                                        }
                                      >
                                        <strong>{value.name}</strong>
                                      </Link>
                                    </h6>
                                  </div>
                                  <div className="d-flex">
                                    <Link to="/startExchat">
                                      <Button
                                        variant="info"
                                        className="mr-1 px-4 py-1"
                                        onClick={() =>
                                          this.getuserId(
                                            value.user_id,
                                            value.id
                                          )
                                        }
                                      >
                                        Message
                                      </Button>
                                    </Link>
                                  </div>
                                </div>
                                <p className="d-flex mb-1">
                                  <strong className="text-dark mr-1">
                                    Department:
                                  </strong>{" "}
                                  {value.department}
                                </p>
                                <p className="d-flex mb-1">
                                  <strong className="text-dark mr-1">
                                    Interests:
                                  </strong>{" "}
                                  {value.interests}
                                </p>
                              </Media.Body>
                            </Media>
                          </Jumbotron>
                        );
                      }
                    })}
                  </div>
                ) : (
                  <Skeleton count={3} height={160} />
                )}
              </div>
            </Col>
            <Col lg={3} className="pl-md-0">
              <div className="left-sidebar" id="sidebar2">
                {/* start */}

                {/* end */}
                <div className="other-title">Other Links</div>
                <ul className="extra-link">
                <li>
                    <a href="/expertConnection">My Mentors</a>
                  </li>
                  <li>
                    <a href="/userRequest">Pending Request</a>
                  </li>
                  <li>
                    <a href="/MyUser">Redeem Money</a>
                  </li>
                </ul>

                <div className="right-ad">
                  <img src={require("../../assest/images/member.jpg")}></img>
                  <Button className="btn btn-theme">Read More</Button>
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

$("menubtn").click(function() {
  $(".left-sidebar").toggleClass("sidesm");
});

export default App;
