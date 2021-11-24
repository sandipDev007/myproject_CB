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
// import Insta from "react-ionicons/lib/LogoInstagram";
// import Gplus from "react-ionicons/lib/LogoGoogleplus";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../component/url";

import BannerAnim, { Element } from 'rc-banner-anim';
import TweenOne from 'rc-tween-one';
import 'rc-banner-anim/assets/index.css';
import Slider from "react-slick";

const BgElement = Element.BgElement;

export default class ourstory extends Component {
  constructor(props) {
    super(props);
    this.imgArray = [
      'https://api.connectbud.com/media/home-banner-1.jpg',
      'https://api.connectbud.com/media/slider2_YlQ7Uz4.jpg',
    ];
    this.state = {
      expertset: [],
      questionset: [],
    };
  }

  //   componentDidMount = async () => {
  //     this.setState({ isLoading: true });
  //     let body = new FormData();
  //     body.append("user_id", localStorage.getItem("user_id"));

  //     axios({
  //       url: API_URL + "auth/sessionLogin",
  //       method: "POST",
  //       data: body
  //     })
  //       .then(response => {
  //         console.log(response);
  //         localStorage.setItem("username", response.data[0].name);
  //         localStorage.setItem("user_id", response.data[0].user_id);

  //         if (response.data[0].Flag === "Y") {
  //           this.props.history.push("/exapp");
  //         }
  //          else if(response.data[0].message == "no tags")
  //          {
  //           this.props.history.push("/tags");
  //         }
  //         else{
  //           this.props.history.push("/App");

  //         }
  //         this.setState({ isLoading: false });
  //       })
  //       .catch(error => {
  //         this.setState({ isLoading: false });
  //       });

  //     let taglistbody = new FormData();
  //     let taglistbody1 = new FormData();

  //     taglistbody.append("user_id", "");

  //     taglistbody1.append("user_id", "");
  //     taglistbody1.append("Flag", "");

  //     axios({
  //       url: API_URL + "feedexpertlist",
  //       method: "POST",
  //       data: taglistbody
  //     })
  //       .then(response => {
  //         this.setState({
  //           expertset: response.data
  //         });
  //         this.setState({ isLoading: true });
  //       })
  //       .catch(error => {
  //         this.setState({ isLoading: false });
  //       });

  //     axios({
  //       url: API_URL + "Questions/feedQuestions",
  //       method: "POST",
  //       data: taglistbody1
  //     })
  //       .then(response => {
  //         this.setState({


  //           // let Index : this.state.questionset,

  //           questionset: response.data.sort(function (a, b) {
  //             if (a.views > b.views) return -1;
  //             return 0;
  //           }),


  //         });
  //         this.setState({ isLoading: true });
  //       })
  //       .catch(error => {
  //         this.setState({ isLoading: false });
  //       });
  //   };

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
              <Navbar.Brand href="/">
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

        <div className="top-innerbanner-2 position-relative">

          <Container>
            <div className="innerpage-connt">
              <h3>Discover Our Story</h3>
              <ul>
                <li>Home</li>
                <li>Discover Our Story</li>

              </ul>

            </div>

          </Container>

        </div>
        {/* end of banner part */}
        <div className="Howitworks position-relative">
          <Container>
            <Row>

              <Col lg={12}>
                <div className="innerpage-contennt">


                  <h2>GET THE RIGHT INFORMATION, RIGHT NOW</h2>

                  <p>At ConnectBud, we use the collective knowledge of veteran
                educators, professors and students to offer valuable
                admission information in global universities and colleges. It
                is a personalized guidance platform where a network of
                experienced counselors help aspirants (students or an
                employed graduate) in college admissions, study abroad
                and career selection. Our mission is to support students in
                areas such as self-management, career selection and
responsible decision making.</p>


                  <h2>Our Principles and Commitment</h2>
                  <p><strong>An open, supportive environment-</strong></p>
                  <p>Help you navigate through each step to getting into any
college or university all across the globe.</p>
                  <p><strong>Communication is incredibly simple-</strong></p>
                  <p>Easily connect with the right expert to get the right
                  information through direct phone call, video call, chat and
screen sharing.</p>
                  <p><strong>Customized solutions to meet the needs of individual
learners-</strong></p>
                  <p>Access value-driven one-on-one counselling assistance
without spending high.</p>

                  <p><strong>Admission information in one central location-</strong></p>
                  <p>We bring together experts from different institutes to answer
the same question, in the same place.</p>

                  <h2>We’ll continue to advance what&#39;s possible in study
abroad</h2>
                  <p>Opting to study abroad provides an amazing avenue of
                  growing academically and professionally. However, most of
                  the students and professionals simply don’t have enough
                  support to make informed decisions about getting through
                  the admission process in overseas colleges and
                  universities. At ConnectBud, we’re transforming the
                  admissions experience, higher study and the choice of
career with our easy-to-use platform and expert advice.</p>

                  <h5>Features</h5>



                  <h2>SOLVE ADMISSION MYSTERIES WITH EASE</h2>
                  <p>ConnectBud brings expert-level knowledge and insights to
                the broadest possible range of people— irrespective of their
                education levels and geographic location. Users can ask or
                answer questions ( users can only answer once they
                become experts) and make informed decisions regarding
                admission, courses, fees, lodging and campus safety of any
                college and university. Loaded with exciting features to
solve admission mysteries.</p>

                  <h2>Basic Features</h2>

                  <ul>

                    <li>ConnectBud lets you have real-time conversations
                    before and after you hire the expert consultant. The
                    most distinguishing feature of ConnectBud is there are
real experts answering the questions you ask.</li>
                    <li>Professors, Students and Alumni of the leading
                    universities giving advice on career selection, higher
                    education, and numerous other study-related queries
                    and each question page offers the best possible
answer.</li>
                    <li>Get help from our customer support team 24x7. They’re
                    living, breathing humans, here to help you solve any
issues.</li>
                    <li>This platform offers personal and professional
advantages for both parties (experts &amp; students).</li>
                    <li>Thousands of resources to read from, post comments &amp;
chatting options with ex-students, alumni.</li>

                  </ul>

                  <h2>Interaction &amp; Participation Features</h2>
                  <p>Reduce the difficulty out of scheduling conferences. Set up
         everything with just a few clicks and ConnectBud makes
sure there are no conflicts and takes care of reminders.</p>

                  <h2>Dispute Assistance Features</h2>
                  <p>Disputes rarely happen. But in the event they do occur,
      ConnectBud helps with speedy dispute resolution.

      The website is tailored for the individual needs of aspirants
      (students or anyone) in college admissions, study abroad
      and career selection. Instantly connect to thousands of other
      registered online students/alumni and professors to seek
advice/counselling or alleviate concerns.</p>



                  <h5>Solutions</h5>
                  <h2>Real Experts to Guide you on Study Abroad &amp; Career
Selection</h2>

                  <p>A growing number of students and professionals are
                  pursuing study in some of the renowned global educational
                  institutes. Students who go abroad gain a wealth of
                  knowledge, skills, and cultural insights. ConnectBud
                  leverages the expertise of professors, educators and
                  students to offer valuable admission information for those
                  who are planning to pursue higher education in foreign
colleges and universities.</p>

                  <h2>Meet with the Mentor 1-1</h2>
                  <p>Learners can instantly connect over a 1-1 voice
         call/message to online university students/alumni and
         university professors to seek advice or alleviate concerns.
         Our vision is to create a counselling system that interprets
         best practices to meet the unique needs of every student
and professional across the globe.</p>

                  <h2>Get Answers from the Real Experts</h2>
                  <p>ConnectBud’s resources are helping students to be more
                  effective in their choice of educational institutes, career and
                  higher study. The forum-like design of the website makes for
                  a positive user experience. Users can get specific answers

                  of their questions along with the answers of other broad
                  trending topics. We want to make sure that no one lacks
excellent guidance to achieve their educational aspirations.</p>




                </div>
              </Col>

            </Row>
          </Container>
        </div>

        <footer>
          <div className="main-footer position-relative">
            <Container className="position-relative">
              <Row>
                <Col md={4} sm={12}>
                  <div className="links">
                    <h4>Use full links</h4>
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
      </section >
    );
  }
}