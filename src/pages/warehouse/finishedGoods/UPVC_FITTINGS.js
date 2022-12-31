// import React, { useState, useEffect } from "react";
// import Head from "next/head";
// import {
//   Box,
//   Button,
//   Checkbox,
//   Container,
//   FormHelperText,
//   Link,
//   TextField,
//   Card,
//   Grid,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Typography,
//   Divider,
// } from "@mui/material";
// import { DashboardLayout } from "../../../components/dashboard-layout";
// import Table from "../../../components/Table";
// import waxios from "../../../components/wareHouseAxios";
// import SummarizeIcon from "@mui/icons-material/Summarize";
// import Router from "next/router";
// import OrdersToolBar from "../../../components/rawMaterials/order-toolbar";
// import { OrderResults } from "../../../components/rawMaterials/order-results";
// import RightDrawer from "../../../components/rawMaterials/RightDrawer";
// const FinishedGoods = () => {
//   const [drawer, setDrawer] = useState(false);
//   const [data, setData] = useState([]);
//   const [selectedOrder, setSelectedOrder] = useState([]);
//   const [summery, setSummery] = useState([]);
//   var width;
//   const [type, setType] = useState("PPR Elbow");
//   const handleChange = (event) => {
//     setType(event.target.value);

//     waxios
//       .post("/finishedMaterialbyCat", {
//         Cat: "UPVC FITTINGS",
//         Spec: type,
//       })
//       .then((response) => {
//         console.log(response.data, "ZSdc");
//         setData(response.data);
//       })
//       .catch((response) => {
//         console.log(response);
//       });
//   };
//   // const size = useWindowSize();
//   if (typeof window != "undefined") {
//     console.log("You are on the browser");
//     console.log(window.innerWidth);
//     width = window.innerWidth;
//   } else {
//     console.log("You are on the server");
//   }
//   const columns = [
//     { title: "Name", field: "finished_name" },
//     { title: "Quantity", field: "finished_quantity" },
//     { title: "Material Code", field: "finished_materialcode" },
//     { title: "Material Unit", field: "finished_materialunit" },
//     { title: "Date", field: "finished_date" },
//   ];
//   useEffect(() => {
//     waxios
//       .post("/finishedMaterialbyCat", {
//         Cat: "UPVC FITTINGS",
//         Spec: type,
//       })
//       .then((response) => {
//         console.log(response.data, "ZSdc");
//         setData(response.data);
//       })
//       .catch((response) => {
//         console.log(response);
//       });
//   }, []);

//   return (
//     <>
//       <Head>
//         <title>Finished Goods | Proplast</title>
//       </Head>
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           py: 8,
//         }}
//       >
//         <Container
//           sx={{
//             display: {
//               xs: "none",
//               lg: "block",
//             },
//           }}
//           maxWidth="ml"
//         >
//           <Grid Container spacing={3}>
//             <Grid item xg={4} lg={4} sm={12} sx={{ mb: 3 }}>
//               <Typography sx={{ mb: 3 }} variant="h6">
//                 SELECT OD
//               </Typography>
//               <FormControl>
//                 <InputLabel id="demo-simple-select-label">Select OD</InputLabel>
//                 <Select
//                   labelId="demo-simple-select-label"
//                   id="demo-simple-select"
//                   value={type}
//                   label="OD Type"
//                   onChange={handleChange}
//                 >
//                   <MenuItem value={"Elbow 90"}>Elbow 90</MenuItem>
//                   <MenuItem value={"Elbow 45"}>Elbow 45</MenuItem>
//                   <MenuItem value={"Y-branch"}>Y-branch</MenuItem>
//                   <MenuItem value={"Socket"}>Socket</MenuItem>
//                   <MenuItem value={"Reducer"}>Reducer</MenuItem>
//                   <MenuItem value={"Tee"}>Tee</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//           </Grid>
//           <Card maxWidth="lg">
//             <Table
//               title="UPVC FITTINGS"
//               data={data}
//               columns={columns}
//               actions={[
//                 (rowData) => ({
//                   icon: () => <SummarizeIcon size="small" />,
//                   tooltip: "Summary",
//                   onClick: () => {
//                     // console.log(rowData)
//                     Router.push({
//                       pathname: "/warehouse/stockList/FinishedGoods/monthlyReport",
//                       query: { id: rowData.id },
//                     });
//                   },
//                 }),
//               ]}
//               localization={{
//                 header: {
//                   actions: "SUMMARY",
//                 },
//               }}
//             />
//           </Card>
//         </Container>
//         <Container
//           sx={{
//             display: {
//               xs: "block",
//               lg: "none",
//             },
//           }}
//           maxWidth={false}
//         >
//           <Box>
//             <OrdersToolBar drawer={drawer}></OrdersToolBar>
//             <OrderResults
//               drawer={drawer}
//               setDrawer={setDrawer}
//               setSelectedOrder={setSelectedOrder}
//               setSummery={setSummery}
//               data={data}
//               width={width}
//             />
//             <Box>
//               <RightDrawer
//                 drawer={drawer}
//                 setDrawer={setDrawer}
//                 selectedOrder={selectedOrder}
//                 summery={summery}
//               />
//             </Box>
//             <Divider sx={{ borderColor: "gray", mt: 3 }} />
//           </Box>
//         </Container>
//       </Box>
//     </>
//   );
// };

// FinishedGoods.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// export default FinishedGoods;

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
import { DashboardLayout } from "../../../components/dashboard-layout";
import Table from "../../../components/Table";
import ToolBar from "../../../components/ToolBar";
import waxios from "../../../components/wareHouseAxios";
import SummarizeIcon from "@mui/icons-material/Summarize";
import Router from 'next/router';

const Summary = () => {
  const [data, setData] = useState([]);
  const [type, setType] = useState("RAW");
  const handleChange = (event) => {
    setType(event.target.value);
  };
  var columns;

  columns = [
    { title: "Date", field: "finished_date" },
    { title: "Description", field: "finished_diameter" },
    { title: "Material Code", field: "finished_materialcode" },
    { title: "Color", field: "color" },
    { title: "Stock At Hand", field: "finished_quantity" },
  ];

  const req = {
    Cat: "UPVC FITTINGS",
    Spec: type,
  };
  useEffect(() => {
    waxios
      .post("/finishedMaterialbyCat", req)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((response) => {
        console.log(response);
      });
  }, [type]);
  return (
    <>
      <Head>
        <title>Finished Good</title>
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
            <Grid item xg={4} lg={4} sm={12} sx={{ mb: 3 }}>
              <FormControl>
                <InputLabel id="demo-simple-select-label">Select Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="type"
                  onChange={handleChange}
                >
                  <MenuItem value={"Elbow 90"}>Elbow 90</MenuItem>
                  <MenuItem value={"Elbow 45"}>Elbow 45</MenuItem>
                  <MenuItem value={"Y-branch"}>Y-branch</MenuItem>
                  <MenuItem value={"Socket"}>Socket</MenuItem>
                  <MenuItem value={"Reducer"}>Reducer</MenuItem>
                  <MenuItem value={"Tee"}>Tee</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xg={12} lg={12} sm={12}>
              <Card maxWidth="lg">
                <Table
                  title="UPVC FITTINGS"
                  data={data}
                  columns={columns}
                  actions={[
                    (rowData) => ({
                      icon: () => <SummarizeIcon size="small" />,
                      tooltip: "Summary",
                      onClick: () => {
                        // console.log(rowData)
                        Router.push({
                          pathname: "/warehouse/stockList/FinishedGoods/monthlyReport",
                          query: { id: rowData.id },
                        });
                      },
                    }),
                  ]}
                />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Summary.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Summary;
