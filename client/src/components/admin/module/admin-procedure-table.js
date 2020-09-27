import React from "react";
import { Table, Button } from "semantic-ui-react";

class AdminProcedureTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            procedures: [],
        };
    }

    handleShowDimmer = () => this.props.handleShowDimmer();

    handleHideDimmer = () => this.props.handleHideDimmer();

    handleModal(name, processname) {
        this.props.handleModal(name, processname);
    }

    render() {
        let { procedures } = this.props;

        return (
            <Table sortable singleLine selectable id="table">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center"></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {procedures.map(({ key, processname }) => (
                        <Table.Row key={key}>
                            <Table.Cell>{processname}</Table.Cell>
                            <Table.Cell textAlign="right">
                                <Button
                                    id={processname.toString()+"-edit"}
                                    onClick={() =>
                                        this.handleModal(
                                            "admin-edit-procedure",
                                            { key, processname }
                                        )
                                    }
                                >
                                    Edit
                                </Button>
                                <Button
                                    negative
                                    id={processname.toString()+"-delete"}
                                    onClick={() =>
                                        this.handleModal(
                                            "admin-delete-procedure",
                                            { key, processname }
                                        )
                                    }
                                >
                                    Delete
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        );
    }
}

export default AdminProcedureTable;
