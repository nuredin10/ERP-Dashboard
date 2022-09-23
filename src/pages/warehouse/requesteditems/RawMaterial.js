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
import { DashboardLayout } from "../../../components/dashboard-layout";
import Table from "../../../components/Table";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import axios from 'axios'

const RawMaterial = () => {
  const [data, setData] = useState([]);
  const columns = [
    { title: "Name", field: "mat_requestname" },
    { title: "Date", field: "mat_requestdate" },
    { title: "Department", field: "mat_requestdept" },
    { title: "Person Id", field: "mat_reqpersonid" },
    { title: "Description", field: "mat_description" },
    { title: "Quantity", field: "mat_quantity" },
    { title: "Status", field: "mat_status" },
  ];

  useEffect(() => {
    fetch("http://localhost:59000/showStoreRequestion")
      .then((resp) => resp.json())
      .then((resp) => {
        const raw = resp.filter((raw) => raw.req_materialtype.includes("RAW"));
        setData(raw);
      });
  }, []);

  // const [rawmaterial, setRawmaterial] = useState([]);
  // console.log(data)

  // useEffect(()=>{
  //   // const raw = data.filter( (raw) => raw.req_materialtype.includes("RAW"))
  //   setRawmaterial(data)
  // },[])
  const accept = async(id) => {
    await axios.post('http://localhost:59000/responseStoreRequestion', {
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

  const decline = async(id) => {
    await axios.post('http://localhost:59000/responseStoreRequestion', {
      id: id,
      status: "Decline"
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
        <title>RawMaterial</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="ml">
          {/* <Typography
            sx={{ mb: 3 }}
            variant="h4"
          >
            Raw Material stockList
          </Typography> */}
          <Card maxWidth="lg">
            <Table
              title="Raw Material requested"
              data={data}
              columns={columns}
              // actions={[
              //   rowData => ({
              //     icon: () => <NextLink href={`/procurment/purchaserequest/rfq`}><NavigateNextIcon /></NextLink>,
              //     tooltip: 'Edit ',
              //     onClick:()=> (rowData)
              //   })
              // ]}
              actions={[
                rowData => ({
                  icon: () => < DoneIcon />,
                  tooltip: 'Accpet ',
                  onClick: () => (accept(rowData.id))
                }),
                rowData => ({
                  icon: () => < CloseIcon />,
                  tooltip: 'Reject ',
                  onClick: () => (decline(rowData.id))
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

RawMaterial.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default RawMaterial;
