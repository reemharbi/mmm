import React, { Component } from 'react'
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
               
               <p>{this.props.cards[0]}</p>

                <button onClick={this.props.exitGame}> EXIT GAME</button>
            </div>
        )
    }
}
