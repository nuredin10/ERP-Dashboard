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
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Divider,
  IconButton
} from "@mui/material";
import { DashboardLayout } from "../../../components/dashboard-layout";
import Table from "../../../components/Table";
import waxios from "../../../components/wareHouseAxios";
import SummarizeIcon from "@mui/icons-material/Summarize";
// import Router from "next/router";
import AddIcon from '@mui/icons-material/Add';
import OrdersToolBar from "../../../components/rawMaterials/order-toolbar";
import { OrderResults } from "../../../components/rawMaterials/order-results";
import RightDrawer from "../../../components/rawMaterials/RightDrawer";
import Router from "next/router";
const FinishedGoods = () => {
  const [drawer, setDrawer] = useState(false);
  const [data, setData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [summery, setSummery] = useState([]);
  var width;
  const [type, setType] = useState("50mm");
  const handleChange = (event) => {
    setType(event.target.value);
  };
  // const size = useWindowSize();

  const req = {
    materialType: type,
  };
  if (typeof window != "undefined") {
    console.log("You are on the browser");
    console.log(window.innerWidth);
    width = window.innerWidth;
  } else {
    console.log("You are on the server");
  }
  const columns = [
    // { title: "Name", field: "finished_name" },
    // { title: "Quantity", field: "finished_quantity" },
    // { title: "Diameter", field: "finished_diameter" },
    // { title: "Description", field: "finished_description" },
    // { title: "Material Code", field: "finished_materialcode" },
    // { title: "Specification", field: "finished_spec" },
    // { title: "Material Unit", field: "finished_materialunit" },
    // { title: "Value", field: "finished_value" },
    // { title: "Reference Number", field: "finished_referncenum" },
    // { title: "Date", field: "finished_date" },
    // { title: "Remark", field: "finished_remark" },

    { title: "Name", field: "finished_name" },
    { title: "Quantity", field: "finished_quantity" },
    { title: "Material Code", field: "finished_materialcode" },
    { title: "Material Unit", field: "finished_materialunit" },
    { title: "Date", field: "finished_date" },
  ];
  useEffect(() => {
    waxios
      .post("/finishedMaterialbyCat", {
        Cat: "PPR PIPES",
        Spec: type,
      })
      .then((response) => {
        console.log(response.data, "ZSdc");
        setData(response.data);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Finished Goods | Proplast</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container
          sx={{
            display: {
              xs: "none",
              lg: "block",
            },
          }}
          maxWidth="ml"
        >
          <Grid container spacing={3}>
            <Grid item xg={3} lg={3} sm={3} sx={{ mb: 3 }}>
              <Typography sx={{ mb: 3 }} variant="h6">
                SELECT OD
              </Typography>
              <FormControl>
                <InputLabel id="demo-simple-select-label">Select OD</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="OD Type"
                  onChange={handleChange}
                >
                  <MenuItem value={"50mm"}>OD 20mm</MenuItem>
                  <MenuItem value={"75mm"}>OD 25mm</MenuItem>
                  <MenuItem value={"110mm"}>OD 32mm</MenuItem>
                  <MenuItem value={"110mm"}>OD 40mm</MenuItem>
                  <MenuItem value={"110mm"}>OD 50mm</MenuItem>
                  <MenuItem value={"110mm"}>OD 63mm</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xg={3} lg={3} sm={3} sx={{ mb: 3 }}>
              <Typography sx={{ mb: 3 }} variant="h6">
                Add OD
              </Typography>
              <Grid container>
                <Grid item lg={6} sm={6} xg={6}>
                  <TextField name="od" label="Add OD" type="text" />
                </Grid>
                <Grid item lg={6} sm={6} xg={6}>
                  <IconButton size="large" sx={{ mt: 0.5,ml: 1}}>
                    <AddIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xg={3} lg={3} sm={3} sx={{ mb: 3 }}>
              <Typography sx={{ mb: 3 }} variant="h6">
                Add PPR
              </Typography>
              <Grid container>
                <Grid item lg={6} sm={6} xg={6}>
                  <TextField name="ppr" label="Add PPR" type="text" />
                </Grid>
                <Grid item lg={6} sm={6} xg={6}>
                  <IconButton size="large" sx={{ mt: 0.5,ml: 1}}>
                    <AddIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Card maxWidth="lg">
            <Table
              title="PPR PIPES"
              data={data}
              columns={columns}
              actions={[
                (rowData) => ({
                  icon: () => <SummarizeIcon size="small" />,
                  tooltip: "Summary",
                  onClick: () => {
                    // console.log(rowData)
                    Router.push({
                      pathname: "/warehouse/stockList/FinishedGoods/monthlyReport",
                      query: { id: rowData.id },
                    });
                  },
                }),
              ]}
              localization={{
                header: {
                  actions: "SUMMARY",
                },
              }}
            />
          </Card>
        </Container>
        <Container
          sx={{
            display: {
              xs: "block",
              lg: "none",
            },
          }}
          maxWidth={false}
        >
          <Box>
            <OrdersToolBar drawer={drawer}></OrdersToolBar>
            <OrderResults
              drawer={drawer}
              setDrawer={setDrawer}
              setSelectedOrder={setSelectedOrder}
              setSummery={setSummery}
              data={data}
              width={width}
            />
            <Box>
              <RightDrawer
                drawer={drawer}
                setDrawer={setDrawer}
                selectedOrder={selectedOrder}
                summery={summery}
              />
            </Box>
            <Divider sx={{ borderColor: "gray", mt: 3 }} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

FinishedGoods.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default FinishedGoods;
