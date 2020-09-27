import React from "react";
import axios from "axios";
import { Modal, Icon, Popup, Button, Form, Input } from "semantic-ui-react";
import { toast } from "react-semantic-toasts";

class AdminResetPasswordModal extends React.Component {
    state = {
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        error: {
            currentPassword: false,
            newPassword: false,
            confirmNewPassword: false,
        },
    };

    handleOpen = () => this.props.handleModal("admin-reset-password");

    handleClose = () => {
        this.resetState();
        this.props.handleModal("none");
    };

    handleModal(name) {
        this.props.handleModal(name);
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    resetState() {
        this.setState({
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
            error: {
                currentPassword: false,
                newPassword: false,
                confirmNewPassword: false,
            },
        });
    }

    handleValidation = (event) => {
        event.preventDefault();
        let currentPassword = this.state.currentPassword.trim();
        let error = {
            currentPassword: false,
            newPassword: false,
            confirmNewPassword: false,
        };
        let formIsValid = true;

        if (currentPassword === "") {
            error["currentPassword"] = true;
            toast({
                type: "error",
                title: "Error",
                description: <p>Please input your current password</p>,
                icon: "cancel",
            });
            this.setState({ error: error });
            formIsValid = false;
            this.handleNewPasswordValidation();
        } else {
            let data = {
                newPassword: currentPassword,
            };
            axios
                .post("admin/checkCurrentAdminPassword", data)
                .then((response) => {
                    if (response.data === false) {
                        error["currentPassword"] = true;
                        toast({
                            type: "error",
                            title: "Error",
                            description: <p>Incorrect current password</p>,
                            icon: "cancel",
                        });
                        this.setState({ error: error });
                        this.handleNewPasswordValidation();
                        return false;
                    } else {
                        if (this.handleNewPasswordValidation()) {
                            const data = {
                                username: "admin",
                                newPassword: this.state.newPassword,
                            };
                            axios
                                .post("admin/updateAccountPassword", data)
                                .then((res) => {
                                    this.handleClose();
                                    this.resetState();
                                    setTimeout(() => {
                                        toast({
                                            type: "success",
                                            title: "Success",
                                            description: (
                                                <p>
                                                    Password successfully reset
                                                </p>
                                            ),
                                            icon: "check",
                                        });
                                    }, 1000);
                                });
                        }
                    }
                });
        }
    };

    handleNewPasswordValidation() {
        const checkPassword = /^[0-9a-zA-Z]+$/;
        let newPassword = this.state.newPassword.trim();
        let confirmNewPassword = this.state.confirmNewPassword.trim();
        let error = this.state.error;
        let formIsValid = true;

        if (newPassword === "") {
            error["newPassword"] = true;
            error["confirmNewPassword"] = true;
            toast({
                type: "error",
                title: "Error",
                description: <p>Please input a valid password</p>,
                icon: "cancel",
            });
            formIsValid = false;
        } else if (newPassword !== confirmNewPassword) {
            error["newPassword"] = true;
            error["confirmNewPassword"] = true;
            toast({
                type: "error",
                title: "Error",
                description: <p>Passwords do not match</p>,
                icon: "cancel",
            });
            formIsValid = false;
        } else if (!newPassword.match(checkPassword)) {
            error["newPassword"] = true;
            error["confirmNewPassword"] = true;
            toast({
                type: "error",
                title: "Error",
                description: <p>Incorrect password format</p>,
                icon: "cancel",
            });
            formIsValid = false;
        } else if (newPassword.length < 10) {
            error["newPassword"] = true;
            error["confirmNewPassword"] = true;
            toast({
                type: "error",
                title: "Error",
                description: <p>Password is too short</p>,
                icon: "cancel",
            });
            formIsValid = false;
        } else if (newPassword.length > 32) {
            error["newPassword"] = true;
            error["confirmNewPassword"] = true;
            toast({
                type: "error",
                title: "Error",
                description: <p>Password is too long</p>,
                icon: "cancel",
            });
            formIsValid = false;
        }

        this.setState({ error: error });

        return formIsValid;
    }

    render() {
        let open;

        if (this.props.activeModal === "admin-reset-password") {
            open = true;
        } else {
            open = false;
        }
        return (
            <Modal
                size="mini"
                id="reset-password-modal"
                onClose={() => {
                    this.handleClose();
                }}
                onOpen={() => this.handleOpen()}
                open={open}
            >
                <Icon
                    name="close"
                    onClick={this.handleClose}
                    id="close-reset-password-modal"
                ></Icon>
                <Modal.Header as="h2">
                    <Icon name="edit"></Icon>
                    Edit Admin Password
                </Modal.Header>

                <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field required id="current-password-field">
                            <label>Current Password</label>
                            <Input
                                name="currentPassword"
                                type="password"
                                id="current-password"
                                autoComplete="false"
                                placeholder="Current Password"
                                onChange={this.handleChange}
                                error={this.state.error.currentPassword}
                            />
                        </Form.Field>
                        <Form.Field required id="new-password-field">
                            <label>New Password</label>
                            <Popup
                                trigger={
                                    <Input
                                        name="newPassword"
                                        type="password"
                                        id="new-password"
                                        autoComplete="false"
                                        placeholder="New Password"
                                        onChange={this.handleChange}
                                        error={this.state.error.newPassword}
                                    />
                                }
                                content="Password should contain 10 to 32 alphanumeric characters"
                                position="right center"
                            />
                        </Form.Field>
                        <Form.Field required id="confirm-new-password-field">
                            <label>Confirm New Password</label>
                            <Popup
                                trigger={
                                    <Input
                                        name="confirmNewPassword"
                                        type="password"
                                        id="confirm-new-password"
                                        autoComplete="false"
                                        placeholder="Confirm New Password"
                                        onChange={this.handleChange}
                                        error={
                                            this.state.error.confirmNewPassword
                                        }
                                    />
                                }
                                content="Password should contain 10 to 32 alphanumeric characters"
                                position="right center"
                            />
                        </Form.Field>
                    </Form>
                </Modal.Content>

                <Modal.Actions>
                    <Button
                        icon
                        labelPosition="left"
                        color="green"
                        id="save-password"
                        onClick={this.handleValidation}
                    >
                        <Icon name="check" />
                        CONFIRM
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default AdminResetPasswordModal;
