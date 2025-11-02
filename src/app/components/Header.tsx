
import React from "react";
import Link from "next/link";
import dynamic from 'next/dynamic';

const AuthStatus = dynamic(() => import('./AuthStatus'), { ssr: false });

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-zinc-900 shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-zinc-900 dark:text-white">
          My Awesome App
        </Link>
        <nav className="hidden md:flex space-x-6 items-center">
          <Link href="/" className="text-zinc-600 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300">
            Home
          </Link>
          <Link href="/about" className="text-zinc-600 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300">
            About
          </Link>
          <Link href="/contact" className="text-zinc-600 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300">
            Contact
          </Link>
          <AuthStatus />
        </nav>
      </div>
    </header>
  );
};

export default Header;
