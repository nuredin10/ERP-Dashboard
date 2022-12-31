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
} from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import Table from "../../components/Table";
import ToolBar from "../../components/ToolBar";
import FAxios from "../../components/financeAxios";
import InfoIcon from "@mui/icons-material/Info";
import Router from "next/router";

import { read, set_cptable, writeFileXLSX, utils } from "xlsx";
import xlsx from "xlsx";
import ReactToPrint, { useReactToPrint } from "react-to-print";

const AccountRecieveable = () => {
  const [data, setData] = useState([]);
  const [reason, setReason] = useState({});
  const sheetRef = useRef();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [
    { title: "Date", field: "sales_date" },
    { title: "ORDER REF", field: "salesId" },
    { title: "Address", field: "customer_address" },
    { title: "Total", field: "totalCash" },
    { title: "Status", field: "status" },
  ];
  useEffect(() => {
    FAxios.get("/shoesalesOrderProd")
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
          <Grid
            sx={{
              marginLeft: 20,
              display: "flex",
              flexDirection: "row",
              alignItems: "space-between",
              justifyContent: "space-between",
            }}
          >
            <Button onClick={excel} component="a" disableRipple variant="contained">
              Excel
            </Button>

            <Button
              onClick={print}
              sx={{
                ml: 5,
              }}
              component="a"
              disableRipple
              variant="contained"
            >
              Print
            </Button>
          </Grid>
          <div>
            <Card maxWidth="lg">
              <Table
                title="Account Recieveable"
                data={data}
                columns={columns}
                actions={[
                  (rowData) => ({
                    icon: () => <InfoIcon sx={{ color: "primary.main" }} />,
                    tooltip: "Details",
                    onClick: () => {
                      Router.push({
                        pathname: "/finance/materialSold",
                        query: {
                          id: rowData.id,
                        },
                      });
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
                onClick={() => GernerateDO(reason.salesID, reason.ID)}
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
