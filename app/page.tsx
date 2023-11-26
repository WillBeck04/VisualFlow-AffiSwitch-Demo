"use client"
import React, { useState, useEffect, useRef, FC } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link as ScrollLink, Element } from 'react-scroll';
import { 
  FaRocket, 
  FaDatabase, 
  FaChartLine, 
  FaCog, 
  FaMobileAlt, 
  FaCloud, 
  FaTools, 
  FaUserShield,
  FaLaptopCode,
  FaNetworkWired,
  FaLightbulb,
  FaGlobe,
  FaRegChartBar
} from 'react-icons/fa';

import heroBackground from './Image6.png';



// NavBar Component
const NavBar: FC = () => {
  return (
    <nav className="sticky top-0 bg-white shadow z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/">
          <button className="font-bold text-xl text-gray-800">VisualFlow</button>
        </Link>
        <div className="flex space-x-4">
          {['Pricing', 'About Us', 'Contact'].map((item, index) => {
            let href = '';
            switch (item) {
              case 'Home':
                href = '/'; // Home page route
                break;
              case 'About Us':
                href = '/about_us'; // About Us page route
                break;
              case 'Pricing':
                href = '/pricing'; // Pricing page route
                break;
              default:
                href = `/${item.toLowerCase()}`; // Default route for other items
            }
            return (
              <Link key={index} href={href}>
                <button className="text-gray-600 hover:text-cyan-500 cursor-pointer text-sm uppercase">{item}</button>
              </Link>
            );
          })}
        </div>
        <div className="flex space-x-2">
          <Link href="/login">
            <button className="text-gray-500 font-bold py-2 px-2 rounded">Login</button>
          </Link>
          <Link href="/signup">
            <button className="text-gray-500 font-bold py-2 px-2 rounded">Sign Up</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

// FeaturesSection Component
const FeaturesSection: FC = () => {
  const features = [
    {
      icon: <FaLaptopCode size={50} color="slategray" />,
      title: "Innovative Design",
      description: "Crafting sleek and intuitive interfaces."
    },
    {
      icon: <FaMobileAlt size={50} color="slategray" />,
      title: "Mobile Compatibility",
      description: "Optimized for a seamless mobile experience."
    },
    {
      icon: <FaDatabase size={50} color="slategray" />,
      title: "Robust Data Management",
      description: "Manage your data efficiently and securely."
    },
    {
      icon: <FaNetworkWired size={50} color="slategray" />,
      title: "Connectivity",
      description: "Stay connected with high-speed, reliable networking solutions."
    },
    {
      icon: <FaTools size={50} color="slategray" />,
      title: "Custom Tools",
      description: "Specialized tools tailored to your unique business needs."
    },
    {
      icon: <FaUserShield size={50} color="slategray" />,
      title: "User Privacy",
      description: "Your privacy is our top priority."
    },
    {
      icon: <FaLightbulb size={50} color="slategray" />,
      title: "Innovative Ideas",
      description: "Bringing cutting-edge ideas to life."
    },
    {
      icon: <FaGlobe size={50} color="slategray" />,
      title: "Global Reach",
      description: "Expand your reach to a global audience with our solutions."
    },
    {
      icon: <FaRegChartBar size={50} color="slategray" />,
      title: "Data Analytics",
      description: "Powerful analytics tools to make data-driven decisions."
    },
    // Add more features as needed
  ];

  return (
    <Element name="featuresSection" className="mt-8  container mx-auto text-center py-10">
      <h2 className=" text-4xl font-bold text-gray-800 mb-10">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center p-4 hover:bg-gray-50 rounded-lg">
            {feature.icon}
            <h3 className="text-2xl mt-10">{feature.title}</h3>
            <p className="text-md">{feature.description}</p>
          </div>
        ))}
      </div>
    </Element>
  );
};

// Main Component
const Main: FC = () => {
  const [textIndex, setTextIndex] = useState<number>(0);
  const typingSpeed: number = 50;
  const visualFlowText: string = "VisualFlow, Where Data Takes Shape.";
  const fullText: string = "Empowering data visualization with simplicity and efficiency.";
  const cursorVisible = textIndex < visualFlowText.length;
  const tagline = "Unleash the full potential of your data.";

  useEffect(() => {
    const typingInterval = setInterval(() => {
      setTextIndex((current) => {
        if (current < visualFlowText.length) {
          return current + 1;
        } else {
          clearInterval(typingInterval);
          return current;
        }
      });
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, []);
  const heroSectionStyle = {
    backgroundImage: 'url("/Image6.jpg")', // Replace with your actual background image path
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="flex flex-col overflow-hidden">
      <NavBar />
      <div className="flex items-center justify-center" style={{ height: '100vh', ...heroSectionStyle }}>
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center h-full">
          <div className="flex flex-col justify-center items-center md:w-1/2 space-y-6">
            <div className="h-32 flex items-center justify-center">
              <motion.h1
                className="text-6xl font-bold text-gray-800"
                // ... [motion props]
              >
                <span className="block overflow-hidden">
                  {visualFlowText.substring(0, textIndex)}
                  {cursorVisible && <span className="text-gray-600 opacity-50">|</span>}
                </span>
              </motion.h1>
            </div>
            <h2 className="text-3xl text-gray-700">{tagline}</h2> {/* Tagline */}
            <p className="text-lg text-gray-600">{fullText}</p>
            <div className="flex space-x-4"> {/* Button Group */}
              <ScrollLink to="featuresSection" smooth={true} duration={500}>
                <button className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded">Explore Features</button>
              </ScrollLink>
              <ScrollLink to="demoSection" smooth={true} duration={500}>
                <button className="bg-transparent hover:bg-gray-800 text-gray-800 font-semibold hover:text-white py-2 px-4 border border-gray-800 hover:border-transparent rounded">
                  See Demo
                </button>
              </ScrollLink>
            </div>
          </div>
          <div className="md:w-1/2">
          <Image
          src="/Image3.png" // Use imported image here
          alt="VisualFlow Image"
          width={900}
          height={400}
          className="rounded-lg"
        />
          </div>
        </div>
      </div>
      <FeaturesSection />
      <footer className="bg-white" >
        <div className="container mx-auto px-6 py-4" >
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm">© 2023 VisualFlow. All rights reserved.</p>
            <div className="text-gray-500">
              <Link href="/privacy">
                <button className="text-gray-800">Privacy Policy</button>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Main;
