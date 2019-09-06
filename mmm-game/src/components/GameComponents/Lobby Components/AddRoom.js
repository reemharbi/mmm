import React, { Component } from 'react'
import {Button , Form} from 'react-bootstrap'

export default class AddRoom extends Component {
    render() {
        return (
            <div>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label> Room Name: </Form.Label>
                        <Form.Control value={this.props.roomName} type="text" placeholder="Name" onChange={(e) => this.props.onChange(e)} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={ (e) => this.props.addRoom(e)}>
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}
