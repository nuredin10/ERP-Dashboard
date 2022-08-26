import {useState,useEffect} from 'react'
import Head from 'next/head';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  Card,
  TextField,
  Typography
} from '@mui/material';
import { DashboardLayout } from '../../components/dashboard-layout';
import Table from '../../components/Table'

const AllRawMaterials = () => {

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
          AllRawMaterials
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
          title='All Raw Materials' 
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
}

AllRawMaterials.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default AllRawMaterials;
