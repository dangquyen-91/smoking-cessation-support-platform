import { useState, useEffect } from 'react';
import ApiService from '../services/api';
import { DashboardStats } from '../types/dashboard';
import { User } from '../types/user';

export function useDashboardData() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [userStats, setUserStats] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ApiService.getDashboardStats()
      .then(ds => setStats(ds))
      .catch(console.error);
    ApiService.getRecentUsers()
      .then(u => setRecentUsers(u))
      .catch(console.error);
    ApiService.getUserStats()
      .then(us => setUserStats(us))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { stats, recentUsers, userStats, loading };
}

