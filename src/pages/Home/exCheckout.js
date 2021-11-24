/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import "./checkout.css";
import Header from "../../component/exheader";
import { InputGroup, Form } from "react-bootstrap";

import Footer from "../../component/footer";
import axios from "axios";
import { API_URL } from "../../component/url";
import React from "react";
import PaypalButton from "./PaypalButton";
import StarRatingComponent from "react-star-rating-component";
import { Link } from "react-router-dom";

const CLIENT = {
  sandbox:
    "AeDsqv9AwmO6nFExgO2ZLZ6l4IZoSPNVOmCf3ZYw7_tYrWD6EdUBfVF1go2apkugKiH4EIKQ9gf-aaXb"
};
const ENV = process.env.NODE_ENV === "production" ? "production" : "sandbox";

class becomeExpert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      userdata: [],
      profiledataset: []
    };
  }

  responsePayPal = async response => {
    console.log(response);
  };

  payment = async () => {
    let body = new FormData();
    body.append("user_ID", localStorage.getItem("user_id"));
    body.append("paid", localStorage.getItem("paid"));
    body.append("amount", "100");
    body.append("payerID", localStorage.getItem("payerID"));
    body.append("paymentID", localStorage.getItem("paymentID"));
    body.append("receiver_id", localStorage.getItem("exchatuId"));
    body.append("package", "5");

    await axios({
      url: API_URL + "userPayment",
      method: "POST",
      data: body
    })
      .then(response => {
        this.setState({
          userdata: response.data
        });

        this.setState({ isLoading: false });
      })
      .catch(error => {
        this.setState({ isLoading: false });
      });
  };

  componentDidMount = async () => {
    if (
      localStorage.getItem("token") == null &&
      localStorage.getItem("user_id") == null
    ) {
      this.props.history.push("/urlblocker");
    }
    this.setState({ isLoading: true });
    let body = new FormData();

    body.append("id", localStorage.getItem("exchatshower_id"));
    body.append("user_id", localStorage.getItem("exchatuId"));

    //For Edit Intro
    body.append("name", "");
    body.append("college", "");
    body.append("department", "");
    body.append("expertise", "");
    body.append("country", "");
    body.append("about", "");

    // For Education
    body.append("title", "");
    body.append("type", "");
    body.append("institute", "");
    body.append("location", "");
    body.append("startDate", "");
    body.append("endDate", "");

    //For f & S
    body.append("community", "");
    body.append("city", "");

    body.append("paypalId", "");

    await axios({
      url: API_URL + "expertProfile",
      method: "POST",
      data: body
    })
      .then(response => {
        this.setState({
          profiledataset: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const onSuccess = payment => console.log("Successful payment!", payment);
    const onError = error =>
      console.log("Erroneous payment OR failed to load script!", error);
    const onCancel = data => console.log("Cancelled payment!", data);
    return (
      <section className="become">
        <div>
          <Header />
        </div>

        <section class="checkout-wrap">
          <div class="container">
            <div class="row">
              <div class="col-md-3">
                <div class="profile-picsection">
                  {this.state.profiledataset.map((value, index) => {
                    return (
                      <div class="pro-pic">
                        <img src={value.user_image} alt="pro-pic" />
                      </div>
                    );
                  })}
                  {this.state.profiledataset.map((value, index) => {
                    return (
                      <div>
                        <h2>{value.name}</h2>
                      </div>
                    );
                  })}
                  <div className="payment-star">
                    {this.state.profiledataset.map((value, index) => {
                      return (
                        <StarRatingComponent
                          name="rate1"
                          color="blue"
                          starCount={5}
                          value={value.avg_rating}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
              <div class="col-md-9">
                <ul class="info-allsection">
                  <li>
                    <div class="row">
                      <div class="col-2">
                        <img src={require("../../assest/images/myicon3.jpg")} />
                      </div>
                      {this.state.profiledataset.map((value, index) => {
                        return (
                          <div class="col-10">
                            <h3>College:</h3>
                            <h4>{value.institute}</h4>
                          </div>
                        );
                      })}
                    </div>
                  </li>
                  <li>
                    <div class="row">
                      <div class="col-2">
                        <img src={require("../../assest/images/myicon2.jpg")} />
                      </div>
                      {this.state.profiledataset.map((value, index) => {
                        return (
                          <div class="col-10">
                            <h3>User's rating: </h3>
                            <h4>{value.avg_rating}</h4>
                          </div>
                        );
                      })}
                    </div>
                  </li>
                  <li>
                    <div class="row">
                      <div class="col-2">
                        <img src={require("../../assest/images/myicon1.jpg")} />
                      </div>
                      {this.state.profiledataset.map((value, index) => {
                        return (
                          <div class="col-10">
                            <h3>Expertise: </h3>
                            <h4>{value.expertise}</h4>
                          </div>
                        );
                      })}
                      <div class="col-sm-12">
                        <div class="amount-section">
                          <label>
                            Amount to be Escrowed(in USD)
                            <input
                              placeholder="Enter your amount here"
                              type="text"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="row">
                      <div class="col-2">
                        <img
                          src={require("../../assest/images/myicon4.jpg")}
                          alt="myicon1"
                        />
                      </div>
                      {this.state.profiledataset.map((value, index) => {
                        return (
                          <div class="col-10">
                            <h3>User's hired: </h3>
                            <h4>{value.totalHired}</h4>
                          </div>
                        );
                      })}
                    </div>
                  </li>
                  <li>
                    <div class="row">
                      <div className="col-sm-12">
                        <div class="amount-section">
                          <label>Duration</label>
                        </div>
                        <form>
                          <Form.Group controlId="validationlast">
                            <InputGroup>
                              <InputGroup.Prepend>
                                <InputGroup.Text className="bg-white text-mute">
                                  Start date
                                </InputGroup.Text>
                              </InputGroup.Prepend>
                              <Form.Control
                                type="date"
                                name="Start"
                                className="shadow-none"
                                value={this.state.Start}
                                onChange={this.handleChange}
                              />
                            </InputGroup>
                          </Form.Group>
                        </form>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div class="row">
                      <div className="col-sm-12">
                        <div class="amount-section">
                          <label style={{ visibility: "hidden" }}>
                            Duration
                          </label>
                        </div>
                        <form>
                          <Form.Group controlId="validationlast">
                            <InputGroup>
                              <InputGroup.Prepend>
                                <InputGroup.Text className="bg-white text-mute">
                                  Start date
                                </InputGroup.Text>
                              </InputGroup.Prepend>
                              <Form.Control
                                type="date"
                                name="Start"
                                className="shadow-none"
                                value={this.state.Start}
                                onChange={this.handleChange}
                              />
                            </InputGroup>
                          </Form.Group>
                        </form>
                      </div>
                    </div>
                  </li>
                </ul>
                <div class="paypal-procedbtn">
                  <PaypalButton
                    client={CLIENT}
                    env={ENV}
                    commit={true}
                    currency={"USD"}
                    total={100}
                    onSuccess={onSuccess}
                    onError={onError}
                    onCancel={onCancel}
                    callback={this.responsePayPal}
                  />

                  <Link to="/MyExpert">
                    <button
                      className="btn btn-theme m-0 ml-2"
                      onClick={this.payment}
                    >
                      Next
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div>
          <Footer />
        </div>
      </section>
    );
  }
}
export default becomeExpert;
