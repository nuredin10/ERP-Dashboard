import React, { useState, useEffect } from "react";
import Head from "next/head";
import { DashboardLayout } from "../../components/dashboard-layout";
import { useRouter } from "next/router";
import axios from "axios";
// import styles from '../styles/Home.module.css';
// import Table from "../../components/Table";
import SummarizeIcon from "@mui/icons-material/Summarize";

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
  TextField,
  Card,
  Typography,
  Divider,
  hexToRgb,
} from "@mui/material";
import OrdersToolBar from "../../components/rawMaterials/order-toolbar";
import { OrderResults } from "../../components/rawMaterials/order-results";
import RightDrawer from "../../components/rawMaterials/RightDrawer";
import Router from "next/router";

const FinishedGoods = () => {
  const router2 = useRouter();
  const { id } = router2.query;
  const [data, setData] = useState([]);
  const [productdata, setproductData] = useState([]);
  const [profitData, setProfitData] = useState([]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: hexToRgb("#7F675B"),
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

  useEffect(() => {
    axios
      .post("http://localhost:11000/shoesalesOrderProdById", { ID: id })
      .then((response) => {
        console.log(response.data[0].salesId);
        setData(response.data);

        axios
          .post("http://localhost:11000/selectproductionCost", {
            salesID: response.data[0].salesId,
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

  return (
    <>
      <Head>
        <title>RawMaterials | Proplast</title>
      </Head>

      {/* ///////// Customer Information */}
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
          <Card maxWidth="mg">
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
        </Container>

        <Container
          sx={{
            display: {
              xs: "block",
              lg: "none",
            },
          }}
          maxWidth={false}
        ></Container>
      </Box>

      <Container
        sx={{
          display: {
            xs: "none",
            lg: "block",
          },
          height: 100,
        }}
        maxWidth="ml"
      ></Container>
      {/* /////////////// Production Info ////////////////////////////////*/}

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
          <Card maxWidth="lg">
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
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Card>
        </Container>

        <Container
          sx={{
            display: {
              xs: "block",
              lg: "none",
            },
          }}
          maxWidth={false}
        ></Container>
      </Box>

      {/* ////////////////////// Production Cost Info //////////////////////////////  */}
      <Container
        sx={{
          display: {
            xs: "none",
            lg: "block",
          },
          height: 100,
        }}
        maxWidth="ml"
      ></Container>
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
          <Card maxWidth="lg">
            {data && (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 400 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="left">Raw Material Name</StyledTableCell>
                      <StyledTableCell align="left">Qty</StyledTableCell>
                      <StyledTableCell align="left">UOM</StyledTableCell>
                      <StyledTableCell align="left">Product Description</StyledTableCell>
                      <StyledTableCell align="left">Value Per Gram</StyledTableCell>
                      <StyledTableCell align="left">Total</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productdata.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell align="left">{row.mat_requestname}</StyledTableCell>
                        <StyledTableCell align="left">{row.mat_quantity}</StyledTableCell>
                        <StyledTableCell align="left">{row.mat_unit}</StyledTableCell>
                        <StyledTableCell align="left">{row.mat_description}</StyledTableCell>
                        <StyledTableCell align="left">{row.value}</StyledTableCell>
                        <StyledTableCell align="left">{row.totalcost}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Card>
        </Container>

        <Container
          sx={{
            display: {
              xs: "block",
              lg: "none",
            },
          }}
          maxWidth={false}
        ></Container>
      </Box>

      {/* ////////////////////// Material cost and Profit */}
      <Container
        sx={{
          display: {
            xs: "none",
            lg: "block",
          },
          height: 100,
        }}
        maxWidth="ml"
      ></Container>

      <Box
        component="main"
        sx={
          {
            // display: ''
          }
        }
      >
        {" "}
        <Container
          sx={{
            display: {
              xs: "none",
              lg: "block",
            },
          }}
          maxWidth="ml"
        >
          <Card maxWidth="lg">
            {profitData && (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 400 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="left">Finished Good Mass</StyledTableCell>
                      <StyledTableCell align="left">Total Raw Material Cost</StyledTableCell>
                      <StyledTableCell align="left">Other Costs(15%)</StyledTableCell>
                      <StyledTableCell align="left">
                        Raw Material Cost Per Production
                      </StyledTableCell>
                      <StyledTableCell align="left">Sales Order Qty</StyledTableCell>
                      <StyledTableCell align="left">Total Sales</StyledTableCell>
                      <StyledTableCell align="left">Profit</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell align="left">{profitData.finGoodMass}</StyledTableCell>
                      <StyledTableCell align="left">
                        {profitData.totalcostofRawMaterials}
                      </StyledTableCell>
                      <StyledTableCell align="left">{profitData.otherCosts}</StyledTableCell>
                      <StyledTableCell align="left">{profitData.production_cost}</StyledTableCell>
                      <StyledTableCell align="left">{profitData.qtyorderdProduct}</StyledTableCell>
                      <StyledTableCell align="left">{profitData.total_sales}</StyledTableCell>
                      <StyledTableCell align="left">{profitData.profit}</StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Card>
        </Container>
        <Container
          sx={{
            display: {
              xs: "block",
              lg: "none",
            },
          }}
          maxWidth={false}
        ></Container>
      </Box>
    </>
  );
};

FinishedGoods.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default FinishedGoods;
