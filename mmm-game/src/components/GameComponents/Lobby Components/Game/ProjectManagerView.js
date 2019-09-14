import React, { Component } from 'react'
import { Button, Card, Grid, Image, Form } from 'semantic-ui-react'
import './ProjectManagerView.css'
import loading from './pencil.svg'
import {updatePlayer} from '../api'

export default class ProjectManagerView extends Component {
    
    state = {
        approachField: "",
        isSubmitted: false
    }

    handleChange = (event) => {
        this.setState({
            approachField: event.target.value
        })

    }


    approachSubmit = (value) => {
        value.preventDefault();
        const body = {approach: this.state.approachField};

        updatePlayer(this.props.user._id , body).then( res => {
            console.log("approach submit",res)
            this.props.socket.emit("submitApproach" , this.props.room)
        } );
this.setState({isSubmitted:true})

    }





    render() {
       
        return (
            <div className='grid' style={{height:'90vh'}}>
    <Grid>
    <Grid.Row columns={3} style={{paddingBottom: '0px'}}>
      <Grid.Column>
            <div className='card-div'>
                <Card className="project-card flip-vertical-right">
                    <div className="project-text text-flip">{this.props.card.title}</div>
                </Card>
            </div>
      </Grid.Column>
      <Grid.Column width={4} >
          <Grid.Row style={{textAlign:'center'}} columns={1} >
          {this.props.investor && <h2 style={{color:'center'}}>{this.props.investor.name}</h2>}
      <h4 style={{color:'white'}}>Investor</h4>
      </Grid.Row>
      <Grid.Row columns={1} className='sentence-row' style={{textAlign:'center'}}>
      <h4 className='fade-in-fwd sentence'>How would you approach this project?</h4>
      </Grid.Row>
     </Grid.Column>
    </Grid.Row>

    <Grid.Row style={{paddingBottom: '0px', paddingTop: '0px'}}>
        <Grid.Column>
            <div style={{height:'8vh'}}>
            </div>  
        </Grid.Column>

    </Grid.Row>
    <Grid.Row columns={2} style={{paddingBottom: '0px', paddingTop: '0px', height: '50vh'}}>
        <Grid.Column>
            <div>
                <Card style={{paddingBottom: '0px'}} className="project-card player-card">
                {!this.state.isSubmitted &&
                <Form> 
                    <Form.TextArea value={this.state.approachField} onChange={(e) => this.handleChange(e)} placeholder='How would you approach this project?' />
                    <Form.Button onClick={this.approachSubmit}>Submit</Form.Button>
                </Form>
            }
                {this.state.isSubmitted && 
                <div>{this.state.approachField}</div>
                }
                </Card>
            </div>
       </Grid.Column>

       <Grid.Column>
            <div>
                <Card style={{paddingBottom: '0px'}} className="project-card player-card p2">
                <Image  centered src={loading} size='small' style={{background:'rgba(255,255,255,0)', marginTop:'5rem'}} />
                </Card>
            </div>
       </Grid.Column>

    </Grid.Row>

        </Grid>

        <div class="bg"></div>
        <div class="bg bg2"></div>
        <div class="bg bg3"></div>

    </div>
        )
    }
}
