import React, { useState, useEffect } from 'react';
import { submitComment } from '../services';

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', comment: '', storeData: false });

  useEffect(() => {
    setLocalStorage(window.localStorage);
    const initalFormData = {
      name: window.localStorage.getItem('name'),
      email: window.localStorage.getItem('email'),
      storeData: window.localStorage.getItem('name') || window.localStorage.getItem('email'),
    };
    setFormData(initalFormData);
  }, []);

  const onInputChange = (e) => {
    const { target } = e;
    if (target.type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  };

  const handlePostSubmission = () => {
    setError(false);
    const { name, email, comment, storeData } = formData;
    if (!name || !email || !comment) {
      setError(true);
      return;
    }
    const commentObj = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData) {
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('name');
      localStorage.removeItem('email');
    }

    submitComment(commentObj)
      .then((res) => {
        if (res.createComment) {
          if (!storeData) {
            formData.name = '';
            formData.email = '';
          }
          formData.comment = '';
          setFormData((prevState) => ({
            ...prevState,
            ...formData,
          }));
          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 3000);
        }
      });
  };

  return (
    <div className="rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-gray-800 text-xl font-semibold pb-4">Deja un comentario</h3>
      <p className="text-gray-400">Tus datos no serán publicados</p>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea value={formData.comment} onChange={onInputChange} className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-white-100 border text-gray-700" name="comment" placeholder="Comentario" />
      </div>
      <div className="flex lg:flex-row mb-4 flex-col justify-between">
        <div className="flex flex-row w-full lg:w-3/4 mb-4">
          <input type="text" value={formData.name} onChange={onInputChange} className="mr-2 py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 border bg-white-100 text-gray-700" placeholder="Nombre*" name="name" />
          <input type="email" value={formData.email} onChange={onInputChange} className="mr-2 py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 border bg-white-100 text-gray-700" placeholder="Email*" name="email" />
        </div>
        <div className="flex lg:justify-end justify-center w-full lg:w-1/3">
          <button type="button" onClick={handlePostSubmission} className="lg:w-1/2 w-1/2 transition duration-500 ease hover:bg-indigo-900 inline-block bg-thegray text-sm font-medium rounded-md text-white px-6 py-3 cursor-pointer">Comentar</button>
        </div>
      </div>
      {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">Comentario enviado para revisión</span>}
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input checked={formData.storeData} onChange={onInputChange} type="checkbox" id="storeData" name="storeData" value="true" />
          <label className="text-gray-500 cursor-pointer" htmlFor="storeData"> Save my name, email in this browser for the next time I comment.</label>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">All fields are mandatory</p>}
    </div>
  );
};

export default CommentsForm;
