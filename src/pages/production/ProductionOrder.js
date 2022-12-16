import { useState, useEffect } from "react";
import * as React from "react";
import PropTypes from "prop-types";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Head from "next/head";
import Router from "next/router";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  Card,
  TextField,
  Typography,
} from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
// import productionWxios from "../../components/productionWxios";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import productionWxios from "../../components/productionWxios";
import CustomAlert from "src/components/alert";

const ViewBatch = () => {
  function createData(
    fin_product,
    fin_spec,
    // est_finQuan,
    est_westQuan,
    est_finQuan,
    status,
    id,
    // shift,
    // production_line,
    // waste_name,
    // waste_quan,
    // waste_unit,
    rowMaterialNeeded
  ) {
    return {
      fin_product,
      fin_spec,
      // est_finQuan,
      est_westQuan,
      est_finQuan,
      status,
      id,
      // efficency,
      // shift,
      // production_line,
      // waste_name,
      // waste_quan,
      // waste_unit,
      rowMaterialNeeded,
    };
  }

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    const productionStartHandler = (id) => {
      console.log("Production Started", id);
      productionWxios
        .post("/startProduction", {
          id: id,
          status: "START",
          userName: "AKLILE"
        })
        .then(function (response) {
          if (response.data.message === "Started !") {
            console.log("Production has been Started");
            CustomAlert("success", "Production has been started");
            Router.reload();
          } else if (response.data.message === "update status error") {
            console.log("update Server Error");
          } else if (response.data.message === "error making raw material request") {
            console.log("Error making new request");
          } else if (response.data.message === "cant found the order to start") {
            console.log("Cant find the order");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    console.log(rows);

    return (
      <React.Fragment>
        {row.status == "New" && (
          <>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
              <TableCell>
                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
              <TableCell component="th" scope="row">
                {row.fin_product}
              </TableCell>
              <TableCell align="right">{row.fin_spec}</TableCell>
              <TableCell align="right">{row.est_westQuan}</TableCell>
              <TableCell align="right">{row.est_finQuan}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => productionStartHandler(row.id)}
                >
                  <PlayCircleOutlineIcon style={{ color: "primary.main" }} />
                </IconButton>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 1 }}>
                    <Typography variant="h6" gutterBottom component="div">
                      Raw Material Needed
                    </Typography>
                    <Table size="small" aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          <TableCell>mat_requestname</TableCell>
                          <TableCell>mat_spec</TableCell>
                          <TableCell>mat_unit</TableCell>
                          <TableCell align="right">Quantity</TableCell>
                          <TableCell align="right">Desc</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {row.rowMaterialNeeded.map((matNeeded) => (
                          <TableRow key={matNeeded.mat_requestname}>
                            <TableCell component="th" scope="row">
                              {matNeeded.mat_requestname}
                            </TableCell>
                            <TableCell>{matNeeded.mat_spec}</TableCell>
                            <TableCell>{matNeeded.mat_unit}</TableCell>
                            <TableCell align="right">{matNeeded.mat_description}</TableCell>
                            <TableCell align="right">{matNeeded.mat_quantity}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </>
        )}
      </React.Fragment>
    );
  }

  Row.propTypes = {
    row: PropTypes.shape({
      calories: PropTypes.number.isRequired,
      carbs: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      history: PropTypes.arrayOf(
        PropTypes.shape({
          amount: PropTypes.number.isRequired,
          customerId: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
        })
      ).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      protein: PropTypes.number.isRequired,
    }).isRequired,
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    productionWxios
      .get("/showProductionOrder")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(data);

  const rows = [];

  data.map((item) => {
    rows.push(
      createData(
        item.fin_product,
        item.fin_spec,
        // item.est_finQuan,
        item.est_westQuan,
        item.est_finQuan,
        item.status,
        item.id,
        // item.shift,
        // item.production_line,
        // item.waste_name,
        // item.waste_quan,
        // item.waste_unit,
        item.rawmat_list ? JSON.parse(item.rawmat_list) : JSON.parse(item.raw_mat_needed)
      )
    );
  });

  // const rows = [
  //     createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
  //     createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
  //     createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
  //     createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
  //     createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
  //   ];
  return (
    <>
      <Head>
        <title>View Batch | Proplast Production</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Final Product</TableCell>
                <TableCell align="right">Final Specification</TableCell>
                {/* <TableCell align="right">Final Quantity</TableCell> */}
                <TableCell align="right">Estimated Final Quantity</TableCell>
                <TableCell align="right">Estimated Waste Quantity</TableCell>
                {/* <TableCell align="right">Efficency</TableCell>
                <TableCell align="right">Shift</TableCell>
                <TableCell align="right">Production Line</TableCell>
                <TableCell align="right">Waste Product</TableCell>
                <TableCell align="right">Waste Quantity</TableCell> */}
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.name} row={row} />
                // {row.status=="BEGIN" && <Row key={row.name} row={row}/>}
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

ViewBatch.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ViewBatch;
