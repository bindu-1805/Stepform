// StepForm.js
import React, { useState } from "react";
import PersonalDetails from "./PersonalDetails";
import AddressDetails from "./AddressDetails";
import PaymentDetails from "./PaymentDetails";
import Confirmation from "./Confirmation";

const StepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    cardNumber: "",
    expirationDate: "",
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      address: "",
      city: "",
      cardNumber: "",
      expirationDate: "",
    });
    setStep(1);
  };

  // Handle form submission and reset the form
  const handleSubmit = () => {
    alert("Form Submitted Successfully!");
    resetForm(); // Reset the form after submission
  };

  switch (step) {
    case 1:
      return (
        <PersonalDetails
          nextStep={nextStep}
          handleChange={handleChange}
          formData={formData}
          resetForm={resetForm}
        />
      );
    case 2:
      return (
        <AddressDetails
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          formData={formData}
        />
      );
    case 3:
      return (
        <PaymentDetails
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          formData={formData}
        />
      );
    case 4:
      return (
        <Confirmation
          formData={formData}
          prevStep={prevStep}
          handleSubmit={handleSubmit} // Submit and automatically reset
        />
      );
    default:
      return null;
  }
};

export default StepForm;
