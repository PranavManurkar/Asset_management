import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Iconify from 'src/components/iconify';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const currencies = [
    {
      value: 'critical',
      label: 'Critical',
    },
    {
      value: 'normal',
      label: 'Normal',
    }
];

export default function BasicMenu({ title, option1, option2, option3 }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        variant="contained" 
        color="inherit" 
        startIcon={<Iconify icon="eva:plus-fill" />}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {title}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {/* <MenuItem onClick={handleClose}>{option1}</MenuItem>
        <MenuItem onClick={handleClose}>{option2}</MenuItem>
        <MenuItem onClick={handleClose}>{option3}</MenuItem> */}
        <MenuItem><TextField id="outlined-basic" label="Name" variant="outlined" /></MenuItem>
        <MenuItem><TextField id="filled-basic" label="Quantity" variant="outlined" /></MenuItem>
        <MenuItem><TextField id="standard-basic" label="Warranty in years" variant="outlined" /></MenuItem>
        <MenuItem><TextField
          id="outlined-select-currency"
          select
          label="Select"
          defaultValue="EUR"
          helperText="Please select criticality"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField></MenuItem>
        <MenuItem>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
            <DatePicker label="Basic date picker" />
            </DemoContainer>
            </LocalizationProvider>
        </MenuItem>
      </Menu>
    </div>
  );
}