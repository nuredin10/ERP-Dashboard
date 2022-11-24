import React, { useState, useEffect } from "react";
import Head from "next/head";
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
} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DashboardLayout } from "../../components/dashboard-layout";
import Table from "../../components/Table";
import ToolBar from "../../components/ToolBar";
import Link from "@mui/material/Link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const PurchaseOrder = () => {
  const [status, setStatus] = React.useState("");
  const [date, setDate] = useState();
  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <>
      <Head>
        <title>Purchase Order</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
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
          <Box sx={{ marginLeft: "-60%", marginBottom: "2%" }}>
            <Link
              href="/procurment/supplier"
              color="black"
              underline="none"
              variant="subtitle2"
              sx={{ cursor: "pointer" }}
            >
              <ArrowBackIcon /> purchase request
            </Link>
          </Box>
          <Card sx={{ width: "70%", padding: "2%" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={12}>
                  <Typography variant="h6">Add Purchase Request</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    name="mat_requestname"
                    label="Request Name"
                    type="text"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  {/* <DatePicker
                    sx={{ maxWidth: 500 }}
                    name="accs_date"
                    label="Date"
                    value={date}
                    onChange={(e) => setStatus(e.target.value)}
                  /> */}
                  <DatePicker
                    fullWidth
                    label="Basic example"
                    value={date}
                    onChange={(newValue) => {
                      setDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />

                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    name="mat_requestdept"
                    label="Department"
                    type="text"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    name="mat_reqpersonid"
                    label="Person ID"
                    type="text"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <Button type="submit" sx={{ marginRight: "2rem" }} variant="contained">
                    Save
                  </Button>
                  <Button variant="outlined">Cancel</Button>
                </Grid>
              </Grid>
            </LocalizationProvider>
          </Card>
        </Box>
      </Box>
    </>
  );
};

PurchaseOrder.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default PurchaseOrder;
