import React, { useState, useEffect, useRef } from "react";
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
  Radio,
} from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import Table from "../../components/Table";
import FAxios from "../../components/financeAxios";
import InfoIcon from "@mui/icons-material/Info";
import Router from "next/router";
import { useForm } from "react-hook-form";
import CButton from "../../components/Button";
import { read, set_cptable, writeFileXLSX, utils } from "xlsx";
import xlsx from "xlsx";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { useSnackbar } from "notistack";

const AccountRecieveable = () => {
  const { register, handleSubmit, reset } = useForm();
  const [data, setData] = useState([]);
  const [selectedID, setselectedID] = useState();
  const [vat, setVat] = useState();
  const [reason, setReason] = useState({});
  const sheetRef = useRef();
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onSubmit = (newForm) => {
    console.log(newForm);
    FAxios.post("/changerawvalue", {
      id: selectedID,
      newvalue: newForm.BatchId,
    })
      .then((respo) => {
        enqueueSnackbar("Saved Generated", { variant: "success" });
        Router.reload();
      })
      .catch((err) => {
        enqueueSnackbar("Error Check the Batch ID", { variant: "error" });
      });
  };
  const handleChange = (vats) => {
    console.log(vats);
    setVat(vats);
  };

  const columns = [
    { title: "Raw Materials", field: "raw_name" },
    { title: "price/kg", field: "raw_value" },
  ];
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
  }
  useEffect(() => {
    FAxios.get("/rawmaterials")
      .then((res) => {
        res.data.map((eachData) => {
          eachData.raw_value =
            eachData.raw_value !== "" ? parseFloat(eachData.raw_value).toLocaleString("en-US") : "";
        });
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
  const excel = () => {
    const XLSX = xlsx;
    const workbook = utils.book_new();
    const worksheet = utils.json_to_sheet(data);
    utils.book_append_sheet(workbook, worksheet, "Report");
    writeFileXLSX(workbook, "Report.xlsx");
  };
  const print = useReactToPrint({
    content: () => sheetRef.current,
  });

  return (
    <>
      <Head>
        <title>Raw Material | Proplast</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="ml">
          <Grid
            sx={{
              marginLeft: 20,
              display: "flex",
              flexDirection: "row",
              alignItems: "space-between",
              justifyContent: "space-between",
            }}
          ></Grid>
          <div>
            <Card maxWidth="lg">
              <Table
                title="Raw Materials Values"
                data={data}
                columns={columns}
                actions={[
                  (rowData) => ({
                    icon: () => <InfoIcon sx={{ color: "primary.main" }} />,
                    tooltip: "Details",
                    onClick: () => {
                      setOpen(true);
                      setselectedID(rowData.id);
                    },
                  }),
                ]}
              />

              <div className="hidden">
                <div ref={sheetRef}>
                  <Table title="raw material values" data={data} columns={columns} />
                </div>
              </div>
            </Card>
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                  <Grid item lg={12}>
                    <Typography variant="h5" component="h2">
                      Raw material Values
                    </Typography>
                  </Grid>
                  <Grid item lg={4}>
                    <Typography variant="h6" component="h2">
                      new Value
                    </Typography>
                  </Grid>
                  <Grid item lg={7}>
                    <TextField
                      required
                      name="BatchId"
                      label="new Rawmaterial value"
                      type="text"
                      fullWidth
                      {...register("BatchId")}
                    />
                  </Grid>
                  {/* <Grid item lg={4}>
                    <Typography variant="h6" component="h2">
                      VAT
                    </Typography>
                  </Grid> */}
                  {/* <Grid item lg={7}>
                    <TextField
                      required
                      name="VAT"
                      label="VAT"
                      type="text"
                      fullWidth
                      {...register("VAT")}
                    />
                  </Grid> */}
                </Grid>
                <Grid item lg={7}>
                  <CButton sx={buttonstyle} variant="contained" type="submit">
                    Change Values
                  </CButton>
                </Grid>
              </form>
            </Box>
          </Modal>
        </Container>
      </Box>
    </>
  );
};

AccountRecieveable.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AccountRecieveable;
