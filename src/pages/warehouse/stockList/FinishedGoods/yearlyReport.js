import React, { useState, useEffect } from 'react'
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

const MonthlyReport = () => {
  const [selectYear, setSelectYear] = useState('')

  const handleYearChange = (e) => {
    setSelectYear(e.target.value)
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
    materialType: "FIN",
    selectedYear: selectYear
  }
  useEffect(() => {

    waxios.post("/showSummeryByYear", req)
      .then(function (res) {
        setData(res.data)
        console.log("new req")
      })
      .catch(function (res) {
        console.log(res)
      })
    console.log(req)
  }, [selectYear]);

  useEffect(() => {
    setRecivedSummery([])
    setIssuedSummery([])
    data.map((e) => {
      e.stock_issued == "" ? setRecivedSummery((recievedSummery) => [...recievedSummery, e]) : setIssuedSummery((issuedSummery) => [...issuedSummery, e])
    })
  }, [selectYear, data])



  return (
    <>
      <Head>
        <title>
          Yearly Report
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Grid container spacing={1} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <Grid item lg={2}>
            <Typography variant="h6" sx={{ textAlign: "center" }}>Show this Year</Typography>
          </Grid>
          <Grid item lg={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Year
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="JobType"
                value={selectYear}
                label="Job Type"
                onChange={handleYearChange}
              >
                <MenuItem value="2022">2022</MenuItem>
                <MenuItem value="2023">2023</MenuItem>
                <MenuItem value="2024">2024</MenuItem>
                
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Container maxWidth="ml">
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
