import React from "react";
import { Modal, Icon, Grid, Button, Segment } from "semantic-ui-react";

class AdminCreateModal extends React.Component {
    handleOpen = () => this.props.handleModal("admin-create");

    handleClose = () => this.props.handleModal("none");

    handleModal(name) {
        this.props.handleModal(name);
    }

    render() {
        let open;

        if (this.props.activeModal === "admin-create") {
            open = true;
        } else {
            open = false;
        }

        const column_style = {
            textAlign: "center",
        };

        const segment_style = {
            padding: "0 0 14px 0",
        };
        return (
            <>
                <Modal
                    size="tiny"
                    id="create-modal"
                    data-testid="create-modal"
                    onClose={() => this.handleClose()}
                    onOpen={() => this.handleOpen()}
                    open={open}
                >
                    <Icon
                        name="close"
                        onClick={this.handleClose}
                        id="close-create-modal"
                    ></Icon>
                    <Modal.Header className="center-header" as="h2">
                        What would you like to create?
                    </Modal.Header>

                    <Modal.Actions>
                        <Grid centered columns={2}>
                            <Grid.Column style={column_style}>
                                <Button
                                    id="add-dentist-button"
                                    onClick={() =>
                                        this.handleModal("admin-add-dentist")
                                    }
                                >
                                    <Segment basic style={segment_style}>
                                        <Icon
                                            name="user md"
                                            size="large"
                                        ></Icon>
                                    </Segment>
                                    New Dentist
                                </Button>
                            </Grid.Column>
                            <Grid.Column style={column_style}>
                                <Button
                                    id="add-procedure-button"
                                    onClick={() =>
                                        this.handleModal("admin-add-procedure")
                                    }
                                >
                                    <Segment basic style={segment_style}>
                                        <Icon
                                            name="clipboard"
                                            size="large"
                                        ></Icon>
                                    </Segment>
                                    New Procedure
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Modal.Actions>
                </Modal>
            </>
        );
    }
}

export default AdminCreateModal;
