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
} from "@mui/material";
import {DashboardLayout} from "../../components/dashboard-layout";
import Table from "../../components/Table";
import ToolBar from "../../components/ToolBar";
import waxios from "../../components/wareHouseAxios";
import PrintLayout from "../../components/PrintLayout";
import {useReactToPrint} from "react-to-print"

const RequestedOrders = () => {
    const [data, setData] = useState([]);

    const [isPrinting, setIsPrinting] = useState(false);
    const sheetRef = useRef();
    const [documentNo, setDocumentNo] = useState("")

    const columns = [
        {title: "Date", field: "request_date"},
        {title: "FS NUMBER", field: "request_date"},
        {title: "Request Material", field: "request_material"},
        {title: "Request Person", field: "request_person"},
        {title: "UOM", field: "request_person"},
        {title: "Quantity", field: "request_qty"},
        {title: "Department", field: "request_department"},
        {title: "Status", field: "pur_status"},
    ];
    useEffect(() => {
        waxios.get("/showPurchaseRequested").then((res) => {
            console.log(res.data);
            setData(res.data);
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
                <title>Requested Orders</title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth="ml">
                    {/* <ToolBar title="customer" href="/sales/Customers/addCustomers" /> */}
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
                                title="Purchase Orders"
                                data={data}
                                columns={columns}

                                //   actions={[
                                //     {
                                //       tooltip: "Remove All Selected Users",
                                //       icon: "delete",
                                //       onClick: (evt, data) => alert("You want to delete " + data.length + " rows"),
                                //     },
                                //   ]}
                            />
                        </Card>
                        </PrintLayout>

                    </div>
                </Container>
            </Box>
        </>
    );
};

RequestedOrders.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default RequestedOrders;
