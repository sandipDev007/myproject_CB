/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./App.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import LogHeader from "../../component/loginheader";
import Footer from "../../component/footer";
import $ from "jquery";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../../component/url";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expertset: [],
      paidExpertset: [],
      isLoading: false
    };
  }

  componentDidMount = async () => {
    if (
      localStorage.getItem("token") == null &&
      localStorage.getItem("user_id") == null
    ) {
      this.props.history.push("/urlblocker");
    }
    let taglistbody = new FormData();
    let body = new FormData();

    taglistbody.append("receiver_id", localStorage.getItem("user_id"));
    taglistbody.append("user_type", "");

    body.append("user_id", localStorage.getItem("user_id"));
    this.setState({ isLoading: true });

    await axios({
      url: API_URL + "myConnections",
      method: "POST",
      data: taglistbody
    })
      .then(response => {
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
        this.setState({ isLoading: false });
      });

    await axios({
      url: API_URL + "myexperts",
      method: "POST",
      data: body
    })
      .then(response => {
        this.setState({
          paidExpertset: response.data
        });
        this.setState({ isLoading: false });
      })
      .catch(error => {
        this.setState({ isLoading: false });
      });

    let body1 = new FormData();
    body1.append("user_id", localStorage.getItem("user_id"));

    await axios({
      url: API_URL + "imageGet",
      method: "POST",
      data: body1
    }).then(response => {
      this.setState({
        pic: response.data
      });
    });
  };
  getuserId = (uId, Id) => {
    localStorage.setItem("uId", uId);
    localStorage.setItem("shower_id", Id);
    this.chatRoom();
  };

  chatRoom = async () => {
    const obj = {
      sender_id: localStorage.getItem("user_id"),
      receiver_id: localStorage.getItem("uId")
    };

    this.setState({ isLoading: true });
    await axios
      .post(API_URL + "chat/getRoomId", obj, {
        header: {
          "content-Type": "application/json"
        }
      })

      .then(response => {
        localStorage.setItem("roomId", response.data.room_id);

        this.setState({
          room: response.data
        });

        this.setState({ isLoading: false });
      })
      .catch(error => {
        this.setState({ isLoading: false });
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
            <Col md={3}>
              <ul className="extra-link"></ul>

              <div className="right-ad">
                <img
                  src={require("../../assest/images/become_expert.jpg")}
                ></img>
                <Link to="/BecomeExpert">
                  <Button className="btn btn-theme">Read More</Button>
                </Link>
              </div>
            </Col>

            <Col md={9}>
              <div className="rightuser pt-4">
                <Col lg={12} className="pl-0">
                  <div className="d-flex">
                    <div className="centerbody quesbody">
                      <div className="innerblank py-5 col-md-6 mx-auto">
                        <img
                          src={require("../../assest/images/blank.png")}
                          alt="blankimage"
                          className="img-fluid"
                        />
                        <div className="caption">
                          <div className="text-center">
                            <h1 className="text-danger">
                              <strong>Sorry! you have no hired mentors</strong>
                            </h1>
                            <h3 className="text-dark">
                              Hire new mentor from this{" "}
                              <a href="/expertlist">section</a>
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
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
