import React, {Component} from 'react';
import Picker from './dentist-date-picker'
import {Dropdown, Table} from 'semantic-ui-react'
import moment from 'moment'
import axios from 'axios';


export default class SecretaryNavigationbar extends Component{
    handleOnToday =()=>{
        this.props.onToday()
    }
    handleOnPrev =()=>{
        this.props.onPrev()
    }
    handleOnNext =()=>{
        this.props.onNext()
    }

    handleChangeDate=(date)=>{
        this.props.onChangeDate(date)
    }

    logout(){
        axios.get('/logout').then(console.log('Logout Successfully'));
        window.location.href ="/";
    }


    render(){

        let newDate = Date.parse(this.props.date)
        let formattedDate = moment(newDate).format("MMMM D, YYYY")

        
        return(
            <div class="ui top fixed sticky borderless menu" id="secretary-navigation-bar" style={{height:65+"px"}}>
            <div class="item" id="secretary-picker-container">
                <Picker id="secretary-picker"
                    handleChangeDate ={this.handleChangeDate}
                    handleOnToday ={this.handleOnToday}
                    handleOnPrev={this.handleOnPrev}
                    handleOnNext={this.handleOnNext}
                    date={this.props.date}

                />
            </div>
            <div class="item" id="secretary-date-text-container">
            <span style={{fontSize:20+'px'}} id="secretary-date-text">{formattedDate}</span>
            </div>
            <div class="right borderless menu" id="secretary-rightside">
                <div class="item" id="secretary-logout-container" onClick={() => this.logout()}>
                    <i id="logoutButton" class="large sign out icon link"></i>
                </div>
            </div>
        </div>

        )
    }
}