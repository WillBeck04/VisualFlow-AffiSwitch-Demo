'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FC, useState } from 'react';



export default function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    

    const handleChange = (e: { target: { id: any; value: any; }; }) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                router.push('/login'); // Redirect to the home page or another page
            } else {
                const data = await response.json();
                setErrorMessage(data.error || 'An error occurred during signup.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred during signup.');
        }
    };
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
    return (
        <div className="flex flex-col overflow-hidden">
      <NavBar />

        <div
          className="bg-cover bg-center h-screen flex justify-center items-center"
          style={{ backgroundImage: 'url("/Image6.png")' }}
        >
            
          <div className="bg-white p-8 rounded-lg shadow-md w-80 ">
            
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Signup</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 mb-3"
              />
              <input
                type="text"
                id="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 mb-3"
              />
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 mb-3"
              />
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 mb-3"
              />
              <button
                type="submit"
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-md"
              >
                Sign Up
              </button>
            </form>
            {errorMessage && <div className="text-red-500 mt-3">{errorMessage}</div>}
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
