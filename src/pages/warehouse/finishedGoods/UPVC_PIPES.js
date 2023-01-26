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
//   Typography,
//   Divider,
//   Grid,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
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
//   const [type, setType] = useState();

//   const [selectedOrder, setSelectedOrder] = useState([]);
//   const [summery, setSummery] = useState([]);
//   var width;
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
//     { title: "Name", field: "finished_name" },
//     { title: "Quantity", field: "finished_quantity" },
//     { title: "Material Code", field: "finished_materialcode" },
//     { title: "Material Unit", field: "finished_materialunit" },
//     { title: "Date", field: "finished_date" },
//   ];
//   const req = {
//     Cat: "UPVC PIPE",
//     Spec: type,
//   };
//   useEffect(() => {
//     waxios
//       .post("/finishedMaterialbyCat", req)
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
//           // sx={{
//           //   display: {
//           //     xs: "none",
//           //     lg: "block",
//           //   },
//           // }}
//           maxWidth="ml"
//         >
//           {/* <ToolBar title="SIV"
//         href="/warehouse/stockList/FinishedGoods/addSiv" /> */}

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
//                   label="type"
//                   onChange={handleChange}
//                 >
//                   <MenuItem value={"50mm"}>OD 50mm</MenuItem>
//                   <MenuItem value={"75mm"}>OD 75mm</MenuItem>
//                   <MenuItem value={"110mm"}>OD 110mm</MenuItem>
//                   <MenuItem value={"110mm"}>OD 160mm</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//           </Grid>

//           <Card maxWidth="lg">
//             <Table
//               title="UPVC PIPES"
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

//             {/* <Typography sx={{ mb: 3 }} variant="h4">
//           Supplier
//         </Typography> */}
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
  IconButton,
} from "@mui/material";
import { DashboardLayout } from "../../../components/dashboard-layout";
import Table from "../../../components/Table";
import ToolBar from "../../../components/ToolBar";
import waxios from "../../../components/wareHouseAxios";
import SummarizeIcon from "@mui/icons-material/Summarize";
import Router from "next/router";
import AddIcon from "@mui/icons-material/Add";

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
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  }
  const req = {
    Cat: "UPVC PIPE",
    Spec: type,
  };
  const [col, setCol] = useState([]);
  useEffect(() => {
    waxios
      .post("/diameterSelect", { Cat: "UPVC PIPE" })
      .then((result) => {
        // try2 = result.data;
        setCol(result.data);
        // setOd(result.data);
        // console.log("NOW", try2);
      })
      .catch((error) => {
        console.log(error);
      });
    waxios
      .post("/finishedMaterialbyCat", req)
      .then((response) => {
        response.data.map((eachData) => {
          eachData.finished_date = convert(eachData.finished_date);
          eachData.finished_quantity =
          eachData.finished_quantity !== ""
            ? parseFloat(eachData.finished_quantity).toLocaleString("en-US")
            : "";
        });
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
          <Typography className="text-[#61482A] mb-10" variant="h5">
            Finished Good UPVC PIPES
          </Typography>
          <Grid container spacing={3}>
            <Grid item xg={4} lg={4} sm={12} sx={{ mb: 3 }}>
              <Typography sx={{ mb: 3 }} variant="h6">
                Select Type
              </Typography>
              <FormControl className="w-40">
                <InputLabel id="demo-simple-select-label">Select Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="type"
                  onChange={handleChange}
                >
                  {col && console.log("TRY 2", col)}
                  {col &&
                    col.map((od) => (
                      <MenuItem value={od.finished_description}>
                        OD {od.finished_description}
                      </MenuItem>
                    ))}
                  {/* <MenuItem value={"50mm"}>OD 50mm</MenuItem>
                  <MenuItem value={"75mm"}>OD 75mm</MenuItem>
                  <MenuItem value={"110mm"}>OD 110mm</MenuItem>
                  <MenuItem value={"160mm"}>OD 160mm</MenuItem> */}
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
                  <IconButton size="large" sx={{ mt: 0.5, ml: 1 }}>
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
                  <IconButton size="large" sx={{ mt: 0.5, ml: 1 }}>
                    <AddIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xg={12} lg={12} sm={12}>
              <Card maxWidth="lg">
                <Table
                  title="UPVC PIPES"
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
                          query: { id: rowData.id, products: rowData.finished_diameter },
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
