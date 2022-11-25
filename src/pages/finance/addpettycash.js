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
} from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import Table from "../../components/Table";
import ToolBar from "../../components/ToolBar";
import axios from "axios";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useForm } from "react-hook-form";
import FAxios from '../../components/financeAxios'
import { useSnackbar } from "notistack";

const AddPettyCash = () => {
  const { register, handleSubmit, reset } = useForm();

  const { enqueueSnackbar } = useSnackbar();


  const onSubmit = (newForm) => {
    console.log(newForm);
    FAxios.post('/addPettyCash',newForm)
    .then((res)=>{
      console.log(res)
      enqueueSnackbar(res.data.message, { variant: 'success' })

    })
    .catch((err) =>{
      console.log(err)

      enqueueSnackbar('Something went wrong', { variant: 'error' })

    })
  };

  return (
    <>
      <Head>
        <title>Add Petty Cash | Proplast</title>
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
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card sx={{ width: "70%", padding: "2%" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={12}>
                  <Typography variant="h6">Add Petty Cash</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField required name="pay_for" label="To" type="text" fullWidth 
                  {...register('pay_for')}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField required name="cash_amount" label="Cash Amount" type="text" fullWidth {...register("cash_amount")}/>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField required name="pay_reason" label="Reason" type="text" fullWidth {...register("pay_reason")}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    name="accountatnt_name"
                    label="Prepared By"
                    type="text"
                    fullWidth
                    {...register("accountatnt_name")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField required name="payed_by" label="Payed By" type="text" fullWidth {...register("payed_by")}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField required name="checked_by" label="Checked By" type="text" fullWidth {...register("checked_by")}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    name="recitNum"
                    label="Receipt Number"
                    type="text"
                    fullWidth
                    {...register("recitNum")}
                  />
                </Grid>
                <Grid item>
                  <Button type="submit" sx={{ marginRight: "2rem" }} variant="contained">
                    Save
                  </Button>
                  <Button variant="outlined">Cancel</Button>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Box>
      </Box>
    </>
  );
};

AddPettyCash.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AddPettyCash;
