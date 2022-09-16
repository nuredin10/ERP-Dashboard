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
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import axios from "axios"


const Recieving = () => {
  const [data, setData] = useState([]);
  const columns = [
    { title: "Name", field: "new_name" },
    { title: "Quantity", field: "new_quantity" },
    { title: "Description", field: "new_description" },
    { title: "Material Code", field: "new_materialcode" },
    { title: "Material Type", field: "new_materialtype" },
    { title: "Material unit", field: "new_materialunit" },
    { title: "refernce Number", field: "new_referncenum" },
    { title: "Specification", field: "new_spec" },
    { title: "Value", field: "new_value" },
  ];
  useEffect(() => {
    fetch("http://localhost:59000/shownewPurchased")
      .then((resp) => {
        return resp.json();
      })
      .then((res) => {
        const newPurchased = res.filter((res) => res.new_status.includes("NEW"));
        setData(newPurchased);
        console.log(res)
      });
  }, []);

  const accept = async(id) => {
    await axios.post('http://localhost:59000/confirmPurchased', {
      id: id,
      status: "Accept"
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <>
      <Head>
        <title>Recieving</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="ml">
          <ToolBar title="Recieving" href="/procurment/paymentrequest/add" />

          {/* <Typography
            sx={{ mb: 3 }}
            variant="h4"
          >
            Raw Material stockList
          </Typography> */}
          <Card maxWidth="lg">
            <Table
              title="Recieving"
              data={data}
              columns={columns}
              actions={[
                rowData => ({
                  icon: () => < DoneIcon />,
                  tooltip: 'Accpet ',
                  onClick: () => (accept(rowData.id))
                }),
                rowData => ({
                  icon: () => < CloseIcon />,
                  tooltip: 'Reject ',
                  onClick: () => (console.log(rowData.id))
                })
              ]}
            />

            {/* <Typography sx={{ mb: 3 }} variant="h4">
          Supplier
        </Typography> */}
          </Card>
        </Container>
      </Box>
    </>
  );
};

Recieving.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Recieving;
