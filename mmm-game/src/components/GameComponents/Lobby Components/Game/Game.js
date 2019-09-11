import React, { Component } from 'react'
import Investor from './InvestorView'
import ProjectManager from './ProjectManagerView'
import './Game.css'
// import Card from './Card';
import './Game.css';
import Waiting from './Waiting';
import Disconnected from './Disconnected';

export default class Game extends Component {

  state = {
    currentCard: null,
    currentComponent: 'waiting'
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
  }


  render() {


    


    if (this.state.currentComponent === 'investor') {
      return <div>
        <p>Current players in room: {this.props.room.players.length}</p>
        <Investor exitGame={this.props.exitGame} card={this.state.currentCard} room={this.props.room} updateRoom={this.props.updateRoom} socket={this.props.socket} />
      </div>
    }
    else if (this.state.currentComponent === 'project manager') {
      return <div>
        <p>Current players in room: {this.props.room.players.length}</p>
        <ProjectManager exitGame={this.props.exitGame} card={this.state.currentCard} room={this.props.room} updateRoom={this.props.updateRoom} socket={this.props.socket} />
     
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
