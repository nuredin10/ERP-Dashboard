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
//     // { title: "Name", field: "finished_name" },
//     // { title: "Quantity", field: "finished_quantity" },
//     // { title: "Diameter", field: "finished_diameter" },
//     // { title: "Description", field: "finished_description" },
//     // { title: "Material Code", field: "finished_materialcode" },
//     // { title: "Specification", field: "finished_spec" },
//     // { title: "Material Unit", field: "finished_materialunit" },
//     // { title: "Value", field: "finished_value" },
//     // { title: "Reference Number", field: "finished_referncenum" },
//     // { title: "Date", field: "finished_date" },
//     // { title: "Remark", field: "finished_remark" },

//     { title: "Name", field: "finished_name" },
//     { title: "Quantity", field: "finished_quantity" },
//     { title: "Material Code", field: "finished_materialcode" },
//     { title: "Material Unit", field: "finished_materialunit" },
//     { title: "Date", field: "finished_date" },
//   ];
//   useEffect(() => {
//     waxios
//       .post("/finishedMaterialbyCat", {
//         Cat: "PPR FITTING",
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
//                   <MenuItem value={"PPR Elbow"}>PPR Elbow</MenuItem>
//                   <MenuItem value={"PPR Socket"}>PPR Socket</MenuItem>
//                   <MenuItem value={"PPR Reducer"}>PPR Reducer</MenuItem>
//                   <MenuItem value={"PPR Tee"}>PPR Tee</MenuItem>
//                   <MenuItem value={"1PPR Tap"}>PPR Tap</MenuItem>
//                   <MenuItem value={"PPR 4-way connector"}>PPR 4-way connector</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//           </Grid>

//           <Card maxWidth="lg">
//             <Table
//               title="Finished Goods"
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
  IconButton
} from "@mui/material";
import { DashboardLayout } from "../../../components/dashboard-layout";
import Table from "../../../components/Table";
import ToolBar from "../../../components/ToolBar";
import waxios from "../../../components/wareHouseAxios";
import SummarizeIcon from "@mui/icons-material/Summarize";
import Router from 'next/router';
import AddIcon from '@mui/icons-material/Add';

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
    Cat: "PPR FITTINGS",
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
          <Grid container spacing={3}>
            <Grid item xg={3} lg={3} sm={12} sx={{ mb: 3 }}>
            <Typography sx={{ mb: 3 }} variant="h6">
                Select Type
              </Typography>
              <FormControl>
                <InputLabel id="demo-simple-select-label">Select Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="type"
                  onChange={handleChange}
                >
                  <MenuItem value={"Elbow"}>PPR Elbow</MenuItem>
                  <MenuItem value={"Socket"}>PPR Socket</MenuItem>
                  <MenuItem value={"Reducer"}>PPR Reducer</MenuItem>
                  <MenuItem value={"Tee"}>PPR Tee</MenuItem>
                  <MenuItem value={"Tap"}>PPR Tap</MenuItem>
                  <MenuItem value={"4-way connector"}>PPR 4-way connector</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xg={3} lg={3} sm={6} sx={{ mb: 3 }}>
              <Typography sx={{ mb: 3 }} variant="h6">
                Add OD
              </Typography>
              <Grid container>
                <Grid item lg={6} sm={6} xg={6}>
                  <TextField name="od" label="Add OD" type="text" />
                </Grid>
                <Grid item lg={6} sm={6} xg={6}>
                  <IconButton size="large" sx={{ mt: 0.5,ml: 1}}>
                    <AddIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xg={3} lg={3} sm={6} sx={{ mb: 3 }}>
              <Typography sx={{ mb: 3 }} variant="h6">
                Add PPR
              </Typography>
              <Grid container>
                <Grid item lg={6} sm={6} xg={6}>
                  <TextField name="ppr" label="Add PPR" type="text" />
                </Grid>
                <Grid item lg={6} sm={6} xg={6}>
                  <IconButton size="large" sx={{ mt: 0.5,ml: 1}}>
                    <AddIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xg={12} lg={12} sm={12}>
              <Card maxWidth="lg">
                <Table
                  title="PPR FITTINGS"
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