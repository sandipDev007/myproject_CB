/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable eqeqeq */
import React from "react";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import LogHeader from "../../component/exheader";
import Footer from "../../component/exfooter";
import axios from "axios";
import { API_URL } from "../../component/url";
import swal from "sweetalert";

class qustionList extends React.Component {
  state = { open: false };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      relatedQues: [],
      questionset: [],
      id: ""
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
    body.append("user_id", localStorage.getItem("user_id"));
    body.append("offset", 1);
    axios({
      url: API_URL + "Questions/MyQuestions",
      method: "POST",
      data: body
    })
      .then(response => {
        console.log(response);

        if (response.data[0].Token == "N") {
          this.props.history.push("/expertblank");
        } else {
          this.props.history.push("/exquestionlist");
        }

        this.setState({
          questionset: response.data
        });
        this.setState({ isLoading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  };

  deleteQuestion = question_id => {
    console.log(question_id);
    let body = new FormData();
    body.append("question_id", question_id);
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: "warning",
      buttons: true,
      //dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
          axios({
            url: API_URL + "Questions/",
            method: "DELETE",
            data: body
          }).then(response => {
            swal("Question is deleted!");
            this.componentDidMount();
          });
        }
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
            <Col lg={9} className="pl-0">
              <div className="d-flex">
                <div className="centerbody quesbody">
                  <div className="innerans py-3 pl-4">
                    <h2 className="mb-1" style={{ color: "#174a77" }}>
                      Your Questions
                    </h2>

                    {this.state.questionset.map((value, index) => {
                      return (
                        <div className="ans-post d-flex justify-content-between align-items-center">
                          <h4 className="mb-0">{value.question}</h4>
                          <div className="a-cont skeep-question">
                            <ul className="list-inline list-unstyled d-flex justify-content-end mb-0">
                              <li>
                                <a
                                  href="#"
                                  className="d-flex align-items-center"
                                  onClick={() =>
                                    this.deleteQuestion(value.question_id)
                                  }
                                >
                                  <span className="text-muted">Delete</span>
                                  <img
                                    src={require("../../assest/images/trashr.png")}
                                    alt="pic"
                                    className="img-fluid mr-2"
                                    width="15px"
                                  />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      );
                    })}
                    {/* end of ans post */}
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={3} className="pr-lg-0"></Col>
          </Row>
        </Container>
        <div>
          <Footer />
        </div>
      </div>
    );
  }
}
export default qustionList;
