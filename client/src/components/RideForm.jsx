import React, { useState } from 'react';
import avatar from '../user.png';

const RideForm = () => {
  const [formData, setFormData] = useState({
    start: '',
    destination: '',
    startTime: '',
  });

  const [usersArray, setUsersArray] = useState([]);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    
    try {
      const response = await fetch('https://citypulse.onrender.com/api/ride', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...formData,userToken:localStorage.getItem("customToken")}),
      });

      const data = await response.json();
      console.log(data); // Handle the response as needed

      // Optionally, update state or perform other actions based on the response
    } catch (error) {
      console.error('Error submitting ride information:', error);
    }
  };

  const handleFind = async () => {
    // Call your backend API to find matching users
    try {
      const response = await fetch('https://citypulse.onrender.com/api/findRide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userToken: localStorage.getItem("customToken") }),
      });

      const data = await response.json();
      console.log(data); // Handle the response as needed

      if (data.matchingUsers) {
        setUsersArray(data.matchingUsers);
        setError('');
      } else {
        setUsersArray([]);
        setError('No matching users found.');
      }
    } catch (error) {
      console.error('Error finding users:', error);
      setError('An error occurred while finding users.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-inherit rounded  w-full h-full">
      <h2 className="text-2xl font-semibold mb-4">Ride Information</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="start">
          Start
        </label>
        <input
          type="text"
          id="start"
          name="start"
          value={formData.start}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="destination">
          Destination
        </label>
        <input
          type="text"
          id="destination"
          name="destination"
          value={formData.destination}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startTime">
          Start Time
        </label>
        <input
          type="text"
          id="startTime"
          name="startTime"
          value={formData.startTime}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue w-50%"
        >
          Submit
        </button>
        <button
          onClick={handleFind}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:shadow-outline-green w-50%"
        >
          Find
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {usersArray.length > 0 && (
        <div className="max-h-72">
          {/* Set max height and add overflow-y-auto to create a vertical scrollbar */}
          <h3 className="text-lg font-semibold mb-2">Matching Users</h3>
          <div className="">
            {usersArray.map((user) => (
              <div key={user._id} className="bg-white rounded-lg  shadow-md flex flex-row w-full border border-black">
                <img
                  src={user.userImage || avatar} // Replace with the actual property containing the image URL
                  alt={user.username}
                  className="w-1/3 h-24 object-cover object-center"
                />
                <div className="p-4">
                  <h4 className="text-xl font-semibold mb-2">{user.username}</h4>
                  <p className="text-gray-600 mb-2">{user.contact}</p>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RideForm;
