import React from "react";
import "./style.css";
import { Container, Card, Figure, Form } from "react-bootstrap";
import LogHeader from "../../component/exheader";
import Footer from "../../component/exfooter";
import Camera from "react-ionicons/lib/MdCamera";
import axios from "axios";
import { API_URL } from "../../component/url";

class becomeExpert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      imagePreviewUrl: ""
    };
    this.picChange = this.picChange.bind(this);
  }

  picChange(event) {
    event.preventDefault();
    let reader = new FileReader();
    let image = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        image: image,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(image);
  }

  handleSubmit = e => {
    let formData = new FormData();
    console.log(this.state.image);
    formData.append("image", this.state.image);
    formData.append("id", localStorage.getItem("Id"));
    formData.append("user_id", localStorage.getItem("user_id"));

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    axios
      .post(API_URL + "SaveCoverImage", formData, config)

      .then(async res => {
        window.location.reload(false);
        localStorage.setItem("Id", res.data[0].id);
      })
      .catch(err => console.log(err));
    this.props.history.push("/ExpertProfileEdit");
  };
  back = () => {
    this.props.history.push("/ExpertProfileEdit");
  };
  render() {
    return (
      <section className="become">
        <div>
          <LogHeader />
        </div>
        <div className="become-expert">
          <Container className="h-100">
            <div className="d-flex justify-content-center align-items-center h-100">
              <Card className="popupcrad p-4 w-100">
                <div className="cover-image position-relative mb-0">
                  <Figure
                    className="mb-0 clearfix position-relative d-block"
                    style={{ backgroundColor: "grey" }}
                  >
                    <img
                      src={this.state.imagePreviewUrl}
                      alt=" "
                      className="img-fluid"
                      style={{ height: 180 }}
                    />
                  </Figure>

                  <div className="picupload">
                    <label for="profileupload" className="profileupload">
                      <Camera style={{ fill: "#ddd", width: 18 }} />
                    </label>
                    <Form.Control
                      type="file"
                      id="profileupload"
                      hidden
                      onChange={this.picChange}
                    />
                  </div>
                </div>
                <div className="form-group justify-content-end d-flex mt-3">
                  <button
                    className="btn btn-outline my-0 ml-0 mr-2"
                    onClick={this.back}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-theme" onClick={this.handleSubmit}>
                    Upload
                  </button>
                </div>
              </Card>
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
export default becomeExpert;
