import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  TextField,
  Card,
  Typography,
} from "@mui/material";
import { DashboardLayout } from "../../../components/dashboard-layout";
import Table from "../../../components/Table";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import Router from 'next/router'
import waxios from '../../../components/wareHouseAxios'
import { useSnackbar } from "notistack";
import CustomAlert from '../../../components/alert'

const RawMaterial = () => {
  const [data, setData] = useState([]);
  const [isSuccess, setIsSuccess] = useState('')
  const [alertMsg, setAlertMsg] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const columns = [
    { title: "Name", field: "mat_requestname" },
    { title: "Date", field: "mat_requestdate" },
    { title: "Department", field: "mat_requestdept" },
    { title: "Person Id", field: "mat_reqpersonid" },
    { title: "Description", field: "mat_description" },
    { title: "Quantity", field: "mat_quantity" },
    { title: "Status", field: "mat_status" },
  ];

  const handleClickOpen = () => {
    setDialogOpen(true);
  }
  const handleClose = () => {
    setDialogOpen(false);
  }


  useEffect(() => {
    waxios.get('/showStoreRequestion')
      .then((resp) => {
        console.log(resp.data)
        const rawMaterial = resp.data.filter((raw) => raw.req_materialtype.includes("RAW"));
        const pending = rawMaterial.filter((pending) => pending.mat_status.includes("PENDING"));
        setData(pending);
      })
      .catch((error) => {
        console.log(error, "sdfgsdfgsdfgsdfg")

      })
  }, []);

  // const [rawmaterial, setRawmaterial] = useState([]);
  // console.log(data)

  // useEffect(()=>{
  //   // const raw = data.filter( (raw) => raw.req_materialtype.includes("RAW"))
  //   setRawmaterial(data)
  // },[])
  const accept = async (id) => {
    await waxios.post('/responseStoreRequestion', {
      id: id,
      status: "Accept"
    })
      .then(function (response) {
        console.log(response);
        Router.push("/requesteditems/RawMaterial")
        setIsSuccess('success');
        setAlertMsg('Item Accepted')
        enqueueSnackbar('Item Accepted', { variant: 'success' })
      })
      .catch(function (error) {
        console.log(error);
        setIsSuccess('error')
        setAlertMsg('Something went wrong')
        setDialogOpen(true);
      });

  }

  const decline = async (id) => {
    await waxios.post('/responseStoreRequestion', {
      id: id,
      status: "Decline"
    })
      .then(function (response) {
        console.log(response);
        setIsSuccess('info');
        setAlertMsg('Item Rejected');
        enqueueSnackbar('Item Rejected', {variant: 'warning'})
      })
      .catch(function (error) {
        console.log(error);
        setIsSuccess('error')
        setAlertMsg('Something went wrong')
      });

  }
  return (
    <>
      <Head>
        <title>RawMaterial</title>
      </Head>
      {isSuccess != '' ? <CustomAlert setIsSuccess={setIsSuccess} type={isSuccess} message={alertMsg} /> : null}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          my: 12,
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
                  icon: () => < DoneIcon sx={{ color: 'green' }} />,
                  tooltip: 'Accpet ',
                  onClick: () => (accept(rowData.id))
                }),
                rowData => ({
                  icon: () => < CloseIcon sx={{ color: 'red' }} />,
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
