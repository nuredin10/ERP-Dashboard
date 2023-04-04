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
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

const AccountRecieveable = () => {
  const [data, setData] = useState([]);
  const [reason, setReason] = useState({});
  const { register, handleSubmit, reset } = useForm();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { enqueueSnackbar } = useSnackbar();
  const Router = useRouter();

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  }
  const columns = [
    { title: "Date", field: "order_date" },
    { title: "Name", field: "customer_name" },
    { title: "Sales Number", field: "salesID" },
    { title: "Amount", field: "cus_total" },
    { title: "Payment status", field: "payment" },
    { title: "Payment Advance", field: "cus_advance" },
    { title: "Payment Remaining", field: "cust_remaining" },
    { title: "Status", field: "status" },
  ];
  useEffect(() => {
    FAxios.get("/showSalesOrder")
      .then((res) => {
        res.data.map((eachData) => {
          eachData.order_date = convert(eachData.order_date);
          eachData.cus_total =
            eachData.cus_total !== "" ? parseFloat(eachData.cus_total).toLocaleString("en-US") : "";
          eachData.cus_advance =
            eachData.cus_advance !== ""
              ? parseFloat(eachData.cus_advance).toLocaleString("en-US")
              : "";
          eachData.cust_remaining =
            eachData.cust_remaining !== ""
              ? parseFloat(eachData.cust_remaining).toLocaleString("en-US")
              : "";
        });
        setData(res.data);
        console.log("show data", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmit = (newForm) => {
    console.log("Quan", { ...newForm });
    const data = {};
    FAxios.post("/completeRecibableSalesOrder", newForm)
      .then((respo) => {
        enqueueSnackbar("Saved Successfully", { variant: "success" });

        Router.reload();
      })
      .catch((err) => {
        enqueueSnackbar("Something went wrong ", { variant: "error" });
        console.log(err);
      });
  };

  const details = (data) => {
    setReason(data);
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
              // actions={}
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
                    Material Name
                  </Typography>
                </Grid>
                <Grid item lg={7}>
                  <Typography>{reason.product_orderd}</Typography>
                </Grid>
                <Grid item lg={4}>
                  <Typography variant="h6" component="h2">
                    Material Description
                  </Typography>
                </Grid>
                <Grid item lg={7}>
                  <Typography>{reason.product_desc}</Typography>
                </Grid>

                <Grid item lg={4}>
                  <Typography variant="h6" component="h2">
                    Material Quantity
                  </Typography>
                </Grid>
                <Grid item lg={7}>
                  <Typography>{reason.total_product}</Typography>
                </Grid>
                <Grid item lg={4}>
                  <Typography variant="h6" component="h2">
                    Material Specification
                  </Typography>
                </Grid>
                <Grid item lg={7}>
                  <Typography>{reason.product_spec}</Typography>
                </Grid>
                <Grid item lg={4}>
                  <Typography variant="h6" component="h2">
                    UOM
                  </Typography>
                </Grid>
                <Grid item lg={7}>
                  <Typography>{reason.mou}</Typography>
                </Grid>
                <Grid item lg={4}>
                  <Typography variant="h6" component="h2">
                    Material Color
                  </Typography>
                </Grid>
                <Grid item lg={7}>
                  <Typography>{reason.product_color}</Typography>
                </Grid>
              </Grid>
              {reason.status !== "Cash" ? (
                <>
                  {" "}
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3} mt={3}>
                      <Grid item lg={12}>
                        <Typography variant="h6" component="h2">
                          Payment Update
                        </Typography>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            name="remaining"
                            label="Insert Payed Amount"
                            type="text"
                            fullWidth
                            {...register("remaining")}
                          />
                          <TextField hidden type="hidden" value={reason.id} {...register("ID")} />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Button
                      sx={buttonstyle}
                      variant="outlined"
                      type="submit"
                      // onClick={() => GernerateDO(reason.id, newForm.remaining)}
                    >
                      Complete Order
                    </Button>
                  </form>
                </>
              ) : null}
            </Box>
          </Modal>
        </Container>
      </Box>
    </>
  );
};

AccountRecieveable.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AccountRecieveable;
