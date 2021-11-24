/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import axios from "axios";
import { API_URL } from "../../component/url";

class Like extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likeset: "",
      likestatus: false,
      questionset: [],
      answerset: []
    };
  }

  getUpdatedData = async () => {
    let body = new FormData();

    body.append("user_id", localStorage.getItem("user_id"));
    body.append("Flag", localStorage.getItem("flag"));

    await axios({
      url: API_URL + "Questions/feedQuestions",
      method: "POST",
      data: body
    }).then(response => {
      console.log(response.data);
      this.setState({
        questionset: response.data.sort(function(a, b) {
          if (a.views > b.views) return -1;
          return 0;
        }),
        answerset: response.data
      });
    });
  };

  userLike = async () => {
    const obj1 = {
      question_id: this.props.question_id,
      user_id: localStorage.getItem("user_id"),
      answer_id: this.props.answer_id,
      status: "like"
    };
    await axios
      .post(API_URL + "Answer/answerLike", obj1, {
        header: {
          "content-Type": "application/json"
        }
      })

      .then(response => {
        // window.location.reload(false);

        if (!this.state.likestatus) {
          this.setState((prevState, props) => {
            return {
              likeset: prevState.likeset + 1,
              likestatus: true
            };

          });
        } else {
          this.setState((prevState, props) => {
            return {
              likeset: prevState.likeset - 1,
              likestatus: false
            };
          });
        }
        this.getUpdatedData();
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div style={{ cursor: "pointer" }}>
        <p onClick={this.userLike}>
          {this.state.likestatus === false ? (
            <img src={require("../../assest/images/like.png")} />
          ) : (
            <img src={require("../../assest/images/like1.png")} />
          )}
        </p>
      </div>
    );
  }
}

export default Like;
