import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cai Thuốc Lá - Hỗ trợ cai thuốc lá hiệu quả",
  description:
    "Website hỗ trợ cai thuốc lá với các công cụ đánh giá, tính chi phí, tài liệu hướng dẫn và cộng đồng hỗ trợ.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <Navigation />
        <main>{children}</main>
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4">Cai Thuốc Lá</h3>
                <p className="text-gray-400 text-sm">
                  Hỗ trợ bạn trong hành trình cai thuốc lá một cách hiệu quả và bền vững.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Công cụ</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <a href="/assessment" className="hover:text-white">
                      Đánh giá nghiện
                    </a>
                  </li>
                  <li>
                    <a href="/cost-calculator" className="hover:text-white">
                      Tính chi phí
                    </a>
                  </li>
                  <li>
                    <a href="/resources" className="hover:text-white">
                      Tài liệu
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Cộng đồng</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <a href="/community" className="hover:text-white">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="/community" className="hover:text-white">
                      Forum
                    </a>
                  </li>
                  <li>
                    <a href="/register" className="hover:text-white">
                      Đăng ký
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Liên hệ</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>Email: support@caithocla.vn</li>
                  <li>Hotline: 1900-1234</li>
                  <li>Địa chỉ: Hà Nội, Việt Nam</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>&copy; 2024 Cai Thuốc Lá. Tất cả quyền được bảo lưu.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
