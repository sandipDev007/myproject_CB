/* eslint-disable no-redeclare */
import React from "react";
import "./tags.css";
import { Container, Tab, Nav } from "react-bootstrap";
import Header from "../../component/tagsheader";
import Footer from "../../component/footer";
import axios from "axios";
import { API_URL } from "../../component/url";
import base64 from "base-64";

class Tags extends React.Component {
  constructor() {
    super();
    this.state = {
      option: "",
      isDisabled: true,
      checked: true,
      buttonstate: true,
      userData: [],
      userId: "",
      keyGen: [],
      usersortData: [],
      userID: "",
      linkData: []
    };
  }

  async updateStateList(e, value) {
    console.log(value);
    localStorage.setItem("tagId", value);

    if (e.target.checked === true) {
      var element = document.getElementById(value);
      element.classList.add("box");
      await this.setState({
        keyGen: this.state.keyGen.concat([value])
      });
    } else {
      var element = document.getElementById(value);
      element.classList.remove("box");
      await this.setState({
        keyGen: this.state.keyGen.filter(function(val) {
          return val !== value;
        })
      });
    }
    if (this.state.keyGen.length > 2 && this.state.keyGen.length < 11) {
      this.setState({
        buttonstate: false
      });
      console.log(this.state.keyGen);
    } else {
      console.log(this.state.keyGen);
      this.setState({
        buttonstate: true
      });
    }
  }

  async sortStateList(e, value) {
    console.log(value);
    localStorage.setItem("tagId", value);

    if (e.target.checked === true) {
      var element = document.getElementById("sort" + value);
      element.classList.add("box");
      await this.setState({
        keyGen: this.state.keyGen.concat([value])
      });
    } else {
      var element = document.getElementById("sort" + value);
      element.classList.remove("box");
      await this.setState({
        keyGen: this.state.keyGen.filter(function(val) {
          return val !== value;
        })
      });
    }
    if (this.state.keyGen.length > 2 && this.state.keyGen.length < 11) {
      this.setState({
        buttonstate: false
      });
      console.log(this.state.keyGen);
    } else {
      console.log(this.state.keyGen);
      this.setState({
        buttonstate: true
      });
    }
  }

  handleSubmit = async () => {
    localStorage.setItem("tagId", this.state.keyGen);
    const body1 = {
      user_id: this.state.userID
    };
    axios.post(API_URL + "auth/emailverification", body1).then(res => {
      this.setState({
        linkData: res.data[0]
      });
      localStorage.setItem("token", this.state.linkData.Token);
      const body = {
        tagId: this.state.keyGen.toString(),
        user_id: this.state.userID,

        Flag: "",
        id: "",

        name: this.state.linkData.Name,
        college: "",
        department: "",
        expertise: "",
        country: "",
        about: "",

        title: "",
        type: "",
        institute: "",
        institute_logo: "",
        location: "",
        startDate: "",
        endDate: "",

        community: "",
        city: "",

        paypal_id: "",
        interests: "",
        message: "",
        edit_type: "",
        login_type: this.state.linkData.login_type
      };

      //console.log(body);
      axios.post(API_URL + `Tags/`, body).then(response => {
        localStorage.setItem("Id", response.data[0].id);

        this.props.history.push("/App");
        //console.log(response.data.tagname);

        //localStorage.setItem("taglist", response.data.tagname);
      });
    });
  };
  componentWillMount = async () => {
    const url = window.location.href.split("?")[1];
    const encoded = url;
    this.state.userID = base64.decode(encoded);
    localStorage.setItem("user_id", this.state.userID);

    axios.get(API_URL + "Tags/list").then(async res => {
      await this.setState({
        userData: res.data
      });
    });
  };

  componentDidMount = async () => {
    if (
      localStorage.getItem("token") == null &&
      localStorage.getItem("user_id") == null
    ) {
      this.props.history.push("/urlblocker");
    }

    const url = window.location.href.split("?")[1];
    const encoded = url;
    this.state.userID = base64.decode(encoded);
    localStorage.setItem("user_id", this.state.userID);

    axios.get(API_URL + "Tags/list").then(async res => {
      await this.setState({
        usersortData: res.data.sort(function(a, b) {
          if (a.tagName < b.tagName) return -1;
          else if (a.tagName > b.tagName) return 1;
          return 0;
        })
      });
    });
    const obj = {
      user_id: localStorage.getItem("user_id")
    };

    this.setState({ isLoading: true });
    await axios
      .post(API_URL + "tag_count_confirmation", obj, {
        header: {
          "content-Type": "application/json"
        }
      })
      .then(response => {
        console.log(response);
        if (
          response.data[0].tagStatus == "Y" &&
          localStorage.getItem("token") != null
        ) {
          console.log("if block called");

          this.props.history.push("/App");
        } else if (
          response.data[0].tagStatus == "Y" &&
          localStorage.getItem("token") == null
        ) {
          console.log("else part called");
          localStorage.clear();

          this.props.history.push("/signin");
        } else {
        }
      })
      .catch(error => {});
  };

  render() {
    return (
      <div className="tags-main">
        <div>
          <Header />
        </div>
        <Container fluid className="mainbody">
          <div className="top-head">
            <h2>Select the Interests</h2>
          </div>

          <Tab.Container id="tabs-connect" defaultActiveKey="first">
            <div className="d-flex justify-content-between align-items-center tabs-connect mb-4">
              <Nav className="flex-row ">
                <Nav.Item>
                  <Nav.Link eventKey="first">All</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">US</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">India</Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
            <div className="d-flex justify-content-end pb-3">
              <button
                className="btn btn-outline-primary"
                type="submit"
                id="submitbutton"
                disabled={this.state.buttonstate}
                onClick={this.handleSubmit}
              >
                Continue
              </button>
            </div>
            <p className="list-text">
              <strong>
                {" "}
                <h5>Choose minimum 3 Topics to continue</h5>
              </strong>
            </p>
            <Tab.Content className="mt-3">
              <Tab.Pane eventKey="first">
                <ul className="list-unstyled pan-list">
                  {this.state.userData.map((item, index) => {
                    return (
                      <li key={item.tagID} id={item.tagID}>
                        <label className="chkbox d-flex">
                          <input
                            type="checkbox"
                            id={"cb" + item.tagID}
                            onClick={e => this.updateStateList(e, item.tagID)}
                          />
                          <div
                            className=" pl-2"
                            style={{ height: 200, width: 1500 }}
                          >
                            <h5>{item.tagName}</h5>
                            <p>{item.description}</p>
                          </div>
                        </label>
                      </li>
                    );
                  })}
                </ul>
                <div className="d-flex justify-content-end pb-3">
                  <button
                    className="btn btn-outline-primary"
                    type="submit"
                    id="submitbutton"
                    disabled={this.state.buttonstate}
                    onClick={this.handleSubmit}
                  >
                    Continue
                  </button>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <ul className="list-unstyled pan-list">
                  {this.state.usersortData.map((item, index) => {
                    if (item.country_ID == 0) {
                      return (
                        <li key={item.tagID} id={"sort" + item.tagID}>
                          <label className="chkbox d-flex">
                            <input
                              type="checkbox"
                              id={"cb" + item.tagID}
                              onClick={e => this.sortStateList(e, item.tagID)}
                            />
                            <div
                              className=" pl-2"
                              style={{ height: 200, width: 1500 }}
                            >
                              <h5>{item.tagName}</h5>
                              <p>{item.description}</p>
                            </div>
                          </label>
                        </li>
                      );
                    }
                  })}
                </ul>
                <div className="d-flex justify-content-end pb-3">
                  <button
                    className="btn btn-outline-primary"
                    type="submit"
                    id="submitbutton"
                    disabled={this.state.buttonstate}
                    onClick={this.handleSubmit}
                  >
                    Continue
                  </button>
                </div>
              </Tab.Pane>

              <Tab.Pane eventKey="third">
                <ul className="list-unstyled pan-list">
                  {this.state.usersortData.map((item, index) => {
                    if (item.country_ID == 1) {
                      return (
                        <li key={item.tagID} id={"sort" + item.tagID}>
                          <label className="chkbox d-flex">
                            <input
                              type="checkbox"
                              id={"cb" + item.tagID}
                              onClick={e => this.sortStateList(e, item.tagID)}
                            />
                            <div
                              className=" pl-2"
                              style={{ height: 200, width: 1500 }}
                            >
                              <h5>{item.tagName}</h5>
                              <p>{item.description}</p>
                            </div>
                          </label>
                        </li>
                      );
                    }
                  })}
                </ul>
                <div className="d-flex justify-content-end pb-3">
                  <button
                    className="btn btn-outline-primary"
                    type="submit"
                    id="submitbutton"
                    disabled={this.state.buttonstate}
                    onClick={this.handleSubmit}
                  >
                    Continue
                  </button>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Container>
        <div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Tags;
