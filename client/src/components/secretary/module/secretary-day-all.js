import Axios from 'axios';
import React, {Component} from 'react';
import {Tab, Table} from 'semantic-ui-react';
import AppointmentCard from './secretary-edit-appointment-modal-day-all'
import moment from 'moment'
import '../secretary_css/secretary-view.css'    

class day_all extends Component{

    constructor(props){
        super(props);

        this.state={
            appointments:this.props.appointments,
            day: this.props.day,
        }

    }
    
    componentDidMount(){
        this.props.handleDayAppointmentUpdate()
        console.log("Im in secretary-day-all componentDidMount")
        this.setState({
            appointments:this.props.appointments
        })
    }


    componentDidUpdate(){
        if(this.props.day != this.state.day){
            console.log("Date Changed")
            this.props.handleDayAppointmentUpdate()
            this.setState({
                    day: this.props.day,
                })
        }
    }
    render(){

       return(
           <>
            <Table id="table-header-title" compact>
                    <Table.Header fullWidth>
                        <Table.Row textAlign='center'>
                            <Table.Cell>Daily Appointments</Table.Cell>
                        </Table.Row>
                    </Table.Header>
                </Table>
                <Table id='week_all' celled fixed textAlign='center' compact>
                    <Table.Body>
                    {
                        this.props.appointments.map(({slot, appointments}, index)=>{
                            return(
                            <Table.Row key={index}>
                                <Table.Cell id='day-all-time-cell'>{slot}</Table.Cell>
                                {
                                    <Table.Cell Name={"day-all-table-cell"+index} id={'day-all-table-cell'}>
                                        <div id="day-all-div">
                                            {          
                                                appointments.map((appointment)=>{
                                                    return ( <AppointmentCard
                                                        appointment={appointment}
                                                        handleDayAppointmentUpdate={this.props.handleDayAppointmentUpdate}
                                                        handleDayDocAppointmentUpdate = {this.props.handleDayDocAppointmentUpdate}
                                                            />)
                                            })
                                            }
                                        </div>
                                    </Table.Cell>
                                                        
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

export default day_all
