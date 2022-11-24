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
import Table from "../../components/Table";
import waxios from '../../components/wareHouseAxios';


import { DashboardLayout } from '../../components/dashboard-layout';
function DeclinedOrders() {
    const [data, setData] = useState([]);
    const columns = [
        { title: "Request Material", field: "request_material" },
        { title: "Request Person", field: "request_person" },
        { title: "Quantity", field: "request_qty" },
        { title: "Date", field: "request_date" },
        { title: "Department", field: "request_department" },
        { title: "Status", field: "pur_status" },


    ];
    useEffect(() => {

        waxios.get('/showDeclinedRequested')
            .then((res) => {
                setData(res.data);
            })
    }, []);

    return (
        <>
            <Head>
                <title>Declined Orders</title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth="ml">
                    <Card maxWidth="lg">
                        <Table
                            title="Purchase Orders"
                            data={data}
                            columns={columns}
                        />
                    </Card>
                </Container>
            </Box>
        </>
    )
}

DeclinedOrders.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>
export default DeclinedOrders;