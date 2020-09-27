import React from "react";
import axios from "axios";
import { Modal, Icon, Popup, Button, Form, Input } from "semantic-ui-react";
import { toast } from "react-semantic-toasts";

class AdminAddDentistModal extends React.Component {
    state = {
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        confirmPassword: "",
        error: {
            firstname: false,
            lastname: false,
            username: false,
            password: false,
            confirmPassword: false,
        },
    };

    handleOpen = () => this.props.handleModal("admin-add-dentist");

    handleClose = () => {
        this.resetState();
        this.props.handleModal("none");
    };

    resetState() {
        this.setState({
            firstname: "",
            lastname: "",
            username: "",
            password: "",
            confirmPassword: "",
            error: {
                firstname: false,
                lastname: false,
                username: false,
                password: false,
                confirmPassword: false,
            },
        });
    }
    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    handleUpdateTable = () => this.props.handleUpdateTable();

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.handleValidation()) {
            let firstname = this.state.firstname.trim();
            let lastname = this.state.lastname.trim();
            const data = {
                firstname: this.state.firstname.trim(),
                lastname: this.state.lastname.trim(),
                username: this.state.username.trim(),
                password: this.state.password.trim(),
                type: "dentist",
                status: "Active",
            };
            axios.post("admin/addDentist", data).then((res) => {
                if (res.data.message === true) {
                    // this.handleClose();
                    setTimeout(() => {
                        toast({
                            type: "success",
                            title: "Success",
                            description: <p>New dentist successfully added</p>,
                            icon: "check",
                        });
                    }, 1000);
                    this.props.handleModal("admin-create-schedule", {
                        key: res.data.doctor._id,
                        firstname,
                        lastname,
                    });
                    this.resetState();
                    this.handleUpdateTable();
                } else {
                    toast({
                        type: "error",
                        title: "Error",
                        description: <p>Username already exists</p>,
                        icon: "cancel",
                    });
                }
            });
        }
    };

    handleValidation() {
        const checkfirst = /^[a-z A-Z]+$/; //regex for valid firstname
        const checklast = /^[a-z A-Z.\-_]+$/; //regex for valid lastname
        const checkusername = /^[0-9a-zA-Z]+$/; //regex to check for valid username
        const checkPassword = /^[0-9a-zA-Z]+$/;

        let firstname = this.state.firstname.trim();
        let lastname = this.state.lastname.trim();
        let username = this.state.username.trim();
        let password = this.state.password.trim();
        let confirmPassword = this.state.confirmPassword.trim();
        let error = {
            firstname: false,
            lastname: false,
            username: false,
            password: false,
            confirmPassword: false,
        };
        let formIsValid = true;

        if (firstname === "" || !firstname.match(checkfirst)) {
            error["firstname"] = true;
            toast({
                type: "error",
                title: "Error",
                description: <p>Please input a valid firstname</p>,
                icon: "cancel",
            });
            formIsValid = false;
        } else if (firstname.length < 2) {
            error["firstname"] = true;
            toast({
                type: "error",
                title: "Error",
                description: <p>Firstname is too short</p>,
                icon: "cancel",
            });
            formIsValid = false;
        } else if (!firstname.match(checkfirst)) {
            error["firstname"] = true;
            toast({
                type: "error",
                title: "Error",
                description: <p>Invalid firstname format</p>,
                icon: "cancel",
            });
            formIsValid = false;
        }

        if (lastname === "" || !lastname.match(checklast)) {
            error["lastname"] = true;
            toast({
                type: "error",
                title: "Error",
                description: <p>Please input a valid lastname</p>,
                icon: "cancel",
            });
            formIsValid = false;
        } else if (lastname.length < 2) {
            error["lastname"] = true;
            toast({
                type: "error",
                title: "Error",
                description: <p>Lastname is too short</p>,
                icon: "cancel",
            });
            formIsValid = false;
        } else if (!lastname.match(checklast)) {
            error["lastname"] = true;
            toast({
                type: "error",
                title: "Error",
                description: <p>Invalid lastname format</p>,
                icon: "cancel",
            });
            formIsValid = false;
        }

        if (password === "") {
            error["password"] = true;
            error["confirmPassword"] = true;
            toast({
                type: "error",
                title: "Error",
                description: <p>Please input a valid password</p>,
                icon: "cancel",
            });
            formIsValid = false;
        } else if (password !== confirmPassword) {
            error["password"] = true;
            error["confirmPassword"] = true;
            toast({
                type: "error",
                title: "Error",
                description: <p>Passwords do not match</p>,
                icon: "cancel",
            });
            formIsValid = false;
        } else if (!password.match(checkPassword)) {
            error["password"] = true;
            error["confirmPassword"] = true;
            toast({
                type: "error",
                title: "Error",
                description: <p>Incorrect password format</p>,
                icon: "cancel",
            });
            formIsValid = false;
        } else if (password.length < 10) {
            error["password"] = true;
            error["confirmPassword"] = true;
            toast({
                type: "error",
                title: "Error",
                description: <p>Password is too short</p>,
                icon: "cancel",
            });
            formIsValid = false;
        } else if (password.length > 32) {
            error["password"] = true;
            error["confirmPassword"] = true;
            toast({
                type: "error",
                title: "Error",
                description: <p>Password is too long</p>,
                icon: "cancel",
            });
            formIsValid = false;
        }

        if (username === "") {
            error["username"] = true;
            toast({
                type: "error",
                title: "Error",
                description: <p>Please input a valid username</p>,
                icon: "cancel",
            });
            formIsValid = false;
        } else if (username.length < 6) {
            error["username"] = true;
            toast({
                type: "error",
                title: "Error",
                description: <p>Username is too short</p>,
                icon: "cancel",
            });
            formIsValid = false;
        } else if (username.length > 32) {
            error["username"] = true;
            toast({
                type: "error",
                title: "Error",
                description: <p>Username is too long</p>,
                icon: "cancel",
            });
            formIsValid = false;
        } else if (!username.match(checkusername)) {
            error["username"] = true;
            toast({
                type: "error",
                title: "Error",
                description: <p>Incorrect username format</p>,
                icon: "cancel",
            });
            formIsValid = false;
        }

        this.setState({ error: error });

        return formIsValid;
    }

    render() {
        let open;

        if (this.props.activeModal === "admin-add-dentist") {
            open = true;
        } else {
            open = false;
        }
        return (
            <Modal
                size="mini"
                id="add-dentist-modal"
                onClose={() => this.handleClose()}
                onOpen={() => this.handleOpen()}
                open={open}
            >
                <Icon
                    name="close"
                    onClick={this.handleClose}
                    id="close-add-dentist-modal"
                ></Icon>
                <Modal.Header as="h2">
                    <Icon name="user md"></Icon>
                    New Dentist
                </Modal.Header>

                <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field required id="firstname-field-dentist">
                            <label>First Name</label>
                            <Popup
                                trigger={
                                    <Input
                                        error={this.state.error.firstname}
                                        name="firstname"
                                        id="add-firstname-dentist"
                                        autoComplete="false"
                                        placeholder="First Name"
                                        onChange={this.handleChange}
                                    />
                                }
                                content="Name should contain at least 2 characters"
                                position="right center"
                            />
                        </Form.Field>
                        <Form.Field required id="lastname-field-dentist">
                            <label>Last Name</label>
                            <Popup
                                trigger={
                                    <Input
                                        error={this.state.error.lastname}
                                        name="lastname"
                                        id="add-lastname-dentist"
                                        autoComplete="false"
                                        placeholder="Last Name"
                                        onChange={this.handleChange}
                                    />
                                }
                                content="Name should contain at least 2 characters"
                                position="right center"
                            />
                        </Form.Field>
                        <Form.Field required id="username-field-dentist">
                            <label>Username</label>
                            <Popup
                                trigger={
                                    <Input
                                        error={this.state.error.username}
                                        name="username"
                                        id="add-username-dentist"
                                        autoComplete="false"
                                        placeholder="Username"
                                        onChange={this.handleChange}
                                    />
                                }
                                content="You will not be able to change your username once created"
                                position="right center"
                            />
                        </Form.Field>
                        <Form.Field required id="password-field-dentist">
                            <label>Password</label>
                            <Popup
                                trigger={
                                    <Input
                                        error={this.state.error.password}
                                        name="password"
                                        type="password"
                                        id="add-password-dentist"
                                        autoComplete="false"
                                        placeholder="Password"
                                        onChange={this.handleChange}
                                    />
                                }
                                content="Password should contain 10 to 32 alphanumeric characters"
                                position="right center"
                            />
                        </Form.Field>
                        <Form.Field
                            required
                            id="confirm-password-field-dentist"
                        >
                            <label>Confirm Password</label>
                            <Popup
                                trigger={
                                    <Input
                                        error={this.state.error.confirmPassword}
                                        name="confirmPassword"
                                        type="password"
                                        id="confirm-password-dentist"
                                        autoComplete="false"
                                        placeholder="Password"
                                        onChange={this.handleChange}
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
                        id="create-dentist-button"
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

export default AdminAddDentistModal;
