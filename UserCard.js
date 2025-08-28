//2 карточка пользователей
// src/app/components/UserCard.jsx
export default function UserCard({ user }) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-lg transition">
        <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
        <p className="text-gray-600">📧 email:  {user.email}</p>
        <p className="text-gray-600">👤 nickname: {user.nickname}</p>
        <p className="text-gray-600">🏙 city: {user.city}</p>
        <p className="text-gray-600">⚧ gender: {user.gender}</p>
      </div>
    );
  }
  
  
  