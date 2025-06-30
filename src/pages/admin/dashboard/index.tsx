import React from 'react';
import { Card, CardBody, CardHeader, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Progress } from '@heroui/react';
import { Icon } from '@iconify/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import PageHeader from '../../../components/page-header';
import StatsCard from '../../../components/stats-card';
import { dashboardStats } from '../../../data/mock-data';

const Dashboard: React.FC = () => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div>
      <PageHeader 
        title="Dashboard" 
        subtitle="Overview of loan application leads and performance metrics"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard 
          title="Total Leads" 
          value={dashboardStats.totalLeads} 
          icon="lucide:users" 
          color="primary"
          change={{ value: 12.5, isPositive: true }}
        />
        <StatsCard 
          title="Approved Leads" 
          value={dashboardStats.approvedLeads} 
          icon="lucide:check-circle" 
          color="success"
          change={{ value: 8.3, isPositive: true }}
        />
        <StatsCard 
          title="Pending Leads" 
          value={dashboardStats.pendingLeads} 
          icon="lucide:clock" 
          color="warning"
          change={{ value: 5.2, isPositive: false }}
        />
        <StatsCard 
          title="Rejected Leads" 
          value={dashboardStats.rejectedLeads} 
          icon="lucide:x-circle" 
          color="danger"
          change={{ value: 3.7, isPositive: false }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2 border border-divider">
          <CardHeader className="pb-0 pt-4 px-4 flex flex-col">
            <h4 className="font-semibold text-large">Monthly Lead Generation</h4>
            <p className="text-default-500 text-small">Number of leads generated per month</p>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dashboardStats.monthlyLeads}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#f1592f" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
        
        <Card className="border border-divider">
          <CardHeader className="pb-0 pt-4 px-4 flex flex-col">
            <h4 className="font-semibold text-large">Loan Type Distribution</h4>
            <p className="text-default-500 text-small">Breakdown by loan category</p>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dashboardStats.loanTypeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {dashboardStats.loanTypeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      </div>
      
      <Card className="border border-divider">
        <CardHeader className="pb-0 pt-4 px-4 flex flex-col">
          <h4 className="font-semibold text-large">Partner Leaderboard</h4>
          <p className="text-default-500 text-small">Top performing partners by conversion rate</p>
        </CardHeader>
        <CardBody>
          <Table removeWrapper aria-label="Partner performance table">
            <TableHeader>
              <TableColumn>PARTNER</TableColumn>
              <TableColumn>LEADS</TableColumn>
              <TableColumn>CONVERSIONS</TableColumn>
              <TableColumn>RATE</TableColumn>
              <TableColumn>PERFORMANCE</TableColumn>
            </TableHeader>
            <TableBody>
              {dashboardStats.partnerPerformance.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                        <Icon icon="lucide:user" className="text-primary-500" />
                      </div>
                      <span className="font-medium">{partner.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{partner.leads}</TableCell>
                  <TableCell>{partner.conversions}</TableCell>
                  <TableCell>{partner.conversionRate.toFixed(1)}%</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={partner.conversionRate} 
                        maxValue={100}
                        color={partner.conversionRate > 65 ? "success" : partner.conversionRate > 50 ? "primary" : "warning"}
                        className="max-w-md"
                        size="sm"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default Dashboard;