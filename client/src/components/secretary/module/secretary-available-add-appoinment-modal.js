import React, {Component} from 'react';
import moment from 'moment';
import {Modal, Form, Button} from 'semantic-ui-react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCalendar} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

import { toast } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';



import AddProcMainForm from "./secretary-available-add-appointment-modal-form"





class AddAvailableModal extends Component {
    constructor(props){
    
      super(props);
      
      this.state ={
        firstname:'',
        lastname:'',
        patientcontact:'',
        procedures:[],
        notes:'',
        date: moment().toDate(),
        time: moment('8:00 AM', "h:mm aa").toDate(),
        doctors:[],
        doctor: '',
        open: false,
        step: 1,
        error: {
          firstname: false,
          lastname: false,
          username: false,
          password: false,
          patientcontact: false,
          time: false,
          date:false,
          doctors: false,
          procedures: false

      },
      }
      this.setOpen = this.setOpen.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleDate = this.handleDate.bind(this);
      this.handletime = this.handleDate.bind(this);
      this.handleDoctorChange = this.handleDoctorChange.bind(this);
    }

    handleValidation=()=>{
      const checkfirst = /^[a-z A-Z]+$/;
      const checklast = /^[a-z A-Z.\-_]+$/;
      const checkcontact = /^[+-]?\d{7,12}$/;

      let firstname = this.state.firstname.trim();
      let lastname = this.state.lastname.trim();
      let patientcontact = this.state.patientcontact.trim();
      let procedures = this.state.procedures;
      let date = this.state.date;
      let time = this.state.time;
      let doctors = this.state.doctors;

      let error = this.state.error;
      let formIsValid = true;

      if(moment(moment(time, "h:mm A").toDate()).isBefore(moment().toDate()) && moment(date).isSame(moment().toDate(), 'day')){
          error['time']= true;
          toast({
            type: "error",
            title: "Error",
            description: <p>Please input valid time</p>,
            icon: "cancel",
          });
          formIsValid = false;
      }
      if(firstname === ""|| !firstname.match(checkfirst)){
        error['firstname']= true;
        toast({
          type: "error",
          title: "Error",
          description: <p>Please input a valid firstname</p>,
          icon: "cancel",
        });
        formIsValid = false;

      } else if( firstname.length < 2){
        error['firstname'] = true;
        toast({
          type: "error",
          title: "Error",
          description: <p>Firstname is too short</p>,
          icon: "cancel",
        });
        formIsValid = false;
      }
      if(lastname ===  ""|| !lastname.match(checklast)){
        error["lastname"] = true;
        toast({
          type: "error",
          title: "Error",
          description: <p>Please input a valid lastname</p>,
          icon: "cancel",
        });
        formIsValid = false;
      } else if(lastname.length < 2){
        error["lastname"] = true;
        toast({
            type: "error",
            title: "Error",
            description: <p>Lastname is too short</p>,
            icon: "cancel",
        });
        formIsValid = false;
      }

      if(patientcontact === "" || !patientcontact.match(checkcontact)){
        error['patientcontact']= true;
        toast({
          type: "error",
          title: "Error",
          description: <p>Please input a valid contact number</p>,
          icon: "cancel",
        });
        formIsValid = false;
      }

      if(procedures.length < 1 || procedures === undefined){
        error['procedures']= true;
        toast({
          type: "error",
          title: "Error",
          description: <p>Must have at least 1 procedure</p>,
          icon: "cancel",
        });
        formIsValid = false;
      }

      if(doctors.length < 1 || doctors === undefined){
        error['doctors']= true;
        toast({
          type: "error",
          title: "Error",
          description: <p>Must have at least 1 doctor</p>,
          icon: "cancel",
        });
        formIsValid = false;
      }

      if(formIsValid){
        let checkData = {
          dateInput: date.toString(),
          timeInput: time.toString(),
          doctors: doctors
        }

      axios.post("/secretary/check_app_exists", checkData, function(data){
          
          if(data === true){
            error['doctors']= true;
            toast({
              type: "error",
              title: "Error",
              description: <p>Doctor is already booked on this date and time</p>,
              icon: "cancel",
            });
            formIsValid = false;
          } else{
            formIsValid = true;
          }
        })

        return formIsValid;

      }



    }

    

    

    //function for opening and closing the modal
    handleClose=()=>{
      this.setState({
        open: false,
      })
    //   setTimeout(() => {
    //     toast(
    //         {
    //             description: <p>Appointment Creation cancelled</p>,
    //             icon: 'check',
    //             animation: 'slide up',
    //             time:1000,
    //             color: 'red'

    //         },
    //         () => console.log('toast closed'),
    //     );
    // }, 1000)
    }
    setOpen(){
      this.setState({
        open: !this.state.open,
        step : 1,
        date : moment(moment(this.props.date).format("MMM DD YYYY")).toDate(),
        time : moment(this.props.time, 'h:mm aa').toDate(),
        doctor: this.props.doctorID

      })
      console.log(moment(this.props.time, 'h:mm aa').toDate())

    
      // this.props.setClose()
      
    }

    //Function for submitting values
    handleChange = input => e =>{
      this.setState({
        [input]: e.target.value
      })
      console.log(e.target.value)
    }
    handleSubmit=e=>{
        e.preventDefault()
        if(this.handleValidation()){
          const appointment = {
            firstname:this.state.firstname,
            lastname:this.state.lastname,
            patientcontact: this.state.patientcontact,
            procedures: this.state.procedures,
            notes:this.state.notes,
            date:this.state.date,
            time:this.state.time,
            doctors:this.state.doctors,
          }
          if(Array.isArray(this.state.doctors[0])){
            appointment.doctors = this.state.doctors[0]
          }
  
          axios.post('http://localhost:3000/secretary/create', appointment).then(res =>{
            if(res.data.message == true){
              setTimeout(() => {
                toast(
                    {
                        description: <p>Appointment Created</p>,
                        icon: 'check',
                        animation: 'slide up',
                        time:1000,
                        color: 'green'
      
                    },
                );
              }, 1000)
              this.handleClose();
              this.props.handleWeekAppointmentUpdate()
              this.props.handleDayAppointmentUpdate()
              this.props.handleWeekAvailable()
            } else {
              toast({
                type: 'error',
                title: 'Error',
                description: <p>Invalid Appointment</p>,
                icon: "cancel"
              })
            }
          });
        }
      
    } 

    //Datepicker change
    handleDate(date){
      this.setState({
        date:date
      })

      console.log(date)
     
    }

    handleDoctorChange =(e, {value}) => {
        this.setState({doctors:value})
        console.log(value)

      }

      handleProcessChange =(e, {value}) => {
        this.setState({procedures:value})
        console.log(value)

      }

    //Step changes in changing the prop
    //Proceeds to next step
    nextStep =()=>{
      const {step} = this.state;
      this.setState({
          step: step+1
      });
    }

    //Proceeds to previous step
    prevStep =()=>{
        const {step} = this.state;
        this.setState({
            step: step-1
        });
    }
    handleTime=(time)=>{
      this.setState({
        time:time
      })
      console.log(time)
    }
  
    render(){
      const {firstname, lastname, patientcontact, process, notes, date, time, doctors, doctor,  error} = this.state;
      const values = {firstname, lastname, patientcontact, process, notes, date, time, doctors, doctor , error}
      let button;
      let button2;
      if(this.state.step === 1){
        button = <Button onClick={this.nextStep} type='button'>Next</Button>
      } else{
        button = <Button type="button" color="green" onClick={this.handleSubmit}>Submit</Button>
        button2 = <Button onClick={this.prevStep}>Back</Button>
      }
      return (
        <>
          <Modal
            onClose={this.handleClose}
            onOpen={this.setOpen}
            open={this.state.open}
            as={Form}
            trigger={
            <div>
              {this.props.available}
            </div>}
          >
          
          <Modal.Content>
                  <AddProcMainForm
                    handleChange = {this.handleChange}
                    handleDoctorChange = {this.handleDoctorChange}
                    handleProcessChange = {this.handleProcessChange}
                    handleDate = {this.handleDate}
                    handleTime = {this.handleTime}
                    setOpen = {this.setOpen}
                    prevStep = {this.prevStep}
                    nextStep = {this.nextStep}
                    step = {this.state.step}
                    values = {values}

                  />
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.handleClose}>Cancel</Button>
            {button2}
            {button}
            
          </Modal.Actions>
          </Modal>
        </>
        
        
      )
    }
  }
export default AddAvailableModal