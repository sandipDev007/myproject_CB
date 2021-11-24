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
      isLoading: false,
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

    body1.append("receiver_id", localStorage.getItem("user_id"));
    body1.append("user_type", "");

    this.setState({ isLoading: true });

    await axios({
      url: API_URL + "myConnections",
      method: "POST",
      data: body1
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
      })

      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
      });

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
  };

  getuserId = (uId, Id) => {
    console.log(uId);
    localStorage.setItem("uId", uId);
    localStorage.setItem("shower_id", Id);
  };

  render() {
    return (
      <div className="apps-main">
        <div>
          <LogHeader />
        </div>
        <Container fluid className="mainbody">
          <Row>
            <Col md={9}>
              <div className="page-titl mt-3">
                <h3 strong>Find & Hire your Connections as your Mentor</h3>
                <p>
                  It's easy, fast and affordable to hire the most qualified
                  mentors on ConnectBud. Work with some of the best and the most
                  accomplished minds of the education industry.
                </p>
              </div>

              <img
                src={require("../../assest/images/nodatafound.jpg")}
                alt="blankimage"
                className="img-fluid"
              />
            </Col>

            <Col md={3} className="pl-md-0">
              <div className="left-sidebar" id="sidebar2">
                <div className="other-title">Other Links</div>
                <ul className="extra-link">
                  <li>
                    <a href="/MyExpert">Hired Mentors</a>
                  </li>
                </ul>

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
