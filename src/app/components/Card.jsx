"use client"

/**
 * คอมโพเนนต์การ์ดหลัก - รองรับ animation และ effects
 * @param {boolean} hover - เอฟเฟกต์เมื่อ hover
 * @param {boolean} gradient - ใช้พื้นหลัง gradient หรือไม่
 */
const Card = ({ children, className = '', hover = true, gradient = false }) => {
  const baseClasses = 'bg-white rounded-2xl border border-gray-100 transition-all duration-300';
  const hoverClasses = hover ? 'hover:shadow-2xl hover:-translate-y-1 hover:border-blue-200' : '';
  const gradientClasses = gradient ? 'bg-gradient-to-br from-white to-blue-50/30' : '';
  const shadowClasses = 'shadow-lg';
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${gradientClasses} ${shadowClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card;