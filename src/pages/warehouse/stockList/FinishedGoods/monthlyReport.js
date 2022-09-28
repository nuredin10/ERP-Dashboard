import React, { useState, useEffect } from 'react'
import Head from 'next/head';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Card,
  Typography
} from '@mui/material';
import { DashboardLayout } from '../../../../components/dashboard-layout';
import Table from '../../../../components/Table'
import ToolBar from '../../../../components/ToolBar'
import { useRouter } from 'next/router'
import axios from 'axios'

const MonthlyReport = () => {

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

  const columns = [
    { title: "Date", field: "summery_date" },
    { title: "Stock at Hand", field: "stockat_hand" },
    { title: "Stock Recieved", field: "stock_recieved" },
    { title: "Stock Issued", field: "stock_issued" },
    { title: "Department Issued", field: "department_issued" },
    { title: "stock at End", field: "stockat_end" },
  ];

  useEffect(() => {
    const req = {
      id: props.selectedOrder,
      materialType: "FIN",
      selectedMonth: ""
    }

    axios.post("http://localhost:59000/showSummeryByMonth", req)
      .then(function (res) {
        setData(res.data)
      })
      .catch(function (res) {
        console.log(res)
      })

    
  }, []);

  useEffect(()=>{
    data.map((e) => {
      e.stock_issued == "" ? setRecivedSummery((recievedSummery) => [...recievedSummery, e]) : setIssuedSummery((issuedSummery) => [...issuedSummery, e])
    })
  },[data])
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
        <Container maxWidth="ml">
          <Card maxWidth="lg">
            <Table
              title='Monthly Stock Recieved Report'
              data={recievedSummery}
              columns={columns}
            />  
          </Card>
          <Card maxWidth="lg">
            <Table
              title='Monthly Stock Issued Report'
              data={issuedSummery}
              columns={columns}
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
