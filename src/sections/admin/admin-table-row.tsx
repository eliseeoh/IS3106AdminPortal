import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import Api from 'src/helpers/Api';

import { useRouter, usePathname } from 'src/routes/hooks';
import { AdminProps } from './utils';


type UserTableRowProps = {
    row: AdminProps;
    selected: boolean;
    onSelectRow: () => void;
    setSnackbarMessage: (message: string) => void;
    setSnackbarSeverity: (severity: "success" | "error") => void;
    setOpenSnackbar: (open: boolean) => void;
};

export function UserTableRow({ row, selected, onSelectRow 
    , setSnackbarMessage, setSnackbarSeverity, 
    setOpenSnackbar
}: UserTableRowProps) {

    const router = useRouter();

    const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

    const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setOpenPopover(event.currentTarget);
    }, []);

    const handleClosePopover = useCallback(() => {
        setOpenPopover(null);
    }, []);

    const handleClickItem = useCallback(
        (entityType: String, path: string) => {
            handleClosePopover();
            if (entityType === "user") {
                router.push(`/user/${path}`);
            } else if (entityType === "business") {
                router.push(`/business/${path}`);
            } else {
                router.push(`/admin/${path}`);
            }
        },
        [handleClosePopover, router]
    );

    const handleAccStatus = useCallback(
        (path: string) => {
            console.log(`Changing status of admin with ID: ${path}`);
            handleClosePopover();
            Api.changeAccStatus(path)
                .then((response) => {
                    if (response.ok) {
                        router.refresh();
                        setSnackbarMessage('Admin status updated successfully');
                        setSnackbarSeverity("error");
                        setOpenSnackbar(true);
                    }
                    else if (response.status === 403) {
                        setSnackbarMessage('You do not have permission to update this admin.');
                        setSnackbarSeverity("error");
                        setOpenSnackbar(true);
                    } else {
                        setSnackbarMessage('Failed to update admin status:');
                        setSnackbarSeverity("error");
                        setOpenSnackbar(true);
                    }
                }
                )
                .catch((error) => {
                    console.error('Error updating admin status:', error);
                });
        }, [handleClosePopover, router, setSnackbarMessage, setSnackbarSeverity, setOpenSnackbar]);

    const handleDeleteItem = useCallback(
        (entityType: String, path: string) => {
            handleClosePopover();
            if (entityType === "user") {
                // router.push(`/user/${path}/delete`);
            }
            else if (entityType === "business") {
                // router.push(`/business/${path}/delete`);
            }
            else {
                Api.deleteAdmin(path)
                    .then((response) => {
                        if (response.ok) {
                            router.refresh();
                            console.log('Admin deleted successfully');
                        } else if (response.status === 403) {
                            console.log('You do not have permission to delete this admin.');
                        } else {
                            console.error('Failed to delete admin:', response.statusText);
                        }

                    })
                    .catch((error) => {
                        console.error('Error deleting admin:', error);
                    });
            }
        }
        , [handleClosePopover, router]
    );

    return (
        <>
            <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
                <TableCell padding="checkbox">
                    <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
                </TableCell>

                <TableCell component="th" scope="row">
                    <Box gap={2} display="flex" alignItems="center">
                        <Avatar alt={row.name} src={row.avatarUrl} />
                        {row.name}
                    </Box>
                </TableCell>


                <TableCell>{row.role}</TableCell>
                <TableCell>{row.phoneNumber}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                    <Label color={
                        row.status === 'Created'
                            ? 'warning'
                            : row.status === 'Deactivated'
                                ? 'error'
                                : 'success'
                    }>{row.status}</Label>
                </TableCell>

                <TableCell align="right">
                    <IconButton onClick={handleOpenPopover}>
                        <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                </TableCell>
            </TableRow>

            <Popover
                open={!!openPopover}
                anchorEl={openPopover}
                onClose={handleClosePopover}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuList
                    disablePadding
                    sx={{
                        p: 0.5,
                        gap: 0.5,
                        width: 140,
                        display: 'flex',
                        flexDirection: 'column',
                        [`& .${menuItemClasses.root}`]: {
                            px: 1,
                            gap: 2,
                            borderRadius: 0.75,
                            [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
                        },
                    }}
                >
                    <MenuItem onClick={() => handleClickItem(row.entityType, row.id)}>
                        <Iconify icon="solar:pen-bold" />
                        View
                    </MenuItem>

                    <MenuItem onClick={() => handleDeleteItem(row.entityType, row.id)} sx={{ color: 'error.main' }}>
                        <Iconify icon="solar:trash-bin-trash-bold" />
                        Delete
                    </MenuItem>
                    {row.status !== 'Deactivated' ? (
                        <MenuItem onClick={() => handleAccStatus(row.id)} sx={{ color: 'error.main' }}>
                            <Iconify icon="mdi-light:cancel" />
                            Deactivate
                        </MenuItem>
                    ) : (
                        <MenuItem onClick={() => handleAccStatus(row.id)} sx={{ color: 'success.main' }}>
                            <Iconify icon="mdi-light:check" />
                            Activate
                        </MenuItem>
                    )}
                </MenuList>
            </Popover>
        </>
    );
}
