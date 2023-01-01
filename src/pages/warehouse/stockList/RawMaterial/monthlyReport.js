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
import { DateRangePicker } from '@mantine/dates';

const MonthlyReport = () => {
  const [selectMonth, setSelectMonth] = useState('')
  const sheetRef = useRef();
  const handleMonthChange = (e) => {
    setSelectMonth(e.target.value)
  }
  const router = useRouter()

  const router2 = useRouter();
  const { id } = router2.query;

  const [data, setData] = useState([]);
  const [date, setDate] = useState([]);

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
    { title: "Stock Recieved", field: "stock_recieved" },
    { title: "Department Issued", field: "department_issued" },
    { title: "stock at End", field: "stockat_end" },
  ];

  useEffect(() => {
    waxios.post("/showSummeryByMonth", {
      id: id,
      materialType: "RAW",
      selectedMonth: date
    })
      .then(function (res) {
        setData(res.data);
        console.log(res.data);
        console.log('Works');
      })
      .catch(function (res) {
        console.log(res)
      })
  }, [date]);

  useEffect(() => {
    setRecivedSummery([])
    setIssuedSummery([])
    data.map((e) => {
      e.stock_issued == "" ? setRecivedSummery((recievedSummery) => [...recievedSummery, e]) : setIssuedSummery((issuedSummery) => [...issuedSummery, e])
    })
  }, [selectMonth, data])

  console.log(date);
  const excel = () => {

    const XLSX = xlsx;
    const workbook = utils.book_new();
    const worksheet = utils.json_to_sheet(data);
    utils.book_append_sheet(workbook, worksheet, "Report");
    writeFileXLSX(workbook, "Report.xlsx");
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
              <DateRangePicker
                placeholder="Pick date"
                onChange={setDate}
              />
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
