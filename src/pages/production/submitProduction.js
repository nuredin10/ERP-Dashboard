import React, { useState, useEffect } from "react";
import Head from "next/head";
import { TextField, MenuItem, Box, Button, Card, Typography, Grid } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useForm } from "react-hook-form";
import axios from "../../components/productionWxios";
import CustomAlert from "src/components/alert";
import { useRouter } from "next/router";
import CButton from "../../components/Button";
import { DatePicker } from "@mantine/dates";
import { useSnackbar } from "notistack";

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
  const [isSuccess, setIsSuccess] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const [payment, setPayment] = useState();
  const [datepick, setDatePick] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { id } = router.query;

  const newRequest = (data) => {
    console.log(data);
    var newData = { ...data, newDate: datepick.toString() };
    axios
      .post("/addproductFinished", newData)
      .then((res) => {
        console.log(res);
        enqueueSnackbar("Production Submitted", { variant: "success" });
        axios
          .post("/sendNotification", {
            To: "warehouse",
            message: "New Production Report Added",
          })
          .then((respo) => {
            enqueueSnackbar("Notification Sent", { variant: "success" });
          });
        router.reload();
      })
      .catch((err) => {
        enqueueSnackbar("Fill all fileds please", { variant: "error" });
        console.log(err);
      });
  };

  return (
    <>
      <Head>
        <title>Add Production Report</title>
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
                    <Typography variant="h5">Add New Production Report</Typography>
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
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="refernceNum"
                      label="FS Number"
                      type="text"
                      fullWidth
                      {...register("refernceNum")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
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
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="finished_diameter"
                      label="Diameter(OD)"
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
                      name="waste_measureunit"
                      label="UOM Waste"
                      type="text"
                      fullWidth
                      {...register("waste_measureunit")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="waste_Quantity"
                      label="Waste Quantity"
                      type="text"
                      fullWidth
                      {...register("waste_Quantity")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="Remark"
                      label="Remark"
                      type="text"
                      fullWidth
                      {...register("Remark")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="order_reciver"
                      label="Operator name"
                      type="text"
                      fullWidth
                      {...register("order_reciver")}
                    />
                  </Grid>

                  <Grid item>
                    <CButton type="submit" sx={{ marginRight: "2rem" }} variant="contained">
                      Submit
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

ProductionOrderGM.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ProductionOrderGM;
