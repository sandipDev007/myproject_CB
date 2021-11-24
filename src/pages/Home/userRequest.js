/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable eqeqeq */

import React from "react";
import "./App.css";
import { Container, Row, Col, Media } from "react-bootstrap";
import LogHeader from "../../component/exheader";
import Footer from "../../component/exfooter";
import Star from "react-ionicons/lib/MdStar";
import Person from "react-ionicons/lib/MdPerson";
import People from "react-ionicons/lib/MdPeople";
import { API_URL } from "../../component/url";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";
import Skeleton from "react-loading-skeleton";

class connection extends React.Component {
  notify = () => {
    toast.success("Successfully connected with Mentees...", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2200
    });
  };

  notify1 = () => {
    toast.info("You ignore the connection request.", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2200
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      requestset: [],
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

    body1.append("receiver_id", localStorage.getItem("user_id"));

    axios({
      url: API_URL + "showRequests",
      method: "POST",
      data: body1
    })
      .then(response => {
        if (response.data[0].message == "N") {
          this.props.history.push("/userRequestblank");
        } else {
          this.props.history.push("/userRequest");
        }
        console.log(response.data);
        this.setState({
          requestset: response.data
        });
        this.setState({ isLoading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  };

  acceptRequest = async () => {
    let body1 = new FormData();

    body1.append("receiver_id", localStorage.getItem("user_id"));

    const obj = {
      sender_id: localStorage.getItem("uId"),
      receiver_id: localStorage.getItem("user_id"),
      status: "accept"
    };

    await axios
      .post(API_URL + "acceptRequest", obj, {
        header: {
          "content-Type": "application/json"
        }
      })
      .then(response => {
        this.notify();
        this.setState({ isLoading: false });

        console.log(response);
        axios({
          url: API_URL + "showRequests",
          method: "POST",
          data: body1
        })
          .then(response => {
            if (response.data[0].message == "N") {
              this.props.history.push("/userRequestblank");
            } else {
              this.props.history.push("/userRequest");
            }
            this.setState({
              requestset: response.data
            });
            this.setState({ isLoading: false });
          })
          .catch(error => {
            this.setState({ isLoading: false });
          });
        this.setState({ isLoading: false });
      })
      .catch(error => {
        this.setState({ isLoading: false });
      });
  };

  acceptIgnore = async () => {
    let body1 = new FormData();

    body1.append("receiver_id", localStorage.getItem("user_id"));

    const obj = {
      sender_id: localStorage.getItem("uId"),
      receiver_id: localStorage.getItem("user_id"),
      // notification_id: localStorage.getItem("notificationId"),
      status: "ignore"
    };

    await axios
      .post(API_URL + "deleteRequest", obj, {
        header: {
          "content-Type": "application/json"
        }
      })
      .then(response => {
        this.notify1();


        axios({
          url: API_URL + "showRequests",
          method: "POST",
          data: body1
        })
          .then(response => {
            if (response.data[0].message == "N") {
              this.props.history.push("/userRequestblank");
            } else {
              this.props.history.push("/userRequest");
            }
            this.setState({
              requestset: response.data
            });
            this.setState({ isLoading: false });
          })
          .catch(error => {
            this.setState({ isLoading: false });
          });

        this.setState({ isLoading: false });
      })
      .catch(error => {
        this.setState({ isLoading: false });
      });
  };

  getrequestId(uId) {
    localStorage.setItem("uId", uId);
    this.acceptRequest();
  }

  getignoreId(uId) {
    localStorage.setItem("uId", uId);
    this.acceptIgnore();
  }

  render() {
    return (
      <div className="apps-main">
        <div>
          <LogHeader />
        </div>
        <Container fluid className="mainbody friend-suggestion bg-light">
          <Row className="pt-md-3 pt-3">
            <Col md={3}>
              {this.state.profiledataset.map((value, index) => {
                return (
                  <div className="advertise card expert-profiles">
                    <figure>
                      <img
                        src={value.cover_image}
                        class="img-fluid"
                        alt="profile image"
                      />
                    </figure>
                    <figure class="round-profile">
                      <img
                        src={value.user_image}
                        class="img-fluid"
                        alt="profile image"
                      />
                    </figure>
                    <div className="card-body pt-0">
                      <p>
                        <Star color="#03639d" style={{ width: 25 }} />{" "}
                        <span>You have total {value.avg_rating} Ratings</span>
                      </p>
                      <p>
                        <Person color="#03639d" style={{ width: 25 }} />{" "}
                        <span>You have total {value.totalRating} Reviews</span>
                      </p>
                      <p>
                        <People color="#03639d" style={{ width: 25 }} />{" "}
                        <span>
                          You have total {value.totalHired} Connections
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </Col>
            <Col md={9}>
              <div className="card invitaion-card">
              {this.state.isLoading == false ? (

                <div className="card-body pb-1">
                  {this.state.requestset.map((value, index) => {
                    return (
                      <Media className=" mb-3 bg-white px-3 py-2  border">
                        <figure class="round-profile">
                          <img
                            src={value.user_image}
                            class="img-fluid"
                            alt="profile image"
                          />
                        </figure>
                        <Media.Body>
                          <div className="d-flex justify-content-between">
                            <div className="l-details more-infotxt">
                              <h5 className="mb-0 text-dark">{value.name}</h5>
                              <p>{value.country}</p>
                              <p>{value.intro}</p>
                            </div>
                            <div className="d-flex r-details align-items-center">
                              <button
                                className="btn btn-theme"
                                onClick={() => this.getrequestId(value.user_id)}
                              >
                                Accept
                              </button>
                              <ToastContainer />
                              <button className="btn btn-outline my-0 ml-3"
                              onClick={() => this.getignoreId(value.user_id)}>
                                Ignore
                              </button>
                            </div>
                          </div>
                        </Media.Body>
                      </Media>
                    );
                  })}
                </div>
                ) : (
                  <Skeleton count={3} height={160} />
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

export default connection;
