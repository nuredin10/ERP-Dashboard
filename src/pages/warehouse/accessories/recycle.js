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
  MenuItem,
  IconButton,
} from "@mui/material";
import { DashboardLayout } from "../../../components/dashboard-layout";
import Table from "../../../components/Table";
import ToolBar from "../../../components/ToolBar";
import waxios from "../../../components/wareHouseAxios";
import SummarizeIcon from "@mui/icons-material/Summarize";
import Router from "next/router";
import AddIcon from "@mui/icons-material/Add";

const Recycle = () => {
  const [data, setData] = useState([]);
  const [type, setType] = useState("RAW");
  const handleChange = (event) => {
    setType(event.target.value);
  };
  var columns;

  columns = [
    { title: "Date", field: "accs_date" },
    { title: "Material Name", field: "accs_name" },
    { title: "Material Code", field: "accs_materialcode" },
    { title: "Stock At Hand", field: "accs_quantity" },
  ];

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  }

  const req = {
    Cat: "Consumable_goods",
  };
  useEffect(() => {
    waxios
      .post("/showAccCat", req)
      .then((response) => {
        response.data.map((eachData) => {
          eachData.accs_date = convert(eachData.accs_date);
          eachData.accs_quantity =
            eachData.accs_quantity !== ""
              ? parseFloat(eachData.accs_quantity).toLocaleString("en-US")
              : "";
        });
        setData(response.data);
        console.log(response.data);
      })
      .catch((response) => {
        console.log(response);
      });
  }, [type]);
  return (
    <>
      <Head>
        <title>Mechanical | Accessories</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="ml">
          <Grid container spacing={3}>
            {/* <Grid item xg={3} lg={3} sm={6} sx={{ mb: 3 }}>
              <Typography sx={{ mb: 3 }} variant="h6">
                Add OD
              </Typography>
              <Grid container>
                <Grid item lg={6} sm={6} xg={6}>
                  <TextField name="od" label="Add OD" type="text" />
                </Grid>
                <Grid item lg={6} sm={6} xg={6}>
                  <IconButton size="large" sx={{ mt: 0.5, ml: 1 }}>
                    <AddIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid> */}
            {/* <Grid item xg={3} lg={3} sm={6} sx={{ mb: 3 }}>
              <Typography sx={{ mb: 3 }} variant="h6">
                Add PPR
              </Typography>
              <Grid container>
                <Grid item lg={6} sm={6} xg={6}>
                  <TextField name="ppr" label="Add HDPE PIPES" type="text" />
                </Grid>
                <Grid item lg={6} sm={6} xg={6}>
                  <IconButton size="large" sx={{ mt: 0.5, ml: 1 }}>
                    <AddIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid> */}
            <Grid item xg={12} lg={12} sm={12}>
              <Card maxWidth="lg">
                <Table
                  title="Consumable"
                  data={data}
                  columns={columns}
                  actions={[
                    (rowData) => ({
                      icon: () => <SummarizeIcon size="small" />,
                      tooltip: "Summary",
                      onClick: () => {
                        // console.log(rowData)
                        Router.push({
                          pathname: "/warehouse/stockList/Accessories/monthlyReport",
                          query: { id: rowData.id },
                        });
                      },
                    }),
                  ]}
                />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Recycle.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Recycle;
