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
import {DashboardLayout} from "../../../components/dashboard-layout";
import Table from "../../../components/Table";
// import ToolBar from "../../../../components/ToolBar";
import {useRouter} from "next/router";
import waxios from "../../../components/wareHouseAxios";
// import xlx
import {read, set_cptable, writeFileXLSX, utils} from "xlsx";
import xlsx from "xlsx";
import {FormControlUnstyledContext} from "@mui/base";
import ReactToPrint, {useReactToPrint} from "react-to-print";
import {DateRangePicker} from "@mantine/dates";
import {Select} from "@mantine/core";
import {IconCalendar} from "@tabler/icons";
import axios from "axios";
import PrintLayout from "../../../components/PrintLayout";

const MonthlyReport = () => {
    const [selectMonth, setSelectMonth] = useState("");
    const sheetRef = useRef();
    const handleMonthChange = (e) => {
        setSelectMonth(e.target.value);
    };
    const [isPrinting, setIsPrinting] = useState(false);

    const router2 = useRouter();
    // const { id } = router2.query;
    // var nowYead = new
    const [data, setData] = useState([]);
    const [date, setDate] = useState([]);
    const [year, setYear] = useState("");
    const [documentNo, setDocumentNo] = useState("")

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
                    eachData.total_price =
                        eachData.total_price !== ""
                            ? parseFloat(eachData.total_price).toLocaleString("en-US")
                            : "";
                });
                setData(res.data);
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
                        <Grid item lg={2}>
                            <Typography variant="h6" sx={{textAlign: "center"}}>
                                Select Month
                            </Typography>
                        </Grid>
                        <Grid
                            sx={{
                                display: "flex",
                            }}
                            item
                            lg={2}
                        >
                            <DateRangePicker
                                className="py-3"
                                placeholder="Pick date"
                                onChange={setDate}
                                size="xl"
                                inputFormat="DD/MM/YYYY"
                                labelFormat="DD/MM/YYYY"
                                icon={<IconCalendar size={16}/>}
                            />
                        </Grid>
                        <Grid item lg={1}>
                            <TextField
                                fullWidth
                                label="Year"
                                value={year}
                                select
                                onChange={(e) => setYear(e.target.value)}
                            >
                                <MenuItem key={1} value="2019">
                                    2019
                                </MenuItem>
                                <MenuItem key={2} value="2020">
                                    2020
                                </MenuItem>
                                <MenuItem key={3} value="2021">
                                    2021
                                </MenuItem>
                                <MenuItem key={4} value="2022">
                                    2022
                                </MenuItem>
                                <MenuItem key={5} value="2024">
                                    2023
                                </MenuItem>
                                <MenuItem key={6} value="2025">
                                    2025
                                </MenuItem>
                                <MenuItem key={7} value="2026">
                                    2026
                                </MenuItem>
                                <MenuItem key={8} value="2027">
                                    2027
                                </MenuItem>
                                <MenuItem key={9} value="2028">
                                    2028
                                </MenuItem>
                                <MenuItem key={10} value="2029">
                                    2029
                                </MenuItem>
                                <MenuItem key={11} value="2030">
                                    2030
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid
                            sx={{
                                marginLeft: 20,
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "space-between",
                                justifyContent: "space-between",
                            }}
                        >
                            <Button onClick={excel} component="a" disableRipple variant="contained">
                                Excel
                            </Button>
                            {/*<Grid sx={{}}>*/}

                                <Button
                                    onClick={print}
                                    sx={{
                                        mx: 5,
                                    }}
                                    component="a"
                                    disableRipple
                                    variant="contained"
                                >
                                    Print
                                </Button>
                                <TextField label="Document No" value={documentNo} onChange={(e)=>setDocumentNo(e.target.value)}/>
                            {/*</Grid>*/}
                        </Grid>
                    </Grid>
                </Grid>

                <Container maxWidth="ml">
                    <div ref={sheetRef}>
                        {/*{isPrinting && <Typography>yeahhhhhhhhh</Typography>}*/}
                        <PrintLayout isPrinting={isPrinting} documentNo={documentNo}>
                            <Card maxWidth="lg">
                                <Table title="Expense Summary" data={data} columns={issuedcolumns}/>
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
