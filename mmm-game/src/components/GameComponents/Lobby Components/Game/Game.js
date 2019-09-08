import React, { Component } from 'react'
import Investor from './InvestorView'
import firebase from '../firebase';
import Card from './Card'
export default class Game extends Component {

    state ={
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
            console.log("i am the 'componentWi.....'")

            this.setState({
                cards: cardsStateArray
            }
            )


        })

        console.log(this.state.cards)

    }


    render() {


        const cardsList = this.state.cards.map((card , index) => {
            return <Card name= {card.name} key={index} />
        })


        if(this.props.role){
            return <div>
                <Investor exitGame={this.props.exitGame} cards={this.state.cards}/>
            </div>
        }
        else if (this.props.role == false){
            return <div>

            </div>
        }
    }
}
