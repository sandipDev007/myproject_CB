import React from "react";
import "./App.css";
import { Container, Button, Form } from "react-bootstrap";
import LogHeader from "../../component/loginheader";
import Footer from "../../component/footer";
import axios from "axios";
import { API_URL } from "../../component/url";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";
import StarRatingComponent from "react-star-rating-component";
import swal from "sweetalert";
import base64 from "base-64";

class feedback extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      bytes: "",
      bytes2: "",
      rating: 0,
      feedback: "",
      isLoading: false
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount = async () => {
    if (
      localStorage.getItem("token") == null &&
      localStorage.getItem("user_id") == null
    ) {
      this.props.history.push("/signin");
    }
    const url = window.location.href.split("?")[1];
    const url2 = window.location.href.split("?")[2];
    this.state.bytes = base64.decode(url);
    this.state.bytes2 = base64.decode(url2);
    console.log(this.state.bytes);
    console.log(this.state.bytes2);
  };

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }

  handleSubmit = async () => {
    let body = new FormData();

    body.append("expert_id", this.state.bytes);
    body.append("user_id", localStorage.getItem("user_id"));
    body.append("rating", this.state.rating);
    body.append("review", this.state.feedback);
    body.append("row_id", this.state.bytes2);

    this.setState({ isLoading: true });
    await axios.post(API_URL + "paymentRedeem", body).then(res => {
      console.log(res);
      this.props.history.push("/App");
    });
    swal("Thank You For Your Feedback!");
    this.setState({ isLoading: false });
  };
  back = () => {
    this.props.history.push("/App");
  };

  render() {
    const { rating } = this.state;
    return (
      <div className="apps-main">
        <div>
          <LogHeader />
        </div>
        <Container fluid className="mainbody">
          <div className="chklist p-3 py-4 shadow mb-4 col-md-6 mx-auto mt-3">
            <h4 className="text-center text-dark d-block text-capital">
              we love to hear from you
            </h4>
            <div className="start-rate d-flex justify-content-center mb-2 align-items-start">
              <div className="starcontainer mb-4">
                <StarRatingComponent
                  name="rate1"
                  starCount={5}
                  value={rating}
                  onStarClick={this.onStarClick.bind(this)}
                  style={{ display: "block" }}
                  emptyStarColor="#e0e0e0"
                />
              </div>
            </div>
            <div className="mb-4 ">
              <Form.Control
                name="feedback"
                as="textarea"
                rows="3"
                placeholder="Write your Comment"
                value={this.state.feedback}
                onChange={this.handleChange}
              />
            </div>

            <ul className="list-unstyled checklist mb-2">
              <li>
                <h5>
                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                  scelerisque Cras sit amet nibh libero, in gravida nulla. Nulla
                  vel metus scelerisque.
                </h5>
              </li>
              <li>
                <h5>
                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                  scelerisque.
                </h5>
              </li>
              <li>
                <h5>
                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                  scelerisque Cras sit amet nibh libero, in gravida nulla. Nulla
                  vel metus scelerisque.
                </h5>
              </li>
              <li>
                <h5>
                  Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                  scelerisque.
                </h5>
              </li>
            </ul>
            <div className="d-flex justify-content-center feed-btn">
              <Button
                variant="danger"
                className="rounded-pill px-5 ml-2"
                onClick={this.back}
              >
                Skip
              </Button>
              <Button
                variant="success"
                className="rounded-pill"
                onClick={this.handleSubmit}
                disabled={!this.state.rating}
              >
                Accept and Continue
              </Button>
            </div>
          </div>
        </Container>
        <div>
          <Footer />
        </div>
      </div>
    );
  }
}
export default feedback;
