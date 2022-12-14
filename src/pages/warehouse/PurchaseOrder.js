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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DashboardLayout } from "../../components/dashboard-layout";
import Table from "../../components/Table";
import ToolBar from "../../components/ToolBar";
import Link from "@mui/material/Link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import WAxios from "../../components/wareHouseAxios";
import { useSnackbar } from "notistack";
import CButton from '../../components/Button'

const PurchaseOrder = () => {
  const [status, setStatus] = React.useState("");
  const { register, handleSubmit, reset } = useForm();
  const { enqueueSnackbar } = useSnackbar();

  const [date, setDate] = useState();
  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  try {
    var user = JSON.parse(Cookies.get("user"));
    console.log(user);
  } catch (err) {
    console.log("Error: ", err.message);
  }

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("/");
  }

  const onSubmit = (newForm) => {
    const req = {
      ...newForm,
      material_requesti: user.userName,
      department_requesti: "Ware House",
      date: convert(date),
    };

    console.log(req);
    WAxios.post("/requestPurchase", req)
      .then((res) => {
        console.log(res);
        enqueueSnackbar("Saved Successfully", { variant: "success" });
      })
      .catch((err) => {
        console.log(err);

        enqueueSnackbar("Something went wrong", { variant: "error" });
      });
  };

  return (
    <>
      <Head>
        <title>Purchase Requisition</title>
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
          {/* <Box sx={{ marginLeft: "-60%", marginBottom: "2%" }}>
            <Link
              href="/procurment/supplier"
              color="black"
              underline="none"
              variant="subtitle2"
              sx={{ cursor: "pointer" }}
            >
              <ArrowBackIcon /> purchase request
            </Link>
          </Box> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card sx={{ width: "70%", padding: "2%" }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={12}>
                    <Typography variant="h6">Add Purchase Requisition</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="material_name"
                      label="Material Name"
                      type="text"
                      fullWidth
                      {...register("material_name")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="materialId"
                      label="Form Number"
                      type="text"
                      fullWidth
                      {...register("materialId")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="materialQty"
                      label="Quantity"
                      type="text"
                      fullWidth
                      {...register("materialQty")}
                    />
                  </Grid>
                  <Grid item>
                    <DesktopDatePicker
                      label="Start Date"
                      inputFormat="MM/dd/yyyy"
                      value={date}
                      format="DD-MM-YYYY"
                      onChange={(newValue) => {
                        // console.log(newValue);
                        setDate(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          // name="start_dateTime"
                          // {...register("start_dateTime")}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="reqStatus"
                      label="Status"
                      type="text"
                      fullWidth
                      {...register("reqStatus")}
                    />
                  </Grid>
                  <Grid item>
                    <CButton >
                      Save
                    </CButton>
                  </Grid>
                  <Grid item>

                    <Button variant="outlined">Cancel</Button>
                  </Grid>
                </Grid>
              </LocalizationProvider>
            </Card>
          </form>
        </Box>
      </Box>
    </>
  );
};

PurchaseOrder.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default PurchaseOrder;
