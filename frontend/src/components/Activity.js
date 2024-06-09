import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';

const Activity = ({ username }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [activityName, setActivityName] = useState('');
  const [activityDescription, setActivityDescription] = useState('');

  const handleStartTimeChange = (date) => setStartDate(date);
  const handleEndTimeChange = (date) => setEndDate(date);
  const handleActivityNameChange = (e) => setActivityName(e.target.value);
  const handleActivityDescriptionChange = (e) => setActivityDescription(e.target.value);

  const handleSubmitActivity = async (e) => {
    e.preventDefault();
    if (activityName.trim() === '' || !startDate || !endDate) {
      alert("Please fill in all fields and select both start and finish times");
      return;
    }

    // Validation check: Ensure finish time is after start time
    if (endDate < startDate) {
      alert("Finish time cannot be before start time");
      return;
    }

    try {
      const activityData = {
        name: activityName,
        description: activityDescription,
        startTime: startDate.toISOString(), // Convert to ISO format for server
        endTime: endDate.toISOString(),
        username,
      };

      const response = await fetch('/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activityData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create activity: ${response.statusText}`);
      }

      // Handle successful activity creation (e.g., clear form or redirect)
      setActivityName('');
      setActivityDescription('');
      setStartDate(new Date());
      setEndDate(null);
      alert("Activity created successfully!");
    } catch (error) {
      alert("Failed to create activity");
      console.error(error);
    }
  };

  return (
    <div className="activity-form">
      <h2>Create Activity</h2>
      <form onSubmit={handleSubmitActivity}>
        <div>
          <label htmlFor="activity-name">Activity Name:</label>
          <input
            type="text"
            id="activity-name"
            value={activityName}
            onChange={handleActivityNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="activity-description">Description:</label>
          <textarea
            id="activity-description"
            value={activityDescription}
            onChange={handleActivityDescriptionChange}
            required
          />
        </div>
        <div>
          <h2>Schedule</h2>
          <div className="time-pickers">
            <div>
              <label htmlFor="start-time">Start Time:</label>
              <DateTimePicker
                onChange={handleStartTimeChange}
                value={startDate}
                timeFormat="HH:mm"
                autoClose={true} // Add this prop

              />
            </div>
           
          
          </div>
        </div>
        <button type="submit">Create Activity</button>
      </form>
    </div>
  );
};

export default Activity;