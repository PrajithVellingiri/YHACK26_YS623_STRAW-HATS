import React from 'react';
import { ApplicationStatus } from '../../types';
import { Badge } from './Badge';

interface StatusBadgeProps {
  status: ApplicationStatus;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const statusConfig: Record<ApplicationStatus, { label: string; variant: 'gray' | 'blue' | 'yellow' | 'green' }> = {
    NOT_STARTED: { label: 'Not Started', variant: 'gray' },
    SUBMITTED: { label: 'Submitted', variant: 'blue' },
    UNDER_REVIEW: { label: 'Under Review', variant: 'yellow' },
    APPROVED: { label: 'Approved', variant: 'green' },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
};
