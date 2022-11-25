import React, { useState, useEffect } from "react";
import Head from "next/head";
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
} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DashboardLayout } from "../../components/dashboard-layout";
import Table from "../../components/Table";
import ToolBar from "../../components/ToolBar";
import Link from "@mui/material/Link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const PurchaseOrder = () => {
  const [status, setStatus] = React.useState("");
  const [date, setDate] = useState();
  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <>
      <Head>
        <title>Purchase Order</title>
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

PurchaseOrder.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default PurchaseOrder;
