import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Card, CardBody, CardHeader, Divider, Button, Chip, Tabs, Tab } from '@heroui/react';
import { Icon } from '@iconify/react';
import PageHeader from '../../../components/page-header';
import { mockLenders } from '../../../data/mock-data';

const LenderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [activeTab, setActiveTab] = React.useState('details');
  
  // Find lender by ID
  const lender = React.useMemo(() => {
    return mockLenders.find(lender => lender.id === id);
  }, [id]);
  
  if (!lender) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <Icon icon="lucide:alert-circle" className="text-danger text-5xl mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Lender Not Found</h2>
        <p className="text-default-500 mb-4">The lender you're looking for doesn't exist or has been removed.</p>
        <Button color="primary" onPress={() => history.push('/admin/lenders')}>
          Back to Lenders
        </Button>
      </div>
    );
  }
  
  return (
    <div>
      <PageHeader 
        title={lender.company}
        subtitle={`Lender ID: ${lender.id}`}
        backPath="/admin/lenders"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border border-divider mb-6">
            <CardHeader>
              <Tabs 
                aria-label="Lender details tabs" 
                selectedKey={activeTab}
                onSelectionChange={(key) => setActiveTab(key as string)}
              >
                <Tab key="details" title="Details" />
                <Tab key="loans" title="Loan Products" />
                <Tab key="requirements" title="Requirements" />
              </Tabs>
            </CardHeader>
            <Divider />
            <CardBody>
              {activeTab === 'details' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <p className="text-default-500 text-sm">Company Name</p>
                    <p className="font-medium">{lender.company}</p>
                  </div>
                  <div>
                    <p className="text-default-500 text-sm">Contact Person</p>
                    <p className="font-medium">{lender.name}</p>
                  </div>
                  <div>
                    <p className="text-default-500 text-sm">Email</p>
                    <p className="font-medium">{lender.email}</p>
                  </div>
                  <div>
                    <p className="text-default-500 text-sm">Phone</p>
                    <p className="font-medium">{lender.phone}</p>
                  </div>
                  <div>
                    <p className="text-default-500 text-sm">Interest Rate</p>
                    <p className="font-medium">{lender.interestRate}</p>
                  </div>
                  <div>
                    <p className="text-default-500 text-sm">Loan Range</p>
                    <p className="font-medium">₹{lender.minLoanAmount.toLocaleString()} - ₹{lender.maxLoanAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-default-500 text-sm">Status</p>
                    <Chip
                      color={lender.status === 'Active' ? 'success' : 'danger'}
                      variant="flat"
                      size="sm"
                    >
                      {lender.status}
                    </Chip>
                  </div>
                  <div>
                    <p className="text-default-500 text-sm">Created At</p>
                    <p className="font-medium">{new Date(lender.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              )}
              
              {activeTab === 'loans' && (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold mb-2">Loan Products</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {lender.loanTypes.map((type) => {
                      const loanDetails = {
                        Personal: {
                          minAmount: lender.minLoanAmount,
                          maxAmount: lender.maxLoanAmount,
                          interestRate: lender.interestRate,
                          tenure: '1-5 years',
                          processingFee: '1-2%',
                          description: 'Unsecured personal loans for various needs with flexible repayment options.'
                        },
                        Home: {
                          minAmount: lender.minLoanAmount * 5,
                          maxAmount: lender.maxLoanAmount * 5,
                          interestRate: '7.5-9.5%',
                          tenure: '5-30 years',
                          processingFee: '0.5-1%',
                          description: 'Home loans for purchase, construction, or renovation with competitive interest rates.'
                        },
                        Car: {
                          minAmount: lender.minLoanAmount * 2,
                          maxAmount: lender.maxLoanAmount * 2,
                          interestRate: '8.5-11.5%',
                          tenure: '1-7 years',
                          processingFee: '1-1.5%',
                          description: 'Car loans for new and used vehicles with quick approval process.'
                        },
                        Education: {
                          minAmount: lender.minLoanAmount,
                          maxAmount: lender.maxLoanAmount * 3,
                          interestRate: '8-10%',
                          tenure: '3-10 years',
                          processingFee: '0.5-1%',
                          description: 'Education loans for higher studies in India and abroad with moratorium period.'
                        },
                        Business: {
                          minAmount: lender.minLoanAmount * 3,
                          maxAmount: lender.maxLoanAmount * 10,
                          interestRate: '11-15%',
                          tenure: '1-10 years',
                          processingFee: '1-2.5%',
                          description: 'Business loans for SMEs and startups with flexible repayment options.'
                        }
                      };
                      
                      const details = loanDetails[type as keyof typeof loanDetails];
                      
                      return (
                        <Card key={type} className="border border-divider">
                          <CardHeader className="pb-0">
                            <h5 className="text-md font-semibold">{type} Loan</h5>
                          </CardHeader>
                          <CardBody>
                            <p className="text-default-500 text-sm mb-3">{details.description}</p>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-default-500 text-xs">Amount Range:</span>
                                <span className="text-xs">₹{details.minAmount.toLocaleString()} - ₹{details.maxAmount.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-default-500 text-xs">Interest Rate:</span>
                                <span className="text-xs">{details.interestRate}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-default-500 text-xs">Tenure:</span>
                                <span className="text-xs">{details.tenure}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-default-500 text-xs">Processing Fee:</span>
                                <span className="text-xs">{details.processingFee}</span>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {activeTab === 'requirements' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Eligibility Criteria</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="p-1 rounded-full bg-success-100">
                          <Icon icon="lucide:check" className="text-success-500" />
                        </div>
                        <div>
                          <p className="font-medium">Age Requirement</p>
                          <p className="text-default-500 text-sm">Applicant must be between 21-65 years of age</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="p-1 rounded-full bg-success-100">
                          <Icon icon="lucide:check" className="text-success-500" />
                        </div>
                        <div>
                          <p className="font-medium">Income Requirement</p>
                          <p className="text-default-500 text-sm">Minimum annual income of ₹3,00,000</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="p-1 rounded-full bg-success-100">
                          <Icon icon="lucide:check" className="text-success-500" />
                        </div>
                        <div>
                          <p className="font-medium">Employment Status</p>
                          <p className="text-default-500 text-sm">Salaried individuals with at least 2 years of work experience</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="p-1 rounded-full bg-success-100">
                          <Icon icon="lucide:check" className="text-success-500" />
                        </div>
                        <div>
                          <p className="font-medium">Credit Score</p>
                          <p className="text-default-500 text-sm">Minimum credit score of 700</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Divider />
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Required Documents</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="p-1 rounded-full bg-primary-100">
                          <Icon icon="lucide:file-text" className="text-primary-500" />
                        </div>
                        <div>
                          <p className="font-medium">Identity Proof</p>
                          <p className="text-default-500 text-sm">Aadhaar Card, PAN Card, Voter ID, Passport</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="p-1 rounded-full bg-primary-100">
                          <Icon icon="lucide:file-text" className="text-primary-500" />
                        </div>
                        <div>
                          <p className="font-medium">Address Proof</p>
                          <p className="text-default-500 text-sm">Aadhaar Card, Utility Bills, Passport</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="p-1 rounded-full bg-primary-100">
                          <Icon icon="lucide:file-text" className="text-primary-500" />
                        </div>
                        <div>
                          <p className="font-medium">Income Proof</p>
                          <p className="text-default-500 text-sm">Salary Slips (last 3 months), Form 16, ITR (last 2 years)</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="p-1 rounded-full bg-primary-100">
                          <Icon icon="lucide:file-text" className="text-primary-500" />
                        </div>
                        <div>
                          <p className="font-medium">Bank Statements</p>
                          <p className="text-default-500 text-sm">Last 6 months bank statements</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="p-1 rounded-full bg-primary-100">
                          <Icon icon="lucide:file-text" className="text-primary-500" />
                        </div>
                        <div>
                          <p className="font-medium">Photographs</p>
                          <p className="text-default-500 text-sm">2 passport size photographs</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
        
        <div>
          <Card className="border border-divider mb-6">
            <CardHeader>
              <h3 className="text-lg font-semibold">Lender Status</h3>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <Icon icon="lucide:building-2" className="text-primary-500" />
                  </div>
                  <div>
                    <p className="font-medium">{lender.company}</p>
                    <p className="text-default-500 text-xs">{lender.email}</p>
                  </div>
                </div>
                <Chip
                  color={lender.status === 'Active' ? 'success' : 'danger'}
                  variant="flat"
                >
                  {lender.status}
                </Chip>
              </div>
              
              <Divider className="my-4" />
              
              <div className="space-y-4">
                <div>
                  <p className="text-default-500 text-xs">Account Created</p>
                  <p className="font-medium">{new Date(lender.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-default-500 text-xs">Last Activity</p>
                  <p className="font-medium">{new Date().toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-default-500 text-xs">API Integration</p>
                  <Chip size="sm" variant="flat" color="success">Connected</Chip>
                </div>
              </div>
            </CardBody>
          </Card>
          
          <Card className="border border-divider">
            <CardHeader>
              <h3 className="text-lg font-semibold">Actions</h3>
            </CardHeader>
            <Divider />
            <CardBody className="space-y-3">
              <Button 
                color={lender.status === 'Active' ? 'danger' : 'success'} 
                variant="flat" 
                fullWidth 
                startContent={<Icon icon={lender.status === 'Active' ? 'lucide:x' : 'lucide:check'} />}
                className="justify-start"
              >
                {lender.status === 'Active' ? 'Deactivate Lender' : 'Activate Lender'}
              </Button>
              <Button 
                color="primary" 
                variant="flat" 
                fullWidth 
                startContent={<Icon icon="lucide:refresh-cw" />}
                className="justify-start"
              >
                Sync API Connection
              </Button>
              <Button 
                color="primary" 
                variant="flat" 
                fullWidth 
                startContent={<Icon icon="lucide:mail" />}
                className="justify-start"
              >
                Contact Lender
              </Button>
              <Divider />
              <Button 
                color="danger" 
                fullWidth 
                startContent={<Icon icon="lucide:trash-2" />}
                className="justify-start"
              >
                Delete Lender
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LenderDetailPage;