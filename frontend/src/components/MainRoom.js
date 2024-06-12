import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "../api/axiosConfig";
import './sidebar.css';

const MainRoom = ({username, onLogout}) => {

    const [activities, setActivities] = useState([]);
    const [activitySelected, setActivitySelected] = useState(false);
    const [creatingActivity, setCreatingActivity] = useState(false);
    const [editingActivity, setEditingActivity] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState('');
    const [newResponsibilities, setNewResponsibilities] = useState([]);
    const [newResponsibilityText, setNewResponsibilityText] = useState('');
    const [newResponsibilityComplexity, setNewResponsibilityComplexity] = useState('');
    const [currentActivity, setCurrentActivity] = useState(null);
    const [activityDate, setActivityDate] = useState('');
    const [activityTime, setActivityTime] = useState('');
    const [members, setMembers] = useState([]);

    const { id: roomId } = useParams();

    const activityOptions = ['Football', 'Basketball', 'Volleyball', 'Picnic'];

    useEffect(() => {
        console.log('room id is: ', roomId);
        console.log("username: ", username);
        axios.get(`/rooms/get/${roomId}`)
          .then(response => {
            const room = response.data;
            setActivities(room.activities ?? []);
            setMembers(room.members ?? []);
          })
          .catch(error => {
            console.error('There was an error fetching the movies!', error);
          });
      }, []);

    const handleCreateActivity = () => {
        setCreatingActivity(true);
        setEditingActivity(false);
        setActivitySelected(false);
        setSelectedActivity('');
        setNewResponsibilities([]);
        setActivityDate('');
        setActivityTime('');
    };

    const handleSelectActivity = (event) => {
        setSelectedActivity(event.target.value);
    };

    const handleAddResponsibility = async () => {
        if (newResponsibilityText.trim() && newResponsibilityComplexity) {
            setNewResponsibilities([
                ...newResponsibilities,
                { responsibility: newResponsibilityText, complexity: newResponsibilityComplexity },
            ]);

            setNewResponsibilityText('');
            setNewResponsibilityComplexity('');
        }
    };

    const handleDeleteResponsibility = (index) => {
        setNewResponsibilities(newResponsibilities.filter((_, i) => i !== index));
    };

    const handleSaveActivity = async () => {
        const dateTimeStr = `${activityDate}T${activityTime}`;
        const newDate = new Date(dateTimeStr);
        const date = newDate.getTime();
        console.log(activities.length)
        const newActivity = {
            key: activities.length,
            name: selectedActivity,
            responsibilities: newResponsibilities,
            date: date,
        };
        console.log(newActivity);
        try {
            await axios.post(`/rooms/add/activity/${roomId}`, newActivity);
            console.log("activity was added successfully");
        } catch (error) {
            console.log("SOMETHING WENT WRONG WHEN ADDING ACTIVITY: ", error);
        }
        setActivities([...activities, newActivity]);
        setCreatingActivity(false);
        setNewResponsibilities([]);
        setSelectedActivity('');
        // setActivityDate('');
        // setActivityTime('');
    };

    const handleEditActivity = () => {
        setEditingActivity(true);
        setCreatingActivity(false);
    };

    const handleActivityClick = (activity) => {
        setCurrentActivity(activity);
        setNewResponsibilities(activity.responsibilities);
        setActivitySelected(true);
        setEditingActivity(false);
        setCreatingActivity(false);
        setSelectedActivity(activity.name);
        setActivityDate(activity.date);
    };

    const handleSaveEditedActivity = async () => {
        console.log("current activ: ", currentActivity)
        // const activityTime1 = activityTime ?? 0;
        // const dateTimeStr = `${activityDate1}T${activityTime1}`;
        // const newDate = new Date(dateTimeStr);
        // const date = newDate.getTime();
        setActivities(
            activities.map(activity =>
                activity.key === currentActivity.key
                    ? { ...activity, responsibilities: newResponsibilities }
                    : activity
            )
        );
        const sometActivity = { ...currentActivity, responsibilities: newResponsibilities };
        console.log(sometActivity);
        try {
            await axios.put(`rooms/change/activity/${roomId}?key=${currentActivity.key}`, sometActivity);
            console.log("was changed successfully");
        } catch (error) {
            console.log("something went wrong when changing activity", error);
        }
        setEditingActivity(false);
        setCurrentActivity(null);
    };

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const randomalgorithm = async () => {

        const responsibilities = currentActivity.responsibilities;
        responsibilities.sort((a, b) => a.complexity - b.complexity);
    
        let scores = members.map(member => ({ name: member, score: 0, responsibilities: [] }));
    
        shuffleArray(scores);
    
        for (let i = 0; i < responsibilities.length; i++) {

            let memberIndex = i % scores.length;
            scores[memberIndex].score += responsibilities[i].complexity;
            scores[memberIndex].responsibilities.push(responsibilities[i].title);
            responsibilities[i].username = members[memberIndex];
    
            if ((i + 1) % scores.length === 0) {
                scores.sort((a, b) => a.score - b.score);
            }
        }
        console.log(responsibilities);
        setActivities(
            activities.map(activity =>
                activity.key === currentActivity.key
                    ? { ...activity, responsibilities: responsibilities}
                    : activity
            )
        )
        const sometActivity = { ...currentActivity, responsibilities: responsibilities};
        console.log(sometActivity);
        try {
            await axios.put(`rooms/change/activity/${roomId}?key=${currentActivity.key}`, sometActivity);
            console.log("was changed successfully");
        } catch(error){
            console.log("something went wrong when changing activity", error);
        }

        console.log(scores);
        return scores;
    }
    const [isLogin, setIsLogin] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
      
    };
    return (
        <div className="dashboard" >
            <button style={{fontSize: '25px', width: 'auto', height:'auto'}} className="logout-button" onClick={onLogout}>Logout</button>
            <div className="sidebar" style={{
                backgroundSize: 'auto',
                backgroundPosition: 'center',
                height: '100vh',
                background: 'linear-gradient(to bottom, green 40%, white 120%)',
                width: '250px'
            }}>
                <button
                    style={{ fontSize: '35px', paddingTop: '10px', backgroundColor: '#02590F', width: '290px', textAlign: 'center' }}
                    onClick={() => { /* Add your event handler code here */ }}
                    className="activity-btn"
                >
                    Members
                </button>                            
                <h2 style={{ fontSize: '35px', paddingTop: '10px', backgroundColor: '#02590F', width: '290px', textAlign: 'center' }}>Your Activities</h2>
                <button className="add-activity-btn" style={{ backgroundColor: 'transparent' }} onClick={handleCreateActivity}>+ Add Activity</button>
                <ul>
                    {activities.map((activity, index) => (
                        <li key={index}>
                            <button style={{ backgroundColor: 'transparent', textAlign: 'start' }} onClick={() => handleActivityClick(activity)} className="activity-btn">
                                {activity.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="main-content" >
                {!activitySelected && !creatingActivity && !editingActivity && (
                    <div className="no-activity-selected">
                        <h3 style={{ fontSize: '28px' }}>No Activity Selected</h3>
                        <p style={{ fontSize: '23px' }}>Select an activity or get started with a new one</p>
                        <button style={{ fontSize: '28px' }} className="create-activity-btn" onClick={handleCreateActivity}>Create New Activity</button>
                    </div>
                )}

                {creatingActivity && (
                    <div className="create-activity" >
                        <h3 style={{ fontSize: '40px', color: 'green' }}>Create New Activity</h3>
                        <label>

                            <select value={selectedActivity} onChange={handleSelectActivity}>
                                <option value="" disabled>Select an activity</option>
                                {activityOptions.map((activity) => (
                                    <option key={activity} value={activity}>{activity}</option>
                                ))}
                            </select>
                        </label>
                        <label>
                            <input
                                type="date"
                                value={activityDate}
                                onChange={(e) => setActivityDate(e.target.value)}
                            />

                            <input
                                type="time"
                                value={activityTime}
                                onChange={(e) => setActivityTime(e.target.value)

                                }

                            />
                        </label>
                        {selectedActivity && (
                            <>
                                <h4 style={{ fontSize: '20px', textAlign: 'center', paddingTop: '10px', }}>Add Responsibilities</h4>
                                <input
                                    type="text"
                                    value={newResponsibilityText}
                                    onChange={(e) => setNewResponsibilityText(e.target.value)}
                                    placeholder="write a responsibility"
                                />
                                <select
                                    value={newResponsibilityComplexity}
                                    onChange={(e) => setNewResponsibilityComplexity(e.target.value)}
                                >
                                    <option value="" disabled>Complexity</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                                <button style={{ backgroundColor: 'black' }} onClick={handleAddResponsibility}>Add Responsibility</button>
                                {newResponsibilities.length > 0 && (

                                <div className='responsibility  '>
                                    <ul>
                                        {newResponsibilities.map((resp, index) => (
                                            <li key={index}>
                                                {resp.responsibility} - Complexity: {resp.complexity} - Assigned to: {resp.username ?? "none"}
                                                <button onClick={() => handleDeleteResponsibility(index)}>Delete</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                )}
                                <button style={{ fontSize: '35px' }} onClick={handleSaveActivity}>Save Activity</button>
                            </>
                        )}
                    </div>
                )}

                {activitySelected && currentActivity && !editingActivity && (
                    <div className="activity-details">
                        <h3 style={{ fontSize: '28px' }}>{currentActivity.name}</h3>
                        <p style={{ fontSize: '25px' }}>Date: {(new Date(currentActivity.date)).toDateString()}</p>
                        <p style={{ fontSize: '25px' }}>Time: {(new Date(currentActivity.date)).toLocaleTimeString()}</p>
                        <button style={{ fontSize: '20px' }} onClick={handleEditActivity}>Edit Activity</button>
                        <h4 style={{ fontSize: '28px' }}>Responsibilities:</h4>
                        <ul>
                            {currentActivity.responsibilities.map((resp, index) => (
                                <li  style={{fontSize: '20px'}} key={index}>{resp.responsibility} - Complexity: {resp.complexity} - Assigned to: {resp.username ?? "none"}</li>
                            ))}
                        </ul>
                        <button type="submit" onClick={randomalgorithm}>Distribute responsibilities</button>
                    </div>
                )}

                {editingActivity && (
                    <div className="edit-activity">
                        <h3>Edit Activity</h3>
                        <h4>Edit Responsibilities</h4>
                        <input
                            type="text"
                            value={newResponsibilityText}
                            onChange={(e) => setNewResponsibilityText(e.target.value)}
                            placeholder="Responsibility"
                        />
                        <select
                            value={newResponsibilityComplexity}
                            onChange={(e) => setNewResponsibilityComplexity(e.target.value)}
                        >
                            <option id="complexity" value="" disabled>Complexity</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                        <button onClick={handleAddResponsibility}>Add Responsibility</button>
                        {newResponsibilities.length > 0 && (
                        <div className='responsibility  '>
                            <ul>
                                {newResponsibilities.map((resp, index) => (
                                    <li key={index}>
                                        {resp.responsibility} - Complexity: {resp.complexity} - Assigned to: {resp.username ?? "none"}
                                        <button onClick={() => handleDeleteResponsibility(index)}>Delete</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        )}
                        <button style={{ fontSize: '30px' }} onClick={handleSaveEditedActivity}>Save Changes</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MainRoom;
