import React, { Component } from 'react'
import './App.css';
import { players, projects } from './dummy/data'
import Lobby from './components/GameComponents/Lobby Components/Lobby'


export default class App extends Component {

  render() {
    return (
      <Lobby />
    );

  }
}
