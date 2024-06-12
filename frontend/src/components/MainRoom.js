import React, { useState } from 'react';
import './sidebar.css';

const MainRoom = () => {
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

    const activityOptions = ['Football', 'Basketball', 'Volleyball', 'Picnic'];

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

    const handleAddResponsibility = () => {
        if (newResponsibilityText.trim() && newResponsibilityComplexity) {
            setNewResponsibilities([
                ...newResponsibilities,
                { text: newResponsibilityText, complexity: newResponsibilityComplexity },
            ]);
            setNewResponsibilityText('');
            setNewResponsibilityComplexity('');
        }
    };

    const handleDeleteResponsibility = (index) => {
        setNewResponsibilities(newResponsibilities.filter((_, i) => i !== index));
    };

    const handleSaveActivity = () => {
        const newActivity = {
            name: selectedActivity,
            responsibilities: newResponsibilities,
            date: activityDate,
            time: activityTime,
        };
        setActivities([...activities, newActivity]);
        setCreatingActivity(false);
        setNewResponsibilities([]);
        setSelectedActivity('');
        setActivityDate('');
        setActivityTime('');
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
        setActivityTime(activity.time);
    };

    const handleSaveEditedActivity = () => {
        setActivities(
            activities.map(activity =>
                activity.name === currentActivity.name
                    ? { ...activity, responsibilities: newResponsibilities, date: activityDate }
                    : activity
            )
        );
        setEditingActivity(false);
        setCurrentActivity(null);
    };

    return (
        <div className="dashboard" >
            <div className="sidebar" style={{
                  backgroundImage: `url(https://media.istockphoto.com/id/499753566/vector/realistic-vertical-football-soccer-field-illustration.jpg?s=612x612&w=0&k=20&c=ELS22Ba_t2A-OGmwuISIX_OW40oeIbsSszOkHfjwMQ0=), repeating-linear-gradient(to right, green, #ffffff 10px, transparent 10px 20px)`,
                  backgroundSize: 'auto', // Adjust the size to make the image auto-scale to fit
                  backgroundPosition: 'center', // Center the image within the div
                  height: '100vh',
                  
                  width: '250px'
                }}>
                <h2 style={{backgroundColor: 'black ', color: 'white', fontSize: '35px', paddingTop: '10px'}}>Your Activities</h2>
                <button className="add-activity-btn" style={{backgroundColor: 'transparent'}} onClick={handleCreateActivity}>+ Add Activity</button>
                <ul>
                    {activities.map((activity, index) => (
                        <li key={index}>
                            <button onClick={() => handleActivityClick(activity)} className="activity-btn">
                                {activity.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="main-content" >
                {!activitySelected && !creatingActivity && !editingActivity && (
                    <div className="no-activity-selected">
                        <h3 style={{fontSize: '28px'}}>No Activity Selected</h3>
                        <p style={{fontSize: '23px'}}>Select an activity or get started with a new one</p>
                        <button style={{fontSize: '28px'}} className="create-activity-btn"  onClick={handleCreateActivity}>Create New Activity</button>
                    </div>
                )}

                {creatingActivity && (
                    <div className="create-activity" >
                        <h3 style={{fontSize: '40px', color: 'green'}}>Create New Activity</h3>
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
                                <h4 style={{fontSize: '20px', textAlign: 'center', paddingTop: '10px', }}>Add Responsibilities</h4>
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
                                <button   style={{backgroundColor: 'black' }} onClick={handleAddResponsibility}>Add Responsibility</button>
                                {newResponsibilities.length > 0 && (
                                <div className='responsibility  '>
                                    <ul>
                                        {newResponsibilities.map((resp, index) => (
                                            <li key={index}>
                                                {resp.text} - Complexity: {resp.complexity}
                                                <button onClick={() => handleDeleteResponsibility(index)}>Delete</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                )}
                                <button style={{fontSize: '35px'}} onClick={handleSaveActivity}>Save Activity</button>
                            </>
                        )}
                    </div>
                )}

{activitySelected && currentActivity && !editingActivity && (
                    <div className="activity-details">
                        <h3 style={{fontSize: '28px'}}>{currentActivity.name}</h3>
                        <p style={{fontSize: '25px'}}>Date: {currentActivity.date}</p>
                        <p style={{fontSize: '25px'}}>Time: {currentActivity.time}</p>
                        <button style={{fontSize: '20px'}} onClick={handleEditActivity}>Edit Activity</button>
                        <h4 style={{fontSize: '28px'}}>Responsibilities:</h4>
                        <ul>
                            {currentActivity.responsibilities.map((resp, index) => (
                                <li  style={{fontSize: '20px'}} key={index}>{resp.text} - Complexity: {resp.complexity}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {editingActivity && (
                    <div className="edit-activity">
                        <h3>Edit Activity</h3>
                        <label>
                            Activity Date:
                            <input
                                type="date"
                                value={activityDate}
                                onChange={(e) => setActivityDate(e.target.value)}
                            />
                        </label>
                        <label>
                            Activity Time:
                            <input 
                                type="time" 
                                value={activityTime}
                                onChange={(e) => setActivityTime(e.target.value)}
                            />
                        </label>
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
                                        {resp.text} - Complexity: {resp.complexity}
                                        <button onClick={() => handleDeleteResponsibility(index)}>Delete</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        )}
                        <button style={{fontSize: '30px'}} onClick={handleSaveEditedActivity}>Save Changes</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MainRoom;
