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
      Input
    } from "@heroui/react";
    import { Icon } from "@iconify/react";
    import { Link } from "react-router-dom";

    const LendersPage: React.FC = () => {
      const [page, setPage] = React.useState(1);
      const [searchQuery, setSearchQuery] = React.useState('');
      const rowsPerPage = 10;
      
      // Sample data
      const lenders = [
        { id: "LEN001", name: "ABC Finance", type: "Bank", interestRate: "8.5%", maxLoanAmount: 5000000, status: "Active" },
        { id: "LEN002", name: "XYZ Credit", type: "NBFC", interestRate: "9.2%", maxLoanAmount: 2000000, status: "Active" },
        { id: "LEN003", name: "City Loans", type: "Bank", interestRate: "8.75%", maxLoanAmount: 10000000, status: "Active" },
        { id: "LEN004", name: "Quick Finance", type: "NBFC", interestRate: "10.5%", maxLoanAmount: 1000000, status: "Active" },
        { id: "LEN005", name: "Metro Credit", type: "Bank", interestRate: "8.25%", maxLoanAmount: 7500000, status: "Active" },
      ];
      
      // Filter lenders based on search
      const filteredLenders = React.useMemo(() => {
        return lenders.filter(lender => 
          lender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lender.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lender.type.toLowerCase().includes(searchQuery.toLowerCase())
        );
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
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Lenders</h1>
          </div>
          
          <Card>
            <CardHeader className="flex justify-between">
              <Input
                placeholder="Search lenders..."
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
                aria-label="Lenders table"
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
                  <TableColumn>LENDER ID</TableColumn>
                  <TableColumn>NAME</TableColumn>
                  <TableColumn>TYPE</TableColumn>
                  <TableColumn>INTEREST RATE</TableColumn>
                  <TableColumn>MAX LOAN AMOUNT</TableColumn>
                  <TableColumn>STATUS</TableColumn>
                  <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody emptyContent="No lenders found">
                  {paginatedLenders.map((lender) => (
                    <TableRow key={lender.id}>
                      <TableCell>{lender.id}</TableCell>
                      <TableCell>{lender.name}</TableCell>
                      <TableCell>{lender.type}</TableCell>
                      <TableCell>{lender.interestRate}</TableCell>
                      <TableCell>₹{lender.maxLoanAmount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Chip 
                          color="success" 
                          size="sm" 
                          variant="flat"
                        >
                          {lender.status}
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
                            <DropdownItem as={Link} to={`/partner/lenders/${lender.id}`}>
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

    export default LendersPage;