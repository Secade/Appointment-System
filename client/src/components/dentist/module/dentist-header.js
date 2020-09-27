import React, {Component} from 'react';
import {Table} from 'semantic-ui-react'
import moment from 'moment'

import '../dentist_css/dentist-view.css'

export default class SecretaryHeader extends Component{
    constructor(props){
        super(props);

        this.state={
            today:this.props.date,
            startOfWeek: this.props.startOfWeek,
            endOfWeek: this.props.endOfWeek,
            days:this.props.daysParent,
            weekUnparsed:this.props.weekUnparsed

        }
        
        
    }

    componentDidMount(){
        let newArray=[]
        let backgroundColor ='red'
        let dated=Date.parse(this.state.today)
        let dateded =moment(dated).format("MMMM D, YYYY")

        for(let i =0; i < this.state.days.length; i++){
            if(this.state.days[i] == dateded){
                newArray.push(<Table.Cell onClick={()=>this.props.onChangeDate(this.state.weekUnparsed[i])} style={{backgroundColor}}>{this.state.days[i]}</Table.Cell>)
            }
            else{
                // newArray.push(<Table.Cell onClick={()=>this.props.onChangeDate(this.state.weekUnparsed[i])} >{this.state.days[i]}</Table.Cell>)
                newArray.push(<Table.Cell onClick={this.props.onChangeDate} >{this.state.days[i]}</Table.Cell>)
            }
        }
        this.setState({
            days:this.state.days,
            weekUnparsed:this.state.weekUnparsed
            
        })




        
    }

    componentDidUpdate(){
        if(this.props.date !== this.state.today){   
            let newArray=[]
            let backgroundColor ='red'
            let dated=Date.parse(this.state.today)
            let dateded =moment(dated).format("MMMM D, YYYY")

            for(let i =0; i < this.state.days.length; i++){
                if(this.state.days[i] == dateded){
                    newArray.push(<Table.Cell onClick={()=>this.props.onChangeDate(this.state.weekUnparsed[i])} style={{backgroundColor}}>{this.state.days[i]}</Table.Cell>)
                }
                else{
                    newArray.push(<Table.Cell onClick={()=>this.props.onChangeDate(this.state.weekUnparsed[i])} >{this.state.days[i]}</Table.Cell>)
                }
            }
            this.setState({
                today: this.props.date,
                startOfWeek: this.props.startOfWeek,
                endOfWeek: this.props.endOfWeek,
                days:this.props.daysParent,
                weekUnparsed:this.props.weekUnparsed,
                
                
            })
        }
        
    }

    hello =(date)=>{
        console.log(date)
        this.setState({
            today: date
        })
    }

    render(){
        const newArray =[]
        let backgroundColor ='red'
        let newDate=Date.parse(this.state.today)
        let formatted =moment(newDate).format("MMMM D, YYYY")

        newArray.push(<Table.Cell id='secretary-add-appointment'>
                        </Table.Cell>)
        for(let i =0; i < this.state.days.length; i++){
            if(this.state.days[i] == formatted){
                newArray.push(<Table.Cell id="sec-header-child" onClick={()=>this.props.onChangeDate(this.state.weekUnparsed[i])} style={{backgroundColor}}>{this.state.days[i]}</Table.Cell>)
            }
            else{
                newArray.push(<Table.Cell id="sec-header-child" onClick={()=>this.props.onChangeDate(this.state.weekUnparsed[i])} >{this.state.days[i]}</Table.Cell>)
            }
        }

        return(
            <Table id="SECHEADER" celled textAlign='center' style={{height:70+'px'}} compact>
                <Table.Body>
                    <Table.Row children={newArray}/>
                    
                </Table.Body>
            </Table>
        )
    }
}