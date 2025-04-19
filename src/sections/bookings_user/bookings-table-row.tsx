import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { address } from 'src/helpers/Api';

// ----------------------------------------------------------------------

export type BookingProp = {
  _id: string;
  customerName: string;
  activityName: string;
  contact: string;
  status: string;
  creditSpent: Number;
  bookingDate: string;
  userId: string;
  businessId: string;
  activityId: string;
  businessName: string;
  businessProfileImage: string;
};

type UserTableRowProps = {
  row: BookingProp;
  selected: boolean;
  onSelectRow: () => void;
};

export function UserTableRow({ row, selected, onSelectRow }: UserTableRowProps) {
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          {/* <Checkbox disableRipple checked={selected} onChange={onSelectRow} /> */}
        </TableCell>

        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            {/* Get customer avatar from db */}
            <Avatar alt={row.businessName} src={`${address}${row.businessProfileImage}`} />
            {row.businessName}
          </Box>
        </TableCell>

        <TableCell>{row.activityName}</TableCell>

        <TableCell>{row.creditSpent.valueOf()}</TableCell>

        <TableCell>
          {row.bookingDate}
        </TableCell>

        <TableCell>
          <Label color={(row.status === 'Cancelled' && 'error') || 'success'}>{row.status}</Label>
        </TableCell>
      </TableRow>
    </>
  );
}
