import React, {Component} from 'react';
import { Step } from 'semantic-ui-react'


import AddProcStep1 from "./secretary-add-appointment-modal-form-step1";
import AddProcStep2 from "./secretary-add-appointment-modal-form-step2";



import "../secretary_css/pickerStyle.scss"
import "react-datepicker/dist/react-datepicker.css"


class addProcMainForm extends Component {

  
    render(){
        
        const {values, handleChange, handleDate, setOpen, nextStep, prevStep, handleTime, handleDoctorChange, handleProcessChange} = this.props

        switch(this.props.step){
            case 1:
                return(
                <div>    
                    <div class="header">
                        <Step.Group fluid>
                            <Step active>
                                <i className="calendar icon"></i>
                                <div className="content">
                                    <div className="title">Date</div>
                                </div>
                            </Step>
                            <Step>
                                <i className="address card icon"></i>
                                <div className="content">
                                    <div className="title">Appointment</div>
                                </div>
                            </Step>
                        </Step.Group>
                    </div>
                        <AddProcStep1 
                            nextStep = {nextStep}
                            handleChange={handleChange}
                            handleDate={handleDate}
                            values={values}
                            setOpen={setOpen}
                            handleTime={handleTime}
                        >
                        </AddProcStep1>
                </div>
                )
            case 2:
                return(
                        <div>
                            <div class="header">
                                <Step.Group fluid>
                                    <Step onClick={prevStep}>
                                        <i className="calendar icon"></i>
                                        <div className="content">
                                            <div className="title">Date</div>
                                        </div>
                                    </Step>
                                    <Step active>
                                        <i className="address card icon"></i>
                                        <div className="content">
                                            <div className="title">Appointment</div>
                                        </div>
                                    </Step>
                                </Step.Group>
                             </div>
                        
                            <AddProcStep2
                                prevStep = {prevStep}
                                handleChange={handleChange}
                                setOpen={setOpen}
                                handleTime={handleTime}
                                handleDoctorChange={handleDoctorChange}
                                handleProcessChange={handleProcessChange}
                                values = {values}
                            />
                        </div> 
                    )
        }
    }
  }
export default addProcMainForm