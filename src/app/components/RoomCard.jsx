"use client";

import { useState } from "react";
import {
  MapPin, Users, Bath, Bed, Wifi, Car, Utensils, Waves,
  Eye, MessageCircle, Heart, Share2, CheckCircle2,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import StarRating from "./StarRating";
import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * คอมโพเนนต์การ์ดห้องพัก - ดึงข้อมูลจาก API จริง
 */
const RoomCard = ({ room, onViewDetails, onToggleFavorite, isFavorite }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  // ฟังก์ชันติดต่อผ่าน LINE
  const handleLineContact = () => {
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
    if (navigator.share) {
      navigator.share({
        title: room.name,
        text: `ดูห้องพักสวยๆ นี้สิ - ${
          room.name
        } ราคาเพียง ${room.price.toLocaleString()} บาท/คืน`,
        url: `${window.location.origin}/room/${room._id}`,
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/room/${room._id}`);
      alert("คัดลอกลิงค์แล้ว!");
    }
  };

  return (
    <Card
      className="overflow-hidden group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* รูปภาพห้องพัก */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}

        <img
          src={room.mainImage}
          alt={room.name}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          } ${isHovered ? "scale-110" : "scale-100"}`}
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        {/* สถานะและแบดจ์ */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {room.isFeatured && (
            <Badge variant="featured" className="animate-pulse">
              ⭐ แนะนำ
            </Badge>
          )}
          <Badge variant={room.isAvailable ? "available" : "unavailable"}>
            {room.isAvailable ? "✓ ว่าง" : "✗ ไม่ว่าง"}
          </Badge>
        </div>

        {/* ปุ่มต่างๆ */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(room._id);
            }}
            className="p-2 bg-white/90 hover:bg-white rounded-full transition-all duration-200 transform hover:scale-110 shadow-lg"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isFavorite ? "text-red-500 fill-current" : "text-gray-600"
              }`}
            />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleShare();
            }}
            className="p-2 bg-white/90 hover:bg-white rounded-full transition-all duration-200 transform hover:scale-110 shadow-lg"
          >
            <Share2 className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* ราคาแสดงบนรูป */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
            <span className="text-xl font-bold text-gray-900">
              ฿{room.price.toLocaleString()}
            </span>
            <span className="text-gray-600 text-sm ml-1">/คืน</span>
          </div>
        </div>
      </div>

      {/* ข้อมูลห้องพัก */}
      <div className="p-6">
        {/* ชื่อห้องและที่ตั้ง */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {room.name}
          </h3>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-blue-500" />
            <span className="text-sm">{room.location}</span>
          </div>
        </div>

        {/* รายละเอียดห้องพัก */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center text-gray-600">
            <Bed className="w-4 h-4 mr-2 text-blue-500" />
            <span className="text-sm font-medium">{room.bedrooms} ห้องนอน</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Bath className="w-4 h-4 mr-2 text-blue-500" />
            <span className="text-sm font-medium">
              {room.bathrooms} ห้องน้ำ
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-2 text-blue-500" />
            <span className="text-sm font-medium">{room.maxGuests} คน</span>
          </div>
        </div>

        {/* สิ่งอำนวยความสะดวก */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {room.amenities.slice(0, 3).map((amenity, index) => {
              const IconComponent =
                {
                  wifi: Wifi,
                  parking: Car,
                  kitchen: Utensils,
                  pool: Waves,
                }[amenity.icon] || CheckCircle2;

              return (
                <div
                  key={index}
                  className="flex items-center bg-blue-50 text-blue-700 rounded-lg px-3 py-1 text-xs font-medium"
                >
                  <IconComponent className="w-3 h-3 mr-1" />
                  <span>{amenity.name}</span>
                </div>
              );
            })}
            {room.amenities.length > 3 && (
              <div className="flex items-center text-gray-500 text-xs">
                +{room.amenities.length - 3} อื่นๆ
              </div>
            )}
          </div>
        </div>

        {/* คะแนนรีวิว */}
        <div className="mb-6">
          <StarRating
            rating={room.averageRating}
            totalReviews={room.totalReviews}
          />
        </div>

        {/* ปุ่มดำเนินการ */}
        <div className="flex gap-3">
          <Link href={`/room/${room._id}`}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(room._id)}
              className="flex-1"
            >
              <Eye className="w-4 h-4 mr-2" />
              ดูรายละเอียด
            </Button>
          </Link>
          <Button
            variant="success"
            size="sm"
            onClick={handleLineContact}
            className="flex-1"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            LINE
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default RoomCard;