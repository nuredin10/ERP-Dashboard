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
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { DashboardLayout } from "../../../../components/dashboard-layout";
import Table from "../../../../components/Table";
import ToolBar from "../../../../components/ToolBar";
import { useRouter } from "next/router";
import waxios from "../../../../components/wareHouseAxios";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const MonthlyReport = () => {
  // const [selectMonth, setSelectMonth] = useState("");
  const [summaryDate, setSummaryDate] = useState();
  const handleMonthChange = (e) => {
    setSelectMonth(e.target.value);
  };
  const router = useRouter();
  const {
    query: { summeryId },
  } = router;

  const props = {
    summeryId,
  };

  const [data, setData] = useState([]);

  const [recievedSummery, setRecivedSummery] = useState([]);
  const [issuedSummery, setIssuedSummery] = useState([]);
  
  const column = [
    { title: "Date", field: "summery_date" },
    { title: "Stock at Hand", field: "stockat_hand" },
    { title: "Stock Recieved", field: "stock_recieved" },
    { title: "Stock Issued", field: "stock_issued" },
    { title: "Department Issued", field: "department_issued" },
    { title: "stock at End", field: "stockat_end" },
  ];

  const req = {
    id: props.selectedOrder,
    materialType: "FIN",
    // selectedMonth: selectMonth,
  };
  useEffect(() => {
    console.log(props.summeryId, "idddddd")
    // waxios
    //   .post("/showSummeryByMonth", req)
    //   .then(function (res) {
    //     setData(res.data);
    //     console.log("new req");
    //   })
    //   .catch(function (res) {
    //     console.log(res);
    //   });
    // console.log(req);
  }, []);

  useEffect(() => {
    setRecivedSummery([]);
    setIssuedSummery([]);
    data.map((e) => {
      e.stock_issued == ""
        ? setRecivedSummery((recievedSummery) => [...recievedSummery, e])
        : setIssuedSummery((issuedSummery) => [...issuedSummery, e]);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Monthly Report</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Grid container spacing={1} sx={{ mb: 2, display: "flex", alignItems: "center" }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid item lg={2}>
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Summary
            </Typography>
          </Grid>
          <Grid item lg={6} sm={12}>
            <DesktopDatePicker
              label="Pick Summary Date"
              inputFormat="MM/dd/yyyy"
              value={summaryDate}
              onChange={(newValue) => {
                setSummaryDate(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  // fullWidth
                  // name="end_dateTime"
                  // {...register("end_dateTime")}
                />
              )}
            />
          </Grid>
          </LocalizationProvider>

          {/* <Grid item lg={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Job Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="JobType"
                value={selectMonth}
                label="Job Type"
                onChange={handleMonthChange}
              >
                <MenuItem value="0">Janurary</MenuItem>
                <MenuItem value="1">February</MenuItem>
                <MenuItem value="2">March</MenuItem>
                <MenuItem value="3">April</MenuItem>
                <MenuItem value="4">May</MenuItem>
                <MenuItem value="5">June</MenuItem>
                <MenuItem value="6">July</MenuItem>
                <MenuItem value="7">August</MenuItem>
                <MenuItem value="8">September</MenuItem>
                <MenuItem value="9">October</MenuItem>
                <MenuItem value="10">Novermber</MenuItem>
                <MenuItem value="11">December</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
        </Grid>

        <Container maxWidth="ml">
          <Card maxWidth="lg">
            <Table title="Monthly Stock Movement Report" data={recievedSummery} columns={column} />
          </Card>
          {/* <Card maxWidth="lg">
            <Table
              title='Monthly Stock Issued Report'
              data={issuedSummery}
              columns={issuedcolumns}
            />
          </Card> */}
        </Container>
      </Box>
    </>
  );
};

MonthlyReport.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default MonthlyReport;
