// ข้อมูลห้องพักจำลอง
export const mockRooms = [
  {
    id: 1,
    name: "Luxury Pool Villa Sunset View",
    location: "เขาตะเกียบ, หัวหิน, ประจวบคีรีขันธ์",
    price: 4500,
    originalPrice: 5500,
    mainImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 8,
    area: 120,
    averageRating: 4.8,
    totalReviews: 42,
    isFeature: true,
    isAvailable: true,
    amenities: [
      { name: "WiFi ฟรี", icon: "wifi" },
      { name: "ที่จอดรถฟรี", icon: "parking" },
      { name: "ครัวพร้อมอุปกรณ์", icon: "kitchen" },
      { name: "สระว่ายน้ำส่วนตัว", icon: "pool" },
      { name: "เครื่องปรับอากาศ", icon: "air-conditioning" },
      { name: "วิวทะเล", icon: "ocean-view" },
      { name: "ระเบียงส่วนตัว", icon: "balcony" },
      { name: "บาร์บีคิว", icon: "bbq" },
      { name: "ทีวี Smart TV", icon: "tv" },
      { name: "เครื่องซักผ้า", icon: "laundry" }
    ]
  },
  {
    id: 2,
    name: "Modern Pool Villa Mountain View",
    location: "เขายาย, ปากช่อง, นครราชสีมา",
    price: 3800,
    originalPrice: 4200,
    mainImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 6,
    area: 85,
    averageRating: 4.6,
    totalReviews: 28,
    isFeature: false,
    isAvailable: true,
    amenities: [
      { name: "WiFi ฟรี", icon: "wifi" },
      { name: "ที่จอดรถฟรี", icon: "parking" },
      { name: "ครัวพร้อมอุปกรณ์", icon: "kitchen" },
      { name: "สระว่ายน้ำ", icon: "pool" },
      { name: "เครื่องปรับอากาศ", icon: "air-conditioning" },
      { name: "วิวภูเขา", icon: "mountain-view" },
      { name: "สวนส่วนตัว", icon: "garden" },
      { name: "ห้องออกกำลังกาย", icon: "gym" },
      { name: "เกมส์คอนโซล", icon: "game" }
    ]
  },
  {
    id: 3,
    name: "Cozy Family Pool Villa",
    location: "บางแสน, ชลบุรี",
    price: 2800,
    originalPrice: 3200,
    mainImage: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 10,
    area: 150,
    averageRating: 4.4,
    totalReviews: 35,
    isFeature: true,
    isAvailable: false,
    amenities: [
      { name: "WiFi ฟรี", icon: "wifi" },
      { name: "ที่จอดรถฟรี", icon: "parking" },
      { name: "ครัวใหญ่", icon: "kitchen" },
      { name: "สระว่ายน้ำเด็ก", icon: "pool" },
      { name: "เครื่องปรับอากาศ", icon: "air-conditioning" },
      { name: "อุปกรณ์เด็ก", icon: "baby" },
      { name: "บาร์บีคิว", icon: "bbq" },
      { name: "ทีวี", icon: "tv" },
      { name: "เครื่องซักผ้า", icon: "laundry" },
      { name: "ระเบียงกว้าง", icon: "balcony" }
    ]
  },
  {
    id: 4,
    name: "Tropical Paradise Villa",
    location: "เกาะสมุย, สุราษฎร์ธานี",
    price: 6200,
    originalPrice: 7000,
    mainImage: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop",
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 8,
    area: 180,
    averageRating: 4.9,
    totalReviews: 67,
    isFeature: true,
    isAvailable: true,
    amenities: [
      { name: "WiFi ฟรี", icon: "wifi" },
      { name: "ที่จอดรถฟรี", icon: "parking" },
      { name: "ครัวพรีเมียม", icon: "kitchen" },
      { name: "สระว่ายน้ำใหญ่", icon: "pool" },
      { name: "เครื่องปรับอากาศ", icon: "air-conditioning" },
      { name: "วิวทะเลส่วนตัว", icon: "ocean-view" },
      { name: "สวนเขตร้อน", icon: "garden" },
      { name: "บาร์บีคิว", icon: "bbq" },
      { name: "ห้องออกกำลังกาย", icon: "gym" },
      { name: "จาคูซซี่", icon: "pool" }
    ]
  },
  {
    id: 5,
    name: "Minimalist Pool Villa",
    location: "เขาใหญ่, นครราชสีมา",
    price: 3200,
    originalPrice: 3600,
    mainImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    area: 65,
    averageRating: 4.3,
    totalReviews: 19,
    isFeature: false,
    isAvailable: true,
    amenities: [
      { name: "WiFi ฟรี", icon: "wifi" },
      { name: "ที่จอดรถ", icon: "parking" },
      { name: "ครัวเล็ก", icon: "kitchen" },
      { name: "สระว่ายน้ำ", icon: "pool" },
      { name: "เครื่องปรับอากาศ", icon: "air-conditioning" },
      { name: "วิวป่า", icon: "mountain-view" },
      { name: "ระเบียง", icon: "balcony" },
      { name: "ทีวี", icon: "tv" }
    ]
  },
  {
    id: 6,
    name: "Grand Estate Pool Villa",
    location: "พัทยา, ชลบุรี",
    price: 8500,
    originalPrice: 9500,
    mainImage: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
    bedrooms: 5,
    bathrooms: 4,
    maxGuests: 12,
    area: 250,
    averageRating: 4.7,
    totalReviews: 89,
    isFeature: true,
    isAvailable: true,
    amenities: [
      { name: "WiFi ฟรี", icon: "wifi" },
      { name: "ที่จอดรถใหญ่", icon: "parking" },
      { name: "ครัวสมบูรณ์", icon: "kitchen" },
      { name: "สระว่ายน้ำยักษ์", icon: "pool" },
      { name: "เครื่องปรับอากาศ", icon: "air-conditioning" },
      { name: "วิวทะเล 360°", icon: "ocean-view" },
      { name: "สวนขนาดใหญ่", icon: "garden" },
      { name: "บาร์บีคิวพรีเมียม", icon: "bbq" },
      { name: "ห้องออกกำลังกาย", icon: "gym" },
      { name: "ห้องเกมส์", icon: "game" },
      { name: "เครื่องซักผ้า 2 เครื่อง", icon: "laundry" },
      { name: "โฮมเธียเตอร์", icon: "tv" }
    ]
  }
];

// ข้อมูลรีวิวจำลอง
export const mockReviews = [
  {
    id: 1,
    name: "สมชาย ใจดี",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    date: "2024-11-15",
    comment: "ห้องพักสวยมาก สระว่ายน้ำใสสะอาด วิวสวยมาก เจ้าของใจดี แนะนำเลยครับ จะมาใหม่แน่นอน"
  },
  {
    id: 2,
    name: "วิภาวี สุขใส",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    date: "2024-11-10",
    comment: "ที่พักดีมากค่ะ สะอาด ครบครัน สระน้ำใสมาก เด็กๆ ชอบมาก เจ้าของดูแลดี ราคาคุ้มค่า"
  },
  {
    id: 3,
    name: "ธนากร เที่ยวไทย",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 4,
    date: "2024-11-05",
    comment: "โดยรวมดีครับ ห้องพักสะอาด สระว่ายน้ำใหญ่ มีบาร์บีคิว ติดตรงที่ไฟ WiFi อ่อนหน่อย แต่ก็พอใช้ได้"
  },
  {
    id: 4,
    name: "มณีรัตน์ ท่องโลก",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    date: "2024-10-28",
    comment: "ประทับใจมากค่ะ วิวสวยมาก โดยเฉพาะตอนพระอาทิตย์ตก สระน้ำสะอาด ครัวครบครัน ไปกับครอบครัวเหมาะมาก"
  },
  {
    id: 5,
    name: "อนุชา รักเที่ยว",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    rating: 4,
    date: "2024-10-20",
    comment: "ที่พักดี บรรยากาศดี เหมาะสำหรับพักผ่อน สระว่ายน้ำสะอาด มีความเป็นส่วนตัว เจ้าของดูแลดี"
  },
  {
    id: 6,
    name: "ปริยา ชิลไลฟ์",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    date: "2024-10-15",
    comment: "Perfect! ห้องพักสวยมาก ตกแต่งดี สระว่ายน้ำใส วิวดี เจ้าของใจดีมาก ให้คำแนะนำดี จะกลับมาอีกแน่นอนค่ะ"
  }
];

// รูปภาพเพิ่มเติมจำลอง
export const mockAdditionalImages = [
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=400&fit=crop"
];

// ข้อมูลท่องเที่ยวใกล้เคียงจำลอง
export const mockNearbyAttractions = [
  {
    id: 1,
    name: "ตลาดน้ำอัมพวา",
    distance: "5 กม.",
    type: "ตลาด",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1555321712-3c36b02d1c3d?w=300&h=200&fit=crop"
  },
  {
    id: 2,
    name: "วัดบางกุ้ง",
    distance: "3 กม.",
    type: "วัด",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1544636331-6e4b999de2a8?w=300&h=200&fit=crop"
  },
  {
    id: 3,
    name: "สวนผึ้ง",
    distance: "8 กม.",
    type: "ธรรมชาติ",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop"
  },
  {
    id: 4,
    name: "หาดชะอำ",
    distance: "25 กม.",
    type: "หาด",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
  }
];

// ข้อมูลร้านอาหารใกล้เคียงจำลอง
export const mockNearbyRestaurants = [
  {
    id: 1,
    name: "ร้านอาหารลูกชิ้นปลาแม่กลอง",
    cuisine: "อาหารไทย",
    distance: "2 กม.",
    rating: 4.5,
    priceRange: "฿฿",
    image: "https://images.unsplash.com/photo-1562777717-dc6984fdd78e?w=300&h=200&fit=crop"
  },
  {
    id: 2,
    name: "ครัวบ้านริมคลอง",
    cuisine: "อาหารทะเล",
    distance: "1.5 กม.",
    rating: 4.7,
    priceRange: "฿฿฿",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop"
  },
  {
    id: 3,
    name: "กาแฟดอยคำ",
    cuisine: "เครื่องดื่ม",
    distance: "3 กม.",
    rating: 4.2,
    priceRange: "฿",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&h=200&fit=crop"
  }
];

// ข้อมูลโปรโมชันจำลอง
export const mockPromotions = [
  {
    id: 1,
    title: "Early Bird Special",
    description: "จองล่วงหน้า 30 วัน รับส่วนลด 20%",
    discount: 20,
    validUntil: "2024-12-31",
    conditions: ["จองล่วงหน้าอย่างน้อย 30 วัน", "เข้าพักขั้นต่ำ 2 คืน"]
  },
  {
    id: 2,
    title: "Weekend Getaway",
    description: "พักสุดสัปดาห์ 2 คืน 3 วัน ราคาพิเศษ",
    discount: 15,
    validUntil: "2024-11-30",
    conditions: ["เข้าพักวันศุกร์-อาทิตย์", "จองขั้นต่ำ 2 คืน"]
  },
  {
    id: 3,
    title: "Long Stay Promotion",
    description: "เข้าพัก 5 คืนขึ้นไป รับส่วนลด 25%",
    discount: 25,
    validUntil: "2024-12-15",
    conditions: ["เข้าพักขั้นต่ำ 5 คืน", "ไม่รวมวันหยุดนักขัตฤกษ์"]
  }
];

// ข้อมูลสิ่งอำนวยความสะดวกทั้งหมด
export const allAmenities = [
  { name: "WiFi ฟรี", icon: "wifi", category: "technology" },
  { name: "ที่จอดรถฟรี", icon: "parking", category: "transport" },
  { name: "ครัวพร้อมอุปกรณ์", icon: "kitchen", category: "kitchen" },
  { name: "สระว่ายน้ำส่วนตัว", icon: "pool", category: "recreation" },
  { name: "เครื่องปรับอากาศ", icon: "air-conditioning", category: "comfort" },
  { name: "วิวทะเล", icon: "ocean-view", category: "view" },
  { name: "วิวภูเขา", icon: "mountain-view", category: "view" },
  { name: "สวนส่วนตัว", icon: "garden", category: "outdoor" },
  { name: "ระเบียงส่วนตัว", icon: "balcony", category: "outdoor" },
  { name: "บาร์บีคิว", icon: "bbq", category: "outdoor" },
  { name: "ทีวี Smart TV", icon: "tv", category: "entertainment" },
  { name: "ห้องออกกำลังกาย", icon: "gym", category: "recreation" },
  { name: "เกมส์คอนโซล", icon: "game", category: "entertainment" },
  { name: "อุปกรณ์เด็ก", icon: "baby", category: "family" },
  { name: "เครื่องซักผ้า", icon: "laundry", category: "utility" },
  { name: "จาคูซซี่", icon: "pool", category: "luxury" },
  { name: "โฮมเธียเตอร์", icon: "tv", category: "entertainment" }
];

// ฟังก์ชันช่วยเหลือ
export const getRoomById = (id) => {
  return mockRooms.find(room => room.id === parseInt(id));
};

export const getAvailableRooms = () => {
  return mockRooms.filter(room => room.isAvailable);
};

export const getFeaturedRooms = () => {
  return mockRooms.filter(room => room.isFeature);
};

export const getRoomsByPriceRange = (min, max) => {
  return mockRooms.filter(room => room.price >= min && room.price <= max);
};

export const searchRooms = (query) => {
  const searchTerm = query.toLowerCase();
  return mockRooms.filter(room => 
    room.name.toLowerCase().includes(searchTerm) ||
    room.location.toLowerCase().includes(searchTerm) ||
    room.amenities.some(amenity => amenity.name.toLowerCase().includes(searchTerm))
  );
};