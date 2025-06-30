import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Card, CardBody, CardHeader, Divider, Button, Chip, Tabs, Tab } from '@heroui/react';
import { Icon } from '@iconify/react';
import PageHeader from '../../../components/page-header';
import { mockTeams, mockLeads } from '../../../data/mock-data';

const TeamDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [activeTab, setActiveTab] = React.useState('details');
  
  // Find team member by ID
  const teamMember = React.useMemo(() => {
    return mockTeams.find(team => team.id === id);
  }, [id]);
  
  // Get assigned leads (mock data)
  const assignedLeads = React.useMemo(() => {
    // For demo purposes, just return a subset of leads
    return mockLeads.slice(0, 5);
  }, []);
  
  if (!teamMember) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <Icon icon="lucide:alert-circle" className="text-danger text-5xl mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Team Member Not Found</h2>
        <p className="text-default-500 mb-4">The team member you're looking for doesn't exist or has been removed.</p>
        <Button color="primary" onPress={() => history.push('/admin/teams')}>
          Back to Teams
        </Button>
      </div>
    );
  }
  
  return (
    <div>
      <PageHeader 
        title={teamMember.name}
        subtitle={`${teamMember.role} - ${teamMember.department}`}
        backPath="/admin/teams"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border border-divider mb-6">
            <CardHeader>
              <Tabs 
                aria-label="Team member details tabs" 
                selectedKey={activeTab}
                onSelectionChange={(key) => setActiveTab(key as string)}
              >
                <Tab key="details" title="Details" />
                <Tab key="activity" title="Activity" />
                <Tab key="permissions" title="Permissions" />
              </Tabs>
            </CardHeader>
            <Divider />
            <CardBody>
              {activeTab === 'details' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <p className="text-default-500 text-sm">Full Name</p>
                    <p className="font-medium">{teamMember.name}</p>
                  </div>
                  <div>
                    <p className="text-default-500 text-sm">Role</p>
                    <p className="font-medium">{teamMember.role}</p>
                  </div>
                  <div>
                    <p className="text-default-500 text-sm">Email</p>
                    <p className="font-medium">{teamMember.email}</p>
                  </div>
                  <div>
                    <p className="text-default-500 text-sm">Phone</p>
                    <p className="font-medium">{teamMember.phone}</p>
                  </div>
                  <div>
                    <p className="text-default-500 text-sm">Department</p>
                    <p className="font-medium">{teamMember.department}</p>
                  </div>
                  <div>
                    <p className="text-default-500 text-sm">Status</p>
                    <Chip
                      color={teamMember.status === 'Active' ? 'success' : 'danger'}
                      variant="flat"
                      size="sm"
                    >
                      {teamMember.status}
                    </Chip>
                  </div>
                  <div>
                    <p className="text-default-500 text-sm">Joined Date</p>
                    <p className="font-medium">{new Date(teamMember.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-default-500 text-sm">Employee ID</p>
                    <p className="font-medium">{teamMember.id}</p>
                  </div>
                </div>
              )}
              
              {activeTab === 'activity' && (
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold mb-2">Recent Activity</h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary-100 rounded-full">
                        <Icon icon="lucide:user-plus" className="text-primary-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">Added new lead</p>
                          <Chip size="sm" variant="flat" color="primary">Lead</Chip>
                        </div>
                        <p className="text-default-500 text-sm">Today, 10:30 AM</p>
                        <p className="text-sm mt-1">Added a new personal loan lead for John Smith.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-success-100 rounded-full">
                        <Icon icon="lucide:check-circle" className="text-success-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">Approved lead</p>
                          <Chip size="sm" variant="flat" color="success">Status</Chip>
                        </div>
                        <p className="text-default-500 text-sm">Yesterday, 3:45 PM</p>
                        <p className="text-sm mt-1">Approved home loan application for Sarah Johnson.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-warning-100 rounded-full">
                        <Icon icon="lucide:mail" className="text-warning-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">Sent email</p>
                          <Chip size="sm" variant="flat" color="warning">Communication</Chip>
                        </div>
                        <p className="text-default-500 text-sm">Yesterday, 11:20 AM</p>
                        <p className="text-sm mt-1">Sent document request email to 5 pending leads.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-danger-100 rounded-full">
                        <Icon icon="lucide:x-circle" className="text-danger-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">Rejected lead</p>
                          <Chip size="sm" variant="flat" color="danger">Status</Chip>
                        </div>
                        <p className="text-default-500 text-sm">2 days ago, 2:15 PM</p>
                        <p className="text-sm mt-1">Rejected car loan application for Michael Brown due to insufficient income.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-secondary-100 rounded-full">
                        <Icon icon="lucide:file-text" className="text-secondary-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">Generated report</p>
                          <Chip size="sm" variant="flat" color="secondary">Report</Chip>
                        </div>
                        <p className="text-default-500 text-sm">3 days ago, 9:30 AM</p>
                        <p className="text-sm mt-1">Generated monthly performance report for April 2023.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'permissions' && (
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold mb-2">Role & Permissions</h4>
                  
                  <div className="space-y-4">
                    <Card className="border border-divider">
                      <CardBody>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Lead Management</p>
                            <p className="text-default-500 text-sm">Create, view, edit, and delete leads</p>
                          </div>
                          <Chip color="success" variant="flat">Allowed</Chip>
                        </div>
                      </CardBody>
                    </Card>
                    
                    <Card className="border border-divider">
                      <CardBody>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Partner Management</p>
                            <p className="text-default-500 text-sm">Create, view, edit, and delete partners</p>
                          </div>
                          <Chip color={teamMember.role === 'Manager' || teamMember.role === 'Admin' ? 'success' : 'danger'} variant="flat">
                            {teamMember.role === 'Manager' || teamMember.role === 'Admin' ? 'Allowed' : 'Restricted'}
                          </Chip>
                        </div>
                      </CardBody>
                    </Card>
                    
                    <Card className="border border-divider">
                      <CardBody>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Lender Management</p>
                            <p className="text-default-500 text-sm">Create, view, edit, and delete lenders</p>
                          </div>
                          <Chip color={teamMember.role === 'Manager' || teamMember.role === 'Admin' ? 'success' : 'danger'} variant="flat">
                            {teamMember.role === 'Manager' || teamMember.role === 'Admin' ? 'Allowed' : 'Restricted'}
                          </Chip>
                        </div>
                      </CardBody>
                    </Card>
                    
                    <Card className="border border-divider">
                      <CardBody>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Team Management</p>
                            <p className="text-default-500 text-sm">Create, view, edit, and delete team members</p>
                          </div>
                          <Chip color={teamMember.role === 'Admin' ? 'success' : 'danger'} variant="flat">
                            {teamMember.role === 'Admin' ? 'Allowed' : 'Restricted'}
                          </Chip>
                        </div>
                      </CardBody>
                    </Card>
                    
                    <Card className="border border-divider">
                      <CardBody>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Email & SMS</p>
                            <p className="text-default-500 text-sm">Send emails and SMS to leads</p>
                          </div>
                          <Chip color="success" variant="flat">Allowed</Chip>
                        </div>
                      </CardBody>
                    </Card>
                    
                    <Card className="border border-divider">
                      <CardBody>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Analytics & Reports</p>
                            <p className="text-default-500 text-sm">View analytics and generate reports</p>
                          </div>
                          <Chip color="success" variant="flat">Allowed</Chip>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
        
        <div>
          <Card className="border border-divider mb-6">
            <CardHeader>
              <h3 className="text-lg font-semibold">Team Member Status</h3>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <Icon icon="lucide:user" className="text-primary-500" />
                  </div>
                  <div>
                    <p className="font-medium">{teamMember.name}</p>
                    <p className="text-default-500 text-xs">{teamMember.role}</p>
                  </div>
                </div>
                <Chip
                  color={teamMember.status === 'Active' ? 'success' : 'danger'}
                  variant="flat"
                >
                  {teamMember.status}
                </Chip>
              </div>
              
              <Divider className="my-4" />
              
              <div className="space-y-4">
                <div>
                  <p className="text-default-500 text-xs">Department</p>
                  <p className="font-medium">{teamMember.department}</p>
                </div>
                <div>
                  <p className="text-default-500 text-xs">Joined Date</p>
                  <p className="font-medium">{new Date(teamMember.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-default-500 text-xs">Last Activity</p>
                  <p className="font-medium">Today, 10:30 AM</p>
                </div>
                <div>
                  <p className="text-default-500 text-xs">Assigned Leads</p>
                  <p className="font-medium">{assignedLeads.length}</p>
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
                color={teamMember.status === 'Active' ? 'danger' : 'success'} 
                variant="flat" 
                fullWidth 
                startContent={<Icon icon={teamMember.status === 'Active' ? 'lucide:user-x' : 'lucide:user-check'} />}
                className="justify-start"
              >
                {teamMember.status === 'Active' ? 'Deactivate Account' : 'Activate Account'}
              </Button>
              <Button 
                color="primary" 
                variant="flat" 
                fullWidth 
                startContent={<Icon icon="lucide:key" />}
                className="justify-start"
              >
                Reset Password
              </Button>
              <Button 
                color="primary" 
                variant="flat" 
                fullWidth 
                startContent={<Icon icon="lucide:shield" />}
                className="justify-start"
              >
                Edit Permissions
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
                Delete Account
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeamDetailPage;