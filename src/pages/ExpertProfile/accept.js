/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./style.css";
import { Container, Navbar } from "react-bootstrap";
//import Footer from "../../component/footer";
import swal from "sweetalert";
import axios from "axios";
import { API_URL } from "../../component/url";
import base64 from "base-64";

class Accept extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        userid: ""
    };
  }

  componentDidMount = async () => {
    const url = window.location.href.split("?")[1];
    var encoded = url;
    this.state.userid = base64.decode(encoded);
    console.log(this.state.userid);
  };

  handleVerified = async () => {
    const body = {
      user_id: this.state.userid,
      type: "yes"
    };

        await axios.post(API_URL + "counselorVerification", body).then(async res => {

        if (res.data[0].message == "User verified as a Counselor") {
        swal("Thanks!", "You have successfully verified the user as a counselor", "success");
        window.open("/", "_self");
       }
     });
  }

  handleUnverified = async () => {
    const body = {
      user_id: this.state.userid,
      type: "no"
    };

     await axios.post(API_URL + "counselorVerification", body).then(async res => {
         console.log(res);
        if (res.data[0].message == "admin denied expert permission") {
        swal("Oops!", "You have rejected the user to become a counselor", "error");
        window.open("/", "_self");
       }
     });
  }

  render() {
    return (
      <section className="landing">
        <header className="l-header">
          <Container className="p-0">
            <Navbar collapseOnSelect expand="lg">
              <Navbar.Brand style={{margin:"0 auto"}}>
                <img
                  src={require("../../assest/images/logo.png")}
                  className="img-fluid"
                  alt="logo"
                />
              </Navbar.Brand>
            </Navbar>
          </Container>
        </header>

        <div class="become-wrap admin">
          <Container className="h-100">
            <div class="row">
              <div class="col-md-8 offset-md-2">
                <div class="left-cont text-center">
                  <h2 className="text-center">Do you want to verify the user?</h2>
                  <p className="text-center">
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to
                    using 'Content here, content here', making it look like
                    readable English
                  </p>
                  <a onClick={this.handleVerified} class="yesbtn">
                   Yes
                  </a>
                  <a onClick={this.handleUnverified} class="Nobtn">
                   No
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>
    );
  }
}
export default Accept;