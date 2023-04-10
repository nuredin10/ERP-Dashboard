import React, { useState, useEffect, useRef } from "react";
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
  Grid,
} from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import Table from "../../components/Table";
import ToolBar from "../../components/ToolBar";
import saxios from "../../components/salesAxios";
import PrintLayout from "../../components/PrintLayout";
import xlsx, { utils, writeFileXLSX } from "xlsx";
import { useReactToPrint } from "react-to-print";

const Profit = () => {
  const [data, setData] = useState([]);
  const [isPrinting, setIsPrinting] = useState(false);
  const sheetRef = useRef();
  const [documentNo, setDocumentNo] = useState("");

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

  const excel = () => {
    const XLSX = xlsx;
    const workbook = utils.book_new();
    const worksheet = utils.json_to_sheet(data);
    utils.book_append_sheet(workbook, worksheet, "Report");
    writeFileXLSX(workbook, "Report.xlsx");
  };

  const print = () => {
    setIsPrinting(true);
    setTimeout(() => {
      pip();
    }, 100);
  };
  const pip = useReactToPrint({
    onAfterPrint: () => {
      setIsPrinting(false);
    },
    content: () => sheetRef.current,
  });

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
          <Grid
            sx={{
              marginLeft: 20,
              display: "flex",
              flexDirection: "row",
              alignItems: "space-between",
              justifyContent: "space-between",
            }}
          >
            <Button href="/finance/addpettycash" component="a" disableRipple variant="contained">
              More Detail
            </Button>
            <Button onClick={excel} component="a" disableRipple variant="contained">
              Excel
            </Button>
            <Box>
              <TextField
                label="Document No"
                value={documentNo}
                onChange={(e) => setDocumentNo(e.target.value)}
              />

              <Button
                onClick={print}
                sx={{
                  ml: 5,
                }}
                component="a"
                disableRipple
                variant="contained"
              >
                Print
              </Button>
            </Box>
          </Grid>
          <div ref={sheetRef}>
            <PrintLayout documentNo={documentNo} isPrinting={true}>
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
            </PrintLayout>
          </div>
        </Container>
      </Box>
    </>
  );
};

Profit.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Profit;
