import LoginLinks from '@/app/LoginLinks';
import React from 'react';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6 sm:px-8 border-b border-primary">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <Image width={100} height={50} src="/logo.png" alt="Logo"  />
          
        </div>

        {/* Menú */}
        <nav className="hidden md:flex flex-1 justify-center">
          <NavLink href="/" text="Inicio" />
          <NavLink href="/about" text="Sobre mí" />
          <NavLink href="/blog" text="Blog" />
          <NavLink href="/contact" text="Contacto" />
        </nav>

       <LoginLinks />
      </div>
    </header>
  );
};

const NavLink = ({ href, text }) => {
  return (
    <a href={href} className="text-primary text-lg font-bold mx-4 hover:text-secondary transition-colors duration-300">
      {text}
    </a>
  );
};



export default Header;

