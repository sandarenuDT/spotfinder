import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '', // New field for confirm password
        agreeToTerms: false, // New field for agreement
    });

    const [registrationSuccess, setRegistrationSuccess] = useState(false); // State to track registration success

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;
        setFormData({
            ...formData,
            [name]: fieldValue,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add validation to check if passwords match
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match. Please try again.");
            return;
        }

        // Check if the user agreed to the terms and conditions
        if (!formData.agreeToTerms) {
            alert("Please agree to the Terms and Conditions and Privacy Policy.");
            return;
        }

        try {
            // Make a POST request to save the user registration data
            const response = await axios.post('http://localhost:8070/User/users', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            // Assuming the response contains the saved user data
            const savedUser = response.data;

            // You can handle the success response here, for example, set the registrationSuccess state to true
            setRegistrationSuccess(true);

            // Clear the form inputs
            setFormData({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                agreeToTerms: false,
            });

            // You can handle the success message as needed, for example, display a success message
            console.log('Registration successful:', savedUser);
        } catch (error) {
            console.error('Error registering user:', error);
            // Handle the error, such as showing an error message to the user
        }
    };

    return (
        <div className="registration-form">
            <h2 style={{ fontWeight: 'bold' }}>Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                {registrationSuccess && (
                <div className="alert alert-success">
                    Registration successful! You can now log in.
                </div>
            )}
                <div className="form-group">
                    <label style={{ fontSize: '12px', color: 'red' }}>
                        <input
                            type="checkbox"
                            name="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onChange={handleChange}
                        />
                        I agree to their Terms and Conditions and Privacy Policy
                    </label>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Registration;