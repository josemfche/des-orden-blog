import React, { useState } from 'react';

const NewsletterBanner = () => {
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

    try {
      const response = await fetch('/api/mailchimp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
    <div className="bg-white border border-gray-300 shadow-lg mx-6 my-12 p-4 rounded-lg py-12">
      <div className="flex flex-col md:flex-row justify-around items-center py-6">
        <div className="lg:mb-0 flex flex-col items-center justify-center lg:justify-start lg:items-left lg:text-left text-center">
          <div className="text-2xl lg:text-4xl font-normal mb-4">Suscribete al newsletter</div>
          <div className="w-full lg:text-xl mb-2 lg:text-left">Suscribete al newsletter</div>
        </div>
        <div className="flex flex-col justify-center">
          <form className="flex justify-center" onSubmit={handleSubmit}>
            <div className="lg:flex-col flex flex-col px-8 w-3/4">
              <div className="flex flex-row">
                <div className="mb-2 lg:w-auto w-full">
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
                <div className="mb-2 lg:w-auto w-full pl-2">
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
              <button
                type="submit"
                className="font-bold text-xl h-12 rounded-lg bg-gray-600 text-white px-4 py-1 hover:bg-thegray focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Subscribete
              </button>
              {successMessage && <div className="text-green-600 mt-2">{successMessage}</div>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsletterBanner;
