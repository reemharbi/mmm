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

export default class Game extends Component {

  state = {
    currentCard: null,
    currentComponent: 'waiting',
    finalPhase: false,
    playersInRoom: []
  }



  


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
    return <InvestorFinalPhase room={this.props.room} socket={this.props.socket} players={this.state.playersInRoom} card={this.state.currentCard}/>
  }
  else{
    return <ProjectManagerFinalView socket={this.props.socket} players={this.state.playersInRoom} card={this.state.currentCard}/>

  }




    }
else {

  if (this.state.currentComponent === 'investor') {
    return <div>
        <p>Current players in room: {this.props.room.players.length}</p>
        <Investor exitGame={this.props.exitGame} card={this.state.currentCard} room={this.props.room} updateRoom={this.props.updateRoom} socket={this.props.socket} />
      </div>
    }
    else if (this.state.currentComponent === 'project manager') {
      return <div>
        <p>Current players in room: {this.props.room.players.length}</p>
        <ProjectManager  exitGame={this.props.exitGame} card={this.state.currentCard} room={this.props.room} updateRoom={this.props.updateRoom} socket={this.props.socket} user={this.props.user}/>
     
      </div>
    }
    
    else if(this.state.currentComponent === 'waiting'){
      return <div>
        <Waiting exitGame={this.props.exitGame} room={this.props.room}/>
        </div>

}
else if (this.state.currentComponent === 'disconnected player'){
  return <Disconnected />
  
}
}
}
}
