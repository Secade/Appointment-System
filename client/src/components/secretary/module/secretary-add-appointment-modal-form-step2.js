/**
 *  Description: Contains the first two steps in creating an Appointment.
 *  
 *  Includes: Date Picking, Time Picking, Next Button, Cancel Button
 * 
 * 
 */
import React, {Component, useState} from 'react';
import moment from 'moment';
import { Input, Form, Popup, Dropdown} from 'semantic-ui-react'
import axios from 'axios'


class addProcStep2 extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            procedure:'',
            procedures:[],
            doctors:[],
            doctor:[],
            value:[],
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
                                    key: procedure._id,
                                    text: procedure.processname,
                                    value: procedure._id
                                }
                            })
                        ],
                        // procedures: response.data.map(procedure => procedure.processname),
                        procedure: response.data[0].processname, 

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
                                    key: doctor._id,
                                    text: "DR. "+doctor.lastname,
                                    value: doctor._id
                                }
                            })
                        ],
                        doctor: response.data[0].firstname
                    })
                }
            })


    }

    
    render(){
        const {values, handleChange, handleDoctorChange, handleProcessChange} = this.props

        if(values.doctor.length != 0){
            const doctor = [values.doctor]
        return(
            <>
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
                />

                <Form.Field required id="doctors-field-secretary">
                    <label>Doctor/s</label>
                    <Popup
                        trigger={
                            <Dropdown
                            error={values.error.doctors}
                            onChange={handleDoctorChange}
                            placeholder='Doctor/s'
                            autoComplete="false"
                            options={this.state.doctors}
                            selection fluid multiple
                            id= "processDropDoctor"
                            defaultValue={doctor}
                            />  
                        }
                        content="Must have at least 1 doctor"
                        position="right center"
                    />
                </Form.Field>

                
            </>
        )
        }
        else{
            return(
                <>
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
                    />
    
                    <Form.Field required id="doctors-field-secretary">
                        <label>Doctor/s</label>
                        <Popup
                            trigger={
                                <Dropdown
                                error={values.error.doctors}
                                onChange={handleDoctorChange}
                                placeholder='Doctor/s'
                                autoComplete="false"
                                options={this.state.doctors}
                                selection fluid multiple
                                id= "processDropDoctor"
                                />  
                            }
                            content="Must have at least 1 doctor"
                            position="right center"
                        />
                    </Form.Field>
    
                    
                </>
            )
        }
        
    }
}
export default addProcStep2