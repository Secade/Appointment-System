import React from "react";
import {
    Modal,
    Icon,
    Grid,
    Button,
    Segment,
    Divider,
    Checkbox,
    Header,
    Input,
} from "semantic-ui-react";
import DatePicker from "react-datepicker";
import moment from "moment";
import axios from "axios";
import { toast } from "react-semantic-toasts";

class AdminEditScheduleModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start: null,
            end: null,
            start_add: null,
            end_add: null,
            custom: false,
            error: {
                start: false,
                end: false,
                start_add: false,
                end_add: false,
            },
        };
    }

    resetState() {
        this.setState({
            start: null,
            end: null,
            start_add: null,
            end_add: null,
            custom: false,
            error: {
                start: false,
                end: false,
                start_add: false,
                end_add: false,
            },
        });
    }

    handleSubmit = (
        event,
        { datakey, firstname, lastname, day, schedule, breaktime }
    ) => {
        event.preventDefault();
        if (this.handleValidation()) {
            let custom = this.state.custom;
            let start = moment(this.state.start).format("k:mm");
            let end = moment(this.state.end).format("k:mm");
            let start_add;
            let end_add;
            day = day.toLowerCase();
            if (this.state.start_add != null) {
                start_add = moment(this.state.start_add).format("k:mm");
            }
            if (this.state.end_add != null) {
                end_add = moment(this.state.end_add).format("k:mm");
            }

            if (!custom) {
                schedule[day][0] = start;
                schedule[day][1] = end;
                breaktime[day] = [];
            } else {
                schedule[day][0] = start;
                breaktime[day][0] = end;
                breaktime[day][1] = start_add;
                schedule[day][1] = end_add;
            }

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
                                <p>Dentist schedule successfully edited</p>
                            ),
                            icon: "check",
                        });
                    }, 1000);
                    this.handleClose(datakey, firstname, lastname);
                }
            });
        }
    };

    handleValidation() {
        let { custom, start, end, start_add, end_add } = this.state;
        let formIsValid = true;
        let error = {
            start: false,
            end: false,
            start_add: false,
            end_add: false,
        };
        let empty_time = false;
        let too_short = false;
        let invalid_time_interval = false;
        let invalid_time = false;

        if (start === null) {
            error["start"] = true;
            empty_time = true;
            formIsValid = false;
        } else if (!(start.getMinutes() == 30 || start.getMinutes() == 0)) {
            error["start"] = true;
            invalid_time = true;
            formIsValid = false;
        }

        if (end === null) {
            error["end"] = true;
            empty_time = true;
            formIsValid = false;
        } else if (!(end.getMinutes() == 30 || end.getMinutes() == 0)) {
            error["end"] = true;
            invalid_time = true;
            formIsValid = false;
        }
        if (start != null && end != null && start === end) {
            error["start"] = true;
            error["end"] = true;
            too_short = true;
            formIsValid = false;
        } else if (start != null && end != null && !(start < end)) {
            error["start"] = true;
            error["end"] = true;
            invalid_time_interval = true;
            formIsValid = false;
        }

        if (custom) {
            if (start_add === null) {
                error["start_add"] = true;
                empty_time = true;
                formIsValid = false;
            } else if (
                !(start_add.getMinutes() == 30 || start_add.getMinutes() == 0)
            ) {
                error["start_add"] = true;
                invalid_time = true;
                formIsValid = false;
            }
            if (end_add === null) {
                error["end_add"] = true;
                empty_time = true;
                formIsValid = false;
            } else if (
                !(end_add.getMinutes() == 30 || end_add.getMinutes() == 0)
            ) {
                error["end_add"] = true;
                invalid_time = true;
                formIsValid = false;
            }
            if (
                start_add != null &&
                end_add != null &&
                (start_add === end_add || end === start_add)
            ) {
                error["start_add"] = true;
                error["end_add"] = true;
                too_short = true;
                formIsValid = false;
            } else if (
                start_add != null &&
                end_add != null &&
                !(start_add < end_add && end < start_add)
            ) {
                error["start"] = true;
                error["end"] = true;
                error["start_add"] = true;
                error["end_add"] = true;
                invalid_time_interval = true;
                formIsValid = false;
            }
        }

        if (empty_time) {
            toast({
                type: "error",
                title: "Error",
                description: <p>Please input a valid time</p>,
                icon: "cancel",
            });
        }

        if (too_short) {
            toast({
                type: "error",
                title: "Error",
                description: <p>Time interval is too short</p>,
                icon: "cancel",
            });
        }

        if (invalid_time_interval) {
            toast({
                type: "error",
                title: "Error",
                description: <p>Invalid time interval</p>,
                icon: "cancel",
            });
        }

        if (invalid_time) {
            toast({
                type: "error",
                title: "Error",
                description: <p>Invalid time</p>,
                icon: "cancel",
            });
        }

        this.setState({ error: error });

        return formIsValid;
    }

    handleOpen = () => this.props.handleModal("admin-edit-schedule");

    handleClose(doctorID, firstname, lastname) {
        this.props.handleModal("admin-view-schedule", {
            key: doctorID,
            firstname,
            lastname,
        });
        this.props.handleUpdateTable(doctorID);
        this.resetState();
    }

    handleModal(name) {
        this.props.handleModal(name);
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    handleStartAdd(time) {
        this.setState({ start_add: time });
    }

    handleEndAdd(time) {
        this.setState({ end_add: time });
    }

    handleStart(time) {
        this.setState({ start: time });
    }

    handleEnd(time) {
        this.setState({ end: time });
    }

    handleCustom = () => {
        this.setState((prevState) => ({ custom: !prevState.custom }));
    };

    handleDays = (e, { name }) => {
        let days = this.state.days;
        let active = true;
        if (e.target.classList.contains("active")) {
            active = false;
        }
        days[name] = active;
        this.setState({ days: days });
    };

    render() {
        let open;

        if (this.props.activeModal === "admin-edit-schedule") {
            open = true;
        } else {
            open = false;
        }

        const column_style = {
            textAlign: "center",
        };

        const checkbox_style = {
            margin: "20px 0 20px 0",
        };

        let first_session_style = {
            fontWeight: "bold",
            color: "white",
        };
        let second_schedule;
        var minTime = new Date();
        var maxTime = new Date();
        minTime.setHours(8);
        minTime.setMinutes(0);
        maxTime.setHours(18);
        maxTime.setMinutes(0);

        if (this.state.custom) {
            second_schedule = (
                <>
                    <Grid centered columns={3}>
                        <Grid.Row style={{ padding: "0" }}>
                            <span
                                style={{ fontWeight: "bold" }}
                                id="second-schedule"
                            >
                                Second Session
                            </span>
                        </Grid.Row>
                        <Grid.Column>
                            <DatePicker
                                placeholderText="Start Time"
                                required
                                showTimeSelect
                                showTimeSelectOnly
                                selected={this.state.start_add}
                                timeIntervals={30}
                                dateFormat="H:mm"
                                minTime={minTime}
                                maxTime={maxTime}
                                onChange={(time) => this.handleStartAdd(time)}
                                id="edit-start-add"
                                customInput={
                                    <Input
                                        icon="time"
                                        iconPosition="left"
                                        placeholder="Start Time"
                                        autoComplete="false"
                                        name="start-add"
                                        required
                                        error={this.state.error.start_add}
                                    ></Input>
                                }
                            ></DatePicker>
                        </Grid.Column>
                        <Segment
                            basic
                            style={{
                                margin: "6px 0 0 0",
                                fontWeight: "bold",
                            }}
                        >
                            to
                        </Segment>
                        <Grid.Column>
                            <DatePicker
                                placeholderText="End Time"
                                required
                                showTimeSelect
                                showTimeSelectOnly
                                selected={this.state.end_add}
                                timeIntervals={30}
                                dateFormat="H:mm"
                                minTime={minTime}
                                maxTime={maxTime}
                                onChange={(time) => this.handleEndAdd(time)}
                                id="end-add"
                                customInput={
                                    <Input
                                        icon="time"
                                        iconPosition="left"
                                        placeholder="End Time"
                                        autoComplete="false"
                                        name="edit-end-add"
                                        required
                                        error={this.state.error.end_add}
                                    ></Input>
                                }
                            ></DatePicker>
                        </Grid.Column>
                    </Grid>
                </>
            );
            first_session_style = {
                fontWeight: "bold",
            };
        }

        let firstname;
        let lastname;
        let doctorID;
        let day;
        let schedule = this.props.schedule;
        let breaktime = this.props.breaktime;
        let index;
        if (
            this.props.data != null &&
            this.props.data.firstname != null &&
            this.props.data.lastname != null
        ) {
            firstname = this.props.data.firstname;
            lastname = this.props.data.lastname;
            doctorID = this.props.data.doctorID;
            day = this.props.data.name;
            index = this.props.data.index;
        }

        return (
            <>
                <Modal
                    size="small"
                    id="editing-schedule-modal"
                    onClose={() =>
                        this.handleClose(doctorID, firstname, lastname)
                    }
                    onOpen={() => this.handleOpen()}
                    open={open}
                >
                    <Icon
                        name="close"
                        onClick={() =>
                            this.handleClose(doctorID, firstname, lastname)
                        }
                        id="close-editing-schedule-modal"
                    ></Icon>
                    <Modal.Header as="h2">
                        <Icon name="edit" />
                        Edit Schedule
                    </Modal.Header>

                    <Modal.Content>
                        <Grid centered columns={1}>
                            <Grid.Column
                                style={{
                                    textAlign: "center",
                                    margin: "15px 0 0 0",
                                }}
                            >
                                <Grid.Row>
                                    <Header as="h3">Working Hours</Header>
                                </Grid.Row>
                            </Grid.Column>
                        </Grid>
                        <Grid centered columns={1}>
                            <Checkbox
                                style={checkbox_style}
                                label={(checked) => (
                                    <label
                                        id="custom"
                                        htmlFor="custom"
                                        checked={checked}
                                    >
                                        Customized Working Hours
                                    </label>
                                )}
                                name="custom"
                                onChange={this.handleCustom}
                                checked={this.state.custom}
                            ></Checkbox>
                        </Grid>

                        <Grid centered columns={3}>
                            <Grid.Row style={{ padding: "0" }}>
                                <span
                                    style={first_session_style}
                                    id="first-schedule"
                                >
                                    First Session
                                </span>
                            </Grid.Row>
                            <Grid.Column>
                                <DatePicker
                                    placeholderText="Start Time"
                                    required
                                    showTimeSelect
                                    showTimeSelectOnly
                                    selected={this.state.start}
                                    timeIntervals={30}
                                    dateFormat="H:mm"
                                    minTime={minTime}
                                    maxTime={maxTime}
                                    onChange={(time) => this.handleStart(time)}
                                    id="edit-start"
                                    customInput={
                                        <Input
                                            icon="time"
                                            iconPosition="left"
                                            placeholder="Start Time"
                                            autoComplete="false"
                                            name="start"
                                            required
                                            error={this.state.error.start}
                                        ></Input>
                                    }
                                ></DatePicker>
                            </Grid.Column>
                            <Segment
                                basic
                                style={{
                                    margin: "6px 0 0 0",
                                    fontWeight: "bold",
                                }}
                            >
                                to
                            </Segment>
                            <Grid.Column>
                                <DatePicker
                                    placeholderText="End Time"
                                    required
                                    showTimeSelect
                                    showTimeSelectOnly
                                    selected={this.state.end}
                                    timeIntervals={30}
                                    dateFormat="H:mm"
                                    minTime={minTime}
                                    maxTime={maxTime}
                                    onChange={(time) => this.handleEnd(time)}
                                    id="edit-end"
                                    customInput={
                                        <Input
                                            icon="time"
                                            iconPosition="left"
                                            placeholder="End Time"
                                            autoComplete="false"
                                            name="end"
                                            required
                                            error={this.state.error.end}
                                        ></Input>
                                    }
                                ></DatePicker>
                            </Grid.Column>
                        </Grid>
                        {second_schedule}
                    </Modal.Content>

                    <Modal.Actions>
                        <Button
                            icon
                            labelPosition="left"
                            color="green"
                            id="save-changes-schedule"
                            onClick={this.handleSubmit}
                            datakey={doctorID}
                            firstname={firstname}
                            lastname={lastname}
                            day={day}
                            schedule={schedule}
                            breaktime={breaktime}
                        >
                            <Icon name="check" />
                            SAVE CHANGES
                        </Button>
                        {day != undefined && schedule[day.toLowerCase()][0] !== undefined && (
                            <Icon
                                name="trash"
                                id="save-changes-schedule"
                                size="big"
                                style={{ margin: "0 3.5px 0 3.5px" }}
                                onClick={() => {
                                    this.resetState();
                                    this.props.handleModal(
                                        "admin-delete-schedule",
                                        {
                                            day,
                                            firstname,
                                            lastname,
                                            doctorID,
                                            index,
                                        }
                                    );
                                }}
                            ></Icon>
                        )}
                    </Modal.Actions>
                </Modal>
            </>
        );
    }
}

export default AdminEditScheduleModal;
