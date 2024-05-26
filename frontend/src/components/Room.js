import React, { useState } from 'react';
import axios from "../api/axiosConfig"
import '../index.css'

const Room = ({onLogout, username}) => {

    const [isCreate, setIsCreate] = useState(false);
    const [isJoin, setIsJoin] = useState(false);
    const [roomId, setRoomId] = useState('');

    const handleSubmit = async (e) => {
        if(roomId.trim = ''){
            alert("Please fill in room id");
            return;
        }
        e.preventDefault();
        try{
            await axios.post(`/rooms/join/${roomId}?username=${username}`);
            onJoin(roomId, username);
        } catch(error){
            alert("jpining failed");
            setRoomId('');
            console.log(error);
            return;
        }
    }

    const onJoin = (roomId, username) => {

    }


    return (
        <div>
            <button className="logout-button" onClick={onLogout}>Logout</button>
            {!(false) && (
                <div>
                    <button className='create-room' onClick={() => setIsCreate(true)}>Create Room</button>
                    <button onClick={() => {
                        setIsJoin(!isJoin);
                        setIsCreate(false);
                        }}>
                            Join Room</button>
                </div>
                )}
            {isJoin && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Room Id:</label>
                        <input
                            type="text"
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Join</button>
                </form>
            )}
        </div>
    );
};

export default Room;