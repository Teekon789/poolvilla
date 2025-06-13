"use client"

/**
 * คอมโพเนนต์ Badge สำหรับแสดงสถานะ
 * @param {string} variant - ประเภท badge (default, primary, success, warning, danger, featured, available, unavailable)
 */
const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800', 
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    featured: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-md',
    available: 'bg-gradient-to-r from-green-400 to-green-500 text-white shadow-md',
    unavailable: 'bg-gradient-to-r from-red-400 to-red-500 text-white shadow-md'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;