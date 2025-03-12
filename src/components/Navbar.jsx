import { useState } from "react";
import { Menu, X } from "lucide-react";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className=" bg-[#0ab6ab] sdow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-800">Todo-List App</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Home
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              About
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Services
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md p-4 space-y-4">
          <a href="#" className="block text-gray-600 hover:text-gray-800">
            Home
          </a>
          <a href="#" className="block text-gray-600 hover:text-gray-800">
            About
          </a>
          <a href="#" className="block text-gray-600 hover:text-gray-800">
            Services
          </a>
          <a href="#" className="block text-gray-600 hover:text-gray-800">
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}
