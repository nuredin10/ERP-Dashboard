import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormHelperText,
    Link,
    TextField,
    Card,
    Typography,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem
  } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import Table from "../../components/Table";
import ToolBar from "../../components/ToolBar";
import FAxios from "../../components/financeAxios";

const AccountRecieveable = () => {
  const [data, setData] = useState([]);
  const [type, setType] = useState('RAW')
  const handleChange = (event) => {
    setType(event.target.value);
    FAxios.post("/showAssetByType", {materialType: type})
      .then((res) => {
        console.log(res.data)
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    { title: "Name", field: "asset_name" },
    { title: "Description", field: "asset_desc" },
    { title: "Specification", field: "asset_spec" },
    { title: "Quantity", field: "asset_quantity" },
    { title: "Issued Date", field: "asset_date" },
    { title: "Department", field: "department" },
    { title: "Issued by", field: "personRequested" },
  ];
  useEffect(() => {
    FAxios.get("/showAssetMang")
      .then((res) => {
        console.log(res.data)
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Asset Managment | Proplast</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="ml">
          <Grid Container spacing={3}>
            <Grid item xg={4} lg={4} sm={12} sx={{ mb: 3 }}>
              <FormControl>
                <InputLabel id="demo-simple-select-label">Select Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={"RAW"}>Raw Material</MenuItem>
                  <MenuItem value={"ACCS"}>Accessories</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xg={12} lg={12} sm={12}>
              <Card maxWidth="lg">
                <Table title="Asset Managment Report" data={data} columns={columns} />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

AccountRecieveable.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AccountRecieveable;
