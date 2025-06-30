import React from 'react';
import { Card, CardBody, CardHeader, Divider, Input, Button, Textarea, Select, SelectItem, Chip, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, addToast } from '@heroui/react';
import { Icon } from '@iconify/react';
import PageHeader from '../../../components/page-header';
import { mockEmailTemplates, mockLeads } from '../../../data/mock-data';

const EmailPage: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = React.useState<string>('');
  const [subject, setSubject] = React.useState<string>('');
  const [body, setBody] = React.useState<string>('');
  const [selectedRecipients, setSelectedRecipients] = React.useState<string[]>([]);
  const [isSending, setIsSending] = React.useState(false);
  
  // Handle template selection
  const handleTemplateChange = (value: string) => {
    setSelectedTemplate(value);
    
    if (value) {
      const template = mockEmailTemplates.find(t => t.id === value);
      if (template) {
        setSubject(template.subject);
        setBody(template.body);
      }
    }
  };
  
  // Handle recipient selection
  const handleRecipientChange = (leadId: string) => {
    setSelectedRecipients(prev => {
      if (prev.includes(leadId)) {
        return prev.filter(id => id !== leadId);
      } else {
        return [...prev, leadId];
      }
    });
  };
  
  // Handle select all recipients
  const handleSelectAll = () => {
    if (selectedRecipients.length === mockLeads.length) {
      setSelectedRecipients([]);
    } else {
      setSelectedRecipients(mockLeads.map(lead => lead.id));
    }
  };
  
  // Handle send email
  const handleSendEmail = () => {
    if (!subject || !body) {
      addToast({
        title: 'Error',
        description: 'Please provide both subject and body for the email',
        color: 'danger',
      });
      return;
    }
    
    if (selectedRecipients.length === 0) {
      addToast({
        title: 'Error',
        description: 'Please select at least one recipient',
        color: 'danger',
      });
      return;
    }
    
    setIsSending(true);
    
    // Simulate API call
    setTimeout(() => {
      addToast({
        title: 'Success',
        description: `Email sent to ${selectedRecipients.length} recipient(s)`,
        color: 'success',
      });
      setIsSending(false);
    }, 2000);
  };
  
  return (
    <div>
      <PageHeader 
        title="Email Communication" 
        subtitle="Send emails to leads and customers"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border border-divider mb-6">
            <CardHeader>
              <h3 className="text-lg font-semibold">Compose Email</h3>
            </CardHeader>
            <Divider />
            <CardBody className="space-y-6">
              <div>
                <Select
                  label="Email Template"
                  placeholder="Select a template or create a new one"
                  selectedKeys={selectedTemplate ? [selectedTemplate] : []}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as string;
                    handleTemplateChange(selected);
                  }}
                >
                  <SelectItem key="" value="custom">Create Custom Email</SelectItem>
                  {mockEmailTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              
              <div>
                <Input
                  label="Subject"
                  placeholder="Enter email subject"
                  value={subject}
                  onValueChange={setSubject}
                />
              </div>
              
              <div>
                <Textarea
                  label="Email Body"
                  placeholder="Enter email content"
                  value={body}
                  onValueChange={setBody}
                  minRows={10}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  <Button size="sm" variant="flat">
                    <span>Insert: </span>
                    <span className="text-primary-500">{'{{name}}'}</span>
                  </Button>
                  <Button size="sm" variant="flat">
                    <span>Insert: </span>
                    <span className="text-primary-500">{'{{amount}}'}</span>
                  </Button>
                  <Button size="sm" variant="flat">
                    <span>Insert: </span>
                    <span className="text-primary-500">{'{{applicationId}}'}</span>
                  </Button>
                  <Button size="sm" variant="flat">
                    <span>Insert: </span>
                    <span className="text-primary-500">{'{{date}}'}</span>
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button
                  variant="flat"
                  startContent={<Icon icon="lucide:save" />}
                >
                  Save as Template
                </Button>
                <Button
                  color="primary"
                  startContent={<Icon icon="lucide:mail" />}
                  isLoading={isSending}
                  onPress={handleSendEmail}
                >
                  Send Email
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
        
        <div>
          <Card className="border border-divider">
            <CardHeader className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Recipients</h3>
              <Button 
                size="sm" 
                variant="flat"
                onPress={handleSelectAll}
              >
                {selectedRecipients.length === mockLeads.length ? 'Deselect All' : 'Select All'}
              </Button>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="mb-4">
                <Input
                  placeholder="Search recipients..."
                  startContent={<Icon icon="lucide:search" className="text-default-400" />}
                />
              </div>
              
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {mockLeads.slice(0, 10).map((lead) => (
                  <div 
                    key={lead.id} 
                    className={`p-3 rounded-md border cursor-pointer transition-colors ${
                      selectedRecipients.includes(lead.id) 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-default-200 hover:border-primary-200'
                    }`}
                    onClick={() => handleRecipientChange(lead.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-default-100 flex items-center justify-center">
                          <Icon icon="lucide:user" className="text-default-500" />
                        </div>
                        <div>
                          <p className="font-medium">{`${lead.firstName} ${lead.lastName}`}</p>
                          <p className="text-default-500 text-xs">{lead.email}</p>
                        </div>
                      </div>
                      <Chip 
                        size="sm" 
                        color={lead.profile === 'Approved' ? 'success' : lead.profile === 'Pending' ? 'warning' : 'danger'}
                        variant="flat"
                      >
                        {lead.profile}
                      </Chip>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-default-500 text-sm">
                  {selectedRecipients.length} recipient(s) selected
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
      
      <Card className="border border-divider mt-6">
        <CardHeader>
          <h3 className="text-lg font-semibold">Email Templates</h3>
        </CardHeader>
        <Divider />
        <CardBody>
          <Table removeWrapper aria-label="Email templates table">
            <TableHeader>
              <TableColumn>TEMPLATE NAME</TableColumn>
              <TableColumn>SUBJECT</TableColumn>
              <TableColumn>CREATED</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {mockEmailTemplates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-primary-100">
                        <Icon icon="lucide:mail" className="text-primary-500" />
                      </div>
                      <span className="font-medium">{template.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{template.subject}</TableCell>
                  <TableCell>{new Date(template.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="light" 
                        onPress={() => handleTemplateChange(template.id)}
                      >
                        <Icon icon="lucide:edit" className="text-default-500" />
                      </Button>
                      <Button isIconOnly size="sm" variant="light">
                        <Icon icon="lucide:copy" className="text-default-500" />
                      </Button>
                      <Button isIconOnly size="sm" variant="light" color="danger">
                        <Icon icon="lucide:trash-2" className="text-danger" />
                      </Button>
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

export default EmailPage;