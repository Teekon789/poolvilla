"use client"

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { 
  MapPin, Users, Bath, Bed, Wifi, Car, Utensils, Waves,
  Heart, Share2, MessageCircle, ChevronLeft, CheckCircle2
} from 'lucide-react';
import Button from '@/app/components/Button';
import StarRating from '@/app/components/StarRating';
import { mockRooms } from '@/app/data/mockData';

export default function RoomDetailPage({ params }) {
  const router = useRouter();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // ใช้ React.use() เพื่อ unwrap params Promise
  const resolvedParams = use(params);

  // โหลดข้อมูลห้องพัก
  useEffect(() => {
    const loadRoom = async () => {
      setLoading(true);
      try {
        // จำลองการโหลดข้อมูลจาก API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // แปลง id เป็น number เพื่อเปรียบเทียบกับข้อมูล mock
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
    
    // ตรวจสอบว่ามี id หรือไม่ก่อนโหลดข้อมูล
    if (resolvedParams?.id) {
      loadRoom();
    }
  }, [resolvedParams.id]);

  // ฟังก์ชันติดต่อผ่าน LINE
  const handleLineContact = () => {
    if (!room) return;
    
    const message = encodeURIComponent(
      `🏨 สวัสดีครับ ผม/ดิฉันสนใจห้องพัก "${room.name}"\n\n` +
        `💰 ราคา: ${room.price.toLocaleString()} บาท/คืน\n` +
        `🛏️ ห้องนอน: ${room.bedrooms} ห้อง\n` +
        `🚿 ห้องน้ำ: ${room.bathrooms} ห้อง\n` +
        `👥 รองรับ: ${room.maxGuests} คน\n` +
        `📍 สถานที่: ${room.location}\n\n` +
        `กรุณาแจ้งรายละเอียดเพิ่มเติมและตรวจสอบว่างครับ 🙏`
    );

    window.open(
      `https://line.me/R/oaMessage/@poolvillaresort/?${message}`,
      "_blank"
    );
  };

  // ฟังก์ชันแชร์ห้องพัก
  const handleShare = () => {
    if (!room) return;
    
    if (navigator.share) {
      navigator.share({
        title: room.name,
        text: `ดูห้องพักสวยๆ นี้สิ - ${room.name} ราคาเพียง ${room.price.toLocaleString()} บาท/คืน`,
        url: window.location.href,
      }).catch((error) => {
        console.log('เกิดข้อผิดพลาดในการแชร์:', error);
      });
    } else {
      // Fallback สำหรับเบราว์เซอร์ที่ไม่รองรับ
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href).then(() => {
          alert("คัดลอกลิงค์แล้ว!");
        }).catch(() => {
          alert("ไม่สามารถคัดลอกลิงค์ได้");
        });
      } else {
        alert("เบราว์เซอร์นี้ไม่รองรับการแชร์");
      }
    }
  };

  // ฟังก์ชันเพิ่ม/ลบรายการโปรด (ตัวอย่าง)
  const handleToggleFavorite = () => {
    if (!room) return;
    
    // ในระบบจริงจะเก็บข้อมูลใน localStorage หรือ database
    console.log('สลับสถานะรายการโปรดสำหรับห้อง:', room.name);
    alert('เพิ่ม/ลบรายการโปรดแล้ว (ตัวอย่าง)');
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">ไม่พบข้อมูลห้องพัก</h1>
            <p className="text-gray-600 mb-6">ขออภัย ไม่พบห้องพักที่คุณกำลังมองหา</p>
            <Button 
              onClick={() => router.push('/')}
              className="inline-flex items-center"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              กลับหน้าหลัก
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header - แถบด้านบน */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm shadow-lg border-b border-blue-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/')}
            className="inline-flex items-center hover:bg-blue-50"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            กลับหน้าหลัก
          </Button>
        </div>
      </div>

      {/* เนื้อหาหลัก */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* ส่วนรูปภาพ */}
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={room.mainImage} 
                alt={room.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x600?text=ไม่พบรูปภาพ';
                }}
              />
            </div>
            
            {/* รูปภาพเพิ่มเติม (ถ้ามี) */}
            {room.additionalImages && room.additionalImages.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {room.additionalImages.slice(0, 3).map((image, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden">
                    <img 
                      src={image} 
                      alt={`${room.name} - รูปที่ ${index + 2}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ส่วนข้อมูลห้องพัก */}
          <div className="space-y-6">
            
            {/* ชื่อและที่อยู่ */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{room.name}</h1>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                <span>{room.location}</span>
              </div>
            </div>

            {/* คะแนนรีวิว */}
            <StarRating rating={room.averageRating} totalReviews={room.totalReviews} />

            {/* ข้อมูลพื้นฐานห้องพัก */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded-xl shadow-sm">
              <div className="text-center">
                <Bed className="w-6 h-6 mx-auto text-blue-500 mb-2" />
                <div className="text-sm text-gray-600">{room.bedrooms} ห้องนอน</div>
              </div>
              <div className="text-center">
                <Bath className="w-6 h-6 mx-auto text-blue-500 mb-2" />
                <div className="text-sm text-gray-600">{room.bathrooms} ห้องน้ำ</div>
              </div>
              <div className="text-center">
                <Users className="w-6 h-6 mx-auto text-blue-500 mb-2" />
                <div className="text-sm text-gray-600">รองรับ {room.maxGuests} คน</div>
              </div>
            </div>

            {/* สิ่งอำนวยความสะดวก */}
            <div className="p-4 bg-white rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">สิ่งอำนวยความสะดวก</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {room.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center text-gray-600">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ส่วนราคา */}
            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                ฿{room.price.toLocaleString()}
                <span className="text-base font-normal text-gray-600 ml-2">/คืน</span>
              </div>
              <p className="text-blue-600 text-sm">ราคารวมภาษีและค่าบริการแล้ว</p>
              
              {/* สถานะห้องพัก */}
              <div className="mt-3">
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
            </div>

            {/* ปุ่มดำเนินการ */}
            <div className="flex gap-3">
              <Button 
                variant="primary" 
                onClick={handleLineContact}
                disabled={!room.isAvailable}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                {room.isAvailable ? 'จองผ่าน LINE' : 'ห้องไม่ว่าง'}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleShare}
                className="px-4 hover:bg-blue-50"
                title="แชร์ห้องพัก"
              >
                <Share2 className="w-5 h-5" />
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleToggleFavorite}
                className="px-4 hover:bg-red-50"
                title="เพิ่มรายการโปรด"
              >
                <Heart className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* ส่วนรายละเอียดเพิ่มเติม */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">รายละเอียดเพิ่มเติม</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">ข้อมูลห้องพัก</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• ห้องนอน: {room.bedrooms} ห้อง</li>
                <li>• ห้องน้ำ: {room.bathrooms} ห้อง</li>
                <li>• รองรับผู้เข้าพัก: สูงสุด {room.maxGuests} คน</li>
                <li>• คะแนนรีวิว: {room.averageRating}/5 จาก {room.totalReviews} รีวิว</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">การติดต่อ</h3>
              <div className="space-y-3">
                <p className="text-gray-600">
                  สำหรับข้อมูลเพิ่มเติมและการจอง กรุณาติดต่อผ่าน LINE
                </p>
                <Button 
                  variant="outline" 
                  onClick={handleLineContact}
                  className="w-full"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  ติดต่อผ่าน LINE
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}