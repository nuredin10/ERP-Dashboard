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
      finished_name: date,
    };

    console.log(req);
    WAxios.post("/addnewFinMaterials", req)
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
        <title>New Finished Good</title>
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
                      name="finished_name"
                      label="Material Name"
                      placeholder="Material Name"
                      select
                      defaultValue="UPVC PIPE"
                      onChange={(event) => handleFormChange(event.target.value)}
                      fullWidth
                    >
                      <MenuItem value="UPVC PIPE">UPVC PIPE</MenuItem>
                      <MenuItem value="UPVC FITTINGS">UPVC FITTINGS</MenuItem>
                      <MenuItem value="Conduit">Conduit</MenuItem>
                      <MenuItem value="PPR PIPE">PPR PIPE</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <TextField
                      required
                      name="finished_diameter"
                      label="Material Diameter"
                      type="text"
                      fullWidth
                      {...register("finished_diameter")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="finished_materialcode"
                      label="Material Code"
                      type="text"
                      fullWidth
                      {...register("finished_materialcode")}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="finished_mass"
                      label="kilograms of a single material"
                      type="text"
                      fullWidth
                      {...register("finished_mass")}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="Material_Color"
                      label="Material Color"
                      type="text"
                      fullWidth
                      {...register("color")}
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
