import React from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import axios from "axios";

class AdminDentistTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dentists: [],
        };
    }

    handleShowDimmer = () => this.props.handleShowDimmer();
    handleHideDimmer = () => this.props.handleHideDimmer();

    handleModal(name, processname) {
        this.props.handleModal(name, processname);
    }

    handleUpdateTable = () => this.props.handleUpdateTable();

    handleStatus = (e, { datakey, status }) => {
        let data;

        if (status === "Active") {
            data = {
                doctorID: datakey,
                status: "Inactive",
            };
        } else {
            data = {
                doctorID: datakey,
                status: "Active",
            };
        }
        axios.post("admin/updateDentistStatus", data).then((response) => {
            this.handleUpdateTable();
        });
    };

    render() {
        let { dentists } = this.props;
        return (
            <Table sortable singleLine selectable id="table">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Login</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">
                            Status
                        </Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">
                            Schedule
                        </Table.HeaderCell>
                        <Table.HeaderCell textAlign="right"></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {dentists.map(
                        ({
                            key,
                            firstname,
                            lastname,
                            status,
                            lastLogin,
                            username,
                        }) => (
                            <Table.Row key={key}>
                                <Table.Cell>{firstname}</Table.Cell>
                                <Table.Cell>{lastname}</Table.Cell>
                                <Table.Cell>{lastLogin}</Table.Cell>
                                <Table.Cell textAlign="center">
                                    {status === "Active" && (
                                        <Button
                                            color="green"
                                            datakey={key}
                                            status={status}
                                            onClick={this.handleStatus}
                                            id={
                                                firstname.toString() +
                                                "-" +
                                                lastname.toString() +
                                                "-active"
                                            }
                                        >
                                            Active
                                        </Button>
                                    )}
                                    {status === "Inactive" && (
                                        <Button
                                            datakey={key}
                                            status={status}
                                            onClick={this.handleStatus}
                                            id={
                                                firstname.toString() +
                                                "-" +
                                                lastname.toString() +
                                                "-active"
                                            }
                                        >
                                            Inactive
                                        </Button>
                                    )}
                                </Table.Cell>
                                <Table.Cell textAlign="center">
                                    <Button
                                        color="green"
                                        id={
                                            firstname.toString() +
                                            "-" +
                                            lastname.toString() +
                                            "-view"
                                        }
                                        onClick={() => {
                                            this.props.handleUpdateScheduleTable(
                                                key
                                            );
                                            this.props.handleUpdateUnavailableTable(
                                                key
                                            );
                                            this.handleModal(
                                                "admin-view-schedule",
                                                { key, firstname, lastname }
                                            );
                                        }}
                                    >
                                        View
                                    </Button>
                                </Table.Cell>
                                <Table.Cell textAlign="right">
                                    <Icon
                                        name="edit"
                                        id={
                                            firstname.toString() +
                                            "-" +
                                            lastname.toString() +
                                            "-edit"
                                        }
                                        size="large"
                                        onClick={() => {
                                            this.props.handleUpdateModalUsername(
                                                key
                                            );
                                            this.handleModal(
                                                "admin-edit-dentist",
                                                { key, firstname, lastname }
                                            );
                                        }}
                                    ></Icon>
                                    <Icon
                                        name="trash"
                                        id={
                                            firstname.toString() +
                                            "-" +
                                            lastname.toString() +
                                            "-delete"
                                        }
                                        size="large"
                                        onClick={() =>
                                            this.handleModal(
                                                "admin-delete-dentist",
                                                { key, firstname, lastname }
                                            )
                                        }
                                    ></Icon>
                                </Table.Cell>
                            </Table.Row>
                        )
                    )}
                </Table.Body>
            </Table>
        );
    }
}

export default AdminDentistTable;
