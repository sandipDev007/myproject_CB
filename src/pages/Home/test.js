/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import LogHeader from "../../component/loginheader";
import Footer from "../../component/footer";

function Answered() {
  return (
    <div className="apps-main">
      <div>
        <LogHeader />
      </div>
      <Container fluid className="mainbody">
        <Row>
          <Col md={9} className="pl-0">
            <div className="d-flex">
              <div className="centerbody answarbody">
                <div className="innerans py-3 pl-4">
                  <h3 className="mb-1">Questions & Answers</h3>
                  <h4>
                    Can you name a few good professors from your college who are
                    really popular among students and known for their teaching
                    style, work, and contribution?
                  </h4>
                  <div className="ans-post">
                    <div className="d-flex">
                      <span className="thumbnail">
                        <img
                          src={require("../../assest/images/thumb.png")}
                          alt="pic"
                          className="img-fluid"
                        />
                      </span>
                      <div className="a-cont">
                        <h6>
                          <b>Dani Richard</b>
                        </h6>
                        <p className="mb-0">
                          B.S. Information and Computer Science & Systems
                          Programming, Georgia Institute of Technology
                        </p>
                        <span className="text-fade">
                          <img
                            src={require("../../assest/images/star.png")}
                            className="mr-2"
                          />{" "}
                          Answered :- 20hrs. ago{" "}
                          <a href="" className="theme-text ml-2">
                            View Profile
                          </a>
                        </span>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Donec volutpat sagittis ullamcorper. In viverra
                          egestas urna ut vestibulum. Donec gravida risus at
                          erat efficitur, nec consectetur erat pretium. Donec
                          arcu felis, vestibulum ac turpis id, posuere aliquet
                          sapien. Morbi congue vel metus sed interdum. Nam sed
                          nisi venenatis, scelerisque ipsum sit amet, volutpat
                          ante. Donec laoreet ut urna id condimentum.{" "}
                        </p>
                        <p>
                          Pellentesque eget aliquet mi. Suspendisse non justo in
                          purus molestie scelerisque. Integer id fermentum
                          tellus. Suspendisse pharetra mi eget luctus feugiat.
                          Praesent accumsan elit dolor, sed pulvinar dui
                          venenatis luctus. Nulla nec turpis varius, cursus nunc
                          et, congue risus. Fusce fermentum velit et tellus
                          mattis, vel cursus odio tempor. Vestibulum semper,
                          diam quis tincidunt aliquam, risus nisi maximus metus,
                          eu scelerisque dui ante eu elit. Proin tincidunt ante
                          dignissim, porta metus a, consequat justo. Quisque
                          accumsan ante sit amet leo faucibus, commodo suscipit
                          lorem mollis.{" "}
                        </p>
                        <div className="likem border-0">
                          <ul className="list-inline list-unstyled d-flex justify-content-end mb-0">
                            <li>
                              <img
                                src={require("../../assest/images/like.png")}
                              />{" "}
                              <span>56 Likes</span>
                            </li>
                            <li>
                              <img
                                src={require("../../assest/images/views.png")}
                              />{" "}
                              <span>30 views</span>
                            </li>
                          </ul>
                        </div>
                        <div className="form-group d-flex justify-content-between align-items-center border rounded">
                          <input
                            type="text"
                            className="form-control form-control-lg border-0"
                            placeholder="Post Your comment"
                          />
                          <button className="btn btn-link" type="submit">
                            post
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* end of ans post */}
                  <div className="ans-post">
                    <div className="d-flex">
                      <span className="thumbnail">
                        <img
                          src={require("../../assest/images/thumb.png")}
                          alt="pic"
                          className="img-fluid"
                        />
                      </span>
                      <div className="a-cont">
                        <h6>
                          <b>Dani Richard</b>
                        </h6>
                        <p className="mb-0">
                          B.S. Information and Computer Science & Systems
                          Programming, Georgia Institute of Technology
                        </p>
                        <span className="text-fade">
                          <img
                            src={require("../../assest/images/star.png")}
                            alt="pic"
                            className="img-fluid mr-2"
                          />{" "}
                          Answered :- 20hrs. ago{" "}
                          <a href="" className="theme-text ml-2">
                            View Profile
                          </a>
                        </span>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Donec volutpat sagittis ullamcorper. In viverra
                          egestas urna ut vestibulum. Donec gravida risus at
                          erat efficitur, nec consectetur erat pretium. Donec
                          arcu felis, vestibulum ac turpis id, posuere aliquet
                          sapien. Morbi congue vel metus sed interdum. Nam sed
                          nisi venenatis, scelerisque ipsum sit amet, volutpat
                          ante. Donec laoreet ut urna id condimentum.{" "}
                        </p>
                        <p>
                          Pellentesque eget aliquet mi. Suspendisse non justo in
                          purus molestie scelerisque. Integer id fermentum
                          tellus. Suspendisse pharetra mi eget luctus feugiat.
                          Praesent accumsan elit dolor, sed pulvinar dui
                          venenatis luctus. Nulla nec turpis varius, cursus nunc
                          et, congue risus. Fusce fermentum velit et tellus
                          mattis, vel cursus odio tempor. Vestibulum semper,
                          diam quis tincidunt aliquam, risus nisi maximus metus,
                          eu scelerisque dui ante eu elit. Proin tincidunt ante
                          dignissim, porta metus a, consequat justo. Quisque
                          accumsan ante sit amet leo faucibus, commodo suscipit
                          lorem mollis.{" "}
                        </p>
                        <div className="likem border-0">
                          <ul className="list-inline list-unstyled d-flex justify-content-end mb-0">
                            <li>
                              <img
                                src={require("../../assest/images/like.png")}
                                alt="pic"
                                className="img-fluid"
                              />{" "}
                              <span>56 Likes</span>
                            </li>
                            <li>
                              <img
                                src={require("../../assest/images/views.png")}
                                alt="pic"
                                className="img-fluid"
                              />{" "}
                              <span>30 views</span>
                            </li>
                          </ul>
                        </div>
                        <div className="form-group border rounded reply-section px-4 py-3">
                          <p className="mb-3">
                            <img
                              src={require("../../assest/images/comment.png")}
                              alt="pic"
                              className="img-fluid"
                            />{" "}
                            <span>2 Comments</span>
                          </p>

                          <div className="d-flex border-btn pb-3 mb-4">
                            <span className="thumbnail sm">
                              <img
                                src={require("../../assest/images/thumb.png")}
                                alt="pic"
                                className="img-fluid"
                              />
                            </span>

                            
                            <div className="a-cont r-cont">
                              <p className="">Margaret Elizabeth</p>
                              <p className="f-12 mb-2">
                                {" "}
                                B.S. Georgia Institute of Technology{" "}
                                <a href="" className="theme-text ml-2">
                                  View Profile
                                </a>
                              </p>
                              <p className="mb-3">
                                Proin luctus, erat eu malesuada vehicula, mi
                                risus porttitor lectus, id luctus tellus sem in
                                purus. Curabitur congue erat a urna auctor, id
                                ullamcorper ligula tempor. Donec tincidunt
                                interdum mi at eleifend.
                              </p>
                              <div className="d-flex justify-content-between">
                                <span className="text-fade f-12">
                                  Comments :- 29 Jul 2019
                                </span>
                                <a href="" className="theme-text">
                                  Reply
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex border-btn pb-3 mb-4">
                            <span className="thumbnail sm">
                              <img
                                src={require("../../assest/images/thumb.png")}
                                alt="pic"
                                className="img-fluid"
                              />
                            </span>
                            <div className="a-cont r-cont">
                              <p className="">Margaret Elizabeth</p>
                              <p className="f-12 mb-2">
                                {" "}
                                B.S. Georgia Institute of Technology{" "}
                                <a href="" className="theme-text ml-2">
                                  View Profile
                                </a>
                              </p>
                              <p className="mb-3">
                                Proin luctus, erat eu malesuada vehicula, mi
                                risus porttitor lectus, id luctus tellus sem in
                                purus. Curabitur congue erat a urna auctor, id
                                ullamcorper ligula tempor. Donec tincidunt
                                interdum mi at eleifend.
                              </p>
                              <div className="d-flex justify-content-between">
                                <span className="text-fade f-12">
                                  Comments :- 29 Jul 2019
                                </span>
                                <a href="" className="theme-text">
                                  Reply
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex pb-3">
                            <span className="thumbnail sm">
                              <img
                                src={require("../../assest/images/thumb.png")}
                                alt="pic"
                                className="img-fluid"
                              />
                            </span>
                            <div className="a-cont r-cont">
                              <p className="">Margaret Elizabeth</p>
                              <p className="f-12 mb-2">
                                {" "}
                                B.S. Georgia Institute of Technology{" "}
                                <a href="" className="theme-text ml-2">
                                  View Profile
                                </a>
                              </p>
                              <p className="mb-3">
                                Proin luctus, erat eu malesuada vehicula, mi
                                risus porttitor lectus, id luctus tellus sem in
                                purus. Curabitur congue erat a urna auctor, id
                                ullamcorper ligula tempor. Donec tincidunt
                                interdum mi at eleifend.
                              </p>
                              <div className="d-flex justify-content-between">
                                <span className="text-fade f-12">
                                  Comments :- 29 Jul 2019
                                </span>
                                <a href="" className="theme-text">
                                  Reply
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* end of reply section */}
                      </div>
                    </div>
                  </div>
                  {/* end of ans post */}
                  <div className="ans-post">
                    <div className="d-flex">
                      <span className="thumbnail">
                        <img
                          src={require("../../assest/images/thumb.png")}
                          alt="pic"
                          className="img-fluid"
                        />
                      </span>
                      <div className="a-cont">
                        <h6>
                          <b>Dani Richard</b>
                        </h6>
                        <p className="mb-0">
                          B.S. Information and Computer Science & Systems
                          Programming, Georgia Institute of Technology
                        </p>
                        <span className="text-fade">
                          <img
                            src={require("../../assest/images/star.png")}
                            className="mr-2"
                          />{" "}
                          Answered :- 20hrs. ago{" "}
                          <a href="" className="theme-text ml-2">
                            View Profile
                          </a>
                        </span>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Donec volutpat sagittis ullamcorper. In viverra
                          egestas urna ut vestibulum. Donec gravida risus at
                          erat efficitur, nec consectetur erat pretium. Donec
                          arcu felis, vestibulum ac turpis id, posuere aliquet
                          sapien. Morbi congue vel metus sed interdum. Nam sed
                          nisi venenatis, scelerisque ipsum sit amet, volutpat
                          ante. Donec laoreet ut urna id condimentum.{" "}
                        </p>
                        <p>
                          Pellentesque eget aliquet mi. Suspendisse non justo in
                          purus molestie scelerisque. Integer id fermentum
                          tellus. Suspendisse pharetra mi eget luctus feugiat.
                          Praesent accumsan elit dolor, sed pulvinar dui
                          venenatis luctus. Nulla nec turpis varius, cursus nunc
                          et, congue risus. Fusce fermentum velit et tellus
                          mattis, vel cursus odio tempor. Vestibulum semper,
                          diam quis tincidunt aliquam, risus nisi maximus metus,
                          eu scelerisque dui ante eu elit. Proin tincidunt ante
                          dignissim, porta metus a, consequat justo. Quisque
                          accumsan ante sit amet leo faucibus, commodo suscipit
                          lorem mollis.{" "}
                        </p>
                        <div className="likem border-0">
                          <ul className="list-inline list-unstyled d-flex justify-content-end mb-0">
                            <li>
                              <img
                                src={require("../../assest/images/like.png")}
                                alt="pic"
                                className="img-fluid"
                              />{" "}
                              <span>56 Likes</span>
                            </li>
                            <li>
                              <img
                                src={require("../../assest/images/views.png")}
                                alt="pic"
                                className="img-fluid"
                              />{" "}
                              <span>30 views</span>
                            </li>
                          </ul>
                        </div>
                        <div className="form-group d-flex justify-content-between align-items-center border rounded">
                          <input
                            type="text"
                            className="form-control form-control-lg border-0"
                            placeholder="Post Your comment"
                          />
                          <button className="btn btn-link" type="submit">
                            post
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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
              <div className="ques">
                <p>
                  What do you wish you had known about your college/course, that
                  you feel a future student can benefit from? Do you have any
                  advice for future students?
                </p>
                <ul className="list-inline list-unstyled d-flex justify-content-end mb-0">
                  <li>
                    <img
                      src={require("../../assest/images/like.png")}
                      alt="pic"
                      className="img-fluid"
                    />{" "}
                    <span>16 Likes</span>
                  </li>
                  <li>
                    <img
                      src={require("../../assest/images/comment.png")}
                      alt="pic"
                      className="img-fluid"
                    />{" "}
                    <span>21 Answere</span>
                  </li>
                  <li>
                    <img
                      src={require("../../assest/images/views.png")}
                      alt="pic"
                      className="img-fluid"
                    />{" "}
                    <span>30 views</span>
                  </li>
                </ul>
              </div>
              {/*ques end */}
              <div className="ques">
                <p>
                  What do you wish you had known about your college/course, that
                  you feel a future student can benefit from? Do you have any
                  advice for future students?
                </p>
                <ul className="list-inline list-unstyled d-flex justify-content-end mb-0">
                  <li>
                    <img
                      src={require("../../assest/images/like.png")}
                      alt="pic"
                      className="img-fluid"
                    />{" "}
                    <span>16 Likes</span>
                  </li>
                  <li>
                    <img
                      src={require("../../assest/images/comment.png")}
                      alt="pic"
                      className="img-fluid"
                    />{" "}
                    <span>21 Answere</span>
                  </li>
                  <li>
                    <img
                      src={require("../../assest/images/views.png")}
                      alt="pic"
                      className="img-fluid"
                    />{" "}
                    <span>30 views</span>
                  </li>
                </ul>
              </div>
              {/*ques end */}
              <div className="ques">
                <p>
                  What do you wish you had known about your college/course, that
                  you feel a future student can benefit from? Do you have any
                  advice for future students?
                </p>
                <ul className="list-inline list-unstyled d-flex justify-content-end mb-0">
                  <li>
                    <img
                      src={require("../../assest/images/like.png")}
                      alt="pic"
                      className="img-fluid"
                    />{" "}
                    <span>16 Likes</span>
                  </li>
                  <li>
                    <img
                      src={require("../../assest/images/comment.png")}
                      alt="pic"
                      className="img-fluid"
                    />{" "}
                    <span>21 Answere</span>
                  </li>
                  <li>
                    <img
                      src={require("../../assest/images/views.png")}
                      alt="pic"
                      className="img-fluid"
                    />{" "}
                    <span>30 views</span>
                  </li>
                </ul>
              </div>
              {/*ques end */}
              <div className="ques">
                <p>
                  What do you wish you had known about your college/course, that
                  you feel a future student can benefit from? Do you have any
                  advice for future students?
                </p>
                <ul className="list-inline list-unstyled d-flex justify-content-end mb-0">
                  <li>
                    <img
                      src={require("../../assest/images/like.png")}
                      alt="pic"
                      className="img-fluid"
                    />{" "}
                    <span>16 Likes</span>
                  </li>
                  <li>
                    <img
                      src={require("../../assest/images/comment.png")}
                      alt="pic"
                      className="img-fluid"
                    />{" "}
                    <span>21 Answere</span>
                  </li>
                  <li>
                    <img
                      src={require("../../assest/images/views.png")}
                      alt="pic"
                      className="img-fluid"
                    />{" "}
                    <span>30 views</span>
                  </li>
                </ul>
              </div>
              {/*ques end */}
              <div className="ques">
                <p>
                  What do you wish you had known about your college/course, that
                  you feel a future student can benefit from? Do you have any
                  advice for future students?
                </p>
                <ul className="list-inline list-unstyled d-flex justify-content-end mb-0">
                  <li>
                    <img
                      src={require("../../assest/images/like.png")}
                      alt="pic"
                      className="img-fluid"
                    />{" "}
                    <span>16 Likes</span>
                  </li>
                  <li>
                    <img
                      src={require("../../assest/images/comment.png")}
                      alt="pic"
                      className="img-fluid"
                    />{" "}
                    <span>21 Answere</span>
                  </li>
                  <li>
                    <img
                      src={require("../../assest/images/views.png")}
                      alt="pic"
                      className="img-fluid"
                    />{" "}
                    <span>30 views</span>
                  </li>
                </ul>
              </div>
              {/*ques end */}
              <div className="ques">
                <p>
                  What do you wish you had known about your college/course, that
                  you feel a future student can benefit from? Do you have any
                  advice for future students?
                </p>
                <ul className="list-inline list-unstyled d-flex justify-content-end mb-0">
                  <li>
                    <img
                      src={require("../../assest/images/like.png")}
                      alt="pic"
                      className="img-fluid"
                    />{" "}
                    <span>16 Likes</span>
                  </li>
                  <li>
                    <img
                      src={require("../../assest/images/comment.png")}
                      alt="pic"
                      className="img-fluid"
                    />{" "}
                    <span>21 Answere</span>
                  </li>
                  <li>
                    <img
                      src={require("../../assest/images/views.png")}
                      alt="pic"
                      className="img-fluid"
                    />{" "}
                    <span>30 views</span>
                  </li>
                </ul>
              </div>
              {/*ques end */}

              <a href="" className="btn btn-outline">
                Load More
              </a>
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
export default Answered;