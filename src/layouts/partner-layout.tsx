import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarContent, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, Divider } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '../context/auth-context';
import Sidebar from '../components/sidebar';
import { motion } from 'framer-motion';

interface PartnerLayoutProps {
  children: React.ReactNode;
}

const PartnerLayout: React.FC<PartnerLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const sidebarItems = [
    { 
      key: 'dashboard', 
      label: 'Dashboard', 
      icon: 'lucide:layout-dashboard', 
      path: '/partner/dashboard' 
    },
    { 
      key: 'leads', 
      label: 'Leads', 
      icon: 'lucide:users', 
      path: '/partner/leads' 
    },
    { 
      key: 'lenders', 
      label: 'Lenders', 
      icon: 'lucide:building-2', 
      path: '/partner/lenders' 
    },
    { 
      key: 'teams', 
      label: 'Teams', 
      icon: 'lucide:users-2', 
      path: '/partner/teams' 
    },
    { 
      key: 'email', 
      label: 'Email', 
      icon: 'lucide:mail', 
      path: '/partner/email' 
    },
    { 
      key: 'analytics', 
      label: 'Analytics', 
      icon: 'lucide:bar-chart-2', 
      path: '/partner/analytics' 
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-default-50">
      <Sidebar 
        items={sidebarItems}
        isOpen={isSidebarOpen}
        currentPath={location.pathname}
        onToggle={toggleSidebar}
        role="Partner Panel"
      />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar maxWidth="full" className="border-b">
          <NavbarContent className="sm:hidden">
            <Button 
              isIconOnly 
              variant="light" 
              onPress={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              <Icon icon="lucide:menu" className="text-xl" />
            </Button>
          </NavbarContent>
          
         <NavbarBrand className="hidden sm:flex py-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <h1 className="text-2xl font-bold text-orange-500">
                🎉 Welcome back, Vakil!
              </h1>
              <p className="text-gray-600 mt-1">
                Let’s crush those goals today with Credifyy 💼
              </p>
            </motion.div>
          </NavbarBrand>
          
          <NavbarContent justify="end">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button variant="light" isIconOnly className="rounded-full">
                  <Avatar 
                    name={user?.name || 'Partner'} 
                    size="sm"
                    color="secondary"
                    isBordered
                  />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="User menu">
                <DropdownItem key="profile" textValue="Profile">
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold">{user?.name}</p>
                    <p className="text-default-500 text-xs">{user?.email}</p>
                  </div>
                </DropdownItem>
                <DropdownItem key="role" textValue="Role">
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:briefcase" className="text-default-500" />
                    <span>Partner</span>
                  </div>
                </DropdownItem>
                <DropdownItem key="settings" textValue="Settings">
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:settings" className="text-default-500" />
                    <span>Settings</span>
                  </div>
                </DropdownItem>
                <DropdownItem key="divider">
                  <Divider />
                </DropdownItem>
                <DropdownItem 
                  key="logout" 
                  color="danger" 
                  className="text-danger"
                  onPress={logout}
                >
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:log-out" />
                    <span>Log Out</span>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        </Navbar>
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PartnerLayout;