"use client"; // Nếu bạn không cần interactivity, có thể bỏ dòng này

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";

export default function Header() {
  const [showSubmenu, setShowSubmenu] = useState(false);

  return (
    <header className="bg-black text-white">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-red-600">VQuit</span>
        </div>     

        {/* Search + Đăng nhập */}
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Từ khóa..."
            className="px-2 py-1 text-black text-sm rounded border border-white bg-transparent placeholder-white"
          />
          <Button className="bg-red-700 px-3 py-1 text-sm rounded">Tìm kiếm</Button>

          <div>
         <Button className="mx-2">
            <Link href="#">Đăng Nhập</Link>
         </Button>
          <Button className="mx-2">
            <Link href="#">Đăng Ký</Link>
          </Button>
        </div>
        </div>
        
      </div>

      {/* Navigation Bar */}
      <nav className="bg-red-900 text-white text-sm">
        <ul className="flex flex-wrap justify-center px-6 relative">
          <li
            className="relative group"
            onMouseEnter={() => setShowSubmenu(true)}
            onMouseLeave={() => setShowSubmenu(false)}
          >
            <button className="flex items-center px-4 py-2 hover:bg-red-700 relative z-20">
              VỀ CHÚNG TÔI <ChevronDown size={14} className="ml-1" />
            </button>
            {showSubmenu && (
              <ul className="absolute left-0 top-full bg-red-800 w-40 shadow-md z-30">
                <li className="px-4 py-2 hover:bg-red-600 border-b border-red-700 ">
                  <Link href="#">Giới thiệu</Link>
                </li>
                <li className="px-4 py-2 hover:bg-red-600 ">
                  <Link href="#">Tin tức</Link>
                </li>
              </ul>
            )}
          </li>
          <li className="px-4 py-2 hover:bg-red-700 text-center flex-1">KIẾN THỨC CHUNG</li>
          <li className="px-4 py-2 hover:bg-red-700 text-center flex-1">HƯỚNG DẪN CAI THUỐC</li>
          <li className="px-4 py-2 hover:bg-red-700 text-center flex-1">DỊCH VỤ & SẢN PHẨM</li>
          <li className="px-4 py-2 hover:bg-red-700 text-center flex-1">CÔNG CỤ HỖ TRỢ</li>
          <li className="px-4 py-2 hover:bg-red-700 text-center flex-1">DÀNH CHO CÁN BỘ Y TẾ</li>
        </ul>
      </nav>
    </header>
  );
}
