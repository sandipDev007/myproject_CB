/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import LogHeader from "../../component/exheader";
import Footer from "../../component/exfooter";
import Star from "react-ionicons/lib/MdStar";
import Person from "react-ionicons/lib/MdPerson";
import People from "react-ionicons/lib/MdPeople";
import { API_URL } from "../../component/url";
import axios from "axios";

class connection extends React.Component {
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
        this.setState({
          profiledataset: response.data
        });
      })
      .catch(error => {});

    body1.append("receiver_id", localStorage.getItem("user_id"));

    axios({
      url: API_URL + "showRequests",
      method: "POST",
      data: body1
    })
      .then(response => {
        this.setState({
          requestset: response.data
        });
        this.setState({ isLoading: true });
      })
      .catch(error => {
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

    this.setState({ isLoading: true });
    await axios
      .post(API_URL + "acceptRequest", obj, {
        header: {
          "content-Type": "application/json"
        }
      })
      .then(response => {
        axios({
          url: API_URL + "showRequests",
          method: "POST",
          data: body1
        })
          .then(response => {
            this.setState({
              requestset: response.data
            });
            this.setState({ isLoading: true });
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
                <div className="card-body pb-1">
                  <img
                    src={require("../../assest/images/requestblank.jpg")}
                    alt="blankimage"
                    className="img-fluid"
                  />
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

export default connection;
