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
import { DashboardLayout } from "../../../components/dashboard-layout";
import Link from "@mui/material/Link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useForm } from "react-hook-form";
import Router from "next/router";
import axios from "../../../components/productionWxios";
// import axios from "axios";
import RawMaterialNeed from "src/components/product/raw_Needed";
import CustomAlert from "src/components/alert";
import ConfirmDialog from "src/components/confirmDialog ";
import { useRouter } from "next/router";
import CButton from "../../../components/Button";
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

const ProductionOrderGM = () => {
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
  const [payment, setPayment] = useState();
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
    console.log(data);
    axios
      .post("/addproductionGM", data)
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
        <title>Add Employee Fee </title>
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
                    <Typography variant="h5">Add Employee Fee Detail</Typography>
                  </Grid>
                  {/* <Grid item xs={12} sm={6}>
                   

                    <TextField
                      name="Final Product"
                      label="Final Product"
                      select
                      defaultValue="RAW"
                      onChange={(event) => handleFormChange(index, event)}
                      fullWidth
                      {...register("final_product")}
                    >
                      <MenuItem value="PPR PIPE">PPR PIPES</MenuItem>
                      <MenuItem value="UPVC PIPE">UPVC PIPES</MenuItem>
                      <MenuItem value="HDPE PIPE">HDPE PIPES</MenuItem>
                      <MenuItem value="UPVC FITTINGS">UPVC FITTINGS</MenuItem>
                      <MenuItem value="PPR FITTINGS">PPR FITTINGS</MenuItem>
                      <MenuItem value="Conduit">Conduit</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="final_color"
                      label="Product Color"
                      select
                      defaultValue="RAW"
                      onChange={(event) => handleFormChange(index, event)}
                      fullWidth
                      {...register("final_color")}
                    >
                      <MenuItem value="GRAY">GRAY</MenuItem>
                      <MenuItem value="BLACK">BLACK</MenuItem>
                      <MenuItem value="ORANGE">ORANGE</MenuItem>
                      <MenuItem value="White">WHITE</MenuItem>
                      <MenuItem value="Green">GREEN</MenuItem>
                    </TextField>
                  </Grid> */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="Employee Name"
                      label="Employee Name"
                      type="text"
                      fullWidth
                      {...register("finished_diameter")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="Employee Title"
                      label="Employee Title"
                      type="text"
                      fullWidth
                      {...register("finished_materialcode")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="Employee Salary"
                      label="Employee Salary"
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
                  {/* <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="final_measureunit"
                      label="Unit of measurement"
                      type="text"
                      fullWidth
                      {...register("final_measureunit")}
                    />
                  </Grid> */}
                  {/* <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="order_reciver"
                      label="Operator name"
                      type="text"
                      fullWidth
                      {...register("order_reciver")}
                    />
                  </Grid> */}

                  <Grid item>
                    <CButton type="submit" sx={{ marginRight: "2rem" }} variant="contained">
                     Add
                    </CButton>
                  </Grid>
                  <Grid item>
                    <Button className="w-40 " variant="outlined">Cancel</Button>
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

ProductionOrderGM.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ProductionOrderGM;
