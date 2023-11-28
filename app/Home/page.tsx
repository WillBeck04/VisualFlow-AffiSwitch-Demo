


"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Corrected import
import { FaUpload, FaHome, FaChartBar, FaCog, FaSignOutAlt, FaBars, FaPlus,FaRobot,FaComments, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Bar, Doughnut, Line, Pie, PolarArea, Radar } from 'react-chartjs-2';
import { parse, unparse } from 'papaparse'; // Added unparse for exporting CSV
import { IconType } from 'react-icons';



// TypeScript type for NavBarProps
type NavBarProps = {
  onLogout: () => void;
};

// NavBar component with TypeScript type
const NavBar: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <nav className={`bg-navy-blue text-gray-500 transition-width duration-300 ${isOpen ? 'w-60' : 'w-20'} min-h-screen`}>
      {isOpen ? (
        <div>
          <FaTimes className="text-2xl cursor-pointer m-2" onClick={() => setIsOpen(false)} />
          <div className="flex flex-col items-center py-4">
            <Logo />
            <MenuButton text="Home" Icon={FaHome} />
            <MenuButton text="Analytics" Icon={FaChartBar} />
            <MenuButton text="Settings" Icon={FaCog} />
            <MenuButton text="Logout" Icon={FaSignOutAlt} onClick={onLogout} />
          </div>
        </div>
      ) : (
        <FaBars className="text-2xl cursor-pointer m-2" onClick={() => setIsOpen(true)} />
      )}
    </nav>
  );
};


// MenuButton component
const MenuButton: React.FC<{ text: string; Icon: IconType; onClick?: () => void }> = ({ text, Icon, onClick }) => (
  <motion.button
    className="flex items-center px-4 py-2 hover:bg-blue-500 w-full"
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Icon className="mr-2" />
    {text}
  </motion.button>
);


const backgroundStyle = {
  backgroundImage: 'url("/Image6.png")',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};
// Logo component
const Logo = () => (
  <motion.div
    className="text-3xl font-bold text-gray-500 mb-10"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    VisualFlow
  </motion.div>
);


// TypeScript type for MenuButtonProps
type MenuButtonProps = {
  text: string;
  Icon: IconType;
  action?: () => void;
};

// MenuButton component with TypeScript type


// Dashboard component
const Dashboard = () => {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const router = useRouter();
  const handleCreateProject = () => {
    router.push('/Home/Dashboard');
  };

  const handleExistingProjects = () => {
    router.push('/Home/Dashboard');
  };

  const handleAIAssistant = () => {
    router.push('/Home/Dashboard/VisualFlowAI');
  };

  return (
    <div className="flex">
      <NavBar onLogout={() => router.push('/login')} />
      <div className="content flex-1" style={{ marginLeft: isNavOpen ? '40px' : '20px', ...backgroundStyle }}>
        <div className="flex justify-end p-4">
          <div className="search-bar">
            <input type="text" placeholder="Search..." className="border p-2 rounded" />
          </div>
        </div>
        <div className="flex justify-center items-center h-screen">
          <motion.div
            className="project-box p-16 bg-white shadow-lg rounded-lg flex flex-col items-center justify-center cursor-pointer mx-6"
            onClick={handleCreateProject}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlus className="text-6xl mb-3 text-gray-500" />
            <div className="text-2xl font-semibold">Create New Project</div>
          </motion.div>
          <motion.div
            className="project-box p-16 bg-white shadow-lg rounded-lg flex flex-col items-center justify-center cursor-pointer mx-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaChartBar className="text-6xl mb-3 text-gray-500" />
            <div className="text-2xl font-semibold">Existing Projects</div>
          </motion.div>
          <motion.div
            className="project-box p-16 bg-white shadow-lg rounded-lg flex flex-col items-center justify-center cursor-pointer mx-6"
            onClick={handleAIAssistant}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaComments className="text-6xl mb-3 text-gray-500" />
            <div className="text-2xl font-semibold">VisualFlow AI Chat</div>
          </motion.div>
        </div>
        <div className="ai-assistant fixed bottom-0 right-0 p-4 flex items-center" style={{ marginRight: isNavOpen ? '40px' : '20px' }}>
          <FaRobot className="text-4xl text-blue-500 mr-4" />
          <div>
            <p>Hello, how can I assist you today?</p>
            <input type="text" placeholder="Type your question here..." className="w-full border p-2 rounded mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;