import React from 'react';
    import { useHistory } from 'react-router-dom';
    import { Card, CardBody, CardHeader, CardFooter, Input, Button, Checkbox, Select, SelectItem, Divider, Textarea, addToast } from '@heroui/react';
    import { Icon } from '@iconify/react';
    import { DateInput } from '@heroui/react';
    import { parseDate, getLocalTimeZone } from '@internationalized/date';

    const AddLeadPage: React.FC = () => {
      const history = useHistory();
      const [isSubmitting, setIsSubmitting] = React.useState(false);
      
      const loanTypes = ['Personal', 'Home', 'Car', 'Education', 'Business'];
      const genders = ['Male', 'Female', 'Other'];
      
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate API call
        setTimeout(() => {
          addToast({
            title: 'Lead Added',
            description: 'New lead has been created successfully',
            color: 'success',
          });
          setIsSubmitting(false);
          history.push('/partner/leads');
        }, 1500);
      };
      
      const handleCancel = () => {
        history.push('/partner/leads');
      };
      
      return (
        <div>
          <div className="flex items-center gap-4 mb-6">
            <Button 
              isIconOnly 
              variant="light" 
              onPress={() => history.goBack()}
            >
              <Icon icon="lucide:arrow-left" className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-semibold">Add New Lead</h1>
          </div>
          
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
                        label="Mobile"
                        placeholder="Enter mobile number"
                        type="tel"
                        isRequired
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Select
                        label="Gender"
                        placeholder="Select gender"
                        isRequired
                      >
                        {genders.map((gender) => (
                          <SelectItem key={gender} value={gender}>
                            {gender}
                          </SelectItem>
                        ))}
                      </Select>
                      
                      <DateInput
                        label="Date of Birth"
                        placeholder="YYYY-MM-DD"
                        defaultValue={parseDate('1990-01-01')}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="PAN"
                        placeholder="Enter PAN number"
                        isRequired
                      />
                      <Input
                        label="Pincode"
                        placeholder="Enter pincode"
                        isRequired
                      />
                    </div>
                  </CardBody>
                </Card>
                
                <Card className="border border-divider mb-6">
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Loan Details</h3>
                  </CardHeader>
                  <Divider />
                  <CardBody className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Select
                        label="Loan Type"
                        placeholder="Select loan type"
                        isRequired
                      >
                        {loanTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </Select>
                      
                      <Select
                        label="Profile Status"
                        placeholder="Select status"
                        defaultSelectedKeys={['Pending']}
                        isRequired
                      >
                        <SelectItem key="Approved" value="Approved">Approved</SelectItem>
                        <SelectItem key="Pending" value="Pending">Pending</SelectItem>
                        <SelectItem key="Rejected" value="Rejected">Rejected</SelectItem>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Income (₹)"
                        placeholder="Enter annual income"
                        type="number"
                        isRequired
                      />
                      <Input
                        label="Loan Amount (₹)"
                        placeholder="Enter loan amount"
                        type="number"
                        isRequired
                      />
                    </div>
                    
                    <div>
                      <Textarea
                        label="Additional Notes"
                        placeholder="Enter any additional information about this lead"
                        minRows={3}
                      />
                    </div>
                    
                    <div>
                      <Checkbox isRequired>
                        <span className="text-sm">
                          Customer has provided consent to process their personal information
                        </span>
                      </Checkbox>
                    </div>
                  </CardBody>
                </Card>
                
                <Card className="border border-divider">
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Document Upload</h3>
                  </CardHeader>
                  <Divider />
                  <CardBody className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium mb-2">Aadhaar Card</p>
                        <div className="border-2 border-dashed border-default-200 rounded-md p-4 text-center">
                          <Icon icon="lucide:upload" className="text-default-400 text-2xl mx-auto mb-2" />
                          <p className="text-default-500 text-sm">Click to upload or drag and drop</p>
                          <p className="text-default-400 text-xs mt-1">PDF, JPG or PNG (Max 5MB)</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-2">PAN Card</p>
                        <div className="border-2 border-dashed border-default-200 rounded-md p-4 text-center">
                          <Icon icon="lucide:upload" className="text-default-400 text-2xl mx-auto mb-2" />
                          <p className="text-default-500 text-sm">Click to upload or drag and drop</p>
                          <p className="text-default-400 text-xs mt-1">PDF, JPG or PNG (Max 5MB)</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-2">Bank Statement</p>
                        <div className="border-2 border-dashed border-default-200 rounded-md p-4 text-center">
                          <Icon icon="lucide:upload" className="text-default-400 text-2xl mx-auto mb-2" />
                          <p className="text-default-500 text-sm">Click to upload or drag and drop</p>
                          <p className="text-default-400 text-xs mt-1">PDF, JPG or PNG (Max 5MB)</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-2">Payment Slip</p>
                        <div className="border-2 border-dashed border-default-200 rounded-md p-4 text-center">
                          <Icon icon="lucide:upload" className="text-default-400 text-2xl mx-auto mb-2" />
                          <p className="text-default-500 text-sm">Click to upload or drag and drop</p>
                          <p className="text-default-400 text-xs mt-1">PDF, JPG or PNG (Max 5MB)</p>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
              
              <div>
                <Card className="border border-divider mb-6">
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Source Information</h3>
                  </CardHeader>
                  <Divider />
                  <CardBody className="space-y-4">
                    <Input
                      label="UTM Source"
                      placeholder="Enter UTM source"
                    />
                  </CardBody>
                </Card>
                
                <Card className="border border-divider sticky top-6">
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Save Lead</h3>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <p className="text-default-500 text-sm mb-4">
                      Please review all information before submitting the lead.
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
                      Create Lead
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </form>
        </div>
      );
    };

    export default AddLeadPage;