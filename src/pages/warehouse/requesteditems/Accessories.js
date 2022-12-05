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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Card,
  Typography,
  Divider
} from "@mui/material";
import { DashboardLayout } from "../../../components/dashboard-layout";
import Table from "../../../components/Table";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import waxios from '../../../components/wareHouseAxios';
import CustomAlert from '../../../components/alert'
import Router from 'next/router'
import { useSnackbar } from "notistack";

const Accessories = () => {
  const [data, setData] = useState([]);
  const [isSuccess, setIsSuccess] = useState('')
  const [alertMsg, setAlertMsg] = useState('')
  const [item, setItem] = useState();

  const { enqueueSnackbar } = useSnackbar();
  const [dialogOpen, setDialogOpen] = useState(false);



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
        const accessories = resp.data.filter((acc) => acc.req_materialtype.includes("ACCS"));
        // const pending = accessories.filter((pending) => pending.mat_status.includes("PENDING"));
        setData(accessories);
      })
      .catch((error) => {
        console.log(error, "sdfgsdfgsdfgsdfg")

      })
  }, []);

  const [acc, setAcc] = useState([]);
  const accept = async (id) => {
    await waxios
      .post("/responseStoreRequestion", {
        id: id,
        status: "Accept",
      })
      .then(function (response) {
        if (response.data.message === "no material in store please purchase these items") {
          setItem(response.data.materials[0].accs_name);
          setDialogOpen(true);

        } else {
          console.log(response);
          Router.push("/warehouse/requesteditems/Accessories");
          setIsSuccess('success');
          setAlertMsg('Item Accepted')
          enqueueSnackbar('Item Accepted', { variant: 'success' })

        }
      })
      .catch(function (error) {
        console.log(error);
        setIsSuccess('error')
        setAlertMsg('Something went wrong')

      });

  };

  const decline = async (id) => {
    await waxios
      .post("/responseStoreRequestion", {
        id: id,
        status: "Decline",
      })
      .then(function (response) {
        console.log(response);
        setIsSuccess('info');
        setAlertMsg('Item Rejected')
        enqueueSnackbar('Item Rejected', { variant: 'warning' });
      })
      .catch(function (error) {
        console.log(error);
        setIsSuccess('error')
        setAlertMsg('Something went wrong')
      });

  };

  return (
    <>
      <Head>
        <title>Accessories</title>
      </Head>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          <h1>Item Unavailable</h1>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className="flex flex-row gap-1 items-end">
              <h1 className="font-bold text-lg text-black">Item Name: </h1>
              <p>{item && item}</p>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
          sx={{
            backgroundColor: 'purple'
          }}
          onClick={()=>Router.push('/warehouse/PurchaseOrder')}
          >Purchase</Button>
          <Button>Cancel</Button>
        </DialogActions>

      </Dialog>
      {isSuccess != '' ? <CustomAlert setIsSuccess={setIsSuccess} type={isSuccess} message={alertMsg} /> : null}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          my: 12,
        }}
      >
        <Container
          maxWidth="ml">
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
              actions={[
                (rowData) => ({
                  icon: () => <DoneIcon sx={{ color: "green" }} />,
                  tooltip: "Accpet ",
                  onClick: () => accept(rowData.id),
                }),
                (rowData) => ({
                  icon: () => <CloseIcon sx={{ color: "red" }} />,
                  tooltip: "Reject ",
                  onClick: () => decline(rowData.id),
                }),
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

Accessories.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Accessories;
