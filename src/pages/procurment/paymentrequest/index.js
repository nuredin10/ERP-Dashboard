import React, { useState, useEffect } from "react";
import Head from "next/head";
import Table from "../../../components/Table";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  Card,
} from "@mui/material";
import { DashboardLayout } from "../../../components/dashboard-layout";
import ToolBar from "../../../components/ToolBar";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Router } from "@material-ui/icons";


const PaymentRequest = () => {
  const [data, setData] = useState([]);

  const columns = [
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Phone", field: "phone" },
  ];

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((resp) => resp.json())
      .then((resp) => setData(resp));
  }, []);

  ;

  return (
    <>
      <Head>
        <title>PaymentRequest</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <ToolBar title="Payment Request" 
        href="/procurment/paymentrequest/add" />
        <Card maxWidth="lg">
          <Table
            title="Payment Request"
            data={data}
            columns={columns}
            
            // actions={[
            //   {
            //     icon: () => <NavigateNextIcon />,
            //     tooltip: "Save User",
            //     onClick: (event, rowData) =>{
            //         <NextLink href='/procurment/paymentrequest/frq'/>
            //     }
              
            //   }
              
            // ]}
          />

        </Card>
      </Box>
    </>
  );
};

PaymentRequest.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default PaymentRequest;
