import React, {useState, useEffect, useRef, useMemo} from "react";
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
import {DashboardLayout} from "../../../../components/dashboard-layout";
import Table from "../../../../components/Table";
import ToolBar from "../../../../components/ToolBar";
import {useRouter} from "next/router";
import waxios from "../../../../components/wareHouseAxios";
// import xlx
import {read, set_cptable, writeFileXLSX, utils} from "xlsx";
import xlsx from "xlsx";
import {FormControlUnstyledContext} from "@mui/base";
import ReactToPrint, {useReactToPrint} from "react-to-print";
import {DateRangePicker} from "@mantine/dates";
import {Select} from "@mantine/core";
import {IconCalendar} from "@tabler/icons";
import axios from "axios";
import PrintLayout from "../../../../components/PrintLayout";

const MonthlyReport = () => {
    const [selectMonth, setSelectMonth] = useState("");
    const [isPrinting, setIsPrinting] = useState(false);
    const sheetRef = useRef();
    const [documentNo, setDocumentNo] = useState("")

    const handleMonthChange = (e) => {
        setSelectMonth(e.target.value);
    };
    const router = useRouter();
    const {id} = router.query;
    // const router2 = useRouter();

    // var nowYead = new
    const [data, setData] = useState([]);
    const [date, setDate] = useState([]);
    const [year, setYear] = useState("");

    const [recievedSummery, setRecivedSummery] = useState([]);
    const [issuedSummery, setIssuedSummery] = useState();

    // const recievedcolumns = [
    //   { title: "Date", field: "summery_date" },
    //   { title: "Stock at Hand", field: "stockat_hand" },
    //   { title: "Stock Recieved", field: "stock_recieved" },
    //   { title: "Department Issued", field: "department_issued" },
    //   { title: "stock at End", field: "stockat_end" },
    // ];
    const issuedcolumns = [
        {title: "Date", field: "summery_date"},
        {title: "Stock Recieved", field: "stock_recieved"},
        {title: "Stock Issued", field: "stock_issued"},
        {title: "stock at hand", field: "stockat_end"},
        {title: "Fs Number", field: "fs_number"},
        {title: "Department", field: "department_issued"},
    ];

    function convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("-");
    }

    // {start: convert(date[0]), end: convert(date[1])}
    // /showSummeryByMonth
    useEffect(() => {
        waxios
            .post("/showSummeryByMonth", {
                id: id,
                materialType: "ACCS",
                selectedDate: {start: date[0], end: date[1]},
                selectedYear: year,
            })
            .then(function (res) {
                res.data.map((eachData) => {
                    eachData.summery_date = convert(eachData.summery_date);
                    eachData.stockat_hand =
                        eachData.stockat_hand !== ""
                            ? parseFloat(eachData.stockat_hand).toLocaleString("en-US")
                            : "";
                    eachData.stock_issued =
                        eachData.stock_issued !== ""
                            ? parseFloat(eachData.stock_issued).toLocaleString("en-US")
                            : "";
                    eachData.stock_recieved =
                        eachData.stock_recieved !== ""
                            ? parseFloat(eachData.stock_recieved).toLocaleString("en-US")
                            : "";

                    eachData.stockat_end =
                        eachData.stockat_end !== ""
                            ? parseFloat(eachData.stockat_end).toLocaleString("en-US")
                            : "";
                });
                setData(res.data);
                console.log(res.data);
                console.log("Works");
            })
            .catch(function (res) {
                console.log(res);
            });
    }, [date[1], year]);

    // useEffect(() => {
    //   setRecivedSummery([]);
    //   setIssuedSummery([]);
    //   data &&
    //     data.map((e) => {
    //       e.stock_issued == ""
    //         ? setRecivedSummery((recievedSummery) => [...recievedSummery, e])
    //         : setIssuedSummery((issuedSummery) => [...issuedSummery, e]);
    //     });
    // }, [selectMonth, data]);

    // console.log("Hello");
    console.log("date-me-now", convert(date[0]));
    console.log("date-me-now", date);
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
                <title>Monthly Report</title>
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

                            <Button
                                onClick={print}
                                sx={{
                                    ml: 5,
                                    mr:3,
                                }}
                                component="a"
                                disableRipple
                                variant="contained"
                            >
                                Print
                            </Button>
                            <TextField label="Document No" value={documentNo}
                                       onChange={(e) => setDocumentNo(e.target.value)}/>

                        </Grid>
                    </Grid>
                </Grid>

                <Container maxWidth="ml">
                    <div ref={sheetRef}>
                        <PrintLayout documentNo={documentNo} isPrinting={isPrinting}>
                            <Card maxWidth="lg">
                                <Table title="Monthly Stock Issued Report" data={data} columns={issuedcolumns}  editable={{
                                    // isEditable: rowData => rowData.name === 'a', // only name(a) rows would be editable
                                    // isEditHidden: rowData => rowData.name === 'x',
                                    // isDeletable: rowData => rowData.name === 'b', // only name(b) rows would be deletable,
                                    // isDeleteHidden: rowData => rowData.name === 'y',

                                    onRowUpdate: (newData, oldData) =>
                                        new Promise((resolve, reject) => {
                                            setTimeout(() => {
                                                const dataUpdate = [...data];
                                                const index = oldData.tableData.id;
                                                dataUpdate[index] = newData;
                                                waxios
                                                    .put("/updateFinishedSummery", {
                                                        summery: newData,
                                                        matId: router2.query.id,
                                                    })
                                                    .then((res) => {
                                                        setData([...dataUpdate]);
                                                        console.log(res);
                                                        resolve();
                                                    })
                                                    .catch((err) => {
                                                        reject();
                                                        console.log(err);
                                                    });
                                            }, 1000);
                                        }),
                                    onRowDelete: (oldData) =>
                                        new Promise((resolve, reject) => {
                                            setTimeout(() => {
                                                const dataDelete = [...data];
                                                const index = oldData.tableData.id;
                                                dataDelete.splice(index, 1);
                                                console.log(oldData);
                                                waxios
                                                    .post("/deleteFinishedSummery", {
                                                        summery: oldData,
                                                        matId: router2.query.id,
                                                    })
                                                    .then((res) => {
                                                        setData([...dataDelete]);
                                                        console.log(res);
                                                        resolve();
                                                    })
                                                    .catch((err) => {
                                                        reject();
                                                        console.log(err);
                                                    });
                                            }, 1000);
                                        }),
                                }}/>
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
