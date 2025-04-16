import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Api from 'src/helpers/Api';
import { Profile } from 'src/sections/businessDetail/view';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

// fetch from db
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { TableNoData } from '../table-no-data';
import { BookingsHeader } from '../bookings-header';
import { UserTableHead } from '../user-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { UserTableToolbar } from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { BookingProp, UserTableRow } from '../bookings-table-row';

// ----------------------------------------------------------------------

export function BookingsView() {
  const table = useTable();

  const { userId } = useParams();

  const [filterName, setFilterName] = useState('');
  const [status, filterStatus] = useState('all');
  const [bookings, setBookings] = useState<BookingProp[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);

  const handleFetchAllBookings = useCallback(() => {
    Api.getBookingsFromUser(userId)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(`Error fetching: ${response}`);
      })
      .then((data) => {
        setBookings(data.bookings);
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error);
      });
  }, [userId]);

  const handleFetchProfile = useCallback(() => {
    Api.getUserById(userId)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`Error fetching Business By Id: ${res}`);
      })
      .then(data => {
        setProfile(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [userId]);

  useEffect(() => {
    handleFetchAllBookings();
    handleFetchProfile();
  }, [handleFetchAllBookings, handleFetchProfile]);

  const dataFiltered: BookingProp[] = applyFilter({
    inputData: bookings,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
    status
  });

  const notFound = !dataFiltered.length && !!filterName;

  if (!bookings || !profile) { return null; }

  return (
    <DashboardContent>

      <BookingsHeader businessName={profile.name} />

      <Card>
        <UserTableToolbar
          selected={table.selected}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
          onFilterStatus={(value) => {
            filterStatus(value);
            table.onResetPage();
          }}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={bookings.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    bookings.map((user) => user._id)
                  )
                }
                headLabel={[
                  { id: 'Business Name', label: 'Business Name' },
                  { id: 'activityName', label: 'Activity Name' },
                  { id: 'creditSpent', label: 'Credit Spent' },
                  { id: 'date', label: 'Date Booked' },
                  { id: 'status', label: 'Status' }
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
                      key={row._id}
                      row={row}
                      selected={table.selected.includes(row._id)}
                      onSelectRow={() => table.onSelectRow(row._id)}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, bookings.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={dataFiltered.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
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
