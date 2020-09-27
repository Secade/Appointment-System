import React from "react";
import axios from "axios";
import { Modal, Icon, Button } from "semantic-ui-react";
import { toast } from "react-semantic-toasts";

class AdminDeleteScheduleModal extends React.Component {
    constructor(props) {
        super(props);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleOpen = () => this.props.handleModal("admin-delete-schedule");

    handleClose(doctorID, firstname, lastname) {
        this.props.handleModal("admin-view-schedule", {
            key: doctorID,
            firstname,
            lastname,
        });
        this.props.handleUpdateTable(doctorID);
    }

    handleDelete = (
        event,
        { datakey, firstname, lastname, day, schedule, breaktime }
    ) => {
        event.preventDefault();

        day = day.toLowerCase();
        schedule[day] = [];
        breaktime[day] = [];

        const data = {
            "monday[]": schedule["monday"],
            "tuesday[]": schedule["tuesday"],
            "wednesday[]": schedule["wednesday"],
            "thursday[]": schedule["thursday"],
            "friday[]": schedule["friday"],
            "saturday[]": schedule["saturday"],
            "mondaydifference[]": breaktime["monday"],
            "tuesdaydifference[]": breaktime["tuesday"],
            "wednesdaydifference[]": breaktime["wednesday"],
            "thursdaydifference[]": breaktime["thursday"],
            "fridaydifference[]": breaktime["friday"],
            "saturdaydifference[]": breaktime["saturday"],
            doctorID: datakey,
            defaultTime: "false",
        };

        axios.post("admin/editSchedule", data).then((response) => {
            if (response.data) {
                setTimeout(() => {
                    toast({
                        type: "success",
                        title: "Success",
                        description: (
                            <p>Dentist schedule successfully deleted</p>
                        ),
                        icon: "check",
                    });
                }, 1000);
                this.handleClose(datakey, firstname, lastname);
            }
        });
    };
    render() {
        let open;

        if (this.props.activeModal === "admin-delete-schedule") {
            open = true;
        } else {
            open = false;
        }

        let firstname;
        let lastname;
        let doctorID;
        let schedule = this.props.schedule;
        let breaktime = this.props.breaktime;
        let day;
        let sched_time;
        let add_time;
        if (this.props.data != null) {
            day = this.props.data.day;
            firstname = this.props.data.firstname;
            lastname = this.props.data.lastname;
            doctorID = this.props.data.doctorID;
            if (
                this.props.sched_time[this.props.data.index] != null &&
                this.props.sched_time[this.props.data.index]["time"][0] != null
            ) {
                sched_time = this.props.sched_time[this.props.data.index][
                    "time"
                ][0]["range"];
            }
            if (
                this.props.sched_time[this.props.data.index] != null &&
                this.props.sched_time[this.props.data.index]["time"][1] != null
            ) {
                add_time = this.props.sched_time[this.props.data.index][
                    "time"
                ][1]["range"];
            }
        }

        return (
            <Modal
                size="mini"
                id="remove-schedule-modal"
                onClose={() => this.handleClose(doctorID, firstname, lastname)}
                onOpen={() => this.handleOpen()}
                open={open}
            >
                <Icon
                    name="close"
                    onClick={() =>
                        this.handleClose(doctorID, firstname, lastname)
                    }
                    id="close-remove-schedule-modal"
                ></Icon>
                <Modal.Header as="h2">
                    <Icon name="trash"></Icon>
                    Remove Schedule
                </Modal.Header>

                <Modal.Content>
                    <span style={{ fontSize: 15 + "px", fontWeight: "bold" }}>
                        {day}
                        <br />
                    </span>
                    <span style={{ fontSize: 15 + "px", fontWeight: "bold" }}>
                        {sched_time}
                        <br />
                        {add_time}
                    </span>
                    <br />
                    <span style={{ fontSize: 15 + "px" }}>
                        Are you sure you want to delete this schedule?
                    </span>
                </Modal.Content>

                <Modal.Actions>
                    <Button
                        icon
                        labelPosition="left"
                        onClick={() =>
                            this.handleClose(doctorID, firstname, lastname)
                        }
                    >
                        <Icon name="cancel" />
                        CANCEL
                    </Button>
                    <Button
                        icon
                        labelPosition="left"
                        color="red"
                        id="remove-unavailable-button"
                        schedule={schedule}
                        breaktime={breaktime}
                        datakey={doctorID}
                        firstname={firstname}
                        lastname={lastname}
                        day={day}
                        onClick={this.handleDelete}
                    >
                        <Icon name="check" />
                        CONFIRM
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default AdminDeleteScheduleModal;
