"use client"
import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { FaHeart, FaChartBar, FaCalculator } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { title } from 'process';

const AboutUs: FC = () => {
    const [title, setTitle] = useState('');
    const visualFlowText = 'About Us';
    const typingSpeed = 150; // milliseconds
  
    useEffect(() => {
      if (title.length < visualFlowText.length) {
        setTimeout(() => {
          setTitle(visualFlowText.slice(0, title.length + 1));
        }, typingSpeed);
      }
    }, [title, visualFlowText]);
  
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
                      href = '/Home/Aboutus'; // About Us page route
                      break;
                    case 'Pricing':
                      href = '/Home/prices'; // Pricing page route
                      break;
                      case 'Contact':
                      href = '/Home/Contact'; // Pricing page route
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
  const backgroundStyle = {
    backgroundImage: 'url("/Image6.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="flex flex-col overflow-hidden">
      <NavBar />
      <div style={backgroundStyle}>
        <div className="container mx-auto py-8 px-8  text-gray-800">
          <motion.h1
            className="text-6xl font-bold mb-10 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h1>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div
              className="md:flex-1"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Image
              src="/Image7.png"
              alt="Founder of VisualFlow"
              width={400}
              height={400}
              className="rounded-lg" // Increase rounding of corners
              layout="intrinsic" // Add this to maintain aspect ratio
            />
            </motion.div>
            <motion.div
              className="md:flex-1 mt-6 md:mt-0 md:ml-12"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-4xl font-bold mb-4">Our Story</h2>
              <p className="text-lg mb-4">
                At VisualFlow, we harness the elegance of mathematics and the power of computer science to elevate data storytelling. Our founder&apos;s journey began at McGill, where a Bachelor&apos;s degree in Math and Computer Science laid the foundation for a platform dedicated to insightful data visualization.
              </p>
              <p className="text-lg mb-4">
                The concept for VisualFlow emerged from the idea that data, when visualized effectively, can communicate stories and drive understanding far beyond spreadsheets and charts.
              </p>
              <p className="text-lg mb-4">
                Today, VisualFlow stands as a testament to innovation, bridging numbers and narratives to deliver clarity and reveal the beauty hidden in data patterns. It&apos;s a canvas for creators, thinkers, and anyone who believes that data has a story to tell.
              </p>
              <div className="flex text-3xl">
                <FaHeart className="mr-4" />
                <FaChartBar className="mr-4" />
                <FaCalculator />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <footer className="bg-white">
        <div className="container mx-auto px-6 py-12" >
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

export default AboutUs;
