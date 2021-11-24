usercommentSubmit = async () => {
    const obj = {
      message: this.state.message,
      sender_id: localStorage.getItem("user_id"),
      receiver_id: localStorage.getItem("uId"),
      file: this.state.file
      // id: localStorage.getItem("aId")
    };

    console.log("called");

    this.setState({ isLoading: true });
    await axios
      .post(API_URL + "chat/startChat", obj, {
        header: {
          "content-Type": "application/json"
        }
      })
      .then(response => {
        console.log(response);
        localStorage.setItem("roomId", response.data[0].room_id);
        // swal("Your question has been posted successfully!");
        // localStorage.setItem("token", response.data.token);
        // this.props.history.push("/home");
        this.getAnswer();
        this.setState({ isLoading: false });
      })
      .catch(error => {
        // console.log(error);
        //  swal("Invalid Credentials", "Please Check again!", "error");
        this.setState({ isLoading: false });
      });
    await this.setState({ comment: "" });
  };