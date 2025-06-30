import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardFooter, Input, Button, Select, SelectItem, Divider, Textarea, addToast } from '@heroui/react';
import { Icon } from '@iconify/react';
import PageHeader from '../../../components/page-header';

const AddPartnerPage: React.FC = () => {
  const history = useHistory();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      addToast({
        title: 'Partner Added',
        description: 'New partner has been created successfully',
        color: 'success',
      });
      setIsSubmitting(false);
      history.push('/admin/partners');
    }, 1500);
  };
  
  const handleCancel = () => {
    history.push('/admin/partners');
  };
  
  return (
    <div>
      <PageHeader 
        title="Add New Partner" 
        subtitle="Create a new partner account"
        backPath="/admin/partners"
      />
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border border-divider mb-6">
              <CardHeader>
                <h3 className="text-lg font-semibold">Partner Information</h3>
              </CardHeader>
              <Divider />
              <CardBody className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Partner Name"
                    placeholder="Enter partner name"
                    isRequired
                  />
                  <Input
                    label="Company Name"
                    placeholder="Enter company name"
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
                
                <div>
                  <Input
                    label="Address"
                    placeholder="Enter address"
                    isRequired
                  />
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
                    label="Website"
                    placeholder="Enter website URL"
                    type="url"
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Commission Structure"
                    placeholder="Select commission structure"
                    isRequired
                  >
                    <SelectItem key="fixed" value="fixed">Fixed Rate</SelectItem>
                    <SelectItem key="percentage" value="percentage">Percentage</SelectItem>
                    <SelectItem key="tiered" value="tiered">Tiered</SelectItem>
                  </Select>
                  
                  <Input
                    label="Commission Rate"
                    placeholder="Enter commission rate"
                    type="number"
                    isRequired
                  />
                </div>
                
                <div>
                  <Textarea
                    label="Additional Notes"
                    placeholder="Enter any additional information about this partner"
                    minRows={3}
                  />
                </div>
              </CardBody>
            </Card>
            
            <Card className="border border-divider">
              <CardHeader>
                <h3 className="text-lg font-semibold">API Access</h3>
              </CardHeader>
              <Divider />
              <CardBody className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="API Access"
                    placeholder="Select API access level"
                    defaultSelectedKeys={['enabled']}
                    isRequired
                  >
                    <SelectItem key="enabled" value="enabled">Enabled</SelectItem>
                    <SelectItem key="disabled" value="disabled">Disabled</SelectItem>
                  </Select>
                  
                  <Input
                    label="Rate Limit (requests per minute)"
                    placeholder="Enter rate limit"
                    type="number"
                    defaultValue="60"
                  />
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">API Key</p>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="API key will be generated automatically"
                      isReadOnly
                      value="••••••••••••••••••••••••••••••"
                    />
                    <Button isIconOnly variant="flat">
                      <Icon icon="lucide:copy" />
                    </Button>
                  </div>
                  <p className="text-default-400 text-xs mt-1">
                    API key will be shown only once after partner creation
                  </p>
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
                    <p className="font-medium">View Lenders</p>
                    <p className="text-default-500 text-xs">Access lender information</p>
                  </div>
                  <Select
                    aria-label="View Lenders Permission"
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
                    defaultSelectedKeys={['yes']}
                  >
                    <SelectItem key="yes" value="yes">Yes</SelectItem>
                    <SelectItem key="no" value="no">No</SelectItem>
                  </Select>
                </div>
                
                <Divider />
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Email Campaigns</p>
                    <p className="text-default-500 text-xs">Send email campaigns</p>
                  </div>
                  <Select
                    aria-label="Email Campaigns Permission"
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
                    <p className="font-medium">Analytics</p>
                    <p className="text-default-500 text-xs">Access analytics and reports</p>
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
                <h3 className="text-lg font-semibold">Save Partner</h3>
              </CardHeader>
              <Divider />
              <CardBody>
                <p className="text-default-500 text-sm mb-4">
                  Please review all information before creating the partner account.
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
                  Create Partner
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPartnerPage;