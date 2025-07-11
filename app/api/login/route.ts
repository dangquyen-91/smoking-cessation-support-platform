import { NextRequest, NextResponse } from 'next/server';

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
    // Kiểm tra tài khoản mẫu FE
    if (email === 'test@example.com' && password === '123456') {
      const user = { id: 1, email, name: 'Test User' };
      const token = 'fake-jwt-token';
      return NextResponse.json({
        message: 'Đăng nhập thành công',
        user,
        token,
      });
    } else {
      return NextResponse.json(
        {
          message: 'Email hoặc mật khẩu không đúng',
          errors: { api: 'Email hoặc mật khẩu không đúng' },
        },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Lỗi máy chủ', errors: { api: 'Lỗi máy chủ' } },
      { status: 500 }
    );
  }
}
