import React, { Component } from 'react'
import RoomsList from './RoomsList'
import firebase from './firebase';
import Header from './LobbyHeader/Header';
import UserName from './UserName';
import Game from './Game/Game';
import RoomFilter from './LobbyHeader/RoomFilter';
import { Container } from 'semantic-ui-react';




export default class Lobby extends Component {


    constructor(props) {
        super(props);
        this.userNameHandler = this.userNameHandler.bind(this)
    }



    state = {
        rooms: [],
        roomsToDisplay: [],
        roomName: "",
        userName: '',
        currentComponent: 'user' ,//this is initially setting the current component to username
        role: true,
        filterContent: ""

    }


    componentWillMount() {
        const roomsRef = firebase.database().ref('rooms');
        roomsRef.on('value', snapshot => {
            const roomsState = snapshot.val();


            let roomsStateArray = [];
            for (let room in roomsState) {
                roomsStateArray.push({
                    roomName: roomsState[room].name,
                    playerCount: roomsState[room].playerCount
                })
            }
            console.log("i am the 'componentWi.....'")

            this.setState({
                rooms: roomsStateArray,
                roomsToDisplay: roomsStateArray

            }
            )


        })

        console.log(this.state.rooms)

    }



    // A function to handle the room adding functionality
    addRoom = (value) => {


        value.preventDefault();
        const roomsRef = firebase.database().ref('rooms');
        const newRoom = { name: this.state.roomName, playerCount: 0 }
        roomsRef.push(newRoom);

        this.setState({
            roomName: ""
        })

    }

    initUser = (value) => {
        value.preventDefault();

        const playerRef = firebase.database().ref('players');
        const newUser = { name: this.state.userName }
        playerRef.push(newUser);


        // changing currentComponent to the room component
        this.setState({
            currentComponent: 'room'
        })
        console.log('change the component...')

    }

    userNameHandler = (e) => {
        this.setState({
            userName: e.target.value
        })
        console.log('*', this.state.userName)
    }


    // The function that changes the state to allow the user to type in the text field.
    onChangeHandler = (e) => {
        this.setState({
            roomName: e.target.value
        })
        console.log(this.state.roomName);
    }

    //Changes the component to enter a room
    enterRoom = () => {
        this.setState({
            currentComponent: 'game'

        })
    }



    exitGame = () => {

        this.setState({
            currentComponent: 'room'
        })
    }

    roomsFilter = (e) => {
      const  newFilterValue = e.target.value;
        
        this.setState((prevState, props) => {
            const filteredRooms = prevState.rooms.filter(room => {
                return room.roomName.toLowerCase().includes(newFilterValue.toLowerCase());
            });
            return {
                filterContent: newFilterValue,
                roomsToDisplay: filteredRooms
            };
        });
        

    }



    render() {

        console.log(this.state.rooms)
        // now we're checking which component to display based on currentComponent from state
        if (this.state.currentComponent === 'user') {
            return (<div>
                <UserName userName={this.state.userName} onChange={this.userNameHandler} initUser={this.initUser} />
            </div>)
        } else if (this.state.currentComponent === 'room') {
            return (
                <Container center>
                    <Header roomName={this.state.roomName} onChangeAdd={this.onChangeHandler} addRoom={this.addRoom}  onChangeFilter={this.roomsFilter} val={this.state.filterContent}/>
                    {/* <AddRoom roomName={this.state.roomName} onChange={this.onChangeHandler} addRoom={this.addRoom} />
                    <RoomFilter onChange={this.roomsFilter} val={this.state.filterContent}/> */}
                    <RoomsList rooms={this.state.roomsToDisplay} enterRoom={this.enterRoom} />
                    </Container>
            )
        } 
        
        else if (this.state.currentComponent === 'game'){

           return( <div>
                <Game role={this.state.role} exitGame= {this.exitGame}/>
            </div>
           )
        }
        
        
        
        
        
        else {
            return (
                <div>loading</div>
            )
        }





    }
}