import React, { Component } from 'react';
import {Modal, Icon, Popup, Button,  Form, Input} from 'semantic-ui-react'
import axios from 'axios';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';

class LoginClarification extends Component {

    constructor (props){
        super(props);

        this.onClickConfirmButton = this.onClickConfirmButton.bind(this);
        this.onChangeAdminPassword = this.onChangeAdminPassword.bind(this);
        this.onAdminValidation = this.onAdminValidation.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state={
            open: false,
            username: '',
            password: '',
            confirmPassword: '',
            adminPassword:''

        }

    }

    closeModal(){
        this.setState({
            open: !this.state.open
        })
    }

    onChangeAdminPassword(e){
        this.setState({
            adminPassword: e.target.value
        });
    }

    onClickConfirmButton (){

        this.state.username = this.props.username;
        this.state.password = this.props.password;
        this.state.confirmPassword = this.props.confirmPassword;


        const user ={
            username: this.state.username
        }

        if(this.state.username.length===0||this.state.password.length===0||this.state.confirmPassword===0){

            toast({
                type: "error",
                title: "Error",
                description: <p>Please fill up all input fields.</p>,
                icon: "cancel",
              });
        }
        else
          
        axios.post('admin/validateUsername', user).then(res=>{
           // alert('res: '+ res.data.message);
            if (res.data.message===true){

                if (this.state.password===this.state.confirmPassword){

                    if (this.state.password.length>=10&&this.state.password.length<=32){
                        this.setState({
                            open: !this.state.open
                        })
                    }
                    else{
                        toast({
                            type: "error",
                            title: "Error",
                            description: <p>Password should contain 10 to 32 alphanumeric characters</p>,
                            icon: "cancel",
                          });

                          console.log(this.props.username +" "+ this.props.password+" "+ this.props.confirmPassword);
                       // alert('Password should contain 10 to 32 alphanumeric characters');
                    }
                }
                else{
                    toast({
                        type: "error",
                        title: "Error",
                        description: <p>Passwords do not match.</p>,
                        icon: "cancel",
                      });
                    
                }
                
               // alert(this.props.username +" "+ this.props.password+" "+ this.props.confirmPassword);

            }
            else{

                toast({
                    type: "error",
                    title: "Error",
                    description: <p>Username is not found.</p>,
                    icon: "cancel",
                  });
               // alert('Not found');
            }
            
        })


        
        
    }

    onAdminValidation(){


        const creds ={
            newPassword:this.state.adminPassword
        }
        axios.post('admin/checkCurrentAdminPassword', creds).then
        (res=>{


            if (res.data ===true){

                const user ={
                    username:this.state.username,
                    newPassword:this.state.password
                }
                axios.post('admin/updateAccountPassword', user).then(res=>{
                  //  alert("CHANGED: ", res.message);
                  console.log(res.data.message);
                  this.setState({
                    open: !this.state.open
                })

                this.props.open = false;

                }).catch((error)=>{
                        //alert("Error: "+ error);
                        console.log("Error Status:"+error.status);
                        console.log("Error Code: "+error.code);
                 });
            }
            else{
                toast({
                    type: "error",
                    title: "Error",
                    description: <p>Incorrect admin password. Please try again.</p>,
                    icon: "cancel",
                  });

            }
               
           
            
        
        }).catch((error)=>{
           // alert("Error: "+ error);
            console.log("Error Status:"+error.status);
            console.log("Error Code: "+error.code);
        });

       // alert('passed through');
        
    }


    render (){
        let open
        return(
            <div>
                <div className="ui right aligned floated labeled icon green button" id="reset-button" onClick = {this.onClickConfirmButton}>
                            CONFIRM
                            <i className="checkmark icon"></i>
                        </div>

                 <Modal id="login-clarification-modal" open={this.state.open}centered>
                    <Modal.Header>
                    <div className="header"><i className="edit icon" style={{color: "white"}}></i>&nbsp;&nbsp;Reset Password</div>
                    </Modal.Header>

                 <Modal.Content>
                <div className="header"><i className="edit icon" style={{color: "white"}}></i>&nbsp;&nbsp;Reset Password</div>
                    <div className="content">
                        <div className="ui form">
                         <div className="required field" id="admin-input-field">
                            <label>Please input admin password</label>
                            <input type="password" name="admin" id="admin-input" placeholder="Admin Password"value={this.state.adminPassword} onChange={this.onChangeAdminPassword}/>
                        </div>
                    </div>
                </div>
                <div className="actions">
                    <div className="ui right aligned floated labeled icon green button" id="reset-button-admin" onClick = {this.onAdminValidation}>
                        CONFIRM
                        <i className="checkmark icon"></i>
                    </div>
                    <div className="ui right labeled icon cancel button" onClick = {this.closeModal}>
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

export default LoginClarification;