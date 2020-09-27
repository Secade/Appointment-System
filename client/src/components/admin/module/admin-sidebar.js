import React from "react";
import Logo from "./logo.js";
import { Menu, Button, Icon, Segment } from "semantic-ui-react";
import axios from 'axios';

class AdminSidebar extends React.Component {
    handleItemClick(name) {
        this.props.handleItem(name);
        if (name==='Logout'){
            
            axios.get('/logout').then(window.location.href ="/");
            ;

        }

    }

    handleModal(name) {
        this.props.handleModal(name);
    }

    handleTable(name) {
        this.props.handleTable(name);
    }

    render() {
        let { activeItem } = this.props;
        const no_padding = { padding: 0 };

        const item_styling = {
            margin: 0,
            fontWeight: "bold",
            padding: "13px 16px 13px 16px",
        };

        const icon_styling = {
            marginRight: 13.5 + "px",
        };

        const menu_styling = {
            width: 15 + "%",
            height: 100 + "%",
            border: 0 + "px none",
            padding: 0 + "px",
            backgroundColor: "#f5f5f5",
            boxShadow: "2px 2px 2px 2px #f1f1f1",
            margin: 0,
        };

        return (
            <Menu secondary vertical style={menu_styling}>
                <Menu.Item style={no_padding} horizontalalign="middle">
                    <Logo />
                </Menu.Item>
                <Segment basic textAlign="center" style={no_padding}>
                    <Button
                        circular
                        color="pink"
                        id="create"
                        onClick={() => this.handleModal("admin-create")}
                    >
                        CREATE
                    </Button>
                </Segment>
                <Menu.Item
                    active={activeItem === "Dentist"}
                    onClick={() => {
                        this.handleItemClick("Dentist");
                        this.handleTable("Dentist");
                    }}
                    id="dentistButton"
                    style={item_styling}
                >
                    <div className="ui left">
                        <Icon
                            name="user md"
                            size="large"
                            style={icon_styling}
                        />
                        Dentist
                    </div>
                </Menu.Item>
                <Menu.Item
                    active={activeItem === "Procedure"}
                    onClick={() => {
                        this.handleItemClick("Procedure");
                        this.handleTable("Procedure");
                    }}
                    id="procedureButton"
                    style={item_styling}
                >
                    <div className="ui left">
                        <Icon
                            name="clipboard"
                            size="large"
                            style={icon_styling}
                        />
                        Procedure
                    </div>
                </Menu.Item>
                <Menu.Item
                    active={activeItem === "Export Data"}
                    onClick={() => this.handleItemClick("Export Data")}
                    id="downloadFile"
                    style={item_styling}
                >
                    <div className="ui left">
                        <Icon
                            name="download"
                            size="large"
                            style={icon_styling}
                        />
                        Export Data
                    </div>
                </Menu.Item>
                <Menu.Item
                    active={activeItem === "Reset Admin"}
                    onClick={() => this.handleModal("admin-reset-password")}
                    id="resetAdmin"
                    style={item_styling}
                >
                    <div className="ui left" id="reset-password">
                        <Icon name="lock" size="large" style={icon_styling} />
                        Reset Admin
                    </div>
                </Menu.Item>
                <Menu.Item
                    active={activeItem === "Reset Secretary"}
                    onClick={() => this.handleModal("admin-reset-secretary")}
                    id="resetSecretary"
                    style={item_styling}
                >
                    <div className="ui left" id="reset-secretary">
                        <Icon.Group style={icon_styling}>
                            <Icon name="user" size="large" />
                            <Icon corner name="lock" />
                        </Icon.Group>
                        Reset Secretary
                    </div>
                </Menu.Item>
                <Menu.Item
                    active={activeItem === "Free-Up Memory"}
                    onClick={() => this.handleModal("admin-free-memory")}
                    id="procedureButton"
                    style={item_styling}
                >
                    <div className="ui left">
                        <Icon
                            name="recycle"
                            size="large"
                            style={icon_styling}
                        />
                        Free-up Memory
                    </div>
                </Menu.Item>
                <Menu.Item
                    active={activeItem === "Logout"}
                    onClick={() => this.handleItemClick("Logout")}
                    id="logoutButton"
                    style={item_styling}
                >
                    <div className="ui left">
                        <Icon
                            name="sign out"
                            size="large"
                            style={icon_styling}
                        />
                        Logout
                    </div>
                </Menu.Item>
            </Menu>
        );
    }
}

export default AdminSidebar;
