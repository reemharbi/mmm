import React, { Component } from 'react'
import RoomsList from './RoomsList'
import firebase from './firebase';
import Header from './LobbyHeader/Header';
import UserName from './UserName';
import Game from './Game/Game';
import { Container, Grid } from 'semantic-ui-react';
import { getAllPlayers, getPlayer, createPlayer, deletePlayer, getAllRooms, getRoom, createRoom, deleteRoom } from './api'
import socketIOClient from "socket.io-client";
import endpoint from '../../../socket';
import './Lobby.css';

export default class Lobby extends Component {


    constructor(props) {
        super(props);
        this.userNameHandler = this.userNameHandler.bind(this)
        this.socket = null;

    }



    state = {
        rooms: [],
        roomsToDisplay: [],
        roomName: "",
        user: null,
        userName: '',
        currentComponent: 'user',//this is initially setting the current component to username
        role: true,
        filterContent: "",
        currentRoom: null

    }


    getAllRoomsAPI = () => {
        getAllRooms().then(res => {

            const roomsStateArray = res.data.rooms;
            this.setState({
                rooms: roomsStateArray,
                roomsToDisplay: roomsStateArray

            }
            )
        })
    }

    componentWillMount() {



        this.getAllRoomsAPI();


        console.log("i am the 'componentWi.....'")





        console.log(this.state.rooms)

    }



    // A function to handle the room adding functionality
    addRoom = (value) => {


        value.preventDefault();


        const newRoom = {
            name: this.state.roomName,
            players: [{ "_id": this.state.user._id }]

        }

        createRoom(newRoom).then(res => {
            this.setState({
                currentRoom: res.data.room,
                currentComponent: "game"
            })
            console.log(res.data.room._id)
            this.socket.emit("createNewRoom" , res.data.room._id )
            this.getAllRoomsAPI();
            this.socket.emit("createNewRoom",res.data.room._id);
            this.setState({
                roomName: "",
                currentRoom: createdRoom,
                currentComponent: "game"
            });

        })

    }

    initUser = (value) => {
        value.preventDefault();

        const newPlayer = { name: this.state.userName }

        createPlayer(newPlayer).then(res => {
            this.setState({ user: res.data.player });
            console.log(this.state.user._id);
            this.socket = socketIOClient(endpoint, { query: `userId=${this.state.user._id}` });

        });


        // changing currentComponent to the room component
        this.setState({
            currentComponent: 'room'
        });
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
    enterRoom = (roomID) => {
        console.log('room ID', roomID);

        let joinedRoom = null;
        getRoom(roomID).then(res => {
            joinedRoom = res.data.room;
        }).catch(err => {
            console.log(err)
        });
        this.setState({
            currentComponent: 'game',
            currentRoom: joinedRoom

        })
    }



    exitGame = () => {

        this.setState({
            currentComponent: 'room',
            currentRoom: null
        })
        console.log("hi, i'm exitRoom..nice to meet you", this.state.currentRoom)
    }

    roomsFilter = (e) => {
        const newFilterValue = e.target.value;

        this.setState((prevState, props) => {
            const filteredRooms = prevState.rooms.filter(room => {
                return room.name.toLowerCase().includes(newFilterValue.toLowerCase());
            });
            return {
                filterContent: newFilterValue,
                roomsToDisplay: filteredRooms
            };
        });


    }



    render() {
        const username = this.state.user && this.state.user.name
        console.log(this.state.user && this.state.user.name)
        console.log(this.state.rooms)
        // now we're checking which component to display based on currentComponent from state
        if (this.state.currentComponent === 'user') {
            return (<div>
                <UserName userName={this.state.userName} onChange={this.userNameHandler} initUser={this.initUser} />
            </div>)
        } else if (this.state.currentComponent === 'room') {
            return (
                <Container center>
                    <Grid textAlign='center' style={{ marginTop: '5rem', color: 'white', marginBottom: '5rem', fontSize: '5rem', fontFamily: 'Amatic SC, bold' }} verticalAlign='middle'>Welcome {username}! </Grid>
                    <Header roomName={this.state.roomName} onChangeAdd={this.onChangeHandler} addRoom={this.addRoom} onChangeFilter={this.roomsFilter} val={this.state.filterContent} />
                    <RoomsList rooms={this.state.roomsToDisplay} enterRoom={this.enterRoom} />
                </Container>
            )
        }

        else if (this.state.currentComponent === 'game') {

            return (<div>
                <Game role={this.state.role} exitGame={this.exitGame} />
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