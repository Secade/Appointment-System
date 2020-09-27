import React from "react";
import axios from "axios";
import { Modal, Icon, Button } from "semantic-ui-react";
import { toast } from "react-semantic-toasts";

class AdminDeleteProcedureModal extends React.Component {
    handleOpen = () => this.props.handleModal("admin-delete-procedure");

    handleClose = () => this.props.handleModal("none");

    handleUpdateTable = () => this.props.handleUpdateTable();

    handleDelete = (event, { datakey }) => {
        event.preventDefault();
        const data = {
            procedureID: datakey,
        };
        axios.post("admin/deleteProcess", data).then((res) => {
            this.handleClose();
            toast({
                type: "success",
                title: "Success",
                description: <p>Procedure successfully deleted</p>,
                icon: "check",
            });
            this.handleUpdateTable();
        });
    };

    render() {
        let open;

        if (this.props.activeModal === "admin-delete-procedure") {
            open = true;
        } else {
            open = false;
        }

        let procedurename;
        let key;
        if (this.props.data != null && this.props.data.processname != null) {
            procedurename = Object.values(this.props.data.processname);
            key = this.props.data.key;
        }

        return (
            <Modal
                size="mini"
                id="delete-procedure-modal"
                onClose={() => this.handleClose()}
                onOpen={() => this.handleOpen()}
                open={open}
            >
                <Icon
                    name="close"
                    onClick={this.handleClose}
                    id="close-delete-procedure-modal"
                ></Icon>
                <Modal.Header as="h2">
                    <Icon name="trash"></Icon>
                    Delete Procedure
                </Modal.Header>

                <Modal.Content>
                    <span style={{ fontSize: 15 + "px" }}>
                        Are you sure you want to delete
                    </span>
                    &nbsp;
                    <span
                        id="modal-text-delete-procedure"
                        style={{ fontSize: 15 + "px", fontWeight: "bold" }}
                    >
                        {procedurename}
                    </span>
                    <span style={{ fontSize: 15 + "px" }}>?</span>
                    <br />
                    <br />
                    <div style={{ display: "flex" }} id="warning">
                        <Icon name="info" style={{ color: "red" }}></Icon>
                        <span style={{ color: "red", fontSize: 13 + "px" }}>
                            All appointments with this procedure will be
                            deleted.
                        </span>
                    </div>
                </Modal.Content>

                <Modal.Actions>
                    <Button
                        datakey={key}
                        icon
                        labelPosition="left"
                        onClick={this.handleClose}
                    >
                        <Icon name="cancel" />
                        CANCEL
                    </Button>
                    <Button
                        datakey={key}
                        icon
                        labelPosition="left"
                        color="red"
                        id="delete-procedure-button"
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

export default AdminDeleteProcedureModal;
