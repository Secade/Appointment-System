import React from "react";
import { Modal, Icon, Grid, Button, Input } from "semantic-ui-react";
import DatePicker from "react-datepicker";
import moment from "moment";
import axios from "axios";
import { toast } from "react-semantic-toasts";

class AdminAddUnavailableModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start: null,
            end: null,
            error: {
                start: false,
                end: false,
            },
        };
    }

    resetState() {
        this.setState({
            start: null,
            end: null,
            error: {
                start: false,
                end: false,
            },
        });
    }

    handleSubmit = (event, { datakey }) => {
        event.preventDefault();
        let { start, end } = this.state;
        let error = {
            start: false,
            end: false,
        };
        let empty_date = false;
        let invalid_date = false;
        let formIsValid = true;
        if (start === null) {
            error["start"] = true;
            empty_date = true;
            formIsValid = false;
        } else if (start <= new Date()) {
            error["start"] = true;
            invalid_date = true;
            formIsValid = false;
        }
        if (end === null) {
            error["end"] = true;
            empty_date = true;
            formIsValid = false;
        } else if (end <= new Date()) {
            error["end"] = true;
            invalid_date = true;
            formIsValid = false;
        }
        if (start != null && end != null && !(start <= end)) {
            error["start"] = true;
            error["end"] = true;
            toast({
                type: "error",
                title: "Error",
                description: <p>Invalid date interval</p>,
                icon: "cancel",
            });
            formIsValid = false;
        }
        if (empty_date) {
            toast({
                type: "error",
                title: "Error",
                description: <p>Please input a valid date</p>,
                icon: "cancel",
            });
        }

        if (invalid_date) {
            toast({
                type: "error",
                title: "Error",
                description: <p>Invalid date</p>,
                icon: "cancel",
            });
        }

        this.setState({ error: error });

        if (formIsValid) {
            start = moment(start).format("MMMM D, yyyy");
            end = moment(end).format("MMMM D, yyyy");
            let data = {
                doctorID: datakey,
                startDate: start,
                endDate: end,
            };
            axios.post("admin/doctorHasAppointment", data).then((response) => {
                if (response.data === true) {
                    error["start"] = true;
                    error["end"] = true;
                    toast({
                        type: "error",
                        title: "Error",
                        description: <p>The chosen date has appointment/s</p>,
                        icon: "cancel",
                    });
                } else {
                    axios
                        .post("admin/addUnavailableDates", data)
                        .then((response) => {
                            if (response.data === true) {
                                this.handleClose(datakey);
                                toast({
                                    type: "success",
                                    title: "Success",
                                    description: (
                                        <p>
                                            Unavailable dates successfully added
                                        </p>
                                    ),
                                    icon: "check",
                                });
                            }
                        });
                }
            });
        }
    };

    handleOpen = () => this.props.handleModal("admin-add-unavailable");

    handleClose(datakey) {
        this.props.handleModal("admin-view-schedule");
        this.props.handleUpdateTable(datakey);
        this.resetState();
    }

    handleModal(name) {
        this.props.handleModal(name);
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    handleStart(day) {
        this.setState({ start: day });
    }

    handleEnd(day) {
        this.setState({ end: day });
    }

    render() {
        let open;

        if (this.props.activeModal === "admin-add-unavailable") {
            open = true;
        } else {
            open = false;
        }

        var minDate = new Date();
        minDate.setDate(new Date().getDate() + 1);

        let key;
        if (this.props.data != null) {
            key = this.props.data.key;
        }

        return (
            <>
                <Modal
                    size="tiny"
                    id="add-unavailable-modal"
                    onClose={() => this.handleClose(key)}
                    onOpen={() => this.handleOpen()}
                    open={open}
                >
                    <Icon
                        name="close"
                        onClick={() => this.handleClose(key)}
                        id="close-add-unavailable-modal"
                    ></Icon>
                    <Modal.Header as="h2">
                        <Icon name="calendar" />
                        Add Unavailable Date
                    </Modal.Header>

                    <Modal.Content>
                        <Grid columns={3}>
                            <Grid.Row>
                                <Grid.Column floated="left">
                                    <DatePicker
                                        placeholderText="Start Date"
                                        required
                                        selected={this.state.start}
                                        dateFormat="MMMM d, yyyy"
                                        minDate={minDate}
                                        onChange={(date) =>
                                            this.handleStart(date)
                                        }
                                        id="start-date-input"
                                        customInput={
                                            <Input
                                                icon="calendar"
                                                iconPosition="left"
                                                placeholder="Start Date"
                                                autoComplete="false"
                                                name="start"
                                                required
                                                error={this.state.error.start}
                                            ></Input>
                                        }
                                    ></DatePicker>
                                </Grid.Column>
                                <span
                                    style={{
                                        margin: "10px 0 0 0",
                                        fontWeight: "bold",
                                    }}
                                >
                                    to
                                </span>
                                <Grid.Column floated="left">
                                    <DatePicker
                                        placeholderText="End Date"
                                        required
                                        selected={this.state.end}
                                        dateFormat="MMMM d, yyyy"
                                        minDate={minDate}
                                        onChange={(date) =>
                                            this.handleEnd(date)
                                        }
                                        id="end-date-input"
                                        customInput={
                                            <Input
                                                icon="calendar"
                                                iconPosition="left"
                                                placeholder="End Date"
                                                autoComplete="false"
                                                name="end"
                                                required
                                                error={this.state.error.start}
                                            ></Input>
                                        }
                                    ></DatePicker>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Modal.Content>

                    <Modal.Actions>
                        <Button
                            icon
                            labelPosition="left"
                            color="green"
                            id="add-unavailable-button"
                            onClick={this.handleSubmit}
                            datakey={key}
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

export default AdminAddUnavailableModal;
