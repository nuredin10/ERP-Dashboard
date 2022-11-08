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
  Modal,
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
import Router from "next/router";
import OrderInformation from "src/components/sales/orderInformation";
import saxios from "../../components/salesAxios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "70%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  height: "80%",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

const SalesOrder = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { register, handleSubmit, reset } = useForm();
  const [payment, setPayment] = useState();
  const [orderInfo, setOrderInfo] = useState([]);

  const handlePaymentChange = (newValue) => {
    setPayment(newValue.target.value);
  };

  const newRequest = (data) => {
    const newForm = {
      ...data,
      payment_status: payment,
      order_information: orderInfo,
    };
    console.log(newForm);
    saxios
      .post("/creatSalesOrder", newForm)
      .then(function (response) {
        console.log(response);
        Router.push("/sales/salesorderlist");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <Head>
        <title>SalesOrder</title>
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
            height: "100%",
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
                    <Typography variant="h5">Sales Order</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="company_name"
                      label="Company Name"
                      type="text"
                      fullWidth
                      {...register("company_name")}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <Typography variant="h7">Customer Information/Account Information</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="customer_name"
                      label="Contact Name"
                      type="text"
                      fullWidth
                      {...register("customer_name")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="cus_bussinessName"
                      label="Business Name"
                      type="text"
                      fullWidth
                      {...register("cus_bussinessName")}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="cus_phoneNum"
                      label="Phone Number"
                      type="text"
                      fullWidth
                      {...register("cus_phoneNum")}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="cus_email"
                      label="Email Address"
                      type="text"
                      fullWidth
                      {...register("cus_email")}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <Typography variant="h7">Shipping Address</Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="ship_contactName"
                      label="Contact Name"
                      type="text"
                      fullWidth
                      {...register("ship_contactName")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="ship_address1"
                      label="Address 1"
                      type="text"
                      fullWidth
                      {...register("ship_address1")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="ship_address2"
                      label="Address 2"
                      type="text"
                      fullWidth
                      {...register("ship_address2")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="ship_city"
                      label="City/State"
                      type="text"
                      fullWidth
                      {...register("ship_city")}
                    />
                  </Grid>

                  <Grid item xs={6} sm={6} lg={6}>
                    <Typography variant="h7">Order Information</Typography>
                  </Grid>
                  <Grid item xs={6} sm={6} lg={6}>
                    <Button onClick={handleOpen} variant="contained">
                      Add
                    </Button>
                  </Grid>

                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <OrderInformation setOrderInfo={setOrderInfo} handleClose={handleClose} />
                    </Box>
                  </Modal>

                  <Grid item xs={12} sm={12}>
                    <Typography variant="h7">Payment information</Typography>
                  </Grid>

                  <Grid item lg={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Payment Method</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={payment}
                        label="Payment method"
                        onChange={handlePaymentChange}
                      >
                        <MenuItem value={"Pending"}>Pending</MenuItem>
                        <MenuItem value={"Half_Paied"}>Half Paied</MenuItem>
                        <MenuItem value={"Paied"}>Paied</MenuItem>
                        <MenuItem value={"Pending"}>Pending</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="Business_Name"
                      label="Business Name"
                      type="text"
                      fullWidth
                      {...register("Business_Name")}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="Business_Tin"
                      label="Tin Number"
                      type="number"
                      fullWidth
                      {...register("Business_Tin")}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="total"
                      label="Total Amount"
                      type="number"
                      fullWidth
                      {...register("total")}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="leftPayable"
                      label="Left to Pay"
                      type="number"
                      fullWidth
                      {...register("leftPayable")}
                    />
                  </Grid>

                  <Grid item>
                    <Button type="submit" sx={{ marginRight: "2rem" }} variant="contained">
                      Save
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

SalesOrder.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default SalesOrder;
