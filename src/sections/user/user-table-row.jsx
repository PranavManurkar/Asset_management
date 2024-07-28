import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getDatabase, ref, remove } from "firebase/database";
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import BasicEditDialog from 'src/components/button/editButton';

export default function UserTableRow({
  selected,
  id,
  name,
  rate,
  count,
  next_maintainence,
  criticality,
  complaints,
  status,
  handleClick,
}) {
  const [open, setOpen] = useState(null);
  const [edit, setEdit] = useState(false);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleEdit = () => {
    setOpen(null);
    setEdit(true);
  };

  const handleDelete = async (key) => {
    setOpen(null);
    const db = getDatabase();
    try {
      await remove(ref(db, "assets/" + key));
      console.log("Document deleted with key:", key);
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };
  
  return (
    <>
      {edit && <BasicEditDialog ki={id} open={edit} setOpen={setEdit} />}
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{count}</TableCell>

        <TableCell>{next_maintainence}</TableCell>

        <TableCell align="center">{complaints ? 'Yes' : 'No'}</TableCell>
        <TableCell>{rate}</TableCell>
        <TableCell>
          <Label color={(criticality === 'critical' ? 'error' : 'success')}>{criticality}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleEdit}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={() => handleDelete(id)} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  id: PropTypes.any,
  count: PropTypes.any,
  rate: PropTypes.any,
  criticality: PropTypes.any,
  complaints: PropTypes.any,
  handleClick: PropTypes.func,
  name: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
  next_maintainence: PropTypes.any
};
