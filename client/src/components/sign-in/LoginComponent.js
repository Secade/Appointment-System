import React, { Component } from 'react';
import Logo from './logo.png';
import loginStyles from './loginCSS.css';
import axios from 'axios';
//import Modal from 'react-modal';
import ResetPasswordModalComponent from './ResetPasswordModalComponent';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom"
import { Button, Header, Image, Modal, Form, Select, Step } from 'semantic-ui-react'
import { useHistory } from "react-router-dom";
import Dentist from '../dentist/page/DentistPageComponent';
import Secretary from "../secretary/pages/secretary-view";
import Admin from "../admin/pages/admin";
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';

class LoginComponent extends Component {

    constructor (props){
        super(props);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.getSession = this.getSession.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state={
            username: '',
            password: '',
        }
        
    }

    componentDidMount(){
        this.getSession();

    }

    getSession(){
        axios.get("/login").then(res=>{
           // alert(res.data.message);
            console.log("login: "+res.data.message);
            this.redirecToPage(res.data.message);
        })

    }
   

    onChangeUserName(e){
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }

    redirecToPage=(type)=>{
        const {history} = this.props;
        switch(type){
            case 1:
                window.location.href =window.location.href+"secretary";
                console.log('sec');
                break;
            case 2:
                axios.get('dentist//getCurrentDentist').then(res=>{
                    if (res.data.status==="Active")
                        //console.log("ACTIVE");
                        window.location.href =window.location.href+"dentist";
                })
               
                break;
            case 3:
                window.location.href =window.location.href+"admin";
                break;

        }
    }

    redirectToDentist = () => {
        //alert("Home");
        const { history } = this.props;
        window.location.href = window.location.href+"dentist"
       }

       redirectToSecretary = () => {
        //alert("Home");
        const { history } = this.props;
        window.location.href = window.location.href+"dentist"
       }


       redirectToAdmin = () => {
        //alert("Admin");
       // const { history } = this.props;
       // history.push('/admin');
       window.location.href = window.location.href+"admin";
       }

    onSubmit (e){

        //this.redirectToHome();
        e.preventDefault();

        const user ={
            username: this.state.username,
            password: this.state.password
        }



        console.log(user);
        axios.post('validateLogin', user).then
        (res=>{

            if (res.data.message===2){
                toast({
                    type: "error",
                    title: "Error",
                    description: <p>Invalid Password. Try again.</p>,
                    icon: "cancel",
                  });
            }

            else if (res.data.message===0){
                toast({
                    type: "error",
                    title: "Error",
                    description: <p>This account does not exist.</p>,
                    icon: "cancel",
                  });
            }

            
            console.log(res.data)
            this.getSession();
        
        }).catch((error)=>{
            console.log("Error: "+ error);
            console.log("Error Status:"+error.status);
            console.log("Error Code: "+error.code);
            //history.pushState("/dentist");
        });

      //  window.location = '/';
    }

    render(){
        return (
        
           <div style={loginStyles}>
               <Router>
                    <Route path="/dentist" component={Dentist}/>
                    <Route path = "/secretary" component={Secretary}/>
                    <Route path = "/admin" component={Admin}/>
               </Router>
             <head>
              <title>Access Dental Clinic | Login</title>
              <script src="javascript/jquery.js"></script>
    
            </head>
           

<div className="ui middle aligned center aligned very padded grid">
<div className = "column" style ={{maxWidth: "300px"}}>
            {/*ADD LOGO*/}
            <div className="row" style ={{marginTop: "50px"}}><img src = {Logo} alt="pic" className="ui image" /></div>
            <SemanticToastContainer></SemanticToastContainer>
            
            {/*FORM*/}
            <form className="ui large form" id="form" onSubmit={this.onSubmit}>
                <div className="ui stacked segment">
                     <div className="field" id="username-input">
                         <div className="ui left icon input">
                             <i className="user icon"></i>
                             <input type="text" 
                                    name="username" 
                                    id="username" 
                                    placeholder="Username"
                                    value={this.state.username}
                                    onChange ={this.onChangeUserName}></input>
                         </div>
                     </div> 
                     <div className="field" id="password-input">
                         <div className="ui left icon input">
                             <i className="lock icon"></i>
                             <input type="password" 
                                    name="password" 
                                    id="password" 
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}></input>
                         </div>
                     </div>
                     
                   {/*  <div className="ui button" id="forgot" style={{paddingBottom: "15px", textDecoration: "underline", backgroundColor: "transparent"}}>Forgot password?</div>*/}
                   <ResetPasswordModalComponent></ResetPasswordModalComponent>
                         <button type="button" id="submit" className="ui fluid large pink submit button" onClick = {this.onSubmit}>Login</button>
                        
                </div>
            </form>
            
            </div>
            
            </div>

           </div>
           

           


        );
    }
}

export default LoginComponent;
