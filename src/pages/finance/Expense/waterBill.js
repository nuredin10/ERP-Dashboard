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
import saxios from "../../../components/salesAxios";

const Vender = () => {
  const [data, setData] = useState([]);
  const columns = [
    { title: "Customer Name", field: "customer_name" },
    { title: "Phone Number", field: "customer_phone" },
    { title: "Delivery Mode", field: "delivery_mode" },
    { title: "Address", field: "customer_address" },
  ];
  useEffect(() => {
    saxios.get("/showCustomers").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Employee Expense</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="ml">
          <Typography className="text-[#61482A]" variant="h4">
            Add Water Bill Expense
          </Typography>
          <ToolBar title="Add Water Bill Expense" href="/finance/Expense/addExpense" />

          <Card maxWidth="lg">
            <Table
              title="Water Bill Expense List"
              data={data}
              columns={columns}
              options={{
                actionsColumnIndex: -1,
                selection: true,
              }}
              actions={[
                {
                  tooltip: "Remove All Selected Users",
                  icon: "delete",
                  onClick: (evt, data) => alert("You want to delete " + data.length + " rows"),
                },
              ]}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};

Vender.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Vender;
