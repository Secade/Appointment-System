import axios from 'axios';
import React, { Component } from 'react';
import {Modal, Icon, Popup, Button,  Form, Input} from 'semantic-ui-react'
import LoginClarification from '../sign-in/LoginClarification';
//import Logo from './logo.png';
//import Modal from 'react-modal';
//import './loginCSS.css';
import loginConfirmation from '../sign-in/LoginClarification'

class ResetPasswordModalComponent extends Component{


    constructor (props){
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onClickForgotButton = this.onClickForgotButton.bind(this);
        this.state={
            open: false,
            username: '',
            password: '',
            confirmPassword: ''
        }
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

    onChangeConfirmPassword(e){
        this.setState({
            confirmPassword: e.target.value
        });
    }


    onClickForgotButton (){


        this.setState({
            open: !this.state.open
        });


        
    }

    onSubmitNewPassword(){

       
        
    }

    render (){
        let open      
        return(

            <div>
                <div className="ui button" id="forgot" style={{paddingBottom: "15px", textDecoration: "underline", backgroundColor: "transparent"}}onClick = {this.onClickForgotButton}>Forgot password?</div>
                <Modal id="rest-password-modal" open={this.state.open} centered>
                <Modal.Header>
                <i className="edit icon" style={{color: "white"}}></i>&nbsp;&nbsp;Reset Password
                </Modal.Header>

                <Modal.Content>
                    <div className="content">
                        <div className="ui form">
                            <div className="required field" id="reset-username-field">
                                <label>Username</label>
                                <input type="text" name="username" id="reset-username" placeholder="Username" value={this.state.username} onChange ={this.onChangeUserName}/>
                            </div>
                            <div className="required field" id="reset-password-field">
                                <label>Password</label>
                                    <div data-tooltip="Password should contain 10 to 32 alphanumeric characters" data-position="right center">
                                        <input type="password" name="password" id="reset-password" placeholder="Password" value={this.state.password} onChange={this.onChangePassword}/>
                                    </div>
                            </div>
                            <div className="required field" id="reset-confirm-password-field">
                                <label>Confirm Password</label>
                                    <div data-tooltip="Password should contain 10 to 32 alphanumeric characters" data-position="right center">
                                        <input type="password" name="confirmPassword" id="reset-confirm-password" placeholder="Password" value={this.state.confirmPassword} onChange={this.onChangeConfirmPassword}/>
                                    </div>
                            </div>
                        </div>
                    </div>

                    <div className="actions">
                        <div style ={{left: "50px", display: "inline-block"}}>
                        <LoginClarification username = {this.state.username} password ={this.state.password} confirmPassword = {this.state.confirmPassword}></LoginClarification>
                        </div>
                        
                        <div className="ui right labeled icon cancel button" onClick = {this.onClickForgotButton} >
                            CANCEL
                            <i className="cancel icon"></i>
                        </div>
                    </div>
                    
                </Modal.Content>
            </Modal>
            
            </div>
            
          

        );
    }

}
export default ResetPasswordModalComponent;