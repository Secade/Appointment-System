import React, { Component } from 'react';
import Navbar from '../module/dentist-navigationbar'
//import Logo from './logo.png';
//import loginStyles from './loginCSS.css';
import axios from 'axios';
//import Modal from 'react-modal';
import {Grid, Header, Dropdown} from "semantic-ui-react"
import moment from 'moment'
import { SemanticToastContainer} from 'react-semantic-toasts';
import DentistHeader from "../module/dentist-header"
import '../dentist_css/dentist-view.css'
import DentistTable from "../module/dentist-week-all"
import DayAll from "../module/dentist-day-all"



class DentistPageComponent extends Component{

    constructor(props){
        super(props);
        
            let dayStart = moment(moment().toDate()).startOf('week')
            let dayEnd = moment(moment().toDate()).endOf('week')
            let numdays=[]
            let unparsed=[]
            
            while(dayStart <= dayEnd){
                unparsed.push(dayStart.toDate().toString())
                let newDate=Date.parse(dayStart)
                let formatted=moment(newDate).format("MMMM D, YYYY")
                numdays.push(formatted);
                dayStart = dayStart.clone().add(1, 'd');
            }

        this.onChangeDate = this.onChangeDate.bind(this)
        this.handleWeekAppointmentUpdate = this.handleWeekAppointmentUpdate.bind(this)
        this.handleDayAppointmentUpdate = this.handleDayAppointmentUpdate.bind(this)
        this.handleWeekAvailable = this.handleWeekAvailable.bind(this)


            this.state = {
                doctors:[],
                weekAppointments:[],
                dayAppointments:[],
                view:'day',
                filter:'appointments',
                date: moment().toDate(), 
                startOfWeek: moment(moment().toDate()).startOf('week'),
                endOfWeek: moment(moment().toDate()).endOf('week'),
                days:numdays,
                weekUnparsed:unparsed,
                weekAvailable:[],
                doctorID:''
    
            }

        this.handleDayAppointmentUpdate()
        this.handleWeekAppointmentUpdate()
        this.handleWeekAvailable()
        
    }

    componentDidMount(){
        
        axios.get('http://localhost:3000/dentist/getCurrentDentist')
        .then(response => {
            console.log(response.data);
            this.setState({   
                   
                appID: response.data._id
                
            })

            console.log("KEY: "+this.state.appID);


            const doctor ={
                appID: this.state.appID
            }
    
            console.log(doctor);
    
            axios.post('http://localhost:3000/dentist/getAppointmentByDoctor', doctor)
            .then(response=>{
                console.log("GOT APPOINTMENT: "+response.data)
                this.setState({
                    appointments: response.data,
                })
            })
            .catch((error)=>{
                console.log(error)
        })
        })
   
           
    }

    onWeek=(date)=>{
            
        let dayStart = moment(date).startOf('week')
        let dayEnd = moment(date).endOf('week')
        let numdays=[]
        let unparsed=[]
        
        while(dayStart <= dayEnd){
            unparsed.push(dayStart.toDate())
            let newDate=Date.parse(dayStart)
            let formatted=moment(newDate).format("MMMM D, YYYY")
            numdays.push(formatted);
            dayStart = dayStart.clone().add(1, 'd');
        }

        this.setState({
            startOfWeek: dayStart,
            endOfWeek: dayEnd,
            days:numdays,
            weekUnparsed:unparsed
        })
    
        
}

    
    //changes the current date
    onChangeDate(date){
        console.log('changing date to: ', date);
        if(date == null){
            this.setState({
                date: moment().toDate()
            });
        }else{
            this.onWeek(date)
            this.setState({
                date:date,
            })
            
        }
    }

    onChangeFilter=(e, {name, value})=>{
        console.log("Selecting Filter...")
        this.setState({
            [name]:value
        })
    }

    onChangeView=(e, {name, value})=>{
        this.setState({
          [name]:value
        })
        console.log(value)
      }
    onToday= () =>{
        
        console.log('Changing date to today');
        this.setState({
            date: moment().toDate()
        })
        this.onWeek(moment().toDate())
        
    }
    onPrev=()=>{
        
        let prev_date = moment(this.state.date).clone().subtract(1, 'day').toDate()
        console.log('change to: ', prev_date)
        this.setState({
            date: prev_date
        })
        this.onWeek(prev_date)
        
    }

    onNext=()=>{
        
        let next_date = moment(this.state.date).clone().add(1, 'day').toDate()
        console.log('change to: ', next_date)
        this.setState({
            date: next_date
        })
        this.onWeek(next_date)
        
    }


    handleWeekAppointmentUpdate(){
        console.log("Updating Week-all...")

        console.log("WEEK UNPARSED:  "+ this.state.weekUnparsed);
        const week = {
            date: this.state.weekUnparsed
        }
        
        axios.post('http://localhost:3000/dentist/weekly_view', week).then(res =>{

            console.log('RES: '+res.data.data.data);
            this.setState({
                weekAppointments: res.data.data.data
            })
            console.log("Week-all Data: ")
            console.log("CHECK: "+res.data.data.data)
        })
   }

   handleDayAppointmentUpdate(){
       console.log("DayUpdate")
        const day = {
            date: this.state.date
        }
        axios.post('http://localhost:3000/secretary/day_all', day).then(res =>{
            
            this.setState({
                dayAppointments: res.data.data.data
            })
            console.log("Day-all Data")
            console.log(res.data.data.data)
            
        })
        
        
     
     }

     handleWeekAvailable(){
        console.log("Updating Availability...")
        const week = {
            weeks: this.state.weekUnparsed
        }
        console.log("Current week")
        console.log(this.state.weekUnparsed)
        axios.post("http://localhost:3000/secretary/availabilityAll", week).then(res=>{
            this.setState({
                weekAvailable: res.data.data
            })
            console.log("WeekAvailable Data: ")
            console.log(res.data.data)
        })
        
       
    }

    render(){

        const filter =[
            {text:"APPOINTMENTS", key:"appointments", value:"appointments"},
            {text:"AVAILABILITY", key:"availability", value:"availability"},
            <Dropdown selection options={this.state.doctors} onChange={this.onChangeFilter} name='filter'>

            </Dropdown>

        ]

        const viewer=[
            {text:"DAY", key:"day", value:"day"},
            {text:"WEEK", key:"week", value:"week"}
        ]
        
        let currView;

        console.log("Changing to week Appointment table...")
            currView = <DentistTable 
                            week={this.state.weekUnparsed}
                            appointments={this.state.weekAppointments}
                            handleWeekAppointmentUpdate={this.handleWeekAppointmentUpdate}
                        >
                        </DentistTable>




        return(


            <div >
                <SemanticToastContainer position='top-center'></SemanticToastContainer>
                <Header id='secretary_header_container' content={
                    <Navbar id='secretary_navbar'
                        // doctors={doctors}
                        // views={views}
                        onChangeDate={this.onChangeDate}
                        onPrev={this.onPrev}
                        onNext={this.onNext}
                        onToday={this.onToday}
                        onChangeView={this.onChangeView}
                        date={this.state.date}
                        filter={this.state.filter}
                        filters={filter}
                        viewer={viewer}
                        doctors={this.state.doctors}
                        onChangeFilter={this.onChangeFilter}
                    />
                }
                    style={{height: 65+'px'}}/>
                <DentistHeader id='secretary_dateHeader'
                    date={this.state.date}
                    onChangeDate={this.onChangeDate}
                    startOfWeek={this.state.startOfWeek}
                    endOfWeek={this.state.endOfWeek}
                    daysParent={this.state.days}
                    weekUnparsed={this.state.weekUnparsed}
                    weekLength={this.state.days.length}
                    handleWeekAppointmentUpdate={this.handleWeekAppointmentUpdate}
                    handleDayAppointmentUpdate={this.handleDayAppointmentUpdate}
                    handleWeekAvailable={this.handleWeekAvailable}

                ></DentistHeader>
                 <div style={{height: 840+'px', margin:0+'px', overflowY:"auto"}}>
                {currView}
                </div>
            </div>
            
        );
    }

}

export default DentistPageComponent;