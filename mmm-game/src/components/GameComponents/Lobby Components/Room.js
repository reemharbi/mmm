import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'

export default class Room extends Component {
    render() {
        return (

            <div>
<Card fluid>
      <Card.Content>
      
        <Card.Header>{this.props.name}</Card.Header>
        <Card.Meta>Players: {this.props.playerCount}</Card.Meta>
       
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button color='blue' onClick={() => this.props.enterRoom(this.props.roomID)}>
            Join Room
          </Button>
        
        </div>
      </Card.Content>
    </Card>       
            </div>
        )
    }
}
