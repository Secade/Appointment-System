import React, {Component} from 'react';
import {Modal, Button, Icon, Form} from 'semantic-ui-react'


class DeleteAppointment extends Component{

    constructor(props){
        super(props);

        this.state={
            open: true
        }

        this.setOpen = this.setOpen.bind(this)
    }

    setOpen(){
        this.setState({
            open:true
        })
    }

    hello=()=>{
        console.log("HI THERE")
    }


    render(){
        console.log("I got in")
        return(
                <Modal
                    closeIcon
                    onClose={this.setOpen}
                    onOpen={this.setOpen}
                    open={this.state.open}
                    // as={Form}
                    // // onSubmit={this.hello}
                    // trigger={<Button>Delete</Button>}
                >
                    <Modal.Header as={'h2'}>
                        Confirm Delete
                    </Modal.Header>
                    <Modal.Component>
                        Are you sure you want to delete this appointment?
                    </Modal.Component>
                    <Modal.Actions>
                        <Button onClick={this.setOpen}>
                            {/* <Icon name="cancel"/> */}
                            Cancel
                        </Button>
                        <Button onClick={this.setOpen}>
                            {/* <Icon name="check"/> */}
                            Confirm
                        </Button>
                    </Modal.Actions>
                </Modal>
        )
    }
}
export default DeleteAppointment
