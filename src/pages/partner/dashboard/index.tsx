import React from 'react';
    import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
    import { Icon } from "@iconify/react";

    const Dashboard: React.FC = () => {
      return (
        <div className="space-y-6">
          <h1 className="text-2xl font-semibold">Partner Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardBody className="flex flex-col items-center p-6">
                <div className="rounded-full bg-primary-100 p-3 mb-4">
                  <Icon icon="lucide:users" className="text-primary h-6 w-6" />
                </div>
                <p className="text-small text-default-500">Total Leads</p>
                <h2 className="text-3xl font-semibold">248</h2>
              </CardBody>
            </Card>
            
            <Card>
              <CardBody className="flex flex-col items-center p-6">
                <div className="rounded-full bg-success-100 p-3 mb-4">
                  <Icon icon="lucide:check-circle" className="text-success h-6 w-6" />
                </div>
                <p className="text-small text-default-500">Approved</p>
                <h2 className="text-3xl font-semibold">86</h2>
              </CardBody>
            </Card>
            
            <Card>
              <CardBody className="flex flex-col items-center p-6">
                <div className="rounded-full bg-warning-100 p-3 mb-4">
                  <Icon icon="lucide:clock" className="text-warning h-6 w-6" />
                </div>
                <p className="text-small text-default-500">Pending</p>
                <h2 className="text-3xl font-semibold">112</h2>
              </CardBody>
            </Card>
            
            <Card>
              <CardBody className="flex flex-col items-center p-6">
                <div className="rounded-full bg-danger-100 p-3 mb-4">
                  <Icon icon="lucide:x-circle" className="text-danger h-6 w-6" />
                </div>
                <p className="text-small text-default-500">Rejected</p>
                <h2 className="text-3xl font-semibold">50</h2>
              </CardBody>
            </Card>
          </div>
          
          <Card className="w-full">
            <CardHeader className="flex justify-between">
              <h3 className="text-lg font-semibold">Recent Leads</h3>
            </CardHeader>
            <Divider/>
            <CardBody>
              <p className="py-5 text-center text-default-500">
                Loading recent leads data...
              </p>
            </CardBody>
          </Card>
        </div>
      );
    };

    export default Dashboard;