const express = require("express");
const router = express.Router();
const moment = require('moment');
const fs = require('fs');
const bodyparser = require("body-parser");
const urlencoder = bodyparser.urlencoded({
    extended: true
});

// router.get("/", (req, res) => {
//     res.render("addappointment.hbs");
// })
// External files imports

const { Appointment } = require("../model/appointment");
const { Doctor } = require("../model/doctor");
const { Process } = require("../model/process");
const { Schedule } = require("../model/schedule");
const { BreakTime } = require("../model/breaktime");
const { UnavailableDate } = require("../model/unavailableDate");
const { CheckDate } = require("../model/checkdate");
const appointment = require("../model/appointment");
const { TRUE } = require("node-sass");

/* 
    Ty Added :)
*/
router.get('/getProcess', (req, res)=>{
    console.log("Returns Processes")
    Process.find().then(process => res.json(process)).catch(err => res.status(400).json('Error'+err))

    

})
router.get('/getDoctors', (req, res)=>{
    console.log("Returns Doctors")
    Doctor.find().then(doctor => res.json(doctor)).catch(err => res.status(400).json('Error'+err))

    

})



//if there is a session currently active, goes immediately that session's page, if not go to login
router.get("/", async function (req, res) {
    if (req.session.username != null) {
    //     let doctor = await Doctor.getAllDoctors();
    //     let process = await Process.getAllProcesses();
    //    Process.getAllProcesses();
    //     Process.find().then(process => res.json(process)).catch(err => res.status(400).json('Error'+err))
    //     Doctor.find().then(doctor => res.json(doctor)).catch(err => res.status(400).json('Error'+err))
    //     res.render('page_templates/secretary_view.hbs', {
    //         doctor: doctor,
    //         process: process
    //     });
            res.redirect("/secretary")
    } else {
        res.redirect("/login");
    }
});

/* Try to get filtered data
*/
/*
    Getting templates for filtering 
*/

/*

CURRENTLY BEING USED 2020

*/
router.post("/week_all", urlencoder, async function (request, response) {

    let weekData = request.body.weeks;

    
    //Convert data to MMM D YYYY
    let formattedWeekData = [];

    for (var i = 0; i < weekData.length; i++) {
        let newDate = Date.parse(weekData[i]);
        let formattedDate = moment(newDate).format("MMM D YYYY");
        formattedWeekData.push(formattedDate);
    }

    // Load up the html template
    // let all_week = fs.readFileSync('./views/module_templates/secretary_week_all.hbs', 'utf-8');

    // Array for iterating time slots
    let timeSlotsArray = ["8:00 AM", "8:30 AM",
        "9:00 AM", "9:30 AM",
        "10:00 AM", "10:30 AM",
        "11:00 AM", "11:30 AM",
        "12:00 PM", "12:30 PM",
        "1:00 PM", "1:30 PM",
        "2:00 PM", "2:30 PM",
        "3:00 PM", "3:30 PM",
        "4:00 PM", "4:30 PM",
        "5:00 PM", "5:30 PM",
        "6:00 PM"];

    let dataArray = [];
    for (var i = 0; i < timeSlotsArray.length; i++) {
        let timeSlot = timeSlotsArray[i];
        // get all appointments in this date and time slot

        // appointments in a week for a time slot
        let weekAppointments = [];
        let maxInWeek = 0;

        // loop through all weekdates in one time slot
        for (var k = 0; k < formattedWeekData.length; k++) {
            let date = formattedWeekData[k].toString();

            // find all appointments in a date in a timeslot
            let appointmentlist = await Appointment.getAppointmentsByDateandTime(date, timeSlot);
            let appointments = [];
            for (var l = 0; l < appointmentlist.length; l++) {
                let appointment = appointmentlist[l];
                //populate necessary info
                appointment = await appointment.populateDoctorAndProcess();
                appointments.push(appointment);
            }

            if (appointmentlist.length > maxInWeek) {
                maxInWeek = appointmentlist.length;
            }

            // put in array of week appointments in a time slot
            let dayInWeek = {
                num: appointmentlist.length,
                appointments: appointments
            }

            weekAppointments.push(dayInWeek);
        }

        let data = {
            slot: timeSlot,
            max: maxInWeek,
            weekAppointments: weekAppointments
        };

        dataArray.push(data);
    }

    let final = {
        data: dataArray
    }
   


    response.send({
        data: final
    });
});
//returns a table/view of one week including the current date
router.post("/week_one", urlencoder, async function (request, result) {
    let weekData = request.body.weeks;
    let doctorID = request.body.doctor;

    //Convert data to MMM D YYYY
    let formattedWeekData = [];

    for (var i = 0; i < weekData.length; i++) {
        let newDate = Date.parse(weekData[i]);
        let formattedDate = moment(newDate).format("MMM D YYYY");
        formattedWeekData.push(formattedDate);
    }

    // Load up the html template
    // let one_doc = fs.readFileSync('./views/module_templates/secretary_week_one_doctor.hbs', 'utf-8');

    // Array for iterating time slots
    let timeSlotsArray = ["8:00 AM", "8:30 AM",
        "9:00 AM", "9:30 AM",
        "10:00 AM", "10:30 AM",
        "11:00 AM", "11:30 AM",
        "12:00 PM", "12:30 PM",
        "1:00 PM", "1:30 PM",
        "2:00 PM", "2:30 PM",
        "3:00 PM", "3:30 PM",
        "4:00 PM", "4:30 PM",
        "5:00 PM", "5:30 PM",
        "6:00 PM"];

    let dataArray = [];
    for (var i = 0; i < timeSlotsArray.length; i++) {
        let timeSlot = timeSlotsArray[i];
        // get all appointments in this date and time slot

        // appointments in a week for a time slot
        let weekAppointments = [];
        let maxInWeek = 0;

        // loop through all weekdates in one time slot
        for (var k = 0; k < formattedWeekData.length; k++) {
            let date = formattedWeekData[k].toString();


            // find all appointments in a date in a timeslot
            let appointmentlist = await Appointment.getAppByDoctorandDateandTime(doctorID, date, timeSlot);
            let appointments = [];
            for (var l = 0; l < appointmentlist.length; l++) {
                let appointment = appointmentlist[l];
                //populate necessary info
                appointment = await appointment.populateDoctorAndProcess();
                appointments.push(appointment);
            }

            if (appointmentlist.length > maxInWeek) {
                maxInWeek = appointmentlist.length;
            }

            // put in array of week appointments in a time slot
            let dayInWeek = {
                num: appointmentlist.length,
                appointments: appointments
            }

            weekAppointments.push(dayInWeek);
        }


        let data = {
            slot: timeSlot,
            max: maxInWeek,
            weekAppointments: weekAppointments
        };

        dataArray.push(data);
    }

    let final = {
        data: dataArray
    }


    result.send({
        data: final
    });

});


//returns all unvailable timeslots+doctors of a week
router.post("/week_unavailable", async function (request, result) {
    let weekData = request.body["dates[]"];

    //Convert data to MMM D YYYY
    let formattedWeekData = [];

    for (var i = 0; i < weekData.length; i++) {
        let newDate = Date.parse(weekData[i]);
        let formattedDate = moment(newDate).format("MMM D YYYY");
        formattedWeekData.push(formattedDate);
    }

    // Load up the html template
    let week_unavailable = fs.readFileSync('./views/module_templates/secretary_week_unavail.hbs', 'utf-8');

    // Array for iterating time slots
    let timeSlotsArray = ["8:00 AM", "8:30 AM",
        "9:00 AM", "9:30 AM",
        "10:00 AM", "10:30 AM",
        "11:00 AM", "11:30 AM",
        "12:00 PM", "12:30 PM",
        "1:00 PM", "1:30 PM",
        "2:00 PM", "2:30 PM",
        "3:00 PM", "3:30 PM",
        "4:00 PM", "4:30 PM",
        "5:00 PM", "5:30 PM",
        "6:00 PM"];

    let doctorsArray = await Doctor.getAllDoctors();
    let dataArray = [];
    for (var i = 0; i < timeSlotsArray.length; i++) {
        let timeSlot = timeSlotsArray[i];
        // get all appointments in this date and time slot

        // appointments in a week for a time slot
        let weekUnavailable = [];
        let maxInWeek = 0;

        // loop through all weekdates in one time slot
        for (var k = 0; k < formattedWeekData.length; k++) {
            let date = formattedWeekData[k].toString();

            let unavs = [];

            for (var l = 0; l < doctorsArray.length; l++) {
                let doctorID = doctorsArray[l]._id;
                let appointment = await Appointment.getOneAppByDoctorandDateandTime(doctorID, date, timeSlot);

                if (appointment) {
                    let unavDoctor = await Doctor.getDoctorByID(doctorID);
                    unavs.push(unavDoctor);
                }
            }

            if (unavs.length > maxInWeek) {
                maxInWeek = unavs.length;
            }

            // put in array of week appointments in a time slot
            let dayInWeek = {
                num: unavs.length,
                doctors: unavs
            }

            weekUnavailable.push(dayInWeek);
        }


        let data = {
            slot: timeSlot,
            max: maxInWeek,
            weekUnavailable: weekUnavailable
        };

        dataArray.push(data);
    }

    let final = {
        data: dataArray
    }


    result.send({
        htmlData: week_unavailable,
        data: final
    });
});
// shows all available doctors/timeslots of a week
router.post("/week_available", async function (request, result) {
    let weekData = request.body.weeks;

    //Convert data to MMM D YYYY
    let formattedWeekData = [];

    for (var i = 0; i < weekData.length; i++) {
        let newDate = Date.parse(weekData[i]);
        let formattedDate = moment(newDate).format("MMM D YYYY");
        formattedWeekData.push(formattedDate);
    }

    // Load up the html template

    // Array for iterating time slots
    let timeSlotsArray = ["8:00 AM", "8:30 AM",
        "9:00 AM", "9:30 AM",
        "10:00 AM", "10:30 AM",
        "11:00 AM", "11:30 AM",
        "12:00 PM", "12:30 PM",
        "1:00 PM", "1:30 PM",
        "2:00 PM", "2:30 PM",
        "3:00 PM", "3:30 PM",
        "4:00 PM", "4:30 PM",
        "5:00 PM", "5:30 PM",
        "6:00 PM"];

    let doctorsArray = await Doctor.getAllDoctors();
    let dataArray = [];
    for (var i = 0; i < timeSlotsArray.length; i++) {
        let timeSlot = timeSlotsArray[i];
        // get all appointments in this date and time slot

        // appointments in a week for a time slot
        let weekAvailable = [];
        let maxInWeek = 0;

        // loop through all weekdates in one time slot
        for (var k = 0; k < formattedWeekData.length; k++) {
            let date = formattedWeekData[k].toString();

            let avs = [];

            for (var l = 0; l < doctorsArray.length; l++) {
                let doctorID = doctorsArray[l]._id;
                let appointment = await Appointment.getOneAppByDoctorandDateandTime(doctorID, date, timeSlot);

                if (appointment) {

                } else {
                    let avDoctor = await Doctor.getDoctorByID(doctorID);
                    avs.push(avDoctor);
                }
            }

            if (avs.length > maxInWeek) {
                maxInWeek = avs.length;
            }

            // put in array of week appointments in a time slot
            let dayInWeek = {
                num: avs.length,
                doctors: avs
            }

            weekAvailable.push(dayInWeek);
        }


        let data = {
            slot: timeSlot,
            max: maxInWeek,
            weekAvailable: weekAvailable
        };

        dataArray.push(data);
    }

    let final = {
        data: dataArray
    }


    result.send({
        data: final
    });

});


router.get("/table_header", function (request, result) {
    let table_header = fs.readFileSync('./views/module_templates/secretary_weekdates.hbs', 'utf-8');
    result.send(table_header);
});

//checks every appointment within a day
router.post("/day_all", urlencoder, async function (request, result) {

    // Get the date from sent data
    let date = request.body.day;

    let newDate = Date.parse(date);
    let formattedDate = moment(newDate).format("MMM D YYYY");

    // Load up the html template
    // let all_day = fs.readFileSync('./views/module_templates/secretary_day_all.hbs', 'utf-8');

    // Array for iterating time slots
    let timeSlotsArray = ["8:00 AM", "8:30 AM",
        "9:00 AM", "9:30 AM",
        "10:00 AM", "10:30 AM",
        "11:00 AM", "11:30 AM",
        "12:00 PM", "12:30 PM",
        "1:00 PM", "1:30 PM",
        "2:00 PM", "2:30 PM",
        "3:00 PM", "3:30 PM",
        "4:00 PM", "4:30 PM",
        "5:00 PM", "5:30 PM",
        "6:00 PM"];

    let dataArray = [];
    for (var i = 0; i < timeSlotsArray.length; i++) {
        let timeSlot = timeSlotsArray[i];
        // get all appointments in this date and time slot
        let appointmentlist = await Appointment.getAppointmentsByDateandTime(formattedDate, timeSlot);
        let appointments = [];
        for (var k = 0; k < appointmentlist.length; k++) {
            let appointment = appointmentlist[k];
            //populate necessary info
            appointment = await appointment.populateDoctorAndProcess();
            appointments.push(appointment);
        }

        let data = {
            slot: timeSlot,
            appointments: appointments
        };

        dataArray.push(data);
    }

    let final = {
        data: dataArray
    }

    result.send({
        data: final
    });
});
// *** to be checked ***
router.post("/day_one", urlencoder, async function (request, result) {

    console.log
    // Get the date from sent data
    let date = request.body.date;
    let doctorID = request.body.doctor;

    console.log("Checking for doctor: ")
    console.log(doctorID)
    console.log("Checking for date: ")
    console.log(date)


    // Load up the html template
    // let one_day_doc = fs.readFileSync('./views/module_templates/secretary_day_one_doc.hbs', 'utf-8');

    // Array for iterating time slots
    let timeSlotsArray = ["8:00 AM", "8:30 AM",
        "9:00 AM", "9:30 AM",
        "10:00 AM", "10:30 AM",
        "11:00 AM", "11:30 AM",
        "12:00 PM", "12:30 PM",
        "1:00 PM", "1:30 PM",
        "2:00 PM", "2:30 PM",
        "3:00 PM", "3:30 PM",
        "4:00 PM", "4:30 PM",
        "5:00 PM", "5:30 PM",
        "6:00 PM"];

    let dataArray = [];

    let newDate = Date.parse(date);
    let formattedDate = moment(newDate).format("MMM D YYYY");
    for (var i = 0; i < timeSlotsArray.length; i++) {
        let timeSlot = timeSlotsArray[i];
        // get all appointments in this date and time slot
        let appointmentlist = await Appointment.getAppByDoctorandDateandTime(doctorID, formattedDate, timeSlot);
        let appointments = [];
        for (var k = 0; k < appointmentlist.length; k++) {
            let appointment = appointmentlist[k];
            //populate necessary info
            appointment = await appointment.populateDoctorAndProcess();
            appointments.push(appointment);
        }

        let data = {
            slot: timeSlot,
            appointments: appointments
        };

        dataArray.push(data);
    }

    // let doctorFound = await Doctor.getDoctorByID(doctorID);
    let final = {
        // doctor: doctorFound,
        data: dataArray
    }

    result.send({
        // htmlData: one_day_doc,
        data: final
    });
});
// Checks if the appointment still exists
router.post("/check_valid_appointment", urlencoder, async function (request, result) {
    // Get the date from sent data
    let date = request.body.date;
    let time = request.body.time;
    let doctors = request.body.doctors;
  



    result.send("Something");
});
/*
    End of Templates
*/
//gets an existing appointment
router.post("/getAppointment", urlencoder, async (req, res) => {
    let appID = req.body.appointmentID;

    let appointment = await Appointment.getAppointmentsByID(appID);
    appointment = await appointment.populateDoctorAndProcess();
    res.send(appointment);
})

/*
    Temporary doctor adding routes for testing purposes, remove when done
*/

router.get("/adddoc", (req, res) => {
    // let doctor = new Doctor({
    //     firstname: "Jiminey",
    //     lastname: "Cricket"
    // });
    // Doctor.addDoctor(doctor, function(doctor){
    //     res.send(doctor);
    // }, (error)=>{
    //     res.send(error);
    // })
})

router.get("/addproc", (req, res) => {
    // let process = new Process({
    //     processname: "Tartar Removal"
    // });
    // Process.addProcess(process, function(process){
    //     res.send(process);
    // }, (error)=>{
    //     res.send(error);
    // })
})

/*
    End of Temp
*/
// ***to be checked***
router.get("/appointmentlist", (req, res) => {
    Appointment.find().then(appointment => res.json(appointment)).catch(err => res.status(400).json('Error'+err))
})
//Get available doctors by getting the appointment dates and if 
//wala siyang appointment on the time slot, it will mean available
router.post("/create", urlencoder, (req, res) => {

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const patientcontact = req.body.patientcontact;
    const process = req.body.procedures;
    const notes = req.body.notes;
    const time = req.body.time;
    const date = req.body.date;
    const doctor = req.body.doctors;

    
    let newTime = Date.parse(time);
    let formattedTime = moment(newTime).format("h:mm A");

    
    let newDate = Date.parse(date);
    let formattedDate = moment(newDate).format("MMM D YYYY");

    //changed from formattedTime to normal time since already a string
    let appointment = new Appointment({
        firstname,
        lastname,
        patientcontact,
        process,
        notes,
        time:formattedTime,
        date: formattedDate,
        doctor
    });

    Appointment.addAppointment(appointment, function (appointment) {
        if (appointment) {
            res.send({message:true}),
            res.redirect("/secretary");
        } else {
            res.redirect("/");
        }

    }, (error) => {
        
        res.send({
            error,
            message: false
        });
    })
    // appointment.save()
    //     .then(() => res.json('Exercise Added'))
    //     .catch(err => res.status(400).json('Error'+err))
})
//Allows editing of appointment
router.post("/edit", urlencoder, async (req, res) => {
    console.log("Returning edits")
    const appointmentID = req.body.appointmentID;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const patientcontact = req.body.patientcontact;
    const process = req.body.procedures;
    const notes = req.body.notes;
    const time = req.body.time;
    const date = req.body.date;
    const doctor = req.body.doctors;

    console.log("doctors: "+ doctor)
    console.log("process: "+ process)

    let newTime = Date.parse(time);
    let formattedTime = moment(newTime).format("h:mm A");

    let newDate = Date.parse(date);
    let formattedDate = moment(newDate).format("MMM D YYYY");

    const appointment = new Appointment({ 
        firstname,
        lastname,
        patientcontact,
        process: process,
        doctor: doctor,
        notes,
        time: formattedTime,
        date: formattedDate
    });
    console.log("doctors1: "+ appointment.doctor)
    console.log("process1: "+ appointment.process)
    
    await Appointment.updateAppointment(appointmentID, appointment);

    res.send("success");
})

//Checker if the appointment exists in the database
router.post("/check_app_exists", urlencoder, async (req, res) => {
    let time = req.body.timeInput;
    let date = req.body.dateInput;
    let doctor = req.body["doctors[]"];

    let newTime = Date.parse(time);
    let formattedTime = moment(newTime).format("h:mm A");

    let newDate = Date.parse(date);
    let formattedDate = moment(newDate).format("MMM D YYYY");

    let found = false;

    if (typeof doctor === 'object') {
        for (var i = 0; i < doctor.length; i++) {
            let doctorID = doctor[i];
            let appointment = await Appointment.getAppByDoctorandDateandTime(doctorID, formattedDate, formattedTime);

            if (appointment.length != 0) {
                found = true;
            }
        }
    } else {
        let appointment = await Appointment.getOneAppByDoctorandDateandTime(doctor, formattedDate, formattedTime);

        if (appointment) {
            found = true;
        }
    }
    res.send(found);
});

router.post("/delete", urlencoder, async (req, res) => {
    let appID = req.body.appointmentID;

    await Appointment.delete(appID);

    res.send("Success");
})

// get available time of the doctor given doctorID and date
router.get("/getAvailable", async (req, res) => {

    let timeSlotsArray = ["8:00 AM", "8:30 AM",
        "9:00 AM", "9:30 AM",
        "10:00 AM", "10:30 AM",
        "11:00 AM", "11:30 AM",
        "12:00 PM", "12:30 PM",
        "1:00 PM", "1:30 PM",
        "2:00 PM", "2:30 PM",
        "3:00 PM", "3:30 PM",
        "4:00 PM", "4:30 PM",
        "5:00 PM", "5:30 PM",
        "6:00 PM"];

    let doctorID = req.body.doctorID;
    let doctor = await Doctor.getDoctorByID(doctorID);
    let docSched = await Schedule.getScheduleByID(doctor.schedule);
    let doctorUnAvail = await UnavailableDate.getDoctorUnavailableDates(doctorID);
    let breaktime = await BreakTime.getBreakTimeByID(doctor.breakTime);

    // date = what date is the appointment
    let date = req.body.dateInput;
    let newDate = Date.parse(date);
    let formattedDate = moment(newDate).format("YYYY-MM-DD");

    let dataArray = [];

    moment.updateLocale('en', {
        workinghours: {
            0: docSched.sunday,
            1: docSched.monday,
            2: docSched.tuesday,
            3: docSched.wednesday,
            4: docSched.thursday,
            5: docSched.friday,
            6: docSched.saturday
        }
    });

    var breakstart = "19:00:00";
    var breakend = "19:00:00";

    // gets the 'breaktime' of the doctor
    if (moment(formattedDate).isoWeekday() == 1 && breaktime.monday != "") {
        var breakstart = breaktime.monday[0];
        var breakend = breaktime.monday[1];
    } else if (moment(formattedDate).isoWeekday() == 2 && breaktime.tuesday != "") {
        var breakstart = breaktime.tuesday[0];
        var breakend = breaktime.tuesday[1];
    } else if (moment(formattedDate).isoWeekday() == 3 && breaktime.wednesday != "") {
        var breakstart = breaktime.wednesday[0];
        var breakend = breaktime.wednesday[1];
    } else if (moment(formattedDate).isoWeekday() == 4 && breaktime.thursday != "") {
        var breakstart = breaktime.thursday[0];
        var breakend = breaktime.thursday[1];
    } else if (moment(formattedDate).isoWeekday() == 5 && breaktime.friday != "") {
        var breakstart = breaktime.friday[0];
        var breakend = breaktime.friday[1];
    } else if (moment(formattedDate).isoWeekday() == 6 && breaktime.saturday != "") {
        var breakstart = breaktime.saturday[0];
        var breakend = breaktime.saturday[1];
    } else if (moment(formattedDate).isoWeekday() == 7 && breaktime.sunday != "") {
        var breakstart = breaktime.sunday[0];
        var breakend = breaktime.sunday[1];
    }

    let breakstartFormat = moment(formattedDate + ' ' + breakstart, 'YYYY-MM-DD HH:mm');
    let breakendFormat = moment(formattedDate + ' ' + breakend, 'YYYY-MM-DD HH:mm');

    var dates = [];
    if (doctorUnAvail != "") {
        for (var k = 0; k < doctorUnAvail.length; k++) {
            var start = new Date(doctorUnAvail[k].stringDate1);
            let startformattedDate = moment(start).format("YYYY-MM-DD");
            var end = new Date(doctorUnAvail[k].stringDate2);
            let endformattedDate = moment(end).format("YYYY-MM-DD");

            // console.log("DOCTOR:" + doctor.firstname + "-------" + startformattedDate)
            // console.log("DOCTOR:" + doctor.firstname + "-------" + endformattedDate)
            var getDates = function (startDate, endDate) {
                var datesget = [];
                if (dates != "") {
                    datesget = dates;
                }

                var currentDate = startDate,
                    addDays = function (days) {
                        var date = new Date(this.valueOf());
                        date.setDate(date.getDate() + days);
                        return date;
                    };
                while (currentDate <= endDate) {
                    datesget.push(currentDate);
                    currentDate = addDays.call(currentDate, 1);
                }
                return datesget;
            };

            // Usage
            dates = getDates(new Date(startformattedDate), new Date(endformattedDate));
        }
    }

    var something = dates.filter((value) => {
        return moment(value).format("YYYY-MM-DD") == formattedDate;
    })

    //Checks if the dentist is available based on schedule
    if (moment(formattedDate).isWorkingDay()) {
        for (var i = 0; i < timeSlotsArray.length; i++) {
            let timeSlot = timeSlotsArray[i];

            let newTime = Date.parse(timeslot);
            let formattedTime = moment(newTime).format("HH:mm");

            let datetime = moment(formattedDate + ' ' + formattedTime, 'YYYY-MM-DD HH:mm');

            let appointment = await Appointment.getOneAppByDoctorandDateandTime(doctorID, formattedDate, formattedTime);

            // if working time of dentist and the time is not in the 'break time' adds to the list of available times
            if (moment(datetime.format('YYYY-MM-DD HH:mm')).isWorkingTime() && something == "" && doctor.status == "Active"
                && !(moment(datetime.format('YYYY-MM-DD HH:mm')).isBetween(breakstartFormat.format('YYYY-MM-DD HH:mm'), breakendFormat.format('YYYY-MM-DD HH:mm'), 'minute')) && appointment == "") {
                let data = {
                    slot: timeSlot,
                };

                dataArray.push(data);
            }
        }
    }
    result.send({ /* Send the available time somewhere*/
        htmlData: all_day,
        data: dataArray
    });
})

// get unavailable time of the doctor given doctorID and date
router.get("/getUnavailable", async (req, res) => {

    let timeSlotsArray = ["8:00 AM", "8:30 AM",
        "9:00 AM", "9:30 AM",
        "10:00 AM", "10:30 AM",
        "11:00 AM", "11:30 AM",
        "12:00 PM", "12:30 PM",
        "1:00 PM", "1:30 PM",
        "2:00 PM", "2:30 PM",
        "3:00 PM", "3:30 PM",
        "4:00 PM", "4:30 PM",
        "5:00 PM", "5:30 PM",
        "6:00 PM"];

    let doctorID = req.body.doctorID;
    let doctor = await Doctor.getDoctorByID(doctorID);
    let docSched = await Schedule.getScheduleByID(doctor.schedule);
    let doctorUnAvail = await UnavailableDate.getDoctorUnavailableDates(doctorID);
    let breaktime = await BreakTime.getBreakTimeByID(doctor.breakTime);

    // date = what date is the appointment
    let date = req.body.dateInput;
    let newDate = Date.parse(date);
    let formattedDate = moment(newDate).format("YYYY-MM-DD");

    let dataArray = [];

    moment.updateLocale('en', {
        workinghours: {
            0: docSched.sunday,
            1: docSched.monday,
            2: docSched.tuesday,
            3: docSched.wednesday,
            4: docSched.thursday,
            5: docSched.friday,
            6: docSched.saturday
        }
    });
    var breakstart = "19:00:00";
    var breakend = "19:00:00";
    //REFACTOR THIS. IT KEEPS REPEATING
    // gets the 'breaktime' of the doctor
    if (moment(formattedDate).isoWeekday() == 1 && breaktime.monday != "") {
        var breakstart = breaktime.monday[0];
        var breakend = breaktime.monday[1];
    } else if (moment(formattedDate).isoWeekday() == 2 && breaktime.tuesday != "") {
        var breakstart = breaktime.tuesday[0];
        var breakend = breaktime.tuesday[1];
    } else if (moment(formattedDate).isoWeekday() == 3 && breaktime.wednesday != "") {
        var breakstart = breaktime.wednesday[0];
        var breakend = breaktime.wednesday[1];
    } else if (moment(formattedDate).isoWeekday() == 4 && breaktime.thursday != "") {
        var breakstart = breaktime.thursday[0];
        var breakend = breaktime.thursday[1];
    } else if (moment(formattedDate).isoWeekday() == 5 && breaktime.friday != "") {
        var breakstart = breaktime.friday[0];
        var breakend = breaktime.friday[1];
    } else if (moment(formattedDate).isoWeekday() == 6 && breaktime.saturday != "") {
        var breakstart = breaktime.saturday[0];
        var breakend = breaktime.saturday[1];
    } else if (moment(formattedDate).isoWeekday() == 7 && breaktime.sunday != "") {
        var breakstart = breaktime.sunday[0];
        var breakend = breaktime.sunday[1];
    }

    let breakstartFormat = moment(formattedDate + ' ' + breakstart, 'YYYY-MM-DD HH:mm');
    let breakendFormat = moment(formattedDate + ' ' + breakend, 'YYYY-MM-DD HH:mm');

    var dates = [];
    if (doctorUnAvail != "") {
        for (var k = 0; k < doctorUnAvail.length; k++) {
            var start = new Date(doctorUnAvail[k].stringDate1);
            let startformattedDate = moment(start).format("YYYY-MM-DD");
            var end = new Date(doctorUnAvail[k].stringDate2);
            let endformattedDate = moment(end).format("YYYY-MM-DD");

            // console.log("DOCTOR:" + doctor.firstname + "-------" + startformattedDate)
            // console.log("DOCTOR:" + doctor.firstname + "-------" + endformattedDate)
            var getDates = function (startDate, endDate) {
                var datesget = [];
                if (dates != "") {
                    datesget = dates;
                }

                var currentDate = startDate,
                    addDays = function (days) {
                        var date = new Date(this.valueOf());
                        date.setDate(date.getDate() + days);
                        return date;
                    };
                while (currentDate <= endDate) {
                    datesget.push(currentDate);
                    currentDate = addDays.call(currentDate, 1);
                }
                return datesget;
            };

            // Usage
            dates = getDates(new Date(startformattedDate), new Date(endformattedDate));
        }
    }

    var something = dates.filter((value) => {
        return moment(value).format("YYYY-MM-DD") == formattedDate;
    })

    // if it is not working day then sends the whole timeslot array
    if (!moment(formattedDate).isWorkingDay()) {
        dataArray = timeSlotsArray;
    } else {
        for (var i = 0; i < timeSlotsArray.length; i++) {
            let timeSlot = timeSlotsArray[i];

            let newTime = Date.parse(timeslot);
            let formattedTime = moment(newTime).format("HH:mm");

            let datetime = moment(formattedDate + ' ' + formattedTime, 'YYYY-MM-DD HH:mm');

            let appointment = await Appointment.getOneAppByDoctorandDateandTime(doctorID, formattedDate, formattedTime);

            //checks if the time is not working time or in between break adds to the unavailable times
            if (!moment(datetime.format('YYYY-MM-DD HH:mm')).isWorkingTime() || something == "" || doctor.status != "Active"
                && (moment(datetime.format('YYYY-MM-DD HH:mm')).isBetween(breakstartFormat.format('YYYY-MM-DD HH:mm'), breakendFormat.format('YYYY-MM-DD HH:mm'), 'minute')) || appointment != "") {
                let data = {
                    slot: timeSlot,
                };

                dataArray.push(data);
            }
        }
    }
    result.send({ /* Send the available time somewhere*/
        htmlData: all_day,
        data: dataArray
    });
})

// given date and time, will return the available doctors
router.post("/getAvailableDoctors", urlencoder, async (req, res) => {
    let fn = req.body.fn;

    let addDoctorField = fs.readFileSync('./views/module_templates/' + fn + '', 'utf-8');

    let time = req.body.timeInput;
    let date = req.body.dateInput;


    let newTime = Date.parse(time);
    let formattedTime = moment(newTime).format("HH:mm");
    let schemaFormattedTime = moment(newTime).format("h:mm A")

    let newDate = Date.parse(date);
    let formattedDate = moment(newDate).format("YYYY-MM-DD");
    let schemaFormattedDate = moment(newDate).format("MMM D YYYY")

    let datetime = moment(formattedDate + ' ' + formattedTime, 'YYYY-MM-DD HH:mm');
    let doctors = await Doctor.getAllDoctors();
    let doctorsArray = [];

    for (var i = 0; i < doctors.length; i++) {
        let doctor = doctors[i];
        let docSched = await Schedule.getScheduleByID(doctor.schedule);
        let doctorUnAvail = await UnavailableDate.getDoctorUnavailableDates(doctor._id);
        let breaktime = await BreakTime.getBreakTimeByID(doctor.breakTime);
        let appointment = await Appointment.getAppByDoctorandDateandTime(doctor._id, schemaFormattedDate, schemaFormattedTime);
        // console.log(appointment)
        moment.updateLocale('en', {
            workinghours: {
                0: docSched.sunday,
                1: docSched.monday,
                2: docSched.tuesday,
                3: docSched.wednesday,
                4: docSched.thursday,
                5: docSched.friday,
                6: docSched.saturday
            }
        });

        var breakstart = "19:00:00";
        var breakend = "19:00:00";

        // gets the 'breaktime' of the doctor
        if (moment(formattedDate).isoWeekday() == 1 && breaktime.monday != "") {
            var breakstart = breaktime.monday[0];
            var breakend = breaktime.monday[1];
        } else if (moment(formattedDate).isoWeekday() == 2 && breaktime.tuesday != "") {
            var breakstart = breaktime.tuesday[0];
            var breakend = breaktime.tuesday[1];
        } else if (moment(formattedDate).isoWeekday() == 3 && breaktime.wednesday != "") {
            var breakstart = breaktime.wednesday[0];
            var breakend = breaktime.wednesday[1];
        } else if (moment(formattedDate).isoWeekday() == 4 && breaktime.thursday != "") {
            var breakstart = breaktime.thursday[0];
            var breakend = breaktime.thursday[1];
        } else if (moment(formattedDate).isoWeekday() == 5 && breaktime.friday != "") {
            var breakstart = breaktime.friday[0];
            var breakend = breaktime.friday[1];
        } else if (moment(formattedDate).isoWeekday() == 6 && breaktime.saturday != "") {
            var breakstart = breaktime.saturday[0];
            var breakend = breaktime.saturday[1];
        } else if (moment(formattedDate).isoWeekday() == 7 && breaktime.sunday != "") {
            var breakstart = breaktime.sunday[0];
            var breakend = breaktime.sunday[1];
        }

        let breakstartFormat = moment(formattedDate + ' ' + breakstart, 'YYYY-MM-DD HH:mm');
        let breakendFormat = moment(formattedDate + ' ' + breakend, 'YYYY-MM-DD HH:mm');

        var dates = [];
        if (doctorUnAvail != "") {
            for (var k = 0; k < doctorUnAvail.length; k++) {
                var start = new Date(doctorUnAvail[k].stringDate1);
                let startformattedDate = moment(start).format("YYYY-MM-DD");
                var end = new Date(doctorUnAvail[k].stringDate2);
                let endformattedDate = moment(end).format("YYYY-MM-DD");


                var getDates = function (startDate, endDate) {
                    var datesget = [];
                    if (dates != "") {
                        datesget = dates;
                    }

                    var currentDate = startDate,
                        addDays = function (days) {
                            var date = new Date(this.valueOf());
                            date.setDate(date.getDate() + days);
                            return date;
                        };
                    while (currentDate <= endDate) {
                        datesget.push(currentDate);
                        currentDate = addDays.call(currentDate, 1);
                    }
                    return datesget;
                };

                // Usage
                dates = getDates(new Date(startformattedDate), new Date(endformattedDate));
            }
        }

        var something = dates.filter((value) => {
            return moment(value).format("YYYY-MM-DD") == formattedDate;
        })


        //Checks if the dentist is available based on schedule
        if (moment(datetime.format('YYYY-MM-DD HH:mm')).isWorkingTime() && something == "" && doctor.status == "Active"
            && !(moment(datetime.format('YYYY-MM-DD HH:mm')).isBetween(breakstartFormat.format('YYYY-MM-DD HH:mm'), breakendFormat.format('YYYY-MM-DD HH:mm'), 'minute')) && appointment == "") {

            let data = {
                doctor: doctor,
            };

            doctorsArray.push(data);
        }

    }
    let final = {
        data: doctorsArray
    }
    res.send({ /* Send the doctors somewhere*/
        htmlData: addDoctorField,
        data: final
    });
})


router.post("/info1", urlencoder, async function (request, result) {
    let info1 = fs.readFileSync('./views/module_templates/info1.hbs', 'utf-8');
    result.send({
        htmlData: info1
    })

})

router.post("/info2", urlencoder, async function (request, result) {
    let info2 = fs.readFileSync('./views/module_templates/info2.hbs', 'utf-8');
    result.send({
        htmlData: info2
    })
})

router.post("/info3", urlencoder, async function (request, result) {
    let info3 = fs.readFileSync('./views/module_templates/info3.hbs', 'utf-8');
    result.send({
        htmlData: info3
    })
})

router.post("/info4", urlencoder, async function (request, result) {
    let info4 = fs.readFileSync('./views/module_templates/info4.hbs', 'utf-8');
    result.send({
        htmlData: info4
    })
})
//checks all available time
router.post("/availabilityTime", urlencoder, async (req, res) => {
    let date = req.body.date
    let doctorID = req.body.doctorID
    

    var slots1Military = ["8:00", "8:30",
        "9:00", "9:30",
        "10:00", "10:30",
        "11:00", "11:30",
        "12:00", "12:30",
        "13:00 "]
    var slots2Military = ["13:30",
        "14:00", "14:30",
        "15:00", "15:30",
        "16:00", "16:30",
        "17:00", "17:30",
        "18:00"];


    var slots1 =
        ["8:00 AM", "8:30 AM",
            "9:00 AM", "9:30 AM",
            "10:00 AM", "10:30 AM",
            "11:00 AM", "11:30 AM",
            "12:00 PM", "12:30 PM",
            "1:00 PM"]
    var availability1;

    var slots2 = ["1:30 PM",
        "2:00 PM", "2:30 PM",
        "3:00 PM", "3:30 PM",
        "4:00 PM", "4:30 PM",
        "5:00 PM", "5:30 PM",
        "6:00 PM"]
    var availability2;

    var row = []

    var doctor = await Doctor.getDoctorByID(doctorID);
    var docSched = await Schedule.getScheduleByID(doctor.schedule);
    var unavDate = await UnavailableDate.getDoctorUnavailableDates(doctor)
    var docBreakTime = await BreakTime.getBreakTimeByID(doctor.breakTime);
    var schedule = [docSched.sunday, docSched.monday, docSched.tuesday, docSched.wednesday, docSched.thursday, docSched.friday, docSched.saturday]
    var breakTime = [docBreakTime.sunday, docBreakTime.monday, docBreakTime.tuesday, docBreakTime.wednesday, docBreakTime.thursday, docBreakTime.friday, docBreakTime.saturday]
    var dayOfWeek = moment(date).day()

    for (var i = 0; i < slots1.length; i++) {
        availability1 = "available"
        availability2 = "available"

        var app1 = await Appointment.getOneAppByDoctorandDateandTime(doctorID, date, slots1[i])
        var app2 = await Appointment.getOneAppByDoctorandDateandTime(doctorID, date, slots2[i])

        if (app1 !== null) {
            availability1 = "unavailable"
        }
        if (app2 !== null) {
            availability2 = "unavailable"
        }

        for (var j = 0; j < unavDate.length; j++) {
            if (moment(date).isBetween(moment(unavDate[j].momentDate1), moment(unavDate[j].momentDate2), null, "[]")) {
                availability1 = "unavailable"
            }

            if (slots2Military[i] !== undefined && moment(date).isBetween(moment(unavDate[j].momentDate1), moment(unavDate[j].momentDate2), null, "[]")) {
                availability2 = "unavailable"
            }
        }


        if (!((schedule[dayOfWeek] !== null && schedule[dayOfWeek].length !== 0) && moment.utc(slots1Military[i], "HH:mm").isBetween(moment.utc(schedule[dayOfWeek][0], "HH:mm"), moment.utc(schedule[dayOfWeek][1], "HH:mm"), null, "[]")
            && !moment.utc(slots1Military[i], "HH:mm").isBetween(moment.utc(breakTime[dayOfWeek][0], "HH:mm"), moment.utc(breakTime[dayOfWeek][1], "HH:mm"), null, "[]"))) {
            availability1 = "unavailable"
        }
        if (!((schedule[dayOfWeek] !== null && schedule[dayOfWeek].length !== 0) && moment.utc(slots2Military[i], "HH:mm").isBetween(moment.utc(schedule[dayOfWeek][0], "HH:mm"), moment.utc(schedule[dayOfWeek][1], "HH:mm"), null, "[]")
            && !moment.utc(slots2Military[i], "HH:mm").isBetween(moment.utc(breakTime[dayOfWeek][0], "HH:mm"), moment.utc(breakTime[dayOfWeek][1], "HH:mm"), null, "[]"))) {
            availability2 = "unavailable"
        }
        if(slots1[i] === undefined) availability1 = "undef"
        if(slots2[i] === undefined) availability2 = "undef"
        row.push({
            timeSlot1: slots1[i],
            timeSlot2: slots2[i],
            available1: availability1,
            available2: availability2
        })
    }

    var displayDate = moment(date).format("MMMM DD YYYY")

    let final = {
        row: row,
        doctor: doctor,
        displayDate: displayDate,
        date: date
    }

    

    res.send({
        data: final
    })


})


//checks all availability time per doctor
router.post("/availabilityAll", urlencoder, async (req, res) => {

    console.log("AvailabilityAll was called...")
    let weekData = req.body.weeks;

    let timeSlotsArray = ["8:00", "8:30",
        "9:00", "9:30",
        "10:00", "10:30",
        "11:00", "11:30",
        "12:00", "12:30",
        "13:00 ", "13:30 ",
        "14:00 ", "14:30 ",
        "15:00 ", "15:30 ",
        "16:00 ", "16:30 ",
        "17:00 ", "17:30 ",
        "18:00 "];

    let formattedWeekData = [];
    let momentWeekData = [];
    for (var i = 0; i < weekData.length; i++) {
        let newDate = Date.parse(weekData[i]);
        let formattedDate = moment(newDate).format("MMM D YYYY");
        momentWeekData.push(moment(newDate))
        formattedWeekData.push(formattedDate);
    }
    



    //let availabilityhbs = fs.readFileSync('./views/module_templates/secretary_availability.hbs', 'utf-8');

    var allDoctors = await Doctor.getAllDoctors();
    var allDoctorsAvailability = []
    for (var i = 0; i < allDoctors.length; i++) {
        allDoctorsAvailability[i] = {}
        allDoctorsAvailability[i].availability = []
        allDoctorsAvailability[i]._id = allDoctors[i]._id
        allDoctorsAvailability[i].firstname = allDoctors[i].firstname
        allDoctorsAvailability[i].lastname = allDoctors[i].lastname
        for (var j = 0; j < formattedWeekData.length; j++) {
            var available = "unavailable";
            var unavDate = await UnavailableDate.getDoctorUnavailableDates(allDoctors[i])
            var docSched = await Schedule.getScheduleByID(allDoctors[i].schedule);

            var schedule = [docSched.sunday, docSched.monday, docSched.tuesday, docSched.wednesday, docSched.thursday, docSched.friday, docSched.saturday]
            for (var k = 0; k < timeSlotsArray.length; k++) {
                var app = await Appointment.getOneAppByDoctorandDateandTime(allDoctors[i], formattedWeekData[j], timeSlotsArray[k])
                if (app === null && schedule[j] != null && moment.utc(timeSlotsArray[k], "HH:mm").isBetween(moment.utc(schedule[j][0], "HH:mm"), moment.utc(schedule[j][1], "HH:mm"), null, "[]")) {
                    available = "available";
                    break;
                }
            }

            for (var k = 0; k < unavDate.length; k++) {
                if (moment(momentWeekData[j]).isBetween(moment(unavDate[k].momentDate1), moment(unavDate[k].momentDate2), null, "[]")) {
                    available = "unavailable"
                    break;
                }
            }

            if (j === 0) {
                available = "sunday"
            }


            if(isPast(formattedWeekData[j])){
                available = "past"
            }

            allDoctorsAvailability[i].availability.push([formattedWeekData[j], available])
        }
    }
    let final = {
        doctors: allDoctorsAvailability
    };
    
    res.send({
       // htmlData: availabilityhbs,
        data: final
    });

})


// empties everything 5 years ago
router.post("/deleteXYearsApp", urlencoder, async (req, res) => {
    let temp = moment().subtract(5,'years');
    // console.log(temp.year());
    
    let apps =  await Appointment.getAll();

     for (var i = 0; i < apps.length; i++) {
        //  console.log(apps[i].date);
         let tempdate = new Date(apps[i].date);
         let year = moment(tempdate).format("YYYY");
        
        if(year <= temp.year()){
            // console.log(apps[i]);
            await Appointment.delete(apps[i]._id);
            break;
        }
    }
    // update the checkdate
    var date = await CheckDate.findOne({type: "date"});
    var today = moment().toDate();
    if(moment(Date.parse(date.checkdate)).year() == moment(today).year()) {
        await CheckDate.updateOne({
            _id: date.id 
        },{
            checkdate: (moment(today).year() + 1) + "-12-01"
        })
    }
    res.send(true);
})

//checks if how many years the app has been active
router.post("/isXYearsApp", urlencoder, async (req, res) => {
    // adjust date
    var date = await CheckDate.findOne({type: "date"});
    var today = Date.parse(req.body.monthToday);
    var check = moment(date.checkdate, "YYYY-MM-DD");
    // check if it is december
    if(moment(today).isSame(moment("2019-12-31", "month"))) {
        if(moment(today).year() == moment(check).year()) {
            let temp = moment().subtract(5,'years');
    
            let apps =  await Appointment.getAll();

            for (var i = 0; i < apps.length; i++) {
                let tempdate = new Date(apps[i].date);
                let year = moment(tempdate).format("YYYY");
                
                if(year <= temp.year()){
                    res.send(true);
                    break;
                }
            }
        } else {
            res.send(false);
        }
    } else {
        res.send(false);
    }
})

function isPast(date) {
    var focusedDate
    focusedDate = moment(date)
    focusDate = focusedDate.add(1, 'd')

    var now = moment()
    if (focusedDate < now) return true;
    return false;
}

module.exports = router;