import Axios from 'axios';
import React, {Component} from 'react';
import {Tab, Table, TableRow} from 'semantic-ui-react';
import AppointmentCard from './secretary-edit-appointment-modal'

/* CSS FILES */
import '../secretary_css/secretary-view.css'

class week_all_doc extends Component{

    constructor(props){
        super(props);

        this.state={
            appointments:this.props.appointments,
            weeks: this.props.week,
            doc: this.props.doc
        }

    }
    

    componentDidMount(){
       this.props.handleDocWeekAppointmentUpdate()
       
        
    }

    componentDidUpdate(){
        if(this.props.week != this.state.weeks){
            console.log("Hello")
            this.props.handleDocWeekAppointmentUpdate()
            this.setState({
                weeks: this.props.week
            })
        }
        else if(this.props.doc !== this.state.doc){
            this.props.handleDocWeekAppointmentUpdate()
            this.setState({
                doc: this.props.doc 
            })
        }
    }
    render(){
        console.log("prop: ")
        console.log(this.props.appointments)

       return(
            <>
                <Table id="table-header-title" compact>
                    <Table.Header fullWidth>
                        <TableRow textAlign='center'>
                            <Table.Cell>Weekly Appointments</Table.Cell>
                        </TableRow>
                    </Table.Header>
                </Table>
                <Table id='week_all' celled fixed textAlign='center' compact>
                    <Table.Body>
                    {
                        this.props.appointments.map(({slot, weekAppointments}, index)=>{
                            return(
                            <Table.Row key={index} name={'week-all-row-'+index}>
                                <Table.Cell id="week-all-time-cell">{slot}</Table.Cell>
                                {   
                                    weekAppointments.map(({appointments}, index)=>{
                                        return( <Table.Cell id={'week-all-table-cell'} name={'week-all-td-'+index}>
                                                        {
                                                           appointments.map((appointment)=>
                                                                        <AppointmentCard id={"secretary-appointment-card-" + appointment._id}
                                                                            appointment={appointment}
                                                                            handleWeekAppointmentUpdate={this.props.handleWeekAppointmentUpdate}
                                                                            handleDocWeekAppointmentUpdate={this.props.handleDocWeekAppointmentUpdate}
                                                                        />
                                                            )
                                                        }
                
                                            </Table.Cell>)
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

export default week_all_doc
