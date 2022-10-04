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
  DatePicker,
} from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import Table from "../../components/Table";
import ToolBar from "../../components/ToolBar";
import Link from "@mui/material/Link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useForm } from "react-hook-form";

const Request = () => {
  const [status, setStatus] = React.useState("");
  const { register, handleSubmit, reset } = useForm();

  const [dateValue, setDateValue] = useState();

  const handleDateChange = (newValue) => {
    setDateValue(newValue);
    
  };

  const newRequest = (user) => {
    const req = {
      ...user,
      mat_requestdate: dateValue
    }
    console.log(req)
    
    // fetch("http://localhost:59000/addFinRequest", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(user),
    // });
    // Router.push("/sales/vender");
  };

  return (
    <>
      <Head>
        <title>Request</title>
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
          <Card sx={{ width: "70%", padding: "2%" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <form onSubmit={handleSubmit(newRequest)}>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={12}>
                    <Typography variant="h6">Request</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="mat_requestname"
                      label="Request Name"
                      type="text"
                      fullWidth
                      {...register("mat_requestname")}
                    />
                  </Grid>
                  <Grid item>
                    <DesktopDatePicker
                      sx={{ maxWidth: 500 }}
                      name="mat_requestdate"
                      label="Date"
                      inputFormat="MM/dd/yyyy"
                      value={dateValue}
                      onChange={handleDateChange}
                      // {...register("mat_requestdate")}
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
                      {...register("mat_requestdept")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="mat_reqpersonid"
                      label="Person ID"
                      type="text"
                      fullWidth
                      {...register("mat_reqpersonid")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="mat_description"
                      label="Describtion"
                      type="text"
                      fullWidth
                      {...register("mat_description")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="mat_quantity"
                      label="Quantity"
                      type="text"
                      fullWidth
                      {...register("mat_quantity")}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="req_materialtype"
                      label="Material type"
                      type="text"
                      fullWidth
                      {...register("req_materialtype")}
                    />
                  </Grid>

                  <Grid item>
                    <Button type="submit" sx={{ marginRight: "2rem" }} variant="contained">
                      Request
                    </Button>
                    <Button variant="outlined">Cancel</Button>
                  </Grid>
                </Grid>
              </form>
            </LocalizationProvider>
          </Card>
        </Box>
      </Box>
    </>
  );
};

Request.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Request;
