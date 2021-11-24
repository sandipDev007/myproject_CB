import React from 'react';
import './signin.css';
import { Container, Form, InputGroup} from 'react-bootstrap';
import Header from '../../component/exheader'
import Footer from '../../component/footer'
import axios from "axios";
import { API_URL } from "../../component/url";

class Meeting extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            fields: {},
            errors: {}
        };
    }
    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });
       console.log(this.state.fields); 
    }
    submitForm = () => {
        let dataSet = this.validateForm();
        if (dataSet === true) {
            let fields = {};
            fields["Topic"] = "";
            fields["Date"] = "";
            fields["Start_time"] = "";
            fields["End_time"] = "";
            this.handleSubmit();
        }
    };
    validateForm = () => {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["Topic"]) {
            formIsValid = false;
            errors["Topic"] = "*Field can not be empty.";
        }

        if (!fields["Date"]) {
            formIsValid = false;
            errors["Date"] = "*Field can not be empty.";
        }
        if (!fields["Start_time"]) {
            formIsValid = false;
            errors["Start_time"] = "*Field can not be empty.";
        }
        if (!fields["End_time"]) {
            formIsValid = false;
            errors["End_time"] = "*Field can not be empty.";
        }
        this.setState({
            errors: errors
        });
        return formIsValid;
    };
    handleSubmit = () => {
        let body = new FormData();
        body.append("topic", this.state.fields["Topic"]);
        body.append("date", this.state.fields["Date"]);
        body.append("start_time", this.state.fields["Start_time"]);
        body.append("end_date_time", this.state.fields["End_time"]);
        body.append("exp_user_id", localStorage.getItem("user_id"));
        body.append("user_id", 627);
        
        axios.post(API_URL + "createZoomMeeting", body)
        
        this.props.history.push("/exapp");

    };
    back = () => {
        this.props.history.push("/exapp");
    }
    render() {
        return (
            <div className="App-meet">
                <div>
                    <Header />
                </div>
                <Container fluid>
                    <h3 className="theme-text pt-3 text-center">Join Meeting</h3>
                    <section className="d-flex justify-content-center align-items-center meeting-main ">
                            <div className="m-wrap">
                                    <Form.Group controlId="validationlast" className="d-flex">
                                            <InputGroup className="mr-2">
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text className="bg-white text-mute">Choose Topic</InputGroup.Text>
                                                </InputGroup.Prepend>
                                                    <Form.Control as="select" name="Topic" className="shadow-none" value={this.state.fields.Topic} onChange={this.handleChange}>
                                                        <option>Join Meeting</option>
                                                        <option>Feedback</option>
                                                    </Form.Control>
                                            </InputGroup>                                     
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text className="bg-white text-mute">Choose Date</InputGroup.Text>
                                                </InputGroup.Prepend>
                                                    <Form.Control type="date" name="Date" className="shadow-none" value={this.state.fields.Date} onChange={this.handleChange}/>
                                            </InputGroup>
                                            <div className="errorMsg">
                                                {this.state.errors.Date}   
                                            </div>
                                    </Form.Group>
                                    <Form.Group controlId="validationlast" className="d-flex">                                                                    
                                            <InputGroup className="mr-2">
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text className="bg-white text-mute">Start Time</InputGroup.Text>
                                                </InputGroup.Prepend>
                                                    <Form.Control type="time" name="Start_time" className="shadow-none" value={this.state.fields.Start_time} onChange={this.handleChange}/>
                                            </InputGroup>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text className="bg-white text-mute">End Time</InputGroup.Text>
                                                </InputGroup.Prepend>
                                                    <Form.Control type="time" name="End_time" className="shadow-none" value={this.state.fields.End_time} onChange={this.handleChange}/>
                                            </InputGroup>
                                    </Form.Group>

                                <div className="form-group justify-content-center d-flex pt-3">
                                    <button className="btn btn-outline my-0 ml-0 mr-2" type="button" onClick={this.back}>Cancel</button>
                                    <button className="btn btn-theme" type="submit" onClick={this.submitForm}>Submit</button>
                                </div>
                                    
                            </div>
                    </section>
                </Container>
                <div>
                    <Footer />
                </div>
            </div>                
            );
        }
    }
export default Meeting;