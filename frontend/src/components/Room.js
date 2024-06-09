import React, { useState } from 'react';
import axios from "../api/axiosConfig";
import '../index.css';

const Room = ({ onLogout, username }) => {

    const [isCreate, setIsCreate] = useState(false);
    const [isJoin, setIsJoin] = useState(false);
    const [roomId, setRoomId] = useState('');
    const [roomName, setRoomName] = useState('');
    const [roomDescription, setRoomDescription] = useState('');

    const handleSubmitJoin = async (e) => {
        e.preventDefault();
        if (roomId.trim() === '') {
            alert("Please fill in room id");
            return;
        }
        try {
            await axios.post(`/rooms/join/${roomId}?username=${username}`);
            onJoin(roomId, username);
        } catch (error) {
            alert("Joining failed");
            setRoomId('');
            console.log(error);
        }
    };

    const handleSubmitCreate = async (e) => {
        e.preventDefault();
        if (roomName.trim() === '' || roomDescription.trim() === '') {
            alert("Please fill in both room name and description");
            return;
        }
        try {
            await axios.post('/rooms/create', {
                roomName,
                roomDescription,
                username
            });
            setIsCreate(false);
        } catch (error) {
            alert("Creating room failed");
            console.log(error);
        }
    };

    const onJoin = (roomId, username) => {
        // Handle successful room join
    };

    return (
        <div>
            <button className="logout-button" onClick={onLogout}>Logout</button>
            <div>
                <button className='create-room' onClick={() => setIsCreate(true)}>Create Room</button>
                <button onClick={() => {
                    setIsJoin(!isJoin);
                    setIsCreate(false);
                }}>
                    Join Room
                </button>
            </div>
            {isJoin && (
                <form onSubmit={handleSubmitJoin}>
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
            {isCreate && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setIsCreate(false)}>&times;</span>
                        <form onSubmit={handleSubmitCreate}>
                            <div>
                                <label>Room Name:</label>
                                <input
                                    type="text"
                                    value={roomName}
                                    onChange={(e) => setRoomName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label>Room Description:</label>
                                <input
                                    type="text"
                                    value={roomDescription}
                                    onChange={(e) => setRoomDescription(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit">Create</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Room;
