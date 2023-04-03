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
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState([]);
  const [reason, setReason] = useState({});
  const [BankList, setBankListList] = useState({});
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
    { title: "Bank Name", field: "bank_name" },
    { title: "bank_account", field: "bank_account" },
    { title: "payed amount", field: "payed_amount" },
    { title: "remaining", field: "remaining" },
  ];

  useEffect(async () => {
    if (id) {
      try {
        console.log("here", id)
        const response = await FAxios.post("/showBankStatment", {
          ID: id,
        });
        const reason2 = response.data;
        console.log(reason2);
        setData(reason2);
      } catch (err) {
        console.log(err);
      }
    }
  }, [id]);

  const onSubmit = (newForm) => {
    console.log("Quan", { ...newForm });
    const data = {};
    FAxios.post("/completePayment", newForm)
      .then((respo) => {
        enqueueSnackbar("Saved Successfully", { variant: "success" });
        FAxios.post("/sendNotification", {
          To: "finance",
          message: "New Finshed Item Requestion Accepted",
        }).then((respo) => {
          enqueueSnackbar("Notification Sent", { variant: "success" });
        });
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
              title="Bank Statment"
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
              <>
                {" "}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={3} mt={3}>
                    <Grid item lg={12}>
                      <Typography variant="h6" component="h2">
                        Payment Update
                      </Typography>
                      <Grid item xs={12} sm={6} sx={{ mb: 5, mt: 5 }}>
                        <TextField
                          required
                          name="remaining"
                          label="Bank Name"
                          type="text"
                          fullWidth
                          {...register("bankName")}
                        />
                        <TextField hidden type="hidden" value={id} {...register("ID")} />
                      </Grid>
                      <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
                        <TextField
                          required
                          name="remaining"
                          label="Bank Account"
                          type="text"
                          fullWidth
                          {...register("bankAccount")}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          name="remaining"
                          label="Insert Payed Amount"
                          type="text"
                          fullWidth
                          {...register("newPayment")}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Button
                    sx={buttonstyle}
                    variant="outlined"
                    type="submit"
                    // onClick={() => GernerateDO(reason.id, newForm.remaining)}
                  >
                    Complete Update
                  </Button>
                </form>
              </>
            </Box>
          </Modal>
        </Container>
      </Box>
    </>
  );
};

AccountRecieveable.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AccountRecieveable;
