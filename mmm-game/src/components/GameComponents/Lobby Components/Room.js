import React, { Component } from 'react'

export default class Room extends Component {
    render() {
        // console.log(this.props.name)
        // console.log(this.props.playerCount)
        return (
            <div>
                <p>{this.props.name}</p>
                <p>{this.props.playerCount}</p>
            </div>
        )
    }
}
