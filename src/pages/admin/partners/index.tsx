import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Pagination, Button, Input, Card } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import PageHeader from '../../../components/page-header';
import { mockPartners } from '../../../data/mock-data';

const PartnersPage: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState('');
  const rowsPerPage = 8;
  
  // Filter partners based on search
  const filteredPartners = React.useMemo(() => {
    return mockPartners.filter(partner => {
      const searchLower = searchQuery.toLowerCase();
      return (
        searchQuery === '' ||
        partner.name.toLowerCase().includes(searchLower) ||
        partner.email.toLowerCase().includes(searchLower) ||
        partner.company.toLowerCase().includes(searchLower)
      );
    });
  }, [searchQuery]);
  
  // Paginate partners
  const paginatedPartners = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredPartners.slice(start, end);
  }, [filteredPartners, page]);
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredPartners.length / rowsPerPage);
  
  return (
    <div>
      <PageHeader 
        title="Partners Management" 
        subtitle="View and manage all partners"
        actionLabel="Add Partner"
        actionPath="/admin/partners/add"
      />
      
      <Card className="mb-6 border border-divider">
        <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <Input
            placeholder="Search partners..."
            value={searchQuery}
            onValueChange={setSearchQuery}
            startContent={<Icon icon="lucide:search" className="text-default-400" />}
            className="w-full sm:max-w-xs"
          />
          
          <Button 
            color="primary" 
            variant="flat"
            startContent={<Icon icon="lucide:download" />}
          >
            Export
          </Button>
        </div>
      </Card>
      
      <Card className="border border-divider">
        <div className="table-container">
          <Table 
            removeWrapper 
            aria-label="Partners table"
            bottomContent={
              <div className="flex justify-center">
                <Pagination
                  total={totalPages}
                  page={page}
                  onChange={setPage}
                />
              </div>
            }
          >
            <TableHeader>
              <TableColumn>PARTNER</TableColumn>
              <TableColumn>COMPANY</TableColumn>
              <TableColumn>CONTACT</TableColumn>
              <TableColumn>LEADS</TableColumn>
              <TableColumn>CONVERSION</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody emptyContent="No partners found">
              {paginatedPartners.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center">
                        <Icon icon="lucide:briefcase" className="text-secondary-500" />
                      </div>
                      <div>
                        <p className="font-medium">{partner.name}</p>
                        <p className="text-default-400 text-xs">{partner.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{partner.company}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{partner.email}</span>
                      <span className="text-default-400 text-xs">{partner.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>{partner.leadCount}</TableCell>
                  <TableCell>{partner.conversionRate}%</TableCell>
                  <TableCell>
                    <Chip
                      color={partner.status === 'Active' ? 'success' : 'danger'}
                      variant="flat"
                      size="sm"
                    >
                      {partner.status}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link to={`/admin/partners/${partner.id}`}>
                        <Button isIconOnly size="sm" variant="light" aria-label="View partner">
                          <Icon icon="lucide:eye" className="text-default-500" />
                        </Button>
                      </Link>
                      <Button isIconOnly size="sm" variant="light" color="danger" aria-label="Delete partner">
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

export default PartnersPage;