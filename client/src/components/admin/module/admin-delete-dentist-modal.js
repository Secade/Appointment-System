import React from "react";
import axios from "axios";
import { Modal, Icon, Button } from "semantic-ui-react";
import { toast } from "react-semantic-toasts";

class AdminDeleteDentistModal extends React.Component {
    handleOpen = () => this.props.handleModal("admin-delete-dentist");

    handleClose = () => this.props.handleModal("none");

    handleUpdateTable = () => this.props.handleUpdateTable();

    handleDelete = (event, { datakey }) => {
        event.preventDefault();
        const data = {
            doctorID: datakey,
        };
        axios.post("admin/deleteAccount", data).then((res) => {
            this.handleClose();
            setTimeout(() => {
                toast({
                    type: "success",
                    title: "Success",
                    description: <p>User successfully deleted</p>,
                    icon: "check",
                });
            }, 1000);
            this.handleUpdateTable();
        });
    };

    render() {
        let open;

        if (this.props.activeModal === "admin-delete-dentist") {
            open = true;
        } else {
            open = false;
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
            <Modal
                size="mini"
                id="delete-dentist-modal"
                onClose={() => this.handleClose()}
                onOpen={() => this.handleOpen()}
                open={open}
            >
                <Icon
                    name="close"
                    onClick={this.handleClose}
                    id="close-delete-dentist-modal"
                ></Icon>
                <Modal.Header as="h2">
                    <Icon name="trash"></Icon>
                    Delete Dentist
                </Modal.Header>

                <Modal.Content>
                    <span style={{ fontSize: 15 + "px" }}>
                        Are you sure you want to delete
                    </span>
                    &nbsp;
                    <span
                        id="modal-text-delete-user"
                        style={{ fontSize: 15 + "px", fontWeight: "bold" }}
                    >
                        {lastname}, {firstname}
                    </span>
                    <span style={{ fontSize: 15 + "px" }}>?</span>
                    <br />
                    <br />
                    <div style={{ display: "flex" }} id="warning">
                        <Icon name="info" style={{ color: "red" }}></Icon>
                        <span style={{ color: "red", fontSize: 13 + "px" }}>
                            All appointments by this dentist will be deleted.
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
                        id="delete-dentist-button"
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

export default AdminDeleteDentistModal;
