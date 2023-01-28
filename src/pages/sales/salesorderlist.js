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
import { useSnackbar } from "notistack";
import CButton from "../../components/Button";

const AccountRecieveable = () => {
  const [data, setData] = useState([]);
  const [reason, setReason] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [
    { title: "Date", field: "order_date" },
    { title: "Name", field: "customer_name" },
    { title: "Tin Number", field: "Tin_number" },
    { title: "Amount", field: "cus_total" },
    { title: "Payment status", field: "payment" },
    { title: "Payment Advance", field: "cus_advance" },
    { title: "Status", field: "status" },
  ];

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  }
  useEffect(() => {
    FAxios.get("/showSalesOrder")
      .then((resp) => {
        console.log(resp);
        resp.data.map((eachData) => {
          eachData.order_date = convert(eachData.order_date);
        });
        setData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const GernerateDO = (ID) => {
    FAxios.post("/acceptSalesOrder", {
      ID: ID,
    })
      .then((respo) => {
        console.log(respo);
        enqueueSnackbar("Saved Successfully", { variant: "success" });
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Something went wrong", { variant: "error" });
      });
  };
  const details = (data) => {
    setReason(data);
    console.log(reason);
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
        <title>Sales Order | Proplast</title>
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
              title="Sales Order"
              data={data}
              columns={columns}
              actions={[
                (rowData) => ({
                  icon: () => <InfoIcon sx={{ color: "primary.main" }} />,
                  tooltip: "Details",
                  onClick: () => details(rowData),
                }),
              ]}
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
                    Product Order
                  </Typography>
                </Grid>
                <Grid item lg={4}>
                  <Typography variant="h6" component="h2">
                    Material Name
                  </Typography>
                </Grid>
                <Grid item lg={7}>
                  <Typography>{reason.final_product}</Typography>
                </Grid>
                <Grid item lg={4}>
                  <Typography variant="h6" component="h2">
                    Material Color
                  </Typography>
                </Grid>
                <Grid item lg={7}>
                  <Typography>{reason.final_color}</Typography>
                </Grid>

                <Grid item lg={4}>
                  <Typography variant="h6" component="h2">
                    Material Quantity
                  </Typography>
                </Grid>
                <Grid item lg={7}>
                  <Typography>{reason.final_quant}</Typography>
                </Grid>
                <Grid item lg={4}>
                  <Typography variant="h6" component="h2">
                    Material Specification
                  </Typography>
                </Grid>
                <Grid item lg={7}>
                  <Typography>{reason.final_diameter}</Typography>
                </Grid>
                <Grid item lg={4}>
                  <Typography variant="h6" component="h2">
                    Material Code
                  </Typography>
                </Grid>
                <Grid item lg={7}>
                  <Typography>{reason.final_materialCode}</Typography>
                </Grid>
                <Grid item lg={4}>
                  <Typography variant="h6" component="h2">
                    Material Color
                  </Typography>
                </Grid>
                <Grid item lg={7}>
                  <Typography>{reason.final_color}</Typography>
                </Grid>
              </Grid>
              {reason.status !== "Accepted" ? (
                <Button sx={buttonstyle} variant="outlined" onClick={() => GernerateDO(reason.id)}>
                  Accept Order
                </Button>
              ) : (
                <></>
              )}
            </Box>
          </Modal>
        </Container>
      </Box>
    </>
  );
};

AccountRecieveable.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AccountRecieveable;
