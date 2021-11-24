/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./style.css";
import {
  Container,
  Card,
  Form,
  InputGroup,
  Nav,
  Navbar
} from "react-bootstrap";
import LogHeader from "../../component/loginheader";
import Footer from "../../component/footer";
import swal from "sweetalert";
import axios from "axios";
import { API_URL } from "../../component/url";

class Accept extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      userdata: []
    };
    this.picChange = this.picChange.bind(this);
  }

  componentDidMount() {
    if (
      localStorage.getItem("token") == null &&
      localStorage.getItem("user_id") == null
    ) {
      this.props.history.push("/urlblocker");
    } else if (localStorage.getItem("flag") == "N") {
      this.props.history.push("/verifyExpert");
    }
  }

  handleSubmit = async event => {
    const body = {
      user_id: localStorage.getItem("user_id"),
      email_id: "",
      collegeName: "",
      file: this.state.file,
      expert_type: "counselors"
    };

    axios.post(API_URL + "auth/expertOtp", body).then(res => {
      this.setState({
        userdata: res.data.data[0]
      });
      console.log(this.state.userdata.Flag);
      localStorage.setItem("flag", this.state.userdata.Flag);

      
swal("Document submitted successfully!", "Document verification is in progress", "info");
      this.props.history.push("/App");
    });
  };

  picChange = event => {
    event.preventDefault();
    const reader = new FileReader();
    let file = event.target.files[0];
    console.log(file);
    reader.onloadend = () => {
      this.setState({
        file: reader.result
      });
    };
    reader.readAsDataURL(file);
    console.log(this.state.file);
  };

  render() {
    return (
      <section className="landing become">
        <div>
          <LogHeader />
        </div>

        <div class="become-wrap">
          <Container className="h-100">
            <div class="row">
              <div class="col-md-6">
                {/* <div class="left-cont">
                  <h2>What is Lorem ConnectBud?</h2>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to
                    using 'Content here, content here', making it look like
                    readable English
                  </p>
                  <a href="#" class="more-btn">
                    Read More
                  </a>
                </div> */}
              </div>

              <div class="col-md-6">
                <div class="left-cont left-cont-upload text-center">
                  <h2 className="text-center">Upload Your Documents</h2>
                  <p className="text-center">
                  Credential image if available (upload GUI)
                  </p>
                  <div className="upload-area">
                    <p>
                      Select Files Here 
                    </p>
                    <input
                      className="custom-fileup"
                      type="file"
                      onChange={this.picChange}
                    />
                    {/* <button type="file">Select files from your device</button> */}
                  </div>
                  <a
                    class="yesbtn"
                    onClick={this.handleSubmit}
                    style={{ cursor: "pointer" }}
                  >
                    Upload
                  </a>
                  <a href="/App" class="Nobtn" style={{ cursor: "pointer" }}>
                    Cancel
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <div>
          <Footer />
        </div>
      </section>
    );
  }
}
export default Accept;
