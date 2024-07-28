import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import insertData from 'src/sections/user/asset-data.mjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const currencies = [
  { value: 'critical', label: 'Critical' },
  { value: 'normal', label: 'Normal' }
];

export default function BasicDialog() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(dayjs('17-04-2022', 'DD-MM-YYYY'));
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

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNewAsset = () => {
    insertData(asset);
    handleClose();
  };

  const handleChange = (e) => {
    setAsset(prevAsset => ({
      ...prevAsset,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDateChange = (newValue) => {
    setValue(newValue);
    setAsset(prevAsset => ({
      ...prevAsset,
      next_maintainence: newValue ? newValue.format('DD-MM-YYYY') : null,
    }));
  };

  return (
    <div>
      <Button variant="contained" color="inherit" onClick={handleClickOpen}>
        Add asset
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Asset</DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            name="count"
            label="Quantity"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            name="warranty"
            label="Warranty in years"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            name="cost"
            label="Cost"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            name="maintainence_cost"
            label="Maintenance Cost"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            name="maintainence_period"
            label="Maintenance period"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            name="criticality"
            label="Criticality"
            select
            fullWidth
            margin="normal"
            onChange={handleChange}
            SelectProps={{
              native: true,
            }}
          >
            {currencies.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              onChange={handleDateChange}
              label="Next Maintenance"
              value={value}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
              inputFormat="DD-MM-YYYY"
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleNewAsset} variant="contained" color="inherit">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
