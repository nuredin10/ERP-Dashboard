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
import saxios from "../../components/salesAxios";

const Uncollected = () => {
  const [data, setData] = useState([]);
  const columns = [
    { title: "Date", field: "sales_date" },
    { title: "sales Num", field: "salesId" },
    { title: "Address", field: "customer_address" },
    { title: "Total", field: "totalCash" },
    { title: "Advance Payment", field: "advances" },
  ];
  useEffect(() => {
    saxios.get("/salesOnlyUncollected").then((res) => {
      console.log("reso", res.data);
      setData(res.data);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Uncollected</title>
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
              title="Uncollected Sales List"
              data={data}
              columns={columns}
              options={{
                actionsColumnIndex: -1,
                selection: true,
              }}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};

Uncollected.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Uncollected;
