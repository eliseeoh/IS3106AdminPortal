import { useState, useCallback } from 'react';
import { DashboardContent } from 'src/layouts/dashboard';
import { Button, Card, Table, TableBody, TableContainer, TablePagination, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Scrollbar } from 'src/components/scrollbar';
import { UserTableHead } from './user-table-head';
import { UserTableRow } from './user-table-row';
import { TableEmptyRows } from './table-empty-rows';
import { TableNoData } from './table-no-data';
import { emptyRows, applyFilter, getComparator } from './utils';
import type { UserProps } from './user-table-row';

// ----------------------------------------------------------------------

export function UserHistoryView() {
    const { userId } = useParams();

    const data = {
        name: "Namies",
        history: [
            {
                id: '1',
                name: "Tufting",
                businessPic: "/assets/images/avatar/avatar-1.webp",
                date: "01/01/2022",
                session: "4pm - 6pm",
            },
            {
                id: '2',
                name: "Haxing",
                businessPic: "/assets/images/avatar/avatar-3.webp",
                date: "01/01/2022",
                session: "4pm - 6pm",
            },
            {
                id: '3',
                name: "MiniGolf",
                businessPic: "/assets/images/avatar/avatar-5.webp",
                date: "01/01/2022",
                session: "4pm - 6pm",
            },
            {
                id: '4',
                name: "Tufting",
                businessPic: "/assets/images/avatar/avatar-1.webp",
                date: "01/01/2022",
                session: "4pm - 6pm",
            },
            {
                id: '5',
                name: "Haxing",
                businessPic: "/assets/images/avatar/avatar-3.webp",
                date: "01/01/2022",
                session: "4pm - 6pm",
            },
            {
                id: '6',
                name: "MiniGolf",
                businessPic: "/assets/images/avatar/avatar-5.webp",
                date: "01/01/2022",
                session: "4pm - 6pm",
            },
        ],
    }

    const table = useTable();

    const [filterName, setFilterName] = useState('');

    // TO-DO: fetch data from API
    const dataFiltered: UserProps[] = applyFilter({
        inputData: data.history,
        comparator: getComparator(table.order, table.orderBy),
        filterName,
    });

    const notFound = !dataFiltered.length && !!filterName;

    return (
        <DashboardContent>
            <Card>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <div style={{ width: '100%', padding: 16, display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ width: 288, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ color: '#121417', fontSize: 32, fontWeight: '700', lineHeight: '40px' }}>User Profile</div>
                        </div>
                    </div>
                    <div style={{ width: '100%', padding: 16, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ color: '#121417', fontSize: 18, fontWeight: '700' }}>{data.name}&apos;s Profile</div>
                    </div>

                    <div style={{ width: '100%', padding: 16, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ color: '#121417', fontSize: 18, fontWeight: '700' }}>History</div>
                    </div>
                    <Scrollbar>
                        <TableContainer sx={{ overflow: 'unset' }}>
                            <Table sx={{ minWidth: 800 }}>
                                <UserTableHead
                                    order={table.order}
                                    orderBy={table.orderBy}
                                    rowCount={data.history.length}
                                    numSelected={table.selected.length}
                                    onSort={table.onSort}
                                    onSelectAllRows={(checked) =>
                                        table.onSelectAllRows(
                                            checked,
                                            data.history.map((history) => history.id)
                                        )
                                    }
                                    headLabel={[
                                        { id: 'empty', label: '' },
                                        { id: 'business', label: 'Business' },
                                        { id: 'date', label: 'Date' },
                                        { id: 'session', label: 'Session' },
                                    ]}
                                />
                                <TableBody>
                                    {dataFiltered
                                        .slice(
                                            table.page * table.rowsPerPage,
                                            table.page * table.rowsPerPage + table.rowsPerPage
                                        )
                                        .map((row) => (
                                            <UserTableRow
                                                key={row.id}
                                                row={row}
                                                selected={table.selected.includes(row.id)}
                                                onSelectRow={() => table.onSelectRow(row.id)}
                                            />
                                        ))}

                                    <TableEmptyRows
                                        height={68}
                                        emptyRows={emptyRows(table.page, table.rowsPerPage, data.history.length)}
                                    />

                                    {notFound && <TableNoData searchQuery={filterName} />}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Scrollbar>
                    <TablePagination
                        component="div"
                        page={table.page}
                        count={data.history.length}
                        rowsPerPage={table.rowsPerPage}
                        onPageChange={table.onChangePage}
                        rowsPerPageOptions={[5, 10, 25]}
                        onRowsPerPageChange={table.onChangeRowsPerPage}
                        style={{ alignSelf: 'flex-end' }}
                    />
                </div>
            </Card>
        </DashboardContent >
    );
}

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