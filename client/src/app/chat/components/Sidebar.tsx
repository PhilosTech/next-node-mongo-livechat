'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaHome, FaComments, FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';

export default function Sidebar() {
  const [active, setActive] = useState('home');
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    router.push('/login');
  };

  const items = [
    { id: 'home', icon: <FaHome />, label: 'Home', onClick: () => router.push('/') },
    { id: 'chats', icon: <FaComments />, label: 'Chats', onClick: () => router.push('/chat') },
    { id: 'notifications', icon: <FaBell />, label: 'Notifications', onClick: () => router.push('/notifications') },
    { id: 'settings', icon: <FaCog />, label: 'Settings', onClick: () => router.push('/settings') },
    { id: 'logout', icon: <FaSignOutAlt />, label: 'Logout', onClick: handleLogout },
  ];

  return (
    <div className="w-16 bg-purple-600 flex flex-col items-center py-4 space-y-6">
      {/* User Avatar */}
      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
        <p className="text-purple-600 font-bold text-lg">U</p>
      </div>

      {/* Navigation Icons */}
      <div className="flex flex-col items-center space-y-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActive(item.id);
              item.onClick();
            }}
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              active === item.id
                ? 'bg-white text-purple-600'
                : 'text-white hover:bg-purple-500'
            }`}
          >
            {item.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
