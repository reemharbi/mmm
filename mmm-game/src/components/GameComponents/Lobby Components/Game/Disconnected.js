import React, { Component } from 'react'
import './Disconnected.css'

export default class Disconnected extends Component {
    render() {
        return (
            <div className="disconnect-text">
            <p>A User has left the game...</p>
            <p>Returning to lobby</p>                
            </div>
        )
    }
}
