import Axios from 'axios';
import React, {Component} from 'react';
import {Tab, Table, TableRow} from 'semantic-ui-react';
import AppointmentCard from './secretary-edit-appointment-modal'

/* CSS FILES */
import '../secretary_css/secretary-view.css'

class week_all extends Component{

    constructor(props){
        super(props);

        this.state={
            appointments:this.props.appointments,
            weeks: this.props.week,
        }

    }
    

    // componentDidMount(){
    //    const week = {
    //        weeks: this.state.weeks
    //    }
    //     Axios.post('http://localhost:3000/secretary/week_all', week).then(res =>{
    //         return this.setState({
    //             appointments: res.data.data.data
    //         })
            
    //     })
        
    // }

    componentDidUpdate(){
        if(this.props.week != this.state.weeks){
            console.log("Hello")
            this.props.handleWeekAppointmentUpdate()
            this.setState({
                weeks: this.props.week
            })
        }
    }
    render(){
        console.log("prop: ")
        console.log(this.props.week)
        console.log("state: ")
        console.log(this.state.weeks)
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

export default week_all
