import { useState, useCallback, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import { Snackbar, Alert } from '@mui/material';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { _admins, _businesses, _users } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import Api, { address } from 'src/helpers/Api';
import { useRouter } from 'src/routes/hooks';

import { TableNoData } from '../../user/table-no-data';
import { UserTableRow } from '../admin-table-row'
import { UserTableHead } from '../../user/user-table-head';
import { TableEmptyRows } from '../../user/table-empty-rows';
import { UserTableToolbar } from '../../user/user-table-toolbar';
import { emptyRows, getComparator } from '../../user/utils';
import { applyFilter, AdminProps } from '../utils';

// ----------------------------------------------------------------------
// @ts-ignore
function renameKeys(input): AdminProps[] {
    // @ts-ignore
    const renamedArr = input.map((item) => {
        const renamed = {
            id: item._id,
            name: item.name,
            appointment: item.appointment,
            role: item.role,
            status: item.status,
            avatarUrl: `${address}${item.profilePicture}`,
            entityType: item.entityType,
            email: item.email,
            phoneNumber: item.phoneNumber,
        };
        return renamed;
    });
    return renamedArr;
}

export function AdminView() {
    const router = useRouter();
    const table = useTable();

    const [filterName, setFilterName] = useState('');
    const [initialData, setInitialData] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

    const [profile, setProfile] = useState<{ role: string } | null>(null);

    const fetchProfileData = () => {
        Api.getProfile()
            .then((res) => {
                if (res.status === 404) {
                    throw new Error("Unauthorized");
                }
                return res.json();
            })
            .then((json) => {
                setProfile(json);
                console.log("Profile data fetched successfully:", json);
            })
            .catch((error) => {
                console.error(error.message);
                alert(error.message); // Optionally show an alert to the user
            });
    };


    // TO-DO: fetch data from API
    const _admin = renameKeys(initialData);

    useEffect(() => {
        fetchAdminsData();
        fetchProfileData();
    }, []);

    async function fetchAdminsData() {
        await Api.getAllAdmins()
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
                return new Error('Failed to fetch admins data');
            }).then((data) => {
                setInitialData(data);
            })
            .catch((error) => {
                console.error('Error fetching admins data:', error);
            });
    }

    const dataFiltered: AdminProps[] = applyFilter({
        inputData: _admin,
        comparator: getComparator(table.order, table.orderBy),
        filterName,
    });

    const notFound = !dataFiltered.length && !!filterName;

    return (
        <DashboardContent>
            <Box display="flex" alignItems="center" mb={5}>
                <Typography variant="h4" flexGrow={1}>
                    Admins
                </Typography>
                {profile && profile.role === "manager" && (<Button
                    variant="contained"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                    onClick={() => {
                        router.push('/admin/create');
                    }
                    }
                >
                    New Admin
                </Button>)}

            </Box>

            <Card>
                <UserTableToolbar
                    numSelected={table.selected.length}
                    filterName={filterName}
                    search="admin"
                    onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setFilterName(event.target.value);
                        table.onResetPage();
                    }}
                />

                <Scrollbar>
                    <TableContainer sx={{ overflow: 'unset' }}>
                        <Table sx={{ minWidth: 800 }}>
                            <UserTableHead
                                order={table.order}
                                orderBy={table.orderBy}
                                rowCount={_admin.length}
                                numSelected={table.selected.length}
                                onSort={table.onSort}
                                onSelectAllRows={(checked) =>
                                    table.onSelectAllRows(
                                        checked,
                                        _users.map((user) => user.id)
                                    )
                                }
                                headLabel={[
                                    { id: 'name', label: 'Name' },
                                    // { id: 'appointment', label: 'Appointment' },
                                    { id: 'role', label: 'Role' },
                                    { id: 'contact', label: 'Phone' },
                                    { id: 'email', label: 'Email' },
                                    { id: 'status', label: 'Status' },
                                    { id: 'action', label: '' },
                                ]}
                            />
                            <TableBody>
                                {dataFiltered
                                    .slice(
                                        table.page * table.rowsPerPage,
                                        table.page * table.rowsPerPage + table.rowsPerPage
                                    )
                                    .map((row, index) => (
                                        <UserTableRow
                                            key={index}
                                            row={row}
                                            selected={table.selected.includes(row.id)}
                                            onSelectRow={() => table.onSelectRow(row.id)}
                                            setSnackbarMessage={setSnackbarMessage}
                                            setSnackbarSeverity={setSnackbarSeverity}
                                            setOpenSnackbar={setOpenSnackbar}
                                        />
                                    ))}

                                <TableEmptyRows
                                    height={68}
                                    emptyRows={emptyRows(table.page, table.rowsPerPage, _users.length)}
                                />

                                {notFound && <TableNoData searchQuery={filterName} />}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <TablePagination
                    component="div"
                    page={table.page}
                    count={_users.length}
                    rowsPerPage={table.rowsPerPage}
                    onPageChange={table.onChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={table.onChangeRowsPerPage}
                />
            </Card>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity={snackbarSeverity} onClose={() => setOpenSnackbar(false)}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </DashboardContent>
    );
}

// ----------------------------------------------------------------------

export function useTable() {
    const [page, setPage] = useState(0);
    const [orderBy, setOrderBy] = useState('name');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selected, setSelected] = useState<string[]>([]);
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');

    const onSort = useCallback(
        (id: string) => {
            const isAsc = orderBy === id && order === 'asc';
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(id);
        },
        [order, orderBy]
    );

    const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
        if (checked) {
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    }, []);

    const onSelectRow = useCallback(
        (inputValue: string) => {
            const newSelected = selected.includes(inputValue)
                ? selected.filter((value) => value !== inputValue)
                : [...selected, inputValue];

            setSelected(newSelected);
        },
        [selected]
    );

    const onResetPage = useCallback(() => {
        setPage(0);
    }, []);

    const onChangePage = useCallback((event: unknown, newPage: number) => {
        setPage(newPage);
    }, []);

    const onChangeRowsPerPage = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            onResetPage();
        },
        [onResetPage]
    );

    return {
        page,
        order,
        onSort,
        orderBy,
        selected,
        rowsPerPage,
        onSelectRow,
        onResetPage,
        onChangePage,
        onSelectAllRows,
        onChangeRowsPerPage,
    };
}
