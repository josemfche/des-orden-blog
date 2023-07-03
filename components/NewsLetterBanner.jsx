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
    <div className="flex flew-row bg-white border border-gray-300 shadow-lg mx-6 my-12 md:mx-32 rounded-2xl">
      <div className="lg:w-1/2 lg:flex hidden rounded-l-2xl">
        <img className="h-full w-full object-cover rounded-l-2xl" src="/newletterimg.png" alt="banner" />
      </div>
      <div className="lg:w-1/2 flex flex-col justify-around items-center p-6">
        <div className="lg:mb-0 mb-2 flex flex-col items-center justify-center lg:justify-start lg:items-left text-center">
          <div className="text-secondthegray text-2xl lg:text-4xl font-normal mb-4 md:px-8 px-4">Únete a nuestro newsletter y mantente informado con contenido exclusivo</div>
          <div className="text-gray-500 w-full lg:text-xl mb-2 text-center pt-4">Forma parte de nuestro newsletter</div>
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <button
            type="button"
            className="w-3/5 font-bold text-xl h-12 rounded-lg bg-gray-600 text-white px-4 py-1 hover:bg-thegray focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={openModal}
          >
            Suscribete
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80">
          <div className="relative shadow-lg rounded-lg w-full h-1/2 bg-opacity-80 flex flex-row justify-center items-center">
            <Modal
              isOpen
              onRequestClose={closeModal}
              className="Modal flex justify-start items-center"
            >
              <SubscribeModal closeModal={closeModal} />
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsletterBanner;
