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
      Pagination,
      Input,
      Avatar
    } from "@heroui/react";
    import { Icon } from "@iconify/react";
    import { Link } from "react-router-dom";

    const TeamsPage: React.FC = () => {
      const [page, setPage] = React.useState(1);
      const [searchQuery, setSearchQuery] = React.useState('');
      const rowsPerPage = 10;
      
      // Sample data
      const teams = [
        { 
          id: "TM001", 
          name: "Sales Team", 
          members: 8, 
          lead: "Priya Sharma", 
          leadsAssigned: 45, 
          conversionRate: "18%",
          status: "Active" 
        },
        { 
          id: "TM002", 
          name: "Verification Team", 
          members: 5, 
          lead: "Rahul Verma", 
          leadsAssigned: 32, 
          conversionRate: "22%",
          status: "Active" 
        },
        { 
          id: "TM003", 
          name: "Processing Team", 
          members: 6, 
          lead: "Ananya Patel", 
          leadsAssigned: 28, 
          conversionRate: "25%",
          status: "Active" 
        },
        { 
          id: "TM004", 
          name: "Support Team", 
          members: 4, 
          lead: "Vikram Singh", 
          leadsAssigned: 15, 
          conversionRate: "30%",
          status: "Active" 
        }
      ];
      
      // Filter teams based on search
      const filteredTeams = React.useMemo(() => {
        return teams.filter(team => 
          team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          team.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          team.lead.toLowerCase().includes(searchQuery.toLowerCase())
        );
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
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Teams</h1>
          </div>
          
          <Card>
            <CardHeader className="flex justify-between">
              <Input
                placeholder="Search teams..."
                value={searchQuery}
                onValueChange={setSearchQuery}
                startContent={<Icon icon="lucide:search" className="text-default-400" />}
                className="w-full max-w-xs"
              />
            </CardHeader>
            <Divider/>
            <CardBody>
              <Table 
                removeWrapper 
                aria-label="Teams table"
                bottomContent={
                  <div className="flex w-full justify-center">
                    <Pagination
                      isCompact
                      showControls
                      showShadow
                      color="primary"
                      page={page}
                      total={totalPages}
                      onChange={(page) => setPage(page)}
                    />
                  </div>
                }
              >
                <TableHeader>
                  <TableColumn>TEAM ID</TableColumn>
                  <TableColumn>TEAM NAME</TableColumn>
                  <TableColumn>TEAM LEAD</TableColumn>
                  <TableColumn>MEMBERS</TableColumn>
                  <TableColumn>LEADS ASSIGNED</TableColumn>
                  <TableColumn>CONVERSION RATE</TableColumn>
                  <TableColumn>STATUS</TableColumn>
                  <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody emptyContent="No teams found">
                  {paginatedTeams.map((team) => (
                    <TableRow key={team.id}>
                      <TableCell>{team.id}</TableCell>
                      <TableCell>{team.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar 
                            name={team.lead} 
                            size="sm" 
                            src={`https://img.heroui.chat/image/avatar?w=40&h=40&u=${team.lead.replace(/\s/g, '')}`} 
                          />
                          {team.lead}
                        </div>
                      </TableCell>
                      <TableCell>{team.members}</TableCell>
                      <TableCell>{team.leadsAssigned}</TableCell>
                      <TableCell>{team.conversionRate}</TableCell>
                      <TableCell>
                        <Chip 
                          color="success" 
                          size="sm" 
                          variant="flat"
                        >
                          {team.status}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <Dropdown>
                          <DropdownTrigger>
                            <Button isIconOnly size="sm" variant="light">
                              <Icon icon="lucide:more-vertical" className="text-default-500" />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu>
                            <DropdownItem as={Link} to={`/partner/teams/${team.id}`}>
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

    export default TeamsPage;