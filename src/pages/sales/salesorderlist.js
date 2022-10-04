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
import { DashboardLayout } from '../../components/dashboard-layout';
import Table from '../../components/Table'
import ToolBar from '../../components/ToolBar'

const SalesOrderList = () => {
  const [data, setData] = useState([]);
  const columns = [
    { title: "Company Name", field: "company_name" },
    { title: "Date", field: "order_date" },
    { title: "Customer Name", field: "customer_name" },
    { title: "bussiness Name", field: "cus_bussinessName" },
    { title: "customer phoneNum", field: "cus_phoneNum" },
    { title: "email", field: "cus_email" },
    { title: "ship contactName", field: "ship_contactName" },
    { title: "Address1", field: "ship_address1" },
    { title: "Address2", field: "ship_address2" },
    { title: "TinNumber", field: "cust_tinNumber" },
  ];

  useEffect(() => {
    fetch("http://localhost:4000/showSalesOrder")
      .then((resp) => resp.json())
      .then((resp) => setData(resp));
  }, []);
  return (
    <>
      <Head>
        <title>
          Sales Order List
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
          {/* <ToolBar title="SIV" 
        href="/warehouse/stockList/Accessories/addSiv"  /> */}

          {/* <Typography
            sx={{ mb: 3 }}
            variant="h4"
          >
            Raw Material stockList
          </Typography> */}
          <Card maxWidth="lg">

            <Table
              title='Sales Order List'
              data={data}
              columns={columns}
            // options={{
            //   actionsColumnIndex: -1,
            //   selection: true,

            // }}
            // actions={[
            //   {
            //     tooltip: 'Remove All Selected Users',
            //     icon: 'delete',
            //     onClick: (evt, data) => alert('You want to delete ' + data.length + ' rows')
            //   }
            // ]}
            // actions={[
            //   rowData => ({
            //     icon: () => <NextLink href={`/procurment/purchaserequest/rfq`}><NavigateNextIcon /></NextLink>,
            //     tooltip: 'Edit ',
            //     onClick:()=> (rowData)
            //   })
            // ]}
            />

            {/* <Typography sx={{ mb: 3 }} variant="h4">
          Supplier
        </Typography> */}
          </Card>
        </Container>
      </Box>
    </>
  )
};






SalesOrderList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default SalesOrderList;
