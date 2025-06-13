// Service สำหรับจัดการ API calls เกี่ยวกับห้องพัก

const API_BASE_URL = '/api/rooms';

// ฟังก์ชันสำหรับจัดการ error response
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อ API');
  }
  
  return data;
};

// สร้าง query string จาก object
const createQueryString = (params) => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      if (Array.isArray(value)) {
        searchParams.append(key, value.join(','));
      } else {
        searchParams.append(key, value.toString());
      }
    }
  });
  
  return searchParams.toString();
};

// 1. ดึงข้อมูลห้องพักทั้งหมด พร้อมกรองและค้นหา
export const fetchRooms = async (filters = {}) => {
  try {
    const {
      search = '',
      minPrice = '',
      maxPrice = '',
      bedrooms = '',
      maxGuests = '',
      amenities = [],
      category = '',
      available = null,
      featured = null,
      sortBy = 'featured',
      page = 1,
      limit = 12
    } = filters;

    const queryParams = {
      search,
      minPrice,
      maxPrice,
      bedrooms,
      maxGuests,
      amenities,
      category,
      available,
      featured,
      sortBy,
      page,
      limit
    };

    const queryString = createQueryString(queryParams);
    const url = queryString ? `${API_BASE_URL}?${queryString}` : API_BASE_URL;
    
    console.log('กำลังดึงข้อมูลห้องพัก:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store' // ไม่ cache เพื่อให้ได้ข้อมูลใหม่ทุกครั้ง
    });

    const result = await handleResponse(response);
    
    console.log('ดึงข้อมูลห้องพักสำเร็จ:', result.message);
    return result;

  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการดึงข้อมูลห้องพัก:', error);
    throw error;
  }
};

// 2. ดึงข้อมูลห้องพักตาม ID
export const fetchRoomById = async (roomId) => {
  try {
    console.log('กำลังดึงข้อมูลห้องพัก ID:', roomId);
    
    const response = await fetch(`${API_BASE_URL}/${roomId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    const result = await handleResponse(response);
    
    console.log('ดึงข้อมูลห้องพักสำเร็จ:', result.data.room.name);
    return result;

  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการดึงข้อมูลห้องพัก:', error);
    throw error;
  }
};

// 3. สร้างห้องพักใหม่
export const createRoom = async (roomData) => {
  try {
    console.log('กำลังสร้างห้องพักใหม่:', roomData.name);
    
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roomData)
    });

    const result = await handleResponse(response);
    
    console.log('สร้างห้องพักใหม่สำเร็จ:', result.message);
    return result;

  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการสร้างห้องพัก:', error);
    throw error;
  }
};

// 4. อัพเดทข้อมูลห้องพัก
export const updateRoom = async (roomId, roomData) => {
  try {
    console.log('กำลังอัพเดทห้องพัก ID:', roomId);
    
    const response = await fetch(`${API_BASE_URL}/${roomId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roomData)
    });

    const result = await handleResponse(response);
    
    console.log('อัพเดทห้องพักสำเร็จ:', result.message);
    return result;

  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการอัพเดทห้องพัก:', error);
    throw error;
  }
};

// 5. ลบห้องพัก
export const deleteRoom = async (roomId) => {
  try {
    console.log('กำลังลบห้องพัก ID:', roomId);
    
    const response = await fetch(`${API_BASE_URL}/${roomId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const result = await handleResponse(response);
    
    console.log('ลบห้องพักสำเร็จ:', result.message);
    return result;

  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการลบห้องพัก:', error);
    throw error;
  }
};

// 6. อัพเดทสถานะห้องพัก
export const updateRoomStatus = async (roomId, action, updatedBy) => {
  try {
    console.log('กำลังอัพเดทสถานะห้องพัก:', { roomId, action });
    
    const response = await fetch(`${API_BASE_URL}/${roomId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action, updatedBy })
    });

    const result = await handleResponse(response);
    
    console.log('อัพเดทสถานะห้องพักสำเร็จ:', result.message);
    return result;

  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการอัพเดทสถานะห้องพัก:', error);
    throw error;
  }
};

// 7. ดึงห้องพักที่แนะนำ
export const fetchFeaturedRooms = async (limit = 6) => {
  try {
    const filters = {
      featured: true,
      available: true,
      limit,
      sortBy: 'rating'
    };
    
    return await fetchRooms(filters);

  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการดึงห้องพักแนะนำ:', error);
    throw error;
  }
};

// 8. ค้นหาห้องพักตามคำค้นหา
export const searchRooms = async (searchTerm, additionalFilters = {}) => {
  try {
    const filters = {
      search: searchTerm,
      available: true,
      ...additionalFilters
    };
    
    return await fetchRooms(filters);

  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการค้นหาห้องพัก:', error);
    throw error;
  }
};

// 9. ดึงห้องพักตามหมวดหมู่
export const fetchRoomsByCategory = async (category, limit = 12) => {
  try {
    const filters = {
      category,
      available: true,
      limit
    };
    
    return await fetchRooms(filters);

  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการดึงห้องพักตามหมวดหมู่:', error);
    throw error;
  }
};

// 10. ดึงสถิติห้องพัก
export const fetchRoomStats = async () => {
  try {
    // เรียก API แยกเพื่อดึงสถิติต่างๆ
    const [allRooms, availableRooms, featuredRooms] = await Promise.all([
      fetchRooms({ limit: 1 }), // ดึงเพื่อดูจำนวนทั้งหมด
      fetchRooms({ available: true, limit: 1 }),
      fetchRooms({ featured: true, limit: 1 })
    ]);

    return {
      total: allRooms.data.pagination.totalRooms,
      available: availableRooms.data.pagination.totalRooms,
      featured: featuredRooms.data.pagination.totalRooms,
      unavailable: allRooms.data.pagination.totalRooms - availableRooms.data.pagination.totalRooms
    };

  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการดึงสถิติห้องพัก:', error);
    throw error;
  }
};

// 11. Helper function: ตรวจสอบว่าห้องพักว่างหรือไม่
export const checkRoomAvailability = async (roomId) => {
  try {
    const result = await fetchRoomById(roomId);
    return {
      isAvailable: result.data.room.isAvailable,
      room: result.data.room
    };

  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการตรวจสอบความพร้อมของห้องพัก:', error);
    throw error;
  }
};

// 12. Helper function: สร้าง URL สำหรับแชร์
export const generateShareUrl = (roomId, roomName) => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const roomUrl = `${baseUrl}/room/${roomId}`;
  
  return {
    url: roomUrl,
    title: roomName,
    text: `ดูห้องพักสวยๆ นี้สิ - ${roomName}`
  };
};

// Export ทั้งหมดเป็น default object สำหรับใช้งานแบบ namespace
const roomService = {
  fetchRooms,
  fetchRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
  updateRoomStatus,
  fetchFeaturedRooms,
  searchRooms,
  fetchRoomsByCategory,
  fetchRoomStats,
  checkRoomAvailability,
  generateShareUrl
};

export default roomService;