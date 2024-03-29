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
import { DashboardLayout } from "../../components/dashboard-layout";
import Table from "../../components/Table";

import { useRouter } from "next/router";
import waxios from "../../components/wareHouseAxios";
// import xlx
import { read, set_cptable, writeFileXLSX, utils } from "xlsx";
import xlsx from "xlsx";
import { FormControlUnstyledContext } from "@mui/base";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { DateRangePicker } from "@mantine/dates";
import { Select } from "@mantine/core";
import { IconCalendar } from "@tabler/icons";
import axios from "axios";
import PrintLayout from "../../components/PrintLayout";

const MonthlyReport = () => {
  const [selectMonth, setSelectMonth] = useState("");
  const [isPrinting, setIsPrinting] = useState(false);
  const sheetRef = useRef();
  const [documentNo, setDocumentNo] = useState("");

  const router2 = useRouter();
  const title = "Sales Report";
  // const { id } = router2.query;
  // var nowYead = new
  const [data, setData] = useState([]);
  const [date, setDate] = useState([]);
  const [report, setReport] = useState([]);
  const [isReportSet, setIsReportSet] = useState(false);
  const columns = [
    { title: "Date", field: "order_date" },
    { title: "Name", field: "customer_name" },
    { title: "Fs Number", field: "salesID" },
    { title: "Payment status", field: "payment" },
    { title: "Amount", field: "cus_total" },
    { title: "Payment Advance", field: "cus_advance" },
    { title: "Payment Remaining", field: "cust_remaining" },
    { title: "Status", field: "status" },
  ];

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  }

  useEffect(() => {
    waxios
      .post("/showSalesByMonth", {
        selectedDate: { start: date[0], end: date[1] },
      })
      .then(function (res) {
        console.log("response", res.data);
        res.data.map((eachData) => {
          eachData.order_date = convert(eachData.order_date);
        });
        setData(res.data);
        let keys = [
          "id",
          "final_color",
          "final_diameter",
          "final_materialCode",
          "final_measureunit",
          "final_product",
          "final_quant",
          "tableData",
        ]; // keys to be removed from each object

        let newArr = res.data.map(
          ({
            [keys[0]]: _,
            [keys[1]]: __,
            [keys[2]]: ___,
            [keys[3]]: ____,
            [keys[4]]: _____,
            [keys[5]]: ______,
            [keys[6]]: _______,
            [keys[7]]: ________,
            ...rest
          }) => rest
        );
        setReport(newArr);

        if (!isReportSet) {
          setIsReportSet(true);
        }

      })
      .catch(function (res) {
        console.log(res);
      });
  }, [date[1]]);
  const getReport = () => report;

  const excel = () => {
    if (isReportSet) {
      const XLSX = xlsx;
      const workbook = utils.book_new();
      const worksheet = utils.json_to_sheet(report);
      utils.book_append_sheet(workbook, worksheet, "Report");
      writeFileXLSX(workbook, "Report.xlsx");
    } else {
      console.log("Report data is not set yet");
    }
  };
  const print = () => {
    setIsPrinting(true);
    setTimeout(() => {
      pip();
    }, 100);
  };
  const pip = useReactToPrint({
    onAfterPrint: () => {
      setIsPrinting(false);
    },
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
                  mr: 3,
                }}
                component="a"
                disableRipple
                variant="contained"
              >
                Print
              </Button>
              <TextField
                label="Document No"
                value={documentNo}
                onChange={(e) => setDocumentNo(e.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>

        <Container maxWidth="ml">
          <div ref={sheetRef}>
            <PrintLayout documentNo={documentNo} isPrinting={isPrinting}>
              <Card maxWidth="lg">
                <Table title={title} data={data} columns={columns} />
              </Card>
            </PrintLayout>
          </div>
        </Container>
      </Box>
    </>
  );
};

MonthlyReport.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default MonthlyReport;
