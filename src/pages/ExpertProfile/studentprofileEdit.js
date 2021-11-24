/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import React from "react";
import "./style.css";
import { Container, Row, Col, Figure, InputGroup, Form, Modal } from "react-bootstrap";
import LogHeader from "../../component/loginheader";
import Footer from "../../component/footer";
import Camera from "react-ionicons/lib/MdCamera";
import axios from "axios";
import { API_URL } from "../../component/url";
import Autocomplete from "react-autocomplete";
import ReadMoreReact from "read-more-react";
import Select from "react-select";
import countryList from "react-select-country-list";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

class stprofileedit extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.getItemValue = this.getItemValue.bind(this);
    this.renderItem = this.renderItem.bind(this);

    // this.onChange1 = this.onChange1.bind(this);
    // this.onSelect1 = this.onSelect1.bind(this);
    // this.getItemValue1 = this.getItemValue1.bind(this);
    // this.renderItem1 = this.renderItem1.bind(this);
    this.options = countryList().getData();

    this.state = {
      isVerified: false
    };
    this.state = {
      profiledataset: [],
      autocompleteData: [],
      //autocompleteData1: [],
      value: "",
      //value1: "",
      department: "",
      interests: "",
      country: "",
      about: "",
      questioncount: [],
      options: this.options,
      show: false,
      stateModal1: "block",
      src: null,
      crop: {
        unit: 'px', // default, can be 'px' or '%'
        x: 130,
        y: 50,
        width: 200,
        height: 200
      },
      image: "",
      arg: "",
      url: ""
    };
  }

  // coverpicChange = () => {
  //   this.props.history.push("/studentCoverImage");
  // };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  changeHandler = country => {
    this.setState({ country: country.label });
  };

  onChange(event) {
    console.log(event.target.value);
    this.setState({
      value: event.target.value
    });
    this.setState({
      department: event.target.value
    });
    this.userSearch();
  }

  // onChange1(event) {
  //   console.log(event.target.value);
  //   this.setState({
  //     value1: event.target.value
  //   });
  //   this.setState({
  //     interests: event.target.value
  //   });
  //   this.userSearch1();
  // }

  renderItem(item, isHighlighted) {
    var data = item.department.replace(
      this.state.value,
      this.state.value.toUpperCase()
    );

    return (
      <div style={{ background: isHighlighted ? "lightgray" : "white" }}>
        {data}
      </div>
    );
  }
  // renderItem1(item, isHighlighted) {
  //   var data1 = item.tag.replace(
  //     this.state.value1,
  //     this.state.value1.toUpperCase()
  //   );

  //   return (
  //     <div style={{ background: isHighlighted ? "lightgray" : "white" }}>
  //       {data1}
  //     </div>
  //   );
  // }

  onSelect(value) {
    console.log(value);
    this.setState({
      value: value
    });
  }
  // onSelect1(value1) {
  //   console.log(value1);
  //   this.setState({
  //     value1: value1
  //   });
  // }
  getItemValue(item) {
    return `${item.department}`;
  }
  // getItemValue1(item) {
  //   return `${item.tag}`;
  // }

  userSearch = async () => {
    const obj = {
      text: this.state.department
    };

    this.setState({ isLoading: true });
    await axios
      .post(API_URL + "deptGet", obj, {
        header: {
          "content-Type": "application/json"
        }
      })
      .then(response => {
        this.setState({
          autocompleteData: response.data
        });
      });
  };
  // userSearch1 = async () => {
  //   const obj = {
  //     text: this.state.interests
  //   };

  //   this.setState({ isLoading: true });
  //   await axios
  //     .post(API_URL + "tagGet", obj, {
  //       header: {
  //         "content-Type": "application/json"
  //       }
  //     })
  //     .then(response => {
  //       this.setState({
  //         autocompleteData1: response.data
  //       });
  //     });
  // };

  componentDidMount = async () => {
    if (
      localStorage.getItem("token") == null &&
      localStorage.getItem("user_id") == null
    ) {
      this.props.history.push("/urlblocker");
    }

    let body1 = new FormData();

    body1.append("id", localStorage.getItem("Id"));
    body1.append("user_id", localStorage.getItem("user_id"));

    //For Edit Intro
    body1.append("name", "");
    body1.append("college", "");
    body1.append("department", "");
    body1.append("expertise", "");
    body1.append("country", "");
    body1.append("about", "");
    body1.append("interests", "");

    // For Education
    body1.append("title", "");
    body1.append("type", "");
    body1.append("institute", "");
    body1.append("location", "");
    body1.append("startDate", "");
    body1.append("endDate", "");

    //For f & S
    body1.append("community", "");
    body1.append("city", "");

    body1.append("paypalId", "");

    await axios
      .post(API_URL + "expertProfile", body1)
      .then(res => {
        this.setState({
          value: res.data[0].department,
          interests: res.data[0].interests,
          country: res.data[0].country,
          about: res.data[0].about,
          profiledataset: res.data
        });
      })
      .catch(error => {
        console.log(error);
      });

    let body2 = new FormData();
    body2.append("user_id", localStorage.getItem("user_id"));
    body2.append("offset", "");
    await axios({
      url: API_URL + "userQuesCount",
      method: "POST",
      data: body2
    })
      .then(response => {
        this.setState({
          questioncount: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleSubmit = async () => {
    let body = new FormData();

    body.append("id", localStorage.getItem("Id"));
    body.append("user_id", localStorage.getItem("user_id"));

    //For Edit Intro
    body.append("name", localStorage.getItem("username"));
    body.append("college", "");
    body.append("department", this.state.value);
    body.append("interests", this.state.interests);
    body.append("country", this.state.country);
    body.append("about", this.state.about);
    body.append("expertise", "")

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
    body.append("flag", "");

    await axios.post(API_URL + "expertProfile", body).then(res => {
      console.log(res);
      console.log(res.data);
      this.props.history.push("/studentProfile");
    });
  };

  handleUpload = async e => {
    let formData = new FormData();
    console.log(this.state.image);
    formData.append("image", this.state.url);
    formData.append("id", localStorage.getItem("Id"));
    formData.append("user_id", localStorage.getItem("user_id"));

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    await axios
      .post(API_URL + (this.state.arg == "profile" ? "SaveProfileImage" : "SaveCoverImage"), formData, config)

      .then(async res => {
        console.log(res.data[0].id);
        // localStorage.setItem("Id", res.data[0].id);
        window.location.reload(false);
        this.handleSubmit();
        this.props.history.push("/studentprofileEdit");
      })
      .catch(err => console.log(err));
  };

  handleClose = () => {
    this.setState({
      show: false
    });
    this.handleClear()
  };

  handleShow = async (arg) => {
    await this.setState({
      show: true,
      stateModal1: "none",
      arg: arg
    });
    console.log(this.state.arg)
  };

  back = () => {
    this.props.history.push("/studentProfile");
  };

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      let image = e.target.files[0];
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result, image: image })
      );
      reader.readAsDataURL(image);
      console.log(this.state.image);
    }
  };

  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    this.setState({ crop });
    console.log(this.state.crop);
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
    }
  }

  async getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    var dataurl = canvas.toDataURL(fileName)
    await this.setState({ url : dataurl });
    console.log(this.state.url);
  }

  SelectInterest = () => {
    this.props.history.push("/EditUserTags");
  };

  handleClear = event => {
    if(event) event.preventDefault()
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    this.setState({
      src: null,
      crop: {
          unit: 'px',
          x: 130,
          y: 50,
          width: 200,
          height: 200
        }
    })
  }

  render() {
    const { crop, croppedImageUrl, src } = this.state;
    return (
      <div className="apps-main">
        <div>
          <LogHeader />
        </div>
        <Container fluid className="mainbody">
          <Row>
            <Col lg={9}>
              <div className="expert-main-profile py-4">
                {this.state.profiledataset.map((value, index) => {
                  return (
                    <div className="cover-image position-relative mb-0">
                      <Figure className="mb-0 clearfix position-relative d-block">
                        <img
                          src={value.cover_image}
                          alt="coverpic"
                          className="img-fluid"
                        />
                        <div className="uploadcover">
                          <label for="coverupload" className="coverupload">
                            <Camera
                              style={{ fill: "#03639d", width: 18 }}
                              onClick={() => this.handleShow("cover")}
                            />
                          </label>
                        </div>
                      </Figure>
                      <div className="profile-area d-flex">
                        <Figure className="img-circle">
                          <img
                            src={value.user_image}
                            alt="profile pic"
                            className="img-fluid"
                          />
                        </Figure>

                        <div className="picupload">
                          <label for="profileupload" className="profileupload">
                            <Camera
                              style={{ fill: "#ddd", width: 18 }}
                              onClick={() => this.handleShow("profile")}
                            />
                          </label>
                        </div>
                        <div>
                          <Modal
                            show={this.state.show}
                            onHide={this.handleClose}
                            className="my-newmodal"
                          >
                            <Modal.Header closeButton onClick={this.handleClear}>
                              <Modal.Title>Upload Image</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <div>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={this.onSelectFile}
                                />
                              </div>
                              {src && (
                                <ReactCrop
                                  src={src}
                                  crop={crop}
                                  ruleOfThirds
                                  onImageLoaded={this.onImageLoaded}
                                  onComplete={this.onCropComplete}
                                  onChange={this.onCropChange}
                                />
                              )}

                              <div className="form-group d-flex justify-content-end mt-3">
                                <button
                                  className="btn btn-info rounded-pill px-4 ml-2"
                                  onClick={this.handleClose}
                                >
                                  Cancel
                                </button>
                                <button
                                  className="btn btn-theme rounded-pill px-4 ml-2"
                                  onClick={this.handleUpload}
                                >
                                  Upload
                                </button>
                              </div>
                            </Modal.Body>
                          </Modal>
                        </div>
                        <div className="profile-content">
                          <h5>{value.name}</h5>
                          {/* <p>{localStorage.getItem("collName")}</p> */}
                        </div>
                      </div>
                    </div>
                  );
                })}
                {/* end of cover image */}

                <div className="exp-main list-head">
                  <h3>Edit intro</h3>
                  <Row>
                    <Col md="6" sm="6">
                      <Form.Group controlId="validationlast">
                        <InputGroup>
                          <InputGroup.Prepend>
                            <InputGroup.Text className="bg-white text-mute">
                              *Department
                            </InputGroup.Text>
                          </InputGroup.Prepend>
                          <div
                            name="department"
                            type="text"
                            className="w-100 input-box autocomplete boxex2 mrt0"
                            style={{ position: "static" }}
                            value={this.state.value}
                          >
                            <Autocomplete
                              getItemValue={this.getItemValue}
                              items={this.state.autocompleteData}
                              renderItem={this.renderItem}
                              value={this.state.value}
                              onChange={this.onChange}
                              onSelect={this.onSelect}
                            />
                          </div>
                        </InputGroup>
                      </Form.Group>
                    </Col>


                    <Col md="6" sm="6">
                      <Form.Group controlId="validationlast">
                        <InputGroup>
                          <InputGroup.Prepend>
                            <InputGroup.Text className="bg-white text-mute">
                              *Country
                            </InputGroup.Text>
                          </InputGroup.Prepend>
                          <Select
                            className="shadow-none"
                            type="text"
                            name="country"
                            options={this.state.options}
                            value={{
                              value: this.state.country,
                              label: this.state.country
                            }}
                            onChange={this.changeHandler}
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>

                    <Col md="12" sm="12">
                      <Form.Group controlId="validationlast">
                        <InputGroup className="flex-nowrap">
                          <InputGroup.Prepend>
                            <InputGroup.Text disabled className="bg-white text-mute">
                              Interests
                            </InputGroup.Text>
                          </InputGroup.Prepend>

                          <small className="d-block text-capitalized tadd">
                            <Form.Control
                              name="interests"
                              type="text"
                              value={this.state.interests} readOnly
                              onChange={this.handleChange}
                            />
                          </small>
                          <img className="addinterest-icon" src={require("../../assest/images/add.png")} alt="" onClick={this.SelectInterest} />

                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
                <div className="exp-main list-head">
                  <h3>About</h3>
                  <div className="mb-3">
                    <Form.Control
                      name="about"
                      as="textarea"
                      rows="3"
                      placeholder="Write Here..."
                      value={this.state.about}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group justify-content-end d-flex mt-3">
                    <button
                      className="btn btn-outline my-0 ml-0 mr-2"
                      type="button"
                      onClick={this.back}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-theme"
                      type="button"
                      disabled={!this.state.value || !this.state.country}
                      onClick={this.handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={3} className="pr-md-0">
              <div className="rightsidebar">
                <div className="toppan py-3 px-4">
                  {this.state.questioncount.map((item, index) => {
                    if (item.message == "N")
                      return (
                        <h6>
                          {item.name} you haven't posted any question yet.
                        </h6>
                      );
                    if (index < 1)
                      return (
                        <h2>Question Posted by {item.name}</h2>
                      );
                  })}
                </div>
                {this.state.questioncount.map((item, index) => {
                  if (item.message != "N" && index<6) {
                    return (
                      <div className="ques">
                        <p>
                          <span class="question-number">
                            <b>Q - </b>
                          </span>
                          <ReadMoreReact
                            text={item.question}
                            min={30}
                            ideal={70}
                            max={500}
                            readMoreText="read more"
                          />
                        </p>
                      </div>
                    );
                  }
                })}
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

export default stprofileedit;
