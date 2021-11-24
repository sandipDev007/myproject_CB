/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./App.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import LogHeader from "../../component/exheader";
import Footer from "../../component/exfooter";
import $ from "jquery";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../../component/url";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userset: [],
      paidUserset: [],
      expertset: [],
      isLoading: false
    };
  }

  sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

  componentDidMount = async () => {
    if (
      localStorage.getItem("token") == null &&
      localStorage.getItem("user_id") == null
    ) {
      this.props.history.push("/urlblocker");
    }

    let taglistbody = new FormData();
    let body = new FormData();
    let body1 = new FormData();
    body1.append("user_id", localStorage.getItem("user_id"));

    taglistbody.append("receiver_id", localStorage.getItem("user_id"));
    taglistbody.append("user_type", "expert");

    body.append("user_id", localStorage.getItem("user_id"));
    this.setState({ isLoading: true });

    await axios({
      url: API_URL + "myConnections",
      method: "POST",
      data: taglistbody
    })
      .then(response => {
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
        axios({
          url: API_URL + "myUsers",
          method: "POST",
          data: body
        })
          .then(response => {
            console.log(response.data);

            this.setState({
              paidUserset: response.data
            });
            this.setState({ isLoading: false });
          })
          .catch(error => {
            console.log(error);
            this.setState({ isLoading: false });
          });
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
      });

    await this.sleep(2000);

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
            <Col md={3}>
              <div className="other-title">Other Links</div>
              <ul className="extra-link">
                <li>
                  <a href="/userRequest">Pending Request</a>
                </li>
              </ul>

              <div className="right-ad">
                <img src={require("../../assest/images/member.jpg")}></img>
                <Link to="/ExpertProfile">
                  <Button className="btn btn-theme">Read More</Button>
                </Link>
              </div>
            </Col>

            <Col md={9}>
              <div className="rightuser pt-4 ml-n5">
                <Col lg={12} className="pl-0">
                  <div className="d-flex">
                    <div className="centerbody quesbody">
                      <div className="innerblank py-5 col-md-6 mx-auto">
                        <img
                          src={require("../../assest/images/norecords.jpeg")}
                          alt="blankimage"
                          className="img-fluid"
                        />
                        <div className="caption">
                          <div className="text-center"></div>
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
