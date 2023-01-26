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
import waxios from "../../components/wareHouseAxios";

const RequestedOrders = () => {
  const [data, setData] = useState([]);
  const columns = [
    { title: "Date", field: "request_date" },
    { title: "FS NUMBER", field: "request_date" },
    { title: "Request Material", field: "request_material" },
    { title: "Request Person", field: "request_person" },
    { title: "UOM", field: "request_person" },
    { title: "Quantity", field: "request_qty" },
    { title: "Department", field: "request_department" },
    { title: "Status", field: "pur_status" },
  ];
  useEffect(() => {
    waxios.get("/showPurchaseRequested").then((res) => {
      console.log(res.data);
      setData(res.data);
    });
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
          <Typography className="text-[#61482A]" variant="h4">
            Purchase Orders
          </Typography>
          <Card maxWidth="lg">
            <Table
              data={data}
              columns={columns}

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
