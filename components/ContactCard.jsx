import React from 'react';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ContactCard = ({ picture, title, role, description }) => (
  <div className="flex flex-col justify-center items-center px-4 mb-4">
    <img
      src={picture}
      alt="Profile"
      className="w-44 h-44 mb-4 object-cover rounded-full"
    />
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-gray-500 mb-2">{role}</p>
    <p className="text-gray-700 text-center">{description}</p>
    <ul className="flex justify-center sm:justify-end text-black mt-4">
      <li className="mr-5">
        <a href="/">
          <FontAwesomeIcon className="text-xl" icon={faFacebookF} />
        </a>
      </li>
      <li className="mr-5">
        <a href="/">
          <FontAwesomeIcon className="text-xl" icon={faInstagram} />
        </a>
      </li>
      <li className="mr-5">
        <a href="/">
          <FontAwesomeIcon className="text-xl" icon={faTwitter} />
        </a>
      </li>
    </ul>
  </div>
);

export default ContactCard;
