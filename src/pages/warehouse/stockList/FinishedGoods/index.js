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

const FinishedGoods = () => {
  const [data, setData] = useState([]);
  const columns = [
    { title: "Name", field: "finished_name" },
    { title: "Quantity", field: "finished_quantity" },
    { title: "Description", field: "finished_description" },
    { title: "Material Code", field: "finished_materialcode" },
    { title: "Specification", field: "finished_spec" },
    { title: "Material Unit", field: "finished_materialunit" },
    { title: "Value", field: "finished_value" },
    { title: "Reference Number", field: "finished_referncenum" },
    { title: "Date", field: "finished_date" },
    { title: "Remark", field: "finished_remark" },
  ];
  useEffect(() => {
    fetch("http://versavvy.com:49000/finishedMaterial")
      .then((resp) => resp.json())
      .then((resp) => setData(resp));
  }, []);
  return (
    <>
      <Head>
        <title>
        Finished Goods
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
        href="/warehouse/stockList/FinishedGoods/addSiv" />

          {/* <Typography
            sx={{ mb: 3 }}
            variant="h4"
          >
            Raw Material stockList
          </Typography> */}
          <Card maxWidth="lg">
        
        <Table 
          title='Finished Goods' 
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

FinishedGoods.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default FinishedGoods;
