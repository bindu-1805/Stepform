import React, { useState } from "react";

const AddressDetails = ({ nextStep, prevStep, handleChange, formData }) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    let validationErrors = {};
    if (!formData.address) validationErrors.address = "Address is required";
    if (!formData.city) validationErrors.city = "City is required";
    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      nextStep();
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Address Details</h2>
        <label>Address</label>
        <input
          type="text"
          name="address"
          onChange={handleChange("address")}
          value={formData.address}
        />
        {errors.address && <p>{errors.address}</p>}

        <label>City</label>
        <input
          type="text"
          name="city"
          onChange={handleChange("city")}
          value={formData.city}
        />
        {errors.city && <p>{errors.city}</p>}

        <button type="button" onClick={prevStep}>
          Back
        </button>
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default AddressDetails;
