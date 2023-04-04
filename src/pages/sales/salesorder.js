import React, { useState, useEffect } from "react";
import Head from "next/head";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  IconButton,
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
import { DatePicker } from "@mantine/dates";
import { useSnackbar } from "notistack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { useForm } from "react-hook-form";
import Router from "next/router";
import axios from "../../components/productionWxios";
// import axios from "axios";
import RawMaterialNeed from "src/components/product/raw_Needed";
import CustomAlert from "src/components/alert";
import ConfirmDialog from "src/components/confirmDialog ";
import { useRouter } from "next/router";
import CButton from "../../components/Button";
import saxios from "../../components/salesAxios";

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
  const [totalAmount, settotalAmount] = useState(0);
  const [advance, setAdvance] = useState();
  const [remaining, setRemaining] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { register, handleSubmit, reset } = useForm();
  const [payment, setPayment] = useState("");
  const [MethodExe, setMethodExe] = useState("");
  const [datepick, setDatePick] = useState();
  const [orderInfo, setOrderInfo] = useState([]);
  const [regular, setRegular] = useState([]);
  const [selectedRegualr, setSelectedRegular] = useState(0);

  const router = useRouter();
  const { id } = router.query;
  const addFields = () => {
    let newfield = {
      fin_product: "",
      final_color: "",
      final_materialCode: "",
      final_diameter: "",
      final_quant: "",
      final_measureunit: "",
      unit_price: "",
      total_price: "",
    };
    setIsSuccess("info");
    setInputFields([...inputFields, newfield]);
    setIsSuccess("info");
    setAlertMsg("item added");
    enqueueSnackbar("Item Added", { variant: "success" });
  };

  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
    setIsSuccess("info");
    setAlertMsg("item removed");
    enqueueSnackbar("Item Removed", { variant: "warning" });
  };

  const [inputFields, setInputFields] = useState([
    {
      fin_product: "",
      final_color: "",
      final_materialCode: "",
      final_diameter: "",
      final_quant: "",
      final_measureunit: "",
      unit_price: "",
      total_price: "",
    },
  ]);

  const handlePaymentChange = (newValue) => {
    setPayment(newValue.target.value);
  };

  const handleMethodChange = (newValue) => {
    setMethodExe(newValue.target.value);
  };

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    console.log(data[index][event.target.name]);
    setInputFields(data);
  };
  const handleAdvance = (value) => {
    console.log(value.target.value);
    setAdvance(value.target.value);
    setRemaining(parseFloat(totalAmount) - parseFloat(value.target.value));
  };

  const handleFormChangePrice = (index, event) => {
    let data = [...inputFields];
    data[index]["unit_price"] = event.target.value;
    console.log(data[index][event.target.name]);
    var unitPrice = parseFloat(event.target.value) || 0;
    var quantity = parseFloat(data[index]["final_quant"]) || 0;
    data[index]["total_price"] = unitPrice * quantity;
    register.cus_total = data[index]["total_price"];
    var totals = 0.0;
    for (let i = 0; i <= index; i++) {
      totals += parseFloat(data[i]["total_price"]);
    }
    settotalAmount(totals);
    advance == null ? setRemaining(totals) : setRemaining(totals - advance);
    setInputFields(data);
  };

  const handleFormChangeQuantity = (index, event) => {
    let data = [...inputFields];
    data[index]["final_quant"] = event.target.value;
    var unitPrice = parseFloat(data[index]["unit_price"]) || 0;
    var quantity = parseFloat(event.target.value) || 0;

    data[index]["total_price"] = unitPrice * quantity;
    var totals = 0.0;
    for (let i = 0; i <= index; i++) {
      totals += parseFloat(data[i]["total_price"]);
    }
    settotalAmount(totals);
    advance == 0 ? setRemaining(totals) : setRemaining(totals - advance);

    setInputFields(data);
  };

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("/");
  }

  var newForm;
  const newRequest = (data) => {
    const newData = {
      ...data,
      payment,
      sales_date: datepick.toString(),
      cus_total: totalAmount,
      cus_advance: advance,
      Remaining: remaining,
    };
    console.log(newData);
    console.log("payment", inputFields);
    saxios
      .post("/creatBulkSalesOrder", { form: newData, cart: inputFields })
      .then(function (response) {
        console.log(response);
        enqueueSnackbar("Sales Order Created", { variant: "success" });
        saxios
          .post("/sendNotification", {
            To: "Sales",
            message: "New Sales Order Arrived",
          })
          .then((respo) => {
            enqueueSnackbar("Notification Sent", { variant: "success" });
          });
        Router.push("/sales/salesPayment");
      })
      .catch(function (error) {
        enqueueSnackbar("Sales Order Create failed", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <>
      <Head>
        <title>Add Sales Order</title>
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
                  <Grid item xs={12} sm={12}>
                    <DatePicker
                      sx={{ paddingbottom: "1rem" }}
                      required
                      placeholder="Pick date"
                      label="Select Date"
                      withAsterisk
                      value={datepick}
                      onChange={setDatePick}
                    />
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

                  {/* =================product desciption====================  */}
                  <Grid item xs={12} sm={12}>
                    <Typography variant="h5">Add product detail</Typography>
                  </Grid>
                  <Grid item lg={12} sm={12} md={12} sx={{ p: 5, mt: -3 }}>
                    <Grid container spacing={4}>
                      {inputFields.map((input, index) => {
                        return (
                          <Grid
                            container
                            spacing={2}
                            // columns={{xs: 4, md: 3}}
                            sx={{
                              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                              ml: 3,
                              mt: 3,
                              backgroundColor: "white",
                              pb: 2,
                              pr: 4,
                              borderRadius: "10px",
                            }}
                          >
                            <Grid item sm={6} md={2} lg={3}>
                              <TextField
                                required
                                name="fin_product"
                                label="Finished Good"
                                type="text"
                                value={input.fin_product}
                                onChange={(event) => handleFormChange(index, event)}
                                fullWidth
                              />
                            </Grid>
                            <Grid item sm={6} md={2} lg={3}>
                              <TextField
                                fullWidth
                                required
                                name="final_color"
                                label="Product Color"
                                type="text"
                                value={input.final_color}
                                onChange={(event) => handleFormChange(index, event)}
                              />
                            </Grid>
                            <Grid item sm={6} md={2} lg={3}>
                              <TextField
                                fullWidth
                                required
                                name="final_materialCode"
                                label="Materials Code"
                                type="text"
                                value={input.final_materialCode}
                                onChange={(event) => handleFormChange(index, event)}
                              />
                            </Grid>
                            <Grid item sm={6} md={2} lg={3}>
                              <TextField
                                fullWidth
                                required
                                name="final_diameter"
                                label="Material Diameter(OD)"
                                type="text"
                                value={input.final_diameter}
                                onChange={(event) => handleFormChange(index, event)}
                              />
                            </Grid>
                            <Grid item sm={6} md={2} lg={3}>
                              <TextField
                                fullWidth
                                required
                                name="final_quant"
                                label="Quantity"
                                type="text"
                                value={input.final_quant}
                                onChange={(event) => handleFormChangeQuantity(index, event)}
                              />
                            </Grid>
                            <Grid item sm={6} md={2} lg={3}>
                              <TextField
                                fullWidth
                                required
                                name="final_measureunit"
                                label="UOM"
                                type="text"
                                value={input.final_measureunit}
                                onChange={(event) => handleFormChange(index, event)}
                              />
                            </Grid>
                            <Grid item sm={6} md={2} lg={3}>
                              <TextField
                                fullWidth
                                required
                                name="unit_price"
                                label="Unit Price"
                                type="text"
                                value={input.unit_price}
                                onChange={(event) => handleFormChangePrice(index, event)}
                              />
                            </Grid>
                            <Grid item sm={6} md={2} lg={3}>
                              <TextField
                                readOnly
                                fullWidth
                                required
                                name="total_price"
                                label="Total Price"
                                type="text"
                                value={input.total_price}
                                // onChange={(event) => handleFormChange(index, event)}
                              />
                            </Grid>

                            <Grid item xs={1} lg={2} sm={1} md={1} sx={{ mt: "2%", ml: "2%" }}>
                              <IconButton onClick={() => removeFields(index)}>
                                <RemoveIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                        );
                      })}
                      <Grid item lg={12} md={12} sm={12}>
                        <IconButton onClick={addFields} size="large">
                          <AddIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Typography variant="h5">Add Payment Detail</Typography>
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
                      name="bank_name"
                      label="Bank Name"
                      type="text"
                      fullWidth
                      {...register("bank_name")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="account_num"
                      label="Account Number"
                      type="text"
                      fullWidth
                      {...register("account_num")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="cus_total"
                      label="Payment Total"
                      type="text"
                      fullWidth
                      value={totalAmount}
                      // {...register("cus_total")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="cus_advance"
                      label="Advance"
                      type="text"
                      fullWidth
                      value={advance}
                      onChange={handleAdvance}
                      // {...register("cus_advance")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="Remaining"
                      label="Remaining"
                      type="text"
                      fullWidth
                      value={remaining}
                      // {...register("Remaining")}
                    />
                  </Grid>

                  {/* {payment == "Advanced" || payment == "Cash" ? (
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        name="cus_advance"
                        label="Advance"
                        type="text"
                        fullWidth
                        {...register("cus_advance")}
                      />
                    </Grid>
                  ) : null} */}
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
