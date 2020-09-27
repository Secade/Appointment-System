import React from "react";
import axios from "axios";
import { Modal, Icon, Button, Form, Input } from "semantic-ui-react";
import { toast } from "react-semantic-toasts";

class AdminAddProcedureModal extends React.Component {
    state = {
        procedure: "",
        error: {
            procedure: false,
        },
    };

    handleOpen = () => this.props.handleModal("admin-add-procedure");

    handleClose = () => {
        this.resetState();
        this.props.handleModal("none");
    };

    resetState() {
        this.setState({
            procedure: "",
            error: {
                procedure: false,
            },
        });
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    handleUpdateTable = () => this.props.handleUpdateTable();

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.handleValidation()) {
            const data = {
                name: this.state.procedure.trim(),
            };
            axios.post("admin/addProcess", data).then((res) => {
                if (res.data.message === true) {
                    this.handleClose();
                    this.resetState();
                    setTimeout(() => {
                        toast({
                            type: "success",
                            title: "Success",
                            description: (
                                <p>New procedure successfully added</p>
                            ),
                            icon: "check",
                        });
                    }, 1000);
                    this.handleUpdateTable();
                } else {
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

        if (this.props.activeModal === "admin-add-procedure") {
            open = true;
        } else {
            open = false;
        }

        return (
            <Modal
                size="mini"
                id="procedure-modal"
                onClose={() => this.handleClose()}
                onOpen={() => this.handleOpen()}
                open={open}
            >
                <Icon
                    name="close"
                    onClick={this.handleClose}
                    id="close-procedure-modal"
                ></Icon>
                <Modal.Header as="h2">
                    <Icon name="clipboard"></Icon>
                    New Procedure
                </Modal.Header>

                <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field required id="procedure-field">
                            <label>Procedure Name</label>
                            <Input
                                error={this.state.error.procedure}
                                name="procedure"
                                id="procedure-name"
                                autoComplete="false"
                                placeholder="Procedure Name"
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                    </Form>
                </Modal.Content>

                <Modal.Actions>
                    <Button
                        icon
                        labelPosition="left"
                        color="green"
                        id="create-procedure-button"
                        onClick={this.handleSubmit}
                    >
                        <Icon name="check" />
                        CREATE
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default AdminAddProcedureModal;
