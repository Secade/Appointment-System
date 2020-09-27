/**
 *  Description: Contains the first two steps in creating an Appointment.
 *  
 *  Includes: Date Picking, Time Picking, Next Button, Cancel Button
 * 
 * 
 */
import React, {Component, useState} from 'react';
import moment from 'moment';
import { Popup, Form, Input } from 'semantic-ui-react'
import DatePicker from 'react-datepicker';


import "react-datepicker/dist/react-datepicker.css"
import "../secretary_css/addProcStep1.scss"

class addAvailProcStep1 extends Component {
    constructor(props){
        super(props)
        this.state = {
            date: moment(this.props.values.date).toDate(),
            time: moment(this.props.values.time, 'HH:mm').toDate()
        }

        this.onchangeDate = this.onchangeDate.bind(this)
        this.onchangeTime = this.onchangeTime.bind(this)
    } 

    onchangeDate(date){
      this.setState({
        date:date
      })
    }
    onchangeTime(time){
        this.setState({
            time:time
        })
        this.props.handleTime(time)
    }


    
    //Continues to step 2
    continue = e =>{
        e.preventDefault()
        this.props.nextStep()
    }
    cancel = e =>{
        e.preventDefault()
        this.props.setOpen()
    }

    //DISABLES SUNDAYS
    disableSunday=(date)=>{
        return moment(date).day() !== 0;
    }
    disableNonMid=(time)=>{
        return moment(time).minute() === 30 && moment(time).minute() ===0
    }


    
  
    render(){
        const {handleDate} = this.props
                                
        return(

            <div>
                <Form>
                    <Form.Input required
                    label = 'Date'
                    className = "addProcStep1Date"
                    control={DatePicker}
                    id="secretary-available-datepicker"
                        selected={this.state.date}
                        // onChange={this.onchangeDate}
                        // onSelect={handleDate}
                        // minDate={moment().toDate()}
                        // filterDate={this.disableSunday}
                        disabled
                        
                        >
                    </Form.Input>
                    <Form.Field required id='time-field-secretary'>
                        <label>Time</label>
                                <Form.Input
                                error = {this.props.values.error.time}
                                placeholder = "Time"
                                className = "addProcStep1Time"
                                control={DatePicker}
                                id="secretary-available-timepicker"
                                    showTimeSelect
                                    showTimeSelectOnly
                                    selected={this.state.time}
                                    timeIntervals={30}
                                    dateFormat="h:mm aa"
                                    onChange={this.onchangeTime}
                                    minTime={moment("8:00 AM", "h:mm aa").toDate()}
                                    maxTime={moment().toDate().setHours(18)}
                                    filterDate={this.disableNonMid}
                                    disabled
                                />

                        
                        
                    </Form.Field>
                        
                </Form>
                
               
            </div>
        )
    }
  }
export default addAvailProcStep1