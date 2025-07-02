// import { NextResponse } from 'next/server'

// export async function POST(request: Request) {
//   const { email, password } = await request.json()

//   // Mock admin
//   if (email === 'admin@example.com' && password === '123456') {
//     return NextResponse.json({
//       token: 'mocked_jwt_token_admin',
//       user: {
//         id: 1,
//         email,
//         role: 'admin',
//         name: 'Admin User',
//       },
//     })
//   }

//   // Mock coach
//   if (email === 'coach@example.com' && password === '123456') {
//     return NextResponse.json({
//       token: 'mocked_jwt_token_coach',
//       user: {
//         id: 2,
//         email,
//         role: 'coach',
//         name: 'Coach User',
//       },
//     })
//   }

//   // Mock user thường
//   if (email === 'user@example.com' && password === '123456') {
//     return NextResponse.json({
//       token: 'mocked_jwt_token_user',
//       user: {
//         id: 3,
//         email,
//         role: 'user',
//         name: 'Normal User',
//       },
//     })
//   }

//   // Sai thông tin
//   return NextResponse.json(
//     { message: 'Email hoặc mật khẩu không đúng' },
//     { status: 401 }
//   )
// }