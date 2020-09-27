/**
 *  Description: Contains the first two steps in creating an Appointment.
 *  
 *  Includes: Date Picking, Time Picking, Next Button, Cancel Button
 * 
 * 
 */
import React, {Component, useState} from 'react';
import moment from 'moment';
import { Button, Header, Image, Modal, Form, Select, Dropdown } from 'semantic-ui-react'
import DatePicker from 'react-datepicker';


import "react-datepicker/dist/react-datepicker.css"
import "../secretary_css/addProcStep1.scss"
import '../secretary_css/secretary-view.css'

class editProcStep1 extends Component {
    constructor(props){
        super(props)
        this.state = {
            date: this.props.values.date,
            time: this.props.values.time
        }

        this.onchangeDate = this.onchangeDate.bind(this)
        this.onChangeTime = this.onChangeTime.bind(this)
    } 

    onchangeDate(date){
      this.setState({
        date:date
      })
    }

    onChangeTime=(time)=>{
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

    
  
    render(){
        const {handleDate} = this.props
       
        return(

            <div>
                <Form>
                    <Form.Input required
                    label = 'Date'
                    className = "editProcStep1Date"
                    id="editProcStep1Date-secretary"
                    control={DatePicker}
                        selected={this.state.date}
                        onChange={this.onchangeDate}
                        onSelect={handleDate}
                        minDate={this.state.date}
                        
                        >
                    </Form.Input>
                    {/* <Dropdown
                    fluid
                    selection
                    name='time'
                    selected={this.state.time}
                    placeholder="Select Timeslot" options={timeSlotsArray}
                    onChange={handleTime}/> */}
                    <Form.Input required
                        label = "Time"
                        className = "editProcStep1Time"
                        id="editProcStep1Time-secretary"
                        control={DatePicker}
                            showTimeSelect
                            showTimeSelectOnly
                            selected={this.state.time}
                            timeIntervals={30}
                            dateFormat="h:mm aa"
                            onChange={this.onChangeTime}
                            minTime={moment().toDate().setHours(9)}
                            maxTime={moment().toDate().setHours(18)}>
                    </Form.Input>
                </Form>
                
               
            </div>
        )
    }
  }
export default editProcStep1