import React, {Component} from 'react';
import moment from 'moment';
import {Modal, Form, Button, Icon, Card, Table, Tab, Dimmer} from 'semantic-ui-react'
import axios from 'axios'
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import SecretaryAvailabilityModal from './secretary-availabledate-modal'
import '../secretary_css/secretary-view.css'


class SecretaryAvailability extends Component{

    constructor(props){
        super(props);

        this.state = {
            weekAvailable:[],
            weeks:this.props.week,
        }
    }

    componentDidMount(){
        
        this.props.handleWeekAvailable();
        
    }

    componentDidUpdate(){

        if(this.props.week != this.state.weeks){
            console.log("Updating week in Availability...")
            this.props.handleWeekAvailable();
            this.setState({
                weeks: this.props.week,
                weekAvailable: this.props.weekAvailable.doctors,
            })
        }
    }


    render(){
        return(
            <>
                <Table id="week-available" compact celled fixed textAlign='center'>
                    <Table.Body>
                        {
                            this.props.weekAvailable.doctors.map(({availability, firstname, lastname, _id}, index)=>{
                                return(
                                    <Table.Row key={index}>
                                        <Table.Cell id='week-availability-time-cell'>{firstname}, {lastname}</Table.Cell>
                                        {
                                            availability.map((available)=>{
                                                if(available[1]=='unavailable' || moment(available[0]).days() == 0 || available[1]=='past'){
                                                    let backgroundColor ='grey'
                                                    return(
                                                        <Table.Cell id="secretary-available-table-cell" style={{backgroundColor}}>
                                                        </Table.Cell>
                                                    )
                                                }else{

                                                    
                                                    return(
                                                            
                                                            <SecretaryAvailabilityModal doctorID = {_id} appDate = {available[0]}
                                                                handleShowDimmer = {this.props.handleShowDimmer}
                                                                handleHideDimmer = {this.props.handleHideDimmer}
                                                                handleWeekAvailable={this.props.handleWeekAvailable}
                                                                handleDayAppointmentUpdate={this.props.handleDayAppointmentUpdate}
                                                                handleWeekAppointmentUpdate={this.props.handleWeekAppointmentUpdate}
                                                            />
                                                        
                                                    )
                                                }
                                            })
                                        }
                                    </Table.Row>
                                )
                            })
                        }
                    </Table.Body>

                </Table>
            </>
        )
    }

}
export default SecretaryAvailability