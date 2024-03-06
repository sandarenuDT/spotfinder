import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MyAccount = () => {         
    const { email } = useParams();
    const [userData, setUserData] = useState(null);
    const [editableField, setEditableField] = useState(null); // Track the editable field
    const [editedValue, setEditedValue] = useState(''); // Track the edited value
   
    useEffect(() => {
        // Check if user data is already stored in local storage
        const storedUserData = localStorage.getItem('userData');

        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        } else {
            axios.get('http://localhost:8070/User/users')
                .then((response) => {
                    const users = response.data;
                    const user = users.find((user) => user.email === email);

                    if (user) {
                        setUserData(user);
                        // Store user data in local storage
                        localStorage.setItem('userData', JSON.stringify(user));
                    } else {
                        console.error('User not found');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [email]);

    const handleEditField = (field) => {
        setEditableField(field);
        // Initialize edited value with the current value
        setEditedValue(userData[field]);
    };

    const handleChange = (e) => {
        const { value } = e.target;
        setEditedValue(value);
    };

    const saveEditedValue = () => {
        if (editableField === null) {
            return; // No field is being edited
        }

        const updatedUserData = { ...userData };
        updatedUserData[editableField] = editedValue;

        // Make a PATCH request to update the user data for the edited field
        axios
            .patch(`http://localhost:8070/User/users/${userData._id}`, {
                [editableField]: editedValue,
            })
            .then((response) => {
                const updatedUser = response.data;
                // Update the user data with the edited value
                setUserData(updatedUser);
                // Store the updated user data in local storage
                localStorage.setItem('userData', JSON.stringify(updatedUser));
                // Clear editable field
                setEditableField(null);
                setEditedValue('');
            })
            .catch((error) => {
                console.error('Error saving user data:', error);
            });
    };
   

    return (
        <div className="my-account">
            <h2>My Account</h2>
            {userData ? (
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <td><strong>Name:</strong></td>
                            <td>{userData.name}</td>
                            <td>
                                {editableField === 'name' ? (
                                    <React.Fragment>
                                        <input
                                            type="text"
                                            value={editedValue}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                        <button onClick={saveEditedValue} className="btn btn-primary">Save</button>
                                    </React.Fragment>
                                ) : (
                                    <button onClick={() => handleEditField('name')} className="btn btn-info">Edit</button>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Email:</strong></td>
                            <td>{userData.email}</td>
                            <td>
                                {editableField === 'email' ? (
                                    <React.Fragment>
                                        <input
                                            type="email"
                                            value={editedValue}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                        <button onClick={saveEditedValue} className="btn btn-primary">Save</button>
                                    </React.Fragment>
                                ) : (
                                    <button onClick={() => handleEditField('email')} className="btn btn-info">Edit</button>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Mobile Number:</strong></td>
                            <td>{userData.mobilenumber}</td>
                            <td>
                                {editableField === 'mobilenumber' ? (
                                    <React.Fragment>
                                        <input
                                            type="text"
                                            value={editedValue}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                        <button onClick={saveEditedValue} className="btn btn-primary">Save</button>
                                    </React.Fragment>

                                ) : (
                                    <button onClick={() => handleEditField('mobilenumber')} className="btn btn-info">Edit</button>
                                )}
                            </td>
                            
                        </tr>
                        <tr>
                            <td><strong>Vehicle Number:</strong></td>
                            <td>{userData.vehiclenumber}</td>
                            <td>
                                {editableField === 'vehiclenumber' ? (
                                    <React.Fragment>
                                        <input
                                            type="text"
                                            value={editedValue}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                        <button onClick={saveEditedValue} className="btn btn-primary">Save</button>
                                    </React.Fragment>
                                ) : (
                                    <button onClick={() => handleEditField('vehiclenumber')} className="btn btn-info">Edit</button>
                                )}
                            </td>
                        </tr>
                        {/*
                        <tr>
                            <td><strong>Parking Place:</strong></td>
                            <td>{userData.parkingPlaceId}</td>
                        </tr>
                        <tr>
                            <td><strong>Vehicle In Time:</strong></td>
                            <td>{userData.vehicleintime}</td>
                            <td>
                                {editableField === 'vehicleintime' ? (
                                    <React.Fragment>
                                        <input
                                            type="text"
                                            value={editedValue}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                        <button onClick={saveEditedValue} className="btn btn-primary">Save</button>
                                    </React.Fragment>
                                ) : (
                                    <button onClick={() => handleEditField('vehicleintime')} className="btn btn-info">Edit</button>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Vehicle Out Time:</strong></td>
                            <td>{userData.vehicleouttime}</td>
                            <td>
                                {editableField === 'vehicleouttime' ? (
                                    <React.Fragment>
                                        <input
                                            type="text"
                                            value={editedValue}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                        <button onClick={saveEditedValue} className="btn btn-primary">Save</button>
                                    </React.Fragment>
                                ) : (
                                    <button onClick={() => handleEditField('vehicleouttime')} className="btn btn-info">Edit</button>
                                )}
                            </td>
                        </tr>*/}
                        {/* Add more rows for additional fields */}
                    </tbody>
                </table>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default MyAccount;
