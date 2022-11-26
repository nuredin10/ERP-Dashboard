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
import FAxios from "../../components/financeAxios";
import InfoIcon from "@mui/icons-material/Info";

const AccountRecieveable = () => {
  const [data, setData] = useState([]);
  const columns = [
    { title: "Name", field: "recevable_name" },
    { title: "Tim Number", field: "recevable_tin" },
    { title: "Amount", field: "recevable_amount" },
    { title: "Start Date", field: "recivable_stdate" },
    { title: "End Date", field: "recevable_endate" },
    { title: "Status", field: "recevable_status" },
  ];
  useEffect(() => {
    FAxios.get("/showaccountRecivable")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Account Recieveable | Proplast</title>
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
              title="Account Recieveable"
              data={data}
              columns={columns}
              actions={[
                (rowData) => ({
                  icon: () => <InfoIcon sx={{ color: "primary.main" }} />,
                  tooltip: "Details",
                  onClick: () => details(rowData.reason_id),
                }),
              ]}
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

AccountRecieveable.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AccountRecieveable;
