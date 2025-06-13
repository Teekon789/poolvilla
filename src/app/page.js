"use client"

import { useState, useEffect } from 'react';
import { Search, AlertCircle, RefreshCw } from 'lucide-react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FilterPanel from './components/FilterPanel';
import RoomCard from './components/RoomCard';
import Card from './components/ui/Card';
import Button from './components/ui/Button';
import { Waves } from 'lucide-react';
import Footer from './components/Footer';
// นำเข้า roomService สำหรับเรียก API
import roomService from './services/roomService';

const HomePage = () => {
  // ===== STATE MANAGEMENT =====
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // ข้อมูล pagination
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalRooms: 0,
    hasNext: false,
    hasPrev: false
  });

  // ตัวกรองข้อมูล
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    maxGuests: '',
    amenities: [],
    category: '',
    sortBy: 'featured'
  });
  const [showFilters, setShowFilters] = useState(false);

  // ===== EFFECTS =====

  // โหลดข้อมูลห้องพักจาก API
  useEffect(() => {
    loadRooms();
  }, []);

  // เมื่อมีการเปลี่ยนแปลงตัวกรองหรือคำค้นหา
  useEffect(() => {
    loadRooms();
  }, [filters, searchTerm]);

  // ===== API FUNCTIONS =====

  // ฟังก์ชันโหลดข้อมูลห้องพักจาก API
  const loadRooms = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      // เตรียมข้อมูลสำหรับส่งไป API
      const apiFilters = {
        search: searchTerm,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        bedrooms: filters.bedrooms,
        maxGuests: filters.maxGuests,
        amenities: filters.amenities,
        category: filters.category,
        sortBy: filters.sortBy,
        available: true, // แสดงเฉพาะห้องที่ว่าง
        page: page,
        limit: 12
      };

      console.log('กำลังโหลดข้อมูลห้องพักด้วยตัวกรอง:', apiFilters);

      // เรียก API
      const response = await roomService.fetchRooms(apiFilters);
      
      if (response.success) {
        setRooms(response.data.rooms);
        setFilteredRooms(response.data.rooms);
        setPagination(response.data.pagination);
        
        console.log('โหลดข้อมูลสำเร็จ:', response.message);
      } else {
        throw new Error(response.message || 'ไม่สามารถโหลดข้อมูลได้');
      }

    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการโหลดข้อมูลห้องพัก:', error);
      setError(error.message);
      setRooms([]);
      setFilteredRooms([]);
    } finally {
      setLoading(false);
    }
  };

  // ฟังก์ชันรีเฟรชข้อมูล
  const refreshRooms = () => {
    loadRooms(pagination.currentPage);
  };

  // ===== HANDLERS =====

  // จัดการรายการโปรด (ยังเป็น localStorage ชั่วคราว)
  const handleToggleFavorite = (roomId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(roomId)) {
      newFavorites.delete(roomId);
    } else {
      newFavorites.add(roomId);
    }
    setFavorites(newFavorites);
    
    // บันทึกลง localStorage
    try {
      localStorage.setItem('favoriteRooms', JSON.stringify([...newFavorites]));
    } catch (error) {
      console.warn('ไม่สามารถบันทึกรายการโปรดได้:', error);
    }
  };

  // โหลดรายการโปรดจาก localStorage เมื่อเริ่มต้น
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem('favoriteRooms');
      if (savedFavorites) {
        setFavorites(new Set(JSON.parse(savedFavorites)));
      }
    } catch (error) {
      console.warn('ไม่สามารถโหลดรายการโปรดได้:', error);
    }
  }, []);

  // ไปหน้ารายละเอียด
  const handleViewDetails = (roomId) => {
    // Navigation จะถูกจัดการโดย Link component ใน RoomCard แล้ว
    console.log('ดูรายละเอียดห้องพัก ID:', roomId);
  };

  // ล้างตัวกรอง
  const clearFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      maxGuests: '',
      amenities: [],
      category: '',
      sortBy: 'featured'
    });
    setSearchTerm('');
  };

  // จัดการ pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      loadRooms(newPage);
      // เลื่อนหน้าขึ้นด้านบน
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ===== LOADING STATE =====
  if (loading && rooms.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Waves className="w-6 h-6 text-blue-600 animate-pulse" />
            </div>
          </div>
          <p className="mt-6 text-lg text-gray-700 font-medium">กำลังโหลดข้อมูลห้องพัก...</p>
          <p className="text-gray-500">กรุณารอสักครู่</p>
        </div>
      </div>
    );
  }

  // ===== ERROR STATE =====
  if (error && rooms.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <HeroSection />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="p-12 text-center">
            <AlertCircle className="w-12 h-12 mx-auto text-red-500 mb-4" />
            <h4 className="text-xl font-bold text-gray-700 mb-2">เกิดข้อผิดพลาด</h4>
            <p className="text-gray-500 mb-6">{error}</p>
            <Button variant="primary" onClick={refreshRooms}>
              <RefreshCw className="w-4 h-4 mr-2" />
              ลองใหม่อีกครั้ง
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  // ===== MAIN RENDER =====
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FilterPanel 
          filters={filters}
          setFilters={setFilters}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          clearFilters={clearFilters}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          rooms={rooms}
          loading={loading}
          onSearch={() => loadRooms(1)} // รีเซ็ตเป็นหน้าแรกเมื่อค้นหา
        />
        
        {/* Results Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              {loading ? 'กำลังโหลด...' : `${pagination.totalRooms} วิลล่าพร้อมให้จอง`}
            </h3>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                หน้า {pagination.currentPage} จาก {pagination.totalPages}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={refreshRooms}
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                รีเฟรช
              </Button>
            </div>
          </div>
          
          {/* Loading overlay สำหรับการโหลดแบบ partial */}
          {loading && rooms.length > 0 && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-200 border-t-blue-600 mr-3"></div>
                  <span className="text-gray-700">กำลังโหลดข้อมูล...</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Room Cards Grid */}
          {filteredRooms.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRooms.map((room) => (
                  <RoomCard
                    key={room._id}
                    room={{...room, id: room._id}} // แปลง _id เป็น id สำหรับ component
                    onViewDetails={handleViewDetails}
                    onToggleFavorite={handleToggleFavorite}
                    isFavorite={favorites.has(room._id)}
                  />
                ))}
              </div>
              
              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center items-center mt-12 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={!pagination.hasPrev || loading}
                  >
                    ก่อนหน้า
                  </Button>
                  
                  {/* แสดงหมายเลขหน้า */}
                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, pagination.currentPage - 2) + i;
                    if (pageNum <= pagination.totalPages) {
                      return (
                        <Button
                          key={pageNum}
                          variant={pageNum === pagination.currentPage ? "primary" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(pageNum)}
                          disabled={loading}
                        >
                          {pageNum}
                        </Button>
                      );
                    }
                    return null;
                  })}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={!pagination.hasNext || loading}
                  >
                    ถัดไป
                  </Button>
                </div>
              )}
            </>
          ) : (
            <Card className="p-12 text-center">
              <Search className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h4 className="text-xl font-bold text-gray-700 mb-2">ไม่พบวิลล่าที่ตรงกับเงื่อนไข</h4>
              <p className="text-gray-500 mb-6">ลองเปลี่ยนเงื่อนไขการค้นหาหรือล้างตัวกรองทั้งหมด</p>
              <div className="flex justify-center gap-3">
                <Button variant="outline" onClick={clearFilters}>
                  ล้างตัวกรองทั้งหมด
                </Button>
                <Button variant="primary" onClick={refreshRooms}>
                  โหลดข้อมูลใหม่
                </Button>
              </div>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;