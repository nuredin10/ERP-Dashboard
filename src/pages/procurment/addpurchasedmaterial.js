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
      new_name: "",
      new_quantity: "",
      new_materialunit: "",
      new_materialcode: "",
      new_spec: "",
      new_description: "",
      new_value: "",
      new_referncenum: "",
      new_materialtype: "",
      new_remark: "",
      payable_name: "",
      payable_account: "",
      new_status: "NEW",
      userName: Cookies.get("username"),
    },
  ]);

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };

  const addFields = () => {
    let newfield = {
      new_name: "",
      new_quantity: "",
      new_materialunit: "",
      new_materialcode: "",
      new_spec: "",
      new_description: "",
      new_value: "",
      new_referncenum: "",
      new_materialtype: "",
      new_remark: "",
      payable_name: "",
      payable_account: "",
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
    console.log(inputFields);
    // inputFields.push({ userName: Cookies.get("user") });
    // const addUser = {data: inputFields, userName: Cookies.get("user")};
    // console.log(addUser);
    handleClose();
    wareaxios
      .post("/addnewPurchased", inputFields)
      .then((res) => {
        console.log(res);
        setIsSuccess("success");
        enqueueSnackbar("Saved Successfully", { variant: "success" });
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
        <title>Add Purchased Material | Proplast</title>
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
            <Typography className="text-[#61482A]" variant="h4">
              Add New Purchased Raw Material
            </Typography>
          </Grid>

          {isSuccess != "" ? (
            <CustomAlert setIsSuccess={setIsSuccess} type={isSuccess} message={alertMsg} />
          ) : null}
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
                    {/* <Grid item sm={6} md={2} lg={3}>
                      <TextField
                        name="new_materialtype"
                        label="Material Type"
                        placeholder="Material Type"
                        value={input.new_materialtype}
                        select
                        defaultValue="RAW"
                        onChange={(event) => handleFormChange(index, event)}
                        fullWidth
                      >
                        <MenuItem value="RAW">RAW</MenuItem>
                        <MenuItem value="ACCS">ACCS</MenuItem>
                      </TextField>
                    </Grid> */}
                    <Grid item sm={6} md={2} lg={3}>
                      <DatePicker
                        sx={{ paddingbottom: "1rem" }}
                        required
                        placeholder="Pick date"
                        label="Select Date"
                        withAsterisk
                      />
                    </Grid>
                    <Grid item sm={6} md={2} lg={3}></Grid>
                    <Grid item sm={6} md={2} lg={3}></Grid>
                    <Grid item sm={6} md={2} lg={3}></Grid>
                    <Grid item sm={6} md={2} lg={3}>
                      <TextField
                        required
                        name="new_materialtype"
                        label="Material Type"
                        placeholder="RAW"
                        value="RAW"
                        defaultValue="RAW"
                        onChange={(event) => handleFormChange(index, event)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item sm={6} md={2} lg={3}>
                      <TextField
                        required
                        name="new_name"
                        label="Name"
                        type="text"
                        value={input.new_name}
                        onChange={(event) => handleFormChange(index, event)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item sm={6} md={2} lg={3}>
                      <TextField
                        fullWidth
                        required
                        name="new_quantity"
                        label="Quantity"
                        type="text"
                        value={input.new_quantity}
                        onChange={(event) => handleFormChange(index, event)}
                      />
                    </Grid>
                    <Grid item sm={6} md={2} lg={3}>
                      <TextField
                        fullWidth
                        required
                        name="new_materialunit"
                        label="Material Unit"
                        type="text"
                        value={input.new_materialunit}
                        onChange={(event) => handleFormChange(index, event)}
                      />
                    </Grid>
                    <Grid item sm={6} md={2} lg={3}>
                      <TextField
                        fullWidth
                        required
                        name="new_materialcode"
                        label="MaterialCode"
                        type="text"
                        value={input.new_materialcode}
                        onChange={(event) => handleFormChange(index, event)}
                      />
                    </Grid>
                    {/* <Grid item sm={6} md={2} lg={3}>
                      <TextField
                        fullWidth
                        required
                        name="new_spec"
                        label="Specification"
                        type="text"
                        value={input.new_spec}
                        onChange={(event) => handleFormChange(index, event)}
                      />
                    </Grid> */}
                    {/* <Grid item sm={6} md={2} lg={3}>
                      <TextField
                        required
                        name="new_description"
                        label="Description"
                        type="text"
                        value={input.new_description}
                        onChange={(event) => handleFormChange(index, event)}
                        fullWidth
                      />
                    </Grid> */}
                    <Grid item sm={6} md={2} lg={3}>
                      <TextField
                        fullWidth
                        required
                        name="new_value"
                        label="Value"
                        type="text"
                        value={input.new_value}
                        onChange={(event) => handleFormChange(index, event)}
                      />
                    </Grid>
                    <Grid item sm={6} md={2} lg={3}>
                      <TextField
                        fullWidth
                        required
                        name="new_referncenum"
                        label="Reference Number"
                        type="text"
                        value={input.new_referncenum}
                        onChange={(event) => handleFormChange(index, event)}
                      />
                    </Grid>

                    <Grid item sm={6} md={2} lg={3}>
                      <TextField
                        fullWidth
                        required
                        name="payable_name"
                        label="Payable Name"
                        type="text"
                        value={input.payable_name}
                        onChange={(event) => handleFormChange(index, event)}
                      />
                    </Grid>
                    <Grid item sm={6} md={2} lg={3}>
                      <TextField
                        required
                        fullWidth
                        name="payable_account"
                        label="Payable Account"
                        type="text"
                        value={input.payable_account}
                        onChange={(event) => handleFormChange(index, event)}
                      />
                    </Grid>

                    <Grid item sm={6} md={2} lg={3}>
                      <TextField
                        fullWidth
                        required
                        name="new_remark"
                        label="Remark"
                        type="text"
                        value={input.new_remark}
                        onChange={(event) => handleFormChange(index, event)}
                      />
                    </Grid>

                    <Grid item xs={1} lg={2} sm={1} md={1} sx={{ mt: "2%", ml: "2%" }}>
                      <IconButton onClick={() => removeFields(index)}>
                        <p className="text-lg "> Remove Item </p> <RemoveIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                );
              })}
              <Grid item lg={12} md={12} sm={12}>
                <IconButton type="submit" onClick={addFields} size="large">
                  <p className="text-lg ml-5 mr-2"> Add New Material</p> <AddIcon />
                </IconButton>
              </Grid>
              {/* <Grid item lg={12} md={12} sm={12}>
                <CButton onClick ={()=>console.log("Asdcasdc")}>asdc</CButton>
              </Grid> */}
              <Grid item>
                <CButton onClick={handleClickOpen}>Save</CButton>
              </Grid>
              <Grid item>
                <Button className="w-40 h-10 " variant="outlined" onClick={handleClose}>
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
