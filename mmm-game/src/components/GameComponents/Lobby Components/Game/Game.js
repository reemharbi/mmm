import React, { Component } from 'react'
import Investor from './InvestorView'
import Card from './Card';
import './Game.css';
import Waiting from './Waiting';
import Disconnetcted from './Disconnected';
import { Button } from 'semantic-ui-react'

export default class Game extends Component {

  state = {
    currenyCard: null,
    currentComponent: 'waiting'
  }



  


  componentDidMount() {
    

    this.props.socket.on("updateCurrentRoom", (roomID) => this.props.updateCurrentRoom(roomID));

    this.props.socket.on("startGame" , (card) => {
      console.log("card: ", card,", players: ", this.props.room.players, " ,user: ", this.props.user._id)
      const currentUser = this.props.room.players
      console.log(currentUser);
      console.log("current user in the game component" , currentUser)
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
      

    } )


  }


  render() {


    


    if (this.state.currentComponent === 'investor') {
      return <div>
        <p>Current players in room: {this.props.room.players.length}</p>
        <Investor exitGame={this.props.exitGame} cards={this.state.cards} room={this.props.room} updateRoom={this.props.updateRoom} socket={this.props.socket} />
      </div>
    }
    else if (this.state.currentComponent === 'project manager') {
      return <div>

      </div>
    }

    else if(this.state.currentComponent === 'waiting'){
      return <div>
        <Waiting room={this.props.room}/>
        <Button className="exit-button" onClick={this.props.exitGame}>EXIT GAME</Button>
        
        </div>

    }
    else if (this.state.currentComponent === 'disconnetcted player'){
      return <Disconnetcted />

    }
  }
}
