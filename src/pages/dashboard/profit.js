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

const Profit = () => {
  const [data, setData] = useState([]);
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  }
  const columns = [
    { title: "Date", field: "sales_date" },
    { title: "Sales Num", field: "salesId" },
    { title: "Customer Name", field: "customer_name" },
    { title: "Total Sales", field: "total_sales" },
    { title: "Profit", field: "profit" },
  ];
  useEffect(() => {
    saxios.get("/getprofitDetail").then((res) => {
      console.log("reso", res.data);
      res.data.map((eachData) => {
        eachData.sales_date = convert(eachData.sales_date);
        eachData.total_sales = parseFloat(eachData.total_sales).toLocaleString("en-US");
        eachData.profit = parseFloat(eachData.profit).toLocaleString("en-US");
      });
      setData(res.data);
    });
  }, []);

  async function downloadExcel() {
    try {
      const response = await saxios.get("/generateExcel", {
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "excel.xlsx";
      link.click();
    } catch (error) {
      console.error(error);
    }
  }

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
          <ToolBar title="More Detail" href="/finance/addpettycash" />
          <button onClick={downloadExcel}>Download Excel</button>
          <Card maxWidth="lg">
            <Table
              title="Profit Sales List"
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

Profit.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Profit;
