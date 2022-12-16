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
import { DashboardLayout } from "../../components/dashboard-layout";
import Table from "../../components/Table";
import ToolBar from "../../components/ToolBar";
import waxios from '../../components/wareHouseAxios';

const RequestedOrders = () => {
  const [data, setData] = useState([]);
  const columns = [
    { title: "Request Material", field: "request_material" },
    { title: "Request Person", field: "request_person" },
    { title: "Quantity", field: "request_qty" },
    { title: "Date", field: "request_date" },
    { title: "Department", field: "request_department" },
    { title: "Status", field: "pur_status" },

  
  ];
  useEffect(() => {

    waxios.get('/showPurchaseRequested')
    .then((res) =>{
      console.log(res.data)
      setData(res.data);
    })

    // fetch("http://localhost:59000/showCustomers")
    //   .then((resp) => resp.json())
    //   .then((resp) => setData(resp));
  }, []);

  return (
    <>
      <Head>
        <title>Requested Orders</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="ml">
          {/* <ToolBar title="customer" href="/sales/Customers/addCustomers" /> */}
          <Card maxWidth="lg">
            <Table
              title="Purchase Orders"
              data={data}
              columns={columns}
            //   options={{
            //     actionsColumnIndex: -1,
            //     selection: true,
            //   }}
            //   actions={[
            //     {
            //       tooltip: "Remove All Selected Users",
            //       icon: "delete",
            //       onClick: (evt, data) => alert("You want to delete " + data.length + " rows"),
            //     },
            //   ]}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};

RequestedOrders.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default RequestedOrders;
