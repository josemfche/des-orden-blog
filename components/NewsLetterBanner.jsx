/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import Modal from 'react-modal';
import SubscribeModal from './SubscribeModal';

const NewsletterBanner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white border border-gray-300 shadow-lg mx-6 my-12 p-4 rounded-lg py-12">
      <div className="flex flex-col md:flex-row justify-around items-center py-6">
        <div className="lg:mb-0 flex flex-col items-center justify-center lg:justify-start lg:items-left lg:text-left text-center">
          <div className="text-2xl lg:text-4xl font-normal mb-4">Únete a nuestro newsletter y mantente informado con contenido exclusivo</div>
          <div className="w-full lg:text-xl mb-2 lg:text-left">Forma parte de nuestro newsletter</div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex justify-center">
            <button
              type="button"
              className="font-bold text-xl h-12 rounded-lg bg-gray-600 text-white px-4 py-1 hover:bg-thegray focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={openModal}
            >
              Suscribete
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80">
          <div className="relative shadow-lg rounded-lg w-11/12 h-1/2 bg-opacity-80">
            <Modal
              isOpen
              onRequestClose={closeModal}
              className="Modal"
            >
              <SubscribeModal closeModal={closeModal} />
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-500 mt-2 underline hover:text-gray-700 focus:outline-none"
              />
            </Modal>
          </div>
        </div>

      )}
    </div>
  );
};

export default NewsletterBanner;
