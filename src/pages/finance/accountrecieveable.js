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
  Modal,
  Grid,
  Typography,
} from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import Table from "../../components/Table";
import ToolBar from "../../components/ToolBar";
import FAxios from "../../components/financeAxios";
import InfoIcon from "@mui/icons-material/Info";

const AccountRecieveable = () => {
  const [data, setData] = useState([]);
  const [reason, setReason] = useState({});

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [
    { title: "Name", field: "recevable_name" },
    { title: "Tim Number", field: "recevable_tin" },
    { title: "Amount", field: "recevable_amount" },
    { title: "Start Date", field: "recivable_stdate" },
    { title: "End Date", field: "recevable_endate" },
    { title: "Status", field: "recevable_status" },
  ];
  useEffect(() => {
    FAxios.get("/showaccountRecivable")
      .then((res) => {
        setData(res.data);
        console.log("show data", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const GernerateDO = (sales, ID) => {
    console.log("sales", sales);
    console.log("ID", ID);
    FAxios.post("/completeSalesOrder", {
      salesID: sales,
      ID: ID,
    })
      .then((respo) => {
        console.log(respo);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const details = (id, salesIDs, IDS) => {
    const req = {
      id: id,
    };
    FAxios.post("/showReasonById", req)
      .then((res) => {
        const allData = { ...res.data[0], ID: IDS, salesID: salesIDs };
        console.log("reason", allData);
        setReason(allData);
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(id)
    handleOpen();
  };

  const style = {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 1,
    p: 4,
    pb: 10,
  };

  const buttonstyle = {
    position: "absolute",
    mt: 20,
    align: "right",
    bottom: 10,
    right: 10,
  };

  return (
    <>
      <Head>
        <title>Account Recieveable | Proplast</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="ml">
          {/* <ToolBar title="customer" href="/sales/Customers/addCustomers" /> */}
          <Card maxWidth="lg">
            <Table
              title="Account Recieveable"
              data={data}
              columns={columns}
              actions={[
                (rowData) => ({
                  icon: () => <InfoIcon sx={{ color: "primary.main" }} />,
                  tooltip: "Details",
                  onClick: () => details(rowData.reasonID, rowData.salesID, rowData.id),
                }),
              ]}
              //   options={{
              //     actionsColumnIndex: -1,
              //     selection: true,
              //   }}
              //   actions={[
              //     {
              //       tooltip: "Remove All Selected Users",
              //       icon: "delete",
              //       onClick: (evt, data) => alert("You want to delete " + data.length + " rows"),
              //     },
              //   ]}
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
                <Grid item lg={12}>
                  <Typography variant="h5" component="h2">
                    Recieveable Reason
                  </Typography>
                </Grid>
                <Grid item lg={4}>
                  <Typography variant="h6" component="h2">
                    Material Description
                  </Typography>
                </Grid>
                <Grid item lg={7}>
                  <Typography>{reason.material_desc}</Typography>
                </Grid>
                <Grid item lg={4}>
                  <Typography variant="h6" component="h2">
                    Material Name
                  </Typography>
                </Grid>
                <Grid item lg={7}>
                  <Typography>{reason.material_name}</Typography>
                </Grid>
                <Grid item lg={4}>
                  <Typography variant="h6" component="h2">
                    Material Quantitty
                  </Typography>
                </Grid>
                <Grid item lg={7}>
                  <Typography>{reason.material_quantity}</Typography>
                </Grid>
                <Grid item lg={4}>
                  <Typography variant="h6" component="h2">
                    Material Specification
                  </Typography>
                </Grid>
                <Grid item lg={7}>
                  <Typography>{reason.material_spec}</Typography>
                </Grid>
                <Grid item lg={4}>
                  <Typography variant="h6" component="h2">
                    Material Type
                  </Typography>
                </Grid>
                <Grid item lg={7}>
                  <Typography>{reason.material_type}</Typography>
                </Grid>
                <Grid item lg={4}>
                  <Typography variant="h6" component="h2">
                    Material Unit
                  </Typography>
                </Grid>
                <Grid item lg={7}>
                  <Typography>{reason.material_unit}</Typography>
                </Grid>
              </Grid>
              <Button
                sx={buttonstyle}
                variant="contained"
                onClick={GernerateDO(reason.salesID, reason.ID)}
              >
                Generate DO
              </Button>
            </Box>
          </Modal>
        </Container>
      </Box>
    </>
  );
};

AccountRecieveable.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AccountRecieveable;
