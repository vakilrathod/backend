import React from 'react';
import { Card, CardBody } from '@heroui/react';
import { Icon } from '@iconify/react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  change?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon, 
  change,
  color = 'primary'
}) => {
  const colorClasses = {
    primary: 'bg-primary-100 text-primary-500',
    secondary: 'bg-secondary-100 text-secondary-500',
    success: 'bg-success-100 text-success-500',
    warning: 'bg-warning-100 text-warning-500',
    danger: 'bg-danger-100 text-danger-500',
  };

  return (
    <Card className="border border-divider">
      <CardBody>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-default-500 text-sm">{title}</p>
            <h3 className="text-2xl font-semibold mt-1">{value}</h3>
            
            {change && (
              <div className="flex items-center mt-2">
                <Icon 
                  icon={change.isPositive ? 'lucide:trending-up' : 'lucide:trending-down'} 
                  className={change.isPositive ? 'text-success-500' : 'text-danger-500'}
                />
                <span 
                  className={`text-xs ml-1 ${change.isPositive ? 'text-success-500' : 'text-danger-500'}`}
                >
                  {change.isPositive ? '+' : ''}{change.value}%
                </span>
                <span className="text-xs text-default-400 ml-1">vs last month</span>
              </div>
            )}
          </div>
          
          <div className={`p-2 rounded-md ${colorClasses[color]}`}>
            <Icon icon={icon} className="text-xl" />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default StatsCard;