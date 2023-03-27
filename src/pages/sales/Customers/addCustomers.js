import React, {useState, useEffect} from "react";
import {
    FormControl,
    FormLabel,
    FormControlLabel,
    TextField,
    MenuItem,
    Select,
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
    DatePicker,
    Alert,
} from "@mui/material";
import Head from "next/head";
import {DashboardLayout} from "src/components/dashboard-layout";
import Link from "@mui/material/Link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import {useForm} from "react-hook-form";
import Router from "next/router";
import saxios from "../../../components/salesAxios";
import { useSnackbar } from "notistack";

const AddSiv = () => {
    const [status, setStatus] = React.useState("");
    const handleChange = (event) => {
        setStatus(event.target.value);
    };
    const {register, handleSubmit, reset} = useForm();
    const [data, setData] = React.useState([]);

    const { enqueueSnackbar } = useSnackbar();


    const newUser = (user) => {
        // console.log(user)
        // fetch("http://localhost:4000/addCustomers", {
        //   method: "POST",
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(user),
        // });
        console.log(user)

        saxios.post('/salesModule/addCustomers', user)
            .then((res) => {
                console.log(res.data);
                enqueueSnackbar("Customer Created Successfully", { variant: "success" });
                Router.push("/sales/vender");
            })
            .catch((err) => {
                enqueueSnackbar("Customer Create Failed", { variant: "error" });

                console.log(err);
            })
    };

    return (
        <>
            <Head>
                <title>Add Customer Information</title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Box
                    sx={{
                        position: "fixed",
                        bottom: "5%",
                        right: "5%",
                        zIndex: "100000",
                        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    }}
                >
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        // height: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {/*<Box sx={{marginLeft: "-80%", marginBottom: "2%"}}>*/}
                    {/*    <Link*/}
                    {/*        href="/warehouse/stockList/RawMaterial"*/}
                    {/*        color="black"*/}
                    {/*        underline="none"*/}
                    {/*        variant="subtitle2"*/}
                    {/*        sx={{cursor: "pointer"}}*/}
                    {/*    >*/}
                    {/*        <ArrowBackIcon/> Sales*/}
                    {/*    </Link>*/}
                    {/*</Box>*/}
                    <Card sx={{width: "90%", padding: "2%"}}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <form onSubmit={handleSubmit(newUser)}>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} sm={12}>
                                        <Typography variant="h6">Add Customer Information</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            name="customer_name"
                                            label="Full Name"
                                            type="text"
                                            value={data.name}
                                            fullWidth
                                            {...register("customer_name")}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            name="customer_phone"
                                            label="Phone Number"
                                            type="text"
                                            fullWidth
                                            {...register("customer_phone")}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            name="delivery_model"
                                            label="Delivery Mode"
                                            type="text"
                                            fullWidth
                                            {...register("delivery_model")}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            name="customers_address"
                                            label="Address"
                                            type="text"
                                            fullWidth
                                            {...register("customers_address")}
                                        />
                                    </Grid>

                                    <Grid item lg={8}>
                                        <Button type="submit" sx={{marginRight: "2rem"}} variant="contained">
                                            Add
                                        </Button>
                                        <Button variant="outlined">Clear</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </LocalizationProvider>
                    </Card>
                </Box>
            </Box>
        </>
    );
};

AddSiv.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AddSiv;
