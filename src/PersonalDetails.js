// PersonalDetails.js
import React, { useState } from "react";

const PersonalDetails = ({ nextStep, handleChange, formData }) => {
  const [errors, setErrors] = useState({});

  // Validate the form fields
  const validate = () => {
    let validationErrors = {};
    
    // Regex for name (alphabets and spaces only)
    const nameRegex = /^[A-Za-z\s]+$/;
    
    // Name validation: Required and only alphabets and spaces
    if (!formData.name) {
      validationErrors.name = "Name is required";
    } else if (!nameRegex.test(formData.name)) {
      validationErrors.name = "Name can only contain letters";
    }

    // Regex for valid email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Email validation: Required and must be valid
    if (!formData.email) {
      validationErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      validationErrors.email = "Please enter a valid email address";
    }

    return validationErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      nextStep(); // Proceed to the next step if validation is successful
    } else {
      setErrors(validationErrors); // Set validation errors
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Personal Details</h2>
        
        {/* Name Field */}
        <label>Name</label>
        <input
          type="text"
          name="name"
          onChange={handleChange("name")}
          value={formData.name}
        />
        {errors.name && <p className="error">{errors.name}</p>} {/* Display error if name is invalid */}

        {/* Email Field */}
        <label>Email</label>
        <input
          type="text"
          name="email"
          onChange={handleChange("email")}
          value={formData.email}
        />
        {errors.email && <p className="error">{errors.email}</p>} {/* Display error if email is invalid */}

        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default PersonalDetails;
