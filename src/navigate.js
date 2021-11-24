import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import index from "./pages/Landing/index";
import signin from "./pages/signIn/signin";
import App from "./pages/Home/App";
import tags from "./pages/tags/tags";
import signup from "./pages/signIn/signup";
import qustionlist from "./pages/Home/qustionlist";
import Answeredpage from "./pages/Home/Answeredpage";
import BecomeExpert from "./pages/ExpertProfile/BecomeExpert";
import ExpertRegister from "./pages/ExpertProfile/ExpertRegister";
import exapp from "./pages/Home/exapp";
import exAnswerpage from "./pages/Home/exAnswerpage";
import exquestionlist from "./pages/Home/exquestionlist";
import extags from "./pages/tags/extags";
import expertanswer from "./pages/Home/expertanswer";
import ExpertProfile from "./pages/ExpertProfile/ExpertProfile";
import ExpertProfileEdit from "./pages/ExpertProfile/ExpertProfileEdit";
import EducationEdit from "./pages/ExpertProfile/EducationEdit";
import SororitiesEdit from "./pages/ExpertProfile/SororitiesEdit";
import ExpertImage from "./pages/ExpertProfile/ExpertImage";
import studentProfile from "./pages/ExpertProfile/studentProfile";
import studentprofileEdit from "./pages/ExpertProfile/studentprofileEdit";
import studentImage from "./pages/ExpertProfile/studentImage";
import checkout from "./pages/Home/checkout";
import PayPalExpressCheckOut from "./pages/Home/PaypalButton";
import viewProfile from "./pages/ExpertProfile/viewProfile";
import userviewProfile from "./pages/ExpertProfile/userviewProfile";
import studentEduEdit from "./pages/ExpertProfile/studentEduEdit";
import studentSoroEdit from "./pages/ExpertProfile/studentSoroEdit";
import Forgot from "./pages/signIn/Forgot";
import Reset from "./pages/signIn/Reset";
import chat from "./pages/chat/chat";
import ExpertCoverImage from "./pages/ExpertProfile/ExpertCoverImage";
import studentCoverImage from "./pages/ExpertProfile/studentCoverImage";
import MyExpert from "./pages/Home/MyExpert";
import MyUser from "./pages/Home/MyUser";
import uChat from "./pages/chat/uChat";
import connectedprofile from "./pages/ExpertProfile/connectedprofile";
import userblank from "./pages/Home/userblank";
import expertblank from "./pages/Home/expertblank";
import urlblocker from "./pages/Home/urlblocker";
import tagsheader from "./component/tagsheader";
import expertanswerblank from "./pages/Home/expertanswerblank";
import expertlist from "./pages/Home/expertlist";
import feedback from "./pages/Home/feedback";
import myexpertBlank from "./pages/Home/myexpertBlank";
import userRequest from "./pages/Home/userRequest";
import userRequestblank from "./pages/Home/userRequestblank";
import myuserBlank from "./pages/Home/myuserBlank";
import paypalid from "./pages/ExpertProfile/paypalid";
import MyConnection from "./pages/Home/MyConnection";
import userConnection from "./pages/Home/userConnection";
import MyConnectionBlank from "./pages/Home/MyConnectionBlank";
import userConnectionBlank from "./pages/Home/userConnectionBlank";
import userConnectedprofile from "./pages/ExpertProfile/userConnectedprofile";
import nochat from "./pages/chat/nochat";
import exnodata from "./pages/chat/exnodata";
import startExchat from "./pages/chat/startExchat";
import startUserchat from "./pages/chat/startUserchat";
import EditUserTags from "./pages/tags/EditUserTags";
import EditExInterest from "./pages/tags/EditExInterest";
import EditExExpertise from "./pages/tags/EditExExpertise";
import VerifyEmail from "./pages/signIn/VerifyEmail";
import mentorExpertlist from "./pages/Home/mentorExpertlist";
import expertConnection from "./pages/Home/expertConnection";
import expertConnectionblank from "./pages/Home/expertConnectionblank";
import expertChat from "./pages/chat/expertChat";
import startExpertchat from "./pages/chat/startExpertchat";
import exCheckout from "./pages/Home/exCheckout";
import expertviewProfile from "./pages/ExpertProfile/expertviewProfile";
import expertConnectedprofile from "./pages/ExpertProfile/expertConnectedprofile";
import AnswerView from "./pages/ExpertProfile/AnswerView";
import ConnectedAnswerView from "./pages/ExpertProfile/ConnectedAnswerView";
import ViewProfileAnswer from "./pages/ExpertProfile/ViewProfileAnswer";
import ExViewProAnswer from "./pages/ExpertProfile/ExViewProAnswer";
import ExConnectedProAnswer from "./pages/ExpertProfile/ExConnectedProAnswer";
import contactUS from "./pages/Landing/contactUS";
import tandc from "./pages/Landing/tandc";
import privacypolicy from "./pages/Landing/privacyPolicy";
import apptandc from "./pages/Landing/apptandc";
import exapptandc from "./pages/Landing/exapptandc";
import excontactUS from "./pages/Landing/excontactUS";
import exprivacyPolicy from "./pages/Landing/exprivacyPolicy";
import ourstory from "./pages/Landing/ourstory";
import exourstory from "./pages/Landing/exourstory";
import outerprivacyPolicy from "./pages/Landing/outerprivacyPolicy";
import outercontactUS from "./pages/Landing/outercontactUS";
import outerourstory from"./pages/Landing/outerourstory";
import upload from "./pages/ExpertProfile/upload";
import verifyExpert from "./pages/signIn/verifyExpert";
import accept from "./pages/ExpertProfile/accept";
import successfulverifyExpert from "./pages/signIn/successfulverifyExpert";
import become from "./pages/ExpertProfile/become";
import viewuserProfile from "./pages/ExpertProfile/viewuserProfile";
import socialtags from "./pages/tags/socialtags";
import studentSettings from "./pages/ExpertProfile/studentSettings";
import exSettings from "./pages/ExpertProfile/exSettings";








export default class Navigation extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={index} />
        <Route exact path="/signin" component={signin} />
        <Route path="/App" component={App} />
        <Route path="/tags" component={tags} />
        <Route path="/signup" component={signup} />
        <Route path="/qustionlist" component={qustionlist} />
        <Route path="/Answeredpage" component={Answeredpage} />
        <Route path="/BecomeExpert" component={BecomeExpert} />
        <Route path="/ExpertRegister" component={ExpertRegister} />
        <Route path="/exapp" component={exapp} />
        <Route path="/exAnswerpage" component={exAnswerpage} />
        <Route path="/exquestionlist" component={exquestionlist} />
        <Route path="/extags" component={extags} />
        <Route path="/expertanswer" component={expertanswer} />
        <Route path="/ExpertProfile" component={ExpertProfile} />
        <Route path="/ExpertProfileEdit" component={ExpertProfileEdit} />
        <Route path="/EducationEdit" component={EducationEdit} />
        <Route path="/SororitiesEdit" component={SororitiesEdit} />
        <Route path="/ExpertImage" component={ExpertImage} />
        <Route path="/studentProfile" component={studentProfile} />
        <Route path="/studentprofileEdit" component={studentprofileEdit} />
        <Route path="/studentImage" component={studentImage} />
        <Route path="/checkout" component={checkout} />
        <Route path="/PayPalExpressCheckOut" component={PayPalExpressCheckOut} />
        <Route path="/viewProfile" component={viewProfile} />
        <Route path="/userviewProfile" component={userviewProfile} />
        <Route path="/studentEduEdit" component={studentEduEdit} />
        <Route path="/studentSoroEdit" component={studentSoroEdit} />
        <Route path="/Forgot" component={Forgot} />
        <Route path="/Reset" component={Reset} />
        <Route path="/chat" component={chat} />
        <Route path="/index" component={index} />
        <Route path="/ExpertCoverImage" component={ExpertCoverImage} />
        <Route path="/MyExpert" component={MyExpert} />
        <Route path="/MyUser" component={MyUser} />
        <Route path="/uChat" component={uChat} />
        <Route path="/studentCoverImage" component={studentCoverImage} />
        <Route path="/connectedprofile" component={connectedprofile} />
        <Route path="/userblank" component={userblank} />
        <Route path="/expertblank" component={expertblank} />
        <Route path="/urlblocker" component={urlblocker} />
        <Route path="/tagsheader" component={tagsheader} />
        <Route path="/expertanswerblank" component={expertanswerblank} />
        <Route path="/expertlist" component={expertlist} />
        <Route path="/feedback" component={feedback} />
        <Route path="/myexpertBlank" component={myexpertBlank} />
        <Route path="/userRequest" component={userRequest} />
        <Route path="/userRequestblank" component={userRequestblank} />
        <Route path="/myuserBlank" component={myuserBlank} />
        <Route path="/paypalid" component={paypalid} />
        <Route path="/MyConnection" component={MyConnection} />
        <Route path="/userConnection" component={userConnection} />
        <Route path="/MyConnectionBlank" component={MyConnectionBlank} />
        <Route path="/userConnectionBlank" component={userConnectionBlank} />
        <Route path="/userConnectedprofile" component={userConnectedprofile} />
        <Route path="/nochat" component={nochat} />
        <Route path="/exnodata" component={exnodata} />
        <Route path="/startExchat" component={startExchat} />
        <Route path="/startUserchat" component={startUserchat} />
        <Route path="/EditUserTags" component={EditUserTags} />
        <Route path="/EditExInterest" component={EditExInterest} />
        <Route path="/EditExExpertise" component={EditExExpertise} />
        <Route path="/VerifyEmail" component={VerifyEmail} />
        <Route path="/mentorExpertlist" component={mentorExpertlist} />
        <Route path="/expertConnection" component={expertConnection} />
        <Route path="/expertConnectionblank" component={expertConnectionblank} />
        <Route path="/expertChat" component={expertChat} />
        <Route path="/startExpertchat" component={startExpertchat} />
        <Route path="/exCheckout" component={exCheckout} />
        <Route path="/expertviewProfile" component={expertviewProfile} />
        <Route path="/expertConnectedprofile" component={expertConnectedprofile} />
        <Route path="/AnswerView" component={AnswerView} />
        <Route path="/ConnectedAnswerView" component={ConnectedAnswerView} />
        <Route path="/ViewProfileAnswer" component={ViewProfileAnswer} />
        <Route path="/ExViewProAnswer" component={ExViewProAnswer} />
        <Route path="/ExConnectedProAnswer" component={ExConnectedProAnswer} />
        <Route path="/contactUS" component={contactUS} />
        <Route path="/tandc" component={tandc} />
        <Route path="/privacyPolicy" component={privacypolicy} />
        <Route path="/apptandc" component={apptandc} />
        <Route path="/exapptandc" component={exapptandc} />
        <Route path="/excontactUS" component={excontactUS} />
        <Route path="/exprivacyPolicy" component={exprivacyPolicy} />
        <Route path="/ourstory" component={ourstory} />
        <Route path="/exourstory" component={exourstory} />
        <Route path="/outerprivacyPolicy" component={outerprivacyPolicy} />
        <Route path="/outercontactUS" component={outercontactUS} />
        <Route path="/outerourstory" component={outerourstory} />
        <Route path="/upload" component={upload} />
        <Route path="/verifyExpert" component={verifyExpert} />
	      <Route path="/accept" component={accept} />
        <Route path="/successfulverifyExpert" component={successfulverifyExpert} />
        <Route path="/become" component={become} />
        <Route path="/viewuserProfile" component={viewuserProfile} />
        <Route path="/socialtags" component={socialtags} />
        <Route path="/studentSettings" component={studentSettings} />
        <Route path="/exSettings" component={exSettings} />

        
      </Router>
    );
  }
}
