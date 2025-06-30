import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardFooter, Input, Button, Select, SelectItem, Divider, Checkbox, addToast } from '@heroui/react';
import { Icon } from '@iconify/react';
import PageHeader from '../../../components/page-header';

const AddTeamPage: React.FC = () => {
  const history = useHistory();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const roles = ['Manager', 'Agent', 'Supervisor', 'Admin'];
  const departments = ['Sales', 'Support', 'Operations', 'Finance'];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      addToast({
        title: 'Team Member Added',
        description: 'New team member has been created successfully',
        color: 'success',
      });
      setIsSubmitting(false);
      history.push('/admin/teams');
    }, 1500);
  };
  
  const handleCancel = () => {
    history.push('/admin/teams');
  };
  
  return (
    <div>
      <PageHeader 
        title="Add Team Member" 
        subtitle="Create a new team member account"
        backPath="/admin/teams"
      />
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border border-divider mb-6">
              <CardHeader>
                <h3 className="text-lg font-semibold">Personal Information</h3>
              </CardHeader>
              <Divider />
              <CardBody className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    placeholder="Enter first name"
                    isRequired
                  />
                  <Input
                    label="Last Name"
                    placeholder="Enter last name"
                    isRequired
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Email"
                    placeholder="Enter email address"
                    type="email"
                    isRequired
                  />
                  <Input
                    label="Phone"
                    placeholder="Enter phone number"
                    type="tel"
                    isRequired
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Role"
                    placeholder="Select role"
                    isRequired
                  >
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </Select>
                  
                  <Select
                    label="Department"
                    placeholder="Select department"
                    isRequired
                  >
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Status"
                    placeholder="Select status"
                    defaultSelectedKeys={['Active']}
                    isRequired
                  >
                    <SelectItem key="Active" value="Active">Active</SelectItem>
                    <SelectItem key="Inactive" value="Inactive">Inactive</SelectItem>
                  </Select>
                  
                  <Input
                    label="Employee ID"
                    placeholder="Enter employee ID (optional)"
                  />
                </div>
              </CardBody>
            </Card>
            
            <Card className="border border-divider mb-6">
              <CardHeader>
                <h3 className="text-lg font-semibold">Account Setup</h3>
              </CardHeader>
              <Divider />
              <CardBody className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Username"
                    placeholder="Enter username"
                    isRequired
                  />
                  <Input
                    label="Password"
                    placeholder="Enter password"
                    type="password"
                    isRequired
                  />
                </div>
                
                <div>
                  <Checkbox defaultSelected>
                    <span className="text-sm">
                      Send account details to team member via email
                    </span>
                  </Checkbox>
                </div>
                
                <div>
                  <Checkbox defaultSelected>
                    <span className="text-sm">
                      Require password change on first login
                    </span>
                  </Checkbox>
                </div>
              </CardBody>
            </Card>
          </div>
          
          <div>
            <Card className="border border-divider mb-6">
              <CardHeader>
                <h3 className="text-lg font-semibold">Permissions</h3>
              </CardHeader>
              <Divider />
              <CardBody className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Lead Management</p>
                    <p className="text-default-500 text-xs">Create and manage leads</p>
                  </div>
                  <Select
                    aria-label="Lead Management Permission"
                    className="w-24"
                    defaultSelectedKeys={['yes']}
                  >
                    <SelectItem key="yes" value="yes">Yes</SelectItem>
                    <SelectItem key="no" value="no">No</SelectItem>
                  </Select>
                </div>
                
                <Divider />
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Partner Management</p>
                    <p className="text-default-500 text-xs">Manage partner accounts</p>
                  </div>
                  <Select
                    aria-label="Partner Management Permission"
                    className="w-24"
                    defaultSelectedKeys={['yes']}
                  >
                    <SelectItem key="yes" value="yes">Yes</SelectItem>
                    <SelectItem key="no" value="no">No</SelectItem>
                  </Select>
                </div>
                
                <Divider />
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Lender Management</p>
                    <p className="text-default-500 text-xs">Manage lender accounts</p>
                  </div>
                  <Select
                    aria-label="Lender Management Permission"
                    className="w-24"
                    defaultSelectedKeys={['yes']}
                  >
                    <SelectItem key="yes" value="yes">Yes</SelectItem>
                    <SelectItem key="no" value="no">No</SelectItem>
                  </Select>
                </div>
                
                <Divider />
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Team Management</p>
                    <p className="text-default-500 text-xs">Manage team members</p>
                  </div>
                  <Select
                    aria-label="Team Management Permission"
                    className="w-24"
                    defaultSelectedKeys={['no']}
                  >
                    <SelectItem key="yes" value="yes">Yes</SelectItem>
                    <SelectItem key="no" value="no">No</SelectItem>
                  </Select>
                </div>
                
                <Divider />
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Email & SMS</p>
                    <p className="text-default-500 text-xs">Send communications</p>
                  </div>
                  <Select
                    aria-label="Email & SMS Permission"
                    className="w-24"
                    defaultSelectedKeys={['yes']}
                  >
                    <SelectItem key="yes" value="yes">Yes</SelectItem>
                    <SelectItem key="no" value="no">No</SelectItem>
                  </Select>
                </div>
                
                <Divider />
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Analytics & Reports</p>
                    <p className="text-default-500 text-xs">View analytics and reports</p>
                  </div>
                  <Select
                    aria-label="Analytics Permission"
                    className="w-24"
                    defaultSelectedKeys={['yes']}
                  >
                    <SelectItem key="yes" value="yes">Yes</SelectItem>
                    <SelectItem key="no" value="no">No</SelectItem>
                  </Select>
                </div>
              </CardBody>
            </Card>
            
            <Card className="border border-divider sticky top-6">
              <CardHeader>
                <h3 className="text-lg font-semibold">Save Team Member</h3>
              </CardHeader>
              <Divider />
              <CardBody>
                <p className="text-default-500 text-sm mb-4">
                  Please review all information before creating the team member account.
                </p>
              </CardBody>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="flat" 
                  onPress={handleCancel}
                >
                  Cancel
                </Button>
                <Button 
                  color="primary" 
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Create Team Member
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTeamPage;