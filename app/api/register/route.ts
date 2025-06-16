import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    // Kiểm tra dữ liệu đầu vào
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

    // Giả lập kiểm tra email đã tồn tại
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
