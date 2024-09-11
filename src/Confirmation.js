// Confirmation.js
import React from "react";

const Confirmation = ({ formData, prevStep, handleSubmit }) => {
  const { name, email, address, city, cardNumber, expirationDate } = formData;

  return (
    <div className="container">
      <form>
        <h2>Confirmation</h2>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Address:</strong> {address}</p>
        <p><strong>City:</strong> {city}</p>
        <p><strong>Card Number:</strong> {cardNumber}</p>
        <p><strong>Expiration Date:</strong> {expirationDate}</p>

        <button type="button" onClick={prevStep}>
          Back
        </button>
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Confirmation;
