import axios from 'axios';
import apiUrl from '../../../apiConfig';

// Players API calls
export const getAllPlayers = () => 
    axios({
        method: 'GET',
        url: `${apiUrl}/players`
    })
export const getPlayer = (id) => 
    axios({
        method: 'GET',
        url: `${apiUrl}/players/${id}`
    })
export const createPlayer = (player) => 
    axios.post( `${apiUrl}/players` , player)

export const updatePlayer = (id, body) => {
   return axios.patch( `${apiUrl}/players/${id}` ,body)
}
export const deletePlayer = (id) => 
    axios({
        method: 'DESTROY',
        url: `${apiUrl}/players/${id}`
    })


// Rooms API calls


export const getAllRooms = () => 
    axios({
        method: 'GET',
        url: `${apiUrl}/rooms`
    })
export const getRoom = (id) => 
    axios({
        method: 'GET',
        url: `${apiUrl}/rooms/${id}`
    })
export const createRoom = (room) => 
    axios.post( `${apiUrl}/rooms` , room)


export const deleteRoom = (id) => 
    axios({
        method: 'DESTROY',
        url: `${apiUrl}/rooms/${id}`
    })

