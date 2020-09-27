/**
 *  Description: Contains the first two steps in creating an Appointment.
 *  
 *  Includes: Date Picking, Time Picking, Next Button, Cancel Button
 * 
 * 
 */
import React, {Component, useState} from 'react';
import { Input, Form, Popup, Dropdown} from 'semantic-ui-react'   
import axios from 'axios'

class addProcStep2 extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            procedures:[],
            doctors:[],
            value:[],
            currentProcs: this.props.values.procedures[0],
            currentDocs:this.props.values.doctors[0],
            multiple: true
        }
    }


    
    componentDidMount(){
        
        axios.get('http://localhost:3000/secretary/getProcess')
            .then(response => {
                if(response.data.length > 0){
                    this.setState({
                        procedures: [
                            ...response.data.map(procedure =>{
                                return{
                                    text: procedure.processname,
                                    value: procedure._id
                                }
                            })
                        ],
                    })
                }
            })
        
        axios.get('http://localhost:3000/secretary/getDoctors')
            .then(response => {
                if(response.data.length > 0){
                    this.setState({   
                        doctors: [
                            ...response.data.map(doctor =>{
                                return{
                                    text: "Dr." + doctor.lastname,
                                    value: doctor._id
                                }
                            })
                        ],
                    })
                }
            })
    }


    
    render(){
        const {values, handleChange, handleDoctorChange, handleProcessChange} = this.props
        return(
            <Form>
                <Form.Field required id="firstname-field-secretary">
                    <label>First Name</label>
                    <Popup
                        trigger={
                            <Input
                            error={values.error.firstname}
                            onChange = {handleChange('firstname')}
                            placeholder="First Name"
                            autoComplete="false"
                            name="firstname"
                            id= "processFirstName"
                            value={this.props.values.firstname}
                            />  
                        }
                        content="Name should contain at least 2 characters"
                        position="right center"
                    />
                </Form.Field>
                <Form.Field required id="lastname-field-secretary">
                    <label>Last Name</label>
                    <Popup
                        trigger={
                            <Input
                            error={values.error.lastname}
                            onChange = {handleChange('lastname')}
                            placeholder="Last Name"
                            autoComplete="false"
                            name="lastname"
                            id= "processLasttName"
                            value={this.props.values.lastname}
                            />  
                        }
                        content="Name should contain at least 2 characters"
                        position="right center"
                    />
                </Form.Field>
                <Form.Field required id="patientcontact-field-secretary">
                    <label>Contact Number</label>
                    <Popup
                        trigger={
                            <Input
                            error={values.error.lastname}
                            onChange = {handleChange('patientcontact')}
                            placeholder="Contact Number"
                            autoComplete="false"
                            name="patientcontact"
                            id= "processPatientContact"
                            value={this.props.values.patientcontact}
                            />  
                        }
                        content="Contact Number should be valid"
                        position="right center"
                    />
                </Form.Field>
                <Form.Field required id="procedures-field-secretary">
                    <label>Procedure/s</label>
                    <Popup
                        trigger={
                            <Dropdown
                            error={values.error.procedures}
                            onChange={handleProcessChange}
                            defaultValue={this.state.currentProcs}
                            placeholder='Procedure/s'
                            autoComplete="false"
                            options={this.state.procedures}
                            selection fluid multiple
                            id= "processDropProc"
                            />  
                        }
                        content="Must have at least 1 procedure"
                        position="right center"
                    />
                </Form.Field>
                <Form.TextArea required
                    placeholder='Notes'
                    onChange = {handleChange('notes')}
                    label="notes"
                    name="notes"
                    id= "processNotes"
                    value={this.props.values.notes}
                />
                <Form.Field required id="doctors-field-secretary">
                    <label>Doctor/s</label>
                    <Popup
                        trigger={
                            <Dropdown
                            error={values.error.doctors}
                            onChange={handleDoctorChange}
                            placeholder='Doctor/s'
                            options={this.state.doctors}
                            defaultValue={this.state.currentDocs}
                            selection fluid multiple
                            id= "processDropDoctor"
                            />  
                        }
                        content="Must have at least 1 doctor"
                        position="right center"
                    />
                </Form.Field>

                
            </Form>
        )
    }
}
export default addProcStep2