import React from 'react';
    import { 
      Button, 
      Card, 
      CardBody, 
      CardHeader, 
      Divider, 
      Table, 
      TableHeader, 
      TableColumn, 
      TableBody, 
      TableRow, 
      TableCell, 
      Chip, 
      Dropdown, 
      DropdownTrigger, 
      DropdownMenu, 
      DropdownItem,
      useDisclosure,
      Pagination
    } from "@heroui/react";
    import { Icon } from "@iconify/react";
    import { Link } from "react-router-dom";

    const LeadsPage: React.FC = () => {
      const [page, setPage] = React.useState(1);
      const rowsPerPage = 10;
      
      // Sample data
      const leads = [
        { id: "LD001", type: "Personal", profile: "Approved", name: "John Smith", mobile: "9876543210", email: "john@example.com", amount: 250000 },
        { id: "LD002", type: "Home", profile: "Pending", name: "Sarah Johnson", mobile: "8765432109", email: "sarah@example.com", amount: 1500000 },
        { id: "LD003", type: "Car", profile: "Rejected", name: "Michael Brown", mobile: "7654321098", email: "michael@example.com", amount: 800000 },
        { id: "LD004", type: "Personal", profile: "Approved", name: "Emily Davis", mobile: "6543210987", email: "emily@example.com", amount: 300000 },
        { id: "LD005", type: "Business", profile: "Pending", name: "David Wilson", mobile: "5432109876", email: "david@example.com", amount: 5000000 },
      ];
      
      const statusColorMap: Record<string, "success" | "warning" | "danger"> = {
        "Approved": "success",
        "Pending": "warning",
        "Rejected": "danger",
      };

      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Leads Management</h1>
            <Button 
              as={Link} 
              to="/partner/leads/add" 
              color="primary" 
              startContent={<Icon icon="lucide:plus" />}
            >
              Add New Lead
            </Button>
          </div>
          
          <Card>
            <CardHeader className="flex justify-between">
              <h3 className="text-lg font-semibold">All Leads</h3>
              <div className="flex gap-3">
                <Button 
                  variant="flat" 
                  startContent={<Icon icon="lucide:download" />}
                >
                  Export
                </Button>
              </div>
            </CardHeader>
            <Divider/>
            <CardBody>
              <Table 
                removeWrapper 
                aria-label="Leads table"
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
                  <TableColumn>LEAD ID</TableColumn>
                  <TableColumn>LOAN TYPE</TableColumn>
                  <TableColumn>STATUS</TableColumn>
                  <TableColumn>NAME</TableColumn>
                  <TableColumn>CONTACT</TableColumn>
                  <TableColumn>LOAN AMOUNT</TableColumn>
                  <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>{lead.id}</TableCell>
                      <TableCell>{lead.type}</TableCell>
                      <TableCell>
                        <Chip 
                          color={statusColorMap[lead.profile]} 
                          size="sm" 
                          variant="flat"
                        >
                          {lead.profile}
                        </Chip>
                      </TableCell>
                      <TableCell>{lead.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{lead.mobile}</span>
                          <span className="text-tiny text-default-500">{lead.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>₹{lead.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Dropdown>
                          <DropdownTrigger>
                            <Button isIconOnly size="sm" variant="light">
                              <Icon icon="lucide:more-vertical" className="text-default-500" />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu>
                            <DropdownItem as={Link} to={`/partner/leads/${lead.id}`}>
                              View Details
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
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

    export default LeadsPage;