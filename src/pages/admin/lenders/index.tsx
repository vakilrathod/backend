import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Pagination, Button, Input, Card } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import PageHeader from '../../../components/page-header';
import { mockLenders } from '../../../data/mock-data';

const LendersPage: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState('');
  const rowsPerPage = 8;
  
  // Filter lenders based on search
  const filteredLenders = React.useMemo(() => {
    return mockLenders.filter(lender => {
      const searchLower = searchQuery.toLowerCase();
      return (
        searchQuery === '' ||
        lender.name.toLowerCase().includes(searchLower) ||
        lender.email.toLowerCase().includes(searchLower) ||
        lender.company.toLowerCase().includes(searchLower)
      );
    });
  }, [searchQuery]);
  
  // Paginate lenders
  const paginatedLenders = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredLenders.slice(start, end);
  }, [filteredLenders, page]);
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredLenders.length / rowsPerPage);
  
  return (
    <div>
      <PageHeader 
        title="Lenders Management" 
        subtitle="View and manage all lenders"
        actionLabel="Add Lender"
        actionPath="/admin/lenders/add"
      />
      
      <Card className="mb-6 border border-divider">
        <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <Input
            placeholder="Search lenders..."
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
            aria-label="Lenders table"
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
              <TableColumn>LENDER</TableColumn>
              <TableColumn>INTEREST RATE</TableColumn>
              <TableColumn>LOAN TYPES</TableColumn>
              <TableColumn>LOAN RANGE</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody emptyContent="No lenders found">
              {paginatedLenders.map((lender) => (
                <TableRow key={lender.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                        <Icon icon="lucide:building-2" className="text-primary-500" />
                      </div>
                      <div>
                        <p className="font-medium">{lender.company}</p>
                        <p className="text-default-400 text-xs">{lender.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{lender.interestRate}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {lender.loanTypes.map((type) => (
                        <Chip key={type} size="sm" variant="flat">
                          {type}
                        </Chip>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span>₹{lender.minLoanAmount.toLocaleString()} - ₹{lender.maxLoanAmount.toLocaleString()}</span>
                  </TableCell>
                  <TableCell>
                    <Chip
                      color={lender.status === 'Active' ? 'success' : 'danger'}
                      variant="flat"
                      size="sm"
                    >
                      {lender.status}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link to={`/admin/lenders/${lender.id}`}>
                        <Button isIconOnly size="sm" variant="light" aria-label="View lender">
                          <Icon icon="lucide:eye" className="text-default-500" />
                        </Button>
                      </Link>
                      <Button isIconOnly size="sm" variant="light" color="danger" aria-label="Delete lender">
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

export default LendersPage;