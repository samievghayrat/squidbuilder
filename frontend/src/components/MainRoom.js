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

    const activityOptions = ['Football', 'Basketball', 'Volleyball', 'Picnic'];

    const handleCreateActivity = () => {
        setCreatingActivity(true);
        setEditingActivity(false);
        setActivitySelected(false);
        setSelectedActivity('');
        setNewResponsibilities([]);
        setActivityDate('');
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
        };
        setActivities([...activities, newActivity]);
        setCreatingActivity(false);
        setNewResponsibilities([]);
        setSelectedActivity('');
        setActivityDate('');
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
        <div className="dashboard">
            <div className="sidebar">
                <h2>Your Activities</h2>
                <button className="add-activity-btn" onClick={handleCreateActivity}>+ Add Activity</button>
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
            <div className="main-content">
                {!activitySelected && !creatingActivity && !editingActivity && (
                    <div className="no-activity-selected">
                        <h3>No Activity Selected</h3>
                        <p>Select an activity or get started with a new one</p>
                        <button className="create-activity-btn" onClick={handleCreateActivity}>Create New Activity</button>
                    </div>
                )}

                {creatingActivity && (
                    <div className="create-activity">
                        <h3>Create New Activity</h3>
                        <label>
                            Select Activity Type:
                            <select value={selectedActivity} onChange={handleSelectActivity}>
                                <option value="" disabled>Select an activity</option>
                                {activityOptions.map((activity) => (
                                    <option key={activity} value={activity}>{activity}</option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Activity Date:
                            <input
                                type="date"
                                value={activityDate}
                                onChange={(e) => setActivityDate(e.target.value)}
                            />
                        </label>
                        {selectedActivity && (
                            <>
                                <h4>Add Responsibilities</h4>
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
                                    <option value="" disabled>Complexity</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                                <button onClick={handleAddResponsibility}>Add Responsibility</button>
                                <ul>
                                    {newResponsibilities.map((resp, index) => (
                                        <li key={index}>
                                            {resp.text} - Complexity: {resp.complexity}
                                            <button className="delete" onClick={() => handleDeleteResponsibility(index)}>Delete</button>
                                        </li>
                                    ))}
                                </ul>
                                <button onClick={handleSaveActivity}>Save Activity</button>
                            </>
                        )}
                    </div>
                )}

                {activitySelected && currentActivity && !editingActivity && (
                    <div className="activity-details">
                        <h3>{currentActivity.name}</h3>
                        <p>Date: {currentActivity.date}</p>
                        <button onClick={handleEditActivity}>Edit Activity</button>
                        <h4>Responsibilities:</h4>
                        <ul>
                            {currentActivity.responsibilities.map((resp, index) => (
                                <li key={index}>{resp.text} - Complexity: {resp.complexity}</li>
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
                        <ul>
                            {newResponsibilities.map((resp, index) => (
                                <li key={index}>
                                    {resp.text} - Complexity: {resp.complexity}
                                    <button onClick={() => handleDeleteResponsibility(index)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                        <button onClick={handleSaveEditedActivity}>Save Changes</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MainRoom;
