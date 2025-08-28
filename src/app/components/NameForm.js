// 1 не нужно
'use client'

import { useState, useEffect } from 'react';

export default function NameForm() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validate on name change
  useEffect(() => {
    if (isSubmitted) {
      validateName();
    }
  }, [name, isSubmitted]);

  const validateName = () => {
    if (!name.trim()) {
      setError('Заполните поля!');
      return false;
    } else if (name.trim().length < 3) {
      setError('Слишком короткое имя!');
      return false;
    } else {
      setError('');
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    const isValid = validateName();
    if (isValid) {
      alert(`Спасибо, ${name.trim()}!`);
      // Reset form if needed
      // setName('');
      // setIsSubmitted(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 border rounded-lg">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Имя
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Отправить
      </button>
    </form>
  );
}