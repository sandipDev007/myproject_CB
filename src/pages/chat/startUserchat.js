/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable eqeqeq */
import React, { Component } from "react";
import "./cStyle.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import LogHeader from "../../component/loginheader";
import Footer from "../../component/footer";
import Plane from "react-ionicons/lib/MdPaperPlane";
import Paperclip from "react-ionicons/lib/MdAttach";
import openSocket from "socket.io-client";
import axios from "axios";
import { API_URL } from "../../component/url";
import $ from "jquery";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import ScrollArea from "react-scrollbar";
//import DropZone from "react-drop-zone";

const socket = openSocket("https://socket.connectbud.com/");

export default class chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatContent: "",
      expertset: [],
      chat: [],
      pic: [],
      message: "",
      chatMessage: [],
      imagePreviewUrl: "",
      file: "",
      preview: false
    };
    this.picChange = this.picChange.bind(this);
    this.removePicture = this.removePicture.bind(this);
  }
  handleChatContent = e => {
    this.setState({
      chatContent: e.target.value,
      chat: e.target.value,
      message: e.target.value
    });
  };

  sendMessage = e => {
    if (this.state.chatContent == "") {
      return false;
    }
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();
    var chatbody = document.getElementById("chatbody");
    var originalContent = chatbody.innerHTML;
    var textnode =
      '<div class="ch-msg ch-right d-flex align-items-center">' +
      '<span class="cdate">' +
      time +
      "</span>" +
      '<div class="cdata">' +
      "<p>" +
      this.state.chatContent +
      "</p>" +
      "</div>" +
      "</div>";
    chatbody.innerHTML = originalContent + textnode;
    socket.emit(
      "message",
      this.state.chatContent +
        "," +
        localStorage.getItem("userchatuId") +
        "," +
        localStorage.getItem("user_id")
    );
    var ChatContent = document.getElementById("ChatContent");
    ChatContent.value = "";
    this.setState({
      chatContent: ""
    });
    console.log(this.state.chatContent);
    $("#chatbody").scrollTop($("#chatbody")[0].scrollHeight);
  };

  componentWillMount() {
    console.log("called");
    let data = "";
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();
    socket.on(
      "room" +
        localStorage.getItem("user_id") +
        "_" +
        localStorage.getItem("userchatuId"),
      function(ping) {
        console.log(ping);
        data = ping;
        var chatbody = document.getElementById("chatbody");
        var originalContent = chatbody.innerHTML;
        var textnode = "";
        if (data.startsWith("https") == false) {
          textnode =
            '<div class="ch-msg ch-left d-flex align-items-center">' +
            '<div class="cdata">' +
            "<p>" +
            data +
            "</p>" +
            "</div>" +
            "<small>" +
            time +
            "</small>" +
            "</div>";
        } 
        
        else if (
          data.endsWith("pdf") == true 
        ) {
          // img.onclick = (() => window.open(res.data[0].File_Path));

          console.log("else if block called");
          let pic = require("../../assest/images/testpdf.png");
          textnode =
            '<div class="chat-doc">' +
            "<img src=" +
            pic +
            " " +
            "id" +
            "=" +
            data +
            " " +
            "width='270' height='170' onclick='window.open(this.id)'>" +
            "</div>";
          // textnode.onclick = (() => window.open(data))
        }

        else if (
          data.endsWith("doc") == true ||
          data.endsWith("docx") == true
        ) {
          // img.onclick = (() => window.open(res.data[0].File_Path));

          console.log("else if block called");
          let pic = require("../../assest/images/testdoc.png");
          textnode =
            '<div class="chat-doc">' +
            "<img src=" +
            pic +
            " " +
            "id" +
            "=" +
            data +
            " " +
            "width='270' height='170' onclick='window.open(this.id)'>" +
            "</div>";
          // textnode.onclick = (() => window.open(data))
        }

        else if (
          data.endsWith("xls") == true 
        ) {
          // img.onclick = (() => window.open(res.data[0].File_Path));

          console.log("else if block called");
          let pic = require("../../assest/images/testexcel.png");
          textnode =
            '<div class="chat-doc">' +
            "<img src=" +
            pic +
            " " +
            "id" +
            "=" +
            data +
            " " +
            "width='270' height='170' onclick='window.open(this.id)'>" +
            "</div>";
          // textnode.onclick = (() => window.open(data))
        }


        else {
          textnode =
            "<div>" +
            "<img src=" +
            data +
            ' width="270" height="170" onclick="window.open(this.src)">' +
            "</div>";
          //  textnode.onclick = () => window.open(data);
        }

        chatbody.innerHTML = originalContent + textnode;
        $("#chatbody").scrollTop($("#chatbody")[0].scrollHeight);
      }
    );
  }

  getexptId = (uId, Id) => {
    localStorage.setItem("userchatuId", uId);
    localStorage.setItem("userchatshower_id", Id);

    this.changeUser();
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      console.log("enter press here! ");
      this.both();
    }
  };

  componentDidMount = async () => {
    this.changeUser();
  };

  changeUser = async () => {
    console.log(localStorage.getItem("user_id").toString());
    this.setState({ isLoading: true });
    let taglistbody = new FormData();
    let body = new FormData();
    let body1 = new FormData();

    body.append("user_id", localStorage.getItem("userchatuId"));
    body1.append("sender_id", localStorage.getItem("user_id"));
    body1.append("receiver_id", localStorage.getItem("userchatuId"));

    taglistbody.append("sender_id", localStorage.getItem("user_id"));

    await axios({
      url: API_URL + "imageGet",
      method: "POST",
      data: body
    })
      .then(response => {
        this.setState({
          pic: response.data
        });
        this.setState({ isLoading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
      });

    await axios({
      url: API_URL + "chat/getChat",
      method: "POST",
      data: body1
    })
      .then(response => {
        this.setState({
          chatMessage: response.data
        });
        this.setState({ isLoading: false });
      })
      .catch(error => {
        this.setState({ isLoading: false });
      });

    await axios({
      url: API_URL + "chat/chattedUsers",
      method: "POST",
      data: taglistbody
    })
      .then(response => {
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
  };

  usercommentSubmit = async () => {
    let formData = new FormData();

    formData.append("file", this.state.file);
    formData.append("sender_id", localStorage.getItem("user_id"));
    formData.append("receiver_id", localStorage.getItem("userchatuId"));
    formData.append("message", this.state.message.toLowerCase());

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    axios
      .post(API_URL + "chat/startChat", formData, config)

      .then(async res => {
        console.log(res.data[0].File_Path);

        var chatbody = document.getElementById("chatbody");
        var img = document.createElement("img");

        if (this.state.file != "") {

          if (
            this.state.file.name.endsWith("pdf") == true 
          ) {
            img.src = require("../../assest/images/testpdf.png");
            // img.height = 170;
            // img.width = 300;
            img.align = "right";
            img.onclick = () => window.open(res.data[0].File_Path);
            chatbody.appendChild(img);

            socket.emit(
              "message",
              res.data[0].File_Path +
                "," +
                localStorage.getItem("userchatuId") +
                "," +
                localStorage.getItem("user_id")
            );

            let data = "";

            socket.on(
              "room" +
                localStorage.getItem("user_id") +
                "_" +
                localStorage.getItem("userchatuId"),
              function(ping) {
                console.log(ping);
                data = ping;
                var chatbody = document.getElementById("chatbody");
                var originalContent = chatbody.innerHTML;

                var textnode =
                  '<div class="ch-msg ch-left d-flex align-items-center">' +
                  '<img src={require("../../assest/images/fundtrasfer.png")} />' +
                  '<div class="cdata">' +
                  "<p>" +
                  data +
                  "</p>" +
                  "</div>" +
                  "</div>";
                chatbody.innerHTML = originalContent + textnode;
                $("#chatbody").scrollTop($("#chatbody")[0].scrollHeight);
              }
            );
          } 

          else if (
            this.state.file.name.endsWith("doc") == true ||
            this.state.file.name.endsWith("docx") == true
          ) {
            img.src = require("../../assest/images/testdoc.png");
            // img.height = 170;
            // img.width = 300;
            img.align = "right";
            img.onclick = () => window.open(res.data[0].File_Path);
            chatbody.appendChild(img);

            socket.emit(
              "message",
              res.data[0].File_Path +
                "," +
                localStorage.getItem("userchatuId") +
                "," +
                localStorage.getItem("user_id")
            );

            let data = "";

            socket.on(
              "room" +
                localStorage.getItem("user_id") +
                "_" +
                localStorage.getItem("userchatuId"),
              function(ping) {
                console.log(ping);
                data = ping;
                var chatbody = document.getElementById("chatbody");
                var originalContent = chatbody.innerHTML;

                var textnode =
                  '<div class="ch-msg ch-left d-flex align-items-center">' +
                  '<img src={require("../../assest/images/fundtrasfer.png")} />' +
                  '<div class="cdata">' +
                  "<p>" +
                  data +
                  "</p>" +
                  "</div>" +
                  "</div>";
                chatbody.innerHTML = originalContent + textnode;
                $("#chatbody").scrollTop($("#chatbody")[0].scrollHeight);
              }
            );
          } 


          else if (
            this.state.file.name.endsWith("xls") == true 
          ) {
            img.src = require("../../assest/images/testexcel.png");
            // img.height = 170;
            // img.width = 300;
            img.align = "right";
            img.onclick = () => window.open(res.data[0].File_Path);
            chatbody.appendChild(img);

            socket.emit(
              "message",
              res.data[0].File_Path +
                "," +
                localStorage.getItem("userchatuId") +
                "," +
                localStorage.getItem("user_id")
            );

            let data = "";

            socket.on(
              "room" +
                localStorage.getItem("user_id") +
                "_" +
                localStorage.getItem("userchatuId"),
              function(ping) {
                console.log(ping);
                data = ping;
                var chatbody = document.getElementById("chatbody");
                var originalContent = chatbody.innerHTML;

                var textnode =
                  '<div class="ch-msg ch-left d-flex align-items-center">' +
                  '<img src={require("../../assest/images/fundtrasfer.png")} />' +
                  '<div class="cdata">' +
                  "<p>" +
                  data +
                  "</p>" +
                  "</div>" +
                  "</div>";
                chatbody.innerHTML = originalContent + textnode;
                $("#chatbody").scrollTop($("#chatbody")[0].scrollHeight);
              }
            );
          } 
          
          
          else {
            img.src = res.data[0].File_Path;
            img.height = 170;
            img.width = 300;
            img.align = "right";
            img.onclick = () => window.open(res.data[0].File_Path);
            var div = document.createElement("div");
            div.className =
              "chat-doc ch-msg ch-right d-flex align-items-center";
            div.appendChild(img);
            chatbody.appendChild(div);

            socket.emit(
              "message",
              res.data[0].File_Path +
                "," +
                localStorage.getItem("userchatuId") +
                "," +
                localStorage.getItem("user_id")
            );

            let data = "";

            socket.on(
              "room" +
                localStorage.getItem("user_id") +
                "_" +
                localStorage.getItem("userchatuId"),
              function(ping) {
                console.log(ping);
                data = ping;
                var chatbody = document.getElementById("chatbody");
                var originalContent = chatbody.innerHTML;

                var textnode =
                  '<div class="ch-msg ch-left d-flex align-items-center">' +
                  '<img src={require("../../assest/images/fundtrasfer.png")} />' +
                  '<div class="cdata">' +
                  "<p>" +
                  data +
                  "</p>" +
                  "</div>" +
                  "</div>";
                chatbody.innerHTML = originalContent + textnode;
                $("#chatbody").scrollTop($("#chatbody")[0].scrollHeight);
              }
            );
          }
        }
        this.removePicture();
      })
      .catch(err => console.log(err));
    $("#chatbody").scrollTop($("#chatbody")[0].scrollHeight);
  };

  both = async () => {
    this.usercommentSubmit();
    this.sendMessage();
  };

  picChange(event) {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
        preview: true
      });
    };
    reader.readAsDataURL(file);
  }

  dropPicture = async file => {
    let reader = new FileReader();
    console.log(file);
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
        preview: true
      });
    };
    await reader.readAsDataURL(file);
    // await this.both();
  };

  removePicture() {
    this.setState({
      file: "",
      imagePreviewUrl: "",
      preview: false,
      message: ""
    });
  }

  getPayment = (uId, Id) => {
    console.log(uId);
    localStorage.setItem("userchatuId", uId);
    localStorage.setItem("userchatshower_id", Id);
  };

  render() {
    return (
      <section className="chat">
        <div>
          <LogHeader />
        </div>
        <div class="body-bg chat-main-body">
          <Container fluid className="full">
            <Row>
              <Col md={4} className="pr-md-0 mb-4 mb-md-0">
                <div class="chat-list">
                  <ScrollArea className="scrollbody">
                    <div class="list-heading d-flex justify-content-between align-items-center">
                      <h2>Chats</h2>
                    </div>

                    <ul class="chatlist list-unstyled">
                      {this.state.expertset.map((value, index) => {
                        if (value.status == "True") {
                          if (value.message == "url content") {
                            if (value.person == "me") {
                              return (
                                <li>
                                  <div class="chatuser userfund-trfrbtn">
                                    <span class="badge-success ondot"> </span>

                                    <figure>
                                      <img
                                        src={value.user_image}
                                        class="img-fluid"
                                        alt="icon"
                                      />
                                    </figure>
                                    <div class="cdata">
                                      <small>{value.collegeName}</small>
                                      <Link
                                        to="/startUserchat"
                                        onClick={() =>
                                          this.getexptId(
                                            value.receiver_id,
                                            value.id
                                          )
                                        }
                                      >
                                        <p>{value.name}</p>
                                      </Link>
                                      <small className="d-block text-capitalized">
                                        You :{" "}
                                        <img
                                          src={require("../../assest/images/photo.png")}
                                          style={{
                                            width: 13,
                                            color: "#fff",
                                            marginRight: 5
                                          }}
                                        />
                                        Image
                                      </small>
                                    </div>

                                    <p data-tip data-for="global">
                                      <ReactTooltip
                                        id="global"
                                        place="right"
                                        type="error"
                                        effect="solid"
                                      >
                                        <p>
                                          Hire the instructor of your choice
                                        </p>
                                        <p>
                                          and get the answers of all your
                                          queries.
                                        </p>
                                        <p>Make an instant payment to get in</p>
                                        <p>
                                          touch with your favorite instructor.
                                        </p>
                                      </ReactTooltip>

                                      <Link to="/checkout">
                                        <Button
                                          variant="info"
                                          size="sm"
                                          className="ml-2 py-1"
                                          onClick={() =>
                                            this.getPayment(
                                              value.receiver_id,
                                              value.id
                                            )
                                          }
                                        >
                                          <img
                                            src={require("../../assest/images/fundtrasfer.png")}
                                          />
                                        </Button>
                                      </Link>
                                    </p>
                                  </div>
                                </li>
                              );
                            } else {
                              return (
                                <li>
                                  <div class="chatuser userfund-trfrbtn">
                                    <span class="badge-success ondot"> </span>

                                    <figure>
                                      <img
                                        src={value.user_image}
                                        class="img-fluid"
                                        alt="icon"
                                      />
                                    </figure>
                                    <div class="cdata">
                                      <small>{value.collegeName}</small>
                                      <Link
                                        to="/startUserchat"
                                        onClick={() =>
                                          this.getexptId(
                                            value.receiver_id,
                                            value.id
                                          )
                                        }
                                      >
                                        <p>{value.name}</p>
                                      </Link>
                                      <small className="d-block text-capitalized">
                                        <img
                                          src={require("../../assest/images/photo.png")}
                                          style={{
                                            width: 13,
                                            color: "#fff",
                                            marginRight: 5
                                          }}
                                        />
                                        Image
                                      </small>
                                    </div>

                                    <p data-tip data-for="global">
                                      <ReactTooltip
                                        id="global"
                                        place="right"
                                        type="error"
                                        effect="solid"
                                      >
                                        <p>
                                          Hire the instructor of your choice
                                        </p>
                                        <p>
                                          and get the answers of all your
                                          queries.
                                        </p>
                                        <p>Make an instant payment to get in</p>
                                        <p>
                                          touch with your favorite instructor.
                                        </p>
                                      </ReactTooltip>

                                      <Link to="/checkout">
                                        <Button
                                          variant="info"
                                          size="sm"
                                          className="ml-2 py-1"
                                          onClick={() =>
                                            this.getPayment(
                                              value.receiver_id,
                                              value.id
                                            )
                                          }
                                        >
                                          <img
                                            src={require("../../assest/images/fundtrasfer.png")}
                                          />
                                        </Button>
                                      </Link>
                                    </p>
                                  </div>
                                </li>
                              );
                            }
                          } else if (value.person == "me") {
                            return (
                              <li>
                                <div class="chatuser userfund-trfrbtn">
                                  <span class="badge-success ondot"> </span>

                                  <figure>
                                    <img
                                      src={value.user_image}
                                      class="img-fluid"
                                      alt="icon"
                                    />
                                  </figure>
                                  <div class="cdata">
                                    <small>{value.collegeName}</small>
                                    <Link
                                      to="/startUserchat"
                                      onClick={() =>
                                        this.getexptId(
                                          value.receiver_id,
                                          value.id
                                        )
                                      }
                                    >
                                      <p>{value.name}</p>
                                    </Link>
                                    <small className="d-block text-capitalized">
                                      You : {value.last_message}
                                    </small>
                                  </div>

                                  <p data-tip data-for="global">
                                    <ReactTooltip
                                      id="global"
                                      place="right"
                                      type="error"
                                      effect="solid"
                                    >
                                      <p>Hire the instructor of your choice</p>
                                      <p>
                                        and get the answers of all your queries.
                                      </p>
                                      <p>Make an instant payment to get in</p>
                                      <p>
                                        touch with your favorite instructor.
                                      </p>
                                    </ReactTooltip>

                                    <Link to="/checkout">
                                      <Button
                                        variant="info"
                                        size="sm"
                                        className="ml-2 py-1"
                                        onClick={() =>
                                          this.getPayment(
                                            value.receiver_id,
                                            value.id
                                          )
                                        }
                                      >
                                        <img
                                          src={require("../../assest/images/fundtrasfer.png")}
                                        />
                                      </Button>
                                    </Link>
                                  </p>
                                </div>
                              </li>
                            );
                          } else {
                            return (
                              <li>
                                <div class="chatuser userfund-trfrbtn">
                                  <span class="badge-success ondot"> </span>

                                  <figure>
                                    <img
                                      src={value.user_image}
                                      class="img-fluid"
                                      alt="icon"
                                    />
                                  </figure>
                                  <div class="cdata">
                                    <small>{value.collegeName}</small>
                                    <Link
                                      to="/startUserchat"
                                      onClick={() =>
                                        this.getexptId(
                                          value.receiver_id,
                                          value.id
                                        )
                                      }
                                    >
                                      <p>{value.name}</p>
                                    </Link>
                                    <small className="d-block text-capitalized">
                                      {value.last_message}
                                    </small>
                                  </div>

                                  <p data-tip data-for="global">
                                    <ReactTooltip
                                      id="global"
                                      place="right"
                                      type="error"
                                      effect="solid"
                                    >
                                      <p>Hire the instructor of your choice</p>
                                      <p>
                                        and get the answers of all your queries.
                                      </p>
                                      <p>Make an instant payment to get in</p>
                                      <p>
                                        touch with your favorite instructor.
                                      </p>
                                    </ReactTooltip>

                                    <Link to="/checkout">
                                      <Button
                                        variant="info"
                                        size="sm"
                                        className="ml-2 py-1"
                                        onClick={() =>
                                          this.getPayment(
                                            value.receiver_id,
                                            value.id
                                          )
                                        }
                                      >
                                        <img
                                          src={require("../../assest/images/fundtrasfer.png")}
                                        />
                                      </Button>
                                    </Link>
                                  </p>
                                </div>
                              </li>
                            );
                          }
                        } else {
                          if (value.message == "url content") {
                            if (value.person == "me") {
                              return (
                                <li>
                                  <div class="chatuser userfund-trfrbtn">
                                    <figure>
                                      <img
                                        src={value.user_image}
                                        class="img-fluid"
                                        alt="icon"
                                      />
                                    </figure>
                                    <div class="cdata">
                                      <small>{value.collegeName}</small>
                                      <Link
                                        to="/startUserchat"
                                        onClick={() =>
                                          this.getexptId(
                                            value.receiver_id,
                                            value.id
                                          )
                                        }
                                      >
                                        <p>{value.name}</p>
                                      </Link>
                                      <small className="d-block text-capitalized">
                                        You :{" "}
                                        <img
                                          src={require("../../assest/images/photo.png")}
                                          style={{
                                            width: 13,
                                            color: "#fff",
                                            marginRight: 5
                                          }}
                                        />
                                        Image
                                      </small>
                                    </div>
                                    <p data-tip data-for="global">
                                      <ReactTooltip
                                        id="global"
                                        place="right"
                                        type="dark"
                                        effect="solid"
                                      >
                                        <p>
                                          Hire the instructor of your choice
                                        </p>
                                        <p>
                                          and get the answers of all your
                                          queries.
                                        </p>
                                        <p>Make an instant payment to get in</p>
                                        <p>
                                          touch with your favorite instructor.
                                        </p>
                                      </ReactTooltip>
                                      <Link to="/checkout">
                                        <Button
                                          variant="info"
                                          size="sm"
                                          className="ml-1 py-1"
                                          onClick={() =>
                                            this.getPayment(
                                              value.receiver_id,
                                              value.id
                                            )
                                          }
                                        >
                                          <img
                                            src={require("../../assest/images/fundtrasfer.png")}
                                          />
                                        </Button>
                                      </Link>
                                    </p>
                                  </div>
                                </li>
                              );
                            } else {
                              return (
                                <li>
                                  <div class="chatuser userfund-trfrbtn">
                                    <figure>
                                      <img
                                        src={value.user_image}
                                        class="img-fluid"
                                        alt="icon"
                                      />
                                    </figure>
                                    <div class="cdata">
                                      <small>{value.collegeName}</small>
                                      <Link
                                        to="/startUserchat"
                                        onClick={() =>
                                          this.getexptId(
                                            value.receiver_id,
                                            value.id
                                          )
                                        }
                                      >
                                        <p>{value.name}</p>
                                      </Link>
                                      <small className="d-block text-capitalized">
                                        <img
                                          src={require("../../assest/images/photo.png")}
                                          style={{
                                            width: 13,
                                            color: "#fff",
                                            marginRight: 5
                                          }}
                                        />
                                        Image
                                      </small>
                                    </div>
                                    <p data-tip data-for="global">
                                      <ReactTooltip
                                        id="global"
                                        place="right"
                                        type="dark"
                                        effect="solid"
                                      >
                                        <p>
                                          Hire the instructor of your choice
                                        </p>
                                        <p>
                                          and get the answers of all your
                                          queries.
                                        </p>
                                        <p>Make an instant payment to get in</p>
                                        <p>
                                          touch with your favorite instructor.
                                        </p>
                                      </ReactTooltip>
                                      <Link to="/checkout">
                                        <Button
                                          variant="info"
                                          size="sm"
                                          className="ml-1 py-1"
                                          onClick={() =>
                                            this.getPayment(
                                              value.receiver_id,
                                              value.id
                                            )
                                          }
                                        >
                                          <img
                                            src={require("../../assest/images/fundtrasfer.png")}
                                          />
                                        </Button>
                                      </Link>
                                    </p>
                                  </div>
                                </li>
                              );
                            }
                          } else if (value.person == "me") {
                            return (
                              <li>
                                <div class="chatuser userfund-trfrbtn">
                                  <figure>
                                    <img
                                      src={value.user_image}
                                      class="img-fluid"
                                      alt="icon"
                                    />
                                  </figure>
                                  <div class="cdata">
                                    <small>{value.collegeName}</small>
                                    <Link
                                      to="/startUserchat"
                                      onClick={() =>
                                        this.getexptId(
                                          value.receiver_id,
                                          value.id
                                        )
                                      }
                                    >
                                      <p>{value.name}</p>
                                    </Link>
                                    <small className="d-block text-capitalized">
                                      You : {value.last_message}
                                    </small>
                                  </div>
                                  <p data-tip data-for="global">
                                    <ReactTooltip
                                      id="global"
                                      place="right"
                                      type="dark"
                                      effect="solid"
                                    >
                                      <p>Hire the instructor of your choice</p>
                                      <p>
                                        and get the answers of all your queries.
                                      </p>
                                      <p>Make an instant payment to get in</p>
                                      <p>
                                        touch with your favorite instructor.
                                      </p>
                                    </ReactTooltip>
                                    <Link to="/checkout">
                                      <Button
                                        variant="info"
                                        size="sm"
                                        className="ml-1 py-1"
                                        onClick={() =>
                                          this.getPayment(
                                            value.receiver_id,
                                            value.id
                                          )
                                        }
                                      >
                                        <img
                                          src={require("../../assest/images/fundtrasfer.png")}
                                        />
                                      </Button>
                                    </Link>
                                  </p>
                                </div>
                              </li>
                            );
                          } else if (value.message == "N") {
                          } else {
                            return (
                              <li>
                                <div class="chatuser userfund-trfrbtn">
                                  <figure>
                                    <img
                                      src={value.user_image}
                                      class="img-fluid"
                                      alt="icon"
                                    />
                                  </figure>
                                  <div class="cdata">
                                    <small>{value.collegeName}</small>
                                    <Link
                                      to="/startUserchat"
                                      onClick={() =>
                                        this.getexptId(
                                          value.receiver_id,
                                          value.id
                                        )
                                      }
                                    >
                                      <p>{value.name}</p>
                                    </Link>
                                    <small className="d-block text-capitalized">
                                      {value.last_message}
                                    </small>
                                  </div>
                                  <p data-tip data-for="global">
                                    <ReactTooltip
                                      id="global"
                                      place="right"
                                      type="dark"
                                      effect="solid"
                                    >
                                      <p>Hire the instructor of your choice</p>
                                      <p>
                                        and get the answers of all your queries.
                                      </p>
                                      <p>Make an instant payment to get in</p>
                                      <p>
                                        touch with your favorite instructor.
                                      </p>
                                    </ReactTooltip>
                                    <Link to="/checkout">
                                      <Button
                                        variant="info"
                                        size="sm"
                                        className="ml-1 py-1"
                                        onClick={() =>
                                          this.getPayment(
                                            value.receiver_id,
                                            value.id
                                          )
                                        }
                                      >
                                        <img
                                          src={require("../../assest/images/fundtrasfer.png")}
                                        />
                                      </Button>
                                    </Link>
                                  </p>
                                </div>
                              </li>
                            );
                          }
                        }
                      })}
                    </ul>
                  </ScrollArea>
                </div>
              </Col>

              <Col md={8}>
                <div class="right-chat-details">
                  <div class="chat-head d-flex">
                    {this.state.pic.map((item, index) => {
                      if (item.status == "True") {
                        return (
                          <div>
                            <span class="badge-success ondot"> </span>
                            <figure>
                              <img
                                src={item.user_image}
                                class="img-fluid"
                                alt="icon"
                              />
                            </figure>
                          </div>
                        );
                      } else {
                        return (
                          <figure>
                            <img
                              src={item.user_image}
                              class="img-fluid"
                              alt="icon"
                            />
                          </figure>
                        );
                      }
                    })}
                    {this.state.pic.map((item, index) => {
                      return (
                        <div class="cdata">
                          <Link to="/connectedprofile">
                            <p>{item.name}</p>
                          </Link>
                        </div>
                      );
                    })}
                  </div>

                  {/* <DropZone onDrop={(file, text) => this.dropPicture(file)}>
                    {({ over, overDocument }) => (
                      <div>
                        { */}
                  <div class="chat-body" id="chatbody">
                    {this.state.chatMessage.map((item, index) => {
                      $("#chatbody").scrollTop($("#chatbody")[0].scrollHeight);
                      if (item.sender_id == localStorage.getItem("user_id")) {
                        if (
                          (item.message == "url content" &&
                            item.chatContent.endsWith("pdf") == true) 
                        ) {
                          return (
                            <div class="ch-msg ch-right d-flex align-items-center">
                              <span class="cdate ctadadoc text-dark">
                                {item.chatTime}
                              </span>

                              <div
                                onClick={() => window.open(item.chatContent)}
                                className="chat-doc"
                                style={{ cursor: "pointer" }}
                              >
                                <img
                                  src={require("../../assest/images/testpdf.png")}
                                />
                              </div>
                            </div>
                          );
                        } 

                        else if 
                          (item.message == "url content" &&
                          item.chatContent.endsWith("doc") == true ||
                          item.chatContent.endsWith("docx") == true
                        ) {
                          return (
                            <div class="ch-msg ch-right d-flex align-items-center">
                              <span class="cdate ctadadoc text-dark">
                                {item.chatTime}
                              </span>

                              <div
                                onClick={() => window.open(item.chatContent)}
                                className="chat-doc"
                                style={{ cursor: "pointer" }}
                              >
                                <img
                                  src={require("../../assest/images/testdoc.png")}
                                />
                              </div>
                            </div>
                          );
                        }


                        else if 
                          (item.message == "url content" &&
                          item.chatContent.endsWith("xls") == true 
                        ) {
                          return (
                            <div class="ch-msg ch-right d-flex align-items-center">
                              <span class="cdate ctadadoc text-dark">
                                {item.chatTime}
                              </span>

                              <div
                                onClick={() => window.open(item.chatContent)}
                                className="chat-doc"
                                style={{ cursor: "pointer" }}
                              >
                                <img
                                  src={require("../../assest/images/testexcel.png")}
                                />
                              </div>
                            </div>
                          );
                        }

                        else if (item.message == "url content") {
                          return (
                            <div class="ch-msg ch-right d-flex align-items-center">
                              <span class="cdate ctadadoc text-dark">
                                {item.chatTime}
                              </span>

                              <div className="chat-image">
                                <a href={item.chatContent} download>
                                  <img src={item.chatContent} />
                                </a>
                              </div>
                            </div>
                          );
                        } 
                        else {
                          return (
                            <div class="ch-msg ch-right d-flex align-items-center">
                              <span class="cdate text-dark">
                                {item.chatTime}
                              </span>
                              <div class="cdata">
                                <p>{item.chatContent}</p>
                              </div>
                            </div>
                          );
                        }
                      } 
                      
                      
                      
                      else {

                        if (
                          (item.message == "url content" &&
                            item.chatContent.endsWith("pdf") == true) 
                        ) {
                          return (
                            <div class="ch-msg ch-left ch-leftdoc d-flex align-items-center">
                              <div
                                onClick={() => window.open(item.chatContent)}
                                className="chat-image"
                              >
                                {/* <a href={item.chatContent} download> */}
                                <img
                                  src={require("../../assest/images/testpdf.png")}
                                />
                                {/* </a> */}
                              </div>
                              <span class="cdate ctadadoc text-dark">
                                {item.chatTime}
                              </span>
                            </div>
                          );
                        } 

                        else if 
                          (item.message == "url content" &&
                          item.chatContent.endsWith("doc") == true ||
                          item.chatContent.endsWith("docx") == true
                        ) {
                          return (
                            <div class="ch-msg ch-left ch-leftdoc d-flex align-items-center">
                              <div
                                onClick={() => window.open(item.chatContent)}
                                className="chat-image"
                              >
                                {/* <a href={item.chatContent} download> */}
                                <img
                                  src={require("../../assest/images/testdoc.png")}
                                />
                                {/* </a> */}
                              </div>
                              <span class="cdate ctadadoc text-dark">
                                {item.chatTime}
                              </span>
                            </div>
                          );
                        } 

                        else if 
                          (item.message == "url content" &&
                          item.chatContent.endsWith("xls") == true 
                        ) {
                          return (
                            <div class="ch-msg ch-left ch-leftdoc d-flex align-items-center">
                              <div
                                onClick={() => window.open(item.chatContent)}
                                className="chat-image"
                              >
                                {/* <a href={item.chatContent} download> */}
                                <img
                                  src={require("../../assest/images/testexcel.png")}
                                />
                                {/* </a> */}
                              </div>
                              <span class="cdate ctadadoc text-dark">
                                {item.chatTime}
                              </span>
                            </div>
                          );
                        } 
                        
                        else if (item.message == "url content") {
                          return (
                            <div class="ch-msg ch-left ch-leftdoc d-flex align-items-center">
                              <div
                                onClick={() => window.open(item.chatContent)}
                                className="chat-image"
                              >
                                {" "}
                                {/* <a href={item.chatContent} download> */}
                                <img src={item.chatContent} />
                                {/* </a> */}
                              </div>
                              <span class="cdate ctadadoc text-dark">
                                {item.chatTime}
                              </span>
                            </div>
                          );
                        } 
                        
                        else {
                          return (
                            <div class="ch-msg ch-left d-flex align-items-center">
                              <div class="cdata">
                                <p>{item.chatContent}</p>
                              </div>
                              <span class="cdate text-dark">
                                {item.chatTime}
                              </span>
                            </div>
                          );
                        }
                      }
                    })}
                  </div>
                  {/* }
                      </div>
                    )}
                  </DropZone> */}

                  <div class="chat-footer">
                    <div class="d-flex bg-white rounded py-2 px-2 justify-content-between align-items-center">
                      {this.state.preview == true && (
                        <div className="uimg position-relative">
                          <span className="close" onClick={this.removePicture}>
                            &times;
                          </span>
                          <img
                            src={this.state.imagePreviewUrl}
                            alt=" "
                            className="img-fluid"
                            style={{ height: 60, objectFit: "contain" }}
                          />
                        </div>
                      )}
                      <input
                        id="ChatContent"
                        type="text"
                        class="form-control border-0 rounded-0 shadow-none"
                        placeholder="Type Your Message"
                        onChange={this.handleChatContent}
                        onKeyPress={this.handleKeyPress}
                      />
                      <div class="d-flex align-items-center">
                        <label for="filepin" class="btn btn-link mb-0 pr-0">
                          <Paperclip color="#777" />
                        </label>
                        <input
                          type="file"
                          hidden
                          id="filepin"
                          onChange={this.picChange}
                        />
                        <Plane color="#777" onClick={this.both} />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </section>
    );
  }
}
