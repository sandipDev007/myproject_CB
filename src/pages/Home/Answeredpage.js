/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
import React from "react";
import "./App.css";
import { Container, Row, Col, Modal, Form } from "react-bootstrap";
import LogHeader from "../../component/loginheader";
import Footer from "../../component/footer";
import axios from "axios";
import { API_URL } from "../../component/url";
import { Link } from "react-router-dom";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import ReadMoreReact from "read-more-react";
import $ from "jquery";
import Dots from "react-ionicons/lib/MdMore";
import Edit from "react-ionicons/lib/MdCreate";
import Delete from "react-ionicons/lib/MdTrash";
import swal from "sweetalert";

class Answered extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedQues: [],
      Question: " ",
      comment: "",
      answerset: [],
      show: false,
      commentModal: false,
      stateModal1: "block",
      answerID: ""
    };
  }

  handleComment = async (event, aId) => {
    // const re = /^\S*$/;
    // const re1 = /^[^.\s]/;
    // if (re.test(event.target.value) || re1.test(event.target.value)) {
    await this.setState({ comment: event.target.value.trim() });
    console.log(this.state.comment);
    if (this.state.comment != "") {
      $('#' + aId + 'button').prop('disabled', false);
    }
    else {
      $('#' + aId + 'button').prop('disabled', true);
    }
    //}
  };

  handleReport = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  usercommentSubmit = async aId => {
    const obj = {
      comment: this.state.comment,
      user_id: localStorage.getItem("user_id"),
      question_id: localStorage.getItem("qId"),
      id: aId
    };
    var notes = this.refs.notes;
    notes.value = " ";

    this.setState({ comment: "", isLoading: true });
    $('#' + aId + 'button').prop('disabled', true);
    await axios
      .post(API_URL + "addComments", obj, {
        header: {
          "content-Type": "application/json"
        }
      })
      .then(response => {
        this.setState({ isLoading: false, comment: "" });
        this.getAnswer();
      })
      .catch(error => {
        this.setState({ isLoading: false, comment: "" });
      });
  };

  componentDidMount = async () => {
    if (
      localStorage.getItem("token") == null &&
      localStorage.getItem("user_id") == null
    ) {
      this.props.history.push("/");
    }

    function storageChange(event) {
      if (event.key === 'logged_in') {
        alert('Logged in: ' + event.newValue)
        window.location.reload(false);


      }
    }
    window.addEventListener('storage', storageChange, false)



    this.setState({ isLoading: true });
    let body = new FormData();
    body.append("question_id", localStorage.getItem("qId"));

    axios({
      url: API_URL + "Questions/relatedQuestions",
      method: "POST",
      data: body
    })
      .then(response => {
        console.log(response);

        this.setState({
          relatedQues: response.data
        });

        this.setState({ isLoading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
      });

    axios({
      url: API_URL + "Questions/",
      method: "POST",
      data: body
    })
      .then(response => {
        console.log(response);

        this.setState({
          Question: response.data
        });
        this.setState({ isLoading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
      });

    axios({
      url: API_URL + "viewsCount",
      method: "POST",
      data: body
    }).then(response => {
      console.log(response);
    });

    this.getAnswer();
  };

  getAnswer = async (aId) => {
    let body = new FormData();
    body.append("question_id", localStorage.getItem("qId"));
    body.append("user_id", localStorage.getItem("user_id"));
    body.append("offset", "");

    axios({
      url: API_URL + "Answer/",
      method: "POST",
      data: body
    })
      .then(async response => {
        await localStorage.setItem("aId", response.data[0].id);

        await this.setState({
          answerset: response.data,
        });
        this.setState({ isLoading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  };

  getquestionId = qId => {
    localStorage.setItem("qId", qId);
    let body = new FormData();
    body.append("question_id", localStorage.getItem("qId"));

    axios({
      url: API_URL + "Questions/",
      method: "POST",
      data: body
    })
      .then(response => {
        this.setState({
          Question: response.data
        });
        this.setState({ isLoading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
      });
    this.getAnswer();
  };

  handleKeyPress = (event, aId) => {
    if (event.key === "Enter" && this.state.comment != "") {
      console.log("enter press here! ");
      this.usercommentSubmit(aId);
    }
  };
  handleClose = () => {
    this.setState({
      show: false,
      issuetype: "",
      feedback: ""
    });
  };
  handleShow = async (aId) => {
    console.log(aId)
    await this.setState({
      show: true,
      stateModal1: "none",
      answerID: aId
    });
  };
  reportSubmit = async () => {
    let body = new FormData();
    body.append("issueType", this.state.issuetype);
    body.append("issueComment", this.state.feedback);
    body.append("user_id", localStorage.getItem("user_id"));
    body.append("question_id", localStorage.getItem("qId"));
    body.append("answer_id", this.state.answerID);
    axios({
      url: API_URL + "reportAbuse",
      method: "POST",
      data: body
    })
      .then(async response => {
        toast.info("Report Submitted Successfully!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2200
        });
        this.handleClose();
      })
      .catch(error => {
        toast.error("You have already reported of this answer", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2200
        });
        this.handleClose();
      });
  };

  getuserId = async (user_id, row_id) => {
    localStorage.setItem("uId", user_id);
    localStorage.setItem("shower_id", row_id);
    window.open("/viewProfile", "_blank");
  };

  GetuserId = async (user_id, row_id) => {
    localStorage.setItem("uId", user_id);
    localStorage.setItem("shower_id", row_id);
    window.open("/viewuserProfile", "_blank");
  };

  likeColor = async (aId) => {

    const obj1 = {
      user_id: localStorage.getItem("user_id"),
      question_id: localStorage.getItem("qId"),
      answer_id: aId
    };
    await axios
      .post(API_URL + "Answer/answerLike", obj1, {
        header: {
          "content-Type": "application/json"
        }
      })
      .then(response => {
        $("#" + aId + "like").toggleClass("actv_blue");
        this.getAnswer(aId);
      })
      .catch(error => {
      });

  }
  commentDelete = async (aId, cId) => {
    console.log(aId, cId)
    let body = new FormData();
    body.append("answer_id", aId);
    body.append("comment_id", cId);
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: "warning",
      buttons: true,
      //dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        axios({
          url: API_URL + "deletecomment",
          method: "POST",
          data: body
        }).then(response => {
          swal("Comment is deleted!");
          this.getAnswer();
        });
      }
    });
  }

  commentClose = () => {
    this.setState({
      commentModal: false,
      comment: ""
    });
  };

  commentShow = async (aId, cId) => {
    await this.setState({
      commentModal: true,
    });
    let body = new FormData();
    body.append("answer_id", aId);
    body.append("comment_id", cId);
    axios.post(API_URL + "getcomment", body).then(async res => {
      await this.setState({
        comment: res.data[0].Comment
      });
    });
  };

  editComment = async (aId, cId) => {
    let body = new FormData();
    body.append("answer_id", aId);
    body.append("comment_id", cId);
    body.append("comment", this.state.comment);
    axios({
      url: API_URL + "editcomment",
      method: "POST",
      data: body
    }).then(response => {
      this.setState({
        commentModal: false,
        comment: ""
      });
      this.getAnswer();
    });
  }

  render() {
    return (
      <div className="apps-main">
        <div>
          <LogHeader />
        </div>
        <Container fluid className="mainbody">
          <Row>
            <Col md={9} className="pl-md-0">
              <div className="d-flex">
                <div className="centerbody answarbody">
                  <div className="innerans py-3 pl-4">
                    <h3 className="mb-1">Questions & Answers</h3>
                    <h4>{this.state.Question}</h4>
                    {this.state.answerset.map((value, index) => {
                      if (localStorage.getItem("user_id") != value.user_id) {
                        if (value.Token != "N") {
                          if (value.like_status == "true") {
                            $("#" + value.id + "like").addClass("actv_blue");
                          }
                          else {
                            $("#" + value.id + "like").removeClass("actv_blue");
                          }
                          return (
                            <div className="ans-post">
                              <div className="d-flex">
                                <span className="thumbnail">
                                  <img
                                    src={value.user_image}
                                    alt="pic"
                                    className="img-fluid"
                                  />
                                </span>
                                <div className="a-cont link-hover">
                                  <div className="d-flex justify-content-between">
                                    <h6 className="mb-0 pt-1">
                                      <Link>
                                        <p
                                          onClick={(uId, shower_id) =>
                                            this.getuserId(
                                              value.user_id,
                                              value.row_id
                                            )
                                          }
                                        >
                                          <strong>
                                            <h6>{value.name}</h6>
                                          </strong>
                                        </p>
                                      </Link>
                                    </h6>
                                    <button
                                      className="btn btn-link py-0"
                                      onClick={() => this.handleShow(value.id)}
                                    >
                                      Report{" "}
                                      <img
                                        src={require("../../assest/images/file.png")}
                                        style={{ width: "16px" }}
                                      />
                                    </button>
                                  </div>
                                  <Modal
                                    show={this.state.show}
                                    onHide={this.handleClose}
                                  >
                                    <Modal.Header closeButton>
                                      <Modal.Title>
                                        <img
                                          src={require("../../assest/images/file.png")}
                                        />{" "}
                                        Report Abuse
                                      </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                      <p className="text-dark">
                                        Flagged content is reviewed by ConnectBud
                                        staff to determine whether it violates
                                        Terms of Service or Community Guidelines.
                                        If you have a question or technical issue,
                                        please contact our Support team
                                      </p>
                                      <div className="form-group">
                                        <label className="d-block">
                                          Select issue
                                        </label>
                                        <select
                                          className="form-control"
                                          name="issuetype"
                                          as="select"
                                          value={this.state.issuetype}
                                          onChange={this.handleReport}
                                        >
                                          <option value="" disabled selected>
                                            --select one--
                                          </option>
                                          <option>Inappropriate Content</option>
                                          <option>
                                            Harassment or Threatening
                                          </option>
                                          <option>Spammy Content</option>
                                          <option>
                                            Hateful or Abusive Content
                                          </option>
                                          <option>
                                            ConnectBud Policy Violation
                                          </option>
                                          <option>Something Else</option>
                                        </select>
                                      </div>
                                      <div className="form-group">
                                        <Form.Control
                                          name="feedback"
                                          as="textarea"
                                          rows="3"
                                          placeholder="Write your Comment"
                                          value={this.state.feedback}
                                          onChange={this.handleReport}
                                        />
                                      </div>
                                      <div className="form-group d-flex justify-content-end">
                                        <button
                                          className="btn btn-info rounded-pill px-4 ml-2"
                                          onClick={this.handleClose}
                                        >
                                          Cancel
                                        </button>
                                        <button
                                          className="btn btn-theme rounded-pill px-4 ml-2"
                                          disabled={!this.state.issuetype}
                                          onClick={this.reportSubmit}
                                        >
                                          Submit
                                        </button>
                                      </div>
                                    </Modal.Body>
                                  </Modal>
                                  {/* <small> */}
                                    <p>{value.answer_time_new}</p>
                                    <br />
                                  {/* </small> */}
                                  {/* <p className="mb-0">
                                  <h6>{localStorage.getItem("collName")}</h6>
                                </p> */}

                                  <div className="pl-0">
                                    {value.answer}
                                    <br />
                                    <br />
                                  </div>

                                  <div className="likem border-0">
                                    <ul className="list-inline list-unstyled d-flex justify-content-end mb-0">
                                      <li></li>
                                    </ul>
                                  </div>

                                  {value.comments
                                    ? value.comments.map((data, index) => {
                                      if (data.flag == "Y") {
                                        return (
                                          <div className="form-group border rounded reply-section px-4 py-3">
                                            <div className="d-flex border-btn pb-0">
                                              <span className="thumbnail sm">
                                                <img
                                                  src={data.user_image}
                                                  alt="pic"
                                                  className="img-fluid"
                                                />
                                              </span>

                                              <div className="a-cont r-cont link-hover">
                                                <p className="">
                                                  <Link>
                                                    <p
                                                      onClick={(
                                                        uId,
                                                        shower_id
                                                      ) =>
                                                        this.getuserId(
                                                          data.user_id,
                                                          data.row_id
                                                        )
                                                      }
                                                    >

                                                      {data.userName}

                                                    </p>
                                                  </Link>
                                                </p>

                                                <p>{data.comment_time_new}</p>
                                                <p className="my-2">
                                                  {data.comment}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      }
                                        if (localStorage.getItem("user_id") == data.user_id) {
                                        return (
                                          <div className="form-group border rounded reply-section px-4 py-3">
                                            <div className="d-flex border-btn pb-0">
                                              <span className="thumbnail sm">
                                                <img
                                                  src={data.user_image}
                                                  alt="pic"
                                                  className="img-fluid"
                                                />
                                              </span>

                                              <div className="a-cont r-cont link-hover">
                                                <p className="">
                                                  <Link>
                                                    <p style={{ display: "inline-block" }}
                                                      onClick={(
                                                        uId,
                                                        shower_id
                                                      ) =>
                                                        this.GetuserId(
                                                          data.user_id,
                                                          data.row_id
                                                        )
                                                      }
                                                    >

                                                      {data.userName}

                                                    </p>
                                                  </Link>
                                                  <div className="margin-img">
                                                    <a href="#"><Dots></Dots></a>
                                                    <div className="action-drop">

                                                      <button
                                                        className="btn btn-link py-0"
                                                        onClick={() => this.commentShow(value.id, data.commentId)}
                                                      >
                                                        <Edit></Edit>
                                                        Edit
                                                      </button>

                                                      <button
                                                        className="btn btn-link py-0"
                                                        onClick={() => this.commentDelete(value.id, data.commentId)}
                                                      >
                                                        <Delete></Delete>
                                                        Delete
                                                      </button>

                                                    </div>
                                                  </div>
                                                </p>

                                                <p>{data.comment_time_new}</p>
                                                <p className="my-2">
                                                  {data.comment}
                                                </p>
                                              </div>
                                            </div>
                                            <Modal
                                              show={this.state.commentModal}
                                              onHide={this.commentClose}
                                            >
                                              <Modal.Header closeButton>
                                                <Modal.Title>
                                                  {/* <img
                                                        src={require("../../assest/images/file.png")}
                                                        />{" "} */}
                                                  Edit Comment
                                                  </Modal.Title>
                                              </Modal.Header>
                                              <Modal.Body>
                                                {/* <p className="text-dark">
                                                          Flagged content is reviewed by ConnectBud
                                                          staff to determine whether it violates
                                                          Terms of Service or Community Guidelines.
                                                          If you have a question or technical issue,
                                                          please contact our Support team
                                                        </p> */}
                                                <div className="form-group">
                                                  {/* <label className="d-block">
                                                        Edit Answer
                                                        </label> */}
                                                </div>
                                                <div className="form-group">
                                                  <Form.Control
                                                    //name="comment"
                                                    as="textarea"
                                                    rows="4"
                                                    placeholder="Update your comment..."
                                                    value={this.state.comment}
                                                    onChange={this.handleComment}
                                                  />
                                                </div>
                                                <div className="form-group d-flex justify-content-end">
                                                  <button
                                                    className="btn btn-info rounded-pill px-4 ml-2"
                                                    onClick={this.commentClose}
                                                  >
                                                    Cancel
                                                    </button>
                                                  <button
                                                    className="btn btn-theme rounded-pill px-4 ml-2"
                                                    onClick={() => this.editComment(value.id, data.commentId)}
                                                    disabled={!this.state.comment}
                                                  >
                                                    Update
                                                    </button>
                                                </div>
                                              </Modal.Body>
                                            </Modal>
                                          </div>
                                        );
                                      }
                                      else {
                                        return (
                                          <div className="form-group border rounded reply-section px-4 py-3">
                                            <div className="d-flex border-btn pb-0">
                                              <span className="thumbnail sm">
                                                <img
                                                  src={data.user_image}
                                                  alt="pic"
                                                  className="img-fluid"
                                                />
                                              </span>
                                    
                                              <div className="a-cont r-cont link-hover">
                                                <p className="">
                                                  <Link>
                                                    <p
                                                      onClick={(
                                                        uId,
                                                        shower_id
                                                      ) =>
                                                        this.GetuserId(
                                                          data.user_id,
                                                          data.row_id
                                                        )
                                                      }
                                                    >
                                    
                                                      {data.userName}
                                    
                                                    </p>
                                                  </Link>
                                                </p>
                                    
                                                <p>{data.comment_time_new}</p>
                                                <p className="my-2">
                                                  {data.comment}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      }
                                    })
                                    : null
                                  }

                                  <ul className="com-lsec">

                                    <li id={value.id + "like"} onClick={() => this.likeColor(value.id)}><i class="fa fa-thumbs-up" />
                                      <sup>{value.like}</sup>Like </li>


                                    {/* <li id="dislike" onClick={this.dislikeColor}><i class="fa fa-thumbs-o-down" /><sup>1</sup> Dislike</li> */}
                                    <li id="comment" ><i className="fa fa-commenting-o" /><sup>{value.comment_count}</sup>Comments </li>

                                  </ul>

                                  <div className="form-group d-flex justify-content-between align-items-center border ml-left rounded bg-white">
                                    <input
                                      ref="notes"
                                      type="text"
                                      className="form-control form-control-lg border-0"
                                      placeholder="Post Your comment"
                                      onChange={(e) => this.handleComment(e, value.id)}
                                      onKeyPress={(event) => this.handleKeyPress(event, value.id)}
                                      rows={1}
                                      cols={1}
                                    />
                                    <button id={value.id + "button"}
                                      className="btn btn-link post-btn"
                                      type="button"
                                      //disabled={true}
                                      disabled={this.state.comment == "" ? true : false}
                                      onClick={() =>
                                        this.usercommentSubmit(value.id)
                                      }
                                    >
                                      Comment
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }

                        else {
                          // return (
                          //   <div className="ans-post">
                          //     <div className="d-flex">
                          //       <span className="thumbnail">
                          //         <img
                          //           src={value.user_image}
                          //           alt="pic"
                          //           className="img-fluid"
                          //         />
                          //       </span>
                          //       <div className="a-cont link-hover">
                          //         <div className="d-flex justify-content-between">
                          //           <h6 className="mb-0 pt-1">
                          //             <Link>
                          //               <p
                          //                 onClick={(uId, shower_id) =>
                          //                   this.getuserId(
                          //                     value.user_id,
                          //                     value.row_id
                          //                   )
                          //                 }
                          //               >
                          //                 <strong>
                          //                   <h6>{value.name}</h6>
                          //                 </strong>
                          //               </p>
                          //             </Link>
                          //           </h6>
                          //           <button
                          //             className="btn btn-link py-0"
                          //             onClick={() => this.handleShow(value.id)}
                          //           >
                          //             Report{" "}
                          //             <img
                          //               src={require("../../assest/images/file.png")}
                          //               style={{ width: "16px" }}
                          //             />
                          //           </button>
                          //         </div>
                          //         <Modal
                          //           show={this.state.show}
                          //           onHide={this.handleClose}
                          //         >
                          //           <Modal.Header closeButton>
                          //             <Modal.Title>
                          //               <img
                          //                 src={require("../../assest/images/file.png")}
                          //               />{" "}
                          //               Report Abuse
                          //             </Modal.Title>
                          //           </Modal.Header>
                          //           <Modal.Body>
                          //             <p className="text-dark">
                          //               Flagged content is reviewed by ConnectBud
                          //               staff to determine whether it violates
                          //               Terms of Service or Community Guidelines.
                          //               If you have a question or technical issue,
                          //               please contact our Support team
                          //             </p>
                          //             <div className="form-group">
                          //               <label className="d-block">
                          //                 Select issue
                          //               </label>
                          //               <select
                          //                 className="form-control"
                          //                 name="issuetype"
                          //                 as="select"
                          //                 value={this.state.issuetype}
                          //                 onChange={this.handleReport}
                          //               >
                          //                 <option value="" disabled selected>
                          //                   --select one--
                          //                 </option>
                          //                 <option>Inappropriate Content</option>
                          //                 <option>
                          //                   Harassment or Threatening
                          //                 </option>
                          //                 <option>Spammy Content</option>
                          //                 <option>
                          //                   Hateful or Abusive Content
                          //                 </option>
                          //                 <option>
                          //                   ConnectBud Policy Violation
                          //                 </option>
                          //                 <option>Something Else</option>
                          //               </select>
                          //             </div>
                          //             <div className="form-group">
                          //               <Form.Control
                          //                 name="feedback"
                          //                 as="textarea"
                          //                 rows="3"
                          //                 placeholder="Write your Comment"
                          //                 value={this.state.feedback}
                          //                 onChange={this.handleReport}
                          //               />
                          //             </div>
                          //             <div className="form-group d-flex justify-content-end">
                          //               <button
                          //                 className="btn btn-info rounded-pill px-4 ml-2"
                          //                 onClick={this.handleClose}
                          //               >
                          //                 Cancel
                          //               </button>
                          //               <button
                          //                 className="btn btn-theme rounded-pill px-4 ml-2"
                          //                 onClick={this.reportSubmit}
                          //               >
                          //                 Submit
                          //               </button>
                          //             </div>
                          //           </Modal.Body>
                          //         </Modal>
                          //         {/* <small> */}
                          //           <p>{value.answer_time_new}</p>
                          //         {/* </small> */}
                          //         <br />
                          //         {/* <p className="mb-0">
                          //         <h6>{localStorage.getItem("collName")}</h6>
                          //       </p> */}

                          //         <div className="pl-0">
                          //           {value.answer}
                          //           <br />
                          //           <br />
                          //         </div>


                          //         <div className="likem border-0">
                          //           <ul className="list-inline list-unstyled d-flex justify-content-end mb-0">
                          //             <li></li>
                          //           </ul>
                          //         </div>

                          //         {value.comments
                          //           ? value.comments.map((data, index) => {
                          //             if (data.flag == "Y") {
                          //               return (
                          //                 <div className="form-group border rounded reply-section px-4 py-3">
                          //                   <div className="d-flex border-btn pb-0">
                          //                     <span className="thumbnail sm">
                          //                       <img
                          //                         src={data.user_image}
                          //                         alt="pic"
                          //                         className="img-fluid"
                          //                       />
                          //                     </span>

                          //                     <div className="a-cont r-cont link-hover">
                          //                       <p className="">
                          //                         <Link>
                          //                           <p
                          //                             onClick={(
                          //                               uId,
                          //                               shower_id
                          //                             ) =>
                          //                               this.getuserId(
                          //                                 data.user_id,
                          //                                 data.row_id
                          //                               )
                          //                             }
                          //                           >

                          //                             {data.userName}

                          //                           </p>
                          //                         </Link>
                          //                       </p>

                          //                       <p>{data.comment_time_new}</p>
                          //                       <p className="my-2">
                          //                         {data.comment}
                          //                       </p>
                          //                     </div>
                          //                   </div>
                          //                 </div>
                          //               );
                          //             } 
                          //             if (localStorage.getItem("user_id") == data.user_id) {
                          //               return (
                          //                 <div className="form-group border rounded reply-section px-4 py-3">
                          //                   <div className="d-flex border-btn pb-0">
                          //                     <span className="thumbnail sm">
                          //                       <img
                          //                         src={data.user_image}
                          //                         alt="pic"
                          //                         className="img-fluid"
                          //                       />
                          //                     </span>

                          //                     <div className="a-cont r-cont link-hover">
                          //                       <p className="">
                          //                         <Link>
                          //                           <p style={{ display: "inline-block" }}
                          //                             onClick={(
                          //                               uId,
                          //                               shower_id
                          //                             ) =>
                          //                               this.GetuserId(
                          //                                 data.user_id,
                          //                                 data.row_id
                          //                               )
                          //                             }
                          //                           >

                          //                             {data.userName}

                          //                           </p>
                          //                         </Link>
                          //                         <div className="margin-img">
                          //                           <a href="#"><Dots></Dots></a>
                          //                           <div className="action-drop">

                          //                             <button
                          //                               className="btn btn-link py-0"
                          //                               onClick={() => this.commentShow(value.id, data.commentId)}
                          //                             >
                          //                               <Edit></Edit>
                          //                               Edit
                          //                             </button>

                          //                             <button
                          //                               className="btn btn-link py-0"
                          //                               onClick={() => this.commentDelete(value.id, data.commentId)}
                          //                             >
                          //                               <Delete></Delete>
                          //                               Delete
                          //                             </button>

                          //                           </div>
                          //                         </div>
                          //                       </p>

                          //                       <p>{data.comment_time_new}</p>
                          //                       <p className="my-2">
                          //                         {data.comment}
                          //                       </p>
                          //                     </div>
                          //                   </div>
                          //                   <Modal
                          //                       show={this.state.commentModal}
                          //                       onHide={this.commentClose}
                          //                     >
                          //                       <Modal.Header closeButton>
                          //                         <Modal.Title>
                          //                           {/* <img
                          //                               src={require("../../assest/images/file.png")}
                          //                               />{" "} */}
                          //                           Edit Comment
                          //                         </Modal.Title>
                          //                       </Modal.Header>
                          //                       <Modal.Body>
                          //                         {/* <p className="text-dark">
                          //                                 Flagged content is reviewed by ConnectBud
                          //                                 staff to determine whether it violates
                          //                                 Terms of Service or Community Guidelines.
                          //                                 If you have a question or technical issue,
                          //                                 please contact our Support team
                          //                               </p> */}
                          //                         <div className="form-group">
                          //                           {/* <label className="d-block">
                          //                               Edit Answer
                          //                               </label> */}
                          //                         </div>
                          //                         <div className="form-group">
                          //                           <Form.Control
                          //                             //name="comment"
                          //                             as="textarea"
                          //                             rows="4"
                          //                             placeholder="Update your comment..."
                          //                             value={this.state.comment}
                          //                             onChange={this.handleComment}
                          //                           />
                          //                         </div>
                          //                         <div className="form-group d-flex justify-content-end">
                          //                           <button
                          //                             className="btn btn-info rounded-pill px-4 ml-2"
                          //                             onClick={this.commentClose}
                          //                           >
                          //                             Cancel
                          //                           </button>
                          //                           <button
                          //                             className="btn btn-theme rounded-pill px-4 ml-2"
                          //                             onClick={() => this.editComment(value.id, data.commentId)}
                          //                             disabled={!this.state.comment}
                          //                           >
                          //                             Update
                          //                           </button>
                          //                         </div>
                          //                       </Modal.Body>
                          //                     </Modal>
                          //                 </div>
                          //               );
                          //             }
                          //             else {
                          //               return (
                          //                 <div className="form-group border rounded reply-section px-4 py-3">
                          //                   <div className="d-flex border-btn pb-0">
                          //                     <span className="thumbnail sm">
                          //                       <img
                          //                         src={data.user_image}
                          //                         alt="pic"
                          //                         className="img-fluid"
                          //                       />
                          //                     </span>
                                    
                          //                     <div className="a-cont r-cont link-hover">
                          //                       <p className="">
                          //                         <Link>
                          //                           <p
                          //                             onClick={(
                          //                               uId,
                          //                               shower_id
                          //                             ) =>
                          //                               this.GetuserId(
                          //                                 data.user_id,
                          //                                 data.row_id
                          //                               )
                          //                             }
                          //                           >
                                    
                          //                             {data.userName}
                                    
                          //                           </p>
                          //                         </Link>
                          //                       </p>
                                    
                          //                       <p>{data.comment_time_new}</p>
                          //                       <p className="my-2">
                          //                         {data.comment}
                          //                       </p>
                          //                     </div>
                          //                   </div>
                          //                 </div>
                          //               );
                          //             }
                          //           })
                          //           : null
                          //         }

                          //         <ul className="com-lsec">

                          //           <li id={value.id + "like"} onClick={() => this.likeColor(value.id)}><i class="fa fa-thumbs-up" />
                          //             <sup>{value.like}</sup>Like </li>


                          //           {/* <li id="dislike" onClick={this.dislikeColor}><i class="fa fa-thumbs-o-down" /><sup>1</sup> Dislike</li> */}
                          //           <li id="comment"><i className="fa fa-commenting-o" /><sup>{value.comment_count}</sup>Comments </li>

                          //         </ul>

                          //         <div className="form-group d-flex justify-content-between align-items-center border ml-left rounded bg-white">
                          //           <input
                          //             ref="notes"
                          //             type="text"
                          //             className="form-control form-control-lg border-0"
                          //             placeholder="Post Your comment"
                          //             onChange={(e) => this.handleComment(e, value.id)}
                          //             onKeyPress={(event) => this.handleKeyPress(event, value.id)}
                          //             rows={1}
                          //             cols={1}
                          //           />
                          //           <button id={value.id + "button"}
                          //             className="btn btn-link post-btn"
                          //             type="button"
                          //             disabled={true}
                          //             onClick={() =>
                          //               this.usercommentSubmit(value.id)
                          //             }
                          //           >
                          //             Comment
                          //           </button>
                          //         </div>
                          //       </div>
                          //     </div>
                          //   </div>
                          // );
                        }

                      }
                    })}

                    {/* end of ans post */}
                  </div>
                </div>
              </div>
            </Col>
            <Col md={3} className="pr-md-0">
              <div className="rightsidebar">
                <div className="toppan py-3 px-4">
                  <h2>Similar questions</h2>
                </div>
                {this.state.relatedQues.map((value, index) => {
                  if (index < 5)
                    return (
                      <div className="ques">
                        <Link to="/Answeredpage" target="_blank">
                          <p
                            onClick={() =>
                              this.getquestionId(value.question_id)
                            }
                          >
                            <ReadMoreReact
                              text={value.question}
                              min={30}
                              ideal={80}
                              max={500}
                              readMoreText="read more"
                            />
                          </p>
                        </Link>
                      </div>
                    );
                })}
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
export default Answered;