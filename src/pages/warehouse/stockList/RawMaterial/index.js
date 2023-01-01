import React, { useState, useEffect } from "react";
import Head from "next/head";
import { DashboardLayout } from "../../../../components/dashboard-layout";
import waxios from "../../../../components/wareHouseAxios";
import axios from "axios";
// import styles from '../styles/Home.module.css';
import Table from "../../../../components/Table";
import SummarizeIcon from "@mui/icons-material/Summarize";
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
  Divider,
} from "@mui/material";
import OrdersToolBar from "../../../../components/rawMaterials/order-toolbar";
import { OrderResults } from "../../../../components/rawMaterials/order-results";
import RightDrawer from "../../../../components/rawMaterials/RightDrawer";
import Router from "next/router";

const FinishedGoods = () => {
  const [drawer, setDrawer] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [summery, setSummery] = useState([]);
  const [data, setData] = useState([]);
  // const [width, setWidth] = useState();
  var width;
  // const size = useWindowSize();
  if (typeof window != "undefined") {
    console.log("You are on the browser");
    console.log(window.innerWidth);
    width = window.innerWidth;
  } else {
    console.log("You are on the server");
  }
  const columns = [
    { title: "Date", field: "raw_date" },
    { title: "Name", field: "raw_name" },
    { title: "Material Code", field: "raw_materialcode" },
    { title: "Quantity", field: "raw_quantity" },
    { title: "Material Unit", field: "raw_materialunit" },
    
  ];

  useEffect(() => {
    waxios
      .get("/rawmaterials")
      .then((response) => {
        setData(response.data);
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  return (
    <>
      <Head>
        <title>RawMaterials | Proplast</title>
      </Head>
      <Box
        component="main"
        sx={
          {
            // display: ''
          }
        }
      >
        <Container
          sx={{
            display: {
              xs: "none",
              lg: "block",
            },
          }}
          maxWidth="ml"
        >
          <Card maxWidth="lg">
            {data && (
              <Table
                title="Raw Materials"
                data={data}
                columns={columns}
                actions={[
                  (rowData) => ({
                    icon: () => <SummarizeIcon size="small" />,
                    tooltip: "Summary",
                    onClick: () => {
                      Router.push({
                        pathname: "/warehouse/stockList/RawMaterial/monthlyReport",
                        query: {
                          id: rowData.id,
                        },
                      });
                    },
                  }),
                ]}
                localization={{
                  header: {
                    actions: "SUMMARY",
                  },
                }}
              ></Table>
            )}
          </Card>
        </Container>

        <Container
          sx={{
            display: {
              xs: "block",
              lg: "none",
            },
          }}
          maxWidth={false}
        >
          <Box>
            <OrdersToolBar drawer={drawer}></OrdersToolBar>
            <OrderResults
              drawer={drawer}
              setDrawer={setDrawer}
              setSelectedOrder={setSelectedOrder}
              setSummery={setSummery}
              data={data}
              width={width}
            />
            <Box>
              <RightDrawer
                drawer={drawer}
                setDrawer={setDrawer}
                selectedOrder={selectedOrder}
                summery={summery}
              />
            </Box>
            <Divider sx={{ borderColor: "gray", mt: 3 }} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

FinishedGoods.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default FinishedGoods;
