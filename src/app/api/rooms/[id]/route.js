import { NextResponse } from 'next/server';
// แก้ไขจำนวน ../ ให้ถูกต้องตามโครงสร้างโปรเจค
import { connectMongoDB } from '../../../../../lib/mongodb';
import Room from '../../../../../models/room';
import mongoose from 'mongoose';

// GET: ดึงข้อมูลห้องพักตาม ID
export async function GET(request, { params }) {
  try {
    await connectMongoDB();

    const { id } = params;

    // ตรวจสอบว่า ID ถูกต้องหรือไม่
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({
        success: false,
        message: 'รหัสห้องพักไม่ถูกต้อง'
      }, { status: 400 });
    }

    // ค้นหาห้องพัก
    const room = await Room.findById(id)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');

    if (!room) {
      return NextResponse.json({
        success: false,
        message: 'ไม่พบห้องพักที่ระบุ'
      }, { status: 404 });
    }

    // ตรวจสอบว่าห้องพักเผยแพร่แล้วหรือไม่
    if (!room.isPublished) {
      return NextResponse.json({
        success: false,
        message: 'ห้องพักนี้ยังไม่เปิดให้บริการ'
      }, { status: 403 });
    }

    // ดึงห้องพักที่แนะนำอื่นๆ (ไม่รวมห้องปัจจุบัน)
    const relatedRooms = await Room.find({
      _id: { $ne: id },
      category: room.category,
      isAvailable: true,
      isPublished: true
    })
      .limit(4)
      .select('name mainImage price location averageRating totalReviews')
      .lean();

    return NextResponse.json({
      success: true,
      data: {
        room,
        relatedRooms
      },
      message: 'ดึงข้อมูลห้องพักสำเร็จ'
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

// PUT: อัพเดทข้อมูลห้องพัก
export async function PUT(request, { params }) {
  try {
    await connectMongoDB();

    const { id } = params;
    const body = await request.json();

    // ตรวจสอบว่า ID ถูกต้องหรือไม่
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({
        success: false,
        message: 'รหัสห้องพักไม่ถูกต้อง'
      }, { status: 400 });
    }

    // ตรวจสอบว่าห้องพักมีอยู่หรือไม่
    const existingRoom = await Room.findById(id);
    if (!existingRoom) {
      return NextResponse.json({
        success: false,
        message: 'ไม่พบห้องพักที่ระบุ'
      }, { status: 404 });
    }

    // อัพเดทข้อมูล
    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      {
        ...body,
        updatedBy: body.updatedBy // ID ของผู้แก้ไข
      },
      {
        new: true, // ส่งข้อมูลใหม่กลับ
        runValidators: true // ตรวจสอบ validation
      }
    ).populate('createdBy updatedBy', 'name email');

    return NextResponse.json({
      success: true,
      data: updatedRoom,
      message: 'อัพเดทข้อมูลห้องพักสำเร็จ'
    });

  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการอัพเดทห้องพัก:', error);
    
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
      message: 'เกิดข้อผิดพลาดในการอัพเดทห้องพัก',
      error: error.message
    }, { status: 500 });
  }
}

// DELETE: ลบห้องพัก
export async function DELETE(request, { params }) {
  try {
    await connectMongoDB();

    const { id } = params;

    // ตรวจสอบว่า ID ถูกต้องหรือไม่
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({
        success: false,
        message: 'รหัสห้องพักไม่ถูกต้อง'
      }, { status: 400 });
    }

    // ตรวจสอบว่าห้องพักมีอยู่หรือไม่
    const room = await Room.findById(id);
    if (!room) {
      return NextResponse.json({
        success: false,
        message: 'ไม่พบห้องพักที่ระบุ'
      }, { status: 404 });
    }

    // ลบห้องพัก
    await Room.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: `ลบห้องพัก "${room.name}" สำเร็จแล้ว`
    });

  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการลบห้องพัก:', error);
    return NextResponse.json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการลบห้องพัก',
      error: error.message
    }, { status: 500 });
  }
}

// PATCH: อัพเดทสถานะห้องพัก (เปิด/ปิดการจอง)
export async function PATCH(request, { params }) {
  try {
    await connectMongoDB();

    const { id } = params;
    const { action, updatedBy } = await request.json();

    // ตรวจสอบว่า ID ถูกต้องหรือไม่
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({
        success: false,
        message: 'รหัสห้องพักไม่ถูกต้อง'
      }, { status: 400 });
    }

    const room = await Room.findById(id);
    if (!room) {
      return NextResponse.json({
        success: false,
        message: 'ไม่พบห้องพักที่ระบุ'
      }, { status: 404 });
    }

    let updateData = { updatedBy };
    let message = '';

    switch (action) {
      case 'toggle-availability':
        updateData.isAvailable = !room.isAvailable;
        message = `${updateData.isAvailable ? 'เปิด' : 'ปิด'}การจองห้องพักสำเร็จ`;
        break;
      
      case 'toggle-feature':
        updateData.isFeature = !room.isFeature;
        message = `${updateData.isFeature ? 'เพิ่ม' : 'ลบ'}ห้องพักจากรายการแนะนำสำเร็จ`;
        break;
      
      case 'toggle-publish':
        updateData.isPublished = !room.isPublished;
        message = `${updateData.isPublished ? 'เผยแพร่' : 'ซ่อน'}ห้องพักสำเร็จ`;
        break;
      
      default:
        return NextResponse.json({
          success: false,
          message: 'การดำเนินการไม่ถูกต้อง'
        }, { status: 400 });
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    return NextResponse.json({
      success: true,
      data: updatedRoom,
      message
    });

  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการอัพเดทสถานะห้องพัก:', error);
    return NextResponse.json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการอัพเดทสถานะห้องพัก',
      error: error.message
    }, { status: 500 });
  }
}