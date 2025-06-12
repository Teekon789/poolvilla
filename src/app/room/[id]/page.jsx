"use client"

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { 
  MapPin, Users, Bath, Bed, Wifi, Car, Utensils, Waves,
  Heart, Share2, MessageCircle, ChevronLeft, CheckCircle2,
  Calendar, Clock, Phone, Star, Camera, ChevronRight,
  Thermometer, Shield, Home, Coffee, Tv, Gamepad2,
  Dumbbell, Baby, ParkingCircle, WashingMachine,
  ChevronDown, ChevronUp
} from 'lucide-react';
import Button from '@/app/components/Button';
import StarRating from '@/app/components/StarRating';
import { mockRooms, mockReviews, mockAdditionalImages } from '@/app/data/mockData';

export default function RoomDetailPage({ params }) {
  const router = useRouter();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDates, setSelectedDates] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  const resolvedParams = use(params);

  // สร้างข้อมูลปฏิทิน 2 เดือนข้างหน้า
  const generateAvailabilityCalendar = () => {
    const calendar = [];
    const today = new Date();
    const twoMonthsLater = new Date();
    twoMonthsLater.setMonth(today.getMonth() + 2);
    
    let currentDate = new Date(today);
    
    while (currentDate <= twoMonthsLater) {
      // สุ่มสถานะว่าง/ไม่ว่าง (70% ว่าง)
      const isAvailable = Math.random() > 0.3;
      
      // ราคาแปรปรวนตามวัน (วันหยุดแพงขึ้น)
      const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
      const basePrice = room?.price || 3000;
      const price = isWeekend ? basePrice * 1.2 : basePrice;
      
      calendar.push({
        date: new Date(currentDate),
        isAvailable: isAvailable,
        price: Math.round(price),
        isWeekend: isWeekend
      });
      
      // เพิ่มวันถัดไป
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return calendar;
  };

  const [availabilityCalendar, setAvailabilityCalendar] = useState(generateAvailabilityCalendar());

  // โหลดข้อมูลห้องพัก
  useEffect(() => {
    const loadRoom = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const roomId = parseInt(resolvedParams.id);
        const foundRoom = mockRooms.find(r => r.id === roomId);
        setRoom(foundRoom);
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการโหลดข้อมูลห้องพัก:', error);
        setRoom(null);
      } finally {
        setLoading(false);
      }
    };
    
    if (resolvedParams?.id) {
      loadRoom();
    }
  }, [resolvedParams.id]);

  // อัปเดตปฏิทินเมื่อข้อมูลห้องพักเปลี่ยน
  useEffect(() => {
    if (room) {
      setAvailabilityCalendar(generateAvailabilityCalendar());
    }
  }, [room]);

  // ฟังก์ชันติดต่อผ่าน LINE
  const handleLineContact = () => {
    if (!room) return;
    
    const datesText = selectedDates.length > 0 
      ? `📅 วันที่สนใจ: ${selectedDates.map(date => 
          date.toLocaleDateString('th-TH')
        ).join(', ')}\n`
      : '';
    
    const message = encodeURIComponent(
      `🏨 สวัสดีครับ/ค่ะ สนใจห้องพัก "${room.name}"\n\n` +
        `💰 ราคา: ${room.price.toLocaleString()} บาท/คืน\n` +
        `🛏️ ห้องนอน: ${room.bedrooms} ห้อง\n` +
        `🚿 ห้องน้ำ: ${room.bathrooms} ห้อง\n` +
        `👥 รองรับ: ${room.maxGuests} คน\n` +
        `📍 สถานที่: ${room.location}\n` +
        datesText +
        `กรุณาแจ้งรายละเอียดเพิ่มเติมและตรวจสอบว่างครับ/ค่ะ 🙏`
    );

    window.open(`https://line.me/R/oaMessage/@poolvillaresort/?${message}`, "_blank");
  };

  // ฟังก์ชันโทรติดต่อ
  const handlePhoneCall = () => {
    window.open('tel:+66812345678', '_self');
  };

  // ฟังก์ชันแชร์ห้องพัก
  const handleShare = () => {
    if (!room) return;
    
    if (navigator.share) {
      navigator.share({
        title: room.name,
        text: `ดูห้องพักสวยๆ นี้สิ - ${room.name} ราคาเพียง ${room.price.toLocaleString()} บาท/คืน`,
        url: window.location.href,
      }).catch((error) => console.log('เกิดข้อผิดพลาดในการแชร์:', error));
    } else {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href).then(() => {
          alert("คัดลอกลิงค์แล้ว!");
        });
      }
    }
  };

  // ฟังก์ชันเลือกวันที่
  const handleDateSelect = (dateObj) => {
    if (!dateObj.isAvailable) return;

    const dateStr = dateObj.date.toDateString();
    
    setSelectedDates(prev => {
      // ถ้าวันที่ถูกเลือกอยู่แล้ว ให้ลบออก
      if (prev.some(d => d.toDateString() === dateStr)) {
        return prev.filter(d => d.toDateString() !== dateStr);
      }
      // ไม่เช่นนั้นให้เพิ่มเข้าไป
      return [...prev, new Date(dateObj.date)];
    });
  };

  // ฟังก์ชันเปลี่ยนเดือน
  const changeMonth = (increment) => {
    setCurrentMonth(prev => {
      let newMonth = prev + increment;
      let newYear = currentYear;
      
      if (newMonth > 11) {
        newMonth = 0;
        newYear++;
      } else if (newMonth < 0) {
        newMonth = 11;
        newYear--;
      }
      
      setCurrentYear(newYear);
      return newMonth;
    });
  };

  // สร้างปฏิทินสำหรับเดือนที่แสดง
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
    
    // สร้าง array สำหรับวันในเดือน
    const days = [];
    
    // เพิ่มวันว่างสำหรับวันแรกของเดือน
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // เพิ่มวันในเดือน
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const dateObj = availabilityCalendar.find(d => 
        d.date.toDateString() === date.toDateString()
      );
      
      days.push(dateObj || {
        date,
        isAvailable: false,
        price: 0,
        isWeekend: date.getDay() === 0 || date.getDay() === 6
      });
    }
    
    return days;
  };

  // แสดง Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4" />
          <p className="text-gray-600">กำลังโหลดข้อมูลห้องพัก...</p>
        </div>
      </div>
    );
  }

  // แสดงข้อความเมื่อไม่พบห้องพัก
  if (!room) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">ไม่พบข้อมูลห้องพัก</h1>
            <p className="text-gray-600 mb-6">ขออภัย ไม่พบห้องพักที่คุณกำลังมองหา</p>
            <Button onClick={() => router.push('/')} className="inline-flex items-center">
              <ChevronLeft className="w-4 h-4 mr-2" />
              กลับหน้าหลัก
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - แถบด้านบน */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => router.push('/')}
              className="inline-flex items-center hover:bg-blue-50"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">กลับหน้าหลัก</span>
              <span className="sm:hidden">กลับ</span>
            </Button>
            
            {/* ปุ่มแชร์และรายการโปรดใน header สำหรับมือถือ */}
            <div className="flex gap-2 md:hidden">
              <Button variant="ghost" onClick={handleShare} className="p-2">
                <Share2 className="w-5 h-5" />
              </Button>
              <Button variant="ghost" className="p-2">
                <Heart className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* เนื้อหาหลัก */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        
        {/* ส่วนรูปภาพและข้อมูลหลัก */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 mb-8">
          
          {/* ส่วนรูปภาพ - 3 คอลัมน์ */}
          <div className="lg:col-span-3 space-y-4">
            {/* รูปภาพหลัก */}
            <div className="aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden shadow-lg relative">
              <img 
                src={room.mainImage} 
                alt={room.name}
                className="w-full h-full object-cover"
              />
              
              {/* ปุ่มดูรูปภาพทั้งหมด */}
              <button 
                onClick={() => setShowAllImages(true)}
                className="absolute bottom-4 right-4 bg-white/90 hover:bg-white rounded-lg px-3 py-2 text-sm font-medium shadow-lg transition-all"
              >
                <Camera className="w-4 h-4 inline mr-2" />
                ดูรูปทั้งหมด
              </button>
              
              {/* แบดจ์สถานะ */}
              <div className="absolute top-4 left-4">
                {room.isFeature && (
                  <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    ⭐ แนะนำ
                  </span>
                )}
              </div>
            </div>
            
            {/* รูปภาพเพิ่มเติม */}
            <div className="grid grid-cols-4 gap-2">
              {mockAdditionalImages.slice(0, 4).map((image, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden">
                  <img 
                    src={image} 
                    alt={`${room.name} - รูปที่ ${index + 2}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ส่วนข้อมูลห้องพัก - 2 คอลัมน์ */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* ชื่อและที่อยู่ */}
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                {room.name}
              </h1>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0" />
                <span className="text-sm md:text-base">{room.location}</span>
              </div>
              <StarRating rating={room.averageRating} totalReviews={room.totalReviews} />
            </div>

            {/* ข้อมูลพื้นฐานห้องพัก */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded-xl shadow-sm">
              <div className="text-center">
                <Bed className="w-6 h-6 mx-auto text-blue-500 mb-2" />
                <div className="text-xs md:text-sm text-gray-600 font-medium">{room.bedrooms} ห้องนอน</div>
              </div>
              <div className="text-center">
                <Bath className="w-6 h-6 mx-auto text-blue-500 mb-2" />
                <div className="text-xs md:text-sm text-gray-600 font-medium">{room.bathrooms} ห้องน้ำ</div>
              </div>
              <div className="text-center">
                <Users className="w-6 h-6 mx-auto text-blue-500 mb-2" />
                <div className="text-xs md:text-sm text-gray-600 font-medium">รองรับ {room.maxGuests} คน</div>
              </div>
            </div>

            {/* ส่วนราคาและการจอง */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                ฿{room.price.toLocaleString()}
                <span className="text-base font-normal text-gray-600 ml-2">/คืน</span>
              </div>
              <p className="text-blue-600 text-sm mb-4">ราคารวมภาษีและค่าบริการแล้ว</p>
              
              {/* สถานะห้องพัก */}
              <div className="mb-4">
                {room.isAvailable ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    ห้องว่าง
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                    ห้องไม่ว่าง
                  </span>
                )}
              </div>

              {/* วันที่เลือก */}
              {selectedDates.length > 0 && (
                <div className="mb-4 p-3 bg-white rounded-lg border border-blue-200">
                  <div className="text-sm text-gray-600">วันที่เลือก:</div>
                  <div className="font-semibold text-blue-600">
                    {selectedDates.map(date => (
                      <div key={date.toISOString()}>
                        {date.toLocaleDateString('th-TH', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ปุ่มดำเนินการ */}
              <div className="space-y-3">
                <Button 
                  onClick={handleLineContact}
                  disabled={!room.isAvailable || selectedDates.length === 0}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {room.isAvailable ? 'จองผ่าน LINE' : 'ห้องไม่ว่าง'}
                </Button>
                
                <Button 
                  onClick={handlePhoneCall}
                  variant="outline"
                  className="w-full border-green-300 text-green-700 hover:bg-green-50"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  โทรสอบถาม
                </Button>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={handleShare}
                    variant="outline"
                    className="flex-1 text-gray-600 hover:bg-gray-50"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    แชร์
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex-1 text-red-600 hover:bg-red-50"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    บันทึก
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ส่วนปฏิทินการจอง */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Calendar className="w-6 h-6 mr-3 text-blue-500" />
            ปฏิทินการจอง (สามารถเลือกได้หลายวัน)
          </h2>
          
          {/* ปุ่มเปลี่ยนเดือน */}
          <div className="flex justify-between items-center mb-6">
            <Button 
              onClick={() => changeMonth(-1)}
              disabled={currentMonth <= new Date().getMonth() && currentYear <= new Date().getFullYear()}
              variant="outline"
              className="p-2"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <div className="text-lg font-semibold">
              {new Date(currentYear, currentMonth).toLocaleDateString('th-TH', {
                month: 'long',
                year: 'numeric'
              })}
            </div>
            
            <Button 
              onClick={() => changeMonth(1)}
              disabled={currentMonth >= new Date().getMonth() + 1}
              variant="outline"
              className="p-2"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
          
          {/* ปฏิทิน */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {/* หัววันในสัปดาห์ */}
            {['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'].map((day) => (
              <div key={day} className="text-center font-medium text-gray-500 text-sm">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {renderCalendar().map((dateObj, index) => {
              if (!dateObj) {
                return <div key={`empty-${index}`} className="h-10"></div>;
              }
              
              const isSelected = selectedDates.some(d => 
                d.toDateString() === dateObj.date.toDateString()
              );
              const isToday = dateObj.date.toDateString() === new Date().toDateString();
              
              return (
                <button
                  key={dateObj.date.toISOString()}
                  onClick={() => handleDateSelect(dateObj)}
                  disabled={!dateObj.isAvailable}
                  className={`
                    h-10 md:h-12 rounded-lg text-center transition-all flex flex-col items-center justify-center
                    ${dateObj.isAvailable 
                      ? 'hover:bg-blue-50 border-2 border-transparent hover:border-blue-200' 
                      : 'opacity-50 cursor-not-allowed bg-gray-100'
                    }
                    ${isSelected ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200'}
                    ${dateObj.isWeekend && dateObj.isAvailable ? 'bg-yellow-50' : ''}
                    ${isToday ? 'border-blue-300' : ''}
                  `}
                >
                  <div className={`text-xs md:text-sm font-medium ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                    {dateObj.date.getDate()}
                  </div>
                  {dateObj.isAvailable && (
                    <div className={`text-[10px] ${isSelected ? 'text-blue-100' : 'text-green-600'}`}>
                      ฿{dateObj.price.toLocaleString()}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          
          {/* คำอธิบายสี */}
          <div className="flex flex-wrap gap-4 mt-6 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-white border border-gray-200 rounded mr-2"></div>
              <span className="text-gray-600">วันธรรมดา</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-50 border border-gray-200 rounded mr-2"></div>
              <span className="text-gray-600">วันหยุด (ราคาพิเศษ)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-100 rounded mr-2"></div>
              <span className="text-gray-600">ไม่ว่าง</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
              <span className="text-gray-600">วันที่เลือก</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-white border border-blue-300 rounded mr-2"></div>
              <span className="text-gray-600">วันนี้</span>
            </div>
          </div>
        </div>

        {/* สิ่งอำนวยความสะดวก */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">สิ่งอำนวยความสะดวก</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {room.amenities.slice(0, showAllAmenities ? room.amenities.length : 6).map((amenity, index) => {
              // ไอคอนสำหรับสิ่งอำนวยความสะดวกต่างๆ
              const getAmenityIcon = (iconName) => {
                const icons = {
                  wifi: Wifi,
                  parking: ParkingCircle,
                  kitchen: Utensils,
                  pool: Waves,
                  'air-conditioning': Thermometer,
                  'ocean-view': Camera,
                  'mountain-view': Camera,
                  garden: Home,
                  balcony: Home,
                  bbq: Coffee,
                  tv: Tv,
                  game: Gamepad2,
                  gym: Dumbbell,
                  baby: Baby,
                  laundry: WashingMachine
                };
                return icons[iconName] || CheckCircle2;
              };
              
              const IconComponent = getAmenityIcon(amenity.icon);
              
              return (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <IconComponent className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{amenity.name}</span>
                </div>
              );
            })}
          </div>
          
          {room.amenities.length > 6 && (
            <button
              onClick={() => setShowAllAmenities(!showAllAmenities)}
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              {showAllAmenities ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-1" />
                  แสดงน้อยลง
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-1" />
                  แสดงทั้งหมด ({room.amenities.length} รายการ)
                </>
              )}
            </button>
          )}
        </div>

        {/* ส่วนรีวิวจากผู้เข้าพัก */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Star className="w-6 h-6 mr-3 text-yellow-500" />
            รีวิวจากผู้เข้าพัก
          </h2>
          
          <div className="space-y-6">
            {mockReviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                <div className="flex items-start space-x-4">
                  <img 
                    src={review.avatar} 
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{review.name}</h4>
                      <span className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString('th-TH')}
                      </span>
                    </div>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ส่วนข้อมูลการติดต่อ */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">ข้อมูลการติดต่อ</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">รายละเอียดห้องพัก</h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex justify-between">
                  <span>ห้องนอน:</span>
                  <span className="font-medium">{room.bedrooms} ห้อง</span>
                </div>
                <div className="flex justify-between">
                  <span>ห้องน้ำ:</span>
                  <span className="font-medium">{room.bathrooms} ห้อง</span>
                </div>
                <div className="flex justify-between">
                  <span>รองรับผู้เข้าพัก:</span>
                  <span className="font-medium">{room.maxGuests} คน</span>
                </div>
                <div className="flex justify-between">
                  <span>พื้นที่:</span>
                  <span className="font-medium">{room.area || '45'} ตร.ม.</span>
                </div>
                <div className="flex justify-between">
                  <span>เช็คอิน:</span>
                  <span className="font-medium">15:00 น.</span>
                </div>
                <div className="flex justify-between">
                  <span>เช็คเอาท์:</span>
                  <span className="font-medium">12:00 น.</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">ติดต่อเจ้าของที่พัก</h3>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <MessageCircle className="w-6 h-6 text-green-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">LINE Official</div>
                    <div className="text-sm text-gray-600">@poolvillaresort</div>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Phone className="w-6 h-6 text-blue-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">โทรศัพท์</div>
                    <div className="text-sm text-gray-600">081-234-5678</div>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <Clock className="w-6 h-6 text-gray-600 mr-3" />
                  <div>
                    <div className="font-medium text-gray-900">เวลาติดต่อ</div>
                    <div className="text-sm text-gray-600">08:00 - 22:00 น. ทุกวัน</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* ข้อมูลเพิ่มเติม */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ข้อมูลสำคัญ</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">นโยบายการยกเลิก</h4>
                <ul className="space-y-1">
                  <li>• ยกเลิกฟรี 7 วันก่อนเช็คอิน</li>
                  <li>• ยกเลิก 3-6 วัน คืนเงิน 50%</li>
                  <li>• ยกเลิกน้อยกว่า 3 วัน ไม่คืนเงิน</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">กฎของที่พัก</h4>
                <ul className="space-y-1">
                  <li>• ห้ามสูบบุหรี่ในห้องพัก</li>
                  <li>• ห้ามนำสัตว์เลี้ยงเข้าพัก</li>
                  <li>• เงียบหลัง 22:00 น.</li>
                  <li>• ปาร์ตี้สูงสุด 10 คน</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ห้องพักแนะนำอื่นๆ (เพิ่มเติม) */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">ห้องพักแนะนำอื่นๆ</h2>
          <div className="text-center text-gray-500 py-8">
            <Home className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>ห้องพักแนะนำอื่นๆ จะแสดงที่นี่</p>
          </div>
        </div>
      </main>

      {/* Modal แสดงรูปภาพทั้งหมด */}
      {showAllImages && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-xl font-semibold">รูปภาพทั้งหมด</h3>
              <button 
                onClick={() => setShowAllImages(false)}
                className="text-white hover:text-gray-300 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="bg-white rounded-lg p-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="md:col-span-2 lg:col-span-3">
                  <img 
                    src={room.mainImage} 
                    alt={room.name}
                    className="w-full aspect-video object-cover rounded-lg"
                  />
                </div>
                {mockAdditionalImages.map((image, index) => (
                  <div key={index} className="aspect-square">
                    <img 
                      src={image} 
                      alt={`${room.name} - รูปที่ ${index + 2}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ปุ่มติดตงาศกิดด้านล่าง (Sticky) สำหรับมือถือ */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
        <div className="flex gap-3">
          <Button 
            onClick={handlePhoneCall}
            variant="outline"
            className="flex-1 border-green-300 text-green-700"
          >
            <Phone className="w-4 h-4 mr-2" />
            โทร
          </Button>
          <Button 
            onClick={handleLineContact}
            disabled={!room.isAvailable || selectedDates.length === 0}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            {room.isAvailable ? 'จอง LINE' : 'ไม่ว่าง'}
          </Button>
        </div>
      </div>
    </div>
  );
}