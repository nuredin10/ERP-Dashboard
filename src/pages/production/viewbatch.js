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
import axios from "axios";
import { borderLeft } from "@mui/system";

const ViewBatch = () => {
  function createData(
    finmat_prod,
    prod_quan,
    finmat_spec,
    prod_unit,
    timeneeded,
    efficency,
    shift,
    production_line,
    waste_name,
    waste_quan,
    waste_unit,
    rowMaterialNeeded
  ) {
    return {
      finmat_prod,
      prod_quan,
      finmat_spec,
      prod_unit,
      timeneeded,
      efficency,
      shift,
      production_line,
      waste_name,
      waste_quan,
      waste_unit,
      rowMaterialNeeded
    };
  }

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" }}}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.finmat_prod}
          </TableCell>
          <TableCell align="right">{row.prod_quan}</TableCell>
          <TableCell align="right">{row.finmat_spec}</TableCell>
          <TableCell align="right">{row.prod_unit}</TableCell>
          <TableCell align="right">{row.timeneeded}</TableCell>
          <TableCell align="right">{row.efficency}</TableCell>
          <TableCell align="right">{row.shift}</TableCell>
          <TableCell align="right">{row.production_line}</TableCell>
          <TableCell align="right">{row.waste_name}</TableCell>
          <TableCell align="right">{row.waste_quan}</TableCell>
          <TableCell align="right">{row.waste_unit}</TableCell>
        </TableRow>
        <TableRow sx={{ml: 10}}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0, borderLeft: '3px solid #5048E5'}} colSpan={11}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ my: 4}}>
                <Typography variant="h6" gutterBottom component="div">
                  Raw Material Needed
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Material Name</TableCell>
                      <TableCell>Material Specification</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Quantity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.rowMaterialNeeded.map((matNeeded) => (
                      <TableRow key={matNeeded.mat_requestname}>
                        <TableCell component="th" scope="row">
                          {matNeeded.mat_requestname}
                        </TableCell>
                        <TableCell>{matNeeded.mat_spec}</TableCell>
                        <TableCell>{matNeeded.mat_description}</TableCell>
                        <TableCell>{matNeeded.mat_quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
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
    axios
      .get("http://localhost:42000/showbatchformula")
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
        item.finmat_prod,
        item.prod_quan,
        item.finmat_spec,
        item.prod_unit,
        item.timeneeded,
        item.efficency,
        item.shift,
        item.production_line,
        item.waste_name,
        item.waste_quan,
        item.waste_unit,
        JSON.parse(item.rawmat_list)
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
                <TableCell align="right">Final Quantity</TableCell>
                <TableCell align="right">Final Specification</TableCell>
                <TableCell align="right">Production Unit</TableCell>
                <TableCell align="right">Time Needed</TableCell>
                <TableCell align="right">Efficency</TableCell>
                <TableCell align="right">Shift</TableCell>
                <TableCell align="right">Production Line</TableCell>
                <TableCell align="right">Waste Product</TableCell>
                <TableCell align="right">Waste Quantity</TableCell>
                <TableCell align="right">Waste Unit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {rows.map((row) => (
                <Row key={row.name} row={row} />
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
