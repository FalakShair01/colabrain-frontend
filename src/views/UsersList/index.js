import React, { useState } from 'react';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    Avatar,
    Typography
} from '@mui/material';
import { FilterList, Search } from '@mui/icons-material';

import usersData from './usersData'; // Sample user data

const UsersList = () => {
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleViewDetails = (user) => {
        setSelectedUser(user);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            {/* Table */}
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Avatar</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {usersData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <Avatar alt={user.name} src={user.avatar} />
                            </TableCell>
                            <TableCell>
                                <IconButton onClick={() => handleViewDetails(user)}>
                                    <Search />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Pagination */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={usersData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            {/* User Details Dialog */}
            <Dialog open={open} onClose={handleClose}>
                {selectedUser && (
                    <>
                        <DialogTitle>User Details</DialogTitle>
                        <DialogContent>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                                <Avatar alt={selectedUser.name} src={selectedUser.avatar} sx={{ width: 80, height: 80, marginRight: 16 }} />
                                <div>
                                    <Typography variant="h6">{selectedUser.name}</Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        {selectedUser.email}
                                    </Typography>
                                </div>
                            </div>
                            {/* Add more user details here */}
                            {/* For example: <Typography variant="body1">Age: {selectedUser.age}</Typography> */}
                        </DialogContent>
                    </>
                )}
            </Dialog>
        </div>
    );
};

export default UsersList;
