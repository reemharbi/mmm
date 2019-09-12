import React, { Component } from 'react'
import Investor from './InvestorView'
import ProjectManager from './ProjectManagerView'
import './Game.css'
// import Card from './Card';
import './Game.css';
import Waiting from './Waiting';
import Disconnected from './Disconnected';
import InvestorFinalPhase from './InvestorFinalPhase';
import ProjectManagerFinalView from './ProjectManagerFinalView';
import { Button, Card, Grid, Image } from 'semantic-ui-react'

export default class Game extends Component {

  state = {
    currentCard: null,
    currentComponent: 'waiting',
    finalPhase: false,
    playersInRoom: []
  }
//


  


  componentDidMount() {
    

    this.props.socket.on("updateCurrentRoom", (roomID) => this.props.updateCurrentRoom(roomID));

    this.props.socket.on("startGame" , (card) => {
      const currentUser = this.props.room.players.find( (player) => {
          return player._id == this.props.user._id
      })
      console.log("currentUser is:" , currentUser)
 
      if (currentUser.role == "inv"){
        this.setState({
          currentCard: card,
          currentComponent: 'investor'
        })
      }

      else{
        this.setState({
          currentCard: card,
          currentComponent: 'project manager'
        })

      }
    
    })

    this.props.socket.on("finalPhase" , (players) => {
      this.setState({
        playersInRoom: players,
        finalPhase: true
      })
    })



  }


  render() {


    
    if (this.state.finalPhase) {
      
  if (this.state.currentComponent === 'investor') {
    return <div>
              <Grid.Column>
        <Button floated='right' color='yellow' style={{color:'black', marginTop:'1rem', marginRight: '1rem'}} className="exit-button" onClick={this.props.exitGame}>EXIT GAME</Button>
      </Grid.Column>
    <InvestorFinalPhase room={this.props.room} socket={this.props.socket} players={this.state.playersInRoom} card={this.state.currentCard}/>
  </div>
  }
  else{
    return <div>
              <Grid.Column>
        <Button floated='right' color='yellow' style={{color:'black', marginTop:'1rem', marginRight: '1rem'}} className="exit-button" onClick={this.props.exitGame}>EXIT GAME</Button>
      </Grid.Column>
       <ProjectManagerFinalView socket={this.props.socket} players={this.state.playersInRoom} card={this.state.currentCard}/>
    </div>
  }




    }
else {

  if (this.state.currentComponent === 'investor') {
    return <div>
      <Grid.Column>
        <Button floated='right' color='yellow' style={{color:'black', marginTop:'1rem', marginRight: '1rem'}} className="exit-button" onClick={this.props.exitGame}>EXIT GAME</Button>
      </Grid.Column>
        <Investor exitGame={this.props.exitGame} card={this.state.currentCard} room={this.props.room} updateRoom={this.props.updateRoom} socket={this.props.socket} />
      </div>
    }
    else if (this.state.currentComponent === 'project manager') {
      return <div>
        <p>Current players in room: {this.props.room.players.length}</p>
        <Grid.Column>
        <Button floated='right' color='yellow' style={{color:'black', marginTop:'1rem', marginRight: '1rem'}} className="exit-button" onClick={this.props.exitGame}>EXIT GAME</Button>
      </Grid.Column>
        <ProjectManager  exitGame={this.props.exitGame} card={this.state.currentCard} room={this.props.room} updateRoom={this.props.updateRoom} socket={this.props.socket} user={this.props.user}/>
     
      </div>
    }
    
    else if(this.state.currentComponent === 'waiting'){
      return <div>
        <Grid.Column>
        <Button floated='right' color='yellow' style={{color:'black', marginTop:'1rem', marginRight: '1rem'}} className="exit-button" onClick={this.props.exitGame}>EXIT GAME</Button>
      </Grid.Column>
        <Waiting exitGame={this.props.exitGame} room={this.props.room}/>
        </div>

}
else if (this.state.currentComponent === 'disconnected player'){
  return <Disconnected />
  
}
}
}
}
