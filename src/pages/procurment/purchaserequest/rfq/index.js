import React, { useState, useEffect } from "react";
import Head from "next/head";
import Table from "../../../../components/Table";
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
import { DashboardLayout } from "../../../../components/dashboard-layout";
import ToolBar from '../../../../components/ToolBar'

const Rfq = () => {
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
        <title>Request for Quatations</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        
        <ToolBar title='Request for Quatations' href='/procurment/purchaserequest/rfq/add'/>
        <Card maxWidth="lg">
        
          <Table title='Request for Quatations' data={data} columns={columns}></Table>

          {/* <Typography sx={{ mb: 3 }} variant="h4">
            Supplier
          </Typography> */}
        </Card>
      </Box>
    </>
  );
};

Rfq.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Rfq;
