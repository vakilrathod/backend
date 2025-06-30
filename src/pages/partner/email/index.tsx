import React from 'react';
    import { 
      Button, 
      Card, 
      CardBody, 
      CardHeader, 
      CardFooter, 
      Divider, 
      Input, 
      Textarea, 
      Select, 
      SelectItem, 
      Chip, 
      Table, 
      TableHeader, 
      TableColumn, 
      TableBody, 
      TableRow, 
      TableCell,
      Tabs,
      Tab,
      Pagination,
      addToast
    } from "@heroui/react";
    import { Icon } from "@iconify/react";

    const EmailPage: React.FC = () => {
      const [activeTab, setActiveTab] = React.useState("compose");
      const [page, setPage] = React.useState(1);
      const [isSubmitting, setIsSubmitting] = React.useState(false);
      const rowsPerPage = 10;
      
      // Sample data for sent emails
      const emails = [
        { id: "EM001", subject: "Loan Application Update", recipient: "john@example.com", date: "2023-06-15 14:30", status: "Delivered" },
        { id: "EM002", subject: "Document Verification", recipient: "sarah@example.com", date: "2023-06-14 10:15", status: "Delivered" },
        { id: "EM003", subject: "Loan Approval Notification", recipient: "michael@example.com", date: "2023-06-13 16:45", status: "Opened" },
        { id: "EM004", subject: "Additional Documents Required", recipient: "emily@example.com", date: "2023-06-12 09:20", status: "Delivered" },
        { id: "EM005", subject: "Loan Disbursement Information", recipient: "david@example.com", date: "2023-06-11 11:05", status: "Opened" },
      ];
      
      // Sample email templates
      const emailTemplates = [
        { id: "1", name: "Loan Application Received" },
        { id: "2", name: "Document Verification" },
        { id: "3", name: "Loan Approval" },
        { id: "4", name: "Loan Rejection" },
        { id: "5", name: "Additional Documents Required" },
      ];
      
      const handleSendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate API call
        setTimeout(() => {
          addToast({
            title: 'Email Sent',
            description: 'Your email has been sent successfully',
            color: 'success',
          });
          setIsSubmitting(false);
          setActiveTab("sent");
        }, 1500);
      };
      
      const statusColorMap: Record<string, "success" | "primary"> = {
        "Delivered": "primary",
        "Opened": "success",
      };

      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Email Communications</h1>
          </div>
          
          <Tabs 
            selectedKey={activeTab} 
            onSelectionChange={(key) => setActiveTab(key as string)}
            aria-label="Email tabs"
            color="primary"
            variant="underlined"
            classNames={{
              tabList: "gap-6",
              cursor: "w-full bg-primary",
              tab: "max-w-fit px-0 h-12",
            }}
          >
            <Tab key="compose" title={
              <div className="flex items-center gap-2">
                <Icon icon="lucide:pen" />
                <span>Compose</span>
              </div>
            }>
              <Card className="mt-6">
                <CardHeader>
                  <h3 className="text-lg font-semibold">Compose New Email</h3>
                </CardHeader>
                <Divider />
                <form onSubmit={handleSendEmail}>
                  <CardBody className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="From"
                        placeholder="Your email address"
                        type="email"
                        defaultValue="partner@example.com"
                        isReadOnly
                      />
                      <Select
                        label="Template"
                        placeholder="Select a template (optional)"
                      >
                        {emailTemplates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                    
                    <Input
                      label="To"
                      placeholder="Enter recipient email address"
                      type="email"
                      isRequired
                    />
                    
                    <Input
                      label="Subject"
                      placeholder="Enter email subject"
                      isRequired
                    />
                    
                    <Textarea
                      label="Message"
                      placeholder="Enter your message here"
                      minRows={8}
                      isRequired
                    />
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Attachments</p>
                      <div className="border-2 border-dashed border-default-200 rounded-md p-4 text-center">
                        <Icon icon="lucide:upload" className="text-default-400 text-2xl mx-auto mb-2" />
                        <p className="text-default-500 text-sm">Click to upload or drag and drop</p>
                        <p className="text-default-400 text-xs mt-1">PDF, DOC, JPG or PNG (Max 10MB)</p>
                      </div>
                    </div>
                  </CardBody>
                  <Divider />
                  <CardFooter className="flex justify-end gap-2">
                    <Button 
                      variant="flat"
                      onPress={() => {
                        addToast({
                          title: 'Draft Saved',
                          description: 'Your email draft has been saved',
                        });
                      }}
                    >
                      Save Draft
                    </Button>
                    <Button 
                      color="primary" 
                      type="submit"
                      isLoading={isSubmitting}
                      startContent={!isSubmitting && <Icon icon="lucide:send" />}
                    >
                      Send Email
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </Tab>
            
            <Tab key="sent" title={
              <div className="flex items-center gap-2">
                <Icon icon="lucide:send" />
                <span>Sent</span>
              </div>
            }>
              <Card className="mt-6">
                <CardHeader>
                  <h3 className="text-lg font-semibold">Sent Emails</h3>
                </CardHeader>
                <Divider />
                <CardBody>
                  <Table 
                    removeWrapper 
                    aria-label="Sent emails table"
                    bottomContent={
                      <div className="flex w-full justify-center">
                        <Pagination
                          isCompact
                          showControls
                          showShadow
                          color="primary"
                          page={page}
                          total={5}
                          onChange={(page) => setPage(page)}
                        />
                      </div>
                    }
                  >
                    <TableHeader>
                      <TableColumn>ID</TableColumn>
                      <TableColumn>SUBJECT</TableColumn>
                      <TableColumn>RECIPIENT</TableColumn>
                      <TableColumn>DATE & TIME</TableColumn>
                      <TableColumn>STATUS</TableColumn>
                      <TableColumn>ACTIONS</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {emails.map((email) => (
                        <TableRow key={email.id}>
                          <TableCell>{email.id}</TableCell>
                          <TableCell>{email.subject}</TableCell>
                          <TableCell>{email.recipient}</TableCell>
                          <TableCell>{email.date}</TableCell>
                          <TableCell>
                            <Chip 
                              color={statusColorMap[email.status]} 
                              size="sm" 
                              variant="flat"
                            >
                              {email.status}
                            </Chip>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                isIconOnly 
                                size="sm" 
                                variant="light"
                                onPress={() => {
                                  addToast({
                                    title: 'Email Viewed',
                                    description: 'Email details opened in a new tab',
                                  });
                                }}
                              >
                                <Icon icon="lucide:eye" className="text-default-500" />
                              </Button>
                              <Button 
                                isIconOnly 
                                size="sm" 
                                variant="light"
                                onPress={() => {
                                  setActiveTab("compose");
                                  addToast({
                                    title: 'Email Loaded',
                                    description: 'Email loaded for editing',
                                  });
                                }}
                              >
                                <Icon icon="lucide:copy" className="text-default-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardBody>
              </Card>
            </Tab>
            
            <Tab key="templates" title={
              <div className="flex items-center gap-2">
                <Icon icon="lucide:file-text" />
                <span>Templates</span>
              </div>
            }>
              <Card className="mt-6">
                <CardHeader className="flex justify-between">
                  <h3 className="text-lg font-semibold">Email Templates</h3>
                  <Button 
                    size="sm"
                    color="primary"
                    variant="flat"
                    startContent={<Icon icon="lucide:plus" />}
                  >
                    Create Template
                  </Button>
                </CardHeader>
                <Divider />
                <CardBody>
                  <Table 
                    removeWrapper 
                    aria-label="Email templates table"
                  >
                    <TableHeader>
                      <TableColumn>NAME</TableColumn>
                      <TableColumn>ACTIONS</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {emailTemplates.map((template) => (
                        <TableRow key={template.id}>
                          <TableCell>{template.name}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="flat"
                                color="primary"
                                onPress={() => {
                                  setActiveTab("compose");
                                  addToast({
                                    title: 'Template Selected',
                                    description: `Template "${template.name}" loaded`,
                                  });
                                }}
                              >
                                Use Template
                              </Button>
                              <Button 
                                isIconOnly 
                                size="sm" 
                                variant="light"
                                onPress={() => {
                                  addToast({
                                    title: 'Template Edited',
                                    description: `Template "${template.name}" opened for editing`,
                                  });
                                }}
                              >
                                <Icon icon="lucide:edit" className="text-default-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      );
    };

    export default EmailPage;