/* eslint-disable jsx-a11y/alt-text */
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
import Home from "react-ionicons/lib/MdLocate";
import Tags from "react-ionicons/lib/MdPricetag";
import Skeleton from "react-loading-skeleton";
import ReadMoreReact from "read-more-react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //userset: [],
      paidUserset: [],
     // expertset: [],
      isLoading: false
    };
  }

  // sleep = milliseconds => {
  //   return new Promise(resolve => setTimeout(resolve, milliseconds));
  // };

  componentDidMount = async () => {
    if (
      localStorage.getItem("token") == null &&
      localStorage.getItem("user_id") == null
    ) {
      this.props.history.push("/urlblocker");
    }

    //let taglistbody = new FormData();
    let body = new FormData();
    // let body1 = new FormData();
    // body1.append("user_id", localStorage.getItem("user_id"));

    // taglistbody.append("receiver_id", localStorage.getItem("user_id"));
    // taglistbody.append("user_type", "expert");

    body.append("user_id", localStorage.getItem("user_id"));
    this.setState({ isLoading: true });

    // await axios({
    //   url: API_URL + "myConnections",
    //   method: "POST",
    //   data: taglistbody
    // })
    //   .then(response => {
    //     console.log(response.data);
    //     localStorage.setItem("question", response.data);
    //     this.setState({
    //       expertset: response.data.sort(function(a, b) {
    //         if (a.expert_Name < b.expert_Name) return -1;
    //         else if (a.expert_Name > b.expert_Name) return 1;
    //         return 0;
    //       })
    //     });
        this.setState({ isLoading: false });
       await axios({
          url: API_URL + "myUsers",
          method: "POST",
          data: body
        })
          .then(response => {
            if (response.data[0].error == "N") {
              this.props.history.push("/myuserBlank");
            } else {
              this.props.history.push("/MyUser");
            }
            console.log(response.data);

            this.setState({
              paidUserset: response.data
            });
             this.setState({ isLoading: false });
          })
          .catch(error => {
           this.setState({ isLoading: false });
          });
      // })
      // .catch(error => {
      //   this.setState({ isLoading: false });
      // });

    // await this.sleep(2000);
  };

  userPayment = async () => {
    const obj = {
      expert_id: localStorage.getItem("user_id"),
      user_id: localStorage.getItem("uId")
    };

    this.setState({ isLoading: true });
    await axios
      .post(API_URL + "redeemConfirmation", obj, {
        header: {
          "content-Type": "application/json"
        }
      })
      .then(response => {
        this.setState({ isLoading: false });
      })
      .catch(error => {
        this.setState({ isLoading: false });
      });
  };

  getuserId = (uId, Id) => {
    console.log(uId);
    localStorage.setItem("uId", uId);
    localStorage.setItem("shower_id", Id);
  };

  getPayment = uId => {
    console.log(uId);
    localStorage.setItem("uId", uId);
    this.userPayment();
  };

  render() {
    return (
      <div className="apps-main">
        <div>
          <LogHeader />
        </div>
        <Container fluid className="mainbody">
          <Row>
            <Col lg={3}>
              <div className="user-leftpanel">
              <div className="other-title">Other Links</div>
              <ul className="extra-link">
                <li>
                  <a href="/userRequest">Pending Request</a>
                </li>
              </ul>

              <div className="right-ad">
                <img src={require("../../assest/images/member.jpg")}></img>
                <Button className="btn btn-theme">Read More</Button>
              </div>
              </div>
            </Col>

            <Col lg={9}>
              <div className="rightuser pt-2">
                <div className="justify-content-end pb-0 page-titl">
                  <h3>Redeem Your Money</h3>
                  <p>
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from{" "}
                  </p>
                </div>
                {this.state.isLoading == false ? (
                  <div>
                    {this.state.paidUserset.map((item, index) => {
                      return (
                        <Jumbotron fluid className="py-4 px-4 myuser-list">
                          <Media>
                            <img
                              src={item.profileImage}
                              className="mr-1 img-fluid thumbnail"
                              style={{ Width: 60, height: 60, minWidth: 60 }}
                            />

                            <Media.Body>
                              <div className="d-flex justify-content-between align-items-center mb-4">
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
                                    {item.country}
                                  </span>
                                </div>

                                <div className="d-flex">
                                  <Link to="/chat">
                                    <Button
                                      variant="info"
                                      className="mr-1 px-4 py-1"
                                      onClick={() =>
                                        this.getuserId(item.user_id, item.id)
                                      }
                                    >
                                      Chat
                                    </Button>
                                  </Link>
                                  <Link to="/userviewProfile">
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
                                  <Button
                                    variant="success"
                                    className="ml-1 py-1"
                                    onClick={() =>
                                      this.getPayment(item.user_id)
                                    }
                                  >
                                    Request <span className="pl-1">Money</span>
                                  </Button>
                                </div>
                              </div>

                              <div className="d-flex mb-1">
                                <p className="text-secondary mb-0 mr-1">
                                  <strong className="text-dark mr-1">
                                    Department:
                                  </strong>{" "}
                                  {item.department}
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
                                  {item.interests}
                                </small>
                              </div>
                            </Media.Body>
                          </Media>
                        </Jumbotron>
                      );
                    })}
                  </div>
                ) : (
                  <Skeleton count={1} height={255} />
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
