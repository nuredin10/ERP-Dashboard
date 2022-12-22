import { useState, useEffect } from "react";
import * as React from "react";
import PropTypes from "prop-types";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import DoneAllIcon from "@mui/icons-material/DoneAll";
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
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

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
} from "@mui/material";

import { DashboardLayout } from "../../components/dashboard-layout";

import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import productionWxios from "../../components/productionWxios";
import CustomAlert from "src/components/alert";
import PauseIcon from "@mui/icons-material/Pause";
import { useSnackbar } from "notistack";

const ProducitonOngoing = () => {
  const token = Cookies.get("token");
  const decoded = jwt.decode(token);
  const { enqueueSnackbar } = useSnackbar();

  function createData(
    fin_product,
    fin_spec,
    est_westQuan,
    est_finQuan,
    status,
    id,
    custom_batch_id,
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
      custom_batch_id,
      rowMaterialNeeded,
    };
  }

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);
    const [finishModalOpen, setFinishModalOpen] = useState(false);
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
      console.log(data);
      console.log(row);
      productionWxios
        .post("/addProductProduced", {
          prodID: row.id,
          new_name: data.name,
          new_spec: data.spec,
          new_quantity: data.quantity,
          new_color: data.color,
          personID: decoded.userName || "AK",
          new_description: data.desc,
          new_materialunit: data.material_unit,
          new_remark: data.remark,
          new_materialcode: data.material_code,
          new_status: "NEW",
          salesID: row.custom_batch_id,
        })
        .then((respo) => {
          enqueueSnackbar("Production Completed", { variant: "success" });
          console.log(respo);
        })
        .catch((err) => {
          console.log(err);
          enqueueSnackbar("Something went wrong", { variant: "error" });
        });
      setFinishModalOpen(false);
    };
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 800,
      bgcolor: "background.paper",
      border: "1px solid #efefef",
      borderRadius: 1,
      boxShadow: 10,
      p: 4,
    };
    return (
      <React.Fragment>
        {row.status == "STARTED" && (
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
              <TableCell align="right">
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setFinishModalOpen(true)}
                >
                  <DoneAllIcon style={{ color: "green" }} />
                </IconButton>
                <Modal
                  open={finishModalOpen}
                  onClose={() => setFinishModalOpen(false)}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      <h1>Production Report</h1>
                    </Typography>
                    <Divider />
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-3 gap-5">
                          <TextField label="Name" variant="outlined" {...register("name")} />
                          <TextField label="Spec" variant="outlined" {...register("spec")} />
                          <TextField
                            label="Quantity"
                            variant="outlined"
                            {...register("quantity")}
                          />
                          <TextField label="Color" variant="outlined" {...register("color")} />
                          <TextField label="Description" variant="outlined" {...register("desc")} />
                          <TextField
                            label="Material Unit"
                            variant="outlined"
                            {...register("material_unit")}
                          />
                          <TextField label="Remark" variant="outlined" {...register("remark")} />
                          <TextField
                            label="Material Code"
                            variant="outlined"
                            {...register("material_code")}
                          />
                        </div>
                        <Box sx={{ mt: 3 }}>
                          <Button
                            sx={{ mr: 3 }}
                            type="submit"
                            variant="contained" /* className="py-4 px-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg hover:shadwo-lg" */
                          >
                            Complete
                          </Button>
                          <Button variant="outlined" onClick={() => setFinishModalOpen(false)}>
                            Cancel
                          </Button>
                        </Box>
                      </form>
                    </Typography>
                  </Box>
                </Modal>
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

  const rows = [];

  data.map((item) => {
    rows.push(
      createData(
        item.fin_product,
        item.fin_spec,
        item.est_westQuan,
        item.est_finQuan,
        item.status,
        item.id,
        item.custom_batch_id,
        item.rawmat_list ? JSON.parse(item.rawmat_list) : JSON.parse(item.raw_mat_needed)
      )
    );
  });

  return (
    <>
      <Head>
        <title>View Batch | Proplast Ongoing Production</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Final Products</TableCell>
                <TableCell align="right">Final Specification</TableCell>
                <TableCell align="right">Estimated Final Quantity</TableCell>
                <TableCell align="right">Estimated Waste Quantity</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
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
ProducitonOngoing.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ProducitonOngoing;
