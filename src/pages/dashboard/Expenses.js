import React, {useState, useEffect, useRef} from "react";
import Head from "next/head";
import {
    FormControl,
    FormLabel,
    FormControlLabel,
    TextField,
    MenuItem,
    FormGroup,
    Checkbox,
    Box,
    Button,
    Card,
    InputLabel,
    ButtonBox,
    Container,
    Typography,
    Grid,
} from "@mui/material";
import {DashboardLayout} from "../../components/dashboard-layout";
import Table from "../../components/Table";
// import ToolBar from "../../../../components/ToolBar";
import {useRouter} from "next/router";
import waxios from "../../components/wareHouseAxios";
// import xlx
import {read, set_cptable, writeFileXLSX, utils} from "xlsx";
import xlsx from "xlsx";
import {FormControlUnstyledContext} from "@mui/base";
import ReactToPrint, {useReactToPrint} from "react-to-print";
import {DateRangePicker} from "@mantine/dates";
import {Select} from "@mantine/core";
import {IconCalendar} from "@tabler/icons";
import axios from "axios";
import PrintLayout from "../../components/PrintLayout";

const MonthlyReport = () => {
    const [selectMonth, setSelectMonth] = useState("");
    const [isPrinting, setIsPrinting] = useState(false);
    const sheetRef = useRef();
    const [documentNo, setDocumentNo] = useState("")
    const handleMonthChange = (e) => {
        setSelectMonth(e.target.value);
    };

    const router2 = useRouter();
    // const { id } = router2.query;
    // var nowYead = new
    const [data, setData] = useState([]);
    const [date, setDate] = useState([]);
    const [year, setYear] = useState("");

    const [recievedSummery, setRecivedSummery] = useState([]);
    const [issuedSummery, setIssuedSummery] = useState([]);

    const issuedcolumns = [
        {title: "Date", field: "date_expense"},
        {title: "Description", field: "Item_description"},
        {title: "uom", field: "uom"},
        {title: "Unit Price", field: "unit_price"},
        {title: "Total Price", field: "total_price"},
        {title: "Department", field: "purchase_department"},
        {title: "Remark", field: "remark"},
    ];

    function convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("-");
    }

    useEffect(() => {
        waxios
            .post("/showExpenseByMonth", {
                id: "0",
                materialType: "RAW",
                selectedDate: {start: date[0], end: date[1]},
                selectedYear: year,
            })
            .then(function (res) {
                console.log("response", res.data);
                res.data.map((eachData) => {
                    eachData.date_expense = convert(eachData.date_expense);
                    eachData.total_price = parseFloat(eachData.total_price).toLocaleString("en-US");
                    eachData.unit_price = parseFloat(eachData.unit_price).toLocaleString("en-US");
                });
                setData(res.data);
                console.log(res.data);
                console.log("Works");
            })
            .catch(function (res) {
                console.log(res);
            });
    }, [date[1], year]);

    const excel = () => {
        const XLSX = xlsx;
        const workbook = utils.book_new();
        const worksheet = utils.json_to_sheet(data);
        utils.book_append_sheet(workbook, worksheet, "Report");
        writeFileXLSX(workbook, "Report.xlsx");
    };
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
                <title>Expense Report</title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Grid
                    container
                    spacing={1}
                    sx={{
                        mb: 2,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                    }}
                >
                    <Grid
                        container
                        spacing={1}
                        sx={{
                            mb: 2,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}
                    >
                        <Grid
                            sx={{
                                marginLeft: 20,
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "space-between",
                                justifyContent: "space-between",
                            }}
                        ></Grid>
                    </Grid>
                </Grid>

                <Container maxWidth="ml">
                    <Box className='mb-4'>

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
                                <Table title="Montly Expenses" data={data} columns={issuedcolumns}/>
                            </Card>
                        </PrintLayout>
                    </div>
                </Container>
            </Box>
        </>
    );
};

MonthlyReport.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default MonthlyReport;
