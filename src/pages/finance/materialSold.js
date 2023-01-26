import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { DashboardLayout } from "../../components/dashboard-layout";
import { useRouter } from "next/router";
import axios from "axios";
import productionWxios from "../../components/productionWxios";
// import styles from '../styles/Home.module.css';
// import Table from "../../components/Table";
import SummarizeIcon from "@mui/icons-material/Summarize";
import CButton from "../../components/Button";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  Card,
  TextField,
  Modal,
  Typography,
  Divider,
  hexToRgb,
  Grid,
} from "@mui/material";
import { useForm } from "react-hook-form";
import OrdersToolBar from "../../components/rawMaterials/order-toolbar";
import { OrderResults } from "../../components/rawMaterials/order-results";
import RightDrawer from "../../components/rawMaterials/RightDrawer";
import Router from "next/router";
import ReactToPrint, { useReactToPrint } from "react-to-print";

const FinishedGoods = () => {
  const router2 = useRouter();
  const { id } = router2.query;
  const [data, setData] = useState([]);
  const [productName, setProductName] = useState("");
  const [ProductQuntity, setProductQuntity] = useState("");
  const [totalSales, setTotalSales] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [productdata, setproductData] = useState([]);
  const [profitData, setProfitData] = useState([]);
  const [profit, setProfit] = useState();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (newForm) => {
    console.log(newForm);
    productionWxios
      .post("/updateProfit", {
        salesID: data[0].SID,
        costId: newForm.BatchId,
        VAT: newForm.VAT,
        ProfitID: data[0].id,
      })
      .then((respo) => {
        console.log(respo);
      });
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

  const sheetRef = useRef();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#fff" : "#61482A",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.common.white,
    width: "40",
  }));

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#61482A",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 1,
    },
  }));

  const columns = [
    { title: "Name", field: "raw_name" },
    { title: "Quantity", field: "raw_quantity" },
    { title: "Material Code", field: "raw_materialcode" },
    { title: "Material Unit", field: "raw_materialunit" },
    { title: "Date", field: "raw_date" },
  ];

  useEffect(async () => {
    console.log(id);
    await productionWxios
      .post("/shoesalesOrderProdById", { ID: id })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setProductName(response.data[0].product_orderd);
        setProductQuntity(response.data[0].total_product);
        setTotalSales(response.data[0].totalCash);
        setProfit(response.data[0].profit);
        productionWxios
          .post("/selectproductionCost", {
            ProdID: response.data[0].producedId,
          })
          .then((response2) => {
            console.log(response2);
            setproductData(response2.data);
            setProfitData(response2.data[0]);
          })
          .catch((response) => {
            console.log(response);
          });
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  const print = useReactToPrint({
    content: () => sheetRef.current,
  });

  return (
    <>
      <Head>
        <title>RawMaterials | Proplast</title>
      </Head>
      <Box
        component="main"
        sx={
          {
            // display: ''
          }
        }
      >
        <Container
          sx={{
            display: {
              xs: "none",
              lg: "block",
            },
          }}
          maxWidth="ml"
        >
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
          <Button
            onClick={() => setOpen(true)}
            sx={{
              ml: 5,
            }}
            component="a"
            disableRipple
            variant="contained"
          >
            Change Batch
          </Button>
          <Grid container spacing={3} ref={sheetRef}>
            <Grid item sx={{ width: "80%" }}>
              <Typography variant="h5" sx={{ my: 2 }}>
                Customer Information
              </Typography>
              <Card>
                {data && (
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 400 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="left">Customer Name</StyledTableCell>
                          <StyledTableCell align="left">Customer Address</StyledTableCell>
                          <StyledTableCell align="left">Tin Number</StyledTableCell>
                          <StyledTableCell align="left">Status</StyledTableCell>
                          <StyledTableCell align="left">Total</StyledTableCell>
                          <StyledTableCell align="left">Advance Payment</StyledTableCell>
                        </TableRow>
                        {/* <StyledTableCell align="right">Advance Payment</StyledTableCell> */}
                      </TableHead>
                      <TableBody>
                        {data.map((row) => (
                          <StyledTableRow key={row.name}>
                            <StyledTableCell align="left">{row.customer_name}</StyledTableCell>
                            <StyledTableCell align="left">{row.customer_address}</StyledTableCell>
                            <StyledTableCell align="left">{row.customer_tin}</StyledTableCell>
                            <StyledTableCell align="left">{row.status}</StyledTableCell>
                            <StyledTableCell align="left">{row.totalCash}</StyledTableCell>
                            <StyledTableCell align="left">{row.advances}</StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Card>
            </Grid>

            <Grid item sx={{ width: "80%" }}>
              <Typography variant="h5" sx={{ my: 2 }}>
                Order Information
              </Typography>

              <Card>
                {data && (
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 400 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="left">Product Orderd</StyledTableCell>
                          <StyledTableCell align="left">Qty</StyledTableCell>
                          <StyledTableCell align="left">UOM</StyledTableCell>
                          <StyledTableCell align="left">Product Description</StyledTableCell>
                          <StyledTableCell align="left">Product Specification</StyledTableCell>
                          <StyledTableCell align="left">Product Color</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((row) => (
                          <StyledTableRow key={row.name}>
                            <StyledTableCell align="left">{row.product_orderd}</StyledTableCell>
                            <StyledTableCell align="left">{row.total_product}</StyledTableCell>
                            <StyledTableCell align="left">{row.mou}</StyledTableCell>
                            <StyledTableCell align="left">{row.product_desc}</StyledTableCell>
                            <StyledTableCell align="left">{row.product_spec}</StyledTableCell>
                            <StyledTableCell align="left">{row.product_color}</StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Card>
            </Grid>

            <Grid item sx={{ width: "80%" }}>
              <Typography variant="h5" sx={{ my: 2 }}>
                Raw Materials
              </Typography>

              <Card maxWidth="lg">
                {data && (
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 400 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="left">Raw Material Name</StyledTableCell>
                          <StyledTableCell align="left">Qty</StyledTableCell>
                          <StyledTableCell align="left">UOM</StyledTableCell>
                          <StyledTableCell align="left">Product Material Code</StyledTableCell>
                          <StyledTableCell align="left">Value Per Gram</StyledTableCell>
                          <StyledTableCell align="left">Total</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {productdata.map((row) => (
                          <StyledTableRow key={row.name}>
                            <StyledTableCell align="left">{row.raw_name}</StyledTableCell>
                            <StyledTableCell align="left">{row.each_quantity}</StyledTableCell>
                            <StyledTableCell align="left">{row.mat_unit}</StyledTableCell>
                            <StyledTableCell align="left">{row.raw_materialcode}</StyledTableCell>
                            <StyledTableCell align="left">{row.each_value}</StyledTableCell>
                            <StyledTableCell align="left">{row.each_total}</StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Card>
            </Grid>

            <Grid item sx={{ width: "50%", mb: 5 }}>
              <Typography variant="h5" sx={{ my: 2 }}>
                Finance Report
              </Typography>

              {data && (
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3, mt: 5 }}>
                  <Grid item xs={6}>
                    <Item>Total rawmaterial Weight</Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>{profitData.total_mass} KG</Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>Total Rawmaterial Cost</Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>{profitData.total_raw_cost} ETB</Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>1 KG Rawmaterial Cost</Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>{profitData.oneKgCost} ETB</Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>Mass of 1 {productName}</Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>{profitData.finished_mass} KG</Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>Cost of 1 {productName}</Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>{profitData.oneFinCost} ETB</Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>Other Cost</Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>{profitData.other_cost} ETB</Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>Total Cost </Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>{profitData.finishedWVat} ETB</Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>Total Sales</Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>{totalSales} ETB </Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>Quantity Sold</Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>{ProductQuntity} PCS</Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>Production Cost * Quantity Orderd</Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>
                      {parseFloat(profitData.finishedWVat) * parseFloat(ProductQuntity)} ETB
                    </Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>Profit</Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>{profit} ETB</Item>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
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

FinishedGoods.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default FinishedGoods;
