/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./header.css";
import { Dropdown, Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../component/url";
import ScrollArea from "react-scrollbar";
import Notifiy from "react-ionicons/lib/MdNotifications";
import Connection from "react-ionicons/lib/MdPeople";
import Answers from "react-ionicons/lib/MdCopy";
import Chat from "react-ionicons/lib/MdChatboxes";
import $ from "jquery";
import openSocket from "socket.io-client";
import Autocomplete from "react-autocomplete";

const socket = openSocket("https://socket.connectbud.com/");

class LogHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: [],
      pic: [],
      bgColor: "red",
      status: [],
      value: "",
      autocompleteData: []
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
      localStorage.setItem("exchatuId", value.user_id);
      localStorage.setItem("exchatshower_id", value.row_id);
      window.open("/expertConnectedprofile", "_self");

    }
    else if (localStorage.getItem("user_id") == value.user_id)
    {
      window.open("/ExpertProfile", "_self")
    }
    else {
      localStorage.setItem("uId", value.user_id);
      localStorage.setItem("shower_id", value.row_id);
      window.open("/expertviewProfile", "_self")
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
          notification: res.data
        });
      });

    socket.on(
      "show_notification" + localStorage.getItem("senderId"),

      function (notify) {
        console.log("called");
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
      }
    );
  };

  componentDidMount = async () => {
    this.notificationStatus();

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
        localStorage.setItem("Id", response.data[0].id);
        localStorage.setItem("expertType", response.data[0].expert_type)
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
    this.getexMessage();
    this.getuserMessage();
  };

  getMessage() {
    socket.on(
      "room" +
      localStorage.getItem("user_id") +
      "_" +
      localStorage.getItem("exchatuId"),
      function (ping) {
        console.log(ping);
        $("#badge").addClass("badge2-success ondot");
      }
    );
  }

  getexMessage() {
    socket.on(
      "room" +
      localStorage.getItem("user_id") +
      "_" +
      localStorage.getItem("exchatuId"),
      function (ping) {
        console.log("getexMessage");
        console.log(ping);
        $("#badge").addClass("badge2-success ondot");
        $("#badge1").addClass("badge4-success ondot");
      }
    );
  }

  getuserMessage = () => {
    socket.on(
      "room" +
      localStorage.getItem("user_id") +
      "_" +
      localStorage.getItem("userchatuId"),
      function (ping) {
        console.log("getuserMessage");
        console.log(ping);
        $("#badge").addClass("badge2-success ondot");
        $("#badge3").addClass("badge4-success ondot");
      }
    );
  };

  removeBadge = () => {
    $("#badge").removeClass("badge2-success ondot");
  };

  exremoveBadge = () => {
    $("#badge1").removeClass("badge4-success ondot");
  };

  userremoveBadge = () => {
    $("#badge3").removeClass("badge4-success ondot");
  };

  getquestionId = qId => {
    localStorage.setItem("qId", qId);
  };

  getsenderId = uId => {
    localStorage.setItem("exchatuId", uId);
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
    // localStorage.setItem('logout-event', 'logout' + Math.random());
    window.localStorage.setItem("logged_in", false);
    await localStorage.clear();
  };

  enterPressed = event => {
    if (event.key === "Enter") {
      this.onSelect();
    }
  };


  acceptRequest = async () => {
    let body1 = new FormData();

    body1.append("receiver_id", localStorage.getItem("user_id"));

    const obj = {
      sender_id: localStorage.getItem("uId"),
      receiver_id: localStorage.getItem("user_id"),
      // notification_id: localStorage.getItem("notificationId"),
      status: "accept"
    };

    await axios
      .post(API_URL + "acceptRequest", obj, {
        header: {
          "content-Type": "application/json"
        }
      })
      .then(response => {

        this.both();
        this.setState({ isLoading: false });
      })
      .catch(error => {
        this.setState({ isLoading: false });
      });
  };

  acceptIgnore = async () => {
    let body1 = new FormData();

    body1.append("receiver_id", localStorage.getItem("user_id"));

    const obj = {
      sender_id: localStorage.getItem("uId"),
      receiver_id: localStorage.getItem("user_id"),
      // notification_id: localStorage.getItem("notificationId"),
      status: "ignore"
    };

    await axios
      .post(API_URL + "deleteRequest", obj, {
        header: {
          "content-Type": "application/json"
        }
      })
      .then(response => {

        this.both();
        this.setState({ isLoading: false });
      })
      .catch(error => {
        this.setState({ isLoading: false });
      });
  };

  getrequestId(uId) {
    localStorage.setItem("uId", uId);
    // localStorage.setItem("notificationId", notificationId);

    this.acceptRequest();
  }

  getignoreId(uId) {
    localStorage.setItem("uId", uId);
    // localStorage.setItem("notificationId", notificationId);

    this.acceptIgnore();
  }




  render() {
    return (
      <div className="header ">
        <Navbar collapseOnSelect expand="lg" bg="none">
          <Navbar.Brand className="brand">
            <Link to="/exapp">
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
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link className="chat-option">
                <ul className="drop-menu">
                  <Link to="/expertConnection">
                    <li> Expert Connection </li>
                  </Link>
                  <Link to="/MyConnection">
                    <li> User Connection </li>
                  </Link>
                </ul>
                <Connection color="#fff" style={{ width: 24 }} />
                <span className="responce-hide"> My Connections</span>
              </Nav.Link>
              <Nav.Link className="chat-option">
                <Chat
                  color="#fff"
                  style={{ width: 24 }}
                  onClick={this.removeBadge()}
                />
                <span id="badge" class="badge2-success ondot">
                  {" "}
                </span>
                <span className="responce-hide">  My Chat</span>
                <ul className="drop-menu">
                  <Link to="/expertChat">
                    <span
                      id="badge1"
                      class="badge4-success ondot"
                      onClick={this.exremoveBadge()}
                    >
                      {" "}
                    </span>
                    <li> Chat with Expert </li>
                  </Link>
                  <Link to="/chat">
                    <span
                      id="badge3"
                      class="badge4-success ondot"
                      onClick={this.userremoveBadge()}
                    >
                      {" "}
                    </span>
                    <li> Chat with User </li>
                  </Link>
                </ul>
              </Nav.Link>
              <Nav.Link href="/exquestionlist">
                <img
                  src={require("../assest/images/ques.png")}
                  color="#fff"
                  style={{ width: 17 }}
                />
                <span className="responce-hide">   My questions</span>
              </Nav.Link>
              <Nav.Link href="/expertanswer">
                <Answers color="#fff" style={{ width: 24 }} />
                <span className="responce-hide">    Answers </span>
              </Nav.Link>
              {this.state.status.map((item, index) => {
                if (item.read_status == "false") {
                  return (
                    <Dropdown>
                      <Dropdown.Toggle
                        className=" bg-transparent border-0 "
                        id="notification"
                      >
                        <button className="noyi-btn" onClick={this.both}>
                          <span class="badge1-success ondot"> </span>
                          <Notifiy color="#fff" style={{ width: 24 }} />{" "}
                          <span className="responce-hide">   Notifications </span>
                        </button>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="notificationmain">
                        <ScrollArea className="n-scroll">
                          {this.state.notification.map((item, index) => {
                            if (
                              (index < 7 &&
                                item.notification_type == "ANSWER") ||
                              item.notification_type == "QUESTION" ||
                              item.notification_type == "COMMENT"
                            ) {
                              return (
                                <div
                                  className="notificationpan border-bottom mb-2"
                                  id="chatbody1"
                                  value={item.receiver_user_id}
                                >
                                  <Link
                                    to="/exAnswerpage"
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
                                      <small>{item.notification_message}</small>
                                      <small className="text-muted d-block text-left font-weight-light">
                                        {" "}
                                        {item.notification_time}{" "}
                                      </small>
                                    </p>
                                  </Link>
                                </div>
                              );
                            } else if (
                              item.notification_type == "Connection request"
                            ) {
                              return (
                                <div
                                  className="notificationpan border-bottom mb-2"
                                  id="chatbody1"
                                  value={item.receiver_user_id}
                                >
                                  <Link
                                    to="/userRequest"
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
                                      <small>{item.notification_message}</small>
                                      <small className="text-muted d-block text-left font-weight-light">
                                        {" "}
                                        {item.notification_time}{" "}
                                      </small>
                                    </p>
                                  </Link>
                                  <div className="igacc-wrap">
                                    <button className="accept-btn" onClick={() => this.getrequestId(item.sender_user_id)}>Accept</button>
                                    <button className="accept-btn" onClick={() => this.getignoreId(item.sender_user_id)}>Ignore</button>
                                  </div>
                                </div>
                              );
                            } else if (item.notification_type == "MESSAGE") {
                              if (item.Flag == "Y") {
                                return (
                                  <div
                                    className="notificationpan border-bottom mb-2"
                                    id="chatbody1"
                                    value={item.receiver_user_id}
                                  >
                                    <Link
                                      to="/expertChat"
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
                                        <small>{item.notification_message}</small>
                                        <small className="text-muted d-block text-left font-weight-light">
                                          {" "}
                                          {item.notification_time}{" "}
                                        </small>
                                      </p>
                                    </Link>
                                  </div>
                                );
                              }
                              else {
                                return (
                                  <div
                                    className="notificationpan border-bottom mb-2"
                                    id="chatbody1"
                                    value={item.receiver_user_id}
                                  >
                                    <Link
                                      to="/chat"
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
                                        <small>{item.notification_message}</small>
                                        <small className="text-muted d-block text-left font-weight-light">
                                          {" "}
                                          {item.notification_time}{" "}
                                        </small>
                                      </p>
                                    </Link>
                                  </div>
                                );
                              }

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
                        className=" bg-transparent border-0 "
                        id="notification"
                      >
                        <button className="noyi-btn" onClick={this.both}>
                          <Notifiy color="#fff" style={{ width: 24 }} />{" "}
                          <span className="responce-hide"> Notifications </span>
                        </button>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="notificationmain">
                        <ScrollArea className="n-scroll">
                          {this.state.notification.map((item, index) => {
                            if (
                              (index < 7 &&
                                item.notification_type == "ANSWER") ||
                              item.notification_type == "QUESTION" ||
                              item.notification_type == "COMMENT"
                            ) {
                              return (
                                <div
                                  className="notificationpan border-bottom mb-2"
                                  id="chatbody1"
                                  value={item.receiver_user_id}
                                >
                                  <Link
                                    to="/exAnswerpage"
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
                                      <small>{item.notification_message}</small>
                                      <small className="text-muted d-block text-left font-weight-light">
                                        {" "}
                                        {item.notification_time}{" "}
                                      </small>
                                    </p>
                                  </Link>
                                </div>
                              );
                            } else if (
                              item.notification_type == "Connection request"
                            ) {
                              return (
                                <div
                                  className="notificationpan border-bottom mb-2"
                                  id="chatbody1"
                                  value={item.receiver_user_id}
                                >
                                  <Link
                                    to="/userRequest"
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
                                      <small>{item.notification_message}</small>
                                      <small className="text-muted d-block text-left font-weight-light">
                                        {" "}
                                        {item.notification_time}{" "}
                                      </small>
                                    </p>
                                  </Link>
                                  <div className="igacc-wrap">
                                    <button className="accept-btn" onClick={() => this.getrequestId(item.sender_user_id)}>Accept</button>
                                    <button className="accept-btn" onClick={() => this.getignoreId(item.sender_user_id)}>Ignore</button>

                                  </div>

                                </div>
                              );
                            } else if (item.notification_type == "MESSAGE") {
                              if (item.Flag == "Y") {
                                return (
                                  <div
                                    className="notificationpan border-bottom mb-2"
                                    id="chatbody1"
                                    value={item.receiver_user_id}
                                  >
                                    <Link
                                      to="/expertChat"
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
                                        <small>{item.notification_message}</small>
                                        <small className="text-muted d-block text-left font-weight-light">
                                          {" "}
                                          {item.notification_time}{" "}
                                        </small>
                                      </p>
                                    </Link>
                                  </div>
                                );
                              }
                              else {
                                return (
                                  <div
                                    className="notificationpan border-bottom mb-2"
                                    id="chatbody1"
                                    value={item.receiver_user_id}
                                  >
                                    <Link
                                      to="/chat"
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
                                        <small>{item.notification_message}</small>
                                        <small className="text-muted d-block text-left font-weight-light">
                                          {" "}
                                          {item.notification_time}{" "}
                                        </small>
                                      </p>
                                    </Link>
                                  </div>
                                );
                              }

                            }
                            // else {
                            //   return (
                            //     <h5>
                            //       <img
                            //         src={require("../assest/images/no-notification.jpg")}
                            //       />
                            //     </h5>
                            //   );
                            // }
                          })}
                        </ScrollArea>
                      </Dropdown.Menu>
                    </Dropdown>
                  );
                }
              })}



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
                            {value.name.split(" ")[1]}{" "}
                            <small className="mx-2">Expert</small>
                          </span>
                        </div>
                      );
                    })}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/ExpertProfile">
                      <img
                        src={require("../assest/images/resume.png")}
                        style={{ width: 13, color: "#fff", marginRight: 5 }}
                      />
                      Edit Profile
                </Dropdown.Item>

                    <Dropdown.Item href="/userRequest">
                      <img
                        src={require("../assest/images/request.png")}
                        style={{ width: 16, color: "#fff", marginRight: 5 }}
                      />
                      Pending Request
                </Dropdown.Item>

                    <Dropdown.Item href="/exSettings">
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

            </Nav>
          </Navbar.Collapse>

        </Navbar>
      </div>
    );
  }
}

export default LogHeader;