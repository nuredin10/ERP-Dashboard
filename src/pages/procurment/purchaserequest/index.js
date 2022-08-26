import React, { useState, useEffect } from "react";
import Head from "next/head";
import Table from "../../../components/Table";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  Card
} from "@mui/material";
import { DashboardLayout } from "../../../components/dashboard-layout";
import ToolBar from '../../../components/ToolBar'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Router } from "@material-ui/icons";
import NextLink from 'next/link';

const PurchaseRequest = () => {
  const [data, setData] = useState([]);

  const columns = [
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Phone", field: "phone" },
  ];

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((resp) => resp.json())
      .then((resp) => setData(resp));
  }, []);
  return (
    <>
      <Head>
        <title>purchase request</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Typography variant='h5' sx={{mb: 4, mt: -2, ml: 3}}>Purchase Request</Typography>
        {/* <ToolBar title='Supplier' href='/procurment/supplier/add'/> */}
        <Card maxWidth="lg">
        
          <Table 
            title='Purchase Request' 
            data={data} 
            columns={columns}
            actions={[
              rowData => ({
                icon: () => <NextLink href={`/procurment/purchaserequest/rfq`}><NavigateNextIcon /></NextLink>,
                tooltip: 'Edit ',
                onClick:()=> (rowData)
              })
            ]}
            />

          {/* <Typography sx={{ mb: 3 }} variant="h4">
            Supplier
          </Typography> */}
        </Card>
      </Box>
    </>
  );
};

PurchaseRequest.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default PurchaseRequest;
