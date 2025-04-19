import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import Api from 'src/helpers/Api';
import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

import { useRouter, usePathname } from 'src/routes/hooks';
// ----------------------------------------------------------------------

export type UserProps = {
  id: string;
  name: string;
  status: string;
  subscriptionType: string;
  avatarUrl: string;
  subscriptionStatus: boolean;
  entityType: String;
};

type UserTableRowProps = {
  row: UserProps;
  selected: boolean;
  onSelectRow: () => void;
};

export function UserTableRow({ row, selected, onSelectRow }: UserTableRowProps) {

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

  const handleDeleteItem = useCallback(
    (entityType: String, path: string) => {
      console.log(`Deleting ${entityType} with ID: ${path}`);
      handleClosePopover();
      if (entityType === "user") {
        // router.push(`/user/${path}/delete`);
      }
      else if (entityType === "business") {
        // router.push(`/business/${path}/delete`);
      }
      else {
        console.log(`Deleting admin with ID: ${path}`);
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

        <TableCell>{row.subscriptionType}</TableCell>

        {row.entityType === "admin" ? (
          <TableCell>
            {row.subscriptionStatus}
          </TableCell>
        ) : (
          <TableCell align="center">
            {row.subscriptionStatus ? (
              <Iconify width={22} icon="solar:check-circle-bold" sx={{ color: 'success.main' }} />
            ) : (
              '-'
            )}
          </TableCell>
        )}

        <TableCell>
          <Label color={!row.status ? 'error' : 'success'}>{row.status ? "Active" : "Banned"}</Label>
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

          <MenuItem onClick={handleClosePopover} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Deleted
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
