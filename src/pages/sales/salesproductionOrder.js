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
import axios from "../../components/productionWxios";
// import axios from "axios";
import RawMaterialNeed from "src/components/product/raw_Needed";
import CustomAlert from "src/components/alert";
import ConfirmDialog from "src/components/confirmDialog ";
import { useRouter } from "next/router";
import CButton from "../../components/Button";
// import paxios from '../../'
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
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const salesProductionOrder = () => {
  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();
  const [customOrRegular, setCustomOrRegular] = React.useState("regular");
  const [indata, setIndata] = React.useState();
  const [isSuccess, setIsSuccess] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { register, handleSubmit, reset } = useForm();
  const [payment, setPayment] = useState("");
  const [orderInfo, setOrderInfo] = useState([]);
  const [regular, setRegular] = useState([]);
  const [selectedRegualr, setSelectedRegular] = useState(0);

  const router = useRouter();
  const { id } = router.query;

  const handlePaymentChange = (newValue) => {
    setPayment(newValue.target.value);
  };

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("/");
  }

  var newForm;
  const newRequest = (data) => {
    const newData = { ...data, payment };
    console.log(data);
    console.log("payment", newData);
    axios
      .post("/makesalesProductionOrder", newData)
      .then((res) => {
        console.log(res);
        setIsSuccess("success");
        setAlertMsg("Production Order Added Successfully");
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess("error");
        setAlertMsg("Error Occured");
      });
  };

  return (
    <>
      <Head>
        <title>Add Production Order</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Box sx={{ position: "absolute", width: "100%", top: "7%", right: "1%" }}>
          {isSuccess != "" ? (
            <CustomAlert setIsSuccess={setIsSuccess} type={isSuccess} message={alertMsg} />
          ) : null}
        </Box>
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
                    <Typography variant="h5">Add customer detail</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="salesID"
                      label="Sales ID"
                      type="text"
                      fullWidth
                      {...register("salesID")}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="customer_name"
                      label="Customer Name"
                      type="text"
                      fullWidth
                      {...register("customer_name")}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="customer_address"
                      label="Customer Address"
                      type="text"
                      fullWidth
                      {...register("customer_address")}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="Tin_number"
                      label="Tin number"
                      type="text"
                      fullWidth
                      {...register("Tin_number")}
                    />
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
                        <MenuItem value={"Advanced"}>Advanced</MenuItem>
                        <MenuItem value={"Credit"}>Credit</MenuItem>
                        <MenuItem value={"Cash"}>Cash payed</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="cus_total"
                      label="Payment Total"
                      type="text"
                      fullWidth
                      {...register("cus_total")}
                    />
                  </Grid>

                  {payment == "Advanced"?  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="cus_advance"
                      label="Advance"
                      type="text"
                      fullWidth
                      {...register("cus_advance")}
                    />
                  </Grid>: null}

                  {/* =================product desciption====================  */}
                  <Grid item xs={12} sm={12}>
                    <Typography variant="h5">Add product detail</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="fin_product"
                      label="Final Product"
                      type="text"
                      fullWidth
                      {...register("final_product")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="final_color"
                      label="Product Color"
                      type="text"
                      fullWidth
                      {...register("final_color")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="fin_spec"
                      label="Specification"
                      type="text"
                      fullWidth
                      {...register("final_spec")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="final_desc"
                      label="Description"
                      type="text"
                      fullWidth
                      {...register("final_desc")}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="final_quant"
                      label="Quantity"
                      type="text"
                      fullWidth
                      {...register("final_quant")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="final_measureunit"
                      label="Unit of measurement"
                      type="text"
                      fullWidth
                      {...register("final_measureunit")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="order_reciver"
                      label="Order Reciver"
                      type="text"
                      fullWidth
                      {...register("order_reciver")}
                    />
                  </Grid>

                  <Grid item>
                    <CButton type="submit" sx={{ marginRight: "2rem" }} variant="contained">
                      Make Order
                    </CButton>
                  </Grid>
                  <Grid item>
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

salesProductionOrder.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default salesProductionOrder;
