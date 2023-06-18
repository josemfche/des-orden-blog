import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    comment: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
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
          name: '',
          lastName: '',
          email: '',
          phone: '',
          comment: '',
        });
        setSuccessMessage('Gracias por contactarnos!');
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
    <div className="flex flex-col lg:flex-row lg:space-x-6 p-4 lg:p-8 w-full">
      <div className="flex w-full lg:w-2/3 flex-col px-4 lg:pr-16">
        <h2 className="text-4xl md:text-6xl font-normal text-gray-800 mb-4">Contactanos</h2>
        <p className="text-base md:text-lg mb-8 text-gray-800">
          Blog dedicado al estudio de las finanzas, la economia y la politica.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col h-full justify-between w-full">
          <div className="mb-4 lg:mb-6 flex flex-row">
            <div className="flex flex-col w-full md:w-1/2 md:pr-2">
              <label htmlFor="name" className="mb-2 font-bold text-gray-800">Nombre:</label>
              <div className="flex">
                <input
                  type="text"
                  id="name"
                  className="border border-gray-300 rounded-md p-2 mr-2 w-full"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nombre *"
                />
              </div>
            </div>
            <div className="flex flex-col w-full md:w-1/2 md:pl-2">
              <label htmlFor="lastname" className="mb-2 font-bold text-gray-800">Apellido:</label>
              <div className="flex">
                <input
                  type="text"
                  id="lastName"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Apellido *"
                />
              </div>
            </div>
          </div>
          <div className="mb-4 md:mb-6">
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-2 font-bold text-gray-800">Correo electrónico:</label>
              <input
                type="email"
                id="email"
                className="border border-gray-300 rounded-md p-2"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email *"
              />
            </div>
          </div>
          <div className="mb-4 md:mb-6">
            <div className="flex flex-col">
              <label htmlFor="phone" className="mb-2 font-bold text-gray-800">Número telefónico:</label>
              <input
                type="tel"
                id="phone"
                className="border border-gray-300 rounded-md p-2"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Número de teléfono"
              />
            </div>
          </div>
          <div>
            <div className="flex flex-col mb-4 md:mb-6 min-h-40">
              <label htmlFor="comment" className="mb-2 font-bold text-gray-800">Mensaje:</label>
              <textarea
                style={{ minHeight: '200px' }}
                id="comment"
                className="border border-gray-300 rounded-md p-2"
                value={formData.comment}
                onChange={handleChange}
                placeholder="Mensaje que desee dejarle a nuestro equipo"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <button type="submit" className="bg-gray-500 rounded-md text-white py-2 px-4 w-full h-12 md:h-14">
              Comentar
            </button>
            {successMessage && <div className="text-green-500 mt-2">{successMessage}</div>}
          </div>
        </form>
      </div>
      <div className="hidden w-full lg:w-1/3 mt-4 lg:mt-0 lg:flex">
        <img src="Imagecontact.jpg" alt="ProfileContact" className="w-full h-full xl:w-full xl:h-auto lg:max-h-screen" />
      </div>
    </div>
  );
};

export default ContactForm;
