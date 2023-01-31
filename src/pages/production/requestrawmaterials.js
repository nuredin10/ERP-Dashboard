import Head from "next/head";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Select,
  MenuItem,
  Card,
  Typography,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Autocomplete,
} from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState, useEffect } from "react";
import wareaxios from "../../components/wareHouseAxios";
import CustomAlert from "../../components/alert";
import ConfirmDialog from "src/components/confirmDialog ";
import { useSnackbar } from "notistack";
import { useUser } from "../../lib/UserContext";
import CButton from "../../components/Button";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import { DatePicker } from "@mantine/dates";

const Addpurchasedmaterial = () => {
  const [isSuccess, setIsSuccess] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [fsNumber, setFsNumber] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [datepick, setDatePick] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user, setUser } = useUser();
  const handleClickOpen = () => {
    setDialogOpen(true);
  };
  const handleClose = () => {
    setDialogOpen(false);
  };
  const [inputFields, setInputFields] = useState([
    {
      mat_requestname: "",
      mat_quantity: "",
      mat_unit: "",
      mat_materialcode: "",
      new_status: "NEW",
      userName: Cookies.get("username"),
    },
  ]);

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };

  const handleFsChange = (event) => {
    setFsNumber(event.target.value);
  };

  const handleBatchID = (event) => {
    setBatchNumber(event.target.value);
  };

  const addFields = () => {
    let newfield = {
      new_name: "",
      new_quantity: "",
      new_materialunit: "",
      new_materialcode: "",
      new_status: "NEW",
      userName: Cookies.get("username"),
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

  const submitHandler = () => {
    console.log("Inputfields", inputFields);
    console.log("BatchID", batchNumber);
    console.log("Fs number", fsNumber);
    const allTogether = [inputFields, batchNumber, fsNumber, datepick];
    inputFields.map((eachData) => {
      (eachData.mat_date = datepick.toString()),
        (eachData.req_materialtype = "RAW"),
        (eachData.BatchID = batchNumber),
        (eachData.FsNumber = fsNumber);
    });
    console.log("FAll", inputFields);

    handleClose();
    wareaxios
      .post("/rawmaterialRequest", inputFields)
      .then((res) => {
        console.log(res);
        setIsSuccess("success");
        enqueueSnackbar("Saved Successfully", { variant: "success" });
        wareaxios
          .post("/sendNotification", {
            To: "warehouse",
            message: "New Raw Material Requested",
          })
          .then((respo) => {
            enqueueSnackbar("Notification Sent", { variant: "success" });
          });
        clearAllHandler();
        setAlertMsg("Saved Successfully");
      })
      .catch((res) => {
        console.log(res);
        setIsSuccess("error");
        setAlertMsg("Something went wrong");
        enqueueSnackbar("Something Wend Wrong", { variant: "error" });
      });
  };

  const clearAllHandler = () => {
    setInputFields([]);
    // enqueueSnackbar('All Items Cleared', { variant: 'error' });
  };

  const alertStyle = {
    postion: "absolute",
    top: "20vh",
    left: "10%",
    ml: "20%",
    mt: 3,
    height: "10%",
    width: "20%",
  };

  const token = Cookies.get("token");

  useEffect(() => {
    jwt.verify(token, "PROPLAST", (err, decoded) => {
      if (err) {
        console.log(err);
      } else {
        console.log(decoded);
        // setuser(JSON.stringify(decoded.userName))
        Cookies.set("username", decoded.userName);
        // setUser(decoded);
      }
    });

    // setUser(JSON.parse(Cookies.get("user")));
    // setUserName(user.userName);
  }, []);

  return (
    <>
      <Head>
        <title>Add New Raw material | Proplast</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <ConfirmDialog
          dialogOpen={dialogOpen}
          handleClose={handleClose}
          confirmAction={submitHandler}
          title="Are you sure?"
          message="Do you want to save this item?"
        />

        <Grid container>
          <Grid item lg={6} md={12} sm={12} sx={{ m: 5 }}>
            <Typography variant="h3">New Raw material Requestion</Typography>
          </Grid>

          {isSuccess != "" ? (
            <CustomAlert setIsSuccess={setIsSuccess} type={isSuccess} message={alertMsg} />
          ) : null}
          <Grid item lg={12} sm={12} md={12} sx={{ p: 5, mt: -3 }}>
            <Grid container spacing={4}>
              <Grid item>
                <TextField
                  required
                  name="FS_number"
                  label="FS Number"
                  type="text"
                  onChange={(event) => handleFsChange(event)}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  name="Batch_number"
                  label="Batch Number"
                  type="text"
                  onChange={(event) => handleBatchID(event)}
                  fullWidth
                />
              </Grid>
              <Grid>
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
            </Grid>
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
                        name="mat_requestname"
                        label="Name"
                        type="text"
                        value={input.mat_requestname}
                        onChange={(event) => handleFormChange(index, event)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item sm={6} md={2} lg={3}>
                      <TextField
                        fullWidth
                        required
                        name="mat_materialcode"
                        label="MaterialCode"
                        type="text"
                        value={input.mat_materialcode}
                        onChange={(event) => handleFormChange(index, event)}
                      />
                    </Grid>
                    <Grid item sm={6} md={2} lg={3}>
                      <TextField
                        fullWidth
                        required
                        name="mat_quantity"
                        label="Quantity"
                        type="text"
                        value={input.mat_quantity}
                        onChange={(event) => handleFormChange(index, event)}
                      />
                    </Grid>
                    <Grid item sm={6} md={2} lg={3}>
                      <TextField
                        fullWidth
                        required
                        name="mat_unit"
                        label="UOM"
                        type="text"
                        value={input.mat_unit}
                        onChange={(event) => handleFormChange(index, event)}
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
                <IconButton type="submit" onClick={addFields} size="large">
                  <AddIcon />
                </IconButton>
              </Grid>
              {/* <Grid item lg={12} md={12} sm={12}>
                <CButton onClick ={()=>console.log("Asdcasdc")}>asdc</CButton>
              </Grid> */}
              <Grid item>
                <CButton onClick={handleClickOpen}>Save</CButton>
              </Grid>
              <Grid item>
                <Button variant="outlined" onClick={handleClose}>
                  Clear All
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

Addpurchasedmaterial.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Addpurchasedmaterial;
