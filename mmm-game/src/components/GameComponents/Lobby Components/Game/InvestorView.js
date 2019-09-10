import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'
import './InvestorView.css'

export default class InvestorView extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentCard: this.props.cards[0]
        }
    }



    componentDidMount(){

        this.props.socket.on("updateDB" , this.props.updateRoom(this.props.room._id) )

    }




    render() {

        console.log("investor view",this.props.room)
        // console.log(this.props.cards[0])
        return (
            <div>
               <Card className="project-card flip-vertical-right">
               <div className="project-text text-flip">{this.props.cards[0]}</div>
                </Card>
                <Button className="exit-button" onClick={this.props.exitGame}>EXIT GAME</Button>
            </div>
        )
    }
}
