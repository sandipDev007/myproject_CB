/* eslint-disable no-redeclare */
import React from "react";
import "./tags.css";
import { Container, Tab, Nav } from "react-bootstrap";
import LogHeader from "../../component/exheader";
import Footer from "../../component/exfooter";
import axios from "axios";
import { API_URL } from "../../component/url";
import $ from "jquery";

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
      tagData: []
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
    if (this.state.keyGen.length > 1 && this.state.keyGen.length < 11) {
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
    if (this.state.keyGen.length > 1 && this.state.keyGen.length < 11) {
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
    const body = {
      tagId: this.state.keyGen.toString(),
      user_id: localStorage.getItem("user_id"),
      Flag: "Y",
      id: localStorage.getItem("Id"),

      name: "",
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

      paypalId: "",
      interests: "",
      edit_type: "expertise",
      message: "edited"
    };

    await axios.post(API_URL + "Tags/", body);

    console.log(body);
    this.props.history.push("/ExpertProfileEdit");
  };
  componentWillMount = async () => {
    if (
      localStorage.getItem("token") == null &&
      localStorage.getItem("user_id") == null
    ) {
      this.props.history.push("/urlblocker");
    }
    await axios.get(API_URL + "Tags/list").then(async res => {
      await this.setState({
        userData: res.data
      });
    });
    this.getTags()
  }

  getsortTags = async () => {
    await axios.get(API_URL + "Tags/list").then(async res => {
        this.setState({
        usersortData: res.data.sort(function(a, b) {
          if (a.tagName < b.tagName) return -1;
          else if (a.tagName > b.tagName) return 1;
          return 0;
        })
      });
      await this.getTags()
    });

  }

  getTags = () => {
    const body = {
        tagId: "",
        user_id: localStorage.getItem("user_id"),
  
        Flag: "Y",
        id: localStorage.getItem("Id"),
  
        name: "",
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
  
        paypalId: "",
        interests: "",
        edit_type: "expertise",
        message: ""
      };

    
        axios.post(API_URL + `Tags/`, body).then(async response => {
        console.log(response.data[0].tagId)
        await this.setState({
          tagData: response.data[0].experttagId,
          keyGen: response.data[0].experttagId,
        });
        for (let i = 0; i < this.state.tagData.length; i++) {
          $("#cb" + this.state.tagData[i]).prop("checked", true);
          $("#scb" + this.state.tagData[i]).prop("checked", true);
          $("#" + this.state.tagData[i]).addClass("box")
          $("#sort" + this.state.tagData[i]).addClass("box")
        }
      })
    }
    back = () => {
      this.props.history.push("/ExpertProfileEdit");
    };

  render() {
    return (
      <div className="tags-main">
        <div>
          <LogHeader />
        </div>

        <Container fluid className="mainbody">
          <div className="top-head">
            <h2>Select the Experties</h2>
          </div>

          <Tab.Container id="tabs-connect" defaultActiveKey="first">
            <div className="d-flex justify-content-between align-items-center tabs-connect mb-4">
              <Nav className="flex-row ">
                <Nav.Item>
                  <Nav.Link eventKey="first">All</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second" onClick={this.getsortTags}>US</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third" onClick={this.getsortTags}>India</Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
            <p className="list-text">
              <strong>
                <h5>Choose minimum 2 Topics to continue</h5>
              </strong>
            </p>
            <Tab.Content className="mt-3">
              <Tab.Pane eventKey="first">
                <ul className="list-unstyled pan-list">
                  {this.state.userData.map((item, index) => {
                      return (
                        <li key={item.tagId} id={item.tagID}>
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
                    onClick={this.back}
                  >
                    Back
                  </button>
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
                    if(item.country_ID == 0){
                      return (
                        <li key={item.tagId} id={"sort" + item.tagID}>
                          <label className="chkbox d-flex">
                            <input
                              type="checkbox"
                              id={"scb" + item.tagID}
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
                    onClick={this.back}
                  >
                    Back
                  </button>
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
                    if(item.country_ID == 1 ){
                      return (
                        <li key={item.tagID} id={"sort" + item.tagID}>
                          <label className="chkbox d-flex">
                            <input
                              type="checkbox"
                              id={"scb" + item.tagID}
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
                    onClick={this.back}
                  >
                    Back
                  </button>
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
