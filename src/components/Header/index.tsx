import React from "react";
import montinkLogo from "../../assets/montink-logo.png";

const Header: React.FC = () => {
  return (
    <header className="bg-teal-500 text-white p-4 flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center mb-4 md:mb-0">
        <img
          src={montinkLogo}
          alt="Montink Logo"
          className="w-32 h-auto object-contain"
        />
      </div>
      <div className="flex items-center mb-4 md:mb-0 w-full md:w-auto">
        <input
          type="text"
          placeholder="O que você está procurando?"
          className="w-full md:w-96 p-2 rounded-full text-gray-800 placeholder:text-gray-700"
        />
      </div>
      <div className="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-start">
        <button className="flex items-center space-x-2 text-gray-800 border border-gray-800 rounded-full px-4 py-2 mb-2 md:mb-0 w-full md:w-auto">
          <span>Entre em Contato</span>
        </button>
        <button className="flex items-center justify-center space-x-2 text-gray-800 border border-gray-800 rounded-full px-4 py-2 mb-2 md:mb-0 w-full md:w-auto">
          <span>Seu Pedido</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
