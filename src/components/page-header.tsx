import React from 'react';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionPath?: string;
  actionIcon?: string;
  onActionClick?: () => void;
  backPath?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  actionLabel,
  actionPath,
  actionIcon = 'lucide:plus',
  onActionClick,
  backPath
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        {backPath && (
          <Link to={backPath}>
            <Button 
              isIconOnly 
              variant="light" 
              size="sm" 
              aria-label="Go back"
            >
              <Icon icon="lucide:arrow-left" className="text-lg" />
            </Button>
          </Link>
        )}
        <div>
          <h1 className="text-2xl font-semibold">{title}</h1>
          {subtitle && <p className="text-default-500">{subtitle}</p>}
        </div>
      </div>
      
      {(actionLabel && (actionPath || onActionClick)) && (
        <div>
          {actionPath ? (
            <Link to={actionPath}>
              <Button color="primary">
                <Icon icon={actionIcon} />
                <span>{actionLabel}</span>
              </Button>
            </Link>
          ) : (
            <Button color="primary" onPress={onActionClick}>
              <Icon icon={actionIcon} />
              <span>{actionLabel}</span>
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default PageHeader;