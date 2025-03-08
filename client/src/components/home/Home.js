import React, { useState, useContext} from 'react'
import "./Home.css";
import { UserContext } from "../../UserContext";
import { useHistory,  Redirect } from "react-router-dom";
import serverURL from '../../constant'
const axios = require('axios');

const Home = () => {
    // eslint-disable-next-line
    const { user, setUser } = useContext(UserContext);
    const [room_id, setRoom_id] = useState('');
    const [error, setError] = useState('')

    const joinRoom = async (e) => {
        e.preventDefault();

        const options = {
            url: `http://${serverURL}/join_room`,
            method: 'POST',
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                room_id
            }
        };

        axios(options)
            .then(res => {
                console.log(res.data);
                if (res.data.err){
                    setError(res.data.err);
                }else if (res.data.updatedRoom){
                    browserHistory.push('/play/' + room_id)
                    console.log('bye');
                }
            });

    }
    
    //Programitically navigate Using React-Router-Dom
    const browserHistory = useHistory();

    //Function to call server and get new Room id 
    const genereateUniqueID = () => {
        axios.get(`http://${serverURL}/create_room`).then(res => {
            console.log(res,'data')
            browserHistory.push('/play/' + res.data.roomId)
        })
    }

    if (user === null  ){
        return <Redirect to="/nickname"/>
    }

    return (
        <div className="home-container">
            Hello {user ? user.name : ''} 😀
            <div className="error" style={{display: !error?'none':'flex'}} >{error}</div>
            <form onSubmit={joinRoom} id="room-form">
                <input
                    type="text"
                    value={room_id}
                    onChange={e => { setError(''); setRoom_id(e.target.value) }}
                    id="join Room"
                    placeholder='Enter Room ID' />
                <button className="input-button">Join Room</button>
            </form>            
            <div>OR</div>
            <button className="input-button" onClick={genereateUniqueID}>Create Room</button>
        </div>
    )
}

export default Home
