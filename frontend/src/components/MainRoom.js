import React, { useState } from 'react';
import './sidebar.css'

const MainRoom = () => {

    const [activity, setActivity] = useState([]);

    const [activitySelected, setactivitySelected] = useState(false);


    return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>Your activitys</h2>
        <button className="add-activity-btn">+ Add activity</button>
      </div>
      <div className="main-content">
       {!activitySelected && (<div className="no-activity-selected">
          <h3>No activity Selected</h3>
          <p>Select a activity or get started with a new one</p>
          <button className="create-activity-btn">Create new activity</button>
        </div>)}

      </div>
    </div>
  );
}

export default MainRoom;