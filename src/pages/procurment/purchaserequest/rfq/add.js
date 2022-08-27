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

const Add = () => {
  const [status, setStatus] = React.useState('');
  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  
  return (
    <>
      <Head>
        <title>Add Supplier</title>
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
              href="/procurment/purchaserequest/rfq"
              color="black"
              underline="none"
              variant="subtitle2"
              sx={{ cursor: "pointer" }}
            >
              <ArrowBackIcon /> RFQ
            </Link>
          </Box>
          <Card sx={{ width: "70%", padding: "2%" }}>
            <Grid container 
            spacing={4}>
              <Grid item 
              xs={12}
sm={12}>
                <Typography variant="h6">Request for Quatations</Typography>
              </Grid>
              <Grid item 
              xs={12}
sm={6}>
                <TextField required 
                name="id"
label="ID"
type="text"
fullWidth />
              </Grid>
              <Grid item 
              xs={12}
sm={6}>
                <TextField required 
                name="Name"
label="Name"
type="text"
fullWidth />
              </Grid>
              <Grid item 
              xs={12}
sm={6}>
                <TextField required 
                name="Address"
label="Address"
type="text"
fullWidth />
              </Grid>
              <Grid item 
              xs={12}
sm={6}>
                <TextField required 
                name="City"
label="City"
type="text"
fullWidth />
              </Grid>
              <Grid item 
              xs={12}
sm={6}>
                <TextField required 
                name="Country"
label="Country"
type="text"
fullWidth />
              </Grid>
              <Grid item 
              xs={12}
sm={6}>
                <TextField required 
                name="Nationality"
label="Nationality"
type="text"
fullWidth />
              </Grid>
              <Grid item 
              lg={12}
sm={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={status}
                      label="Status"
                      onChange={handleChange}
                    >
                      <MenuItem value={10}>Completed</MenuItem>
                      <MenuItem value={20}>Canceld</MenuItem>
                      <MenuItem value={30}>Rejected</MenuItem>
                      <MenuItem value={40}>Pending</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                    <Button type="submit"
sx={{marginRight: "2rem"}}
variant='contained'>Save</Button>
                    <Button variant='outlined'>Cancel</Button>
                </Grid>
            </Grid>
          </Card>
        </Box>
      </Box>
    </>
  );
};

Add.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Add;
