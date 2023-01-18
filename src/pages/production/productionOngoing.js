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

import axios from "../../components/productionWxios";
import EditBatchFormula from "src/components/product/editbatchFormula";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
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
  MenuItem,
  Select,
  FormGroup,
} from "@mui/material";

import { DashboardLayout } from "../../components/dashboard-layout";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import productionWxios from "../../components/productionWxios";
import CustomAlert from "src/components/alert";
import PauseIcon from "@mui/icons-material/Pause";
import { useSnackbar } from "notistack";
import CButton from "../../components/Button";
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "65%",
    top: "10%",
    left: "20%",

    backgroundColor: theme.palette.background.paper,
    // boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: "75%", // fixed height
    overflow: "scroll", // scrollable
  },
}));

const ProducitonOngoing = () => {
  const [open, setOpen] = React.useState(false);
  const [nopen, setNOpen] = React.useState(false);
  const [customOrRegular, setCustomOrRegular] = React.useState("custom");
  const [indata, setIndata] = useState();
  const router = useRouter();
  const { id } = router.query;
  const [orderInfo, setOrderInfo] = useState([]);
  const classes = useStyles();
  const handleNOpen = () => setNOpen(true);
  const handleClose = () => setNOpen(false);

  useEffect(() => {
    axios
      .get("/showbatchformula")
      .then((res) => {
        // setRegular(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // console.log("Id", id);
  }, []);
  const token = Cookies.get("token");
  const decoded = jwt.decode(token);
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
    batchID,
    GmID,
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
      batchID,
      GmID,
      rowMaterialNeeded,
    };
  }
  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("/");
  }

  function Row(props) {
    const { row } = props;
    // const [open, setOpen] = useState(false);
    const [finname, setfinName] = useState("PPR PIPES");
    const [spec, setSpec] = useState("");

    const [finishModalOpen, setFinishModalOpen] = useState(false);
    const handleFormChange = (event) => {
      setfinName(event.target.value);

      console.log(event.target.value);
      console.log(finname);
    };

    const handleFormChangeSpec = (event) => {
      setSpec(event.target.value);
      console.log(name);
    };
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
      console.log("data", data);
      console.log("row", row);
      productionWxios
        .post("/addProductProduced", {
          prodID: row.id,
          new_name: row.fin_product,
          new_color: row.final_color,
          new_diameter: row.finished_diameter,
          new_materialcode: row.finished_materialcode,
          new_quantity: data.quantity,
          oldQuantity: row.fin_quan,
          new_materialunit: data.material_unit,
          new_status: "NEW",
          salesID: row.custom_batch_id,
          FSNumber: data.Fs_number,
          // new_spec: data.spec,
          personID: decoded.userName || "Production",
          // new_description: data.desc,
          new_remark: data.Production_reasons,
          waste_quantity: data.waste_quantity,
          waste_unit: data.Wmaterial_unit,
          batchID: row.batchID,
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
    var newForm;
    const newRequest = (data) => {
      if (customOrRegular === "regular") {
        newForm = {
          ...data,
          batch_id: selectedRegualr,
          custom_regular: customOrRegular,
          status: "New",
          start_dateTime: convert(startDate),
          end_dateTime: convert(endDate),
          salesID: indata.salesID,
          GMID: indata.id,
        };
      } else {
        newForm = {
          ...data,
          raw_needed: JSON.stringify(orderInfo),
          custom_regular: customOrRegular,
          start_dateTime: convert(startDate),
          end_dateTime: convert(endDate),
          status: "New",
          salesID: indata.salesID,
          GMID: indata.id,
        };
      }

      axios
        .post("/addProductionOrder", newForm)
        .then((res) => {
          console.log(res);
          setIsSuccess("success");
          setAlertMsg("Production Order Added Successfully");
        })
        .catch((err) => {
          console.log(err);
          setIsSuccess("error");
          setAlertMsg("Error Occured");
        });
      console.log(newForm);
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
              <TableCell align="right">{row.finished_diameter}</TableCell>
              <TableCell align="right">{row.finished_materialcode}</TableCell>
              <TableCell align="right">{row.mesuring_unit}</TableCell>
              <TableCell align="right">{row.fin_quan}</TableCell>
              <TableCell align="right">{row.final_color}</TableCell>
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
                          {/* <TextField label="Name" variant="outlined" {...register("name")} /> */}

                          <TextField
                            label="Produced Quantity"
                            variant="outlined"
                            {...register("quantity")}
                          />
                          <TextField
                            label="Fs Number"
                            variant="outlined"
                            {...register("Fs_number")}
                          />
                          {/* <TextField label="Description" variant="outlined" {...register("desc")} /> */}
                          <TextField
                            label="Produced UOM"
                            variant="outlined"
                            {...register("material_unit")}
                          />

                          <TextField
                            label="Waste Quantity"
                            variant="outlined"
                            {...register("waste_quantity")}
                          />

                          <TextField
                            label="Waste UOM"
                            variant="outlined"
                            {...register("Wmaterial_unit")}
                          />

                          <TextField
                            label="Remark"
                            variant="outlined"
                            {...register("Production_reasons")}
                          />
                        </div>
                        <Box sx={{ mt: 3 }}>
                          <CButton
                            sx={{ mr: 3 }}
                            type="submit"
                            variant="contained" /* className="py-4 px-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg hover:shadwo-lg" */
                          >
                            Complete
                          </CButton>
                          <Button
                            className="w-40 ml-5  font-bold text-sm hover:shadow-lg  hover:bg-[#61482A]  hover:text-white"
                            variant="outlined"
                            onClick={() => setFinishModalOpen(false)}
                          >
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
                  <Typography variant="h6" gutterBottom component="div">
                    Raw Material Needed
                  </Typography>
                  <Box sx={{ margin: 1, display: "flex", gap: "2rem" }}>
                    <Table size="small" aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          <TableCell>mat_requestname</TableCell>
                          <TableCell>Material Code</TableCell>
                          <TableCell align="right">Desc</TableCell>
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
                            <TableCell align="right">{matNeeded.mat_description}</TableCell>
                            <TableCell>{matNeeded.mat_unit}</TableCell>
                            <TableCell align="right">{matNeeded.mat_quantity}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <Table>
                      <Box>
                        <Button
                          className="w-40 bg-[#61482A]  text-white font-bold text-md hover:shadow-lg hover:bg-[#EBE5D8] hover:text-[#61482A]"
                          // onClick={() => setNOpen(true)}
                          onClick={handleNOpen}
                        >
                          Edit
                        </Button>

                        <Modal
                          open={nopen}
                          onClose={handleClose}
                          aria-labelledby="scrollable-modal-title"
                          aria-describedby="scrollable-modal-description"
                        >
                          <Paper className={classes.paper}>
                            <EditBatchFormula
                              setOrderInfo={setOrderInfo}
                              handleClose={handleClose}
                              setRawmaterial={row}
                            />
                          </Paper>
                        </Modal>
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
        item.finished_diameter,
        item.finished_materialcode,
        item.fin_quan,
        item.mesuring_unit,
        item.final_color,
        item.status,
        item.id,
        item.custom_batch_id,
        item.GmID,

        // item.shift,
        // item.production_line,
        // item.waste_name,
        // item.waste_quan,
        // item.waste_unit,
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
                <TableCell>Final Product</TableCell>
                <TableCell align="right">Diameter</TableCell>
                <TableCell align="right">Material Code</TableCell>
                <TableCell align="right">Final Quantity</TableCell>
                <TableCell align="right">UOM</TableCell>
                <TableCell align="right">Color</TableCell>
                <TableCell align="right">Status</TableCell>
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
