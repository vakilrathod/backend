import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Pagination, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Input, Card } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import PageHeader from '../../../components/page-header';
import StatusBadge from '../../../components/status-badge';
import { mockLeads } from '../../../data/mock-data';
import { Lead } from '../../../types';

const LeadsPage: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<string>('all');
  const [loanTypeFilter, setLoanTypeFilter] = React.useState<string>('all');
  const rowsPerPage = 10;
  
  // Get unique loan types for filter
  const loanTypes = React.useMemo(() => {
    const types = new Set(mockLeads.map(lead => lead.loanType));
    return Array.from(types);
  }, []);
  
  // Filter leads based on search and filters
  const filteredLeads = React.useMemo(() => {
    return mockLeads.filter(lead => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        searchQuery === '' ||
        lead.leadId.toLowerCase().includes(searchLower) ||
        lead.firstName.toLowerCase().includes(searchLower) ||
        lead.lastName.toLowerCase().includes(searchLower) ||
        lead.email.toLowerCase().includes(searchLower) ||
        lead.mobile.includes(searchQuery);
      
      // Status filter
      const matchesStatus = 
        statusFilter === 'all' || 
        lead.profile.toLowerCase() === statusFilter.toLowerCase();
      
      // Loan type filter
      const matchesLoanType = 
        loanTypeFilter === 'all' || 
        lead.loanType.toLowerCase() === loanTypeFilter.toLowerCase();
      
      return matchesSearch && matchesStatus && matchesLoanType;
    });
  }, [searchQuery, statusFilter, loanTypeFilter]);
  
  // Paginate leads
  const paginatedLeads = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredLeads.slice(start, end);
  }, [filteredLeads, page]);
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredLeads.length / rowsPerPage);
  
  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  
  // Handle export
  const handleExport = () => {
    alert('Exporting leads to CSV...');
    // In a real app, this would generate and download a CSV file
  };
  
  return (
    <div>
      <PageHeader 
        title="Leads Management" 
        subtitle="View and manage all loan application leads"
        actionLabel="Add Lead"
        actionPath="/admin/leads/add"
      />
      
      <Card className="mb-6 border border-divider">
        <div className="p-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-grow">
            <Input
              placeholder="Search leads..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              startContent={<Icon icon="lucide:search" className="text-default-400" />}
              className="w-full sm:max-w-xs"
            />
            
            <div className="flex gap-3">
              <Dropdown>
                <DropdownTrigger>
                  <Button 
                    variant="flat" 
                    endContent={<Icon icon="lucide:chevron-down" className="text-small" />}
                  >
                    Status: {statusFilter === 'all' ? 'All' : statusFilter}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu 
                  aria-label="Status filter"
                  selectionMode="single"
                  selectedKeys={[statusFilter]}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as string;
                    setStatusFilter(selected);
                    setPage(1);
                  }}
                >
                  <DropdownItem key="all">All</DropdownItem>
                  <DropdownItem key="approved">Approved</DropdownItem>
                  <DropdownItem key="pending">Pending</DropdownItem>
                  <DropdownItem key="rejected">Rejected</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              
              <Dropdown>
                <DropdownTrigger>
                  <Button 
                    variant="flat" 
                    endContent={<Icon icon="lucide:chevron-down" className="text-small" />}
                  >
                    Loan Type: {loanTypeFilter === 'all' ? 'All' : loanTypeFilter}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu 
                  aria-label="Loan type filter"
                  selectionMode="single"
                  selectedKeys={[loanTypeFilter]}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0] as string;
                    setLoanTypeFilter(selected);
                    setPage(1);
                  }}
                >
                  <DropdownItem key="all">All</DropdownItem>
                  {loanTypes.map((type) => (
                    <DropdownItem key={type.toLowerCase()}>{type}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          
          <Button 
            color="primary" 
            variant="flat"
            startContent={<Icon icon="lucide:download" />}
            onPress={handleExport}
          >
            Export
          </Button>
        </div>
      </Card>
      
      <Card className="border border-divider">
        <div className="table-container">
          <Table 
            removeWrapper 
            aria-label="Leads table"
            bottomContent={
              <div className="flex justify-center">
                <Pagination
                  total={totalPages}
                  page={page}
                  onChange={handlePageChange}
                />
              </div>
            }
          >
            <TableHeader>
              <TableColumn>LEAD ID</TableColumn>
              <TableColumn>NAME</TableColumn>
              <TableColumn>LOAN TYPE</TableColumn>
              <TableColumn>AMOUNT</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>PARTNER</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody emptyContent="No leads found">
              {paginatedLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>{lead.leadId}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{`${lead.firstName} ${lead.lastName}`}</span>
                      <span className="text-default-400 text-xs">{lead.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>{lead.loanType}</TableCell>
                  <TableCell>₹{lead.loanAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    <StatusBadge status={lead.profile} />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{lead.partnerName}</span>
                      <span className="text-default-400 text-xs">{lead.utmSource}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link to={`/admin/leads/${lead.id}`}>
                        <Button isIconOnly size="sm" variant="light" aria-label="View lead">
                          <Icon icon="lucide:eye" className="text-default-500" />
                        </Button>
                      </Link>
                      <Button isIconOnly size="sm" variant="light" color="danger" aria-label="Delete lead">
                        <Icon icon="lucide:trash-2" className="text-danger" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default LeadsPage;