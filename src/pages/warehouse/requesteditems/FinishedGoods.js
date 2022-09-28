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

const FinishedGoods = () => {
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
        const finishedData = resp.filter((finish) => finish.req_materialtype.includes("FIN"));
         setData(finishedData);
      });
  }, []);

  // const [finished, setFinished] = useState([]);

  // useEffect(()=>{
  //   const finishedData = data.filter( (finish) => finish.req_materialtype.includes("ACCS"))
  //   setFinished(finishedData)
  // },[])
  return (
    <>
      <Head>
        <title>Finished Goods</title>
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
              title="Finished Goods"
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

FinishedGoods.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default FinishedGoods;
