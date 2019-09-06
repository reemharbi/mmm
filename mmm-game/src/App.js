import React, { Component } from 'react'
import './App.css';
import InvestorView from './components/GameComponents/InvestorView';
import {players, projects} from './dummy/data'
 import Lobby from './components/GameComponents/Lobby Components/Lobby'


export default class App extends Component {
  state = {
    
    currentProject: projects[0],
    players: players
    
  }
  render() {
    
    
    
    
      return (
                <Lobby />      
              );
 
  }
}
