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
      { title: "Date", field: "date_expense" },
      { title: "Description", field: "Item_description" },
      { title: "Paid amount", field: "total_price" },
      { title: "Departemnt", field: "purchase_department" },
      { title: "FS Number", field: "fs_number" },
      { title: "remark", field: "remark" },
    ];
    useEffect(() => {
      saxios.post("/showExpense", {
        Cat: "PHONE",
      }).then((res) => {
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
            Add Phone Expense
          </Typography>
          <ToolBar title="Add Phone Expense" href="/finance/Expense/addPhone" />

          <Card maxWidth="lg">
            <Table
              title="Phone Expense List"
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
