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
  Modal,
  Grid,
} from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import Table from "../../components/Table";
import ToolBar from "../../components/ToolBar";
import FAxios from "../../components/financeAxios";
import InfoIcon from "@mui/icons-material/Info";

const AccountPayable = () => {
  const columns = [
    { title: "First Date", field: "payable_firstdate" },
    { title: "Payable Name", field: "payable_name" },
    { title: "Account Number", field: "payable_accountnum" },
    { title: "Value", field: "payable_value" },
    // { title: "Person", field: "payable_person" },
    { title: "Status", field: "payable_status" },
  ];
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  }
  const [data, setData] = useState([]);
  const [reason, setReason] = useState({});

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    FAxios.get("/showaccountpayable")
      .then((res) => {
        res.data.map((eachData) => {
          eachData.payable_firstdate = convert(eachData.payable_firstdate);
        });
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      

  }, []);

  const details = (id) => {
    const req = {
      id: id,
    };
    FAxios.post("/showReasonById", req)
      .then((res) => {
        console.log(res.data[0]);
        setReason(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(id)
    handleOpen();
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 1,
    p: 4,
  };

  return (
    <>
      <Head>
        <title>Account Payable | Proplast</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="ml">
          <Card maxWidth="lg">
            <Table
              title="Account Payable"
              data={data}
              columns={columns}
              options={{
                actionsColumnIndex: -1,
                selection: true,
              }}
              actions={[
                (rowData) => ({
                  icon: () => <InfoIcon sx={{ color: "primary.main" }} />,
                  tooltip: "Details",
                  onClick: () => details(rowData.reason_id),
                }),
              ]}
              localization={{
                header: {
                  actions: "Payment Reason",
                },
              }}
            />
          </Card>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              
              <Grid container spacing={3}>
                
                <Grid item lg={12} >
                  <Typography variant="h5" component="h2">
                    Payment Reason
                  </Typography>
                </Grid>
                <Grid item lg={4} >
                  <Typography variant="h6" component="h2">
                    Material Description
                  </Typography>
                </Grid>
                <Grid item lg={7}>
                  <Typography>
                    {reason.material_desc}
                  </Typography>
                </Grid>
                <Grid item lg={4}>
                  <Typography variant="h6" component="h2">
                    Material Name
                  </Typography>
                </Grid>
                <Grid item lg={7}>
                  <Typography>
                    {reason.material_name}
                  </Typography>
                </Grid>
                <Grid item lg={4}>
                  <Typography variant="h6" component="h2">
                    Material Quantitty
                  </Typography>
                </Grid>
                <Grid item lg={7}>
                  <Typography>
                    {reason.material_quantity}
                  </Typography>
                </Grid>
                <Grid item lg={4}>
                  <Typography variant="h6" component="h2">
                    Material Specification
                  </Typography>
                </Grid>
                <Grid item lg={7}>
                  <Typography>
                    {reason.material_spec}
                  </Typography>
                </Grid>
                <Grid item lg={4}>
                  <Typography variant="h6" component="h2">
                    Material Type
                  </Typography>
                </Grid>
                <Grid item lg={7}>
                  <Typography>
                    {reason.material_type}
                  </Typography>
                </Grid>
                <Grid item lg={4}>
                  <Typography variant="h6" component="h2">
                    Material Unit
                  </Typography>
                </Grid>
                <Grid item lg={7}>
                  <Typography>
                    {reason.material_unit}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Modal>
        </Container>
      </Box>
    </>
  );
};

AccountPayable.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AccountPayable;
