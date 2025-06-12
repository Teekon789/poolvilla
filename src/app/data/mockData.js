// mockData.js
export const mockRooms = [
  {
    id: 1,
    name: 'Luxury Ocean View Pool Villa',
    location: 'หัวหิน, ประจวบคีรีขันธ์',
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    price: 4500,
    averageRating: 4.8,
    totalReviews: 124,
    mainImage: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isFeature: true,
    isAvailable: true,
    amenities: [
      { name: 'WiFi ฟรี', icon: 'wifi' },
      { name: 'ที่จอดรถ', icon: 'parking' },
      { name: 'ครัวครบครัน', icon: 'kitchen' },
      { name: 'สระว่ายน้ำส่วนตัว', icon: 'pool' },
      { name: 'แอร์', icon: 'air-conditioning' },
      { name: 'วิวทะเล', icon: 'ocean-view' }
    ]
  },
  {
    id: 2,
    name: 'Modern Garden Pool Villa',
    location: 'ปราณบุรี, ประจวบคีรีขันธ์',
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    price: 3200,
    averageRating: 4.6,
    totalReviews: 89,
    mainImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isFeature: false,
    isAvailable: true,
    amenities: [
      { name: 'WiFi ฟรี', icon: 'wifi' },
      { name: 'ที่จอดรถ', icon: 'parking' },
      { name: 'ครัวครบครัน', icon: 'kitchen' },
      { name: 'สระว่ายน้ำ', icon: 'pool' },
      { name: 'สวนส่วนตัว', icon: 'garden' }
    ]
  },
  {
    id: 3,
    name: 'Beachfront Paradise Villa',
    location: 'เกาะสมุย, สุราษฎร์ธานี',
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    price: 6800,
    averageRating: 4.9,
    totalReviews: 201,
    mainImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isFeature: true,
    isAvailable: true,
    amenities: [
      { name: 'WiFi ฟรี', icon: 'wifi' },
      { name: 'ที่จอดรถ', icon: 'parking' },
      { name: 'ครัวครบครัน', icon: 'kitchen' },
      { name: 'สระว่ายน้ำอินฟินิตี้', icon: 'pool' },
      { name: 'หาดส่วนตัว', icon: 'beach' },
      { name: 'บาร์บีคิว', icon: 'bbq' },
      { name: 'แอร์', icon: 'air-conditioning' }
    ]
  },
  {
    id: 4,
    name: 'Mountain View Eco Villa',
    location: 'เขาใหญ่, นครราชสีมา',
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    price: 2800,
    averageRating: 4.5,
    totalReviews: 67,
    mainImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isFeature: false,
    isAvailable: true,
    amenities: [
      { name: 'WiFi ฟรี', icon: 'wifi' },
      { name: 'ที่จอดรถ', icon: 'parking' },
      { name: 'ครัวครบครัน', icon: 'kitchen' },
      { name: 'วิวภูเขา', icon: 'mountain-view' },
      { name: 'ระเบียงส่วนตัว', icon: 'balcony' },
      { name: 'สวนส่วนตัว', icon: 'garden' }
    ]
  },
  {
    id: 5,
    name: 'Tropical Sunset Villa',
    location: 'ภูเก็ต, ภูเก็ต',
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    price: 5200,
    averageRating: 4.7,
    totalReviews: 156,
    mainImage: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isFeature: true,
    isAvailable: true,
    amenities: [
      { name: 'WiFi ฟรี', icon: 'wifi' },
      { name: 'ที่จอดรถ', icon: 'parking' },
      { name: 'ครัวครบครัน', icon: 'kitchen' },
      { name: 'สระว่ายน้ำ', icon: 'pool' },
      { name: 'ใกล้ชายหาด', icon: 'beach' },
      { name: 'แอร์', icon: 'air-conditioning' },
      { name: 'ระเบียงวิวพระอาทิตย์ตก', icon: 'sunset-view' }
    ]
  },
  {
    id: 6,
    name: 'Cozy Family Villa',
    location: 'ชะอำ, เพชรบุรี',
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    price: 3800,
    averageRating: 4.4,
    totalReviews: 92,
    mainImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isFeature: false,
    isAvailable: true,
    amenities: [
      { name: 'WiFi ฟรี', icon: 'wifi' },
      { name: 'ที่จอดรถ', icon: 'parking' },
      { name: 'ครัวครบครัน', icon: 'kitchen' },
      { name: 'สระว่ายน้ำ', icon: 'pool' },
      { name: 'เหมาะสำหรับครอบครัว', icon: 'family-friendly' },
      { name: 'แอร์', icon: 'air-conditioning' }
    ]
  },
  {
    id: 7,
    name: 'Minimalist Design Villa',
    location: 'กรุงเทพฯ, กรุงเทพมหานคร',
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    price: 2500,
    averageRating: 4.3,
    totalReviews: 78,
    mainImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isFeature: false,
    isAvailable: true,
    amenities: [
      { name: 'WiFi ฟรี', icon: 'wifi' },
      { name: 'ที่จอดรถ', icon: 'parking' },
      { name: 'ครัวครบครัน', icon: 'kitchen' },
      { name: 'ใกล้รถไฟฟ้า', icon: 'metro' },
      { name: 'แอร์', icon: 'air-conditioning' },
      { name: 'ดีไซน์โมเดิร์น', icon: 'modern-design' }
    ]
  },
  {
    id: 8,
    name: 'Riverside Retreat Villa',
    location: 'กาญจนบุรี, กาญจนบุรี',
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    price: 4200,
    averageRating: 4.6,
    totalReviews: 134,
    mainImage: 'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isFeature: false,
    isAvailable: true,
    amenities: [
      { name: 'WiFi ฟรี', icon: 'wifi' },
      { name: 'ที่จอดรถ', icon: 'parking' },
      { name: 'ครัวครบครัน', icon: 'kitchen' },
      { name: 'ริมแม่น้ำ', icon: 'river-view' },
      { name: 'บาร์บีคิว', icon: 'bbq' },
      { name: 'สวนส่วนตัว', icon: 'garden' },
      { name: 'ตกปลา', icon: 'fishing' }
    ]
  },
  {
    id: 9,
    name: 'Luxury Penthouse Villa',
    location: 'พัทยา, ชลบุรี',
    bedrooms: 5,
    bathrooms: 4,
    maxGuests: 10,
    price: 8500,
    averageRating: 4.9,
    totalReviews: 87,
    mainImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isFeature: true,
    isAvailable: true,
    amenities: [
      { name: 'WiFi ฟรี', icon: 'wifi' },
      { name: 'ที่จอดรถ', icon: 'parking' },
      { name: 'ครัวครบครัน', icon: 'kitchen' },
      { name: 'สระว่ายน้ำรูฟท็อป', icon: 'rooftop-pool' },
      { name: 'วิวทะเล', icon: 'ocean-view' },
      { name: 'แอร์', icon: 'air-conditioning' },
      { name: 'ลิฟต์ส่วนตัว', icon: 'private-elevator' },
      { name: 'บาร์บีคิว', icon: 'bbq' }
    ]
  },
  {
    id: 10,
    name: 'Traditional Thai Villa',
    location: 'เชียงใหม่, เชียงใหม่',
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    price: 3500,
    averageRating: 4.5,
    totalReviews: 112,
    mainImage: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isFeature: false,
    isAvailable: true,
    amenities: [
      { name: 'WiFi ฟรี', icon: 'wifi' },
      { name: 'ที่จอดรถ', icon: 'parking' },
      { name: 'ครัวครบครัน', icon: 'kitchen' },
      { name: 'สถาปัตยกรรมไทย', icon: 'thai-architecture' },
      { name: 'สวนส่วนตัว', icon: 'garden' },
      { name: 'ระเบียงส่วนตัว', icon: 'balcony' },
      { name: 'แอร์', icon: 'air-conditioning' }
    ]
  },
  {
    id: 11,
    name: 'Boutique City Villa',
    location: 'สีลม, กรุงเทพมหานคร',
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    price: 2200,
    averageRating: 4.2,
    totalReviews: 56,
    mainImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isFeature: false,
    isAvailable: true,
    amenities: [
      { name: 'WiFi ฟรี', icon: 'wifi' },
      { name: 'ที่จอดรถ', icon: 'parking' },
      { name: 'ครัวเล็ก', icon: 'kitchenette' },
      { name: 'ใกล้ BTS', icon: 'bts' },
      { name: 'แอร์', icon: 'air-conditioning' },
      { name: 'เหมาะสำหรับคู่รัก', icon: 'couple-friendly' }
    ]
  },
  {
    id: 12,
    name: 'Floating Villa Resort',
    location: 'เขื่อนศรีนครินทร์, กาญจนบุรี',
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    price: 4800,
    averageRating: 4.8,
    totalReviews: 73,
    mainImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isFeature: true,
    isAvailable: true,
    amenities: [
      { name: 'WiFi ฟรี', icon: 'wifi' },
      { name: 'ที่จอดรถ', icon: 'parking' },
      { name: 'ครัวครบครัน', icon: 'kitchen' },
      { name: 'บ้านลอยน้ำ', icon: 'floating-house' },
      { name: 'กิจกรรมทางน้ำ', icon: 'water-activities' },
      { name: 'ตกปลา', icon: 'fishing' },
      { name: 'แอร์', icon: 'air-conditioning' }
    ]
  },
  {
    id: 13,
    name: 'Hillside Panoramic Villa',
    location: 'ดอยสุเทพ, เชียงใหม่',
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    price: 4000,
    averageRating: 4.7,
    totalReviews: 95,
    mainImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isFeature: false,
    isAvailable: true,
    amenities: [
      { name: 'WiFi ฟรี', icon: 'wifi' },
      { name: 'ที่จอดรถ', icon: 'parking' },
      { name: 'ครัวครบครัน', icon: 'kitchen' },
      { name: 'วิวพาโนรามา', icon: 'panoramic-view' },
      { name: 'สระว่ายน้ำ', icon: 'pool' },
      { name: 'บาร์บีคิว', icon: 'bbq' },
      { name: 'ระเบียงส่วนตัว', icon: 'balcony' }
    ]
  },
  {
    id: 14,
    name: 'Budget Friendly Villa',
    location: 'ระยอง, ระยอง',
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    price: 1800,
    averageRating: 4.1,
    totalReviews: 43,
    mainImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isFeature: false,
    isAvailable: true,
    amenities: [
      { name: 'WiFi ฟรี', icon: 'wifi' },
      { name: 'ที่จอดรถ', icon: 'parking' },
      { name: 'ครัวเล็ก', icon: 'kitchenette' },
      { name: 'ราคาประหยัด', icon: 'budget-friendly' },
      { name: 'แอร์', icon: 'air-conditioning' }
    ]
  },
  {
    id: 15,
    name: 'Executive Business Villa',
    location: 'อโศก, กรุงเทพมหานคร',
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    price: 5500,
    averageRating: 4.6,
    totalReviews: 108,
    mainImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isFeature: false,
    isAvailable: true,
    amenities: [
      { name: 'WiFi ฟรี', icon: 'wifi' },
      { name: 'ที่จอดรถ', icon: 'parking' },
      { name: 'ครัวครบครัน', icon: 'kitchen' },
      { name: 'ใกล้ MRT', icon: 'mrt' },
      { name: 'ออฟฟิศในบ้าน', icon: 'home-office' },
      { name: 'แอร์', icon: 'air-conditioning' },
      { name: 'เหมาะสำหรับธุรกิจ', icon: 'business-friendly' }
    ]
  }
];

export const mockAmenities = [
  { id: 1, name: 'WiFi ฟรี', icon: 'wifi' },
  { id: 2, name: 'ที่จอดรถ', icon: 'parking' },
  { id: 3, name: 'ครัวครบครัน', icon: 'kitchen' },
  { id: 4, name: 'ครัวเล็ก', icon: 'kitchenette' },
  { id: 5, name: 'สระว่ายน้ำ', icon: 'pool' },
  { id: 6, name: 'สระว่ายน้ำส่วนตัว', icon: 'pool' },
  { id: 7, name: 'สระว่ายน้ำอินฟินิตี้', icon: 'pool' },
  { id: 8, name: 'สระว่ายน้ำรูฟท็อป', icon: 'rooftop-pool' },
  { id: 9, name: 'แอร์', icon: 'air-conditioning' },
  { id: 10, name: 'วิวทะเล', icon: 'ocean-view' },
  { id: 11, name: 'วิวภูเขา', icon: 'mountain-view' },
  { id: 12, name: 'วิวพาโนรามา', icon: 'panoramic-view' },
  { id: 13, name: 'ริมแม่น้ำ', icon: 'river-view' },
  { id: 14, name: 'หาดส่วนตัว', icon: 'beach' },
  { id: 15, name: 'ใกล้ชายหาด', icon: 'beach' },
  { id: 16, name: 'สวนส่วนตัว', icon: 'garden' },
  { id: 17, name: 'ระเบียงส่วนตัว', icon: 'balcony' },
  { id: 18, name: 'ระเบียงวิวพระอาทิตย์ตก', icon: 'sunset-view' },
  { id: 19, name: 'บาร์บีคิว', icon: 'bbq' },
  { id: 20, name: 'ตกปลา', icon: 'fishing' },
  { id: 21, name: 'กิจกรรมทางน้ำ', icon: 'water-activities' },
  { id: 22, name: 'ใกล้รถไฟฟ้า', icon: 'metro' },
  { id: 23, name: 'ใกล้ BTS', icon: 'bts' },
  { id: 24, name: 'ใกล้ MRT', icon: 'mrt' },
  { id: 25, name: 'เหมาะสำหรับครอบครัว', icon: 'family-friendly' },
  { id: 26, name: 'เหมาะสำหรับคู่รัก', icon: 'couple-friendly' },
  { id: 27, name: 'เหมาะสำหรับธุรกิจ', icon: 'business-friendly' },
  { id: 28, name: 'ราคาประหยัด', icon: 'budget-friendly' },
  { id: 29, name: 'ดีไซน์โมเดิร์น', icon: 'modern-design' },
  { id: 30, name: 'สถาปัตยกรรมไทย', icon: 'thai-architecture' },
  { id: 31, name: 'บ้านลอยน้ำ', icon: 'floating-house' },
  { id: 32, name: 'ลิฟต์ส่วนตัว', icon: 'private-elevator' },
  { id: 33, name: 'ออฟฟิศในบ้าน', icon: 'home-office' }
];

// ข้อมูลสำหรับตัวเลือกการเรียงลำดับ
export const sortOptions = [
  { value: 'featured', label: 'แนะนำ' },
  { value: 'price-low', label: 'ราคา: ต่ำไปสูง' },
  { value: 'price-high', label: 'ราคา: สูงไปต่ำ' },
  { value: 'rating', label: 'คะแนนรีวิว' }
];

// ข้อมูลสำหรับตัวเลือกจำนวนห้องนอน
export const bedroomOptions = [
  { value: '', label: 'ทั้งหมด' },
  { value: '1', label: '1 ห้องนอน' },
  { value: '2', label: '2 ห้องนอน' },
  { value: '3', label: '3 ห้องนอน' },
  { value: '4', label: '4+ ห้องนอน' }
];

// ข้อมูลสำหรับตัวเลือกจำนวนผู้เข้าพัก
export const guestOptions = [
  { value: '', label: 'ทั้งหมด' },
  { value: '2', label: '2 คน' },
  { value: '4', label: '4 คน' },
  { value: '6', label: '6 คน' },
  { value: '8', label: '8+ คน' }
];

// ข้อมูลสำหรับช่วงราคา (แนะนำ)
export const priceRanges = [
  { min: 0, max: 2000, label: 'ต่ำกว่า 2,000 บาท' },
  { min: 2000, max: 4000, label: '2,000 - 4,000 บาท' },
  { min: 4000, max: 6000, label: '4,000 - 6,000 บาท' },
  { min: 6000, max: 10000, label: '6,000 - 10,000 บาท' },
  { min: 10000, max: 999999, label: 'มากกว่า 10,000 บาท' }
];