


"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Corrected import
import { FaUpload, FaHome, FaChartBar, FaCog, FaSignOutAlt, FaBars, FaTimes, FaPlus, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Bar, Doughnut, Line, Pie, PolarArea, Radar } from 'react-chartjs-2';
import { parse, unparse } from 'papaparse'; // Added unparse for exporting CSV
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
  

  type UserData = { name: string; last_name: string; email: string; };
  type CsvDataRow = { label: string; value1: number; value2: number; };
  type ChartDataType = {
    labels: string[];
    datasets: { label: string; data: number[]; backgroundColor: string; }[];
  };
  
  type NavBarProps = {
    onLogout: () => void;
  };
  
  const Dashboard: React.FC = () => {
    const [userData, setUserData] = useState<UserData>({ name: 'Guest', last_name: '', email: '' });
    const [csvData, setCsvData] = useState<CsvDataRow[]>([]);
    const router = useRouter();
    const [chartData, setChartData] = useState<ChartDataType | null>(null);
  
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          parse(reader.result as string, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
              const data: CsvDataRow[] = results.data as CsvDataRow[];
              setCsvData(data);
              updateChartData(data);
            },
          });
        };
        reader.readAsText(file);
      }
    };
    
    const addNewRow = () => {
      const newRow: CsvDataRow = { label: '', value1: 0, value2: 0 };
      setCsvData([...csvData, newRow]);
    };
  
    const deleteRow = (index: number) => {
      const newData = [...csvData];
      newData.splice(index, 1);
      setCsvData(newData);
      updateChartData(newData);
    };
  
    const updateChartData = (data: CsvDataRow[]) => {
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
    };
  
    const handleCsvDataChange = (index: number, field: keyof CsvDataRow, value: string) => {
      const updatedCsvData = [...csvData];
      const updatedValue = field === 'label' ? value : Number(value);
      updatedCsvData[index] = { ...updatedCsvData[index], [field]: updatedValue };
      setCsvData(updatedCsvData);
      updateChartData(updatedCsvData);
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
      marginTop: '20px',
    };
  
    const chartStyle: React.CSSProperties = {
      width: 'calc(33% - 20px)',
      height: '300px',
      marginBottom: '20px',
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
          <input type="file" accept=".csv" onChange={handleFileUpload} className="mb-4 hidden" id="csvUpload" />
  
          {/* Buttons */}
          <div className="mb-4 flex space-x-4">
            <label
              htmlFor="csvUpload"
              className="px-10 py-0.5 bg-gray-500 text-white rounded-full hover:bg-gray-700 transition-colors duration-300"
            >
              <FaUpload className="mr-2" /> Upload CSV
            </label>
            <button
              onClick={addNewRow}
              className="px-10 py-0.5 bg-gray-500 text-white rounded-full hover:bg-gray-700 transition-colors duration-300"
            >
              <FaPlus className="mr-2" /> Add Row
            </button>
          </div>
  
          {/* Chart Display */}
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
  
          {/* Editable CSV Data Table */}
          <div className="my-4">
            {csvData.map((row, index) => (
              <div key={index} className="flex justify-between mb-2 items-center">
                <input
                  type="text"
                  value={row.label}
                  onChange={(e) => handleCsvDataChange(index, 'label', e.target.value)}
                  className="p-1 border border-gray-300 mr-2 rounded"
                />
                <input
                  type="number"
                  value={row.value1}
                  onChange={(e) => handleCsvDataChange(index, 'value1', e.target.value)}
                  className="p-1 border border-gray-300 mr-2 rounded"
                />
                <input
                  type="number"
                  value={row.value2}
                  onChange={(e) => handleCsvDataChange(index, 'value2', e.target.value)}
                  className="p-1 border border-gray-300 mr-2 rounded"
                />
                <button
                  onClick={() => deleteRow(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default Dashboard;