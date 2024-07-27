import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Iconify from 'src/components/iconify';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import insertData from 'src/sections/user/asset-data.mjs';

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

export default function BasicMenu() {
  const [value, setValue] = useState(dayjs('17-04-2022', 'DD-MM-YYYY'));
  const [anchorEl, setAnchorEl] = useState(null);

  const [asset, setAsset] = useState({
    name: "",
    count: 0,
    cost: 0,
    maintainence_period: "",
    warranty: 0,
    last_maintainence: "",
    maintenance_cost: 0,
    next_maintainence: null,
    remaining_warranty: 0,
    criticality: "critical",
  });

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNewAsset = () => {
    insertData(asset);
    setAnchorEl(null);
  };

  const handleChange = (e) => {
    setAsset((prevAsset) => ({
      ...prevAsset,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDateChange = (newValue) => {
    setValue(newValue);
    setAsset((prevAsset) => ({
      ...prevAsset,
      next_maintainence: newValue ? newValue.format('DD-MM-YYYY') : null,
    }));
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
        Add asset
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
        <MenuItem>
          <TextField
            id="outlined-basic"
            name="name"
            label="Name"
            variant="outlined"
            onChange={handleChange}
          />
        </MenuItem>
        <MenuItem>
          <TextField
            id="filled-basic"
            name="count"
            label="Quantity"
            variant="outlined"
            type="number"
            onChange={handleChange}
          />
        </MenuItem>
        <MenuItem>
          <TextField
            id="standard-basic"
            name="warranty"
            label="Warranty in years"
            variant="outlined"
            type="number"
            onChange={handleChange}
          />
        </MenuItem>
        <MenuItem>
          <TextField
            id="standard-basic"
            name="cost"
            label="Cost"
            variant="outlined"
            type="number"
            onChange={handleChange}
          />
        </MenuItem>
        <MenuItem>
          <TextField
            id="standard-basic"
            name="maintainence_cost"
            label="Maintenance Cost"
            variant="outlined"
            onChange={handleChange}
          />
        </MenuItem>
        <MenuItem>
          <TextField
            id="standard-basic"
            name="maintainence_period"
            label="Maintenance period"
            variant="outlined"
            onChange={handleChange}
          />
        </MenuItem>
        <MenuItem>
          <TextField
            id="outlined-select-currency"
            name="criticality"
            onChange={handleChange}
            select
            label="Select"
            defaultValue="critical"
            helperText="Please select criticality"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </MenuItem>
        <MenuItem>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              name="next_maintainence"
              onChange={handleDateChange}
              label="Next Maintenance"
              value={value}
              renderInput={(params) => <TextField {...params} />}
              inputFormat="DD-MM-YYYY"
            />
          </LocalizationProvider>
        </MenuItem>
        <MenuItem>
          <Button variant="contained" color="inherit" onClick={handleNewAsset}>Add</Button>
        </MenuItem>
      </Menu>
    </div>
  );
}
