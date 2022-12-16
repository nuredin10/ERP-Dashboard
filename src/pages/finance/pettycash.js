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
import FAxios from '../../components/financeAxios'

const PettyCash = () => {
  const [data, setData] = useState([]);
  const columns = [
    { title: "To", field: "pay_for" },
    { title: "Cash Amount", field: "cash_amount" },
    { title: "Reason", field: "pay_reason" },
    { title: "Prepared By", field: "accountatnt_name" },
    { title: "Payed By", field: "payed_by" },
    { title: "Checked By", field: "checked_by" },
    { title: "Receipt Number ", field: "RecitNum" },
  ];
  useEffect(() => {

    FAxios.get('/showPettyCash')
    .then((res) =>{
      console.log(res)
      setData(res.data);
    })
    .catch((err) =>{
      console.log(err)
    })

  }, []);

  return (
    <>
      <Head>
        <title>Petty Cash | Proplast</title>
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
              title="Petty Cash"
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

PettyCash.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default PettyCash;
