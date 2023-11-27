import Link from 'next/link';
import React, { FC } from 'react'

function price() {
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
    return (
        <div className="flex flex-col overflow-hidden">
      <NavBar />

        <div
          className="bg-cover bg-center h-screen flex justify-center items-center"
          style={{ backgroundImage: 'url("/Image6.png")' }}
        >
            
          <div className="bg-white p-12 rounded-lg shadow-md w-90 ">
            
            <h1 className="text-3xl font mb-4 text-gray-800">Service not available at the moment.</h1>
            
          </div>
          </div>
          <footer className="bg-white" >
        <div className="container mx-auto px-6 py-3.5" >
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
}



export default price;