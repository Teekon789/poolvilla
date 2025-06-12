"use client"

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FilterPanel from './components/FilterPanel';
import RoomCard from './components/RoomCard';
import Card from './components/Card';
import Button from './components/Button';
import { Waves } from 'lucide-react';
import Footer from './components/Footer';
// นำเข้าข้อมูล mock
import { mockRooms } from './data/mockData';

const HomePage = () => {
  // ===== STATE MANAGEMENT =====
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // ตัวกรองข้อมูล
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    maxGuests: '',
    amenities: [],
    sortBy: 'featured'
  });
  const [showFilters, setShowFilters] = useState(false);

  // ===== EFFECTS =====

  // โหลดข้อมูลห้องพัก
  useEffect(() => {
    const loadRooms = async () => {
      setLoading(true);
      // จำลองการโหลดข้อมูลจาก API
      await new Promise(resolve => setTimeout(resolve, 1500));
      setRooms(mockRooms); // ใช้ข้อมูล mock
      setFilteredRooms(mockRooms);
      setLoading(false);
    };
    
    loadRooms();
  }, []);

  // ฟังก์ชันค้นหาและกรองข้อมูล
  useEffect(() => {
    let filtered = [...rooms];

    // ค้นหาจากชื่อห้องหรือที่ตั้ง
    if (searchTerm) {
      filtered = filtered.filter(room =>
        room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // กรองตามราคา
    if (filters.minPrice) {
      filtered = filtered.filter(room => room.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(room => room.price <= parseInt(filters.maxPrice));
    }

    // กรองตามจำนวนห้องนอน
    if (filters.bedrooms) {
      filtered = filtered.filter(room => room.bedrooms >= parseInt(filters.bedrooms));
    }

    // กรองตามจำนวนผู้เข้าพัก
    if (filters.maxGuests) {
      filtered = filtered.filter(room => room.maxGuests >= parseInt(filters.maxGuests));
    }

    // กรองตามสิ่งอำนวยความสะดวก
    if (filters.amenities && filters.amenities.length > 0) {
      filtered = filtered.filter(room =>
        filters.amenities.every(selectedAmenity =>
          room.amenities.some(roomAmenity => roomAmenity.name === selectedAmenity)
        )
      );
    }

    // เรียงลำดับ
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.averageRating - a.averageRating);
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => {
          if (a.isFeature && !b.isFeature) return -1;
          if (!a.isFeature && b.isFeature) return 1;
          return b.averageRating - a.averageRating;
        });
        break;
    }

    setFilteredRooms(filtered);
  }, [rooms, searchTerm, filters]);

  // ===== HANDLERS =====

  // จัดการรายการโปรด
  const handleToggleFavorite = (roomId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(roomId)) {
      newFavorites.delete(roomId);
    } else {
      newFavorites.add(roomId);
    }
    setFavorites(newFavorites);
  };

  // ไปหน้ารายละเอียด
  const handleViewDetails = (roomId) => {
    alert(`กำลังโหลดรายละเอียดห้องพัก ID: ${roomId}`);
  };

  // ล้างตัวกรอง
  const clearFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      maxGuests: '',
      amenities: [],
      sortBy: 'featured'
    });
    setSearchTerm('');
  };

  // ===== LOADING STATE =====
  if (loading) {
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

  // ===== MAIN RENDER =====
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
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
        />
        
        {/* Results Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              {filteredRooms.length} วิลล่าพร้อมให้จอง
            </h3>
            <div className="text-sm text-gray-500">
              แสดงผล {filteredRooms.length} จาก {rooms.length} วิลล่า
            </div>
          </div>
          
          {/* Room Cards Grid */}
          {filteredRooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onViewDetails={handleViewDetails}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={favorites.has(room.id)}
                />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <Search className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h4 className="text-xl font-bold text-gray-700 mb-2">ไม่พบวิลล่าที่ตรงกับเงื่อนไข</h4>
              <p className="text-gray-500 mb-6">ลองเปลี่ยนเงื่อนไขการค้นหาหรือล้างตัวกรองทั้งหมด</p>
              <Button variant="primary" onClick={clearFilters}>
                ล้างตัวกรองทั้งหมด
              </Button>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;