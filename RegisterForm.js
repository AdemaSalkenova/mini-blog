//2
// src/app/components/RegisterForm.jsx
"use client";
import { useState } from "react";
import { usersData } from "./data";
import UserCard from "./UserCard";

export default function RegisterForm() {
  const [users, setUsers] = useState(usersData);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nickname: "",
    password: "",
    confirmPassword: "",
    city: "",
    gender: "",
    agree: false,
    newsletter: false,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Имя обязательно";
    if (!formData.email.trim()) {
      newErrors.email = "Email обязателен";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Некорректный email";
    }
    if (formData.nickname.length < 5) {
      newErrors.nickname = "Никнейм минимум 5 символов";
    } else if (users.some(u => u.nickname === formData.nickname)) {
      newErrors.nickname = "Такой никнейм уже существует";
    }
    if (formData.password.length < 8) newErrors.password = "Минимум 8 символов";
    if (!/[A-Z]/.test(formData.password)) newErrors.password = "Должна быть заглавная буква";
    if (!/[a-z]/.test(formData.password)) newErrors.password = "Должна быть строчная буква";
    if (!/[0-9]/.test(formData.password)) newErrors.password = "Должна быть цифра";
    if (!/[!@#$%^&*()]/.test(formData.password)) newErrors.password = "Должен быть спецсимвол";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Пароли не совпадают";
    if (!formData.city) newErrors.city = "Выберите город";
    if (!formData.agree) newErrors.agree = "Обязательно дать согласие";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        nickname: formData.nickname,
        city: formData.city,
        gender: formData.gender,
      };
      setUsers([newUser, ...users]);
      alert("Регистрация успешна!");
      setFormData({
        name: "",
        email: "",
        nickname: "",
        password: "",
        confirmPassword: "",
        city: "",
        gender: "",
        agree: false,
        newsletter: false,
      });
      setErrors({});
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Регистрация</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        
        {/* Имя */}
        <div>
          <input
            type="text"
            placeholder="Имя"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-gray-400 p-3 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none text-lg font-medium placeholder-gray-500 transition"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border border-gray-400 p-3 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none text-lg font-medium placeholder-gray-500 transition"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Никнейм */}
        <div>
          <input
            type="text"
            placeholder="Никнейм"
            value={formData.nickname}
            onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
            className="w-full border border-gray-400 p-3 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none text-lg font-medium placeholder-gray-500 transition"
          />
          {errors.nickname && <p className="text-red-500 text-sm mt-1">{errors.nickname}</p>}
        </div>

        {/* Пароль */}
        <div>
          <input
            type="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full border border-gray-400 p-3 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none text-lg font-medium placeholder-gray-500 transition"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Подтверждение пароля */}
        <div>
          <input
            type="password"
            placeholder="Подтверждение пароля"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            className="w-full border border-gray-400 p-3 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none text-lg font-medium placeholder-gray-500 transition"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Город */}
        <div>
          <select
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="">Выберите город</option>
            <option value="Almaty">Алматы</option>
            <option value="Astana">Астана</option>
            <option value="Shymkent">Шымкент</option>
          </select>
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
        </div>

        {/* Пол */}
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            />
            Мужской
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            />
            Женский
          </label>
        </div>

        {/* Чекбоксы */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.agree}
            onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
          />
          Согласие на сбор данных
        </label>
        {errors.agree && <p className="text-red-500 text-sm mt-1">{errors.agree}</p>}

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.newsletter}
            onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
          />
          Получать рассылку
        </label>

        {/* Кнопка */}
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Зарегистрироваться
        </button>
      </form>

      {/* Список пользователей */}
      <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">Пользователи</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

