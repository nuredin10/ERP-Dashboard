import React, { useState, useEffect } from 'react'
import Head from 'next/head';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Card,
  Typography
} from '@mui/material';
import { DashboardLayout } from '../../../../components/dashboard-layout';
import Table from '../../../../components/Table'
import ToolBar from '../../../../components/ToolBar'
import axios from '../../../../components/axios'

const Summary = () => {
  const [data, setData] = useState([]);
  const columns = [
    { title: "Name", field: "accs_name" },
    { title: "Quantity", field: "accs_quantity" },
    { title: "Description", field: "accs_description" },
    { title: "Material Code", field: "accs_materialcode" },
    { title: "Specification", field: "accs_spec" },
    { title: "Material Unit", field: "accs_materialunit" },
    { title: "Value", field: "accs_value" },
    { title: "Reference Number", field: "accs_referncenum" },
    { title: "Date", field: "accs_date" },
    { title: "Remark", field: "accs_remark" },
  ];
  useEffect(() => {
    axios.get("/wareHouse/finishedMaterial")
      .then((response)=>{
          setData(response.data)
        })
      .catch((response)=>{
        console.log(response)
      })
  }, []);
  return (
    <>
      <Head>
        <title>
          Summary
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="ml">
          {/* <ToolBar title="SIV" 
        href="/warehouse/stockList/Accessories/addSiv"  /> */}

          {/* <Typography
            sx={{ mb: 3 }}
            variant="h4"
          >
            Raw Material stockList
          </Typography> */}
          <Card maxWidth="lg">

            <Table
              title='Summary Report'
              data={data}
              columns={columns}
            // options={{
            //   actionsColumnIndex: -1,
            //   selection: true,

            // }}
            // actions={[
            //   {
            //     tooltip: 'Remove All Selected Users',
            //     icon: 'delete',
            //     onClick: (evt, data) => alert('You want to delete ' + data.length + ' rows')
            //   }
            // ]}
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
  )
};

Summary.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Summary;
