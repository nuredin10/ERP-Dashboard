// import React,{useState,useEffect} from 'react'
// import Head from 'next/head';
// import {
//   Box,
//   Button,
//   Checkbox,
//   Container,
//   FormHelperText,
//   Link,
//   TextField,
//   Card,
//   Typography
// } from '@mui/material';
// import { DashboardLayout } from '../../../../components/dashboard-layout';
// import Table from '../../../../components/Table'
// import ToolBar from '../../../../components/ToolBar'

// const FinishedGoods = () => {
//   const [data, setData] = useState([]);
//   const columns = [
//     { title: "Name", field: "finished_name" },
//     { title: "Quantity", field: "finished_quantity" },
//     { title: "Description", field: "finished_description" },
//     { title: "Material Code", field: "finished_materialcode" },
//     { title: "Specification", field: "finished_spec" },
//     { title: "Material Unit", field: "finished_materialunit" },
//     { title: "Value", field: "finished_value" },
//     { title: "Reference Number", field: "finished_referncenum" },
//     { title: "Date", field: "finished_date" },
//     { title: "Remark", field: "finished_remark" },
//   ];
//   useEffect(() => {
//     fetch("http://versavvy.com:59000/finishedMaterial")
//       .then((resp) => resp.json())
//       .then((resp) => setData(resp));
//   }, []);
//   return (
//     <>
//       <Head>
//         <title>
//         Finished Goods
//         </title>
//       </Head>
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           py: 8
//         }}
//       >
//         <Container maxWidth="ml">
//         <ToolBar title="SIV"
//         href="/warehouse/stockList/FinishedGoods/addSiv" />

//           {/* <Typography
//             sx={{ mb: 3 }}
//             variant="h4"
//           >
//             Raw Material stockList
//           </Typography> */}
//           <Card maxWidth="lg">

//         <Table
//           title='Finished Goods'
//           data={data}
//           columns={columns}
//           // actions={[
//           //   rowData => ({
//           //     icon: () => <NextLink href={`/procurment/purchaserequest/rfq`}><NavigateNextIcon /></NextLink>,
//           //     tooltip: 'Edit ',
//           //     onClick:()=> (rowData)
//           //   })
//           // ]}
//           />

//         {/* <Typography sx={{ mb: 3 }} variant="h4">
//           Supplier
//         </Typography> */}
//       </Card>
//         </Container>
//       </Box>
//     </>
//   )
// };

// FinishedGoods.getLayout = (page) => (
//   <DashboardLayout>
//     {page}
//   </DashboardLayout>
// );

// export default FinishedGoods;

import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Box, Container, Typography, Grid, Divider } from "@mui/material";
import { DashboardLayout } from "../../../../components/dashboard-layout";

// import styles from '../styles/Home.module.css';
import OrdersToolBar from "../../../../components/order/order-toolbar";
import { OrderResults } from "../../../../components/order/order-results";
import RightDrawer from "../../../../components/order/RightDrawer";

const FinishedGoods = () => {
  const [drawer, setDrawer] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [summery, setSummery] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:59000/finishedMaterial")
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
              drawer={drawer  }
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
