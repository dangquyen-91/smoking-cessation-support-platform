import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = 'your_jwt_secret';

// Đăng nhập tài khoản mẫu FE (không gọi backend)
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    // Kiểm tra dữ liệu đầu vào
    if (!email || !password) {
      return NextResponse.json(
        {
          message: 'Email và mật khẩu là bắt buộc',
          errors: {
            email: !email ? 'Vui lòng nhập email' : undefined,
            password: !password ? 'Vui lòng nhập mật khẩu' : undefined,
          },
        },
        { status: 400 }
      );
    }

    // Tìm user trong DB
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        {
          message: 'Email hoặc mật khẩu không đúng',
          errors: { api: 'Email hoặc mật khẩu không đúng' },
        },
        { status: 401 }
      );
    }

    // So sánh password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        {
          message: 'Email hoặc mật khẩu không đúng',
          errors: { api: 'Email hoặc mật khẩu không đúng' },
        },
        { status: 401 }
      );
    }

    // Tạo JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    // Ẩn password khi trả về user
    const { password: _, ...userData } = user;
    return NextResponse.json({
      message: 'Đăng nhập thành công',
      user: userData,
      token,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Lỗi máy chủ', errors: { api: 'Lỗi máy chủ' } },
      { status: 500 }
    );
  }
}
