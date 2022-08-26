import React, { useState, useEffect } from 'react'
import Head from 'next/head';
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
  Card,
  InputLabel,
  ButtonBox,
  Container,
  Typography,
  Grid,
  DatePicker,
} from "@mui/material";
import { DashboardLayout } from '../../components/dashboard-layout';
import Table from '../../components/Table'
import ToolBar from '../../components/ToolBar'
import Link from "@mui/material/Link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const IssueMaterial = () => (
  <>
    <Head>
      <title>
        IssueMaterial
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* <Box sx={{ marginLeft: "-60%", marginBottom: "2%" }}>
          <Link
            href="/procurment/supplier"
            color="black"
            underline="none"
            variant="subtitle2"
            sx={{ cursor: "pointer" }}
          >
            <ArrowBackIcon /> payment request
          </Link>
        </Box> */}
        <Card sx={{ width: "70%", padding: "2%" }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>

            <Grid container spacing={4}>
              <Grid item xs={12} sm={12}>
                <Typography variant="h6">Issue Material</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField required name="mat_requestname" label="Request Name" type="text" fullWidth />
              </Grid>
              <Grid item >
                <DesktopDatePicker
                  sx={{ maxWidth: 500 }}
                  name="accs_date"
                  label="Date"
                  inputFormat="MM/dd/yyyy"
                  value={"2014-08-18T21:11:54"}
                  // onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
                {/* <TextField required name="accs_date" label="Date" type="text" fullWidth /> */}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField required name="mat_requestdept" label="Department" type="text" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField required name="mat_reqpersonid" label="Person ID" type="text" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField required name="mat_requestdept" label="Department" type="text" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField required name="mat_reqpersonid" label="Person ID" type="text" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField required name="mat_requestdept" label="Department" type="text" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField required name="mat_reqpersonid" label="Person ID" type="text" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField required name="mat_requestdept" label="Department" type="text" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField required name="mat_reqpersonid" label="Person ID" type="text" fullWidth />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <TextField required name="Country" label="Country" type="text" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField required name="Nationality" label="Nationality" type="text" fullWidth />
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
                </Grid> */}
              <Grid item>
                <Button type="submit" sx={{ marginRight: "2rem" }} variant='contained'>Save</Button>
                <Button variant='outlined'>Cancel</Button>
              </Grid>
            </Grid>
          </LocalizationProvider>

        </Card>
      </Box>
    </Box>
  </>
);

IssueMaterial.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default IssueMaterial;
