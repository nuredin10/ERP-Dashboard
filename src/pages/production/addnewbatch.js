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
import RawMaterialNeed from "src/components/product/raw_Needed";
// import axios from "../../components/axios";
import axios from "axios";
import CustomAlert from "../../components/alert";
import ConfirmDialog from "src/components/confirmDialog ";

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

const BatchFile = () => {
  const [open, setOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { register, handleSubmit, reset } = useForm();
  const [payment, setPayment] = useState();
  const [orderInfo, setOrderInfo] = useState([]);

  const handlePaymentChange = (newValue) => {
    setPayment(newValue.target.value);
  };

  var newForm;

  const makeRequest = () => {
    axios
      .post("http://localhost:42000/addbatchformula", newForm)
      .then(function (response) {
        console.log(response);
        setIsSuccess("success");
        setAlertMsg("Saved Successfully");
      })
      .catch(function (error) {
        console.log(error);
        setIsSuccess("error");
        setAlertMsg("Something went wrong");
      });
      handleDialogClose();
  };

  const newRequest = (data) => {
    newForm = {
      ...data,
      rawmat_list: JSON.stringify(orderInfo),
    };
    // console.log( newForm);
    // axios
    //   .post("http://localhost:42000/addbatchformula", newForm)
    //   .then(function (response) {
    //     console.log(response);
    //     setIsSuccess("success");
    //     setAlertMsg("Saved Successfully");
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     setIsSuccess("error");
    //     setAlertMsg("Something went wrong");
    //   });
  };

  return (
    <>
      <Head>
        <title>Batch File</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <ConfirmDialog
          dialogOpen={dialogOpen}
          handleClose={handleDialogClose}
          confirmAction={makeRequest}
          title="Are you sure?"
          message="Do you want to save this item?"
        />

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
                    <Typography variant="h5">Add New Batch File</Typography>
                  </Grid>
                  {isSuccess != "" ? (
                    <CustomAlert setIsSuccess={setIsSuccess} type={isSuccess} message={alertMsg} />
                  ) : null}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="finmat_prod"
                      label="Finished Good"
                      type="text"
                      fullWidth
                      {...register("finmat_prod")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="finmat_spec"
                      label="Specification"
                      type="text"
                      fullWidth
                      {...register("finmat_spec")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="prod_quan"
                      label="Production Quantity"
                      type="text"
                      fullWidth
                      {...register("prod_quan")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="prod_unit"
                      label="Production unit"
                      type="text"
                      fullWidth
                      {...register("prod_unit")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Typography variant="h7">Add Factors</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="efficency"
                      label="Efficency"
                      type="text"
                      fullWidth
                      {...register("efficency")}
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
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="timeneeded"
                      label="Time Allocated"
                      type="text"
                      fullWidth
                      {...register("timeneeded")}
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

                  <Grid item xs={12} sm={12}>
                    <Typography variant="h7">Raw Material Needed</Typography>
                  </Grid>
                  <Grid item xs={6} sm={6} lg={6}>
                    <Button onClick={handleOpen} variant="contained">
                      Add
                    </Button>
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <Typography variant="h7">Expected Waste</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="waste_name"
                      label="Waste Name"
                      type="text"
                      fullWidth
                      {...register("waste_name")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="waste_quan"
                      label="Waste Quantity"
                      type="text"
                      fullWidth
                      {...register("waste_quan")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="waste_unit"
                      label="Waste unit"
                      type="text"
                      fullWidth
                      {...register("waste_unit")}
                    />
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

                  <Grid item>
                    <Button
                      onClick={handleDialogOpen}
                      type="submit"
                      sx={{ marginRight: "2rem" }}
                      variant="contained"
                    >
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

BatchFile.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default BatchFile;
