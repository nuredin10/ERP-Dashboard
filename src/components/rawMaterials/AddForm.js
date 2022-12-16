import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  TextField,
  MenuItem,
  Select,
  FormGroup,
  Checkbox,
  Box,
  Button,
  InputLabel,
  ButtonBox,
  Container,
  Typography,
  Grid,
  DatePicker,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import styles from '../styles/Home.module.css';

const AddForm = () => {
  const [status, setStatus] = React.useState("");
  const [date, setDate] = React.useState(null);

  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  const submitHandler = (e) => {
    console.log("submitted");
    e.preventDefault();
  };
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box
          sx={{
            padding: "2%",
            width: "60%",
            height: "85%",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          }}
        >
          <Typography variant="h3">Add Order</Typography>
          <Box sx={{ marginTop: "5%" }}>
            <form onSubmit={submitHandler}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={12}>
                  <Typography variant="h6">Basic info</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField required name="id" label="ID" type="text" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField name="id" label="Invoice" type="text" fullWidth />
                </Grid>
                <Grid item lg={6} sm={12}>
                  <DesktopDatePicker
                    label="Date desktop"
                    inputFormat="MM/dd/yyyy"
                    // value={value}
                    onChange={(newValue) => {
                      setDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </Grid>
                <Grid item lg={6} sm={12}>
                  <TextField name="id" label="Promotion Code" type="text" fullWidth />
                </Grid>
                <Grid item lg={12} sm={12}>
                  <TextField name="id" label="Total Amount" type="text" fullWidth />
                </Grid>
                <Grid item lg={12} sm={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={status}
                      label="Status"
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Completed</MenuItem>
                      <MenuItem value={20}>Canceld</MenuItem>
                      <MenuItem value={30}>Rejected</MenuItem>
                      <MenuItem value={40}>Pending</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <Button type="submit" sx={{ marginRight: "2rem" }} variant="contained">
                    Save
                  </Button>
                  <Button variant="outlined">Cancel</Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </LocalizationProvider>
    </>
  );
};

export default AddForm;
