import React from 'react';
    import { 
      Button, 
      Card, 
      CardBody, 
      CardHeader, 
      Divider, 
      Chip,
      Table,
      TableHeader,
      TableColumn,
      TableBody,
      TableRow,
      TableCell,
      Avatar,
      Progress
    } from "@heroui/react";
    import { Icon } from "@iconify/react";
    import { useParams, useHistory } from "react-router-dom";

    const TeamDetailPage: React.FC = () => {
      const { id } = useParams<{ id: string }>();
      const history = useHistory();
      
      // Sample team data - in a real app, fetch this based on the ID
      const team = {
        id: id || "TM001",
        name: "Sales Team",
        description: "Responsible for lead generation and initial client interactions",
        lead: "Priya Sharma",
        leadEmail: "priya.sharma@example.com",
        leadPhone: "9876543210",
        members: 8,
        leadsAssigned: 45,
        leadsConverted: 8,
        conversionRate: "18%",
        status: "Active",
        createdAt: "15 Jan 2023",
        teamMembers: [
          { id: "EMP001", name: "Priya Sharma", role: "Team Lead", email: "priya.sharma@example.com", leadsHandled: 12 },
          { id: "EMP002", name: "Amit Kumar", role: "Sales Executive", email: "amit.kumar@example.com", leadsHandled: 8 },
          { id: "EMP003", name: "Neha Gupta", role: "Sales Executive", email: "neha.gupta@example.com", leadsHandled: 7 },
          { id: "EMP004", name: "Rajesh Singh", role: "Sales Executive", email: "rajesh.singh@example.com", leadsHandled: 6 },
          { id: "EMP005", name: "Sonia Verma", role: "Sales Executive", email: "sonia.verma@example.com", leadsHandled: 5 },
          { id: "EMP006", name: "Deepak Patel", role: "Sales Executive", email: "deepak.patel@example.com", leadsHandled: 3 },
          { id: "EMP007", name: "Meera Reddy", role: "Sales Executive", email: "meera.reddy@example.com", leadsHandled: 2 },
          { id: "EMP008", name: "Karan Malhotra", role: "Sales Executive", email: "karan.malhotra@example.com", leadsHandled: 2 }
        ],
        performance: {
          thisMonth: { leads: 15, conversions: 3, rate: "20%" },
          lastMonth: { leads: 18, conversions: 4, rate: "22%" },
          twoMonthsAgo: { leads: 12, conversions: 1, rate: "8%" }
        }
      };

      return (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button 
              isIconOnly 
              variant="light" 
              onPress={() => history.goBack()}
            >
              <Icon icon="lucide:arrow-left" className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-semibold">Team Details</h1>
            <Chip 
              color="success" 
              variant="flat"
            >
              {team.status}
            </Chip>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Team Information</h3>
                </CardHeader>
                <Divider/>
                <CardBody>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-small text-default-500">Team ID</p>
                      <p>{team.id}</p>
                    </div>
                    <div>
                      <p className="text-small text-default-500">Team Name</p>
                      <p>{team.name}</p>
                    </div>
                    <div>
                      <p className="text-small text-default-500">Description</p>
                      <p>{team.description}</p>
                    </div>
                    <div>
                      <p className="text-small text-default-500">Created On</p>
                      <p>{team.createdAt}</p>
                    </div>
                    <div>
                      <p className="text-small text-default-500">Status</p>
                      <Chip 
                        color="success" 
                        size="sm" 
                        variant="flat"
                      >
                        {team.status}
                      </Chip>
                    </div>
                  </div>
                </CardBody>
              </Card>
              
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Team Members</h3>
                </CardHeader>
                <Divider/>
                <CardBody>
                  <Table removeWrapper aria-label="Team members table">
                    <TableHeader>
                      <TableColumn>EMPLOYEE</TableColumn>
                      <TableColumn>ROLE</TableColumn>
                      <TableColumn>EMAIL</TableColumn>
                      <TableColumn>LEADS HANDLED</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {team.teamMembers.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar 
                                name={member.name} 
                                size="sm" 
                                src={`https://img.heroui.chat/image/avatar?w=40&h=40&u=${member.name.replace(/\s/g, '')}`} 
                              />
                              <div>
                                <p>{member.name}</p>
                                <p className="text-tiny text-default-500">{member.id}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{member.role}</TableCell>
                          <TableCell>{member.email}</TableCell>
                          <TableCell>{member.leadsHandled}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardBody>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Team Lead</h3>
                </CardHeader>
                <Divider/>
                <CardBody>
                  <div className="flex flex-col items-center space-y-4 py-4">
                    <Avatar 
                      name={team.lead} 
                      size="lg" 
                      src={`https://img.heroui.chat/image/avatar?w=80&h=80&u=${team.lead.replace(/\s/g, '')}`} 
                    />
                    <div className="text-center">
                      <h4 className="text-lg font-medium">{team.lead}</h4>
                      <p className="text-default-500">Team Lead</p>
                    </div>
                    <div className="w-full space-y-2">
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:mail" className="text-default-500" />
                        <p>{team.leadEmail}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:phone" className="text-default-500" />
                        <p>{team.leadPhone}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Performance</h3>
                </CardHeader>
                <Divider/>
                <CardBody>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <p className="text-small">Current Month</p>
                        <p className="text-small font-medium">{team.performance.thisMonth.rate}</p>
                      </div>
                      <Progress 
                        value={parseInt(team.performance.thisMonth.rate)} 
                        color="primary" 
                        className="mb-1"
                      />
                      <div className="flex justify-between text-tiny text-default-500">
                        <p>Leads: {team.performance.thisMonth.leads}</p>
                        <p>Conversions: {team.performance.thisMonth.conversions}</p>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <p className="text-small">Last Month</p>
                        <p className="text-small font-medium">{team.performance.lastMonth.rate}</p>
                      </div>
                      <Progress 
                        value={parseInt(team.performance.lastMonth.rate)} 
                        color="primary" 
                        className="mb-1"
                      />
                      <div className="flex justify-between text-tiny text-default-500">
                        <p>Leads: {team.performance.lastMonth.leads}</p>
                        <p>Conversions: {team.performance.lastMonth.conversions}</p>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <p className="text-small">Two Months Ago</p>
                        <p className="text-small font-medium">{team.performance.twoMonthsAgo.rate}</p>
                      </div>
                      <Progress 
                        value={parseInt(team.performance.twoMonthsAgo.rate)} 
                        color="primary" 
                        className="mb-1"
                      />
                      <div className="flex justify-between text-tiny text-default-500">
                        <p>Leads: {team.performance.twoMonthsAgo.leads}</p>
                        <p>Conversions: {team.performance.twoMonthsAgo.conversions}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Summary</h3>
                </CardHeader>
                <Divider/>
                <CardBody>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-default-50 rounded-medium">
                      <p className="text-small text-default-500">Total Members</p>
                      <p className="text-2xl font-semibold">{team.members}</p>
                    </div>
                    <div className="text-center p-3 bg-default-50 rounded-medium">
                      <p className="text-small text-default-500">Leads Assigned</p>
                      <p className="text-2xl font-semibold">{team.leadsAssigned}</p>
                    </div>
                    <div className="text-center p-3 bg-default-50 rounded-medium">
                      <p className="text-small text-default-500">Leads Converted</p>
                      <p className="text-2xl font-semibold">{team.leadsConverted}</p>
                    </div>
                    <div className="text-center p-3 bg-default-50 rounded-medium">
                      <p className="text-small text-default-500">Conversion Rate</p>
                      <p className="text-2xl font-semibold">{team.conversionRate}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      );
    };

    export default TeamDetailPage;