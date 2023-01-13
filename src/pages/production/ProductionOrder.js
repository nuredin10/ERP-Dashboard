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
    rowMaterialNeeded
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
          userName: "PRODUTION",
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
              <TableCell align="right">{row.finished_diameter}</TableCell>
              <TableCell align="right">{row.finished_materialcode}</TableCell>
              <TableCell align="right">{row.fin_quan}</TableCell>

              <TableCell align="right">{row.mesuring_unit}</TableCell>
              <TableCell align="right">{row.final_color}</TableCell>
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
              <TableCell>
                <IconButton aria-label="expand row" size="small">
                  <DeleteIcon
                    onClick={() => {
                      console.log(row.id);
                      productionWxios
                        .delete("/deleteRow", {
                          id: row.id,
                        })
                        .then(function (response) {
                          if (response.data.msg == "sucess") {
                            enqueueSnackbar("Deleted Success", {
                              variant: "succes",
                            });
                            Router.reload();
                          } else {
                            enqueueSnackbar("Delete Error", {
                              variant: "error",
                            });
                          }
                        })
                        .catch((error) => {
                          console.log(error);
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
                    Raw Material Needed
                  </Typography>
                  <Box sx={{ margin: 1, display: "flex", gap: "2rem" }}>
                    <Table size="small" aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          <TableCell>mat_requestname</TableCell>
                          <TableCell>Material Code</TableCell>

                          <TableCell>mat_unit</TableCell>
                          <TableCell align="right">Quantity</TableCell>
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
                        <h3 className="mt-5 "> Raw Materials: </h3>
                        <p className="mt-5 text-right "> 1000</p>
                        <h3 className="mt-5"> 15% (Other Cost):</h3>
                        <p className="mt-5 text-right"> 100 ETB</p>
                        <h3 className="mt-5"> Production Cost:</h3>
                        <p className="mt-5 text-right"> 1000</p>
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
      .get("/showProductionOrder")
      .then((res) => {
        const rawMaterial = res.data.filter((raw) => raw.status.includes("New"));
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
        item.rawmat_list ? JSON.parse(item.rawmat_list) : JSON.parse(item.raw_mat_needed)
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
                <TableCell>Final Product</TableCell>
                <TableCell align="right">Diameter</TableCell>
                <TableCell align="right">Material Code</TableCell>
                <TableCell align="right">Final Quantity</TableCell>
                <TableCell align="right">UOM</TableCell>
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
