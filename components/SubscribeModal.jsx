import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const SubscribeModal = ({ closeModal }) => {
  const recaptchaRef = useRef();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verify the reCAPTCHA response before submitting the form
    const recaptchaResponse = await recaptchaRef.current.executeAsync();

    try {
      // Include the recaptchaResponse in your form submission payload
      const response = await fetch('/api/mailchimp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, recaptchaResponse }),
      });

      if (response.ok) {
        // Success! Clear the form and display success message
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
        });
        setSuccessMessage('Gracias por suscribirte!');
      } else {
        // Handle the error response from Mailchimp
        const errorData = await response.json();
        console.log('Error adding contact to Mailchimp:', errorData);
      }
    } catch (error) {
      // Handle any other errors that occur during the API request
      console.log('Error submitting form to Mailchimp:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="firstName" className="font-bold mr-2 text-gray-700">
            Nombre:
          </label>
          <input
            type="text"
            name="firstName"
            className="rounded-l-sm bg-gray-100 border border-gray-300 px-2 py-1 focus:outline-none focus:ring-1 focus:ring-black-500 w-full"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Nombre *"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="lastName" className="font-bold mr-2 text-gray-700">
            Apellido:
          </label>
          <input
            type="text"
            name="lastName"
            className="rounded-l-none bg-gray-100 border border-gray-300 px-2 py-1 focus:outline-none focus:ring-1 focus:ring-black-500 w-full"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Apellido *"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="font-bold mr-2 text-gray-700">
            Correo electrónico:
          </label>
          <input
            type="email"
            name="email"
            className="rounded-l-sm bg-gray-100 border border-gray-300 px-2 py-1 focus:outline-none focus:ring-1 focus:ring-black-500 w-full"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email *"
          />
        </div>
        <div className="mb-2">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA}
            size="invisible"
          />
        </div>
        <button
          type="submit"
          className="font-bold text-xl h-12 rounded-lg bg-gray-600 text-white px-4 py-1 hover:bg-thegray focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Subscribete
        </button>
        {successMessage && <div className="text-green-600 mt-2">{successMessage}</div>}
      </form>
      <button
        type="button"
        onClick={closeModal}
        className="text-gray-500 mt-2 underline hover:text-gray-700 focus:outline-none"
      >
        Cerrar
      </button>
    </div>
  );
};

export default SubscribeModal;
