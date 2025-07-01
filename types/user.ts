export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'MODERATOR' | 'THERAPIST' | 'COACH' | 'PREMIUM_MEMBER' | 'MEMBER';
  isActive: boolean;
  emailVerified: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

