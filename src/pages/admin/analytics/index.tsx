import React from 'react';
import { Card, CardBody, CardHeader, Divider, Select, SelectItem, Tabs, Tab } from '@heroui/react';
import { Icon } from '@iconify/react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PageHeader from '../../../components/page-header';
import StatsCard from '../../../components/stats-card';
import { dashboardStats } from '../../../data/mock-data';

const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = React.useState('month');
  const [activeTab, setActiveTab] = React.useState('overview');
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  // Conversion rate data
  const conversionData = [
    { month: 'Jan', rate: 65 },
    { month: 'Feb', rate: 59 },
    { month: 'Mar', rate: 68 },
    { month: 'Apr', rate: 72 },
    { month: 'May', rate: 65 },
    { month: 'Jun', rate: 78 },
    { month: 'Jul', rate: 82 },
    { month: 'Aug', rate: 75 },
    { month: 'Sep', rate: 70 },
    { month: 'Oct', rate: 68 },
    { month: 'Nov', rate: 72 },
    { month: 'Dec', rate: 76 },
  ];
  
  // Lead source data
  const leadSourceData = [
    { name: 'Google Ads', value: 35 },
    { name: 'Facebook', value: 25 },
    { name: 'Direct', value: 15 },
    { name: 'Referral', value: 10 },
    { name: 'Other', value: 15 },
  ];
  
  // Partner performance data
  const partnerPerformanceData = dashboardStats.partnerPerformance;
  
  return (
    <div>
      <PageHeader 
        title="Analytics & Reports" 
        subtitle="View detailed analytics and generate reports"
      />
      
      <div className="flex justify-between items-center mb-6">
        <Tabs 
          aria-label="Analytics tabs" 
          selectedKey={activeTab}
          onSelectionChange={(key) => setActiveTab(key as string)}
        >
          <Tab key="overview" title="Overview" />
          <Tab key="leads" title="Leads Analysis" />
          <Tab key="partners" title="Partner Performance" />
          <Tab key="conversion" title="Conversion Metrics" />
        </Tabs>
        
        <Select
          label="Time Range"
          className="w-40"
          selectedKeys={[timeRange]}
          onSelectionChange={(keys) => {
            const selected = Array.from(keys)[0] as string;
            setTimeRange(selected);
          }}
        >
          <SelectItem key="week" value="week">Last Week</SelectItem>
          <SelectItem key="month" value="month">Last Month</SelectItem>
          <SelectItem key="quarter" value="quarter">Last Quarter</SelectItem>
          <SelectItem key="year" value="year">Last Year</SelectItem>
        </Select>
      </div>
      
      {activeTab === 'overview' && (
        <div>
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
              title="Conversion Rate" 
              value="68%" 
              icon="lucide:percent" 
              color="secondary"
              change={{ value: 5.2, isPositive: true }}
            />
            <StatsCard 
              title="Avg. Loan Amount" 
              value="₹4.2L" 
              icon="lucide:indian-rupee" 
              color="warning"
              change={{ value: 3.7, isPositive: true }}
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
                      <Legend />
                      <Bar dataKey="count" name="Leads" fill="#006FEE" radius={[4, 4, 0, 0]} />
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
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-divider">
              <CardHeader className="pb-0 pt-4 px-4 flex flex-col">
                <h4 className="font-semibold text-large">Conversion Rate Trend</h4>
                <p className="text-default-500 text-small">Monthly conversion rate percentage</p>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={conversionData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="rate" 
                        name="Conversion Rate (%)" 
                        stroke="#7828c8" 
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardBody>
            </Card>
            
            <Card className="border border-divider">
              <CardHeader className="pb-0 pt-4 px-4 flex flex-col">
                <h4 className="font-semibold text-large">Lead Sources</h4>
                <p className="text-default-500 text-small">Distribution of lead acquisition channels</p>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={leadSourceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {leadSourceData.map((entry, index) => (
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
        </div>
      )}
      
      {activeTab === 'leads' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard 
              title="Total Leads" 
              value={dashboardStats.totalLeads} 
              icon="lucide:users" 
              color="primary"
            />
            <StatsCard 
              title="Approved" 
              value={dashboardStats.approvedLeads} 
              icon="lucide:check-circle" 
              color="success"
            />
            <StatsCard 
              title="Pending" 
              value={dashboardStats.pendingLeads} 
              icon="lucide:clock" 
              color="warning"
            />
            <StatsCard 
              title="Rejected" 
              value={dashboardStats.rejectedLeads} 
              icon="lucide:x-circle" 
              color="danger"
            />
          </div>
          
          <Card className="border border-divider">
            <CardHeader className="pb-0 pt-4 px-4 flex flex-col">
              <h4 className="font-semibold text-large">Lead Status Distribution</h4>
              <p className="text-default-500 text-small">Breakdown of leads by status</p>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { status: 'Approved', count: dashboardStats.approvedLeads, color: '#17c964' },
                      { status: 'Pending', count: dashboardStats.pendingLeads, color: '#f5a524' },
                      { status: 'Rejected', count: dashboardStats.rejectedLeads, color: '#f31260' },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="status" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" name="Count" fill="#006FEE">
                      {[
                        { status: 'Approved', count: dashboardStats.approvedLeads, color: '#17c964' },
                        { status: 'Pending', count: dashboardStats.pendingLeads, color: '#f5a524' },
                        { status: 'Rejected', count: dashboardStats.rejectedLeads, color: '#f31260' },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardBody>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-divider">
              <CardHeader className="pb-0 pt-4 px-4 flex flex-col">
                <h4 className="font-semibold text-large">Lead Sources</h4>
                <p className="text-default-500 text-small">Distribution of lead acquisition channels</p>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={leadSourceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {leadSourceData.map((entry, index) => (
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
            
            <Card className="border border-divider">
              <CardHeader className="pb-0 pt-4 px-4 flex flex-col">
                <h4 className="font-semibold text-large">Loan Amount Distribution</h4>
                <p className="text-default-500 text-small">Breakdown of loan amounts requested</p>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { range: '< 1L', count: 15 },
                        { range: '1L - 3L', count: 25 },
                        { range: '3L - 5L', count: 30 },
                        { range: '5L - 10L', count: 20 },
                        { range: '> 10L', count: 10 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" name="Count" fill="#7828c8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      )}
      
      {activeTab === 'partners' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard 
              title="Total Partners" 
              value={dashboardStats.totalPartners} 
              icon="lucide:briefcase" 
              color="secondary"
            />
            <StatsCard 
              title="Active Partners" 
              value={dashboardStats.activePartners} 
              icon="lucide:check" 
              color="success"
            />
            <StatsCard 
              title="Avg. Conversion" 
              value="68%" 
              icon="lucide:percent" 
              color="primary"
            />
            <StatsCard 
              title="Partner Leads" 
              value="425" 
              icon="lucide:users" 
              color="warning"
            />
          </div>
          
          <Card className="border border-divider">
            <CardHeader className="pb-0 pt-4 px-4 flex flex-col">
              <h4 className="font-semibold text-large">Partner Performance</h4>
              <p className="text-default-500 text-small">Comparison of partner conversion rates</p>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={partnerPerformanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#006FEE" />
                    <YAxis yAxisId="right" orientation="right" stroke="#17c964" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="leads" name="Total Leads" fill="#006FEE" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="right" dataKey="conversions" name="Conversions" fill="#17c964" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardBody>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-divider">
              <CardHeader className="pb-0 pt-4 px-4 flex flex-col">
                <h4 className="font-semibold text-large">Partner Conversion Rates</h4>
                <p className="text-default-500 text-small">Percentage of leads converted by partner</p>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={partnerPerformanceData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="conversionRate" name="Conversion Rate (%)" fill="#7828c8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardBody>
            </Card>
            
            <Card className="border border-divider">
              <CardHeader className="pb-0 pt-4 px-4 flex flex-col">
                <h4 className="font-semibold text-large">Partner Lead Quality</h4>
                <p className="text-default-500 text-small">Average loan amount by partner</p>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'Partner 1', avgAmount: 450000 },
                        { name: 'Partner 2', avgAmount: 380000 },
                        { name: 'Partner 3', avgAmount: 520000 },
                        { name: 'Partner 4', avgAmount: 320000 },
                        { name: 'Partner 5', avgAmount: 410000 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`₹${(value as number).toLocaleString()}`, 'Avg. Loan Amount']} />
                      <Legend />
                      <Bar dataKey="avgAmount" name="Avg. Loan Amount" fill="#f5a524" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      )}
      
      {activeTab === 'conversion' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard 
              title="Overall Conversion" 
              value="68%" 
              icon="lucide:percent" 
              color="primary"
              change={{ value: 5.2, isPositive: true }}
            />
            <StatsCard 
              title="Approval Rate" 
              value="72%" 
              icon="lucide:check-circle" 
              color="success"
              change={{ value: 3.8, isPositive: true }}
            />
            <StatsCard 
              title="Rejection Rate" 
              value="18%" 
              icon="lucide:x-circle" 
              color="danger"
              change={{ value: 2.1, isPositive: false }}
            />
            <StatsCard 
              title="Avg. Processing Time" 
              value="3.2 days" 
              icon="lucide:clock" 
              color="warning"
              change={{ value: 0.5, isPositive: true }}
            />
          </div>
          
          <Card className="border border-divider">
            <CardHeader className="pb-0 pt-4 px-4 flex flex-col">
              <h4 className="font-semibold text-large">Conversion Rate Trend</h4>
              <p className="text-default-500 text-small">Monthly conversion rate percentage</p>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={conversionData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="rate" 
                      name="Conversion Rate (%)" 
                      stroke="#006FEE" 
                      strokeWidth={2}
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardBody>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-divider">
              <CardHeader className="pb-0 pt-4 px-4 flex flex-col">
                <h4 className="font-semibold text-large">Conversion by Loan Type</h4>
                <p className="text-default-500 text-small">Conversion rates for different loan types</p>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { type: 'Personal', rate: 65 },
                        { type: 'Home', rate: 78 },
                        { type: 'Car', rate: 72 },
                        { type: 'Education', rate: 58 },
                        { type: 'Business', rate: 45 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="type" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="rate" name="Conversion Rate (%)" fill="#7828c8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardBody>
            </Card>
            
            <Card className="border border-divider">
              <CardHeader className="pb-0 pt-4 px-4 flex flex-col">
                <h4 className="font-semibold text-large">Conversion by Income Range</h4>
                <p className="text-default-500 text-small">How income affects loan approval</p>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { range: '< 3L', rate: 42 },
                        { range: '3L - 5L', rate: 58 },
                        { range: '5L - 8L', rate: 75 },
                        { range: '8L - 12L', rate: 82 },
                        { range: '> 12L', rate: 88 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="rate" name="Conversion Rate (%)" fill="#17c964" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage;