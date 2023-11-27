import React, { FC } from 'react';
import Link from 'next/link';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

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

  const Contact: FC = () => {
    const backgroundStyle = {
      backgroundImage: 'url("/Image6.png")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  
    return (
      <div className="flex flex-col overflow-hidden">
        <NavBar />
        <div className="text-gray-800" style={backgroundStyle}>
          <div className="container mx-auto py-60 px-6 text-center">
            
            <div className="bg-white bg-opacity-25 p-6 rounded-lg shadow-lg">
              <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
              <p className="mb-6">We'd love to hear from you! Reach out to us through any of the following methods:</p>
              <div className="flex justify-center gap-4 mb-6">
                <FaEnvelope className="text-3xl text-cyan-500" />
                <span className="align-middle">william.beck@mail.mcgill.ca</span>
              </div>
              {/* Additional contact methods can be added here */}
              <div className="flex justify-center gap-4">
                <FaMapMarkerAlt className="text-3xl text-cyan-500" />
                <span className="align-middle">3480 Rue McTavish, Montréal, QC, Canada</span>
              </div>
            </div>
          </div>
        </div>
        <footer className="bg-white">
          <div className="container mx-auto px-6 py-4 text-center" >
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
  
  export default Contact;