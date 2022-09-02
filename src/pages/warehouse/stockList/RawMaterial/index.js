import React,{useState,useEffect} from 'react'
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
import ToolBar from "../../../../components/ToolBar";

const RawMaterial = () => {
  const [data, setData] = useState([]);
  const columns = [
    { title: "Name", field: "raw_name" },
    { title: "Quantity", field: "raw_quantity" },
    { title: "Description", field: "raw_description" },
    { title: "Material Code", field: "raw_materialcode" },
    { title: "Specification", field: "raw_spec" },
    { title: "Material Unit", field: "raw_materialunit" },
    { title: "Value", field: "raw_value" },
    { title: "Reference Number", field: "raw_referncenum" },
    { title: "Date", field: "raw_date" },
    { title: "Remark", field: "raw_remark" },
  ];
  useEffect(() => {
    fetch("http://versavvy.com:59000/rawmaterials")
      .then((resp) => resp.json())
      .then((resp) => setData(resp));
  }, []);
  return (
    <>
      <Head>
        <title>
          RawMaterial
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
        <ToolBar title="SIV" 
        href="/warehouse/stockList/RawMaterial/addSiv" />

          {/* <Typography
            sx={{ mb: 3 }}
            variant="h4"
          >
            Raw Material stockList
          </Typography> */}
          <Card maxWidth="lg">
        
        <Table 
          title='Raw Material stockList' 
          data={data} 
          columns={columns}
          options={{
            actionsColumnIndex: -1,
            selection: true,
            
          }}
          actions={[
            {
              tooltip: 'Remove All Selected Users',
              icon: 'delete',
              onClick: (evt, data) => alert('You want to delete ' + data.length + ' rows')
            }
          ]}
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

RawMaterial.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default RawMaterial;
