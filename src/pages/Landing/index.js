/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/alt-text */
// /* eslint-disable array-callback-return */
// /* eslint-disable jsx-a11y/alt-text */
// /* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import {
  Container,
  Navbar,
  Nav,
  Carousel,
  Button,
  Row,
  Col,
  Figure,
  CarouselItem
} from "react-bootstrap";
import "./theme.css";
import ReadMoreReact from "read-more-react";
import StarRatingComponent from "react-star-rating-component";
import FigureCaption from "react-bootstrap/FigureCaption";
import Twitter from "react-ionicons/lib/LogoTwitter";
import FB from "react-ionicons/lib/LogoFacebook";
import In from "react-ionicons/lib/LogoLinkedin";
//import Gplus from "react-ionicons/lib/LogoGoogleplus";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../component/url";

import BannerAnim, { Element } from "rc-banner-anim";
import TweenOne from "rc-tween-one";
import "rc-banner-anim/assets/index.css";
import Slider from "react-slick";

const BgElement = Element.BgElement;

export default class index extends Component {
  constructor(props) {
    super(props);
    this.imgArray = [
      "https://api.connectbud.com/media/home-banner-1.jpg",
      "https://api.connectbud.com/media/slider2_YlQ7Uz4.jpg"
    ];
    this.state = {
      expertset: [],
      questionset: []
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });
    let body = new FormData();
    body.append("user_id", localStorage.getItem("user_id"));

    axios({
      url: API_URL + "auth/sessionLogin",
      method: "POST",
      data: body
    })
      .then(response => {
        console.log(response);
        localStorage.setItem("username", response.data[0].name);
        localStorage.setItem("user_id", response.data[0].user_id);

        if (response.data[0].Flag === "Y") {
          this.props.history.push("/exapp");
        } else if (response.data[0].message === "no tags") {
          this.props.history.push("/tags");
        } else {
          this.props.history.push("/App");
        }
        this.setState({ isLoading: false });
      })
      .catch(error => {
        this.setState({ isLoading: false });
      });

    let taglistbody = new FormData();
    let taglistbody1 = new FormData();

    taglistbody.append("user_id", "");

    taglistbody1.append("user_id", "");
    taglistbody1.append("Flag", "");

    axios({
      url: API_URL + "feedexpertlist",
      method: "POST",
      data: taglistbody
    })
      .then(response => {
        this.setState({
          expertset: response.data
        });
        this.setState({ isLoading: true });
      })
      .catch(error => {
        this.setState({ isLoading: false });
      });

    axios({
      url: API_URL + "Questions/feedQuestions",
      method: "POST",
      data: taglistbody1
    })
      .then(response => {
        this.setState({
          // let Index : this.state.questionset,

          questionset: response.data.sort(function (a, b) {
            if (a.views > b.views) return -1;
            return 0;
          })
        });
        this.setState({ isLoading: true });
      })
      .catch(error => {
        this.setState({ isLoading: false });
      });
  };

  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      autoplay: true,
      autoplaySpeed: 5000,
      cssEase: "linear",
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <section className="landing">
        <header className="l-header">
          <Container className="p-0">
            <Navbar collapseOnSelect expand="lg">
              <Navbar.Brand>
                <img
                  src={require("../../assest/images/logo.png")}
                  className="img-fluid"
                  alt="logo"
                />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                  {/* <Nav.Link href="">Discover</Nav.Link> */}
                  <Nav.Link href="/outerourstory"> Our Story </Nav.Link>
                  {/* <Nav.Link href=""> Features </Nav.Link> */}
                  {/* <Nav.Link href="">Solutions </Nav.Link> */}
                  {/* <Nav.Link href="">Resources For Members </Nav.Link> */}
                  {/* <Nav.Link href="">Publications</Nav.Link> */}
                  <Nav.Link href="/outercontactUS">Contact Us</Nav.Link>
                  <Nav.Link href="/signin" className="pink">
                    login
                  </Nav.Link>
                  <Nav.Link href="/signup">Register</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Container>
        </header>
        {/* end of header */}

        <div className="top-banner position-relative">
          <BannerAnim prefixCls="banner-user" autoPlay autoPlaySpeed={4500}>
            <Element prefixCls="banner-user-elem" key="0">
              <BgElement
                key="bg"
                className="bg"
                style={{
                  backgroundImage: `url(${this.imgArray[0]})`
                }}
              />
              <div className="container">
                <div className="row">
                  <div className="col-offset-md-4 col-md-6 col-sm-12">
                    <div className="top-banner-contwarp">
                      <TweenOne
                        className="banner-user-title"
                        animation={{ y: 30, opacity: 0, type: "from" }}
                      >
                        <h1>ConnectBud</h1>
                        <h2>the leading platform for</h2>
                      </TweenOne>
                      <TweenOne
                        className="banner-user-text"
                        animation={{
                          y: 30,
                          opacity: 0,
                          type: "from",
                          delay: 200
                        }}
                      >
                        <p>one-to-one mentoring relationship </p>
                      </TweenOne>
                      <Link to="/signup">
                        <Button variant="danger">Get Started</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Element>
            <Element prefixCls="banner-user-elem" key="0">
              <BgElement
                key="bg"
                className="bg"
                style={{
                  backgroundImage: `url(${this.imgArray[1]})`
                }}
              />
              <div className="container">
                <div className="row">
                  <div className="col-offset-md-4 col-md-6 col-sm-12">
                    <div className="top-banner-contwarp">
                      <TweenOne
                        className="banner-user-title"
                        animation={{ y: 30, opacity: 0, type: "from" }}
                      >
                        <h1>ConnectBud</h1>
                        <h2>the leading platform for</h2>
                      </TweenOne>
                      <TweenOne
                        className="banner-user-text"
                        animation={{
                          y: 30,
                          opacity: 0,
                          type: "from",
                          delay: 200
                        }}
                      >
                        <p>one-to-one mentoring relationship </p>
                      </TweenOne>
                      <Link to="/signup">
                        <Button variant="danger">Get Started</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Element>
          </BannerAnim>
        </div>
        {/* end of banner part */}
        <div className="Howitworks position-relative">
          <Container>
            <Row>
              <Col lg={12}>
                {" "}
                <div class="works">
                  <h2 class="text-uppercase">How it works</h2>
                </div>
              </Col>
              <Col lg={4}>
                <div className="howwork-wrap">
                  <figure>
                    <img
                      className="img-fluid"
                      src={require("../../assest/images/how-icon2.png")}
                      alt="slide"
                    />
                  </figure>
                  <h4>Post or Find your Question</h4>
                  <p>
                    Admission seeking students or any other member of ConnectBud© may post questions or
                    search already existing questions and answers. Questions may be answered by any
                    ConnectBud member but are often answered by one of the many registered experts,
                    which include professors, admissions officers, students, and alumni of the many
                    universities or colleges as well as school admissions counselors, and
                    independent college admissions consultants.
                  </p>
                </div>
              </Col>

              <Col lg={4}>
                <div className="howwork-wrap">
                  <figure>
                    <img
                      className="img-fluid"
                      src={require("../../assest/images/how-icon1.png")}
                      alt="slide"
                    />
                  </figure>
                  <h4>Initiate One-on-One Mentoring Relationships</h4>
                  <p>
                    At any time, a student member can develop a one-on-one mentor relationship with one of
                    the experts. The mentor and student can negotiate a financial arrangement as
                    required and then individual consulting can be conducted over voice calls,
                    message apps, or online meeting apps. Throughout the mentorship process, mentors work
                    as trusted advisors and role models by sharing their knowledge, experience and
                    advice with client students.
                  </p>
                </div>
              </Col>

              <Col lg={4}>
                <div className="howwork-wrap">
                  <figure>
                    <img
                      className="img-fluid"
                      src={require("../../assest/images/how-icon3.png")}
                      alt="slide"
                    />
                  </figure>
                  <h4>Become an Expert</h4>
                  <p>
                    Any member may register at any time to become an expert. The
                    requirements to be recognized as an expert vary with the type of expert
                    category. Categories include College Students, Admissions Counselors, College Admission
                    Representatives, and Independent College Admissions Consultants. Qualifying to
                    be a Student Expert is as simple as providing a valid college email ID. More
                    rigorous verification is required for the various professional expert categories.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        {/* end of how it works */}
        <div className="features exfitr">
          <Container>
            <h2>Exciting Features of ConnectBud</h2>

            <Row>
              <Carousel>
                <CarouselItem>
                  <div className="ftr-wrap">
                    <Col lg={5} md={6}>
                      <div className="fitures-images">
                        <img
                          src={require("../../assest/images/features-image4.jpg")}
                        />
                      </div>
                    </Col>
                    <Col lg={7} md={6}>
                      <diV className="fetures-txt">
                        <h4>Countless List of Relevant Questions</h4>
                        <p>
                          With easy access to our abundant list of
                          questionnaire, instantly find out the questions in
                          your mind. Get all the answers to the most intricate
                          questions right here right now.
                        </p>
                      </diV>
                    </Col>
                  </div>
                </CarouselItem>

                <CarouselItem>
                  <div className="ftr-wrap">
                    <Col lg={5} md={6}>
                      <div className="fitures-images">
                        <img src={require("../../assest/images/help.jpg")} />
                      </div>
                    </Col>
                    <Col lg={7} md={6}>
                      <diV className="fetures-txt">
                        <h4>Interest-Based Automatic Question Suggestion</h4>
                        <p>
                          ConnectBud search engine will automatically recommend
                          you question based on your unique set of interests
                          with the most relevant discussions in your field.
                          Don’t need to work hard to find your questions
                          anymore.
                        </p>
                      </diV>
                    </Col>
                  </div>
                </CarouselItem>

                <CarouselItem>
                  <div className="ftr-wrap">
                    <Col lg={5} md={6}>
                      <div className="fitures-images">
                        <img
                          src={require("../../assest/images/features-image3.jpg")}
                        />
                      </div>
                    </Col>
                    <Col lg={7} md={6}>
                      <diV className="fetures-txt">
                        <h4>
                          Large Number of Verified Experts from Top-Universities
                        </h4>
                        <p>
                          Get personalised guidance from a large number of
                          experts from some of the top universities. It is a
                          trusted platform where verified experts share their
                          experiences to help others.
                        </p>
                      </diV>
                    </Col>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="ftr-wrap">
                    <Col lg={5} md={6}>
                      <div className="fitures-images">
                        <img
                          src={require("../../assest/images/features-image2.jpg")}
                        />
                      </div>
                    </Col>
                    <Col lg={7} md={6}>
                      <diV className="fetures-txt">
                        <h4>Send Connection Request First for Live Advice</h4>
                        <p>
                          You can ask experts to connect with you by sending
                          them an invitation to connect. If they accept your
                          invitation, you get the chance to hire them for live
                          advice.
                        </p>
                      </diV>
                    </Col>
                  </div>
                </CarouselItem>

                <CarouselItem>
                  <div className="ftr-wrap">
                    <Col lg={5} md={6}>
                      <div className="fitures-images">
                        <img
                          src={require("../../assest/images/features-image1.jpg")}
                        />
                      </div>
                    </Col>
                    <Col lg={7} md={6}>
                      <diV className="fetures-txt">
                        <h4>Negotiate the Price you Prefer</h4>
                        <p>
                          Before you jump in, settle the price with the experts.
                          ConnectBud platform gives you the exciting option of
                          claiming the maximum value of your money.
                        </p>
                      </diV>
                    </Col>
                  </div>
                </CarouselItem>

                <CarouselItem>
                  <div className="ftr-wrap">
                    <Col lg={5} md={6}>
                      <div className="fitures-images">
                        <img
                          src={require("../../assest/images/make-money.jpg")}
                        />
                      </div>
                    </Col>
                    <Col lg={7} md={6}>
                      <diV className="fetures-txt">
                        <h4>Potential to Make More Money</h4>
                        <p>
                          Gain respect as an expert, and make more than you ever
                          did at your desk job. Be an expert and make extra
                          money incredibly easy. You’ll be able to charge what
                          your work is worth, and you get to pocket all the
                          profit.
                        </p>
                      </diV>
                    </Col>
                  </div>
                </CarouselItem>

                <CarouselItem>
                  <div className="ftr-wrap">
                    <Col lg={5} md={6}>
                      <div className="fitures-images">
                        <img src={require("../../assest/images/empower.jpg")} />
                      </div>
                    </Col>
                    <Col lg={7} md={6}>
                      <diV className="fetures-txt">
                        <h4>Empower the Next-Gen</h4>
                        <p>
                          Exchange information, skills, expertise through a
                          productive chat of only a few minutes or hours.
                          Empower and enrich the next generations to better
                          serve our world. We believe in the culture of
                          knowledge sharing rather than knowledge hoarding.
                        </p>
                      </diV>
                    </Col>
                  </div>
                </CarouselItem>
              </Carousel>
            </Row>
          </Container>
        </div>
        {/* end of features */}
        <div className="question-answar">
          <div className="container">
            <div className="question-heading">
              <h2>Featured Questions</h2>
            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="main-timeline">
                  {this.state.questionset.map((value, index) => {
                    if (index < 4)
                      return (
                        <a class="timeline">
                          <div class="timeline-icon">
                            <img src={value.answers[0].user_image} />
                          </div>
                          <div class="timeline-content">
                            <h3 class="title">
                              <span className="question-no">Q{index + 1}.</span>
                              {value.question}
                            </h3>
                            <p class="description">
                              <ReadMoreReact
                                text={value.answers[0].answer}
                                min={120}
                                ideal={300}
                                max={500}
                                readMoreText="read more"
                              />
                            </p>
                          </div>
                        </a>
                      );
                  })}
                </div>
                <Link to="/signin">
                  <div className="more-qbtn">
                    <a>See More</a>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* end of testimonial */}
        <div className="features experts">
          <Container>
            <h2>Some of the Experts</h2>
            <div>
              <Slider {...settings}>
                {this.state.expertset.map((value, index) => {
                  if (index < 20)
                    return (
                      <Row>
                        <Col lg={12} md={12}>
                          <div className="expert-pfo">
                            <Figure className="thumb-box">
                              <img
                                src={value.user_image}
                                className="img-fluid"
                              />
                            </Figure>
                            <FigureCaption>
                              <h4 className="text-capitalize">
                                {value.expert_Name}
                              </h4>
                              <span>Student Expert</span>
                              <br></br>
                              <span>{value.department}</span>
                              <br></br>
                              <span>{value.collegeName}</span>
                              <br></br>
                              <div className="text-center">
                                <StarRatingComponent
                                  name="rate1"
                                  color="blue"
                                  starCount={5}
                                  value={value.avg_rating}
                                />
                              </div>
                            </FigureCaption>
                          </div>
                        </Col>
                      </Row>
                    );
                })}
              </Slider>
            </div>
          </Container>
        </div>
        {/* end of experts */}
        <footer>
          <div className="main-footer position-relative">
            <Container className="position-relative">
              <Row>
                <Col md={4} sm={12}>
                  <div className="links">
                    <h4>Useful links</h4>
                    <ul className="list-unstyled">
                      {/* <li>
                        <a href="">Discover Our Story </a>
                      </li>
                      <li>
                        <a href="">Features </a>
                      </li>
                      <li>
                        <a href="">Solutions</a>
                      </li>
                      <li>
                        <a href="">Resources For Members </a>
                      </li> */}
                      {/* <li>
                        <a href="">Publications </a>
                      </li> */}
                      <li>
                        <a href="/outercontactUS">Contact Us</a>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col md={4} sm={12}>
                  <div className="links social-link">
                    <h4>Follow us</h4>
                    <ul className="list-unstyled">
                      <li>
                        <a href="https://twitter.com/ConnectBud" target="_blank">
                          <Twitter color="#fff" className="s-icon" /> Twitter
                        </a>
                      </li>
                      <li>
                        <a href="https://www.facebook.com/ConnectBud/" target="_blank">
                          <FB color="#fff" className="s-icon" /> Facebook
                        </a>
                      </li>
                      <li>
                        <a href="https://www.linkedin.com/company/connectbud/" target="_blank">
                          <In color="#fff" className="s-icon" /> Linkedin
                        </a>
                      </li>
                      {/* <li>
                        <a href="">
                          {" "}
                          <Gplus color="#fff" className="s-icon" /> Google Plus
                        </a>
                      </li> */}
                    </ul>
                  </div>
                </Col>
                <Col md={4} sm={12}>
                  <div className="links">
                    <h4>Get in touch</h4>
                    <ul className="list-unstyled">
                      <li>
                        6000, Park Avenue East, Suite 200
                      </li>
                      <li>
                        New York City, NY
                      </li>
                      <li>
                        93834, United States
                      </li>
                      <li>
                        P. +1 000 000-0000
                      </li>
                      <li>
                        <a href="mailto:support@connectbud.com">support@connectbud.com</a>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Container>
            <div className="copy-footer py-3 pt-md-4">
              <Container className="position-relative">
                <div className="d-md-flex text-center justify-content-md-between align-items-center">
                  <p className="text-white mb-md-0">
                    Copyright © 2020 ConnectBud LLC – All Rights Reserved
                  </p>
                  <div className="d-flex">
                    <a href="/outerprivacyPolicy" className="text-white">
                      Privacy Policy
                    </a>
                    <span className="d-block px-3 text-white">|</span>
                    <a href="/tandc" className="text-white">
                      Terms of Service
                    </a>
                  </div>
                </div>
              </Container>
            </div>
          </div>
        </footer>
      </section>
    );
  }
}
