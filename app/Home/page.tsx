"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUpload, FaHome, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Bar, Doughnut, Line, Pie, PolarArea, Radar } from 'react-chartjs-2';
import { parse } from 'papaparse';
import { IconType } from 'react-icons';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler
} from 'chart.js';

// Registering necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Filler,
  Title,
  Tooltip,
  Legend
);

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
// Define a type for user data
type UserData = {
  name: string;
  last_name: string;
  email: string;
};
type CsvDataRow = {
  label: string;
  value1: number;
  value2: number;
};
type ChartDataType = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
};

// TypeScript type for NavBarProps
type NavBarProps = {
  onLogout: () => void;
};

// NavBar component with TypeScript type
const NavBar: React.FC<NavBarProps> = ({ onLogout }) => {
  return (
    <nav className="bg-gray-800 w-60 min-h-screen text-white">
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
    <motion.div
      className="text-3xl font-bold text-blue-300 mb-10"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      VisualFlow
    </motion.div>
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
    <motion.button
      className="flex items-center px-4 py-2 hover:bg-blue-600 w-full"
      onClick={action}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="mr-2" />
      {text}
    </motion.button>
  );
};

// Dashboard component
const Dashboard = () => {
  const [userData, setUserData] = useState<UserData>({ name: 'Guest', last_name: '', email: '' });
  
  const router = useRouter();
  const [chartData, setChartData] = useState<ChartDataType | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        parse(reader.result as string, {
          header: true,
          complete: (results) => {
            const data: CsvDataRow[] = results.data as CsvDataRow[];
            const labels = data.map((item) => item.label);
            const value1 = data.map((item) => item.value1);
            const value2 = data.map((item) => item.value2);
  
            setChartData({
              labels,
              datasets: [
                {
                  label: 'Value 1',
                  data: value1,
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                  label: 'Value 2',
                  data: value2,
                  backgroundColor: 'rgba(54, 162, 235, 0.5)',
                },
              ],
            });
          },
        });
      };
      reader.readAsText(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };
  const chartContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginTop: '20px'
  };

  const chartStyle: React.CSSProperties = {
    width: 'calc(33% - 20px)', // Each chart takes up 1/3 of the width minus some margin
    height: '300px',
    marginBottom: '20px'
  };

  const backgroundStyle = {
    backgroundImage: 'url("/Image6.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="flex">
      <NavBar onLogout={handleLogout} />
      <div className="flex-grow p-6" style={backgroundStyle}>
        <h1 className="text-2xl font-semibold text-gray-200 mb-4">
          Welcome, {userData.name}
        </h1>
        <input type="file" accept=".csv" onChange={handleFileUpload} />
        <div style={chartContainerStyle}>
          {chartData && (
            <>
              <div style={chartStyle}><Bar data={chartData} /></div>
              <div style={chartStyle}><Line data={chartData} /></div>
              <div style={chartStyle}><Pie data={chartData} /></div>
              <div style={chartStyle}><Doughnut data={chartData} /></div>
              <div style={chartStyle}><PolarArea data={chartData} /></div>
              <div style={chartStyle}><Radar data={chartData} /></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;