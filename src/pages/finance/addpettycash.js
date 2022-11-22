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
import { DashboardLayout } from "../../components/dashboard-layout";
import Table from "../../components/Table";
import ToolBar from "../../components/ToolBar";
import axios from 'axios'

const AddPettyCash = () => {
  const [data, setData] = useState([]);
 
  useEffect(() => {

    axios.get('/showAddPettyCash')
    .then((res) =>{
      setData(res.data);
    })

    // fetch("http://localhost:59000/showCustomers")
    //   .then((resp) => resp.json())
    //   .then((resp) => setData(resp));
  }, []);

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
        
      </Box>
    </>
  );
};

AddPettyCash.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AddPettyCash;
