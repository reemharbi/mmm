import React, { Component } from 'react'
import { Button, Card, Grid, Image } from 'semantic-ui-react'
import './InvestorView.css'
import './AnimatedBG.css'
import loading from './writing.svg'

export default class InvestorView extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentCard: this.props.cards[0]
        }
    }
    render() {
        console.log(this.props.cards[0])
        return (
            <div>
                  <Grid columns={3}>
    <Grid.Row style={{paddingBottom: '0px'}}>
      <Grid.Column>
            <div className='card-div'>
                <Card className="project-card flip-vertical-right">
                    <div className="project-text text-flip">{this.props.cards[0]}</div>
                </Card>
            </div>
      </Grid.Column>
      <Grid.Column>
      <Image centered style={{marginTop:'1rem'}} src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='tiny' circular />
      </Grid.Column>
      <Grid.Column>
        <Button floated='right' color='yellow' style={{color:'black', marginTop:'1rem', marginRight: '1rem'}} className="exit-button" onClick={this.props.exitGame}>EXIT GAME</Button>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row style={{paddingBottom: '0px', paddingTop: '0px'}}>
        <Grid.Column>
            <div style={{height:'8vh'}}>
            </div>  
        </Grid.Column>
        <Grid.Column>
            <p className='fade-in-fwd scale-out-center'>Phase 1</p>
        </Grid.Column>
    </Grid.Row>
    <Grid.Row style={{paddingBottom: '0px', paddingTop: '0px', height:'9vh'}}>
        <Grid.Column>
            <div>
                <Card style={{paddingBottom: '0px'}} className="project-card player-card">
                <Image  centered src={loading} size='tiny' style={{background:'rgba(255,255,255,.5)', marginTop:'5rem'}} />
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
                <Image  centered src={loading} size='tiny' style={{background:'rgba(255,255,255,.5)', marginTop:'5rem'}} />
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
