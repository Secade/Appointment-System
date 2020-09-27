import React from "react";
import {
    Modal,
    Icon,
    Grid,
    Button,
    Segment,
    Table,
    Dimmer,
} from "semantic-ui-react";
class AdminViewScheduleModal extends React.Component {
    state = {
        activeTable: "weekly",
    };

    handleOpen = () => this.props.handleModal("admin-view-schedule");

    handleClose = () => {
        this.resetState();
        this.props.handleModal("none");
    };

    handleModal(name) {
        this.props.handleModal(name);
    }

    resetState() {
        this.setState({
            activeTable: "weekly",
        });
    }

    handleTable = () => {
        let { activeTable } = this.state;
        if (activeTable === "weekly") {
            this.setState({ activeTable: "unavailable" });
        } else {
            this.setState({ activeTable: "weekly" });
        }
    };

    render() {
        let open;

        if (this.props.activeModal === "admin-view-schedule") {
            open = true;
        } else {
            open = false;
        }

        let firstname;
        let lastname;
        let doctorID;
        if (
            this.props.data != null &&
            this.props.data.firstname != null &&
            this.props.data.lastname != null
        ) {
            doctorID = this.props.data.key;
            firstname = this.props.data.firstname;
            lastname = this.props.data.lastname;
        }
        const icon_styling = {
            marginRight: 13.5 + "px",
        };

        let schedule = this.props.schedule;
        let unavailable = this.props.unavailable;
        let schedule_table;
        let table_buttons;
        let add_button;
        let table_celled;
        if (this.state.activeTable == "weekly") {
            table_celled = true;
            table_buttons = (
                <>
                    <Button id="weekly" color="green">
                        Weekly Schedule
                    </Button>
                    <Button id="unavailable" onClick={this.handleTable}>
                        Unavailable Date
                    </Button>
                </>
            );
            add_button = (
                <Button
                    id="add-schedule"
                    color="green"
                    onClick={() => {
                        this.props.handleModal("admin-create-schedule");
                    }}
                >
                    Reset
                </Button>
            );
            if (schedule != null) {
                schedule_table = (
                    <>
                        {schedule.map(({ name, time }, index) => (
                            <Table.Row>
                                <Table.Cell
                                    style={{
                                        textAlign: "center",
                                        fontWeight: "bold",
                                        width: "46%",
                                    }}
                                >
                                    {name}
                                </Table.Cell>
                                <Table.Cell
                                    style={{
                                        textAlign: "center",
                                        width: "46%",
                                    }}
                                >
                                    {time.map(({ range }) => (
                                        <>
                                            {range} <br />
                                        </>
                                    ))}
                                </Table.Cell>
                                <Table.Cell
                                    textAlign="right"
                                    style={{ width: "8%" }}
                                >
                                    <Icon
                                        name="edit"
                                        id={name.toString() + "-edit"}
                                        size="large"
                                        onClick={()=>this.props.handleModal("admin-edit-schedule", {firstname, lastname, doctorID, name, index})}
                                    ></Icon>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </>
                );
            }
        } else {
            table_celled = false;
            add_button = (
                <Button
                    id="add-unavailable"
                    color="green"
                    onClick={() => {
                        this.props.handleModal("admin-add-unavailable");
                    }}
                >
                    Add
                </Button>
            );
            table_buttons = (
                <>
                    <Button id="weekly" onClick={this.handleTable}>
                        Weekly Schedule
                    </Button>
                    <Button id="unavailable" color="green">
                        Unavailable Date
                    </Button>
                </>
            );
            if (unavailable != null && unavailable.length >= 1) {
                schedule_table = (
                    <>
                        {unavailable.map(({ _id, time}, index) => (
                            <Table.Row>
                                <Table.Cell
                                    style={{
                                        fontWeight: "bold",
                                    }}
                                >
                                    {time}
                                </Table.Cell>
                                <Table.Cell textAlign="right">
                                    <Icon
                                        name="trash"
                                        id={"delete-unavailable-button-" + index}
                                        size="large"
                                        onClick={()=> {this.props.handleModal("admin-delete-unavailable", {doctorID, unavailableDateID: _id, time, firstname, lastname})}}
                                    ></Icon>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </>
                );
            }
        }

        return (
            <>
                <Modal
                    size="small"
                    id="schedule-modal"
                    onClose={() => this.handleClose()}
                    onOpen={() => this.handleOpen()}
                    open={open}
                >
                    <Icon
                        name="close"
                        onClick={this.handleClose}
                        id="close-schedule-modal"
                    ></Icon>
                    <Modal.Header as="h2">
                        <Icon name="calendar" />
                        Schedule
                    </Modal.Header>

                    <Modal.Content scrolling>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={13}>
                                    <Icon
                                        name="user md"
                                        size="big"
                                        style={icon_styling}
                                    />
                                    <span
                                        id="doctor-name-schedule"
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: 20 + "px",
                                        }}
                                    >
                                        {firstname}&nbsp;
                                        {lastname}
                                    </span>
                                </Grid.Column>
                                <Grid.Column width={3} textAlign="right">
                                    {add_button}
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row centered={true}>{table_buttons}</Grid.Row>
                            <Table
                                celled={table_celled}
                                striped
                                selectable
                                id="schedule-table"
                            >
                                <Table.Body id="table-schedule">
                                    {schedule_table}
                                </Table.Body>
                            </Table>
                            <Dimmer
                                active={this.props.activeDimmer}
                                inverted
                                id="table-dimmer"
                            >
                                <div className="ui elastic huge green loader"></div>
                            </Dimmer>
                            {unavailable.length <= 0 &&
                                this.state.activeTable == "unavailable" && (
                                    <Grid.Row centered>
                                        <span>No unavailable dates yet</span>
                                    </Grid.Row>
                                )}
                        </Grid>
                    </Modal.Content>
                    <Modal.Actions></Modal.Actions>
                </Modal>
            </>
        );
    }
}

export default AdminViewScheduleModal;
