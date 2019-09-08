import React, { Component } from 'react'
import { Button, Card, Image } from 'semantic-ui-react'

export default class Room extends Component {
    render() {
        // console.log(this.props.name)
        // console.log(this.props.playerCount)
        return (
            <div>


<Card>
      <Card.Content>
      
        <Card.Header>{this.props.name}</Card.Header>
        <Card.Meta>Players: {this.props.playerCount}</Card.Meta>
       
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green' onClick={this.props.enterRoom}>
            Join
          </Button>
        
        </div>
      </Card.Content>
    </Card>


       
            </div>
        )
    }
}
