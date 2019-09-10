import React, { Component } from 'react'
import Investor from './InvestorView'
import firebase from '../firebase';
import Card from './Card'
import './Game.css'

export default class Game extends Component {

  state = {
    cards: []
  }





  componentDidMount() {
    const cradsRef = firebase.database().ref('cards');
    cradsRef.on('value', snapshot => {
      const cardsState = snapshot.val();


      let cardsStateArray = [];
      for (let i in cardsState) {
        cardsStateArray.push(
          cardsState[i].name
        )
      }

      this.setState({
        cards: cardsStateArray
      }
      )


    })
    this.props.socket.on("updateCurrentRoom", (roomID) => this.props.updateCurrentRoom(roomID));
  }


  render() {


    const cardsList = this.state.cards.map((card, index) => {
      return <Card name={card.name} key={index} />
    })


    if (this.props.role) {
      return <div>
        <p>Current players in room: {this.props.room.players.length}</p>
        <Investor exitGame={this.props.exitGame} cards={this.state.cards} room={this.props.room} updateRoom={this.props.updateRoom} socket={this.props.socket} />
      </div>
    }
    else if (this.props.role == false) {
      return <div>

      </div>
    }
  }
}
