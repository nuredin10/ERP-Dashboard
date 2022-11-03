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
// import axios from "../../components/axios";
import axios from "axios";
import RawMaterialNeed from "src/components/product/raw_Needed";
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

const ProductionOrder = () => {
  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState(new Date());
  const [customOrRegular, setCustomOrRegular] = React.useState("regular");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { register, handleSubmit, reset } = useForm();
  const [payment, setPayment] = useState();
  const [orderInfo, setOrderInfo] = useState([]);
  const [regular, setRegular] = useState([]);
  const [selectedRegualr, setSelectedRegular] = useState(0);

  const handlePaymentChange = (newValue) => {
    setPayment(newValue.target.value);
  };

  useEffect(() => {
    axios
      .get("/productionModule/showbatchformula")
      .then((res) => {
        setRegular(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(selectedRegualr, "yooooooooo");

  var newForm;
  const newRequest = (data) => {
    if (customOrRegular === "regular") {
      newForm = {
        ...data,
        batch_id: selectedRegualr,
        custom_regular: customOrRegular,
        status: "New"
      };
    } else {
      newForm = {
        ...data,
        raw_needed: JSON.stringify(orderInfo),
        custom_regular: customOrRegular,
        start_dateTime : "09/12/2021",
        status: "New",
      };
    }

    axios
      .post("http://localhost:42000/addProductionOrder", newForm)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    console.log(newForm);
    // console.log(startDate)
    // newForm = {
    //   ...data,
    //   rawmat_list: orderInfo,
    // };
    // console.log(newForm);
    // console.log(newForm);
    // axios
    //   .post("http://localhost:42000/addbatchformula", newForm)
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
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
                    <Typography variant="h5">Add New Production Order</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="fin_product"
                      label="Final Product"
                      type="text"
                      fullWidth
                      {...register("fin_product")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="fin_spec"
                      label="Specification"
                      type="text"
                      fullWidth
                      {...register("fin_spec")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="fin_quan"
                      label="Quantity"
                      type="text"
                      fullWidth
                      {...register("fin_quan")}
                    />
                  </Grid>
                  <Grid item lg={6} sm={12}>
                    <DesktopDatePicker
                      label="Start Date"
                      inputFormat="MM/dd/yyyy"
                      value={startDate}
                      format="DD-MM-YYYY"
                      onChange={(newValue) => {
                        // console.log(newValue);
                        setStartDate(newValue);
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
                  <Grid item lg={6} sm={12}>
                    <DesktopDatePicker
                      label="End Date"
                      inputFormat="MM/dd/yyyy"
                      value={endDate}
                      onChange={(newValue) => {
                        setEndDate(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          name="end_dateTime"
                          {...register("end_dateTime")}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="batch_mult"
                      label="Factor"
                      type="text"
                      fullWidth
                      {...register("batch_mult")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="production_line"
                      label="Production Line"
                      type="text"
                      fullWidth
                      {...register("production_line")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="shift"
                      label="Shift"
                      type="text"
                      fullWidth
                      {...register("shift")}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="h7">Custom or Regular</Typography>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    {/* <InputLabel id="demo-simple-select-label">Custom or Regular</InputLabel> */}
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={customOrRegular}
                      label="Custom or Regular"
                      onChange={(event) => setCustomOrRegular(event.target.value)}
                    >
                      <MenuItem value={"custom"}>Custom</MenuItem>
                      <MenuItem value={"regular"}>Regular</MenuItem>
                    </Select>
                  </Grid>
                  {customOrRegular === "custom" ? (
                    <>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          name="expected_fin_qty"
                          label="Expected Final Quantity"
                          type="text"
                          fullWidth
                          {...register("expected_fin_qty")}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          name="expected_waste_quan"
                          label="Expected Waste Quantity"
                          type="text"
                          fullWidth
                          {...register("expected_waste_quan")}
                        />
                      </Grid>
                      <Grid item xs={6} sm={6} lg={6}>
                        <Button onClick={handleOpen} variant="outlined">
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
                          <RawMaterialNeed setOrderInfo={setOrderInfo} handleClose={handleClose} />
                        </Box>
                      </Modal>
                    </>
                  ) : (
                    <Grid item xs={12} sm={12}>
                      <InputLabel id="demo-simple-select-label" sx={{ mb: 3 }}>
                        Select Batch File
                      </InputLabel>
                      <Select
                        id="demo-simple-select"
                        value={selectedRegualr}
                        label="Custom or Regular"
                        onChange={(event) => setSelectedRegular(event.target.value)}
                      >
                        {regular.map((item) => {
                          return (
                            <MenuItem value={item.id}>
                              {item.finmat_prod + " | " + item.prod_quan + " | " + item.finmat_spec}
                            </MenuItem>
                          );
                        })}
                        {/* <MenuItem value={"custom"}></MenuItem> */}
                        {/* <MenuItem value={"regular"}>Regular</MenuItem> */}
                      </Select>
                    </Grid>
                  )}

                  <Grid item xs={12} sm={12}>
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

ProductionOrder.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ProductionOrder;
