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

const Accessories = () => {
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
    fetch("http://versavvy.com:59000/showStoreRequestion")
      .then((resp) => resp.json())
      .then((resp) => {
        const accessories = resp.filter((acc) => acc.req_materialtype.includes("ACCS"));
     
        setData(accessories);
      });
  }, []);

  const [acc, setAcc] = useState([]);
  console.log(data);

  return (
    <>
      <Head>
        <title>Accessories</title>
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
              title="Accessories"
              data={data}
              columns={columns}
              // actions={[
              //   rowData => ({
              //     icon: () => <NextLink href={`/procurment/purchaserequest/rfq`}><NavigateNextIcon /></NextLink>,
              //     tooltip: 'Edit ',
              //     onClick:()=> (rowData)
              //   })
              // ]}
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

Accessories.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Accessories;
