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

const Summary = () => {
  const [data, setData] = useState([]);
  const [ods, setOd] = useState([]);
  const [type, setType] = useState("RAW");
  const handleChange = (event) => {
    setType(event.target.value);
    const req = {
      Cat: "PPR PIPE",
      Spec: type,
    };
    waxios
      .post("/finishedMaterialbyCat", req)
      .then((response) => {
        response.data.map((eachData) => {
          eachData.finished_date = convert(eachData.finished_date);
        });
        setData(response.data);
        console.log(response.data);
      })
      .catch((response) => {
        console.log(response);
      });
  };
  var columns;

  // const ods = [
  //   "20mm","25mm", "32mm", "40mm", "50mm", "63mm"
  // ]

  columns = [
    { title: "Date", field: "finished_date" },
    { title: "Description", field: "finished_diameter" },
    { title: "Material Code", field: "finished_materialcode" },
    { title: "Color", field: "color" },
    { title: "Stock At Hand", field: "finished_quantity" },
  ];
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  }
  const try2 = [];

  useEffect(() => {
    waxios
      .post("/diameterSelect", { Cat: "PPR PIPE" })
      .then((result) => {
        try2 = result.data;

        setOd(result.data);
        console.log("NOW", try2);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [type]);
  return (
    <>
      <Head>
        <title>Finished Good</title>
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
            <Grid item xg={4} lg={4} sm={12} sx={{ mb: 3 }}>
              <Typography sx={{ mb: 3 }} variant="h6">
                Select Type
              </Typography>
              <FormControl className="w-40">
                <InputLabel id="demo-simple-select-label">Select Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
              
                  value={type}
                  label="type"
                  onChange={handleChange}
                >
                  {try2.map((od) => (
                    <MenuItem value={od.finished_description}>OD 20mm</MenuItem>
                  ))}
                  {/* <MenuItem value={"20mm"}>OD 20mm</MenuItem>
                  <MenuItem value={"25mm"}>OD 25mm</MenuItem>
                  <MenuItem value={"32mm"}>OD 32mm</MenuItem>
                  <MenuItem value={"40mm"}>OD 40mm</MenuItem>
                  <MenuItem value={"50mm"}>OD 50mm</MenuItem>
                  <MenuItem value={"63mm"}>OD 63mm</MenuItem> */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xg={3} lg={3} sm={6} sx={{ mb: 3 }}>
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
            </Grid>
            <Grid item xg={3} lg={3} sm={6} sx={{ mb: 3 }}>
              <Typography sx={{ mb: 3 }} variant="h6">
                Add PPR
              </Typography>
              <Grid container>
                <Grid item lg={6} sm={6} xg={6}>
                  <TextField name="ppr" label="Add PPR" type="text" />
                </Grid>
                <Grid item lg={6} sm={6} xg={6}>
                  <IconButton size="large" sx={{ mt: 0.5, ml: 1 }}>
                    <AddIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xg={12} lg={12} sm={12}>
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
                />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Summary.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Summary;
