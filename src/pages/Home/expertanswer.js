/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import React from "react";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import LogHeader from "../../component/exheader";
import Footer from "../../component/exfooter";
import axios from "axios";
import { API_URL } from "../../component/url";

class expertAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedQues: [],
      questionSet: [],
      answer: "",
      answerset: []
    };
  }

  handleAnswer = event => {
    const re = /^\S*$/;
    const re1 = /^[^.\s]/;
    if (re.test(event.target.value) || re1.test(event.target.value)) {
    this.setState({
      answer: event.target.value
    });
  }
  };

  userSubmit = async Qid => {
    const obj = {
      Answers: this.state.answer,
      user_id: localStorage.getItem("user_id"),
      question_id: Qid
    };

    var notes1 = this.refs.notes1;
    notes1.value = " ";

    this.setState({ isLoading: true });
    await axios
      .post(API_URL + "Answer", obj, {
        header: {
          "content-Type": "application/json"
        }
      })
      .then(response => {
        console.log(response);
        this.getAnswer(Qid);
        this.setState({ isLoading: false });
      })
      .catch(error => {
        this.setState({ isLoading: false });
      });
  };

  sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

  componentDidMount = async () => {
    if (
      localStorage.getItem("token") == null &&
      localStorage.getItem("user_id") == null
    ) {
      this.props.history.push("/");
    }

    function storageChange (event) {
      if(event.key === 'logged_in') {
          window.location.reload(false);

        
      }
  }
  window.addEventListener('storage', storageChange, false)

    this.setState({ isLoading: true });
    let body1 = new FormData();
    body1.append("user_id", localStorage.getItem("user_id"));

    axios({
      url: API_URL + "Questions/expertQuestion",
      method: "POST",
      data: body1
    })
      .then(response => {
        console.log(response);

        if (response.data[0].msg == "N") {
          this.props.history.push("/expertanswerblank");
        } else {
          this.props.history.push("/expertanswer");
        }

        this.setState({
          questionSet: response.data
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
      answers: this.state.answer,
      user_id: localStorage.getItem("user_id"),
      question_id: localStorage.getItem("qId")
    };

    var notes = this.refs.notes;
    notes.value = " ";

    this.setState({ isLoading: true });
    await axios
      .post(API_URL + "Answer", obj, {
        header: {
          "content-Type": "application/json"
        }
      })
      .then(response => {
        localStorage.setItem("senderId", response.data.user_id);
        this.componentDidMount();
        this.setState({
          message: response.data.msg
        });
      })
      .catch(error => {
        this.setState({ isLoading: false });
      });
  };

  getquestionId = qId => {
    localStorage.setItem("qId", qId);
    this.userSubmit();
  };

  render() {
    return (
      <div className="apps-main">
        <div>
          <LogHeader />
        </div>
        <Container fluid className="mainbody">
          <Row>
            <Col lg={9} className="pl-0">
              <div className="d-flex">
                <div className="centerbody quesbody">
                  <div className="innerans py-3 pl-4">
                    <h2 className="mb-1" style={{ color: "#174a77" }}>
                      Questions For You
                    </h2>

                    {this.state.questionSet.map((value, index) => {
                      if (index < 9)
                        return (
                          <div className="ans-post">
                            <h4>{value.question}</h4>

                            {value.answers
                              ? value.answers.map((data, index) => {
                                  return (
                                    <div className="pb-2 border-btn mb-4">
                                      <p className="mb-0">{data.answer}</p>
                                    </div>
                                  );
                                })
                              : null}

                            <div className="form-group d-flex justify-content-between align-items-center border rounded bg-white">
                              <input
                                ref="notes"
                                id="notes"
                                type="text"
                                className="form-control form-control-lg border-0"
                                placeholder="Post Your Answer"
                                onChange={this.handleAnswer}
                              />
                              <button
                                className="btn btn-link post-btn"
                                type="submit"
                                value="submit"
                                disabled = {!this.state.answer}
                                onClick={() =>
                                  this.getquestionId(value.question_id)
                                }
                              >
                                Submit
                              </button>
                            </div>

                            <div className="a-cont d-flex justify-content-between">
                              <div className="likem border-0 p-0">
                                <ul className="list-inline list-unstyled d-flex justify-content-end mb-0"></ul>
                              </div>
                            </div>
                          </div>
                        );
                    })}
                    {/* end of ans post */}
                  </div>
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
export default expertAnswer;
