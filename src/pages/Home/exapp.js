/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable array-callback-return */
import React from "react";
import "./App.css";
import { Container, Row, Col, Accordion, Card } from "react-bootstrap";
import LogHeader from "../../component/exheader";
import Footer from "../../component/exfooter";
import $ from "jquery";
import axios from "axios";
import Autocomplete from "react-autocomplete";
import { Link } from "react-router-dom";
import { API_URL } from "../../component/url";
// import Like from "./like";
import { ToastContainer, toast } from "react-toastify";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";
// import ScrollArea from "react-scrollbar";
import Study from "react-ionicons/lib/MdMedal";
import Home from "react-ionicons/lib/IosSchool";
import ReadMoreReact from "read-more-react";
import Post from "react-ionicons/lib/MdSend";
import Experties from "react-ionicons/lib/MdBookmark";


class App extends React.Component {
  notify = () => {
    toast.info("Your question has been submitted successfully..!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2200
    });
  };

  notify1 = () => {
    toast.error("Abuse word!!!!!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2200
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      Question: "",
      isLoading: false,
      on: false,
      value: "",
      autocompleteData: [],
      questionset: [],
      answerset: [],
      tagData: "",
      tagList: [],
      expertset: [],
      likeset: "",
      QIndex: 0,
      QIndex1: 10
    };

    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.getItemValue = this.getItemValue.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  incrementMe = () => {
    let newCount = this.state.count + 1;
    this.setState({
      count: newCount,
      isButtonDisabled: true
    });
  };

  onChange(event) {
    console.log(event.target.value);
    const re = /^\S*$/;
    const re1 = /^[^.\s]/;
    if (re.test(event.target.value) || re1.test(event.target.value)) {
      this.setState({
        value: event.target.value
      });
      this.setState({
        Question: event.target.value
      });
    }
    // this.userSearch();
  }

  renderItem(item, isHighlighted) {
    var data = item.question.replace(
      this.state.value,
      this.state.value.toUpperCase()
    );

    return (
      <div style={{ background: isHighlighted ? "lightgray" : "white" }}>
        {data}
      </div>
    );
  }
  onSelect(val) {
    localStorage.setItem("qId", val);
    window.open("/exAnswerpage", "_blank");

    // this.props.history.push("/exAnswerpage");
  }

  getItemValue(item) {
    return `${item.question_id}`;
  }

  handleuserNameChange = event => { };
  enterPressed = event => {
    if (event.key === "Enter") {
      this.onSelect();
    }
  };
  enterPressed2 = event => {
    if (event.key === "Enter") {
      this.both();
    }
    else if (event.key === " ") {
      console.log("Space press");
      this.userSearch();
    }
  };

  both = async () => {
    this.userSubmit();
  };

  getNext = async () => {
    console.log("it's works");
    let body = new FormData();
    body.append("user_id", localStorage.getItem("user_id"));
    body.append("Flag", localStorage.getItem("Flag"));
    await axios({
      url: API_URL + "Questions/feedQuestions",
      method: "POST",
      data: body
    })
      .then(response => {
        console.log(response.data.Answers);
        console.log(response.data);
        localStorage.setItem("question", response.data);
        this.setState({
          questionset: response.data,
          answerset: response.data
        });
        this.setState({ isLoading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  };

  userSubmit = async () => {
    const obj = {
      Question: this.state.Question,
      user_id: localStorage.getItem("user_id")
    };

    await axios
      .post(API_URL + "Questions", obj, {
        header: {
          "content-Type": "application/json"
        }
      })
      .then(response => {
        console.log(response);
        this.notify();

        this.setState({ isLoading: false });
      })

      .catch(error => {
        this.notify1();

        this.setState({ isLoading: false });
      });
    this.setState({ Question: "" });
    this.setState({ value: "" });
  };

  userSearch = async () => {
    const obj = {
      Question: this.state.Question,
      user_id: localStorage.getItem("user_id")
    };

    this.setState({ isLoading: true });
    await axios
      .post(API_URL + "Questions/similarQuestions", obj, {
        header: {
          "content-Type": "application/json"
        }
      })
      .then(response => {
        this.setState({
          autocompleteData: response.data
        });

        this.setState({ isLoading: true });
      })
      .catch(error => {
        this.setState({ isLoading: true });
      });
  };

  componentDidMount = async () => {
    if (
      localStorage.getItem("token") == null &&
      localStorage.getItem("user_id") == null
    ) {
      this.props.history.push("/");
    }

    function storageChange(event) {
      if (event.key === "logged_in") {
        window.location.reload(false);
      }
    }
    window.addEventListener("storage", storageChange, false);

    let body = new FormData();
    let taglistbody = new FormData();
    taglistbody.append("user_id", localStorage.getItem("user_id"));
    body.append("user_id", localStorage.getItem("user_id"));
    body.append("Flag", localStorage.getItem("flag"));

    await axios({
      url: API_URL + "Questions/feedQuestions",
      method: "POST",
      data: body
    })
      .then(response => {
        console.log(response.data);

        axios({
          url: API_URL + "feedexpertlist",
          method: "POST",
          data: taglistbody
        })
          .then(response => {
            console.log(response.data);

            this.setState({
              expertset: response.data
                .sort(function (a, b) {
                  if (a.avg_rating > b.avg_rating) return -1;
                  else if (a.avg_rating > b.avg_rating) return 1;
                  return 0;
                })
            });
            this.setState({ isLoading: true });
          })
          .catch(error => {
            console.log(error);
            this.setState({ isLoading: false });
          });
        this.setState({
          questionset: response.data.sort(function (a, b) {
            if (a.views > b.views) return -1;
            return 0;
          }),
          answerset: response.data
        });
        this.setState({ isLoading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  };

  getquestionId = (qId, aId) => {
    localStorage.setItem("qId", qId);
    localStorage.setItem("aId", aId);
  };

  getuserId = (uId, Id) => {
    localStorage.setItem("uId", uId);
    localStorage.setItem("shower_id", Id);
  };

  loadMore = () => {
    this.setState({
      QIndex: this.state.QIndex + 10
    });
  };

  loadPrevious = () => {
    this.setState({
      QIndex: this.state.QIndex - 10
    });
  };

  loadMore1 = () => {
    this.setState({
      QIndex1: this.state.QIndex1 + 10
    });
  };

  getexpertId = async (user_id, row_id) => {
    localStorage.setItem("uId", user_id);
    localStorage.setItem("shower_id", row_id);
  };

  render() {
    return (
      <div className="apps-main">
        <div>
          <LogHeader />
        </div>
        <Container fluid className="mainbody">
          <Row>
            <Col lg={9} className="pl-lg-0 pr-lg-0">
              <div className="d-flex">
                <div className="left-sidebar change-width col-lg-4" id="sidebar">
                  <div className="toppan d-flex justify-content-between align-items-center py-2 px-4">
                    <h5 style={{ color: "#03639d" }}>List of Experts</h5>
                  </div>
                  {this.state.expertset.map((value, index) => {
                    if (index < 3 && value.user_id != localStorage.getItem("user_id"))
                      return (
                        <div className="thumbbody active">
                          <Link
                            to="/expertviewProfile"
                            onClick={() =>
                              this.getuserId(value.user_id, value.id)
                            }
                          >
                            <span className="thumbnail">
                              <img src={value.user_image} />
                            </span>
                          </Link>
                          <div className="contentbox clearfix w-100">
                            <Link
                              to="/expertviewProfile"
                              onClick={() =>
                                this.getuserId(value.user_id, value.id)
                              }
                            >
                              <p className="mb-0">
                                <strong>{value.expert_Name}</strong>
                              </p>

                              {/* {this.state.expertset.map((value, index) => {
                                if (value.department != null && index < 1)
                                  return ( */}
                              <small className="d-block text-capitalized">
                                <Study
                                  color="#666"
                                  style={{ width: 13, marginRight: 3 }}
                                />
                                {value.department}
                              </small>
                              {/* );
                              })}
                              {this.state.expertset.map((value, index) => {
                                if (value.expertise != null && index < 1)
                                  return ( */}
                              <small className="d-block text-capitalized">
                                <Experties
                                  color="#666"
                                  style={{ width: 13, marginRight: 3 }}
                                />
                                {value.expertise}
                              </small>
                              {/* );
                              })}
                              {this.state.expertset.map((value, index) => {
                                if (value.collegeName != null && index < 1)
                                  return ( */}
                              <small className="d-block text-capitalized">
                                <Home
                                  color="#666"
                                  style={{ width: 13, marginRight: 3 }}
                                />
                                {value.collegeName}
                              </small>
                              {/* );
                              })} */}
                            </Link>
                          </div>
                        </div>
                      );
                  })}
                  <Link to="/mentorExpertlist">
                    <button className="btn btn-outline btn-fill">Discover More</button>
                  </Link>
                </div>
                <div className="centerbody">
                  <div className="innerques py-3 pl-4">
                    <div className="shadow-sm py-2 px-3 mb-3 bg-white">
                      <h1 className="border-bottom pb-2">Post Your Question</h1>
                      <div className="d-flex align-items-center autoform">
                        <div
                          className="mt-4, input-box w-100 autocomplete"
                          style={{ position: "static" }}
                          onKeyPress={this.enterPressed2}
                        >
                          <Autocomplete
                            inputProps={{
                              placeholder: "Post or Find your Question"
                            }}
                            className="form-control"
                            getItemValue={this.getItemValue}
                            items={this.state.autocompleteData}
                            renderItem={this.renderItem}
                            value={this.state.value}
                            onChange={this.onChange}
                            onSelect={this.onSelect}
                            onKeyPress={this.enterPressed}
                          />
                        </div>

                        <button
                          className="searchbtn"
                          type="submit"
                          disabled={!this.state.Question}
                          onClick={this.both}
                        >
                          <Post />
                        </button>
                        <ToastContainer />
                      </div>
                    </div>
                    <h3>Questions & Answers</h3>

                    <Accordion defaultActiveKey="0">
                      {this.state.questionset.map((value, index) => {
                        if (
                          this.state.QIndex < index &&
                          index < this.state.QIndex + 9
                        ) {
                          return (
                            <Card className="main-ques">
                              <span className="tviews">
                                <span className="d-flex align-items-center my-viewnoti">
                                  <img
                                    src={require("../../assest/images/view-icon.png")}
                                    className="mr-1"
                                  />
                                  <p className="m-0">{value.views}</p>
                                </span>

                                <span
                                  className="d-flex align-items-center my-comnticn"
                                  to="/exAnswerpage"
                                  onClick={() =>
                                    this.getquestionId(
                                      value.question_id,
                                      value.answers[0].id
                                    )
                                  }
                                >
                                  <Link to="/exAnswerpage" target="_blank">
                                    <img
                                      src={require("../../assest/images/chat-icn.png")}
                                      className="mr-1"
                                    />
                                  </Link>
                                  <p className="m-0">{value.total_answers}</p>
                                </span>
                              </span>

                              <Accordion.Toggle
                                as={Card.Header}
                                eventKey={index}
                                style={{ cursor: "pointer" }}
                              >
                                {value.question}
                              </Accordion.Toggle>
                              <Accordion.Collapse eventKey={index}>
                                <Card.Body className="pl-0">
                                  <div
                                    className="d-flex"
                                    style={{ alignContent: "left" }}
                                  >
                                    <span className="thumbnail">
                                      <Link to="/expertviewProfile"

                                        onClick={(uId, shower_id) =>
                                          this.getexpertId(
                                            value.answers[0].user_id,
                                            value.answers[0].row_id
                                          )
                                        }
                                      >
                                        <img src={value.answers[0].user_image} />
                                      </Link>
                                    </span>
                                    <div className="a-cont">
                                      <h6>
                                        <Link to="/expertviewProfile">
                                          <p
                                            onClick={(uId, shower_id) =>
                                              this.getexpertId(
                                                value.answers[0].user_id,
                                                value.answers[0].row_id
                                              )
                                            }
                                          >
                                            <b>{value.answers[0].name}</b>
                                          </p>
                                        </Link>
                                      </h6>
                                      <p>
                                        <Link
                                          to="/exAnswerpage"
                                          target="_blank"
                                        >
                                          <p
                                            onClick={() =>
                                              this.getquestionId(
                                                value.question_id,
                                                value.answers[0].id
                                              )
                                            }
                                          >
                                            <ReadMoreReact
                                              text={value.answers[0].answer}
                                              min={10}
                                              ideal={150}
                                              max={500}
                                              readMoreText="read more"
                                            />
                                          </p>
                                        </Link>
                                      </p>
                                    </div>
                                  </div>
                                  <div className="likem">
                                    <ul className="list-inline list-unstyled d-flex justify-content-end mb-0 homepage-like">
                                      <li>
                                        {/* <img src={require("../../assest/images/like.png")} /> */}
                                        {value.answers[0].like} Likes
                                      </li>
                                    </ul>
                                  </div>
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>
                          );
                        } else {
                        }
                      })}
                    </Accordion>

                    <button
                      className="btn btn-outline fr bg-btn"
                      onClick={this.loadMore}
                      disabled={this.state.QIndex == 50}
                    >
                      Next
                    </button>
                    <button
                      className="btn btn-outline fl bg-btn"
                      onClick={this.loadPrevious}
                      disabled={!this.state.QIndex}
                    >
                      Previous
                    </button>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={3} className="pr-lg-0">
              <div className="rightsidebar" id="sidebar">
                <div className="toppan py-3 px-4">
                  <h2>Similar questions</h2>
                </div>
                <div className="clearfix">
                  {this.state.questionset.map((value, index) => {
                    if (
                      this.state.QIndex1 < index &&
                      index < this.state.QIndex1 + 6
                    )
                      return (
                        <div className="ques">
                          <Link
                            className="text-decoration-none text-dark"
                            to="/exAnswerpage"
                            target="_blank"
                            onClick={() =>
                              this.getquestionId(value.question_id)
                            }
                          >
                            <div className="d-flex">
                              <ReadMoreReact
                                text={value.question}
                                min={30}
                                ideal={80}
                                max={500}
                                readMoreText="read more"
                              />
                            </div>
                          </Link>
                        </div>
                      );
                  })}
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

$("menubtn").click(function () {
  $(".left-sidebar").toggleClass("sidesm");
});

export default App;
