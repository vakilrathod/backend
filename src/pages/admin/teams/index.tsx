import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Pagination, Button, Input, Card } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import PageHeader from '../../../components/page-header';
import { mockTeams } from '../../../data/mock-data';

const TeamsPage: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState('');
  const rowsPerPage = 8;
  
  // Filter teams based on search
  const filteredTeams = React.useMemo(() => {
    return mockTeams.filter(team => {
      const searchLower = searchQuery.toLowerCase();
      return (
        searchQuery === '' ||
        team.name.toLowerCase().includes(searchLower) ||
        team.email.toLowerCase().includes(searchLower) ||
        team.role.toLowerCase().includes(searchLower) ||
        team.department.toLowerCase().includes(searchLower)
      );
    });
  }, [searchQuery]);
  
  // Paginate teams
  const paginatedTeams = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredTeams.slice(start, end);
  }, [filteredTeams, page]);
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredTeams.length / rowsPerPage);
  
  return (
    <div>
      <PageHeader 
        title="Teams Management" 
        subtitle="View and manage all team members"
        actionLabel="Add Team Member"
        actionPath="/admin/teams/add"
      />
      
      <Card className="mb-6 border border-divider">
        <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <Input
            placeholder="Search team members..."
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
            aria-label="Teams table"
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
              <TableColumn>NAME</TableColumn>
              <TableColumn>ROLE</TableColumn>
              <TableColumn>DEPARTMENT</TableColumn>
              <TableColumn>CONTACT</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody emptyContent="No team members found">
              {paginatedTeams.map((team) => (
                <TableRow key={team.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                        <Icon icon="lucide:user" className="text-primary-500" />
                      </div>
                      <div>
                        <p className="font-medium">{team.name}</p>
                        <p className="text-default-400 text-xs">{team.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{team.role}</TableCell>
                  <TableCell>{team.department}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{team.email}</span>
                      <span className="text-default-400 text-xs">{team.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip
                      color={team.status === 'Active' ? 'success' : 'danger'}
                      variant="flat"
                      size="sm"
                    >
                      {team.status}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link to={`/admin/teams/${team.id}`}>
                        <Button isIconOnly size="sm" variant="light" aria-label="View team member">
                          <Icon icon="lucide:eye" className="text-default-500" />
                        </Button>
                      </Link>
                      <Button isIconOnly size="sm" variant="light" color="danger" aria-label="Delete team member">
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

export default TeamsPage;