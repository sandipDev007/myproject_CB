/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./header.css";
import { Container, Dropdown, Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../component/url";
import ScrollArea from "react-scrollbar";
import Notifiy from "react-ionicons/lib/MdNotifications";
import Users from "react-ionicons/lib/MdContacts";
import Expert from "react-ionicons/lib/MdContact";
import Chat from "react-ionicons/lib/MdChatboxes";
import $ from "jquery";
import openSocket from "socket.io-client";
import Autocomplete from "react-autocomplete";
import swal from "sweetalert";

const socket = openSocket("https://socket.connectbud.com/");

class LogHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: [],
      pic: [],
      status: [],
      value: "",
      autocompleteData: [],
      list: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.getItemValue = this.getItemValue.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  onChange(event) {
    const re = /^\S*$/;
    const re1 = /^[^.\s]/;
    if (re.test(event.target.value) || re1.test(event.target.value)) {
      this.setState({
        value: event.target.value
      });
      this.setState({
        list: event.target.value
      });
    }
    this.userSearch();
  }

  renderItem(item, isHighlighted) {
    var data = item.expert_name.replace(
      this.state.value,
      this.state.value.toUpperCase()
    );

    return (
      <div style={{ background: isHighlighted ? "lightgray" : "white" }}>
        <img className="drop-img2" src={item.expert_image} alt={""} />
        <p>
          {data} <span>{item.institute}</span>
        </p>
      </div>
    );
  }
  onSelect(item, value) {
    console.log(value);
    if (value.status == "connected") {
      localStorage.setItem("userchatuId", value.user_id);
      localStorage.setItem("userchatshower_id", value.row_id);
      window.open("/connectedprofile", "_self");
    } else {
      localStorage.setItem("uId", value.user_id);
      localStorage.setItem("shower_id", value.row_id);
      window.open("/viewProfile", "_self");
    }
  }

  getItemValue(item) {
    return `${item.expert_name}`;
  }

  userSearch = async () => {
    const obj = {
      expert: this.state.list,
      user_id: localStorage.getItem("user_id")
    };
    await axios
      .post(API_URL + "searchExperts", obj, {
        header: {
          "content-Type": "application/json"
        }
      })
      .then(response => {
        this.setState({
          autocompleteData: response.data
        });
      });
  };

  both = async () => {
    const body = {
      user_id: localStorage.getItem("user_id")
    };
    axios
      .post(API_URL + "getNotification", body)

      .then(async res => {
        this.notificationStatus();
        await this.setState({
          // notification: [...this.state.notification, ...res.data]
          notification: res.data
        });
      });
    socket.on("show_notification" + localStorage.getItem("senderId"), function(
      notify
    ) {
      console.log(notify);
      var chatbody1 = document.getElementById("chatbody1");
      var originalContent = chatbody1.innerHTML;
      var textnode =
        '<div class="ch-msg ch-right d-flex align-items-center">' +
        "<p>" +
        notify +
        "</p>" +
        "</div>";

      chatbody1.innerHTML = originalContent + textnode;
    });
    this.setState({ isLoading: true });
  };

  componentDidMount = async () => {
    this.notificationStatus();

    let body1 = new FormData();

    body1.append("user_id", localStorage.getItem("user_id"));

    await axios({
      url: API_URL + "imageGet",
      method: "POST",
      data: body1
    })
      .then(response => {
        console.log(response.data[0].id);
        localStorage.setItem("Id", response.data[0].id);
        localStorage.setItem("expertType", response.data[0].expert_type);
        localStorage.setItem("flag", response.data[0].Flag);

        if (
          response.data[0].expert_type == "C" &&
          localStorage.getItem("flag") == "Y"
        ) {
          console.log("condition called.");
          window.open("/successfulverifyExpert", "_self");
        }

        this.setState({
          pic: response.data
        });
        this.setState({ isLoading: false });
      })
      .catch(error => {
        console.log(error);

        this.setState({ isLoading: false });
      });
    this.getMessage();
  };

  getMessage() {
    socket.on(
      "room" +
        localStorage.getItem("user_id") +
        "_" +
        localStorage.getItem("userchatuId"),
      function(ping) {
        console.log(ping);
        $("#badge").addClass("badge2-success ondot");
      }
    );
  }

  removeBadge = () => {
    $("#badge").removeClass("badge2-success ondot");
  };

  notificationStatus = async () => {
    let body = new FormData();
    body.append("user_id", localStorage.getItem("user_id"));

    await axios({
      url: API_URL + "notificationStatus",
      method: "POST",
      data: body
    })
      .then(response => {
        console.log(response.data[0].id);
        this.setState({
          status: response.data
        });
        this.setState({ isLoading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  };

  getquestionId = qId => {
    console.log(qId);
    localStorage.setItem("qId", qId);
  };

  getsenderId = uId => {
    localStorage.setItem("userchatuId", uId);
  };

  userLogout = () => {
    this.setState({ isLoading: true });

    let body = new FormData();
    body.append("user_id", localStorage.getItem("user_id"));

    axios
      .post(API_URL + "auth/logout", body)

      .then(res => {
        if (res.data[0].Status == "Offline") {
          this.props.history.push("/");
        }
        console.log(res.data[0].Status);
        this.setState({});
        this.setState({ isLoading: false });
      })
      .catch(error => {
        this.setState({ isLoading: false });
        console.log(error);
      });
  };

  logout = async () => {
    this.userLogout();
    window.localStorage.setItem("logged_in", false);
    await localStorage.clear();
  };

  enterPressed = event => {
    if (event.key === "Enter") {
      this.onSelect();
    }
  };

  render() {
    return (
      <div className="header ">
        <Container fluid className="p-0">
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
            <div
              className="mt-4, input-box autocomplete my-autocomplete top-searcfld"
              style={{ position: "static" }}
            >
              <div className="clginput-search">
                <i className="fa fa-search"></i>
              </div>
              <Autocomplete
                inputProps={{
                  placeholder: "Search for Expert, College or Expertise"
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
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav ">
              <Nav className="ml-auto">
                <Nav.Link href="/userConnection">
                  <Users color="#fff" style={{ width: 24 }} />
                  <span className="responce-hide"> My Mentors </span>
                </Nav.Link>
                <Nav.Link href="/uchat">
                  {/* <ul className="drop-menu">
<li>Chat with Expert</li>
<li>Chat with User</li>
                  </ul> */}
                  <Chat
                    color="#fff"
                    style={{ width: 24 }}
                    onClick={this.removeBadge()}
                  />
                  <span id="badge" class="badge2-success ondot">
                    {" "}
                  </span>
                  <span className="responce-hide"> My Chat </span>
                </Nav.Link>
                <Nav.Link href="/qustionlist">
                  <img
                    src={require("../assest/images/ques.png")}
                    color="#fff"
                    style={{ width: 20 }}
                  />
                  <span className="responce-hide">My questions</span>
                </Nav.Link>
                <Link to="become">
                <Nav.Link href="/BecomeExpert">
                  <Expert color="#fff" style={{ width: 24 }} />
                  Become an expert
                </Nav.Link>
                </Link>

                {this.state.status.map((item, index) => {
                  if (item.read_status == "false") {
                    return (
                      <Dropdown>
                        <Dropdown.Toggle
                          className=" bg-transparent border-0  mr-2 "
                          id="notification"
                        >
                          <button className="noyi-btn" onClick={this.both}>
                            <span class="badge1-success ondot"> </span>
                            <Notifiy color="#fff" style={{ width: 24 }} />{" "}
                            Notifications
                          </button>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="notificationmain">
                          <ScrollArea className="n-scroll">
                            {this.state.notification.map((item, index) => {
                              if (
                                (index < 7 &&
                                  item.notification_type == "ANSWER") ||
                                item.notification_type == "COMMENT" ||
                                item.notification_type == "QUESTION"
                              ) {
                                return (
                                  <div
                                    className="notificationpan border-bottom mb-2"
                                    value={item.receiver_user_id}
                                  >
                                    <Link
                                      to="/Answeredpage"
                                      onClick={() =>
                                        this.getquestionId(item.question_id)
                                      }
                                    >
                                      <img
                                        src={item.notification_image}
                                        alt=" "
                                        className="thumbnail sm"
                                        style={{ display: "inline" }}
                                      />
                                      <p className="mb-0 ">
                                        <small>
                                          {item.notification_message}
                                        </small>
                                        <small className="text-muted d-block text-left font-weight-light">
                                          {" "}
                                          {item.notification_time}{" "}
                                        </small>
                                      </p>
                                    </Link>
                                  </div>
                                );
                              } else if (
                                index < 7 &&
                                item.notification_type == "Connection response"
                              ) {
                                return (
                                  <div
                                    className="notificationpan border-bottom mb-2"
                                    value={item.receiver_user_id}
                                  >
                                    <Link
                                      to="/MyExpert"
                                      onClick={() =>
                                        this.getquestionId(item.question_id)
                                      }
                                    >
                                      <img
                                        src={item.notification_image}
                                        alt=" "
                                        className="thumbnail sm"
                                        style={{ display: "inline" }}
                                      />
                                      <p className="mb-0 ">
                                        <small>
                                          {item.notification_message}
                                        </small>
                                        <small className="text-muted d-block text-left font-weight-light">
                                          {" "}
                                          {item.notification_time}{" "}
                                        </small>
                                      </p>
                                    </Link>
                                  </div>
                                );
                              } else if (
                                index < 7 &&
                                item.notification_type == "MESSAGE"
                              ) {
                                return (
                                  <div
                                    className="notificationpan border-bottom mb-2"
                                    value={item.receiver_user_id}
                                  >
                                    <Link
                                      to="/uChat"
                                      onClick={() =>
                                        this.getsenderId(item.sender_user_id)
                                      }
                                    >
                                      <img
                                        src={item.notification_image}
                                        alt=" "
                                        className="thumbnail sm"
                                        style={{ display: "inline" }}
                                      />
                                      <p className="mb-0 ">
                                        <small>
                                          {item.notification_message}
                                        </small>
                                        <small className="text-muted d-block text-left font-weight-light">
                                          {" "}
                                          {item.notification_time}{" "}
                                        </small>
                                      </p>
                                    </Link>
                                  </div>
                                );
                              }
                            })}
                          </ScrollArea>
                        </Dropdown.Menu>
                      </Dropdown>
                    );
                  } else {
                    return (
                      <Dropdown>
                        <Dropdown.Toggle
                          className=" bg-transparent border-0  mr-2 "
                          id="notification"
                        >
                          <button className="noyi-btn" onClick={this.both}>
                            <Notifiy color="#fff" style={{ width: 24 }} />{" "}
                            <span className="responce-hide">
                              {" "}
                              Notifications{" "}
                            </span>
                          </button>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="notificationmain">
                          <ScrollArea className="n-scroll">
                            {this.state.notification.map((item, index) => {
                              if (
                                (index < 7 &&
                                  item.notification_type == "ANSWER") ||
                                item.notification_type == "COMMENT" ||
                                item.notification_type == "QUESTION"
                              ) {
                                return (
                                  <div
                                    className="notificationpan border-bottom mb-2"
                                    value={item.receiver_user_id}
                                  >
                                    <Link
                                      to="/Answeredpage"
                                      onClick={() =>
                                        this.getquestionId(item.question_id)
                                      }
                                    >
                                      <img
                                        src={item.notification_image}
                                        alt=" "
                                        className="thumbnail sm"
                                        style={{ display: "inline" }}
                                      />
                                      <p className="mb-0 ">
                                        <small>
                                          {item.notification_message}
                                        </small>
                                        <small className="text-muted d-block text-left font-weight-light">
                                          {" "}
                                          {item.notification_time}{" "}
                                        </small>
                                      </p>
                                    </Link>
                                  </div>
                                );
                              } else if (
                                item.notification_type == "Connection response"
                              ) {
                                return (
                                  <div
                                    className="notificationpan border-bottom mb-2"
                                    value={item.receiver_user_id}
                                  >
                                    <Link
                                      to="/userConnection"
                                      onClick={() =>
                                        this.getquestionId(item.question_id)
                                      }
                                    >
                                      <img
                                        src={item.notification_image}
                                        alt=" "
                                        className="thumbnail sm"
                                        style={{ display: "inline" }}
                                      />
                                      <p className="mb-0 ">
                                        <small>
                                          {item.notification_message}
                                        </small>
                                        <small className="text-muted d-block text-left font-weight-light">
                                          {" "}
                                          {item.notification_time}{" "}
                                        </small>
                                      </p>
                                    </Link>
                                  </div>
                                );
                              } else if (item.notification_type == "MESSAGE") {
                                return (
                                  <div
                                    className="notificationpan border-bottom mb-2"
                                    value={item.receiver_user_id}
                                  >
                                    <Link
                                      to="/uChat"
                                      onClick={() =>
                                        this.getsenderId(item.sender_user_id)
                                      }
                                    >
                                      <img
                                        src={item.notification_image}
                                        alt=" "
                                        className="thumbnail sm"
                                        style={{ display: "inline" }}
                                      />
                                      <p className="mb-0 ">
                                        <small>
                                          {item.notification_message}
                                        </small>
                                        <small className="text-muted d-block text-left font-weight-light">
                                          {" "}
                                          {item.notification_time}{" "}
                                        </small>
                                      </p>
                                    </Link>
                                  </div>
                                );
                              } else {
                                return (
                                  <h5>
                                    <img
                                      src={require("../assest/images/no-notification.jpg")}
                                    />
                                  </h5>
                                );
                              }
                            })}
                          </ScrollArea>
                        </Dropdown.Menu>
                      </Dropdown>
                    );
                  }
                })}
              </Nav>

              <Nav className="profiledropdown">
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">
                    {this.state.pic.map((value, index) => {
                      return (
                        <span className="white-bg mr-2 pics">
                          <img src={value.user_image} />
                        </span>
                      );
                    })}
                    {this.state.pic.map((value, index) => {
                      return (
                        <div className="ml-1 mr-2">
                          {value.name.split(" ")[0]}{" "}
                          <span className="lastname">
                            {value.name.split(" ")[1]}
                          </span>
                        </div>
                      );
                    })}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/studentProfile">
                      <img
                        src={require("../assest/images/resume.png")}
                        style={{ width: 16, color: "#fff", marginRight: 5 }}
                      />
                      Edit Profile
                    </Dropdown.Item>

                    <Dropdown.Item href="/MyExpert">
                      <img
                        src={require("../assest/images/hired.png")}
                        style={{ width: 16, color: "#fff", marginRight: 5 }}
                      />
                      Hired Mentors
                    </Dropdown.Item>

                    <Dropdown.Item href="/studentSettings">
                      <img
                        src={require("../assest/images/setting-Icon.png")}
                        style={{ width: 16, color: "#fff", marginRight: 5 }}
                      />
                      Settings
                    </Dropdown.Item>

                    <Button
                      variant="link"
                      className="p-0 text-muted"
                      onClick={this.logout}
                    >
                      <Dropdown.Item href="/">
                        <img
                          src={require("../assest/images/logout.png")}
                          style={{ width: 13, color: "#fff", marginRight: 5 }}
                        />
                        Logout
                      </Dropdown.Item>
                    </Button>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            </Navbar.Collapse>{" "}
          </Navbar>
        </Container>
      </div>
    );
  }
}

export default LogHeader;
