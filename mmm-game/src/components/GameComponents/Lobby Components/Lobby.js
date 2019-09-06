import React, { Component } from 'react'
import RoomsList from './RoomsList'
import firebase from './firebase';
import AddRoom from './AddRoom';
import UserName from './UserName';



export default class Lobby extends Component {


    constructor (props){
        super(props);
        this.userNameHandler = this.userNameHandler.bind(this)
    }



    state = {
        rooms: [],
        roomsToDisplay: [],
        roomName: "",
        userName: '',
        currentComponent: null
    }


    componentWillMount(){
        const roomsRef = firebase.database().ref('rooms');
        roomsRef.on('value' , snapshot => {
            const roomsState = snapshot.val();


            let roomsStateArray = [];
            for(let room in roomsState){
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

                this.setState({
                    currentComponent: <div>
                        <UserName userName={this.state.userName} onChange={this.userNameHandler} initUser={this.initUser} />
                </div>
                })
        })

    }



// A function to handle the room adding functionality
    addRoom = (value) => {


        value.preventDefault();
        const roomsRef = firebase.database().ref('rooms');
        const newRoom = {name: this.state.roomName, playerCount: 0}
        roomsRef.push(newRoom);

        this.setState({
            roomName: ""
        })

    }

    initUser = (value) => {
        value.preventDefault();

        this.setState({
            currentComponent: <div>
            <AddRoom roomName={this.state.roomName} onChange={this.onChangeHandler} addRoom={this.addRoom}/>
            <RoomsList rooms={this.state.rooms} />
        </div>
        })
        console.log('change the component...')

    }

    userNameHandler = (e) => {
        this.setState({
            userName: e.target.value
        })
        console.log(this.state.userName)
    }

    
// The function that changes the state to allow the user to type in the text field.
    onChangeHandler = (e) => {
        this.setState({
            roomName: e.target.value
        })
        console.log(this.state.roomName);
    }

    render() {
        return (
            // <div>
            //     <UserName userName={this.state.userName} initUser={this.initUser} onChange={this.userNameHandler}/>
            // </div>
            <div>
                {this.state.currentComponent}
            </div>
        //     <div>
        //     <AddRoom roomName={this.state.roomName} onChange={this.onChangeHandler} addRoom={this.addRoom}/>
        //     <RoomsList rooms={this.state.rooms} />
        // </div>
        )
    }
}
