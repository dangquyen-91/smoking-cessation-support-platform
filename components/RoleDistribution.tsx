import React from 'react';
import { DashboardStats } from 'smoking-cessation-support-platform/types/dashboard'; // dùng lại kiểu nếu muốn

interface RoleDistributionProps {
  stats: { [key: string]: number };
}

const RoleDistribution: React.FC<RoleDistributionProps> = ({ stats }) => {
  const total = Object.values(stats).reduce((sum, v) => sum + v, 0);
  const roleColors: { [key: string]: string } = {
    ADMIN: '#EF4444',
    MODERATOR: '#F97316',
    THERAPIST: '#3B82F6',
    COACH: '#10B981',
    PREMIUM_MEMBER: '#8B5CF6',
    MEMBER: '#6B7280'
  };

  return (
   <div key={role}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">
                  {role.replace('_', ' ')}
                </span>
                <span className="text-sm text-gray-500">{count}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: roleColors[role]
                  }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {percentage.toFixed(1)}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default RoleDistribution;

