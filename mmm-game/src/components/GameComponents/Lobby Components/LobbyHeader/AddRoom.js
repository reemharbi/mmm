import React, { Component } from 'react'
import { Button, Form, Container } from 'semantic-ui-react'


export default class AddRoom extends Component {
    render() {
        return (
            <Container center>





<Form unstackable>
    <Form.Group widths={2}>
      <Form.Input placeholder='Create a room' value={this.props.roomName} onChange={(e) => this.props.onChange(e)} />
    </Form.Group>
    <Button type='submit' color='blue' onClick={ (e) => this.props.addRoom(e)}>Create</Button>
  </Form>


                
  </Container>
        )
    }
}
