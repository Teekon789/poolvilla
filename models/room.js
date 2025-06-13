import mongoose, { Schema } from "mongoose";

// สร้าง Schema สำหรับสิ่งอำนวยความสะดวก
const amenitySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
}, { _id: false });

// สร้าง Schema สำหรับรูปภาพ
const imageSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ""
  }
}, { _id: false });

// สร้าง Schema หลักสำหรับห้องพัก
const roomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    bedrooms: {
      type: Number,
      required: true,
      min: 1
    },
    bathrooms: {
      type: Number,
      required: true,
      min: 1
    },
    maxGuests: {
      type: Number,
      required: true,
      min: 1
    },
    size: {
      type: Number, // ขนาดห้องในตารางเมตร
      required: true,
      min: 1
    },
    mainImage: {
      type: String,
      required: true
    },
    images: [imageSchema], // รูปภาพเพิ่มเติม
    amenities: [amenitySchema], // สิ่งอำนวยความสะดวก
    isAvailable: {
      type: Boolean,
      default: true
    },
    isFeature: {
      type: Boolean,
      default: false
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalReviews: {
      type: Number,
      default: 0,
      min: 0
    },
    // ข้อมูลการติดต่อ
    contactInfo: {
      lineId: String,
      phone: String,
      email: String
    },
    // ข้อมูลเพิ่มเติม
    checkInTime: {
      type: String,
      default: "14:00"
    },
    checkOutTime: {
      type: String,
      default: "12:00"
    },
    rules: [String], // กฎของที่พัก
    cancellationPolicy: {
      type: String,
      default: "ยกเลิกได้ฟรีก่อน 24 ชั่วโมง"
    },
    // สำหรับ SEO และการค้นหา
    tags: [String],
    category: {
      type: String,
      enum: ['pool-villa', 'beach-villa', 'mountain-villa', 'city-villa', 'luxury-villa'],
      default: 'pool-villa'
    },
    // สถานะการเผยแพร่
    isPublished: {
      type: Boolean,
      default: true
    },
    publishedAt: {
      type: Date,
      default: Date.now
    },
    // ข้อมูลผู้สร้าง/แก้ไข
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { 
    timestamps: true, // เพิ่ม createdAt และ updatedAt อัตโนมัติ
    toJSON: { virtuals: true }, // รวม virtual fields เมื่อแปลงเป็น JSON
    toObject: { virtuals: true }
  }
);

// สร้าง Virtual Fields
roomSchema.virtual('pricePerPerson').get(function() {
  return Math.round(this.price / this.maxGuests);
});

roomSchema.virtual('isPopular').get(function() {
  return this.totalReviews > 10 && this.averageRating >= 4.0;
});

// สร้าง Index สำหรับการค้นหา
roomSchema.index({ name: 'text', description: 'text', location: 'text' });
roomSchema.index({ price: 1 });
roomSchema.index({ isAvailable: 1 });
roomSchema.index({ isFeature: 1 });
roomSchema.index({ averageRating: -1 });
roomSchema.index({ createdAt: -1 });
roomSchema.index({ category: 1 });

// สร้าง Static Methods
roomSchema.statics.getAvailableRooms = function() {
  return this.find({ isAvailable: true, isPublished: true });
};

roomSchema.statics.getFeaturedRooms = function() {
  return this.find({ isFeature: true, isAvailable: true, isPublished: true });
};

roomSchema.statics.searchRooms = function(searchTerm) {
  return this.find({
    $text: { $search: searchTerm },
    isAvailable: true,
    isPublished: true
  });
};

// สร้าง Instance Methods
roomSchema.methods.updateRating = function(newRating) {
  const totalScore = this.averageRating * this.totalReviews + newRating;
  this.totalReviews += 1;
  this.averageRating = totalScore / this.totalReviews;
  return this.save();
};

roomSchema.methods.toggleAvailability = function() {
  this.isAvailable = !this.isAvailable;
  return this.save();
};

// Middleware - ทำงานก่อนบันทึกข้อมูล
roomSchema.pre('save', function(next) {
  if (this.isModified('averageRating')) {
    // ปัดเศษคะแนนเป็น 1 ทศนิยม
    this.averageRating = Math.round(this.averageRating * 10) / 10;
  }
  next();
});

// Middleware - ทำงานก่อนลบข้อมูล
roomSchema.pre('deleteOne', { document: true }, async function(next) {
  // ลบรูปภาพที่เกี่ยวข้อง (ถ้ามี)
  console.log(`กำลังลบห้องพัก: ${this.name}`);
  next();
});

const Room = mongoose.models.Room || mongoose.model("Room", roomSchema);
export default Room;