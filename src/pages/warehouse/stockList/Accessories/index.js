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
import ToolBar from '../../../../components/ToolBar'

const Accessories = () => {
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
    fetch("http://versavvy.com:49000/accessory")
      .then((resp) => resp.json())
      .then((resp) => setData(resp));
  }, []);
  return (
    <>
      <Head>
        <title>
        Accessories
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
        href="/warehouse/stockList/Accessories/addSiv"  />

          {/* <Typography
            sx={{ mb: 3 }}
            variant="h4"
          >
            Raw Material stockList
          </Typography> */}
          <Card maxWidth="lg">
        
        <Table 
          title='Accessories' 
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
  )
};

Accessories.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Accessories;
