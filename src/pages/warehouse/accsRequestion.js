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
import CButton from "../../components/Button";
import { DatePicker } from "@mantine/dates";
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
    };

    console.log(req);
    WAxios.post("/accsRequestion", req)
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card sx={{ width: "70%", padding: "2%" }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={12}>
                    <Typography variant="h6">Add Accessories Requisition</Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      sx={{ paddingbottom: "1rem" }}
                      required
                      placeholder="Pick date"
                      label="Select Date"
                      withAsterisk
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
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
                      label="Fs Number"
                      type="text"
                      fullWidth
                      {...register("Fs_Number")}
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

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="Material_Code"
                      label="Material Code"
                      type="text"
                      fullWidth
                      {...register("material_code")}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="Request_Person"
                      label="Request Person"
                      type="text"
                      fullWidth
                      {...register("request_person")}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="measuring_unit"
                      label="MOU"
                      type="text"
                      fullWidth
                      {...register("measuring_unit")}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="FS_number"
                      label="MOU"
                      type="text"
                      fullWidth
                      {...register("FS_number")}
                    />
                  </Grid>
                  <Grid item>
                    <CButton>Save</CButton>
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
