import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

import './UserName.css';

export default class UserName extends Component {
    render() {
        return (
        

<Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
      What should we call you?
      </Header>
      <Form size='large'>
        <Segment stacked>
          <Form.Input value={this.props.userName} fluid icon='user' iconPosition='left' placeholder='John Doe?' onChange={(e) => this.props.onChange(e)}/>
         

          <Button color='teal' fluid size='large' type="submit" onClick={ (e) => this.props.initUser(e)}>
            Submit
          </Button>
        </Segment>
      </Form>
   
    </Grid.Column>
  </Grid>


                // <Form>
                //     <Form.Group controlId="formBasicEmail">
                //         <Form.Label> Whats Your Name? </Form.Label>
                //         <Form.Control value={this.props.userName} type="text" placeholder="Name" onChange={(e) => this.props.onChange(e)} />
                //     </Form.Group>
                //     <Button variant="primary" type="submit" onClick={ (e) => this.props.initUser(e)}>
                //         Submit
                //     </Button>
                // </Form>
                // </div>
        )
    }
}
