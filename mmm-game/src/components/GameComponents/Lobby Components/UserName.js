import React, { Component } from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import './UserName.css'

export default class UserName extends Component {
    render() {
      
        return (
        

<Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 600 }}>
      <Header as='p' style={{ fontSize: '5rem'}} textAlign='center'>
      What should we call you?
      </Header>
      <Form size='large'>
        <Segment stacked>
          <Form.Input value={this.props.userName} placeholder='John Doe?' onChange={(e) => this.props.onChange(e)}/>
          <Button color='blue' fluid size='large' type="submit" onClick={ (e) => this.props.initUser(e)}>
            Submit
          </Button>
        </Segment>
      </Form>
   
    </Grid.Column>
  </Grid>


        )
    }
}
