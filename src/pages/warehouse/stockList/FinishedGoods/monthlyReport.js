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
import Table from "../../../../components/Table";
import ToolBar from "../../../../components/ToolBar";
import { useRouter } from "next/router";
import waxios from "../../../../components/wareHouseAxios";
// import xlx
import { read, set_cptable, writeFileXLSX, utils } from "xlsx";
import xlsx from "xlsx";
import { FormControlUnstyledContext } from "@mui/base";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { DateRangePicker } from "@mantine/dates";
import { Select } from "@mantine/core";
import { IconCalendar } from "@tabler/icons";
import axios from "axios";

const MonthlyReport = () => {
  const [selectMonth, setSelectMonth] = useState("");
  const sheetRef = useRef();
  const handleMonthChange = (e) => {
    setSelectMonth(e.target.value);
  };

  const router2 = useRouter();
  const title = router2.query.products + " stock movement report";
  // const { id } = router2.query;
  // var nowYead = new
  const [data, setData] = useState([]);
  const [date, setDate] = useState([]);
  const [year, setYear] = useState("");

  const [recievedSummery, setRecivedSummery] = useState([]);
  const [issuedSummery, setIssuedSummery] = useState([]);

  const issuedcolumns = [
    { title: "Date", field: "summery_date" },
    { title: "Stock Recieved", field: "stock_recieved" },
    { title: "Stock Recieved In KG", field: "recived_kg" },
    { title: "Stock Issued", field: "stock_issued" },
    { title: "Stock Issued IN KG", field: "issues_kg" },
    { title: "stock at hand", field: "stockat_end" },
    { title: "stock at hand IN KG", field: "stockatend_kg" },
    { title: "Fs Number", field: "fs_number" },
    { title: "Department", field: "department_issued" },
  ];
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
        materialType: "FIN",
        selectedDate: { start: date[0], end: date[1] },
        selectedYear: year,
      })
      .then(function (res) {
        console.log("response", res.data);
        res.data.map((eachData) => {
          eachData.summery_date = convert(eachData.summery_date);
          eachData.stock_recieved =
            eachData.stock_recieved !== ""
              ? parseFloat(eachData.stock_recieved).toLocaleString("en-US")
              : "";

          eachData.recived_kg =
            eachData.recived_kg !== ""
              ? parseFloat(eachData.recived_kg).toLocaleString("en-US")
              : "";

          eachData.stock_issued =
            eachData.stock_issued !== ""
              ? parseFloat(eachData.stock_issued).toLocaleString("en-US")
              : "";

          eachData.issues_kg =
            eachData.issues_kg !== "" ? parseFloat(eachData.issues_kg).toLocaleString("en-US") : "";

          eachData.stockat_end =
            eachData.stockat_end !== ""
              ? parseFloat(eachData.stockat_end).toLocaleString("en-US")
              : "";

          eachData.stockatend_kg =
            eachData.stockatend_kg !== ""
              ? parseFloat(eachData.stockatend_kg).toLocaleString("en-US")
              : "";
        });
        setData(res.data);
        console.log(res.data);
        console.log("Works");
      })
      .catch(function (res) {
        console.log(res);
      });
  }, [date[1], year]);

  const excel = () => {
    const XLSX = xlsx;
    const workbook = utils.book_new();
    const worksheet = utils.json_to_sheet(data);
    utils.book_append_sheet(workbook, worksheet, "Report");
    writeFileXLSX(workbook, "Report.xlsx");
  };
  const print = useReactToPrint({
    content: () => sheetRef.current,
  });

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
                Select Month
              </Typography>
            </Grid>
            <Grid
              sx={{
                display: "flex",
              }}
              item
              lg={2}
            >
              <DateRangePicker
                className="py-3"
                placeholder="Pick date"
                onChange={setDate}
                size="xl"
                inputFormat="DD/MM/YYYY"
                labelFormat="DD/MM/YYYY"
                icon={<IconCalendar size={16} />}
              />
            </Grid>
            <Grid item lg={1}>
              <TextField
                fullWidth
                label="Year"
                value={year}
                select
                onChange={(e) => setYear(e.target.value)}
              >
                <MenuItem key={1} value="2019">
                  2019
                </MenuItem>
                <MenuItem key={2} value="2020">
                  2020
                </MenuItem>
                <MenuItem key={3} value="2021">
                  2021
                </MenuItem>
                <MenuItem key={4} value="2022">
                  2022
                </MenuItem>
                <MenuItem key={5} value="2024">
                  2023
                </MenuItem>
                <MenuItem key={6} value="2025">
                  2025
                </MenuItem>
                <MenuItem key={7} value="2026">
                  2026
                </MenuItem>
                <MenuItem key={8} value="2027">
                  2027
                </MenuItem>
                <MenuItem key={9} value="2028">
                  2028
                </MenuItem>
                <MenuItem key={10} value="2029">
                  2029
                </MenuItem>
                <MenuItem key={11} value="2030">
                  2030
                </MenuItem>
              </TextField>
            </Grid>
            <Grid
              sx={{
                marginLeft: 20,
                display: "flex",
                flexDirection: "row",
                alignItems: "space-between",
                justifyContent: "space-between",
              }}
            >
              <Button onClick={excel} component="a" disableRipple variant="contained">
                Excel
              </Button>

              <Button
                onClick={print}
                sx={{
                  ml: 5,
                }}
                component="a"
                disableRipple
                variant="contained"
              >
                Print
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Container maxWidth="ml">
          <div ref={sheetRef}>
            <Card maxWidth="lg">
              <Table title={title} data={data} columns={issuedcolumns} />
            </Card>
          </div>
        </Container>
      </Box>
    </>
  );
};

MonthlyReport.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default MonthlyReport;
