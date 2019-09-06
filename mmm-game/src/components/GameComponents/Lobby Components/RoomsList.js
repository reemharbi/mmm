import React, { Component } from 'react'
import Room from './Room'


export default class RoomsList extends Component {


   
    





    render() {


        const roomsList = this.props.rooms.map((room , index) => {
          return <Room name= {room.roomName} playerCount={room.playerCount} players= {room.players} key={index} />
        })

        return (
            <div>
                Rooms:
                <ul>
                    {roomsList}
                </ul>
            </div>
        )
    }
}
