import React, {Component} from 'react';
//import Navbar from "../small_components/Navbar.component"
//import AddAppointment from "../small_components/appointment_modal.component"
import {Grid, GridRow} from "semantic-ui-react"

export default class week_all extends Component{
    render(){
        return(
            <>
                <Grid style={{padding: 0+"px", margin: 0+"px", height: 200+'px'}}>
                    <GridRow>
           {/*}             <Navbar/> */}
                    </GridRow>
                    <Grid.Row>
                  {/*}          <AddAppointment/>*/}
                    </Grid.Row>
                </Grid>
            </>
        )
            
            
    }
}