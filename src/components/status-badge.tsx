import React from 'react';
import { Chip } from '@heroui/react';

interface StatusBadgeProps {
  status: 'Approved' | 'Pending' | 'Rejected';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusConfig = {
    Approved: { color: 'success', icon: 'lucide:check-circle' },
    Pending: { color: 'warning', icon: 'lucide:clock' },
    Rejected: { color: 'danger', icon: 'lucide:x-circle' },
  };

  const config = statusConfig[status];

  return (
    <Chip
      color={config.color as 'success' | 'warning' | 'danger'}
      variant="flat"
      size="sm"
    >
      {status}
    </Chip>
  );
};

export default StatusBadge;