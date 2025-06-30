import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

interface SidebarItem {
  key: string;
  label: string;
  icon: string;
  path: string;
}

interface SidebarProps {
  items: SidebarItem[];
  isOpen: boolean;
  currentPath: string;
  onToggle: () => void;
  role: string;
}

const Sidebar: React.FC<SidebarProps> = ({ items, isOpen, currentPath, onToggle, role }) => {
  return (
    <motion.aside
      initial={{ width: 240 }}
      animate={{ width: isOpen ? 240 : 72 }}
      transition={{ duration: 0.2 }}
      className="bg-content1 border-r border-divider h-screen flex flex-col z-10"
    >
      <div className="p-4 flex items-center justify-between border-b border-divider">
        <div className="flex items-center gap-2">
          {/* Small logo always visible */}

          {/* Full logo only visible when sidebar is open */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <img src="https://res.cloudinary.com/dvsndenmu/image/upload/v1751124602/xelauoffn6xxpdsti775.png" alt="Full Logo" className="h-6 object-contain" />
            </motion.div>
          )}
        </div>
        <Button
          isIconOnly
          variant="light"
          size="sm"
          onPress={onToggle}
          aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          className="hidden sm:flex"
        >
          <Icon icon={isOpen ? 'lucide:chevron-left' : 'lucide:chevron-right'} />
        </Button>
      </div>

      <div className="p-2">
        {isOpen && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="px-3 py-2 text-xs font-medium text-default-500 uppercase"
          >
            {role}
          </motion.p>
        )}

        <nav className="flex flex-col gap-1">
          {items.map((item) => {
            const isActive = currentPath.startsWith(item.path);

            return (
              <Link
                key={item.key}
                to={item.path}
                className={`sidebar-item ${isActive ? 'active' : ''}`}
              >
                <Icon icon={item.icon} className="text-xl" />
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
