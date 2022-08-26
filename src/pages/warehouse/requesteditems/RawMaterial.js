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
import { DashboardLayout } from '../../../components/dashboard-layout';
import Table from '../../../components/Table'
const RawMaterial = () => {
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
