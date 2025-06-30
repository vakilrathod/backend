import React from 'react';
    import { 
      Button, 
      Card, 
      CardBody, 
      CardHeader, 
      Divider, 
      Chip,
      Tabs,
      Tab
    } from "@heroui/react";
    import { Icon } from "@iconify/react";
    import { useParams, useHistory, Link } from "react-router-dom";

    const LeadDetailPage: React.FC = () => {
      const { id } = useParams<{ id: string }>();
      const history = useHistory();
      
      // Sample lead data - in a real app, fetch this based on the ID
      const lead = {
        id: id || "LD001",
        type: "Personal",
        profile: "Approved",
        firstName: "John",
        lastName: "Smith",
        mobile: "9876543210",
        email: "john@example.com",
        gender: "Male",
        dob: "1985-06-15",
        income: 750000,
        amount: 250000,
        pan: "ABCDE1234F",
        pincode: "400001",
        consent: true,
        documents: {
          aadhaar: true,
          pan: true,
          bankStatement: true,
          paymentSlip: true
        },
        partner: "FinTech Solutions",
        utmSource: "Website"
      };
      
      const statusColorMap: Record<string, "success" | "warning" | "danger"> = {
        "Approved": "success",
        "Pending": "warning",
        "Rejected": "danger",
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
            <h1 className="text-2xl font-semibold">Lead Details</h1>
            <Chip 
              color={statusColorMap[lead.profile]} 
              variant="flat"
            >
              {lead.profile}
            </Chip>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Personal Information</h3>
                </CardHeader>
                <Divider/>
                <CardBody>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-small text-default-500">Full Name</p>
                      <p>{lead.firstName} {lead.lastName}</p>
                    </div>
                    <div>
                      <p className="text-small text-default-500">Gender</p>
                      <p>{lead.gender}</p>
                    </div>
                    <div>
                      <p className="text-small text-default-500">Date of Birth</p>
                      <p>{lead.dob}</p>
                    </div>
                    <div>
                      <p className="text-small text-default-500">Mobile</p>
                      <p>{lead.mobile}</p>
                    </div>
                    <div>
                      <p className="text-small text-default-500">Email</p>
                      <p>{lead.email}</p>
                    </div>
                    <div>
                      <p className="text-small text-default-500">PAN</p>
                      <p>{lead.pan}</p>
                    </div>
                    <div>
                      <p className="text-small text-default-500">Pincode</p>
                      <p>{lead.pincode}</p>
                    </div>
                    <div>
                      <p className="text-small text-default-500">Annual Income</p>
                      <p>₹{lead.income.toLocaleString()}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
              
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Loan Information</h3>
                </CardHeader>
                <Divider/>
                <CardBody>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-small text-default-500">Loan ID</p>
                      <p>{lead.id}</p>
                    </div>
                    <div>
                      <p className="text-small text-default-500">Loan Type</p>
                      <p>{lead.type}</p>
                    </div>
                    <div>
                      <p className="text-small text-default-500">Loan Amount</p>
                      <p>₹{lead.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-small text-default-500">Status</p>
                      <Chip 
                        color={statusColorMap[lead.profile]} 
                        size="sm" 
                        variant="flat"
                      >
                        {lead.profile}
                      </Chip>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Source Information</h3>
                </CardHeader>
                <Divider/>
                <CardBody>
                  <div className="space-y-4">
                    <div>
                      <p className="text-small text-default-500">Partner</p>
                      <p>{lead.partner}</p>
                    </div>
                    <div>
                      <p className="text-small text-default-500">UTM Source</p>
                      <p>{lead.utmSource}</p>
                    </div>
                    <div>
                      <p className="text-small text-default-500">Consent</p>
                      <p>{lead.consent ? "Provided" : "Not Provided"}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
              
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Documents</h3>
                </CardHeader>
                <Divider/>
                <CardBody>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p>Aadhaar Card</p>
                      {lead.documents.aadhaar ? (
                        <Chip color="success" size="sm" variant="flat">Uploaded</Chip>
                      ) : (
                        <Chip color="danger" size="sm" variant="flat">Missing</Chip>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <p>PAN Card</p>
                      {lead.documents.pan ? (
                        <Chip color="success" size="sm" variant="flat">Uploaded</Chip>
                      ) : (
                        <Chip color="danger" size="sm" variant="flat">Missing</Chip>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <p>Bank Statement</p>
                      {lead.documents.bankStatement ? (
                        <Chip color="success" size="sm" variant="flat">Uploaded</Chip>
                      ) : (
                        <Chip color="danger" size="sm" variant="flat">Missing</Chip>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <p>Payment Slip</p>
                      {lead.documents.paymentSlip ? (
                        <Chip color="success" size="sm" variant="flat">Uploaded</Chip>
                      ) : (
                        <Chip color="danger" size="sm" variant="flat">Missing</Chip>
                      )}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      );
    };

    export default LeadDetailPage;