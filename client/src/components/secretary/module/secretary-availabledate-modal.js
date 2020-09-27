import React, {Component} from 'react';
import moment from 'moment';
import {Modal, Form, Button, Icon, Card, Table, Tab, Dimmer} from 'semantic-ui-react'
import axios from 'axios'
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import '../secretary_css/secretary-view.css'

import AvailableAddModal from './secretary-available-add-appoinment-modal'

class SecretaryAvailabilityModal extends Component{

    constructor(props){
        super(props);

        this.state = {
            doctor:[],
            open: false,
            date:'',
            availSlots: [],
            activeDimmer:false,
            row:[]
        }

        this.setOpen = this.setOpen.bind(this)
        this.setClose = this.setClose.bind(this)
        this.handleAvailabilityTime = this.handleAvailabilityTime.bind(this)
    }

    handleShowDimmer = () => this.setState({activeDimmer: true});
    handleHideDimmer = () => this.setState({activeDimmer: false})

    handleAvailabilityTime(){
        console.log("Getting Availability time per doctor...")
        this.handleShowDimmer()
        const data = {
            date : this.props.appDate,
            doctorID : this.props.doctorID
        }
        axios.post("http://localhost:3000/secretary/availabilityTime", data).then(res=>{
            this.setState({
                availSlots : res.data.data,
                doctor: res.data.data.doctor,
                row: res.data.data.row
            })
            console.log("AvailabilityTime Data: ")
            console.log(res.data.data)
            this.handleHideDimmer()
        })
    }
    setOpen(){
        console.log("calling me")
        this.handleAvailabilityTime();
        this.setState({
            open:true
        })
    }
    setClose(){
        this.setState({
            open:false
        })
    }

    render(){
        return(
            <>
            
            
            <Modal
                    closeIcon
                    onClose={this.setClose}
                    onOpen={this.setOpen}
                    open={this.state.open}
                    trigger={<Table.Cell id="secretary-available-table-cell" className="secretary-available-table-cell"
                    >
                        </Table.Cell>}
                >
                    
                    <Modal.Header as={'h2'} id="secretary-available-date-modal-header">
                        <span>Dr.{this.state.doctor.firstname} {this.state.doctor.lastname} - {this.state.availSlots.displayDate}</span>
                    </Modal.Header>
                    <Modal.Content>
                        <Dimmer
                            active={this.state.activeDimmer}
                            inverted
                            id="list-dimmer"
                            style={{ maxHeight: "100%" }}
                        >
                            <div className="ui elastic huge green loader"></div>
                        </Dimmer>
                            <Table id = "secretary-available-modal-table" compact celled fixed textAlign='center'>
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell></Table.Cell>
                                        </Table.Row>
                                        {
                                            this.state.row.map((avail)=>{
                                                let backgroundColor="grey"
                                                let backgroundColor2="green"
                                                if(avail.available2 === 'undef' ){
                                                    if(avail.available1 === 'unavailable'){
                                                        return(
                                                            <Table.Row>
                                                            <Table.Cell>{avail.timeSlot1}</Table.Cell>
                                                            <Table.Cell style={{backgroundColor}}>{avail.available1}</Table.Cell>
                                                        </Table.Row>
                                                        )
                                                    }
                                                    else{
                                                        if(avail.available1 === 'available'){
                                                            return(
                                                                <Table.Row>
                                                                    <Table.Cell>{avail.timeSlot1}</Table.Cell>
                                                                    <Table.Cell style={{backgroundColor2}}><AvailableAddModal available={avail.available1} setClose={this.setClose} time={avail.timeSlot1} doctorID ={this.props.doctorID}
                                                                                date={this.state.availSlots.date}
                                                                                handleWeekAvailable={this.props.handleWeekAvailable}
                                                                                handleDayAppointmentUpdate={this.props.handleDayAppointmentUpdate}
                                                                                handleWeekAppointmentUpdate={this.props.handleWeekAppointmentUpdate}/></Table.Cell>
                                                                </Table.Row>
                                                            )
                                                        }
                                                        else{
                                                            return(
                                                                <Table.Row>
                                                                    <Table.Cell>{avail.timeSlot1}</Table.Cell>
                                                                    <Table.Cell style={{backgroundColor}}>{avail.available1}</Table.Cell>
                                                                </Table.Row>
                                                            )
                                                            
                                                        }
                                                        
                                                    }
                                                    
                                                }
                                                else{
                                                    if(avail.available1 === 'available' && avail.available2 === 'available'){
                                                        return(
                                                            <Table.Row>
                                                            {
                                                                        <>
                                                                            <Table.Cell>{avail.timeSlot1}</Table.Cell>
                                                                            <Table.Cell style={{backgroundColor2}}><AvailableAddModal available={avail.available1} setClose={this.setClose} time={avail.timeSlot1} doctorID ={this.props.doctorID}
                                                                                        date={this.state.availSlots.date}
                                                                                        handleWeekAvailable={this.props.handleWeekAvailable}
                                                                                        handleDayAppointmentUpdate={this.props.handleDayAppointmentUpdate}
                                                                                        handleWeekAppointmentUpdate={this.props.handleWeekAppointmentUpdate}/></Table.Cell>
                                                                            <Table.Cell>{avail.timeSlot2}</Table.Cell>
                                                                            <Table.Cell style={{backgroundColor2}}><AvailableAddModal available={avail.available2} setClose={this.setClose} time={avail.timeSlot2} doctorID ={this.props.doctorID}
                                                                                        date={this.state.availSlots.date}
                                                                                        handleWeekAvailable={this.props.handleWeekAvailable}
                                                                                        handleDayAppointmentUpdate={this.props.handleDayAppointmentUpdate}
                                                                                        handleWeekAppointmentUpdate={this.props.handleWeekAppointmentUpdate}/></Table.Cell>
                                                                        </>
                                                                    
                                                            }
                                                            </Table.Row>
                                                        )

                                                    }
                                                    else if(avail.available1 === 'available' && avail.available2  === 'unavailable'){
                                                        return(
                                                        <Table.Row>
                                                            {
                                                                        <>
                                                                            <Table.Cell>{avail.timeSlot1}</Table.Cell>
                                                                            <Table.Cell style={{backgroundColor2}}><AvailableAddModal available={avail.available1} setClose={this.setClose} time={avail.timeSlot1} doctorID ={this.props.doctorID}
                                                                                        date={this.state.availSlots.date}
                                                                                        handleWeekAvailable={this.props.handleWeekAvailable}
                                                                                        handleDayAppointmentUpdate={this.props.handleDayAppointmentUpdate}
                                                                                        handleWeekAppointmentUpdate={this.props.handleWeekAppointmentUpdate}/></Table.Cell>
                                                                            <Table.Cell>{avail.timeSlot2}</Table.Cell>
                                                                            <Table.Cell style={{backgroundColor}}>{avail.available2}</Table.Cell>
                                                                        </>
                                                                    
                                                            }
                                                            </Table.Row>
                                                        )
                                                    }
                                                    else if(avail.available1 === 'unavailable' && avail.available2  === 'available'){
                                                        return(
                                                            <Table.Row>
                                                                {
                                                                            <>
                                                                                <Table.Cell>{avail.timeSlot1}</Table.Cell>
                                                                                <Table.Cell style={{backgroundColor}}>{avail.available1}</Table.Cell>
                                                                                <Table.Cell>{avail.timeSlot2}</Table.Cell>
                                                                                <Table.Cell style={{backgroundColor2}}><AvailableAddModal available={avail.available2} setClose={this.setClose} time={avail.timeSlot2} doctorID ={this.props.doctorID}
                                                                                        date={this.state.availSlots.date}
                                                                                        handleWeekAvailable={this.props.handleWeekAvailable}
                                                                                        handleDayAppointmentUpdate={this.props.handleDayAppointmentUpdate}
                                                                                        handleWeekAppointmentUpdate={this.props.handleWeekAppointmentUpdate}/></Table.Cell>
                                                                            </>
                                                                        
                                                                }
                                                                </Table.Row>
                                                            )
                                                    }
                                                    else{
                                                        return(
                                                            <Table.Row>
                                                                {
                                                                            <>
                                                                                <Table.Cell>{avail.timeSlot1}</Table.Cell>
                                                                                <Table.Cell style={{backgroundColor}}>{avail.available1}</Table.Cell>
                                                                                <Table.Cell>{avail.timeSlot2}</Table.Cell>
                                                                                <Table.Cell style={{backgroundColor2}}>{avail.available2}</Table.Cell>
                                                                            </>
                                                                        
                                                                }
                                                                </Table.Row>
                                                            )

                                                    }
                                                    
                                                }
                                            })
                                        }
                                    </Table.Body>
                            </Table>
                    </Modal.Content>
                </Modal>
            </>
        )
    }

}
export default SecretaryAvailabilityModal