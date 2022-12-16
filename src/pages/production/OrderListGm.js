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
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import Table from "../../components/Table";
import ToolBar from "../../components/ToolBar";
import PAxios from "../../components/productionWxios";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRouter } from "next/router";
import Router from "next/router";

const GmOrderList = () => {
  const [data, setData] = useState([]);
  const [type, setType] = useState("RAW");
  const router = useRouter();

  const handleChange = (event) => {
    setType(event.target.value);
    PAxios.post("/showAssetByType", { materialType: type })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    { title: "Name", field: "final_product" },
    { title: "Description", field: "final_desc" },
    { title: "Specification", field: "final_spec" },
    { title: "Quantity", field: "final_quant" },
    { title: "Measure Unit", field: "final_measureunit" },
    { title: "Color", field: "final_color" },
    { title: "Order For", field: "order_reciver" },
    { title: "Date Ordered", field: "order_date" },
    { title: "Status", field: "final_status" },
    // { title: "Action", field: "final_status" },
  ];
  useEffect(() => {
    PAxios.get("/showOrderGM")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Order List | Proplast</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="ml">
          <Grid Container spacing={3}>
            <Grid item xg={12} lg={12} sm={12}>
              <Card maxWidth="lg">
                {/* <Table title="GM Production Order" data={data} columns={columns} actions={"true"} /> */}
                <Table
                  title="Account Payable"
                  data={data}
                  columns={columns}
                  options={{
                    actionsColumnIndex: -1,
                    selection: true,
                  }}
                  actions={[
                    (rowData) => ({
                      icon: () => <ArrowForwardIosIcon sx={{ color: "primary.main" }} />,
                      tooltip: "Details",
                      onClick: (e) =>
                        Router.push({
                          pathname: "/production/addproduct",
                          query: { id: rowData.id },
                        }),
                      // console.log(e),
                    }),
                  ]}
                  localization={{
                    header: {
                      actions: "Actions",
                    },
                  }}
                />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

GmOrderList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default GmOrderList;
