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
import { useSnackbar } from "notistack";
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
import DeleteIcon from "@material-ui/icons/Delete";
import productionWxios from "../../components/productionWxios";
import CustomAlert from "src/components/alert";
import { TableViewCol } from "mui-datatables";

const ViewBatch = () => {
  const { enqueueSnackbar } = useSnackbar();
  function createData(
    fin_product,
    finished_diameter,
    finished_materialcode,
    fin_quan,
    mesuring_unit,
    final_color,
    status,
    id,
    rowMaterialNeeded,
    rawtotalCost,
    finishedWVat,
    finished_mass,
    other_cost,
    oneFinCost,
    GMID,
    batchID,
    cost_id
  ) {
    return {
      fin_product,
      finished_diameter,
      finished_materialcode,
      fin_quan,
      mesuring_unit,
      final_color,
      status,
      id,
      rowMaterialNeeded,
      rawtotalCost,
      finishedWVat,
      finished_mass,
      other_cost,
      oneFinCost,
      GMID,
      batchID,
      cost_id,
    };
  }

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    const productionStartHandler = (id) => {
      console.log("Production Started", id);
    };

    console.log(rows);

    return (
      <React.Fragment>
        {row && (
          <>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
              <TableCell>
                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
              <TableCell component="th" scope="row">
                {row.cost_id}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.fin_product}
              </TableCell>
              <TableCell align="right">{row.finished_diameter}</TableCell>
              <TableCell align="right">{row.finished_materialcode}</TableCell>
              <TableCell align="right">{row.final_color}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell></TableCell>
              <TableCell>
                <IconButton aria-label="expand row" size="small">
                  <DeleteIcon
                    onClick={() => {
                      console.log(row.id);
                      productionWxios
                        .post("/deleteCostSummery", {
                          cost_id: row.cost_id,
                        })
                        .then(function (response) {
                          enqueueSnackbar("Deleted Success", {
                            variant: "succes",
                          });
                          console.log(response);
                          Router.reload();
                        })
                        .catch((error) => {
                          enqueueSnackbar("Deleteing Error", {
                            variant: "succes",
                          });
                        });
                    }}
                    style={{ color: "#FF000A", marginLeft: "-3rem" }}
                  />
                </IconButton>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Typography
                    className="text-xl text-[#61482A] font-bold mt-10 mb-10"
                    variant="h6"
                    gutterBottom
                    component="div"
                  >
                    Raw Material Used
                  </Typography>
                  <Box sx={{ margin: 1, display: "flex", gap: "2rem" }}>
                    <Table size="small" aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          <TableCell>mat_requestname</TableCell>
                          <TableCell>Material Code</TableCell>

                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {row.rowMaterialNeeded.map((matNeeded) => (
                          <TableRow key={matNeeded.mat_requestname}>
                            <TableCell component="th" scope="row">
                              {matNeeded.mat_requestname}
                            </TableCell>
                            <TableCell>{matNeeded.mat_materialcode}</TableCell>

                            <TableCell>{matNeeded.mat_unit}</TableCell>
                            <TableCell align="right">{matNeeded.mat_quantity}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <Table className="bg-[#EBE5D8] rounded-xl h-[20rem] w-[45%]">
                      <Typography className="text-xl text-[#61482A] font-bold p-5">
                        {" "}
                        Production Cost{" "}
                      </Typography>
                      <Box className="text-sm text-[#61482A] grid grid-cols-2 gap-4 font-bold p-5">
                        <h3 className="mt-5 "> Total Raw Material Cost: </h3>
                        <p className="mt-5 text-right ">
                          {" "}
                          {parseFloat(row.rawtotalCost)
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}{" "}
                          ETB
                        </p>

                        <h3 className="mt-5 "> mass of finished Good:</h3>
                        <p className="mt-5 text-right ">
                          {" "}
                          {parseFloat(row.finished_mass)
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}{" "}
                          KG
                        </p>
                        <h3 className="mt-5 "> cost of 1 Product:</h3>
                        <p className="mt-5 text-right ">
                          {" "}
                          {parseFloat(row.oneFinCost)
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}{" "}
                          ETB
                        </p>
                        <h3 className="mt-5"> 15% (Other Cost):</h3>
                        <p className="mt-5 text-right">
                          {" "}
                          {parseFloat(row.other_cost)
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}{" "}
                          ETB
                        </p>
                        <h3 className="mt-5"> Production Cost:</h3>
                        <p className="mt-5 text-right">
                          {" "}
                          {parseFloat(row.finishedWVat)
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}{" "}
                          ETB
                        </p>
                      </Box>
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
      .get("/showProductionCost")
      .then((res) => {
        setData(res.data);
        console.log("aav", res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(data);

  const rows = [];

  data.map((item) => {
    rows.push(
      createData(
        item.fin_product,
        item.finished_diameter,
        item.finished_materialcode,
        item.fin_quan,
        item.mesuring_unit,
        item.final_color,
        item.status,
        item.id,
        item.rawmat_list ? JSON.parse(item.rawmat_list) : JSON.parse(item.raw_mat_needed),
        item.total_raw_cost,
        item.finishedWVat,
        item.finished_mass,
        item.other_cost,
        item.oneFinCost,
        item.GmID,
        item.custom_batch_id,
        item.cost_id
      )
    );
  });
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
                <TableCell>Batch ID</TableCell>
                <TableCell>Final Product</TableCell>
                <TableCell align="right">Diameter</TableCell>
                <TableCell align="right">Material Code</TableCell>
                {/* <TableCell align="right">Final Quantity</TableCell>
                <TableCell align="right">UOM</TableCell> */}
                <TableCell align="right">Color</TableCell>
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
