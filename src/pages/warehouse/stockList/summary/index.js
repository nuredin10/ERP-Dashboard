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
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import {DashboardLayout} from "../../../../components/dashboard-layout";
import Table from "../../../../components/Table";
import ToolBar from "../../../../components/ToolBar";
import waxios from "../../../../components/wareHouseAxios";
import SummarizeIcon from "@mui/icons-material/Summarize";
import PrintLayout from "../../../../components/PrintLayout";
import {useReactToPrint} from "react-to-print";

const Summary = () => {
    const [data, setData] = useState([]);
    const [type, setType] = useState("RAW");
    const [isPrinting, setIsPrinting] = useState(false);
    const sheetRef = useRef();
    const [documentNo, setDocumentNo] = useState("")

    const handleChange = (event) => {
        setType(event.target.value);
    };
    var columns;

    if (type === "RAW") {
        columns = [
            {title: "Name", field: "raw_name"},
            {title: "Material Type", field: "material_type"},
            {title: "Description", field: "raw_description"},
            {title: "Specification", field: "raw_spec"},
            {title: "Date", field: "summery_date"},
            {title: "Stock At Hand", field: "stockat_handion"},
            {title: "Stock Recieved", field: "stock_recieved"},
            {title: "Stock Issued", field: "stock_issued"},
            {title: "Department Issued", field: "department_issued"},
            {title: "Stock At End", field: "stockat_end"},
        ];
    } else if (type === "FIN") {
        columns = [
            {title: "Name", field: "finished_name"},
            {title: "Material Type", field: "material_type"},
            {title: "Description", field: "finished_description"},
            {title: "Specification", field: "finished_spec"},
            {title: "Date", field: "summery_date"},
            {title: "Stock At Hand", field: "stockat_handion"},
            {title: "Stock Recieved", field: "stock_recieved"},
            {title: "Stock Issued", field: "stock_issued"},
            {title: "Department Issued", field: "department_issued"},
            {title: "Stock At End", field: "stockat_end"},
        ];
    } else {
        columns = [
            {title: "Name", field: "accs_name"},
            {title: "Material Type", field: "material_type"},
            {title: "Description", field: "accs_description"},
            {title: "Specification", field: "accs_spec"},
            {title: "Date", field: "summery_date"},
            {title: "Stock At Hand", field: "stockat_handion"},
            {title: "Stock Recieved", field: "stock_recieved"},
            {title: "Stock Issued", field: "stock_issued"},
            {title: "Department Issued", field: "department_issued"},
            {title: "Stock At End", field: "stockat_end"},
        ];
    }

    const req = {
        materialType: type,
    };
    useEffect(() => {
        waxios
            .post("/showAllByType", req)
            .then((response) => {
                setData(response.data);
                console.log(response.data);
            })
            .catch((response) => {
                console.log(response);
            });
    }, [type]);

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
                <title>Summary</title>
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
                        <Box className='flex '>

                            <Grid item lg={6} sx={{width: '50%', mb: 3}}>
                                <FormControl>
                                    <InputLabel id="demo-simple-select-label">Select Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={type}
                                        label="type"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={"RAW"}>Raw Material</MenuItem>
                                        <MenuItem value={"ACCS"}>Accessories</MenuItem>
                                        <MenuItem value={"FIN"}>Finished Goods</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item lg={6} sx={{
                                display: 'flex',
                                justifyContent: 'end',
                                justifyItems: 'center',
                                width: '50%',
                                mb: 3
                            }}>
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
                            </Grid>

                        </Box>

                        <Grid item xg={12} lg={12} sm={12}>
                            <div ref={sheetRef}>
                                <PrintLayout documentNo={documentNo} isPrinting={isPrinting}>

                                    <Card maxWidth="lg">
                                        <Table
                                            title="Summary Report"
                                            data={data}
                                            columns={columns}
                                            actions={[
                                                (rowData) => ({
                                                    icon: () => <SummarizeIcon size="small"/>,
                                                    tooltip: "Summary",
                                                    onClick: () => {
                                                        // console.log(rowData)
                                                        Router.push({
                                                            pathname: "/warehouse/stockList/FinishedGoods/monthlyReport",
                                                            query: {id: rowData.id},
                                                        });
                                                    },
                                                }),
                                            ]}
                                        />
                                    </Card>
                                </PrintLayout>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

Summary.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Summary;
