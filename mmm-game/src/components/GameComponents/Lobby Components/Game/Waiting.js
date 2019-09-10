import React, { Component } from 'react'
import { Image } from 'semantic-ui-react';
import './Waiting.css'
import dot from './dotdotdot.svg'

export default class Waiting extends Component {
    render() {
      
        return (

    <div className="loading">
    <p>Waiting for other players
        <Image src={dot} size='small' style={{marginLeft:'23rem'}} />
    <p>(1/3)</p>
    </p>
   
    </div>
        )
    }
}
