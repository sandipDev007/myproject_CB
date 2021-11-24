/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable array-callback-return */
import React from "react";
import "../Home/App.css";
import { Container, Row, Col } from "react-bootstrap";
import LogHeader from "../../component/loginheader";
import Footer from "../../component/footer";
import { Link } from "react-router-dom";

class connection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="apps-main become-wrap h-100">
        <div>
          <LogHeader />
        </div>
        <Container className="mainbody friend-suggestion become-partpage">
          <Row className="py-md-3 mx-md-0">
            <Col xs={6}>
              <div class="friends-box bg-white">
                <div class="box-header position-relative">
                  <img
                    src={require("../../assest/images/connect-cover.png")}
                    class="img-fluid"
                    alt="cover image"
                  />

                  <figure class="round-profile round-profileimg councilor-pic">
                    <img
                      src={require("../../assest/images/student-iconsmall.png")}
                      class="img-fluid"
                      alt="profile image"
                    />
                  </figure>
                </div>
                <div style={{ minHeight: 268 }} class="box-body p-3 text-center mymin-higt alltxt full fulltext">
                  <Link to="/expertviewProfile">
                    <h4>
                      <span class="d-block theme-text">
                        Become a Student Expert
                      </span>
                    </h4>
                  </Link>
                  {/* <span class="d-block theme-text">
                    Lorem Ipsum is simply dummy text
                  </span> */}
                  {/* <p class="mb-0 text-black-50">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p> */}
                  <p class="black-text mb-0">
                    At ConnectBud, we realize that college is demanding
                    financially as well as academically without having to deal
                    with time-consuming and low-paying part time jobs to support
                    college expenses. Therefore, ConnectBud is a platform that
                    empowers college students to gain earning potential on their
                    own time and in their own place. We also believe that
                    existing college students can provide a wealth of knowledge,
                    experience and inspiration to aspiring admissions-seeking
                    students. Answer questions of aspiring college students
                    seeking admission to colleges and universities to open
                    freelance opportunities. The more questions you answer, the
                    greater the visibility and credibility of your profile will
                    have, which will increase your freelance opportunities.
                  </p>
                </div>
                <div className="d-flex justify-content-center">
                  <Link to="/BecomeExpert">
                    <button class="btn btn-theme" type="button">
                      Proceed
                    </button>
                  </Link>
                </div>
              </div>
            </Col>

            <Col xs={6}>
              <div class="friends-box bg-white">
                <div class="box-header position-relative">
                  <img
                    src={require("../../assest/images/connect-cover.png")}
                    class="img-fluid"
                    alt="cover image"
                  />
                  <figure class="round-profile round-profileimg councilor-pic">
                    <img
                      src={require("../../assest/images/student-iconsmall.png")}
                      class="img-fluid"
                      alt="profile image"
                    />
                  </figure>
                </div>
                <div style={{ minHeight: 268 }}  class="box-body p-3 text-center mymin-higt alltxt fulltext">
                  <h4>
                    <span class="d-block theme-text">
                      Become a Professional Expert
                    </span>
                  </h4>

                  <p class="mb-0 text-black-50">
                    At ConnectBud, we realize how much effort is required to
                    promote your business as a college admissions consultant.
                    ConnectBud offers a new and exciting way to promote your
                    business and directly negotiate contracts with
                    admission-seeking students within the platform. Answer
                    questions of aspiring college students from all over the
                    world to open contract opportunities for admissions
                    consulting. The more questions you answer, the greater the
                    visibility and credibility of your profile will have, which
                    will increase your contract opportunities.
                  </p>
                </div>
                <div className="d-flex justify-content-center">
                  <Link to="/upload">
                    <button class="btn btn-theme" type="button">
                      Proceed
                    </button>
                  </Link>
                </div>
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

export default connection;
