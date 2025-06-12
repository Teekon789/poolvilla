"use client"

import { Calendar, Phone } from 'lucide-react';
import Button from './Button';

/**
 * คอมโพเนนต์ Hero Section สำหรับหน้าแรก
 */
const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="md:w-2/3 lg:w-1/2">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            พบกับวิลล่าสุดหรู <span className="text-yellow-300">ริมสระว่ายน้ำส่วนตัว</span>
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-8">
            ประสบการณ์การพักผ่อนระดับพรีเมียมในวิลล่าที่ออกแบบมาอย่างดี พร้อมสิ่งอำนวยความสะดวกครบครันและความเป็นส่วนตัวสูงสุด
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="secondary" size="lg" className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              จองตอนนี้
            </Button>
            <Button variant="outline" size="lg" className="flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              โทรสอบถาม
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default HeroSection;