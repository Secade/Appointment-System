import React from "react";
import axios from "axios";
import { Modal, Icon, Button, Form, Input, Message } from "semantic-ui-react";
import { toast } from "react-semantic-toasts";

class AdminEditProcedureModal extends React.Component {
    state = {
        procedure: "",
        error: {
            procedure: false,
        },
    };

    handleOpen = () => this.props.handleModal("admin-edit-procedure");

    handleClose = () => {
        this.resetState();
        this.props.handleModal("none");
    };

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    handleUpdateTable = () => this.props.handleUpdateTable();

    resetState() {
        this.setState({
            procedure: "",
            error: {
                procedure: false,
            },
        });
    }

    handleSubmit = (event, { datakey }) => {
        event.preventDefault();
        if (this.handleValidation()) {
            const data = {
                procedureID: datakey,
                name: this.state.procedure.trim(),
            };
            axios.post("admin/editProcess", data).then((res) => {
                if (res.data.message === true) {
                    this.handleClose();
                    this.resetState();
                    setTimeout(() => {
                        toast({
                            type: "success",
                            title: "Success",
                            description: <p>Procedure successfully edited</p>,
                            icon: "check",
                        });
                    }, 1000);
                    this.handleUpdateTable();
                } else {
                    console.log(res);
                    toast({
                        type: "error",
                        title: "Error",
                        description: <p>Procedure already exists</p>,
                        icon: "cancel",
                    });
                }
            });
        }
    };

    handleValidation() {
        const check = /^[a-z A-Z]+$/; // regex for invalid characters
        let procedure = this.state.procedure.trim();
        let error = {
            procedure: false,
        };
        let formIsValid = true;
        if (procedure === "" || !procedure.match(check)) {
            error["procedure"] = true;
            toast({
                type: "error",
                title: "Error",
                description: <p>Please input a valid procedure name</p>,
                icon: "cancel",
            });
            formIsValid = false;
        }
        this.setState({ error: error });

        return formIsValid;
    }

    render() {
        let open;

        if (this.props.activeModal === "admin-edit-procedure") {
            open = true;
        } else {
            open = false;
        }
        let oldprocedure;
        let key;
        if (this.props.data != null && this.props.data.processname != null) {
            oldprocedure = Object.values(this.props.data.processname);
            key = this.props.data.key;
        }

        return (
            <Modal
                size="mini"
                id="edit-procedure-modal"
                onClose={() => this.handleClose()}
                onOpen={() => this.handleOpen()}
                open={open}
            >
                <Icon
                    name="close"
                    onClick={this.handleClose}
                    id="close-edit-procedure-modal"
                ></Icon>
                <Modal.Header as="h2">
                    <Icon name="edit"></Icon>
                    Edit Procedure
                </Modal.Header>

                <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field id="old-procedure-field">
                            <label>Old Procedure Name</label>
                            <Message id="old-procedure-name">
                                {oldprocedure}
                            </Message>
                        </Form.Field>
                        <Form.Field required id="edit-procedure-field">
                            <label>New Procedure Name</label>
                            <Input
                                error={this.state.error.procedure}
                                name="procedure"
                                id="edit-procedure-name"
                                autoComplete="false"
                                placeholder="Procedure Name"
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                    </Form>
                </Modal.Content>

                <Modal.Actions>
                    <Button
                        datakey={key}
                        icon
                        labelPosition="left"
                        color="green"
                        id="edit-procedure-button"
                        onClick={this.handleSubmit}
                    >
                        <Icon name="check" />
                        SAVE CHANGES
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default AdminEditProcedureModal;
