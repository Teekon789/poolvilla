"use client"

import { Search, ChevronDown, Filter } from 'lucide-react';
import Button from './Button';
import Card from './Card';

/**
 * คอมโพเนนต์แผงตัวกรองห้องพัก
 * @param {object} props - Props ที่ส่งเข้ามา
 * @param {object} props.filters - ค่าตัวกรองปัจจุบัน
 * @param {function} props.setFilters - ฟังก์ชันอัพเดทตัวกรอง
 * @param {boolean} props.showFilters - แสดงแผงตัวกรองหรือไม่
 * @param {function} props.setShowFilters - ฟังก์ชันเปิด/ปิดแผงตัวกรอง
 * @param {function} props.clearFilters - ฟังก์ชันล้างตัวกรองทั้งหมด
 * @param {string} props.searchTerm - คำค้นหา
 * @param {function} props.setSearchTerm - ฟังก์ชันอัพเดทคำค้นหา
 * @param {array} props.rooms - รายการห้องพักทั้งหมด
 */
const FilterPanel = ({ 
  filters, 
  setFilters, 
  showFilters, 
  setShowFilters, 
  clearFilters,
  searchTerm,
  setSearchTerm,
  rooms = [] // เพิ่มค่าเริ่มต้นเป็น array ว่างเพื่อป้องกัน error
}) => {
  return (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-6">
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">ค้นหาวิลล่าที่สมบูรณ์แบบ</h2>
          <p className="text-gray-600">เลือกจากวิลล่าระดับพรีเมียมกว่า {rooms.length} แห่งทั่วไทย</p>
        </div>
        
        <div className="w-full md:w-auto flex gap-3">
          <Button 
            variant={showFilters ? 'primary' : 'secondary'} 
            size="sm" 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center"
          >
            <Filter className="w-4 h-4 mr-2" />
            ตัวกรอง
            <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </Button>
          
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="ค้นหาด้วยชื่อหรือสถานที่..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
        </div>
      </div>
      
      {/* Filter Panel */}
      {showFilters && (
        <Card className="p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ช่วงราคา (บาท/คืน)</label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="ต่ำสุด"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="number"
                  placeholder="สูงสุด"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            {/* Bedrooms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">จำนวนห้องนอน</label>
              <select
                value={filters.bedrooms}
                onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">ทั้งหมด</option>
                <option value="1">1 ห้อง</option>
                <option value="2">2 ห้อง</option>
                <option value="3">3 ห้องขึ้นไป</option>
              </select>
            </div>
            
            {/* Max Guests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">จำนวนผู้เข้าพัก</label>
              <select
                value={filters.maxGuests}
                onChange={(e) => setFilters({...filters, maxGuests: e.target.value})}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">ทั้งหมด</option>
                <option value="2">2 คน</option>
                <option value="4">4 คน</option>
                <option value="6">6 คนขึ้นไป</option>
              </select>
            </div>
            
            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">เรียงลำดับโดย</label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="featured">แนะนำ</option>
                <option value="price-low">ราคาต่ำ-สูง</option>
                <option value="price-high">ราคาสูง-ต่ำ</option>
                <option value="rating">คะแนนรีวิว</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="mr-3"
            >
              ล้างทั้งหมด
            </Button>
            <Button 
              variant="primary" 
              size="sm" 
              onClick={() => setShowFilters(false)}
            >
              แสดงผลลัพธ์
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default FilterPanel;