// Script สำหรับใส่ข้อมูลห้องพักตัวอย่างเข้าฐานข้อมูล
// รันคำสั่ง: node scripts/seedRooms.js

import mongoose from 'mongoose';
import { connectMongoDB } from '../lib/mongodb.js';
import Room from '../models/room.js';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';

// ข้อมูลห้องพักตัวอย่าง
const sampleRooms = [
  {
    name: "Luxury Pool Villa Paradise",
    description: "วิลล่าพูลหรูพร้อมสระว่ายน้ำส่วนตัว วิวทะเลสวยงาม เหมาะสำหรับครอบครัวและกลุ่มเพื่อน มีความเป็นส่วนตัวสูง พร้อมสิ่งอำนวยความสะดวกครบครัน",
    location: "หาดบางแสน ชลบุรี",
    price: 8500,
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 8,
    size: 150,
    mainImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
    images: [
      { url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop", alt: "ห้องนั่งเล่น" },
      { url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop", alt: "สระว่ายน้ำ" },
      { url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop", alt: "ห้องนอนหลัก" }
    ],
    amenities: [
      { name: "WiFi ฟรี", icon: "wifi" },
      { name: "สระว่ายน้ำ", icon: "pool" },
      { name: "ที่จอดรถ", icon: "parking" },
      { name: "ครัวพร้อมอุปกรณ์", icon: "kitchen" },
      { name: "เครื่องปรับอากาศ", icon: "ac" },
      { name: "Netflix & Smart TV", icon: "tv" }
    ],
    isFeature: true,
    category: "pool-villa",
    tags: ["luxury", "pool", "beachfront", "family"],
    rules: [
      "ห้ามสูบบุหรี่ภายในห้องพัก",
      "ห้ามนำสัตว์เลี้ยงเข้าพัก",
      "เก็บเงินประกันความเสียหาย 3,000 บาท",
      "เช็คอิน 14:00 - เช็คเอาท์ 12:00"
    ],
    contactInfo: {
      lineId: "@poolvillaresort",
      phone: "081-234-5678",
      email: "booking@poolvillaresort.com"
    }
  },
  {
    name: "Cozy Beach House Retreat",
    description: "บ้านพักติดชายหาดขนาดกะทัดรัด บรรยากาศสบายๆ เหมาะสำหรับคู่รัก ครอบครัวเล็ก สามารถเดินไปชายหาดได้ในไม่กี่ก้าว",
    location: "หาดหัวหิน ประจวบคีรีขันธ์",
    price: 4200,
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    size: 80,
    mainImage: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
    images: [
      { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop", alt: "ด้านหน้าบ้าน" },
      { url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop", alt: "ห้องนั่งเล่น" }
    ],
    amenities: [
      { name: "WiFi ฟรี", icon: "wifi" },
      { name: "ที่จอดรถ", icon: "parking" },
      { name: "ครัวเล็ก", icon: "kitchen" },
      { name: "เครื่องปรับอากาศ", icon: "ac" },
      { name: "ระเบียงวิวทะเล", icon: "balcony" }
    ],
    category: "beach-villa",
    tags: ["cozy", "beachfront", "romantic", "couple"],
    contactInfo: {
      lineId: "@beachhouse",
      phone: "082-345-6789"
    }
  },
  {
    name: "Modern Mountain Villa",
    description: "วิลล่าสไตล์โมเดิร์นบนเขา อากาศเย็นสบาย วิวภูเขาและหมอกยามเช้า เหมาะสำหรับการพักผ่อนแบบเงียบสงบ มีสวนส่วนตัว",
    location: "เขาใหญ่ นครราชสีมา",
    price: 6800,
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    size: 120,
    mainImage: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    images: [
      { url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop", alt: "ด้านหน้าวิลล่า" }
    ],
    amenities: [
        { name: "WiFi ฟรี", icon: "wifi" },
        { name: "ที่จอดรถ", icon: "parking" },
        { name: "ครัวพร้อมอุปกรณ์", icon: "kitchen" },
        { name: "เครื่องปรับอากาศ", icon: "ac" },
        { name: "เตาผิง", icon: "fireplace" }
      ],
      isFeature: true,
      category: "mountain-villa",
      tags: ["mountain", "quiet", "nature", "family"],
      rules: [
        "อนุญาตให้สูบบุหรี่ในบริเวณระเบียงเท่านั้น",
        "ห้ามจัดปาร์ตี้เสียงดังหลัง 22:00 น.",
        "เช็คอิน 15:00 - เช็คเอาท์ 11:00"
      ],
      contactInfo: {
        phone: "083-456-7890",
        email: "contact@mountainvilla.com"
      }
    }
  ];
  
  // ข้อมูลผู้ดูแลระบบตัวอย่าง
  const adminUser = {
    name: "Admin",
    email: "admin@example.com",
    password: "admin1234",
    role: "admin"
  };
  
  async function seedDatabase() {
    try {
      // เชื่อมต่อ MongoDB
      await connectMongoDB();
  
      // ลบข้อมูลห้องพักทั้งหมดที่มีอยู่ (ระวังในการใช้งานจริง!)
      await Room.deleteMany({});
      console.log('🗑️ ลบข้อมูลห้องพักเดิมทั้งหมดเรียบร้อย');
  
      // สร้างผู้ดูแลระบบ
      const hashedPassword = await bcrypt.hash(adminUser.password, 10);
      const user = await User.findOneAndUpdate(
        { email: adminUser.email },
        { 
          ...adminUser, 
          password: hashedPassword 
        },
        { upsert: true, new: true }
      );
      console.log(`👤 สร้าง/อัปเดตผู้ใช้ "${user.name}" เรียบร้อย`);
  
      // เพิ่มข้อมูลห้องพักตัวอย่าง
      const roomsWithCreator = sampleRooms.map(room => ({
        ...room,
        createdBy: user._id,
        updatedBy: user._id
      }));
  
      const createdRooms = await Room.insertMany(roomsWithCreator);
      console.log(`✅ เพิ่มข้อมูลห้องพักตัวอย่าง ${createdRooms.length} ห้องเรียบร้อย`);
  
      process.exit(0);
    } catch (error) {
      console.error('❌ เกิดข้อผิดพลาดในการใส่ข้อมูลตัวอย่าง:', error);
      process.exit(1);
    }
  }
  
  seedDatabase();