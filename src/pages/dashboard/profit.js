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

const Profit  = () => {
  const [data, setData] = useState([]);
  const columns = [
    { title: "Date", field: "salesID" },
    { title: "Sales Num", field: "salesId" },
    { title: "Total Production Cost", field: "production_cost" },
    { title: "Total Sales", field: "total_sales" },
    { title: "Profit", field: "profit" },
  ];
  useEffect(() => {
    saxios.get("/getprofitDetail").then((res) => {
      console.log("reso", res.data);
      setData(res.data);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Profit </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="ml">
          <ToolBar title="More Detail" href="/finance/accountRecivableSales" />
        
          <Card maxWidth="lg">
            <Table
              title="Profit  Sales List"
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

Profit .getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Profit ;
