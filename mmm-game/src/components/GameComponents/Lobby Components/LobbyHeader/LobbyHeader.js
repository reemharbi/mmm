import React, { Component } from 'react'
import { Divider, Form } from 'semantic-ui-react'
import AddRoom from './AddRoom';
import RoomFilter from './RoomFilter';

export default class LobbyHeader extends Component {
    render() {
        return (
            <Form size="small" key="small">
            <Form.Group widths='equal'>
              <AddRoom onChange={this.props.onChangeAdd} addRoom={this.props.addRoom} roomName={this.props.roomName}/>


              <RoomFilter  onChange={this.props.onChangeFilter} val={this.props.val}/>
            </Form.Group>
            
            <Divider hidden />
          </Form>
        )
    }
}
