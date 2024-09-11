// PaymentDetails.js
import React, { useState } from "react";

const PaymentDetails = ({ nextStep, prevStep, handleChange, formData }) => {
  const [errors, setErrors] = useState({});

  // Luhn algorithm for credit card validation
  const validateCardNumber = (number) => {
    const regex = /^\d{13,19}$/; // Card number should be 13-19 digits long
    if (!regex.test(number)) return false;

    let sum = 0;
    let shouldDouble = false;

    // Loop through card number digits from right to left
    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number[i]);

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9; // Subtract 9 if doubling results in a number greater than 9
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0; // If total sum is divisible by 10, it's a valid card number
  };

  // Validate expiration date
  const validateExpirationDate = (date) => {
    const currentDate = new Date();
    const [month, year] = date.split("/").map(Number);
    const expirationDate = new Date(`20${year}`, month - 1); // Create expiration date object

    if (!month || !year || month < 1 || month > 12) return false; // Check valid month and year
    return expirationDate >= currentDate; // Date must be in the future
  };

  // Validate payment details
  const validate = () => {
    let validationErrors = {};

    // Card number validation
    if (!formData.cardNumber) {
      validationErrors.cardNumber = "Card number is required";
    } else if (!validateCardNumber(formData.cardNumber)) {
      validationErrors.cardNumber = "Please enter a valid card number";
    }

    // Expiration date validation (format MM/YY)
    if (!formData.expirationDate) {
      validationErrors.expirationDate = "Expiration date is required";
    } else if (!validateExpirationDate(formData.expirationDate)) {
      validationErrors.expirationDate = "Please enter a valid expiration date (MM/YY)";
    }

    return validationErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      nextStep(); // Proceed to next step if validation passes
    } else {
      setErrors(validationErrors); // Set validation errors
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Payment Details</h2>

        {/* Card Number Field */}
        <label>Card Number</label>
        <input
          type="text"
          name="cardNumber"
          onChange={handleChange("cardNumber")}
          value={formData.cardNumber}
        />
        {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}

        {/* Expiration Date Field */}
        <label>Expiration Date (MM/YY)</label>
        <input
          type="text"
          name="expirationDate"
          onChange={handleChange("expirationDate")}
          value={formData.expirationDate}
          placeholder="MM/YY"
        />
        {errors.expirationDate && <p className="error">{errors.expirationDate}</p>}

        <button type="button" onClick={prevStep}>
          Back
        </button>
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default PaymentDetails;
