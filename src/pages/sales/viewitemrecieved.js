import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Box, Container, Typography, Grid, Divider } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";

import OrdersToolBar from "../../components/sales/salesViewItem/order-toolbar";
import { OrderResults } from "../../components/sales/salesViewItem/order-results";
import RightDrawer from "../../components/sales/salesViewItem/RightDrawer";

const FinishedGoods = () => {
  const [drawer, setDrawer] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [summery, setSummery] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/showAcceptedRequestions")
      .then((resp) => resp.json())
      .then((resp) => setData(resp));
  }, []);

  return (
    <>
      <Head>
        <title>Orders | Material Kit</title>
      </Head>
      <Box component="main">
        <Container maxWidth={false}>
          <Box>
            <OrdersToolBar drawer={drawer}></OrdersToolBar>
            <OrderResults
              drawer={drawer}
              setDrawer={setDrawer}
              setSelectedOrder={setSelectedOrder}
              setSummery={setSummery}
              data={data}
            />
            <RightDrawer
              drawer={drawer}
              setDrawer={setDrawer}
              selectedOrder={selectedOrder}
              summery={summery}
            />
            <Divider sx={{ borderColor: "gray", mt: 3 }} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

FinishedGoods.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default FinishedGoods;
