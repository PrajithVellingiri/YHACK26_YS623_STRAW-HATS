import React from 'react';
import { ApplicationStatus } from '../../types';
import { Badge } from './Badge';

interface StatusBadgeProps {
  status: ApplicationStatus;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const statusConfig: Record<ApplicationStatus, { label: string; className: string }> = {
    NOT_STARTED: { label: 'Not Started', className: 'bg-[#1A1A1A] text-text-muted border border-border shadow-sm' },
    SUBMITTED: { label: 'Submitted', className: 'bg-[#1A1A1A] text-accent-yellow border border-[#FFB800] shadow-[0_0_8px_rgba(255,184,0,0.15)]' },
    UNDER_REVIEW: { label: 'Under Review', className: 'bg-[#1A1A1A] text-[#00E5FF] border border-[#00E5FF] shadow-[0_0_8px_rgba(0,229,255,0.15)]' },
    APPROVED: { label: 'Approved', className: 'bg-[#1A1A1A] text-accent-green border border-accent-green shadow-[0_0_8px_rgba(174,255,0,0.15)]' },
  };

  const config = statusConfig[status];

  return (
    <Badge className={`${config.className} ${className}`}>
      {config.label}
    </Badge>
  );
};
