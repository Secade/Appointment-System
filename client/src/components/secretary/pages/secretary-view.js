import React, {Component} from 'react';
import Navbar from "../module/secretary-navigationbar"
import AddAppointment from "../module/secretary-add-appointment-modal"
import {Grid, Header, Dropdown, Dimmer} from "semantic-ui-react"
import moment from 'moment'
import axios from 'axios'
import SecretaryHeader from "../module/secretary-header"
import SecretaryTable from "../module/secretary-week-all"
import DayAll from "../module/secretary-day-all"
import SecretaryAvailable from '../module/secretary-availabilty'
import SecretaryWeekDoc from "../module/secretary-week-all-one-doc"
import SecretaryDayDoc from "../module/secretary-day-all-one-doc"

import { SemanticToastContainer} from 'react-semantic-toasts';

/*CSS FILES*/
import '../secretary_css/secretary-view.css'
import 'semantic-ui-css/components/reset.min.css';
import 'semantic-ui-css/components/site.min.css';
import 'semantic-ui-css/components/container.min.css';
import 'semantic-ui-css/components/icon.min.css';
import 'semantic-ui-css/components/message.min.css';
import 'semantic-ui-css/components/header.min.css';

export default class Secretary extends Component{

    

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
        this.handleDocWeekAppointmentUpdate = this.handleDocWeekAppointmentUpdate.bind(this)
        this.handleShowDimmer = this.handleShowDimmer.bind(this)
        this.handleHideDimmer = this.handleHideDimmer.bind(this)
        this.handleDayDocAppointmentUpdate = this.handleDayDocAppointmentUpdate.bind(this)

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
            activeDimmer: false,
            weekAppointmentsDoc:[],
            dayAppointmentsDoc:[]

        }
        this.handleDayAppointmentUpdate()
        this.handleWeekAppointmentUpdate()
        this.handleWeekAvailable()
        this.handleDocWeekAppointmentUpdate()
        this.handleDayDocAppointmentUpdate()
    }

    handleShowDimmer = () => this.setState({activeDimmer: true});
    handleHideDimmer = () => this.setState({activeDimmer: false})



    componentDidMount(){
        this.handleShowDimmer();
        axios.get('http://localhost:3000/secretary/getDoctors')
            .then(response => {
                if(response.data.length > 0){
                    
                    this.setState({   
                        doctors: [
                            ...response.data.map(doctor =>{
                                return{
                                    key: doctor._id,
                                    text: doctor.firstname+" "+doctor.lastname,
                                    value: doctor._id
                                }
                            })
                        ],
                        
                    })
                }
            })
        axios.get('http://localhost:3000/secretary/appointmentlist')
            .then(response=>{
                this.setState({
                    appointments: response.data,
                })
            })
            .catch((error)=>{
                console.log(error)
        })
        this.handleHideDimmer();
           
    }

    handleWeekAvailable(){
        console.log("Updating Availability...")
        this.handleShowDimmer();
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
            this.handleHideDimmer();
        })
        
       
    }


    handleWeekAppointmentUpdate(){
        this.handleShowDimmer();
        console.log("Updating Week-all...")
        const week = {
            weeks: this.state.weekUnparsed
        }
        
        axios.post('http://localhost:3000/secretary/week_all', week).then(res =>{
            this.setState({
                weekAppointments: res.data.data.data
            })
            console.log("Week-all Data: ")
            console.log(res.data.data.data)
            this.handleHideDimmer()
        })
        
   }

   handleDayAppointmentUpdate(){
       console.log("DayUpdate")
       this.handleShowDimmer();
        const day = {
            day: this.state.date
        }
        axios.post('http://localhost:3000/secretary/day_all', day).then(res =>{
            
            this.setState({
                dayAppointments: res.data.data.data
            })
            console.log("Day-all Data")
            console.log(res.data.data.data)
            this.handleHideDimmer()
        })

     }
     handleDayDocAppointmentUpdate(){
        console.log("DayDocUpdate")
        this.handleShowDimmer();
         const day = {
             date: this.state.date,
             doctor: this.state.filter
         }
         axios.post('http://localhost:3000/secretary/day_one', day).then(res =>{
             
             this.setState({
                 dayAppointmentsDoc: res.data.data.data
             })
             console.log("Day-all one doc Data")
             console.log(res.data.data.data)
             this.handleHideDimmer()
         })
 
      }

    handleDocWeekAppointmentUpdate(){
        console.log("Week Doctor Update")
       this.handleShowDimmer();
        const data = {
            weeks: this.state.weekUnparsed,
            doctor: this.state.filter
        }
        axios.post('http://localhost:3000/secretary/week_one', data).then(res =>{
            
            this.setState({
                weekAppointmentsDoc: res.data.data.data
            })
            console.log("Week-all-Doc Data: ")
            console.log(res.data.data.data)
            this.handleHideDimmer()
        })

    }


   

    //Updates week
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
        console.log(value)
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
    render(){

        const filter =[
            {text:"APPOINTMENTS", key:"appointments", value:"appointments"},
            {text:"AVAILABILITY", key:"availability", value:"availability"},
        ]
        this.state.doctors.map(doc=>{
            filter.push(doc)
        })
        const viewer=[
            {text:"DAY", key:"day", value:"day"},
            {text:"WEEK", key:"week", value:"week"}
        ]
        let currView;

        if(this.state.view === 'week' && this.state.filter === 'appointments'){
            console.log("Changing to week Appointment table...")
            currView = <SecretaryTable 
                            week={this.state.weekUnparsed}
                            appointments={this.state.weekAppointments}
                            handleWeekAppointmentUpdate={this.handleWeekAppointmentUpdate}
                            handleDocWeekAppointmentUpdate={this.handleDocWeekAppointmentUpdate}
                            handleShowDimmer={this.handleShowDimmer}
                            handleHideDimmer={this.handleHideDimmer}
                        >
                        </SecretaryTable>
        }
        else if(this.state.view === 'day' && this.state.filter === 'appointments'){
            currView = <DayAll
                            day={this.state.date}
                            appointments={this.state.dayAppointments}
                            handleDayAppointmentUpdate={this.handleDayAppointmentUpdate}
                            handleDayDocAppointmentUpdate={this.handleDayDocAppointmentUpdate}
                            handleShowDimmer={this.handleShowDimmer}
                            handleHideDimmer={this.handleHideDimmer}
                        > 
                        </DayAll>
        }
        else if(this.state.filter === 'availability'){
            console.log("Changing to availability table...")
            
            currView = <SecretaryAvailable
                            week={this.state.weekUnparsed}
                            weekAvailable={this.state.weekAvailable}
                            handleWeekAvailable={this.handleWeekAvailable}
                            handleDayAppointmentUpdate={this.handleDayAppointmentUpdate}
                            handleWeekAppointmentUpdate={this.handleWeekAppointmentUpdate}
                            handleShowDimmer={this.handleShowDimmer}
                            handleHideDimmer={this.handleHideDimmer}
                            
                        />
        }
        else{
            console.log("Changing to doctor view...")
            if(this.state.filter !== 'appointments' && this.state.filter !== 'availability' && this.state.view === 'week'){
                currView =<SecretaryWeekDoc
                            week={this.state.weekUnparsed}
                            appointments={this.state.weekAppointmentsDoc}
                            handleDocWeekAppointmentUpdate={this.handleDocWeekAppointmentUpdate}
                            handleWeekAppointmentUpdate={this.handleWeekAppointmentUpdate}
                            handleShowDimmer={this.handleShowDimmer}
                            handleHideDimmer={this.handleHideDimmer}
                            doc={this.state.filter}
                        />
            }
            else if(this.state.filter !== 'appointments' && this.state.filter !== 'availability' && this.state.view === 'day'){
                currView =<SecretaryDayDoc
                            day={this.state.date}
                            appointments={this.state.dayAppointmentsDoc}
                            handleDayDocAppointmentUpdate={this.handleDayDocAppointmentUpdate}
                            handleDayAppointmentUpdate={this.handleDayAppointmentUpdate}
                            handleShowDimmer={this.handleShowDimmer}
                            handleHideDimmer={this.handleHideDimmer}
                            doc={this.state.filter}
                        />
            }
        }
        return(
            <>
                <Dimmer
                            active={this.state.activeDimmer}
                            inverted
                            id="list-dimmer"
                            style={{ maxHeight: "100%" }}
                        >
                            <div className="ui elastic huge green loader"></div>
                </Dimmer>
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
                <SecretaryHeader id='secretary_dateHeader'
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

                >

                </SecretaryHeader>
                <div style={{height: 840+'px', margin:0+'px', overflowY:"auto"}}>
                {currView}
                </div>
                
                
            </>
        )
            
            
    }
}