import React, { Component } from 'react'
import { Button, Form, Grid, Header } from 'semantic-ui-react'
import './UserName.css'

export default class UserName extends Component {
    render() {
      
        return (
<div class="area" >
<ul class="circles">
<li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
          </ul>





<Grid textAlign='center' style={{ height: '90vh'}} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 600 }}>
      <Header as='p' style={{ fontSize: '5rem', marginBottom: '10rem'}} textAlign='center'>
      What should we call you?
      </Header>
      <Form size='large'>
          <Form.Input value={this.props.userName} placeholder='John Doe?' onChange={(e) => this.props.onChange(e)}/>
          <Button color='blue' size='large' type="submit" onClick={ (e) => this.props.initUser(e)}>
            Enter
          </Button>
      </Form>
   
    </Grid.Column>
  </Grid>
  
 
  </div >

        )
    }
}
