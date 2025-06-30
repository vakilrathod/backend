import React from 'react';
    import { 
      Card, 
      CardBody, 
      CardHeader, 
      Divider, 
      Tabs,
      Tab,
      Select,
      SelectItem
    } from "@heroui/react";
    import { Icon } from "@iconify/react";
    import { 
      ResponsiveContainer, 
      AreaChart, 
      Area, 
      BarChart, 
      Bar,
      PieChart,
      Pie,
      Cell,
      LineChart,
      Line,
      XAxis, 
      YAxis, 
      CartesianGrid, 
      Tooltip, 
      Legend 
    } from 'recharts';

    const AnalyticsPage: React.FC = () => {
      const [timeRange, setTimeRange] = React.useState("30");
      
      // Sample data for charts
      const leadsByDay = [
        { name: 'Jan 1', leads: 4, conversions: 1 },
        { name: 'Jan 2', leads: 3, conversions: 0 },
        { name: 'Jan 3', leads: 5, conversions: 2 },
        { name: 'Jan 4', leads: 7, conversions: 3 },
        { name: 'Jan 5', leads: 6, conversions: 2 },
        { name: 'Jan 6', leads: 8, conversions: 4 },
        { name: 'Jan 7', leads: 9, conversions: 3 },
      ];
      
      const leadsByType = [
        { name: 'Personal', value: 45 },
        { name: 'Home', value: 30 },
        { name: 'Car', value: 15 },
        { name: 'Business', value: 10 },
      ];
      
      const leadsByStatus = [
        { name: 'Approved', value: 35 },
        { name: 'Pending', value: 45 },
        { name: 'Rejected', value: 20 },
      ];
      
      const conversionRate = [
        { name: 'Week 1', rate: 15 },
        { name: 'Week 2', rate: 18 },
        { name: 'Week 3', rate: 22 },
        { name: 'Week 4', rate: 20 },
      ];
      
      const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
      const STATUS_COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Analytics Dashboard</h1>
            <Select 
              label="Time Range" 
              className="w-40"
              selectedKeys={[timeRange]}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <SelectItem key="7" value="7">Last 7 days</SelectItem>
              <SelectItem key="30" value="30">Last 30 days</SelectItem>
              <SelectItem key="90" value="90">Last 90 days</SelectItem>
              <SelectItem key="365" value="365">Last year</SelectItem>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardBody className="flex flex-col items-center justify-center py-6">
                <div className="rounded-full bg-primary-100 p-3 mb-3">
                  <Icon icon="lucide:users" className="text-primary h-6 w-6" />
                </div>
                <p className="text-small text-default-500">Total Leads</p>
                <h3 className="text-3xl font-semibold">245</h3>
                <p className="text-tiny text-success flex items-center mt-1">
                  <Icon icon="lucide:trending-up" className="mr-1" />
                  +12.5% from last month
                </p>
              </CardBody>
            </Card>
            
            <Card>
              <CardBody className="flex flex-col items-center justify-center py-6">
                <div className="rounded-full bg-success-100 p-3 mb-3">
                  <Icon icon="lucide:check-circle" className="text-success h-6 w-6" />
                </div>
                <p className="text-small text-default-500">Approved Loans</p>
                <h3 className="text-3xl font-semibold">86</h3>
                <p className="text-tiny text-success flex items-center mt-1">
                  <Icon icon="lucide:trending-up" className="mr-1" />
                  +8.2% from last month
                </p>
              </CardBody>
            </Card>
            
            <Card>
              <CardBody className="flex flex-col items-center justify-center py-6">
                <div className="rounded-full bg-warning-100 p-3 mb-3">
                  <Icon icon="lucide:clock" className="text-warning h-6 w-6" />
                </div>
                <p className="text-small text-default-500">Pending Approval</p>
                <h3 className="text-3xl font-semibold">112</h3>
                <p className="text-tiny text-danger flex items-center mt-1">
                  <Icon icon="lucide:trending-up" className="mr-1" />
                  +18.3% from last month
                </p>
              </CardBody>
            </Card>
            
            <Card>
              <CardBody className="flex flex-col items-center justify-center py-6">
                <div className="rounded-full bg-danger-100 p-3 mb-3">
                  <Icon icon="lucide:x-circle" className="text-danger h-6 w-6" />
                </div>
                <p className="text-small text-default-500">Rejected Loans</p>
                <h3 className="text-3xl font-semibold">47</h3>
                <p className="text-tiny text-danger flex items-center mt-1">
                  <Icon icon="lucide:trending-down" className="mr-1" />
                  -5.1% from last month
                </p>
              </CardBody>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Lead Generation & Conversion</h3>
              </CardHeader>
              <Divider />
              <CardBody className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={leadsByDay}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0070F3" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#0070F3" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00C49F" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#00C49F" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="leads"
                      stroke="#0070F3"
                      fillOpacity={1}
                      fill="url(#colorLeads)"
                    />
                    <Area
                      type="monotone"
                      dataKey="conversions"
                      stroke="#00C49F"
                      fillOpacity={1}
                      fill="url(#colorConversions)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardBody>
            </Card>
            
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Conversion Rate Trend</h3>
              </CardHeader>
              <Divider />
              <CardBody className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={conversionRate}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      stroke="#0070F3"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardBody>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Leads by Loan Type</h3>
              </CardHeader>
              <Divider />
              <CardBody className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={leadsByType}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {leadsByType.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardBody>
            </Card>
            
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Leads by Status</h3>
              </CardHeader>
              <Divider />
              <CardBody className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={leadsByStatus}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Leads">
                      {leadsByStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardBody>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Performance Metrics</h3>
            </CardHeader>
            <Divider />
            <CardBody>
              <Tabs aria-label="Performance metrics" color="primary" variant="underlined">
                <Tab key="leads" title="Lead Metrics">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-4">
                    <div className="space-y-1">
                      <p className="text-small text-default-500">Avg. Lead Quality Score</p>
                      <p className="text-2xl font-semibold">7.8/10</p>
                      <p className="text-tiny text-success flex items-center">
                        <Icon icon="lucide:trending-up" className="mr-1" />
                        +0.5 from last month
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-small text-default-500">Avg. Processing Time</p>
                      <p className="text-2xl font-semibold">3.2 days</p>
                      <p className="text-tiny text-success flex items-center">
                        <Icon icon="lucide:trending-down" className="mr-1" />
                        -0.8 days from last month
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-small text-default-500">Lead to Application Rate</p>
                      <p className="text-2xl font-semibold">68%</p>
                      <p className="text-tiny text-success flex items-center">
                        <Icon icon="lucide:trending-up" className="mr-1" />
                        +5% from last month
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-small text-default-500">Cost per Lead</p>
                      <p className="text-2xl font-semibold">₹450</p>
                      <p className="text-tiny text-danger flex items-center">
                        <Icon icon="lucide:trending-up" className="mr-1" />
                        +₹25 from last month
                      </p>
                    </div>
                  </div>
                </Tab>
                <Tab key="conversion" title="Conversion Metrics">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-4">
                    <div className="space-y-1">
                      <p className="text-small text-default-500">Application to Approval</p>
                      <p className="text-2xl font-semibold">35%</p>
                      <p className="text-tiny text-success flex items-center">
                        <Icon icon="lucide:trending-up" className="mr-1" />
                        +3% from last month
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-small text-default-500">Avg. Loan Value</p>
                      <p className="text-2xl font-semibold">₹3.2L</p>
                      <p className="text-tiny text-success flex items-center">
                        <Icon icon="lucide:trending-up" className="mr-1" />
                        +₹0.3L from last month
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-small text-default-500">Repeat Customers</p>
                      <p className="text-2xl font-semibold">12%</p>
                      <p className="text-tiny text-success flex items-center">
                        <Icon icon="lucide:trending-up" className="mr-1" />
                        +2% from last month
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-small text-default-500">Revenue per Lead</p>
                      <p className="text-2xl font-semibold">₹1,250</p>
                      <p className="text-tiny text-success flex items-center">
                        <Icon icon="lucide:trending-up" className="mr-1" />
                        +₹150 from last month
                      </p>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </div>
      );
    };

    export default AnalyticsPage;