import React from "react";
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
} from "@mui/material";
import Head from "next/head";
import { DashboardLayout } from "src/components/dashboard-layout";
import Link from "@mui/material/Link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const AddSiv = () => {
  const [status, setStatus] = React.useState("");
  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  const { register, handleSubmit } = useForm();

  const newUser = (user) => {
    // console.log(user)
    fetch("http://versavvy.com:49000/addnewAccessory", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    });
  };

  return (
    <>
      <Head>
        <title>Accessories | Add SIV</title>
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
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ marginLeft: "-60%", marginBottom: "2%" }}>
            <Link
              href="/warehouse/stockList/Accessories"
              color="black"
              underline="none"
              variant="subtitle2"
              sx={{ cursor: "pointer" }}
            >
              <ArrowBackIcon /> Accessories
            </Link>
          </Box>
          <Card sx={{ width: "70%", padding: "2%" }}>
            {/* <form onSubmit={handleSubmit(newUser)}>
              <input type="text" name="name" {...register("name")} />
              <input type="text" password="email" {...register("email")} />
              <input type="submit" />
            </form> */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <form onSubmit={handleSubmit(newUser)}>
                <Grid container
                  spacing={4}>
                  <Grid item
                    xs={12}
                    sm={12}>
                    <Typography variant="h6">Add Accessories SIV</Typography>
                  </Grid>
                  <Grid item
                    xs={12}
                    sm={6}>
                    <TextField required
                      name="accs_name "
                      label="Name"
                      type="text"
                      fullWidth
                      {...register("accs_name")} />
                  </Grid>
                  <Grid item
                    xs={12}
                    sm={6}>
                    <TextField required
                      name="accs_quantity"
                      label="Quantity"
                      type="text"
                      fullWidth
                      {...register("accs_quantity")} />
                  </Grid>
                  <Grid item
                    xs={12}
                    sm={6}>
                    <TextField required
                      name="accs_description"
                      label="Description"
                      type="text"
                      fullWidth
                      {...register("accs_description")} />
                  </Grid>
                  <Grid item
                    xs={12}
                    sm={6}>
                    <TextField required
                      name="accs_materialcode"
                      label="MaterialCode"
                      type="text"
                      fullWidth
                      {...register("accs_materialcode")} />
                  </Grid>
                  <Grid item
                    xs={12}
                    sm={6}>
                    <TextField required
                      name="accs_spec"
                      label="Specification"
                      type="text"
                      fullWidth
                      {...register("accs_spec")} />
                  </Grid>
                  <Grid item
                    xs={12}
                    sm={6}>
                    <TextField required
                      name="accs_materialunit"
                      label="Material Unit"
                      type="text"
                      fullWidth
                      {...register("accs_materialunit")} />
                  </Grid>
                  <Grid item
                    xs={12}
                    sm={6}>
                    <TextField required
                      name="accs_value"
                      label="Value"
                      type="text"
                      fullWidth
                      {...register("accs_value")} />
                  </Grid>
                  <Grid item
                    xs={12}
                    sm={6}>
                    <TextField required
                      name="accs_referncenum"
                      label="Reference Number"
                      type="text"
                      fullWidth
                      {...register("accs_referncenum")} />
                  </Grid>
                  <Grid item >
                    <TextField required
                      name="accs_date"
                      label="Date"
                      type="text"
                      fullWidth
                      {...register("accs_date")} />

                    {/* <DesktopDatePicker
                    sx={{ maxWidth: 500 }}
                    name="accs_date"
                    label="Date"
                    inputFormat="MM/dd/yyyy"
                    value={"2014-08-18T21:11:54"}
                    renderInput={(params) => <TextField {...params} {...register("accs_date")}/>}
                  /> */}
                  </Grid>
                  <Grid item
                    xs={12}
                    sm={12}>
                    <TextField required
                      name="accs_remark"
                      label="Remark"
                      type="text"
                      fullWidth
                      {...register("accs_remark")} />
                  </Grid>
                  <Grid item>
                    <Button type="submit"
                      sx={{ marginRight: "2rem" }}
                      variant='contained'>Save</Button>
                    <Button variant='outlined'>Cancel</Button>
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

AddSiv.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AddSiv;
