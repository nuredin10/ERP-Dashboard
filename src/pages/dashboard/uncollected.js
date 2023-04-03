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
} from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import Table from "../../components/Table";
import ToolBar from "../../components/ToolBar";
import saxios from "../../components/salesAxios";
import { useReactToPrint } from "react-to-print";
import PrintLayout from "../../components/PrintLayout";

const Uncollected = () => {
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
    { title: "sales Num", field: "salesID" },
    { title: "Name", field: "customer_name" },
    { title: "Total", field: "cus_total" },
    { title: "Advance Payment", field: "cus_advance" },
    { title: "Remaining", field: "cust_remaining" },
  ];
  useEffect(() => {
    saxios.get("/salesOnlyUncollected").then((res) => {
      console.log("reso", res.data);
      res.data.map((eachData) => {
        eachData.sales_date = convert(eachData.order_date);
        eachData.totalCash = parseFloat(eachData.cus_total).toLocaleString("en-US");
        eachData.advances = parseFloat(eachData.cus_advance).toLocaleString("en-US");
        eachData.balance = parseFloat(eachData.cust_remaining).toLocaleString("en-US");
      });
      setData(res.data);
    });
  }, []);

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
          <Box className="flex gap-4 items-center mb-5">
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
          <div ref={sheetRef}>
            {/* <ToolBar title="customer" href="/sales/Customers/addCustomers" /> */}
            <PrintLayout documentNo={documentNo} isPrinting={isPrinting}>
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
            </PrintLayout>
          </div>
        </Container>
      </Box>
    </>
  );
};

Uncollected.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Uncollected;
