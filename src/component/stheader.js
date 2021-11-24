
import React from "react";
import "./header.css";
import { Container, Dropdown, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../component/url";

class LogHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: [],
      pic: []
    };
  }
  componentWillMount() {
    const body = {
      user_id: localStorage.getItem("user_id")
    };
      .post(API_URL + "getNotification", body)

      .then(async res => {
        await this.setState({
          notification: [...this.state.notification, ...res.data]
        });
        console.log(this.state.notification);
      });
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });

    let body = new FormData();

    body.append("user_id", localStorage.getItem("user_id"));

    await axios({
      url: API_URL + "imageGet",
      method: "POST",
      data: body
    })
      .then(response => {
        console.log(response.data.Answers);
        console.log(response.data);
        localStorage.setItem("question", response.data);
        this.setState({
          pic: response.data
        });
        this.setState({ isLoading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  };

  getquestionId = (qId) => {
    console.log(qId);
    localStorage.setItem("qId", qId);
  };

  render() {
    return (
      <div className="header ">
        <Navbar collapseOnSelect expand="lg" bg="none">
          <Navbar.Brand className="brand">
            <Link to="/App">
              <img
                src={require("../assest/images/logo.png")}
                className="img-fluid"
                alt="logo"
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Link to="/exquestionlist">
                <Nav.Link href="/exquestionlist">My questions</Nav.Link>
              </Link>

              <Link to="/expertanswer">
                <Nav.Link href="/expertanswer">Answers</Nav.Link>
              </Link>
              <Dropdown>
                <Dropdown.Toggle className="white-bg mr-2" id="dropdown-basic">
                  Notifications
                  <small className="d-inline-block text-white-50 mr-3 ml-1"></small>
                </Dropdown.Toggle>
                <Dropdown.Menu className="notificationmain"      >
                  <ScrollArea className="n-scroll">
                    {this.state.notification.map((item, index) => {
                      if (index < 7)
                        return (
                          <div className="notificationpan border-bottom mb-2"

                            value={item.receiver_user_id}
                          >
                            <Link to="/exAnswerpage" onClick={() =>
                              this.getquestionId(item.question_id)
                            }>
                              <img
                                src={item.notification_image}
                                alt=" "
                                className="thumbnail sm"
                                style={{ display: "inline" }}
                              />
                              <p className="mb-0 ">{item.notification_message}
                                <small className="text-muted d-block text-left font-weight-light"> {item.notification_time} </small>
                              </p>
                            </Link>

                          </div>
                        );
                    })}
                  </ScrollArea>                  
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
          <Nav className="profiledropdown">
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">
                {this.state.pic.map((value, index) => {
                  return (
                    <span className="white-bg mr-2">
                      <img src={value.user_image} />
                    </span>
                  );
                })}
                {localStorage.getItem("username")}
                <small className="d-inline-block text-white-50 mr-3 ml-1"></small>{" "}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="">Action</Dropdown.Item>
                <Dropdown.Item href="">Another action</Dropdown.Item>
                <Dropdown.Item href="/studentProfile">
                  Edit Profile
                </Dropdown.Item>
                <Dropdown.Item href="/">
                  <span> {() => localStorage.clear()} </span>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default LogHeader;