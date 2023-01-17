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
    { title: "Stock Issued", field: "stock_issued" },
    { title: "stock at hand", field: "stockat_end" },
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

  // useEffect(() => {
  //   setRecivedSummery([])
  //   setIssuedSummery([])
  //   data &&
  //     data.map((e) => {
  //       e.stock_issued == "" ? setRecivedSummery((recievedSummery) => [...recievedSummery, e]) : setIssuedSummery((issuedSummery) => [...issuedSummery, e])
  //     })
  // }, [selectMonth, data])
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
    
      
          </Grid>
        </Grid>

      
      </Box>
    </>
  );
};

MonthlyReport.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default MonthlyReport;
