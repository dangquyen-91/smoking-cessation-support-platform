import React from 'react';
import { TrendingUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, color }) => (
  <div
    className="bg-white rounded-lg shadow-md p-6 border-l-4"
    style={{ borderLeftColor: color }}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {trend && (
          <p className="text-sm text-green-600 mt-1">
            <TrendingUp className="inline w-4 h-4 mr-1" />
            {trend}
          </p>
        )}
      </div>
      <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
        {icon}
      </div>
    </div>
  </div>
);

export default StatCard;

