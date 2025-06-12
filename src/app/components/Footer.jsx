import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  Home,
  Heart,
  Shield,
  CreditCard,
  Headphones,
  Globe
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Home className="w-8 h-8 text-blue-400" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                VillaBooking
              </h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              แพลตฟอร์มจองวิลล่าออนไลน์ที่ดีที่สุดในไทย 
              พร้อมให้คุณค้นพบที่พักสุดพิเศษสำหรับทุกการเดินทาง
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4 pt-4">
              <a href="#" className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-pink-600 hover:bg-pink-700 rounded-full transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-blue-400 hover:bg-blue-500 rounded-full transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-red-600 hover:bg-red-700 rounded-full transition-colors duration-200">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-400">ลิงก์ด่วน</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                  <Home className="w-4 h-4" />
                  <span>หน้าแรก</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>ค้นหาวิลล่า</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span>รายการโปรด</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                  <CreditCard className="w-4 h-4" />
                  <span>การจองของฉัน</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2">
                  <Headphones className="w-4 h-4" />
                  <span>ติดต่อเรา</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-400">บริการของเรา</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  จองวิลล่าระยะสั้น
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  จองวิลล่าระยะยาว
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  บริการแม่บ้าน
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  บริการรถรับส่ง
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  ประกันการเดินทาง
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-400">ติดต่อเรา</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-gray-300 text-sm">
                    123 ถนนสุขุมวิท แขวงคลองตัน<br />
                    เขตวัฒนา กรุงเทพฯ 10110
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-gray-300 text-sm">02-123-4567</p>
                  <p className="text-gray-300 text-sm">088-888-8888</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <p className="text-gray-300 text-sm">info@villabooking.com</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-blue-400" />
                <p className="text-gray-300 text-sm">www.villabooking.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 pt-8 border-t border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-600 rounded-full">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-semibold text-blue-400">ความปลอดภัย</h5>
                <p className="text-gray-300 text-sm">การจองที่ปลอดภัยและเชื่อถือได้</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-600 rounded-full">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-semibold text-green-400">ชำระเงินง่าย</h5>
                <p className="text-gray-300 text-sm">รองรับการชำระหลายช่องทาง</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-600 rounded-full">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-semibold text-purple-400">ซัพพอร์ต 24/7</h5>
                <p className="text-gray-300 text-sm">ทีมงานพร้อมช่วยเหลือตลอด 24 ชั่วโมง</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {currentYear} VillaBooking. สงวนลิขสิทธิ์ทุกประการ
              </p>
            </div>
            
            <div className="flex flex-wrap items-center space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                เงื่อนไขการใช้งาน
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                นโยบายความเป็นส่วนตัว
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                คำถามที่พบบ่อย
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                สำหรับเจ้าของที่พัก
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;