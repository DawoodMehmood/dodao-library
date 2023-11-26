import Link from 'next/link';
import React from 'react';
import { useRouter } from "next/navigation";

interface NavbarProps {
  onLogin: (role: string) => void; // Function to handle role selection
}

const Navbar: React.FC<NavbarProps> = ({ onLogin }) => {
  const router = useRouter();
  const handleLogin = (role: string) => {
    router.push(`/home/${role}`)
    onLogin(role); // Pass the selected role to the layout
  };

  return (
    <header className='w-full bg-cyan-500 mx-auto p-6'>
      <nav className='flex justify-between items-center'>
        <Link href='/home' className='text-xl font-bold'>
          Library Management Solution
        </Link>
        <div className='flex gap-2 items-center'>
          <div className='font-semibold'>Login as:</div>
          <button
            className='bg-white rounded object-contain p-2'
            onClick={() => handleLogin('student')} // Set role as 'student' on button click
          >
            Student
          </button>
          <button
            className='bg-white rounded object-contain p-2'
            onClick={() => handleLogin('author')} // Set role as 'author' on button click
          >
            Author
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
