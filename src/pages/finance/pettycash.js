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
import ToolBar from "../../components/ToolBar";
import FAxios from "../../components/financeAxios";
import InfoIcon from "@mui/icons-material/Info";
import Router from "next/router";
import { useForm } from "react-hook-form";
import CButton from "../../components/Button";
import { read, set_cptable, writeFileXLSX, utils } from "xlsx";
import xlsx from "xlsx";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const AccountRecieveable = () => {
  const { register, handleSubmit, reset } = useForm();
  const [data, setData] = useState([]);
  const [selectedID, setselectedID] = useState();
  const [vat, setVat] = useState();
  const [reason, setReason] = useState({});
  const sheetRef = useRef();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onSubmit = (newForm) => {
    console.log(newForm);
    FAxios.post("/generateProfit", {
      salesID: selectedID,
      costId: newForm.BatchId,
      VAT: newForm.VAT,
    }).then((respo) => {
      console.log(respo);
    });
  };
  const handleChange = (vats) => {
    console.log(vats);
    setVat(vats);
  };

  const columns = [
    { title: "Date", field: "sales_date" },
    { title: "ORDER REF", field: "salesId" },
    { title: "Address", field: "customer_address" },
    { title: "Total", field: "totalCash" },
    { title: "Status", field: "status" },
  ];
  useEffect(() => {
    FAxios.get("/showsalesOrderprofit")
      .then((res) => {
        setData(res.data);
        console.log("show data", res.data);
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
        <title>Sales | Proplast</title>
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
          >
            {/* <Button onClick={excel} component="a" disableRipple variant="contained">
              Excel
            </Button> */}

            {/* <Button
              onClick={print}
              sx={{
                ml: 5,
              }}
              component="a"
              disableRipple
              variant="contained"
            >
              Print
            </Button> */}
          </Grid>
          <div>
            <Card maxWidth="lg">
              <Table
                title="Generate Profit"
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
                  <Table title="Account Recieveable" data={data} columns={columns} />
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
                      Generate Profit
                    </Typography>
                  </Grid>
                  <Grid item lg={4}>
                    <Typography variant="h6" component="h2">
                      Batch ID
                    </Typography>
                  </Grid>
                  <Grid item lg={7}>
                    <TextField
                      required
                      name="BatchId"
                      label="Batch ID"
                      type="text"
                      fullWidth
                      {...register("BatchId")}
                    />
                  </Grid>
                  <Grid item lg={4}>
                    <Typography variant="h6" component="h2">
                      VAT
                    </Typography>
                  </Grid>
                  <Grid item lg={7}>
                    <TextField
                      required
                      name="VAT"
                      label="VAT"
                      type="text"
                      fullWidth
                      {...register("VAT")}
                    />
                    {/* <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">VAT</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="0"
                        name="radio-buttons-group"
                        onChange={handleChange(value)}
                      >
                        <FormControlLabel value="0" control={<Radio />} label="Without VAT" />
                        <FormControlLabel value="1" control={<Radio />} label="With VAT" />
                      </RadioGroup>
                    </FormControl> */}
                  </Grid>
                </Grid>
                <Grid item lg={7}>
                  <CButton
                    sx={buttonstyle}
                    variant="contained"
                    type="submit"
                    // onClick={() => GernerateDO(reason.salesID, reason.ID)}
                  >
                    Generate Profit
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
