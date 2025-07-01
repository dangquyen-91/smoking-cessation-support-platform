import React from 'react';
import { UserCheck, Clock, AlertCircle } from 'lucide-react';
import { User } from '../types/user';

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    {/* ...phần header giống code gốc... */}
    <tbody>
      {users.map(user => (
        <tr key={user.id} className="hover:bg-gray-50">
          {/* ... */}
        </tr>
      ))}
    </tbody>
  </div>
);

export default UserTable;

