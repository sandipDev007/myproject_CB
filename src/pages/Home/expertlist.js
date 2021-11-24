/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable array-callback-return */
import React from "react";
import "./App.css";
import { Container, Row, Col, Modal, Form } from "react-bootstrap";
import LogHeader from "../../component/loginheader";
import Footer from "../../component/footer";
import { API_URL } from "../../component/url";
import axios from "axios";
import { Link } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";

class connection extends React.Component {
  notify = () => {
    toast.info("Connection Request sent successfully!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2200
    });
  };
  constructor(props) {
    super(props);
    this.state = {
      expertset: [],
      rating: 1,
      isLoading: "false",
      show: false,
      stateModal1: "block"
    };
  }

  handleRequest = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  expertList = async () => {
    let taglistbody = new FormData();

    taglistbody.append("user_id", localStorage.getItem("user_id"));

    this.setState({ isLoading: true });

    await axios({
      url: API_URL + "feedexpertlist",
      method: "POST",
      data: taglistbody
    })
      .then(response => {
        console.log(response.data);
        this.setState({
          expertset: response.data
        });
        this.setState({ isLoading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
      });

    this.state.expertset.map((item, index) => {
      item.isRequest = false;
    });
  };

  componentDidMount = async () => {
    console.log(localStorage.getItem("token "));
    if (
      localStorage.getItem("token") == null &&
      localStorage.getItem("user_id") == null
    ) {
      this.props.history.push("/urlblocker");
    }

    this.expertList();
  };

  getuserId = (uId, Id) => {
    console.log(uId);
    localStorage.setItem("uId", uId);
    localStorage.setItem("shower_id", Id);
    this.handleShow();
  };

  userRequest = async (uId, index) => {
    const obj = {
      sender_id: localStorage.getItem("user_id"),
      receiver_id: localStorage.getItem("uId"),
      intro: this.state.request
    };

    this.setState({ isLoading: true });
    await axios
      .post(API_URL + "sendRequest", obj, {
        header: {
          "content-Type": "application/json"
        }
      })
      .then(response => {
        this.notify();
        let t = this.state.expertset;
        t[index].isRequest = true;
        this.setState({
          expertset: t,
          show: false,
          request: ""
        });

        this.expertList();
        this.setState({ isLoading: false });
      })
      .catch(error => {
        this.setState({ isLoading: false });
      });
  };

  getexpertId(uId, index) {
    this.userRequest(uId, index);
    this.setState({ isLoading: false });
  }
  handleClose = () => {
    this.setState({
      show: false,
      request: ""
    });
  };
  handleShow = () => {
    this.setState({
      show: true,
      stateModal1: "none"
    });
  };


  render() {
    return (
      <div className="apps-main">
        <div>
          <LogHeader />
        </div>
        <Container fluid className="mainbody friend-suggestion bg-light">
          {this.state.isLoading == false ? (
            <Row className="py-md-3 mx-md-0">
              {this.state.expertset.map((value, index) => {
                return (
                  <Col md={3} lg={2} sm={4} xs={6} key={index}>
                    <div
                      class="friends-box bg-white"
                      style={{ minHeight: 339 }}
                    >
                      <div class="box-header position-relative">
                        <img
                          src={value.coverImage}
                          class="img-fluid"
                          alt="cover image"
                        />
                        <Link
                          to="/viewProfile"
                          onClick={() =>
                            this.getuserId(value.user_id, value.id)
                          }
                        >
                          <figure class="round-profile">
                            <img
                              src={value.user_image}
                              class="img-fluid"
                              alt="profile image"
                            />
                          </figure>
                        </Link>
                      </div>
                      <div class="box-body p-3 text-center mymin-higt">
                        <Link
                          to="/viewProfile"
                          onClick={() =>
                            this.getuserId(value.user_id, value.id)
                          }
                        >
                          <h4>{value.expert_Name}</h4>
                        </Link>
                        <span class="d-block theme-text">
                          {value.department}
                        </span>
                        <p class="mb-0 text-black-50">{value.expertise}</p>
                        <p class="black-text mb-0">{value.collegeName}</p>
                        <div className="text-center">
                          <StarRatingComponent
                            name="rate1"
                            color="blue"
                            starCount={5}
                            value={value.avg_rating}
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-center">
                        <button
                          class="btn btn-theme"
                          type="button"
                          onClick={() =>
                            this.getuserId(value.user_id, value.id)
                          }
                        >
                          {value.isRequest != true
                            ? "Connect"
                            : "Pending"}
                        </button>

                        <ToastContainer />
                      </div>
                    </div>
                  </Col>
                );
              })}

              <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Invite for a one-to-one interaction</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <p className="text-dark"></p>

                  <div className="form-group">
                    <Form.Control
                      name="request"
                      as="textarea"
                      rows="3"
                      placeholder="Add a Personalized Message"
                      value={this.state.request}
                      onChange={this.handleRequest}
                    />
                  </div>
                  <div className="form-group d-flex justify-content-end">
                    <button
                      className="btn btn-info rounded-pill px-4 ml-2"
                      onClick={this.handleClose}
                    >
                      Cancel
                    </button>

                    {this.state.expertset.map((value, index) => {
                      if (index < 1) {
                        return (
                          <button
                            className="btn btn-theme rounded-pill px-4 ml-2"
                            disabled={!this.state.request}
                            onClick={() =>
                              this.getexpertId(value.user_id, index)
                            }
                          >
                            Send Request
                          </button>
                        );
                      }
                    })}
                  </div>
                </Modal.Body>
              </Modal>
            </Row>
          ) : (
            <Skeleton count={17} height={250} width={220} />
          )}
        </Container>
        <div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default connection;
