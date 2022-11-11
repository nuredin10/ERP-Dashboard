import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Card,
  Typography,
} from "@mui/material";
import { DashboardLayout } from "../../../components/dashboard-layout";
import Table from "../../../components/Table";
import ToolBar from "../../../components/ToolBar";
import AddIcon from '@mui/icons-material/Add';
import Router from 'next/router'
// import saxios from '../../../components/salesAxios';

const SalesSummery = () => {
  const [data, setData] = useState([]);
  const columns = [
    { title: "Material Name", field: "sold_name" },
    { title: "Quantity", field: "sold_qty" },
    { title: "Sold Date", field: "sold_date" },
    { title: "Description", field: "sold_description" },
    { title: "Employee ID", field: "sold_personid" },
    { title: "Sold Value", field: "sold_value" },
    { title: "Sold For", field: "sold_total" },
    { title: "Customer Name", field: "store_purchaserName" },
  ];
  useEffect(() => {
    
    saxios.get('/salesSummery')
    .then((res) =>{
      setData(res.data);
    })
    .catch((err) =>{
      console.log(err);
    })

    // fetch("/salesMod/salesSummery")
    //   .then((resp) => resp.json())
    //   .then((resp) => setData(resp));
  }, []);
  return (
    <>
      <Head>
        <title>Sales Quotation</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        {/* <Box maxWidth="ml" sx={{ mr: 5, float: 'right', mb: 2}}>
          <Button maxWidth="lg" variant="outlined" startIcon={<AddIcon/>} onClick={()=>Router.push('/sales/salesquotation/addquotation')} >Add Quotation</Button>
        </Box> */}
        <Container  maxWidth="ml" sx={{clear: 'right'}}>
          <Card maxWidth="lg">
            <Table title="Sales Summery" data={data} columns={columns} />
          </Card>
        </Container>
      </Box>
    </>
  );
};

SalesSummery.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default SalesSummery;
