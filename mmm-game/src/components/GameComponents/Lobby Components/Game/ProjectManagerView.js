import React, { Component } from 'react'
import { Button, Card, Grid, Image } from 'semantic-ui-react'
import loading from './pencil.svg'
import './ProjectManagerView.css'
import './Animations.css'

export default class ProjectManagerView extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentCard: this.props.card
        }
    }
    render() {
        const invName = this.props.room.players.find(player => {
            console.log (inv.name)
             return player.role == 'inv'})
        console.log(this.props.room.players)
        return (
            <div>
                  <Grid columns={3}>
    <Grid.Row style={{paddingBottom: '0px'}}>
      <Grid.Column>
            <div className='card-div'>
                <Card className="project-card flip-vertical-right">
                    <div className="project-text text-flip">{this.props.card.title}</div>
                </Card>
            </div>
      </Grid.Column>
      <Grid.Column>
      <h3>{invName.name}</h3>
      <h6>Investor</h6>
     </Grid.Column>
      <Grid.Column>
        {/* <Button floated='right' color='red' style={{color:'black', marginTop:'1rem', marginRight: '1rem'}} className="exit-button" onClick={this.props.exitGame}>EXIT GAME</Button> */}
      </Grid.Column>
    </Grid.Row>

    <Grid.Row style={{paddingBottom: '0px', paddingTop: '0px'}}>
        <Grid.Column>
            <div style={{height:'8vh'}}>
            </div>  
        </Grid.Column>
        <Grid.Column>
            <p className='fade-in-fwd'>Project Manager</p>
        </Grid.Column>
    </Grid.Row>
    <Grid.Row style={{paddingBottom: '0px', paddingTop: '0px', height:'9vh'}}>
        <Grid.Column>
            <div>
                <Card style={{paddingBottom: '0px'}} className="project-card player-card p1">
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
