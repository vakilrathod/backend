import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardBody, CardHeader, Input, Button, Tabs, Tab, addToast } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '../../context/auth-context';

const LoginPage: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState('admin');
  const { login } = useAuth();
  const history = useHistory();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      addToast({
        title: 'Error',
        description: 'Please enter both email and password',
        color: 'danger'
      });
      return;
    }
    
    try {
      setIsLoading(true);
      await login(email, password);
      
      // Redirect based on role
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.role === 'admin') {
        history.push('/admin/dashboard');
      } else {
        history.push('/partner/dashboard');
      }
    } catch (error) {
      addToast({
        title: 'Login Failed',
        description: error instanceof Error ? error.message : 'Invalid credentials',
        color: 'danger'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-default-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-1 items-center pb-0">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 mb-2">
            <Icon icon="lucide:building-2" className="text-primary-500 text-2xl" />
          </div>
          <h1 className="text-2xl font-semibold text-center">Loan CRM System</h1>
          <p className="text-default-500 text-center">Sign in to your account</p>
        </CardHeader>
        <CardBody>
          <Tabs 
            aria-label="Login Options" 
            selectedKey={selectedTab}
            onSelectionChange={(key) => setSelectedTab(key as string)}
            className="mb-4"
          >
            <Tab key="admin" title="Admin Login" />
            <Tab key="partner" title="Partner Login" />
          </Tabs>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              value={email}
              onValueChange={setEmail}
              startContent={<Icon icon="lucide:mail" className="text-default-400" />}
              isRequired
            />
            
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onValueChange={setPassword}
              startContent={<Icon icon="lucide:lock" className="text-default-400" />}
              isRequired
            />
            
            <div className="pt-2">
              <Button 
                type="submit" 
                color="primary" 
                fullWidth
                isLoading={isLoading}
              >
                Sign In
              </Button>
            </div>
            
            <div className="text-center text-small text-default-500">
              {selectedTab === 'admin' ? (
                <p>Demo: admin@example.com / admin123</p>
              ) : (
                <p>Demo: partner1@example.com / partner123</p>
              )}
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginPage;