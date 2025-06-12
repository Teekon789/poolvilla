"use client"

import { useState } from 'react';
import { Menu, X, Waves } from 'lucide-react';

/**
 * คอมโพเนนต์ Header ของเว็บไซต์
 */
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-blue-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2.5 rounded-xl shadow-lg">
              <Waves className="w-6 h-6" />
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Pool Villa Resort
              </h1>
              <p className="text-xs text-gray-500">Premium Villa Collection</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">หน้าแรก</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">ห้องพักทั้งหมด</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">รีวิว</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">เกี่ยวกับเรา</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">ติดต่อ</a>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <a href="#" className="block px-3 py-2 rounded-md text-blue-600 font-medium bg-blue-50">หน้าแรก</a>
            <a href="#" className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50">ห้องพักทั้งหมด</a>
            <a href="#" className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50">รีวิว</a>
            <a href="#" className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50">เกี่ยวกับเรา</a>
            <a href="#" className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50">ติดต่อ</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;