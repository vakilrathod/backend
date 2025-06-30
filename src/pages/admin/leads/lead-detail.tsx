import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Card, CardBody, CardHeader, Divider, Button, Chip, Tabs, Tab } from '@heroui/react';
import { Icon } from '@iconify/react';
import PageHeader from '../../../components/page-header';
import StatusBadge from '../../../components/status-badge';
import { mockLeads } from '../../../data/mock-data';

const LeadDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [activeTab, setActiveTab] = React.useState('details');
  
  // Find lead by ID
  const lead = React.useMemo(() => {
    return mockLeads.find(lead => lead.id === id);
  }, [id]);
  
  if (!lead) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <Icon icon="lucide:alert-circle" className="text-danger text-5xl mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Lead Not Found</h2>
        <p className="text-default-500 mb-4">The lead you're looking for doesn't exist or has been removed.</p>
        <Button color="primary" onPress={() => history.push('/admin/leads')}>
          Back to Leads
        </Button>
      </div>
    );
  }
  
  return (
    <div>
      <PageHeader 
        title={`Lead: ${lead.leadId}`}
        subtitle={`${lead.firstName} ${lead.lastName}`}
        backPath="/admin/leads"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border border-divider mb-6">
            <CardHeader className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Lead Information</h3>
              <StatusBadge status={lead.profile} />
            </CardHeader>
            <Divider />
            <CardBody>
              <Tabs 
                aria-label="Lead details tabs" 
                selectedKey={activeTab}
                onSelectionChange={(key) => setActiveTab(key as string)}
                className="mb-4"
              >
                <Tab key="details" title="Details" />
                <Tab key="documents" title="Documents" />
                <Tab key="activity" title="Activity Log" />
              </Tabs>
              
              {activeTab === 'details' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <p className="text-default-500 text-sm">First Name</p>
                    <p className="font-medium">{lead.firstName}</p>
                  </div>
                  <div>
                    <p className="text-default-500 text-sm">Last Name</p>
                    <p className="font-medium">{lead.lastName}</p>
                  </div>
                  <div>
                    <p className="text-default-500 text-sm">Email</p>
                    <p className="font-medium">{lead.email}</p>
                  </div>
                  <div>
                    <p className="text-default-500 text-sm">Mobile</p>
                    <p className="font-medium">{lead.mobile}</p>
                  </div>
                  <div>
                    <p className="text-default-500 text-sm">Gender</p>
                    <p className="font-medium">{lead.gender}</p>
                  </div>
                  <div>
                    <p className="text-default-500 text-sm">Date of Birth</p>
                    <p className="font-medium">{new Date(lead.dob).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-default-500 text-sm">Income</p>
                    <p className="font-medium">₹{lead.income.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-default-500 text-sm">Loan Amount</p>
                    <p className="font-medium">₹{lead.loanAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-default-500 text-sm">PAN</p>
                    <p className="font-medium">{lead.pan}</p>
                  </div>
                  <div>
                    <p className="text-default-500 text-sm">Pincode</p>
                    <p className="font-medium">{lead.pincode}</p>
                  </div>
                  <div>
                    <p className="text-default-500 text-sm">Loan Type</p>
                    <p className="font-medium">{lead.loanType}</p>
                  </div>
                  <div>
                    <p className="text-default-500 text-sm">Consent</p>
                    <p className="font-medium">{lead.consent ? 'Provided' : 'Not Provided'}</p>
                  </div>
                </div>
              )}
              
              {activeTab === 'documents' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border border-divider">
                      <CardBody>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary-100 rounded-md">
                              <Icon icon="lucide:file-text" className="text-primary-500 text-xl" />
                            </div>
                            <div>
                              <p className="font-medium">Aadhaar Card</p>
                              <p className="text-default-500 text-xs">
                                {lead.documents.aadhaar ? 'Uploaded' : 'Not uploaded'}
                              </p>
                            </div>
                          </div>
                          {lead.documents.aadhaar && (
                            <Button size="sm" variant="flat" color="primary">
                              <Icon icon="lucide:download" className="text-sm" />
                              <span>Download</span>
                            </Button>
                          )}
                        </div>
                      </CardBody>
                    </Card>
                    
                    <Card className="border border-divider">
                      <CardBody>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary-100 rounded-md">
                              <Icon icon="lucide:file-text" className="text-primary-500 text-xl" />
                            </div>
                            <div>
                              <p className="font-medium">PAN Card</p>
                              <p className="text-default-500 text-xs">
                                {lead.documents.pan ? 'Uploaded' : 'Not uploaded'}
                              </p>
                            </div>
                          </div>
                          {lead.documents.pan && (
                            <Button size="sm" variant="flat" color="primary">
                              <Icon icon="lucide:download" className="text-sm" />
                              <span>Download</span>
                            </Button>
                          )}
                        </div>
                      </CardBody>
                    </Card>
                    
                    <Card className="border border-divider">
                      <CardBody>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary-100 rounded-md">
                              <Icon icon="lucide:file-text" className="text-primary-500 text-xl" />
                            </div>
                            <div>
                              <p className="font-medium">Bank Statement</p>
                              <p className="text-default-500 text-xs">
                                {lead.documents.bankStatement ? 'Uploaded' : 'Not uploaded'}
                              </p>
                            </div>
                          </div>
                          {lead.documents.bankStatement && (
                            <Button size="sm" variant="flat" color="primary">
                              <Icon icon="lucide:download" className="text-sm" />
                              <span>Download</span>
                            </Button>
                          )}
                        </div>
                      </CardBody>
                    </Card>
                    
                    <Card className="border border-divider">
                      <CardBody>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary-100 rounded-md">
                              <Icon icon="lucide:file-text" className="text-primary-500 text-xl" />
                            </div>
                            <div>
                              <p className="font-medium">Payment Slip</p>
                              <p className="text-default-500 text-xs">
                                {lead.documents.paymentSlip ? 'Uploaded' : 'Not uploaded'}
                              </p>
                            </div>
                          </div>
                          {lead.documents.paymentSlip && (
                            <Button size="sm" variant="flat" color="primary">
                              <Icon icon="lucide:download" className="text-sm" />
                              <span>Download</span>
                            </Button>
                          )}
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                  
                  <div className="flex justify-center mt-4">
                    <Button color="primary" startContent={<Icon icon="lucide:upload" />}>
                      Upload New Document
                    </Button>
                  </div>
                </div>
              )}
              
              {activeTab === 'activity' && (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary-100 rounded-full">
                      <Icon icon="lucide:plus-circle" className="text-primary-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">Lead Created</p>
                        <Chip size="sm" variant="flat" color="primary">System</Chip>
                      </div>
                      <p className="text-default-500 text-sm">
                        {new Date(lead.createdAt).toLocaleString()}
                      </p>
                      <p className="text-sm mt-1">New lead was created in the system.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-warning-100 rounded-full">
                      <Icon icon="lucide:clock" className="text-warning-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">Status Changed</p>
                        <Chip size="sm" variant="flat" color="warning">Admin</Chip>
                      </div>
                      <p className="text-default-500 text-sm">
                        {new Date(lead.updatedAt).toLocaleString()}
                      </p>
                      <p className="text-sm mt-1">Lead status changed to {lead.profile}.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-success-100 rounded-full">
                      <Icon icon="lucide:file" className="text-success-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">Documents Uploaded</p>
                        <Chip size="sm" variant="flat" color="success">Partner</Chip>
                      </div>
                      <p className="text-default-500 text-sm">
                        {new Date(new Date(lead.updatedAt).getTime() - 86400000).toLocaleString()}
                      </p>
                      <p className="text-sm mt-1">Required documents were uploaded by partner.</p>
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
              <h3 className="text-lg font-semibold">Partner Information</h3>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center">
                  <Icon icon="lucide:briefcase" className="text-secondary-500" />
                </div>
                <div>
                  <p className="font-medium">{lead.partnerName}</p>
                  <p className="text-default-500 text-xs">Partner ID: {lead.partnerId}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-default-500 text-xs">UTM Source</p>
                  <p className="font-medium">{lead.utmSource || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-default-500 text-xs">Created At</p>
                  <p className="font-medium">{new Date(lead.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-default-500 text-xs">Last Updated</p>
                  <p className="font-medium">{new Date(lead.updatedAt).toLocaleString()}</p>
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
                color="success" 
                variant="flat" 
                fullWidth 
                startContent={<Icon icon="lucide:check" />}
                className="justify-start"
              >
                Approve Lead
              </Button>
              <Button 
                color="warning" 
                variant="flat" 
                fullWidth 
                startContent={<Icon icon="lucide:clock" />}
                className="justify-start"
              >
                Mark as Pending
              </Button>
              <Button 
                color="danger" 
                variant="flat" 
                fullWidth 
                startContent={<Icon icon="lucide:x" />}
                className="justify-start"
              >
                Reject Lead
              </Button>
              <Divider />
              <Button 
                color="primary" 
                variant="flat" 
                fullWidth 
                startContent={<Icon icon="lucide:mail" />}
                className="justify-start"
              >
                Send Email
              </Button>
              <Button 
                color="primary" 
                variant="flat" 
                fullWidth 
                startContent={<Icon icon="lucide:message-square" />}
                className="justify-start"
              >
                Send SMS
              </Button>
              <Divider />
              <Button 
                color="danger" 
                fullWidth 
                startContent={<Icon icon="lucide:trash-2" />}
                className="justify-start"
              >
                Delete Lead
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailPage;