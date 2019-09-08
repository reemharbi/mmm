import React, { Component } from 'react'
import {  Form, Container } from 'semantic-ui-react'

export default class RoomFilter extends Component {
    render() {
        return (
            <Container center>





<Form unstackable>
    <Form.Group widths={2}>
      <Form.Input label='Search a room' placeholder='Room Name' value={this.props.val} onChange={(e) => this.props.onChange(e)} />
    </Form.Group>
  </Form>


                
  </Container>
        )
    }
}
