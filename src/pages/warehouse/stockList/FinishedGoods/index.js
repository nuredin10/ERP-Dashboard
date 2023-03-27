import React, {useState, useEffect, useRef} from "react";
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
    Divider
} from "@mui/material";
import {DashboardLayout} from "../../../../components/dashboard-layout";
import Table from "../../../../components/Table";
import waxios from '../../../../components/wareHouseAxios'
import SummarizeIcon from '@mui/icons-material/Summarize';
import Router from 'next/router';
import OrdersToolBar from "../../../../components/rawMaterials/order-toolbar";
import {OrderResults} from "../../../../components/rawMaterials/order-results";
import RightDrawer from "../../../../components/rawMaterials/RightDrawer";

import PrintLayout from "../../../../components/PrintLayout";
import {useReactToPrint} from "react-to-print";

const FinishedGoods = () => {
    const [drawer, setDrawer] = useState(false);
    const [data, setData] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState([]);
    const [summery, setSummery] = useState([]);
    const [isPrinting, setIsPrinting] = useState(false);
    const sheetRef = useRef();
    const [documentNo, setDocumentNo] = useState("")


    var width;
    // const size = useWindowSize();
    if (typeof window != 'undefined') {
        console.log('You are on the browser');
        console.log(window.innerWidth);
        width = window.innerWidth;
    } else {
        console.log('You are on the server')
    }
    const columns = [
        // { title: "Name", field: "finished_name" },
        // { title: "Quantity", field: "finished_quantity" },
        // { title: "Diameter", field: "finished_diameter" },
        // { title: "Description", field: "finished_description" },
        // { title: "Material Code", field: "finished_materialcode" },
        // { title: "Specification", field: "finished_spec" },
        // { title: "Material Unit", field: "finished_materialunit" },
        // { title: "Value", field: "finished_value" },
        // { title: "Reference Number", field: "finished_referncenum" },
        // { title: "Date", field: "finished_date" },
        // { title: "Remark", field: "finished_remark" },

        {title: "Name", field: "finished_name"},
        {title: "Quantity", field: "finished_quantity"},
        {title: "Material Code", field: "finished_materialcode"},
        {title: "Material Unit", field: "finished_materialunit"},
        {title: "Date", field: "finished_date"},
    ];
    useEffect(() => {
        waxios
            .get("/finishedMaterial")
            .then((response) => {
                console.log(response.data, "ZSdc");
                setData(response.data);
            })
            .catch((response) => {
                console.log(response);
            });
    }, []);

    const print = () => {
        setIsPrinting(true);
        setTimeout(() => {
            pip();
        }, 100);
    }
    const pip = useReactToPrint({

        onAfterPrint: () => {
            setIsPrinting(false);
        },
        content: () => sheetRef.current,
    })


    return (
        <>
            <Head>
                <title>Finished Goods | Proplast</title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container
                    sx={{
                        display: {
                            xs: 'none',
                            lg: 'block'
                        }
                    }}
                    maxWidth="ml">
                    {/* <ToolBar title="SIV"
        href="/warehouse/stockList/FinishedGoods/addSiv" /> */}

                    {/* <Typography
            sx={{ mb: 3 }}
            variant="h4"
          >
            Raw Material stockList
          </Typography> */}
                    <Box className="mb-4">

                        <TextField label="Document No" value={documentNo}
                                   onChange={(e) => setDocumentNo(e.target.value)}/>

                        <Button
                            onClick={print}
                            sx={{
                                ml: 5,
                            }}
                            component="a"
                            disableRipple
                            variant="contained"
                        >
                            Print
                        </Button>
                    </Box>

                    <div ref={sheetRef}>
                        <PrintLayout documentNo={documentNo} isPrinting={isPrinting}>

                            <Card maxWidth="lg">
                                <Table
                                    title="Finished Goods"
                                    data={data}
                                    columns={columns}
                                    actions={[
                                        (rowData) => ({
                                            icon: () => <SummarizeIcon size='small'/>,
                                            tooltip: 'Summary',
                                            onClick: () => {
                                                // console.log(rowData)
                                                Router.push({
                                                    pathname: "/warehouse/stockList/FinishedGoods/monthlyReport",
                                                    query: {id: rowData.id}
                                                })
                                            }
                                        })
                                    ]}

                                    localization={{
                                        header: {
                                            actions: "SUMMARY"
                                        }
                                    }}
                                />

                                {/* <Typography sx={{ mb: 3 }} variant="h4">
          Supplier
        </Typography> */}
                            </Card>
                        </PrintLayout>

                    </div>

                </Container>
                <Container
                    sx={{
                        display: {
                            xs: 'block',
                            lg: 'none'
                        }
                    }}
                    maxWidth={false}>
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
                        <Divider sx={{borderColor: "gray", mt: 3}}/>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

FinishedGoods.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default FinishedGoods;

// import React, { useState, useEffect } from "react";
// import Head from "next/head";
// import { Box, Container, Typography, Grid, Divider } from "@mui/material";
// import { DashboardLayout } from "../../../../components/dashboard-layout";

// // import styles from '../styles/Home.module.css';
// import OrdersToolBar from "../../../../components/order/order-toolbar";
// import { OrderResults } from "../../../../components/order/order-results";
// import RightDrawer from "../../../../components/order/RightDrawer";
// import waxios from '../../../../components/wareHouseAxios'

// const FinishedGoods = () => {
//   const [drawer, setDrawer] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState([]);
//   const [summery, setSummery] = useState([]);
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     waxios.get("/finishedMaterial")
//       .then((response)=>{
//           console.log(response)
//           setData(response.data)
//         })
//       .catch((response)=>{
//         console.log(response)
//       })
//   }, []);

//   // console.log(selectedOrder)

//   return (
//     <>
//       <Head>
//         <title>Orders | Material Kit</title>
//       </Head>
//       <Box component="main">
//         <Container maxWidth={false}>
//           <Box>
//             <OrdersToolBar drawer={drawer}></OrdersToolBar>
//             <OrderResults
//               drawer={drawer}
//               setDrawer={setDrawer}
//               setSelectedOrder={setSelectedOrder}
//               setSummery={setSummery}
//               data={data}
//             />
// <RightDrawer
//   drawer={drawer  }
//   setDrawer={setDrawer}
//   selectedOrder={selectedOrder}
//   summery={summery}
// />
//             <Divider sx={{ borderColor: "gray", mt: 3 }} />
//           </Box>
//         </Container>
//       </Box>
//     </>
//   );
// };

// FinishedGoods.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// export default FinishedGoods;
