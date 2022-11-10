// const { DashboardLayout } = require("src/components/dashboard-layout");
import { useState, useEffect } from 'react';
import * as React from "react";
import Table from '../../components/Table';
import productionWxios from '../../components/productionWxios';
import Head from "next/head";
import ToolBar from "../../components/ToolBar";
import { DashboardLayout } from "../../components/dashboard-layout";
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


const ProductionFinished = () => {
    const [data, setData] = useState([]);
    const columuns = [
        { title: "ID", field: "id" },
        { title: "Person Id", field: "personID" },
        { title: "Name", field: "finished_name" },
        { title: "Spec", field: "finished_spec" },
        { title: "Quantity", field: "finished_qty" },
        { title: "Time", field: "finished_time" },
        { title: "Description", field: "finished_description" },
        { title: "Material Unit", field: "finished_materialunit" },
        { title: "Remark", field: "finished_remark" },
        { title: "Material Code", field: "finished_materialcode" }
    ]

    useEffect(() => {

        productionWxios.get('/showFinishedProduction')
            .then(function (response) {
                setData(response.data);
            })

    }, []);
    console.log(data);
    return (
        <>
            <Head>
                <title>Finished Products</title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="ml">
                    {/* <ToolBar title="customer" href="" /> */}
                    <Card maxWidth="lg">
                        <Table
                            title="Finished Products"
                            data={data}
                            columns={columuns}
                            options={{
                                actionsColumnIndex: -1,
                                selection: true,
                            }}

                        />

                    </Card>

                </Container>

            </Box>
        </>
    );
}
ProductionFinished.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default ProductionFinished;