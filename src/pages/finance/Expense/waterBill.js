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
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useSnackbar } from "notistack";
import Router from "next/router";

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
  const { enqueueSnackbar } = useSnackbar();
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  }
  useEffect(() => {
    saxios
      .post("/showExpense", {
        Cat: "WATER",
      })
      .then((res) => {
        res.data.map((eachData) => {
          eachData.date_expense = convert(eachData.date_expense);
          eachData.total_price =
            eachData.total_price !== ""
              ? parseFloat(eachData.total_price).toLocaleString("en-US")
              : "";
        });
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
          <ToolBar title="Add Water Bill Expense" href="/finance/Expense/addWaterbill" />

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
                (rowData) => ({
                  icon: () => <RemoveCircleOutlineIcon size="small" />,
                  tooltip: "Remove",
                  onClick: () => {
                    console.log(rowData);
                    saxios
                      .post("/deleteExpense", {
                        ID: rowData.id,
                      })
                      .then((res) => {
                        enqueueSnackbar("Deleted Successfully", { variant: "success" });
                        console.log(res.data);
                        Router.reload();
                      });
                  },
                }),
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
