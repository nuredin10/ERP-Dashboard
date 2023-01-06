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
import { DashboardLayout } from "../../../components/dashboard-layout";

// import ToolBar from "../../components/ToolBar";
import Link from "@mui/material/Link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import WAxios from "../../../components/wareHouseAxios";
import { useSnackbar } from "notistack";
import CButton from "../../../components/Button";

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

  const handleFormChange = (spec_data) => {
    setDate(spec_data);
    console.log(spec_data);
  };

  const onSubmit = (newForm) => {
    const req = {
      ...newForm,
      accs_spec: date,
    };

    console.log(req);
    WAxios.post("/addnewAccessory", req)
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
        <title>New Accessory</title>
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
                    <Typography variant="h6">Add New Accessories</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="accs_name"
                      label="Material Name"
                      type="text"
                      fullWidth
                      {...register("accs_name")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="accs_materialcode"
                      label="Material Code"
                      type="text"
                      fullWidth
                      {...register("accs_materialcode")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="accs_materialunit"
                      label="MOU"
                      type="text"
                      fullWidth
                      {...register("accs_materialunit")}
                    />
                  </Grid>

                  <Grid item sm={6} md={2} lg={3}>
                    <TextField
                      name="new_materialtype"
                      label="Material Specification"
                      placeholder="Material Specification"
                      select
                      defaultValue="Electrical"
                      onChange={(event) => handleFormChange(event.target.value)}
                      fullWidth
                    >
                      <MenuItem value="Electrical">Electrical</MenuItem>
                      <MenuItem value="Mechanical">Mechanical</MenuItem>
                      <MenuItem value="Consumable_goods">Consumable goods</MenuItem>
                    </TextField>
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
