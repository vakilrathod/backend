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
      TableCell
    } from "@heroui/react";
    import { Icon } from "@iconify/react";
    import { useParams, useHistory } from "react-router-dom";

    const LenderDetailPage: React.FC = () => {
      const { id } = useParams<{ id: string }>();
      const history = useHistory();
      
      // Sample lender data - in a real app, fetch this based on the ID
      const lender = {
        id: id || "LEN001",
        name: "ABC Finance",
        type: "Bank",
        interestRate: "8.5%",
        maxLoanAmount: 5000000,
        minLoanAmount: 100000,
        processingFee: "1%",
        minTenure: 12,
        maxTenure: 60,
        status: "Active",
        address: "123 Finance Street, Mumbai, India",
        contactPerson: "Rahul Sharma",
        contactEmail: "rahul@abcfinance.com",
        contactPhone: "9876543210",
        eligibilityCriteria: [
          "Minimum age: 21 years",
          "Maximum age: 60 years",
          "Minimum income: ₹25,000 per month",
          "Credit score: 700+"
        ],
        loanTypes: [
          { type: "Personal Loan", interestRate: "10.5%", maxAmount: 1000000 },
          { type: "Home Loan", interestRate: "8.5%", maxAmount: 5000000 },
          { type: "Car Loan", interestRate: "9.25%", maxAmount: 1500000 }
        ]
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
            <h1 className="text-2xl font-semibold">Lender Details</h1>
            <Chip 
              color="success" 
              variant="flat"
            >
              {lender.status}
            </Chip>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Lender Information</h3>
                </CardHeader>
                <Divider/>
                <CardBody>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-small text-default-500">Lender ID</p>
                      <p>{lender.id}</p>
                    </div>
                    <div>
                      <p className="text-small text-default-500">Name</p>
                      <p>{lender.name}</p>
                    </div>
                    <div>
                      <p className="text-small text-default-500">Type</p>
                      <p>{lender.type}</p>
                    </div>
                    <div>
                      <p className="text-small text-default-500">Status</p>
                      <Chip 
                        color="success" 
                        size="sm" 
                        variant="flat"
                      >
                        {lender.status}
                      </Chip>
                    </div>
                    <div>
                      <p className="text-small text-default-500">Address</p>
                      <p>{lender.address}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
              
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Loan Products</h3>
                </CardHeader>
                <Divider/>
                <CardBody>
                  <Table removeWrapper aria-label="Loan products table">
                    <TableHeader>
                      <TableColumn>LOAN TYPE</TableColumn>
                      <TableColumn>INTEREST RATE</TableColumn>
                      <TableColumn>MAX AMOUNT</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {lender.loanTypes.map((loan, index) => (
                        <TableRow key={index}>
                          <TableCell>{loan.type}</TableCell>
                          <TableCell>{loan.interestRate}</TableCell>
                          <TableCell>₹{loan.maxAmount.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardBody>
              </Card>
              
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Eligibility Criteria</h3>
                </CardHeader>
                <Divider/>
                <CardBody>
                  <ul className="list-disc pl-5 space-y-2">
                    {lender.eligibilityCriteria.map((criteria, index) => (
                      <li key={index}>{criteria}</li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Contact Information</h3>
                </CardHeader>
                <Divider/>
                <CardBody>
                  <div className="space-y-4">
                    <div>
                      <p className="text-small text-default-500">Contact Person</p>
                      <p>{lender.contactPerson}</p>
                    </div>
                    <div>
                      <p className="text-small text-default-500">Email</p>
                      <p>{lender.contactEmail}</p>
                    </div>
                    <div>
                      <p className="text-small text-default-500">Phone</p>
                      <p>{lender.contactPhone}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
              
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Loan Terms</h3>
                </CardHeader>
                <Divider/>
                <CardBody>
                  <div className="space-y-4">
                    <div>
                      <p className="text-small text-default-500">Interest Rate</p>
                      <p>{lender.interestRate}</p>
                    </div>
                    <div>
                      <p className="text-small text-default-500">Processing Fee</p>
                      <p>{lender.processingFee}</p>
                    </div>
                    <div>
                      <p className="text-small text-default-500">Min-Max Loan Amount</p>
                      <p>₹{lender.minLoanAmount.toLocaleString()} - ₹{lender.maxLoanAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-small text-default-500">Tenure (Months)</p>
                      <p>{lender.minTenure} - {lender.maxTenure}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      );
    };

    export default LenderDetailPage;