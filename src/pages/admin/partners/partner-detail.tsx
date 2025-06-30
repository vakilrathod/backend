import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Card, CardBody, CardHeader, Divider, Button, Chip, Tabs, Tab, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react';
import { Icon } from '@iconify/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PageHeader from '../../../components/page-header';
import { mockPartners, mockLeads } from '../../../data/mock-data';
import StatusBadge from '../../../components/status-badge';

const PartnerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [activeTab, setActiveTab] = React.useState('overview');
  
  // Find partner by ID
  const partner = React.useMemo(() => {
    return mockPartners.find(partner => partner.id === id);
  }, [id]);
  
  // Get partner leads
  const partnerLeads = React.useMemo(() => {
    return mockLeads.filter(lead => lead.partnerId === 'p1'); // Using p1 as a placeholder since our mock data uses p1/p2
  }, []);
  
  // Monthly performance data for chart
  const monthlyPerformance = [
    { month: 'Jan', leads: 12, conversions: 8 },
    { month: 'Feb', leads: 15, conversions: 10 },
    { month: 'Mar', leads: 8, conversions: 5 },
    { month: 'Apr', leads: 22, conversions: 15 },
    { month: 'May', leads: 18, conversions: 12 },
    { month: 'Jun', leads: 25, conversions: 18 },
  ];
  
  if (!partner) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <Icon icon="lucide:alert-circle" className="text-danger text-5xl mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Partner Not Found</h2>
        <p className="text-default-500 mb-4">The partner you're looking for doesn't exist or has been removed.</p>
        <Button color="primary" onPress={() => history.push('/admin/partners')}>
          Back to Partners
        </Button>
      </div>
    );
  }
  
  return (
    <div>
      <PageHeader 
        title={partner.name}
        subtitle={`Partner ID: ${partner.id}`}
        backPath="/admin/partners"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border border-divider mb-6">
            <CardHeader>
              <Tabs 
                aria-label="Partner details tabs" 
                selectedKey={activeTab}
                onSelectionChange={(key) => setActiveTab(key as string)}
              >
                <Tab key="overview" title="Overview" />
                <Tab key="leads" title="Leads" />
                <Tab key="performance" title="Performance" />
              </Tabs>
            </CardHeader>
            <Divider />
            <CardBody>
              {activeTab === 'overview' && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
                    <div>
                      <p className="text-default-500 text-sm">Company</p>
                      <p className="font-medium">{partner.company}</p>
                    </div>
                    <div>
                      <p className="text-default-500 text-sm">Email</p>
                      <p className="font-medium">{partner.email}</p>
                    </div>
                    <div>
                      <p className="text-default-500 text-sm">Phone</p>
                      <p className="font-medium">{partner.phone}</p>
                    </div>
                    <div>
                      <p className="text-default-500 text-sm">Address</p>
                      <p className="font-medium">{partner.address}</p>
                    </div>
                    <div>
                      <p className="text-default-500 text-sm">Status</p>
                      <Chip
                        color={partner.status === 'Active' ? 'success' : 'danger'}
                        variant="flat"
                        size="sm"
                      >
                        {partner.status}
                      </Chip>
                    </div>
                    <div>
                      <p className="text-default-500 text-sm">Created At</p>
                      <p className="font-medium">{new Date(partner.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <Divider className="my-6" />
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Performance Overview</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="border border-divider">
                        <CardBody className="flex flex-col items-center justify-center p-4">
                          <div className="p-2 rounded-full bg-primary-100 mb-2">
                            <Icon icon="lucide:users" className="text-primary-500 text-xl" />
                          </div>
                          <p className="text-2xl font-semibold">{partner.leadCount}</p>
                          <p className="text-default-500 text-sm">Total Leads</p>
                        </CardBody>
                      </Card>
                      
                      <Card className="border border-divider">
                        <CardBody className="flex flex-col items-center justify-center p-4">
                          <div className="p-2 rounded-full bg-success-100 mb-2">
                            <Icon icon="lucide:check-circle" className="text-success-500 text-xl" />
                          </div>
                          <p className="text-2xl font-semibold">{Math.round(partner.leadCount * (partner.conversionRate / 100))}</p>
                          <p className="text-default-500 text-sm">Conversions</p>
                        </CardBody>
                      </Card>
                      
                      <Card className="border border-divider">
                        <CardBody className="flex flex-col items-center justify-center p-4">
                          <div className="p-2 rounded-full bg-warning-100 mb-2">
                            <Icon icon="lucide:percent" className="text-warning-500 text-xl" />
                          </div>
                          <p className="text-2xl font-semibold">{partner.conversionRate}%</p>
                          <p className="text-default-500 text-sm">Conversion Rate</p>
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'leads' && (
                <div className="table-container">
                  <Table 
                    removeWrapper 
                    aria-label="Partner leads table"
                  >
                    <TableHeader>
                      <TableColumn>LEAD ID</TableColumn>
                      <TableColumn>NAME</TableColumn>
                      <TableColumn>LOAN TYPE</TableColumn>
                      <TableColumn>AMOUNT</TableColumn>
                      <TableColumn>STATUS</TableColumn>
                      <TableColumn>DATE</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent="No leads found for this partner">
                      {partnerLeads.slice(0, 5).map((lead) => (
                        <TableRow key={lead.id}>
                          <TableCell>{lead.leadId}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>{`${lead.firstName} ${lead.lastName}`}</span>
                              <span className="text-default-400 text-xs">{lead.email}</span>
                            </div>
                          </TableCell>
                          <TableCell>{lead.loanType}</TableCell>
                          <TableCell>₹{lead.loanAmount.toLocaleString()}</TableCell>
                          <TableCell>
                            <StatusBadge status={lead.profile} />
                          </TableCell>
                          <TableCell>{new Date(lead.createdAt).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  <div className="flex justify-center mt-4">
                    <Button 
                      color="primary" 
                      variant="flat"
                      onPress={() => history.push('/admin/leads')}
                    >
                      View All Leads
                    </Button>
                  </div>
                </div>
              )}
              
              {activeTab === 'performance' && (
                <div>
                  <h4 className="text-lg font-semibold mb-4">Monthly Performance</h4>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={monthlyPerformance}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="leads" name="Leads" fill="#006FEE" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="conversions" name="Conversions" fill="#17C964" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <Divider className="my-6" />
                  
                  <h4 className="text-lg font-semibold mb-4">Loan Type Distribution</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {['Personal', 'Home', 'Car', 'Education', 'Business'].map((type, index) => {
                      const count = Math.floor(Math.random() * 20) + 5;
                      const percentage = Math.floor((count / partner.leadCount) * 100);
                      
                      return (
                        <Card key={type} className="border border-divider">
                          <CardBody className="p-4">
                            <div className="flex justify-between items-center mb-2">
                              <p className="font-medium">{type}</p>
                              <p className="text-default-500 text-sm">{percentage}%</p>
                            </div>
                            <div className="w-full bg-default-100 rounded-full h-2">
                              <div 
                                className="bg-primary-500 h-2 rounded-full" 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <p className="text-default-500 text-xs mt-2">{count} leads</p>
                          </CardBody>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
        
        <div>
          <Card className="border border-divider mb-6">
            <CardHeader>
              <h3 className="text-lg font-semibold">Partner Status</h3>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center">
                    <Icon icon="lucide:briefcase" className="text-secondary-500" />
                  </div>
                  <div>
                    <p className="font-medium">{partner.name}</p>
                    <p className="text-default-500 text-xs">{partner.company}</p>
                  </div>
                </div>
                <Chip
                  color={partner.status === 'Active' ? 'success' : 'danger'}
                  variant="flat"
                >
                  {partner.status}
                </Chip>
              </div>
              
              <Divider className="my-4" />
              
              <div className="space-y-4">
                <div>
                  <p className="text-default-500 text-xs">Account Created</p>
                  <p className="font-medium">{new Date(partner.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-default-500 text-xs">Last Activity</p>
                  <p className="font-medium">{new Date().toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-default-500 text-xs">API Access</p>
                  <Chip size="sm" variant="flat" color="success">Enabled</Chip>
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
                color={partner.status === 'Active' ? 'danger' : 'success'} 
                variant="flat" 
                fullWidth 
                startContent={<Icon icon={partner.status === 'Active' ? 'lucide:x' : 'lucide:check'} />}
                className="justify-start"
              >
                {partner.status === 'Active' ? 'Deactivate Partner' : 'Activate Partner'}
              </Button>
              <Button 
                color="primary" 
                variant="flat" 
                fullWidth 
                startContent={<Icon icon="lucide:key" />}
                className="justify-start"
              >
                Reset API Key
              </Button>
              <Button 
                color="primary" 
                variant="flat" 
                fullWidth 
                startContent={<Icon icon="lucide:mail" />}
                className="justify-start"
              >
                Send Email
              </Button>
              <Divider />
              <Button 
                color="danger" 
                fullWidth 
                startContent={<Icon icon="lucide:trash-2" />}
                className="justify-start"
              >
                Delete Partner
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PartnerDetailPage;