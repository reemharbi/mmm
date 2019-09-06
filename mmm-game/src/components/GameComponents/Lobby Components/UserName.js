import React, { Component } from 'react'
import {Button , Form} from 'react-bootstrap'

export default class UserName extends Component {
    render() {
        return (
            <div>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label> Whats Your Name? </Form.Label>
                        <Form.Control value={this.props.userName} type="text" placeholder="Name" onChange={(e) => this.props.onChange(e)} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={ (e) => this.props.initUser(e)}>
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}
