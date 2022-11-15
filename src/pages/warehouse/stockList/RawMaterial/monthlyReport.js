import React, { useState, useEffect, useRef } from 'react'
import Head from 'next/head';
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
import { DashboardLayout } from '../../../../components/dashboard-layout';
import Table from '../../../../components/Table'
import ToolBar from '../../../../components/ToolBar'
import { useRouter } from 'next/router'
import waxios from '../../../../components/wareHouseAxios'
// import xlx
import { read, set_cptable, writeFileXLSX, utils } from "xlsx";
import xlsx from 'xlsx';
import { FormControlUnstyledContext } from '@mui/base';
import ReactToPrint, { useReactToPrint } from 'react-to-print';

// import * as cptable from 'xlsx/dist/xpexcel.full.mjs';
// set_cptable(cptable);

const MonthlyReport = () => {
  const [selectMonth, setSelectMonth] = useState('')
  const sheetRef = useRef();
  const handleMonthChange = (e) => {
    setSelectMonth(e.target.value)
  }
  const router = useRouter()
  const {
    query: { selectedOrder }
  } = router

  const props = {
    selectedOrder   
  }

  const [data, setData] = useState([]);

  const [recievedSummery, setRecivedSummery] = useState([]);
  const [issuedSummery, setIssuedSummery] = useState([]);

  const recievedcolumns = [
    { title: "Date", field: "summery_date" },
    { title: "Stock at Hand", field: "stockat_hand" },
    { title: "Stock Recieved", field: "stock_recieved" },
    { title: "Department Issued", field: "department_issued" },
    { title: "stock at End", field: "stockat_end" },
  ];
  const issuedcolumns = [
    { title: "Date", field: "summery_date" },
    { title: "Stock at Hand", field: "stockat_hand" },
    { title: "Stock Issued", field: "stock_issued" },
    { title: "Department Issued", field: "department_issued" },
    { title: "stock at End", field: "stockat_end" },
  ];

  const req = {
    id: props.selectedOrder,
    materialType: "RAW",
    selectedMonth: selectMonth
  }
  useEffect(() => {

    waxios.post("/showSummeryByMonth", req)
      .then(function (res) {
        setData(res.data);
        console.log(res.data);
        // console.log("new req")
      })
      .catch(function (res) {
        console.log(res)
      })
    console.log(req)
  }, [selectMonth]);

  useEffect(() => {
    setRecivedSummery([])
    setIssuedSummery([])
    data.map((e) => {
      e.stock_issued == "" ? setRecivedSummery((recievedSummery) => [...recievedSummery, e]) : setIssuedSummery((issuedSummery) => [...issuedSummery, e])
    })
  }, [selectMonth, data])


  const excel = () => {
    const data2 = [
      {
        'Date': '12-1201-12',
        'Email': 'natty@gail.com',
        'Name': 'Natnael Engeda'
      },
    ];

    const XLSX = xlsx;
    const workbook = utils.book_new();
    const worksheet = utils.json_to_sheet(data2);
    // console.log(worksheet)
    utils.book_append_sheet(workbook, worksheet, "Report");
    writeFileXLSX(workbook, "Report.xlsx");
    // var table_elt = sheetRef;
    // var workbook = XLSX.utils.table_to_book(table_elt);
    // var ws = workbook.Sheets["Sheet1"];

    // XLSX.writeFile(workbook, "Report.xlsb");
  }
  const print = useReactToPrint({
    content: () => sheetRef.current
  })

  return (
    <>
      <Head>
        <title>
          Monthly Report
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Grid
          container
          spacing={1}
          sx={{
            mb: 2,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <Grid
            container
            spacing={1}
            sx={{
              mb: 2,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}
          >
            <Grid item lg={2}>
              <Typography variant="h6" sx={{ textAlign: "center" }}>Select Month</Typography>
            </Grid>
            <Grid item lg={2}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Job Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="JobType"
                  value={selectMonth}
                  label="Month"
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
            </Grid>
            <Grid
              sx={{
                marginLeft: 20,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'space-between',
                justifyContent: 'space-between'
              }}
            >
              <Button
                onClick={excel}
                component="a"
                disableRipple
                variant='contained'>
                Excel
              </Button>

              <Button
                onClick={print}
                sx={{
                  ml: 5
                }}
                component="a"
                disableRipple
                variant='contained'>
                Print
              </Button>
            </Grid>
          </Grid>

        </Grid>

        <Container maxWidth="ml">
          <div
            ref={sheetRef}
          >
            <Card maxWidth="lg">
              <Table
                title='Monthly Stock Recieved Report'
                data={recievedSummery}
                columns={recievedcolumns}
              />
            </Card>
            <Card maxWidth="lg">
              <Table
                title='Monthly Stock Issued Report'
                data={issuedSummery}
                columns={issuedcolumns}
              />
            </Card>
          </div>
        </Container>
      </Box>
    </>
  )
};

MonthlyReport.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default MonthlyReport;
