import React, { Component } from 'react'
import { Button, Card, Grid, Image } from 'semantic-ui-react'
import './InvestorView.css'
import './AnimatedBG.css'
import './Animations.css'
import loading from './pencil.svg'


export default class InvestorView extends Component {
    componentDidMount(){
        this.props.socket.on("updateDB" , this.props.updateRoom(this.props.room._id) )
    }
    render() {
        const invName = this.props.room.players.find(player => player.role == 'inv').name
        return (
            <div>
    <Grid columns={3}>
    <Grid.Row style={{paddingBottom: '0px'}}>
      <Grid.Column>
            <div className='card-div'>
                <Card className="project-card flip-vertical-right">
                    <div className="project-text flip">{this.props.card.title}</div>
                </Card>
            </div>
      </Grid.Column>
      <Grid.Column>
      <h3>{invName}</h3>
      <h6>Investor</h6>
      </Grid.Column>
  
    </Grid.Row>

    <Grid.Row style={{paddingBottom: '0px', paddingTop: '0px'}}>
        <Grid.Column>
            <div style={{height:'8vh'}}>
            </div>  
        </Grid.Column>
        <Grid.Column>
            <p className='fade-in-fwd sentence'>*playing solitaire while waiting for project proposals*</p>
        </Grid.Column>
    </Grid.Row>
    <Grid.Row style={{paddingBottom: '0px', paddingTop: '0px', height:'9vh'}}>
        <Grid.Column>
            <div>
                <Card style={{paddingBottom: '0px'}} className="p1 project-card player-card">
                <Image  centered src={loading} size='small' style={{background:'rgba(255,255,255,0)', marginTop:'5rem'}} />
                </Card>
            </div>
       </Grid.Column>
       <Grid.Column>
            <div>
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
