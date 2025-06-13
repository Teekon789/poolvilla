import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongodb'
import Room from '../../../../models/room';

// GET: ดึงข้อมูลห้องพักทั้งหมด (รองรับการค้นหาและกรองข้อมูล)
export async function GET(request) {
  try {
    await connectMongoDB();

    const { searchParams } = new URL(request.url);
    
    // สร้าง query object สำหรับกรองข้อมูล
    let query = { isPublished: true };
    
    // ค้นหาจากคำค้นหา
    const search = searchParams.get('search');
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // กรองตามราคา
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }

    // กรองตามจำนวนห้องนอน
    const bedrooms = searchParams.get('bedrooms');
    if (bedrooms) {
      query.bedrooms = { $gte: parseInt(bedrooms) };
    }

    // กรองตามจำนวนผู้เข้าพัก
    const maxGuests = searchParams.get('maxGuests');
    if (maxGuests) {
      query.maxGuests = { $gte: parseInt(maxGuests) };
    }

    // กรองตามสถานะว่าง
    const available = searchParams.get('available');
    if (available !== null) {
      query.isAvailable = available === 'true';
    }

    // กรองตามหมวดหมู่
    const category = searchParams.get('category');
    if (category) {
      query.category = category;
    }

    // กรองตามสิ่งอำนวยความสะดวก
    const amenities = searchParams.get('amenities');
    if (amenities) {
      const amenityList = amenities.split(',');
      query['amenities.name'] = { $in: amenityList };
    }

    // กรองเฉพาะห้องแนะนำ
    const featured = searchParams.get('featured');
    if (featured === 'true') {
      query.isFeature = true;
    }

    // การเรียงลำดับ
    let sortOptions = {};
    const sortBy = searchParams.get('sortBy') || 'featured';
    
    switch (sortBy) {
      case 'price-low':
        sortOptions = { price: 1 };
        break;
      case 'price-high':
        sortOptions = { price: -1 };
        break;
      case 'rating':
        sortOptions = { averageRating: -1, totalReviews: -1 };
        break;
      case 'newest':
        sortOptions = { createdAt: -1 };
        break;
      case 'featured':
      default:
        sortOptions = { isFeature: -1, averageRating: -1 };
        break;
    }

    // Pagination
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 12;
    const skip = (page - 1) * limit;

    // ดึงข้อมูลห้องพัก
    const rooms = await Room.find(query)
      .populate('createdBy', 'name email')
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .lean(); // ใช้ lean() เพื่อประสิทธิภาพที่ดีขึ้น

    // นับจำนวนทั้งหมดสำหรับ pagination
    const totalRooms = await Room.countDocuments(query);
    const totalPages = Math.ceil(totalRooms / limit);

    // ส่งข้อมูลกลับ
    return NextResponse.json({
      success: true,
      data: {
        rooms,
        pagination: {
          currentPage: page,
          totalPages,
          totalRooms,
          hasNext: page < totalPages,
          hasPrev: page > 1,
          limit
        }
      },
      message: `พบห้องพัก ${rooms.length} ห้องจากทั้งหมด ${totalRooms} ห้อง`
    });

  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการดึงข้อมูลห้องพัก:', error);
    return NextResponse.json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูลห้องพัก',
      error: error.message
    }, { status: 500 });
  }
}

// POST: สร้างห้องพักใหม่
export async function POST(request) {
  try {
    await connectMongoDB();

    const body = await request.json();
    
    // ตรวจสอบข้อมูลที่จำเป็น
    const requiredFields = ['name', 'description', 'location', 'price', 'bedrooms', 'bathrooms', 'maxGuests', 'size', 'mainImage', 'createdBy'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json({
        success: false,
        message: `ข้อมูลไม่ครบถ้วน: ${missingFields.join(', ')}`
      }, { status: 400 });
    }

    // สร้างห้องพักใหม่
    const newRoom = new Room({
      ...body,
      // ตั้งค่าเริ่มต้น
      isAvailable: body.isAvailable !== undefined ? body.isAvailable : true,
      isFeature: body.isFeature || false,
      averageRating: 0,
      totalReviews: 0,
      publishedAt: new Date()
    });

    const savedRoom = await newRoom.save();

    return NextResponse.json({
      success: true,
      data: savedRoom,
      message: 'สร้างห้องพักใหม่สำเร็จแล้ว'
    }, { status: 201 });

  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการสร้างห้องพัก:', error);
    
    // จัดการข้อผิดพลาดแบบต่างๆ
    if (error.name === 'ValidationError') {
      const errorMessages = Object.values(error.errors).map(err => err.message);
      return NextResponse.json({
        success: false,
        message: 'ข้อมูลไม่ถูกต้อง',
        errors: errorMessages
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการสร้างห้องพัก',
      error: error.message
    }, { status: 500 });
  }
}