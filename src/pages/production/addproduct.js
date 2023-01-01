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

const ProductionOrder = () => {
  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();
  const [customOrRegular, setCustomOrRegular] = React.useState("custom");
  const [indata, setIndata] = useState();
  const router = useRouter();
  const { id } = router.query;
  const [isSuccess, setIsSuccess] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

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
      .get("/showbatchformula")
      .then((res) => {
        setRegular(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));

    axios.post("/ShowGmOrderById", { id: id }).then((respo) => {
      setIndata(respo.data[0]);
      console.log(respo.data);
    });
  }, []);

  useEffect(() => {
    // console.log("Id", id);
  }, []);

  // console.log(selectedRegualr, "yooooooooo");

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("/");
  }

  var newForm;
  const newRequest = (data) => {
    if (customOrRegular === "regular") {
      newForm = {
        ...data,
        batch_id: selectedRegualr,
        custom_regular: customOrRegular,
        status: "New",
        start_dateTime: convert(startDate),
        end_dateTime: convert(endDate),
        salesID: indata.salesID,
        GMID: indata.id
      };
    } else {
      newForm = {
        ...data,
        raw_needed: JSON.stringify(orderInfo),
        custom_regular: customOrRegular,
        start_dateTime: convert(startDate),
        end_dateTime: convert(endDate),
        status: "New",
        salesID: indata.salesID,
        GMID: indata.id
      };
    }

    axios
      .post("/addProductionOrder", newForm)
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
    console.log(newForm);
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
              {indata && (
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
                        value={indata.final_product}
                        // placeholder={indata.final_product}
                        {...register("fin_product")}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        name="finished_materialcode"
                        label="Material Code"
                        type="text"
                        fullWidth
                        value={indata.finished_materialcode}
                        {...register("finished_materialcode")}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        name="finished_diameter"
                        label="Diameter"
                        type="text"
                        fullWidth
                        value={indata.finished_diameter}
                        {...register("finished_diameter")}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        name="fin_quan"
                        label="Quantity"
                        type="text"
                        fullWidth
                        value={indata.final_quant}
                        {...register("fin_quan")}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        name="final_measureunit"
                        label="Measure Unit"
                        type="text"
                        fullWidth
                        value={indata.final_measureunit}
                        {...register("final_measureunit")}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        name="final_color"
                        label="Final Color"
                        type="text"
                        value={indata.final_color}
                        fullWidth
                        {...register("final_color")}
                      />
                    </Grid>
                  
                    {customOrRegular === "custom" ? (
                      <>
                        <Grid item xs={12} sm={6}>
                          <Button onClick={handleOpen} variant="outlined">
                            Add
                          </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            name="expected_fin_qty"
                            label="FS NUMBER"
                            type="text"
                            fullWidth
                            {...register("FS_NUMBER")}
                          />
                        </Grid>
                     

                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <RawMaterialNeed
                              setOrderInfo={setOrderInfo}
                              handleClose={handleClose}
                            />
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
                                {item.finmat_prod +
                                  " | " +
                                  item.prod_quan +
                                  " | " +
                                  item.finmat_spec}
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
              )}
            </LocalizationProvider>
          </Card>
        </Box>
      </Box>
    </>
  );
};

ProductionOrder.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ProductionOrder;
