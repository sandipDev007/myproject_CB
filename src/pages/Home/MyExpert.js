/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./App.css";
import { Container, Row, Col, Media, Jumbotron, Button } from "react-bootstrap";
import LogHeader from "../../component/loginheader";
import Footer from "../../component/footer";
import $ from "jquery";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../../component/url";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";
import Home from "react-ionicons/lib/MdLocate";
import Tags from "react-ionicons/lib/MdPricetag";
import Skeleton from "react-loading-skeleton";
import ReadMoreReact from "read-more-react";

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
        console.log(error);
        this.setState({ isLoading: false });
      });

    await axios({
      url: API_URL + "myexperts",
      method: "POST",
      data: body
    })
      .then(response => {
        console.log(response.data);
        if (response.data[0].error == "N") {
          this.props.history.push("/myexpertBlank");
        } else {
          this.props.history.push("/MyExpert");
        }
        this.setState({
          paidExpertset: response.data
        });
        this.setState({ isLoading: false });
      })
      .catch(error => {
        console.log(error);
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
    console.log(uId);
    localStorage.setItem("userchatuId", uId);
    localStorage.setItem("userchatshower_id", Id);
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
        console.log(response.data);

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
              <div id="sidebar3">
                <div className="other-title">Other Links</div>
                <ul className="extra-link"></ul>

                <div className="right-ad">
                  <img
                    src={require("../../assest/images/become_expert.jpg")}
                  ></img>
                  <Link to="/BecomeExpert">
                    <Button className="btn btn-theme">Read More</Button>
                  </Link>
                </div>
              </div>
            </Col>

            <Col md={9}>
              <div className="rightuser pt-4">
                {this.state.isLoading == false ? (
                  <div>
                    {this.state.paidExpertset.map((item, index) => {
                      return (
                        <Jumbotron fluid className="py-4 px-4">
                          <Media>
                            <img
                              src={item.profileImage}
                              className="mr-3 img-fluid thumbnail"
                              style={{ Width: 60, height: 60, minWidth: 60 }}
                            />

                            <Media.Body>
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="clearfix">
                                  <h6 className="mb-1">
                                    <strong>{item.name}</strong>
                                  </h6>
                                  <span className="text-capitalize d-block text-dark">
                                    {" "}
                                    <Home
                                      style={{ width: 15, marginRight: 5 }}
                                      color="#666"
                                    />{" "}
                                    ante sollicitudin commodo
                                  </span>
                                </div>

                                <div className="d-flex">
                                  <Link to="/uChat">
                                    <Button
                                      variant="info"
                                      className="mr-3 px-4 py-1"
                                      onClick={() =>
                                        this.getuserId(item.user_id, item.id)
                                      }
                                    >
                                      Chat
                                    </Button>
                                  </Link>
                                  <Link to="/connectedprofile">
                                    <Button
                                      variant="dark"
                                      className="px-4 py-1"
                                      onClick={() =>
                                        this.getuserId(item.user_id, item.id)
                                      }
                                    >
                                      Info
                                    </Button>
                                  </Link>
                                </div>
                              </div>

                              <div className="d-flex mb-1">
                                <p className="text-secondary mb-0 mr-3">
                                  <strong className="text-dark mr-1">
                                    Transaction Id:
                                  </strong>{" "}
                                  {item.paymentID} 
                                </p>

                                <p className="text-secondary mb-0 mr-3">
                                  <strong className="text-dark mr-1">
                                    {" "}
                                    Payment Date:
                                  </strong>{" "}
                                  {item.date}
                                </p>
                              </div>

                              <div className="d-flex mb-1">
                                {/* <p className="text-secondary mb-0 mr-3">
                                  <strong className="text-dark mr-1">
                                    Package:
                                  </strong>{" "}
                                  {item.package}
                                </p> */}

                                <p className="text-secondary mb-0 mr-3">
                                  <strong className="text-dark mr-1">
                                    Price:
                                  </strong>{" "}
                                  {item.premium_package} {item.amount}
                                </p>
                              </div>

                              <p className="d-flex mb-1">
                                <strong className="text-dark mr-1">
                                  About:
                                </strong>{" "}
                                <ReadMoreReact
                                  text={item.about}
                                  min={10}
                                  ideal={280}
                                  max={500}
                                  readMoreText="read more"
                                />
                              </p>

                              <div className="mb-1 d-flex justify-content">
                                <small className="text-muted d-block mx-1">
                                  {" "}
                                  <Tags
                                    style={{ width: 15, marginRight: 5 }}
                                    color="#666"
                                  />
                                  {item.expertise}
                                </small>
                              </div>
                            </Media.Body>
                          </Media>
                        </Jumbotron>
                      );
                    })}
                  </div>
                ) : (
                  <Skeleton circle={true} count={10} height={255} />
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

$("menubtn").click(function() {
  $(".left-sidebar").toggleClass("sidesm");
});

export default App;
