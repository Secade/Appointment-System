import React from "react";
import axios from "axios";
import { Modal, Icon, Button } from "semantic-ui-react";
import { toast } from "react-semantic-toasts";
import { faRubleSign } from "@fortawesome/free-solid-svg-icons";

class AdminDeleteUnavailableModal extends React.Component {
    constructor(props) {
        super(props);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleOpen = () => this.props.handleModal("admin-delete-unavailable");


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
        { unavailabledateid, doctorid, firstname, lastname }
    ) => {
        event.preventDefault();
        const data = {
            unavailableDateID: unavailabledateid,
        };
        axios.post("admin/deleteUnavailableDates", data).then((res) => {
            this.handleClose(doctorid, firstname, lastname);
            setTimeout(() => {
                toast({
                    type: "success",
                    title: "Success",
                    description: <p>Unavailable date successfully deleted</p>,
                    icon: "check",
                });
            }, 1000);
        });
    };

    render() {
        let open;

        if (this.props.activeModal === "admin-delete-unavailable") {
            open = true;
        } else {
            open = false;
        }

        let time;
        let key;
        let firstname;
        let lastname;
        let doctorID;
        let unavailableDateID;
        if (this.props.data != null && this.props.data.time != null) {
            unavailableDateID = this.props.data.unavailableDateID;
            time = this.props.data.time;
            firstname = this.props.data.firstname;
            lastname = this.props.data.lastname;
            doctorID = this.props.data.doctorID;
        }

        return (
            <Modal
                size="mini"
                id="confirmation-modal"
                onClose={() => this.handleClose(doctorID, firstname, lastname)}
                onOpen={() => this.handleOpen()}
                open={open}
            >
                <Icon
                    name="close"
                    onClick={() => this.handleClose(doctorID, firstname, lastname)}
                    id="close-confirmation-modal"
                ></Icon>
                <Modal.Header as="h2">
                    <Icon name="trash"></Icon>
                    Delete Unavailable Date
                </Modal.Header>

                <Modal.Content>
                    <span
                        id="modal-text-delete-unavailable"
                        style={{ fontSize: 15 + "px", fontWeight: "bold" }}
                    >
                        {time}
                    </span>
                    <br />
                    <span style={{ fontSize: 15 + "px" }}>
                        Are you sure you want to delete this Date
                    </span>
                </Modal.Content>

                <Modal.Actions>
                    <Button
                        datakey={key}
                        icon
                        labelPosition="left"
                        onClick={()=>this.handleClose(doctorID, firstname, lastname)}
                    >
                        <Icon name="cancel" />
                        CANCEL
                    </Button>
                    <Button
                        icon
                        labelPosition="left"
                        color="red"
                        id="remove-unavailable-button"
                        unavailabledateid={unavailableDateID}
                        doctorid={doctorID}
                        firstname={firstname}
                        lastname={lastname}
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

export default AdminDeleteUnavailableModal;
