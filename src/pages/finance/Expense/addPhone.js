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
import { DatePicker } from "@mantine/dates";
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
  const [datepick, setDatePick] = useState();
  const [value, onChange] = useState(new Date());

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
    const dataAll = {
      date_expense: datepick,
      Item_description: data.Description,
      uom: "",
      unit_price: "",
      total_price: data.total_price,
      fs_number: data.Fs_number,
      purchase_department: "Finance",
      remark: data.Remark,
      catagory: "PHONE",
      addtional_info: "",
      expense_quantity: "",
    };
    axios
      .post("/addExpense", dataAll)
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
        <title> Add Phone Bill Expense</title>
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
                    <Typography variant="h5">Add Phone Bill Expense</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
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
                  <Grid item xs={12} sm={6}></Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="Phone Bill Reference Number"
                      label="Phone Bill Reference Number"
                      type="text"
                      fullWidth
                      {...register("Fs_number")}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="Phone Bill Type"
                      label="Phone Bill Type"
                      type="text"
                      fullWidth
                      {...register("Description")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="Phone Bill Price"
                      label="Phone Bill Price"
                      type="text"
                      fullWidth
                      {...register("total_price")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="Remark"
                      label="Remark"
                      type="text"
                      fullWidth
                      {...register("Remark")}
                    />
                  </Grid>

                  <Grid item>
                    <CButton type="submit" sx={{ marginRight: "2rem" }} variant="contained">
                      Add
                    </CButton>
                  </Grid>
                  <Grid item>
                    <Button className="w-40 " variant="outlined">
                      Cancel
                    </Button>
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
