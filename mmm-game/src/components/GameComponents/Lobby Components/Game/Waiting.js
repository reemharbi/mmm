import React, { Component } from 'react'
import { Image } from 'semantic-ui-react';
import './Waiting.css'
import dot from './dotdotdot.svg'
import './AnimatedBG.css'
import { Button } from 'semantic-ui-react'

export default class Waiting extends Component {
    render() {
      
        return (
            <div style={{height:'90vh'}}>
            <div class="bg"></div>
            <div class="bg bg2"></div>
            <div class="bg bg3"></div>
            <div className="loading">
        
    <p>Waiting for other players
        <Image src={dot} size='small' style={{marginLeft:'23rem'}} />
    <p>({this.props.room.players.length}/{this.props.room.limit})</p>    
    </p>
    </div>
    </div>
        )
    }
}
