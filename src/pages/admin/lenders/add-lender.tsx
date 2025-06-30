import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardFooter, Input, Button, Select, SelectItem, Divider, Textarea, Checkbox, addToast } from '@heroui/react';
import { Icon } from '@iconify/react';
import PageHeader from '../../../components/page-header';

const AddLenderPage: React.FC = () => {
  const history = useHistory();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [selectedLoanTypes, setSelectedLoanTypes] = React.useState<string[]>([]);
  
  const loanTypes = ['Personal', 'Home', 'Car', 'Education', 'Business'];
  
  const handleLoanTypeChange = (type: string) => {
    setSelectedLoanTypes(prev => {
      if (prev.includes(type)) {
        return prev.filter(t => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      addToast({
        title: 'Lender Added',
        description: 'New lender has been created successfully',
        color: 'success',
      });
      setIsSubmitting(false);
      history.push('/admin/lenders');
    }, 1500);
  };
  
  const handleCancel = () => {
    history.push('/admin/lenders');
  };
  
  return (
    <div>
      <PageHeader 
        title="Add New Lender" 
        subtitle="Create a new lender account"
        backPath="/admin/lenders"
      />
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border border-divider mb-6">
              <CardHeader>
                <h3 className="text-lg font-semibold">Lender Information</h3>
              </CardHeader>
              <Divider />
              <CardBody className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Company Name"
                    placeholder="Enter company name"
                    isRequired
                  />
                  <Input
                    label="Contact Person Name"
                    placeholder="Enter contact person name"
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
                <h3 className="text-lg font-semibold">Loan Products</h3>
              </CardHeader>
              <Divider />
              <CardBody className="space-y-6">
                <div>
                  <p className="text-sm font-medium mb-3">Loan Types Offered</p>
                  <div className="flex flex-wrap gap-3">
                    {loanTypes.map((type) => (
                      <Checkbox 
                        key={type}
                        isSelected={selectedLoanTypes.includes(type)}
                        onValueChange={() => handleLoanTypeChange(type)}
                      >
                        {type}
                      </Checkbox>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Interest Rate (%)"
                    placeholder="e.g., 8.5-12.5%"
                    isRequired
                  />
                  <Input
                    label="Processing Fee (%)"
                    placeholder="e.g., 1-2%"
                    isRequired
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Minimum Loan Amount (₹)"
                    placeholder="Enter minimum loan amount"
                    type="number"
                    isRequired
                  />
                  <Input
                    label="Maximum Loan Amount (₹)"
                    placeholder="Enter maximum loan amount"
                    type="number"
                    isRequired
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Minimum Tenure (months)"
                    placeholder="Enter minimum tenure"
                    type="number"
                    isRequired
                  />
                  <Input
                    label="Maximum Tenure (months)"
                    placeholder="Enter maximum tenure"
                    type="number"
                    isRequired
                  />
                </div>
                
                <div>
                  <Textarea
                    label="Loan Description"
                    placeholder="Enter a description of the loan products offered"
                    minRows={3}
                  />
                </div>
              </CardBody>
            </Card>
            
            <Card className="border border-divider">
              <CardHeader>
                <h3 className="text-lg font-semibold">Requirements & Eligibility</h3>
              </CardHeader>
              <Divider />
              <CardBody className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Minimum Age"
                    placeholder="e.g., 21"
                    type="number"
                    isRequired
                  />
                  <Input
                    label="Maximum Age"
                    placeholder="e.g., 65"
                    type="number"
                    isRequired
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Minimum Income (₹/year)"
                    placeholder="Enter minimum income requirement"
                    type="number"
                    isRequired
                  />
                  <Input
                    label="Minimum Credit Score"
                    placeholder="e.g., 700"
                    type="number"
                    isRequired
                  />
                </div>
                
                <div>
                  <Textarea
                    label="Required Documents"
                    placeholder="List all required documents for loan application"
                    minRows={3}
                  />
                </div>
                
                <div>
                  <Textarea
                    label="Additional Eligibility Criteria"
                    placeholder="Enter any additional eligibility criteria"
                    minRows={3}
                  />
                </div>
              </CardBody>
            </Card>
          </div>
          
          <div>
            <Card className="border border-divider mb-6">
              <CardHeader>
                <h3 className="text-lg font-semibold">API Integration</h3>
              </CardHeader>
              <Divider />
              <CardBody className="space-y-4">
                <Select
                  label="API Integration"
                  placeholder="Select integration type"
                  defaultSelectedKeys={['webhook']}
                >
                  <SelectItem key="webhook" value="webhook">Webhook</SelectItem>
                  <SelectItem key="rest" value="rest">REST API</SelectItem>
                  <SelectItem key="none" value="none">No Integration</SelectItem>
                </Select>
                
                <Input
                  label="API Endpoint URL"
                  placeholder="Enter API endpoint URL"
                />
                
                <Input
                  label="API Key"
                  placeholder="Enter API key"
                />
                
                <Select
                  label="Data Format"
                  placeholder="Select data format"
                  defaultSelectedKeys={['json']}
                >
                  <SelectItem key="json" value="json">JSON</SelectItem>
                  <SelectItem key="xml" value="xml">XML</SelectItem>
                </Select>
              </CardBody>
            </Card>
            
            <Card className="border border-divider sticky top-6">
              <CardHeader>
                <h3 className="text-lg font-semibold">Save Lender</h3>
              </CardHeader>
              <Divider />
              <CardBody>
                <p className="text-default-500 text-sm mb-4">
                  Please review all information before creating the lender account.
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
                  Create Lender
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddLenderPage;