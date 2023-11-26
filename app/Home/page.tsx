"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaHome, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { IconType } from 'react-icons';

// Define a type for user data
type UserData = {
  name: string;
  last_name: string;
  email: string;
};

// TypeScript type for NavBarProps
type NavBarProps = {
  onLogout: () => void;
};

// NavBar component with TypeScript type
const NavBar: React.FC<NavBarProps> = ({ onLogout }) => {
  return (
    <nav className="bg-white w-60 min-h-screen shadow z-50">
      <div className="flex flex-col items-center py-4">
        <Logo />
        <MenuButton text="Home" Icon={FaHome} />
        <MenuButton text="Analytics" Icon={FaChartBar} />
        <MenuButton text="Settings" Icon={FaCog} />
        <MenuButton text="Logout" Icon={FaSignOutAlt} action={onLogout} />
      </div>
    </nav>
  );
};

// Logo component
const Logo = () => {
  return (
    <div className="text-3xl font-bold text-blue-600 mb-10">VisualFlow</div>
  );
};

// TypeScript type for MenuButtonProps
type MenuButtonProps = {
  text: string;
  Icon: IconType;
  action?: () => void;
};

// MenuButton component with TypeScript type
const MenuButton: React.FC<MenuButtonProps> = ({ text, Icon, action }) => {
  return (
    <button
      className="flex items-center px-4 py-2 text-gray-800 hover:bg-blue-600 hover:text-white w-full"
      onClick={action}
    >
      <Icon className="mr-2" />
      {text}
    </button>
  );
};

// Dashboard component
const Dashboard = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/user-info', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
        });

        if (response.ok) {
          const data: UserData = await response.json();
          setUser(data);
        } else {
          console.error('Error fetching user data');
          router.push('/login');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="flex">
      <NavBar onLogout={handleLogout} />
      <div className="flex-grow bg-cream min-h-screen p-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome, {user ? user.name : 'Loading...'}
        </h1>
        {/* Additional dashboard content */} 
      </div>
    </div>
  );
};

export default Dashboard;
