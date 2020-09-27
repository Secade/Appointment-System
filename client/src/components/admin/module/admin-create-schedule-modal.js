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

class AdminCreateScheduleModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start: null,
            end: null,
            start_add: null,
            end_add: null,
            daily: false,
            repeat: false,
            custom: false,
            days: {
                mon: false,
                tue: false,
                wed: false,
                thu: false,
                fri: false,
                sat: false,
            },
            disabled: [],
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
            daily: false,
            repeat: false,
            custom: false,
            days: {
                mon: false,
                tue: false,
                wed: false,
                thu: false,
                fri: false,
                sat: false,
            },
            disabled: [],
            error: {
                start: false,
                end: false,
                start_add: false,
                end_add: false,
            },
        });
    }

    handleSubmit = (event, { datakey, firstname, lastname }) => {
        event.preventDefault();
        if (this.handleValidation()) {
            let days = this.state.days;
            let day_array = {
                mon: [],
                tue: [],
                wed: [],
                thu: [],
                fri: [],
                sat: [],
            };
            let break_array = {
                mon: [],
                tue: [],
                wed: [],
                thu: [],
                fri: [],
                sat: [],
            };

            let start = moment(this.state.start).format("k:mm");
            let end = moment(this.state.end).format("k:mm");
            let start_add;
            let end_add;
            if (this.state.start_add != null) {
                start_add = moment(this.state.start_add).format("k:mm");
            }
            if (this.state.end_add != null) {
                end_add = moment(this.state.end_add).format("k:mm");
            }

            for (var day in days) {
                if (this.state.daily && this.state.custom) {
                    day_array[day].push(start);
                    day_array[day].push(end_add);
                    break_array[day].push(end);
                    break_array[day].push(start_add);
                } else if (this.state.daily) {
                    day_array[day].push(start);
                    day_array[day].push(end);
                } else if (this.state.repeat) {
                    if (days[day]) {
                        if (this.state.custom) {
                            day_array[day].push(start);
                            day_array[day].push(end_add);
                            break_array[day].push(end);
                            break_array[day].push(start_add);
                        } else {
                            day_array[day].push(start);
                            day_array[day].push(end);
                        }
                    }
                }
            }
            const data = {
                "monday[]": day_array["mon"],
                "tuesday[]": day_array["tue"],
                "wednesday[]": day_array["wed"],
                "thursday[]": day_array["thu"],
                "friday[]": day_array["fri"],
                "saturday[]": day_array["sat"],
                "mondaydifference[]": break_array["mon"],
                "tuesdaydifference[]": break_array["tue"],
                "wednesdaydifference[]": break_array["wed"],
                "thursdaydifference[]": break_array["thu"],
                "fridaydifference[]": break_array["fri"],
                "saturdaydifference[]": break_array["sat"],
                doctorID: datakey,
                defaultTime: "false",
            };

            axios.post("admin/addSchedule", data).then((response) => {
                if (response.data) {
                    setTimeout(() => {
                        toast({
                            type: "success",
                            title: "Success",
                            description: (
                                <p>Dentist schedule successfully added</p>
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
        let {
            daily,
            custom,
            repeat,
            days,
            start,
            end,
            start_add,
            end_add,
        } = this.state;
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

        if (!(daily || repeat)) {
            toast({
                type: "error",
                title: "Error",
                description: <p>Please choose an occurence</p>,
                icon: "cancel",
            });
            formIsValid = false;
        }

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

        if (repeat) {
            let check = false;
            for (var day in days) {
                if (days[day]) {
                    check = true;
                }
            }
            if (!check) {
                toast({
                    type: "error",
                    title: "Error",
                    description: (
                        <p>Please choose a specific day of recurrence</p>
                    ),
                    icon: "cancel",
                });
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

    handleOpen = () => this.props.handleModal("admin-create-schedule");

    handleClose(datakey, firstname, lastname) {
        this.props.handleModal("admin-view-schedule", {
            key: datakey,
            firstname,
            lastname,
        });
        this.props.handleUpdateScheduleTable(datakey);
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

    handleRepeat = () => {
        let disabled = this.state.disabled;
        disabled["daily"] = !this.state.disabled["daily"];
        this.setState((prevState) => ({
            repeat: !prevState.repeat,
            disabled: disabled,
        }));
    };

    handleDaily = () => {
        let disabled = this.state.disabled;
        disabled["repeat"] = !this.state.disabled["repeat"];
        this.setState((prevState) => ({
            daily: !prevState.daily,
            disabled: disabled,
        }));
    };

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

        if (this.props.activeModal === "admin-create-schedule") {
            open = true;
        } else {
            open = false;
        }

        const column_style = {
            textAlign: "center",
        };

        const checkbox_style = {
            margin: "20px 0 0 0",
        };

        let first_session_style = {
            fontWeight: "bold",
            color: "white",
        };
        let second_schedule;
        let repeat_buttons;
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
                                id="start-add"
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
                                        name="end-add"
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
        if (this.state.repeat) {
            repeat_buttons = (
                <>
                    <Grid
                        centered
                        columns={1}
                        style={{
                            fontWeight: "bold",
                            padding: "0 0 10px 0",
                        }}
                    >
                        Repeat on
                    </Grid>
                    <Grid centered columns={6}>
                        <Button
                            circular
                            toggle
                            active={this.state.days.mon}
                            name="mon"
                            id="mon"
                            onClick={this.handleDays}
                        >
                            M
                        </Button>
                        <Button
                            circular
                            toggle
                            active={this.state.days.tue}
                            name="tue"
                            id="tue"
                            onClick={this.handleDays}
                        >
                            T
                        </Button>
                        <Button
                            circular
                            toggle
                            active={this.state.days.wed}
                            name="wed"
                            id="wed"
                            onClick={this.handleDays}
                        >
                            W
                        </Button>
                        <Button
                            circular
                            toggle
                            active={this.state.days.thu}
                            name="thu"
                            id="thu"
                            onClick={this.handleDays}
                        >
                            H
                        </Button>
                        <Button
                            circular
                            toggle
                            active={this.state.days.fri}
                            name="fri"
                            id="fri"
                            onClick={this.handleDays}
                        >
                            F
                        </Button>
                        <Button
                            circular
                            toggle
                            active={this.state.days.sat}
                            name="sat"
                            id="sat"
                            onClick={this.handleDays}
                        >
                            S
                        </Button>
                    </Grid>
                </>
            );
        }

        let firstname;
        let lastname;
        let key;
        if (
            this.props.data != null &&
            this.props.data.firstname != null &&
            this.props.data.lastname != null
        ) {
            key = this.props.data.key;
            firstname = this.props.data.firstname;
            lastname = this.props.data.lastname;
        }

        return (
            <>
                <Modal
                    size="small"
                    id="adding-schedule-modal"
                    onClose={() => this.handleClose(key, firstname, lastname)}
                    onOpen={() => this.handleOpen()}
                    open={open}
                >
                    <Icon
                        name="close"
                        onClick={() =>
                            this.handleClose(key, firstname, lastname)
                        }
                        id="close-adding-schedule-modal"
                    ></Icon>
                    <Modal.Header as="h2">
                        <Icon name="calendar" />
                        Set Schedule
                    </Modal.Header>

                    <Modal.Content>
                        <Grid centered columns={1}>
                            <Grid.Column style={column_style}>
                                <Grid.Row>
                                    <Icon size="huge" name="user md"></Icon>
                                </Grid.Row>
                                <Grid.Row>
                                    <span
                                        id="doctor-name"
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: 25 + "px",
                                        }}
                                    >
                                        {firstname} {lastname}
                                    </span>
                                </Grid.Row>
                            </Grid.Column>
                        </Grid>

                        <Divider horizontal> Customize Your Schedule</Divider>
                        <Grid centered columns={2}>
                            <Checkbox
                                disabled={this.state.disabled.daily}
                                style={checkbox_style}
                                label={(checked) => (
                                    <label
                                        id="daily"
                                        htmlFor="daily"
                                        checked={checked}
                                    >
                                        Repeat Daily
                                    </label>
                                )}
                                name="daily"
                                onChange={this.handleDaily}
                                checked={this.state.daily}
                            ></Checkbox>
                            <Checkbox
                                disabled={this.state.disabled.repeat}
                                style={checkbox_style}
                                label={(checked) => (
                                    <label
                                        id="repeat"
                                        htmlFor="repeat"
                                        checked={checked}
                                    >
                                        Customized Recurrence
                                    </label>
                                )}
                                name="repeat"
                                onChange={this.handleRepeat}
                                checked={this.state.repeat}
                            ></Checkbox>
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
                                    id="start"
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
                                    id="end"
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
                        {repeat_buttons}
                    </Modal.Content>

                    <Modal.Actions>
                        <Button
                            icon
                            labelPosition="left"
                            color="green"
                            id="add-schedule-button"
                            onClick={this.handleSubmit}
                            datakey={key}
                            firstname={firstname}
                            lastname={lastname}
                        >
                            <Icon name="check" />
                            FINISH
                        </Button>
                    </Modal.Actions>
                </Modal>
            </>
        );
    }
}

export default AdminCreateScheduleModal;
