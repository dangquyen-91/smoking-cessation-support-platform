import { NextRequest, NextResponse } from 'next/server';

// Đăng ký
export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();
    const errors: Record<string, string> = {};
    if (!email) errors.email = 'Vui lòng nhập email';
    if (!password) errors.password = 'Vui lòng nhập mật khẩu';
    if (!name) errors.name = 'Vui lòng nhập tên';
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { message: 'Thông tin không hợp lệ', errors },
        { status: 400 }
      );
    }
    // TODO: Thay thế bằng kiểm tra DB thực tế
    if (email === 'test@example.com') {
      return NextResponse.json(
        { message: 'Email đã tồn tại', errors: { email: 'Email đã tồn tại' } },
        { status: 409 }
      );
    }
    // Giả lập tạo user mới
    const user = { id: Date.now(), email, name };
    const token = 'fake-jwt-token';
    return NextResponse.json({
      message: 'Đăng ký thành công',
      user,
      token,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Lỗi máy chủ', errors: { api: 'Lỗi máy chủ' } },
      { status: 500 }
    );
  }
}
