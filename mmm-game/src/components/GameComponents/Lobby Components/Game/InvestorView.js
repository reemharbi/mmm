import React, { Component } from 'react'
import { Button, Card, Grid, Image } from 'semantic-ui-react'
import './InvestorView.css'
import './AnimatedBG.css'

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
    <Grid.Row>
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
        <Button floated='right' style={{marginTop:'1rem', marginRight: '1rem'}} className="exit-button" onClick={this.props.exitGame}>EXIT GAME</Button>
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
