import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  TextField,
  MenuItem,
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
} from "@mui/material";
import { DashboardLayout } from "../../../../components/dashboard-layout";
import { useRouter } from "next/router";
import waxios from "../../../../components/wareHouseAxios";
import { DateRangePicker } from "@mantine/dates";
import { DatePicker } from "@mantine/dates";

const MonthlyReport = () => {
  const [selectMonth, setSelectMonth] = useState("");
  const sheetRef = useRef();
  const handleMonthChange = (e) => {
    setSelectMonth(e.target.value);
  };

  const router2 = useRouter();
  const [data, setData] = useState([]);
  const [date, setDate] = useState([]);
  const [year, setYear] = useState("");

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  }

  useEffect(() => {
    waxios
      .post("/showSummeryByMonth", {
        id: router2.query.id,
        materialType: "RAW",
        selectedDate: { start: date[0], end: date[1] },
        selectedYear: year,
      })
      .then(function (res) {
        console.log("response", res.data);
        res.data.map((eachData) => {
          eachData.summery_date = convert(eachData.summery_date);
        });
        setData(res.data);
        console.log(res.data);
        console.log("Works");
      })
      .catch(function (res) {
        console.log(res);
      });
  }, [date[1], year]);

  return (
    <>
      <Head>
        <title>Report</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Grid
          container
          spacing={1}
          sx={{
            mb: 2,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Grid
            container
            spacing={1}
            sx={{
              mb: 2,
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
         
            <Grid item lg={2}>
              <Typography variant="h6" sx={{ textAlign: "center" }}>
                Select Date
              </Typography>
            </Grid>
            <Grid
              sx={{
                display: "flex",
              }}
              item
              lg={2}
            >
              <DatePicker placeholder="Pick date" withAsterisk />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

MonthlyReport.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default MonthlyReport;
