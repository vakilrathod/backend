import React from 'react';
import { Card, CardBody, CardHeader, Divider, Input, Button, Textarea, Select, SelectItem, Chip, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, addToast } from '@heroui/react';
import { Icon } from '@iconify/react';
import PageHeader from '../../../components/page-header';
import { mockSmsTemplates, mockLeads } from '../../../data/mock-data';

const SmsPage: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('');
  const [selectedRecipients, setSelectedRecipients] = React.useState<string[]>([]);
  const [isSending, setIsSending] = React.useState(false);
  const [charCount, setCharCount] = React.useState(0);
  
  // Update character count when content changes
  React.useEffect(() => {
    setCharCount(content.length);
  }, [content]);
  
  // Handle template selection
  const handleTemplateChange = (value: string) => {
    setSelectedTemplate(value);
    
    if (value) {
      const template = mockSmsTemplates.find(t => t.id === value);
      if (template) {
        setContent(template.content);
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
  
  // Handle send SMS
  const handleSendSms = () => {
    if (!content) {
      addToast({
        title: 'Error',
        description: 'Please provide content for the SMS',
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
        description: `SMS sent to ${selectedRecipients.length} recipient(s)`,
        color: 'success',
      });
      setIsSending(false);
    }, 2000);
  };
  
  return (
    <div>
      <PageHeader 
        title="SMS Communication" 
        subtitle="Send SMS to leads and customers"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border border-divider mb-6">
            <CardHeader>
              <h3 className="text-lg font-semibold">Compose SMS</h3>
            </CardHeader>
            <Divider />
            <CardBody className="space-y-6">
              <div>
                <Select
                  label="SMS Template"
                  placeholder="Select a template or create a new one"
                  selectedKeys={selectedTemplate ? [selectedTemplate] : []}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as string;
                    handleTemplateChange(selected);
                  }}
                >
                  <SelectItem key="" value="custom">Create Custom SMS</SelectItem>
                  {mockSmsTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              
              <div>
                <Textarea
                  label="SMS Content"
                  placeholder="Enter SMS content"
                  value={content}
                  onValueChange={setContent}
                  minRows={5}
                  maxLength={160}
                />
                <div className="flex justify-between mt-1">
                  <div className="flex flex-wrap gap-2">
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
                  </div>
                  <span className={`text-xs ${charCount > 140 ? 'text-danger' : 'text-default-500'}`}>
                    {charCount}/160 characters
                  </span>
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
                  startContent={<Icon icon="lucide:message-square" />}
                  isLoading={isSending}
                  onPress={handleSendSms}
                >
                  Send SMS
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
                          <p className="text-default-500 text-xs">{lead.mobile}</p>
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
          <h3 className="text-lg font-semibold">SMS Templates</h3>
        </CardHeader>
        <Divider />
        <CardBody>
          <Table removeWrapper aria-label="SMS templates table">
            <TableHeader>
              <TableColumn>TEMPLATE NAME</TableColumn>
              <TableColumn>CONTENT</TableColumn>
              <TableColumn>CREATED</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {mockSmsTemplates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-primary-100">
                        <Icon icon="lucide:message-square" className="text-primary-500" />
                      </div>
                      <span className="font-medium">{template.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="truncate max-w-xs">{template.content}</p>
                  </TableCell>
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

export default SmsPage;