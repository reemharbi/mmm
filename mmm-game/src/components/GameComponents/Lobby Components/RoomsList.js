import React, { Component } from 'react'
import Room from './Room'
import { Container, Divider, Grid, Header, Icon } from 'semantic-ui-react'


export default class RoomsList extends Component {


   
    





    render() {


        const roomsList = this.props.rooms.map((room , index) => {
          return <Grid.Column><Room enterRoom={this.props.enterRoom} name= {room.name} limit={room.limit} playerCount= {room.players.length} key={index} roomID={room._id}/></Grid.Column>
        })

        return (
           <Container center>




    <Grid celled columns={3}>
      <Grid.Row>
      {roomsList}
      </Grid.Row>
    </Grid>

    {/* Heads up! Override division color to make it visible on dark background. */}
    <style>
      {`
      .ui.grid.divided:not([class*="vertically divided"]) > .row > .column {
        box-shadow: -1px 0 0 0 #d4d4d4;
      }
      .ui[class*="vertically divided"].grid > .row:before {
        box-shadow: 0 -1px 0 0 rgba(212, 212, 212, 1.0);
      }
    `}
    </style>



             
    </Container>
        )
    }
}
